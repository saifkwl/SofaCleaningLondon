/**
 * End-to-end check of the two WhatsApp lead paths.
 *
 * Verifies that the price calculator totals correctly, that both forms build a
 * valid wa.me deep link containing the customer's answers, that an incomplete
 * form is blocked, and that no page loads a third-party resource.
 *
 * Start the site first (npm run build && npm start -- -p 3210), then:
 *   npm run verify:leads
 */
import { chromium } from 'playwright-core';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
const exe = join(base, readdirSync(base).find((d) => /^chromium-\d+$/.test(d)), 'chrome-linux', 'chrome');
const origin = (process.env.SITE_ORIGIN || process.argv[3] || 'http://127.0.0.1:3000').replace(/\/$/, '');
const browser = await chromium.launch({ executablePath: exe });
const fails = [];

/* 1. Price calculator: add items, check the total and the wa.me payload. */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(origin + '/get-a-quote/', { waitUntil: 'networkidle' });
  await page.getByLabel('Add one 3-seater sofa').click();
  await page.getByLabel('Add one Armchair').click();
  await page.getByLabel('Add one Armchair').click();
  await page.getByLabel('Area or postcode').first().fill('SW18 2AB');

  const total = (await page.locator('.sticky p.text-3xl').innerText()).replace(/\s/g, '');
  // 75 + (2 x 30) = 135; upper = round(135 * 1.33 / 5) * 5 = 180
  if (total !== '£135–£180') fails.push(`calculator total was "${total}", expected "£135–£180"`);

  const href = await page.getByRole('link', { name: /Confirm on WhatsApp/ }).getAttribute('href');
  const msg = decodeURIComponent(new URL(href).searchParams.get('text'));
  if (!href.startsWith('https://wa.me/447342840056?text=')) fails.push(`calculator wa.me href wrong: ${href.slice(0, 60)}`);
  for (const want of ['SW18 2AB', '1 × 3-seater sofa', '2 × Armchair', '£135–£180']) {
    if (!msg.includes(want)) fails.push(`calculator message missing "${want}"`);
  }
  console.log('Calculator message:\n' + msg.split('\n').map((l) => '    ' + l).join('\n'));
  await page.close();
}

/* 2. Lead form: validation blocks an empty submit, then a valid one opens wa.me. */
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(origin + '/areas-we-cover/wandsworth/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: /Send on WhatsApp/ }).click();
  const err = page.locator('form p[role="alert"]');
  if (!(await err.isVisible())) fails.push('empty lead form did not show a validation error');

  await page.getByLabel('Your name').fill('Sam Ellery');
  await page.getByLabel('Area or postcode').first().fill('SW18 4LR');
  await page.getByLabel('What needs cleaning').selectOption('L-shape / corner sofa');
  await page.getByLabel(/^Fabric/).fill('Velvet');
  await page.getByLabel(/Anything we should know/).fill('Two pet stains on the chaise.');

  // wa.me is unreachable from this sandbox, so a real popup navigates to an
  // error page. Record the URL the component asks for instead.
  await page.evaluate(() => {
    window.__opened = null;
    window.open = (u) => { window.__opened = u; return null; };
  });
  await page.getByRole('button', { name: /Send on WhatsApp/ }).click();
  const url = await page.evaluate(() => window.__opened);
  if (!url) { fails.push('lead form did not call window.open'); }
  const msg = url ? decodeURIComponent(new URL(url).searchParams.get('text')) : '';
  if (!url?.startsWith('https://wa.me/447342840056?text=')) fails.push(`lead form wa.me href wrong: ${String(url).slice(0, 60)}`);
  for (const want of ['Sam Ellery', 'SW18 4LR', 'L-shape / corner sofa', 'Velvet', 'Two pet stains']) {
    if (!msg.includes(want)) fails.push(`lead form message missing "${want}"`);
  }
  console.log('\nLead form message:\n' + msg.split('\n').map((l) => '    ' + l).join('\n'));
  await page.close();
}

/* 3. tel: and wa.me links present site-wide, and the area form is pre-filled. */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const external = new Set();
  page.on('request', (r) => {
    const h = new URL(r.url()).host;
    if (h !== new URL(origin).host && !r.url().startsWith('data:')) external.add(h);
  });
  await page.goto(origin + '/areas-we-cover/hackney/', { waitUntil: 'networkidle' });
  if (external.size) fails.push(`page loaded third-party resources: ${[...external].join(', ')}`);
  const tel = await page.locator('a[href="tel:+447342840056"]').count();
  const wa = await page.locator('a[href^="https://wa.me/447342840056"]').count();
  if (tel < 2) fails.push(`only ${tel} tel: links on the area page`);
  if (wa < 2) fails.push(`only ${wa} wa.me links on the area page`);
  const prefilled = await page.getByLabel('Area or postcode').first().inputValue();
  if (prefilled !== 'Hackney') fails.push(`area form prefill was "${prefilled}", expected "Hackney"`);
  console.log(`\nHackney page: ${tel} tel: links, ${wa} wa.me links, form pre-filled with "${prefilled}"`);
  console.log(`Third-party resource requests: ${external.size === 0 ? 'none' : [...external].join(', ')}`);
  await page.close();
}

await browser.close();
if (fails.length) { console.log('\nFAILURES:'); fails.forEach((f) => console.log('  ✗ ' + f)); process.exit(1); }
console.log('\nAll WhatsApp and call paths verified.');
