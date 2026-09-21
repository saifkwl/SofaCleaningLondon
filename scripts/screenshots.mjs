/**
 * Screenshots key pages at desktop and phone widths and fails on console
 * errors or horizontal overflow — the two things that most often go unnoticed
 * on mobile.
 *
 * Start the site first (npm run build && npm start -- -p 3210), then:
 *   npm run screenshots -- ./screenshots
 */
import { chromium } from 'playwright-core';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
const dir = readdirSync(base).find((d) => /^chromium-\d+$/.test(d));
const exe = join(base, dir, 'chrome-linux', 'chrome');
const OUT = process.argv[2] || './screenshots';
const origin = (process.env.SITE_ORIGIN || process.argv[3] || 'http://127.0.0.1:3000').replace(/\/$/, '');

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: exe });

const shots = [
  ['home-desktop', '/', 1440, 1000, false],
  ['home-mobile', '/', 390, 844, false],
  ['service', '/services/steam-sofa-cleaning-london/', 1440, 1000, false],
  ['area-mobile', '/areas-we-cover/wandsworth/', 390, 844, false],
  ['quote', '/get-a-quote/', 1440, 1000, false],
  ['prices', '/sofa-cleaning-prices-london/', 1440, 1000, false],
];

const errors = [];
for (const [name, path, w, h, full] of shots) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
  await page.goto(origin + path, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  // Horizontal overflow check — the classic mobile layout bug.
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) errors.push(`${name}: horizontal overflow of ${overflow}px`);
  await page.close();
  console.log(`  ${name.padEnd(16)} ${path}`);
}

await browser.close();
if (errors.length) { console.log('\nISSUES:'); errors.forEach((e) => console.log('  ✗ ' + e)); process.exit(1); }
console.log('\nNo console errors, no horizontal overflow.');
