/**
 * Rasterises the brand mark and the Open Graph card into the PNG files that
 * social platforms and iOS require. SVG is fine for the favicon; neither of
 * those two accepts it.
 *
 * Run: node scripts/build-icons.mjs
 * Needs Chromium — the path is picked up from PLAYWRIGHT_BROWSERS_PATH or the
 * usual install location.
 */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
mkdirSync(join(PUBLIC, 'images'), { recursive: true });

function findChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  const dir = readdirSync(base).find((d) => /^chromium-\d+$/.test(d));
  if (!dir) throw new Error(`No chromium build found in ${base}`);
  return join(base, dir, 'chrome-linux', 'chrome');
}

const MARK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#123736"/>
  <g fill="none" stroke="#73bcb5" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 30v-8.5A5.5 5.5 0 0 1 21.5 16h21a5.5 5.5 0 0 1 5.5 5.5V30"/>
    <path d="M12 33a4.4 4.4 0 0 1 8.8 0v5.6h22.4V33a4.4 4.4 0 0 1 8.8 0v13H12Z"/>
  </g>
  <g stroke="#f2760c" stroke-width="3.6" stroke-linecap="round">
    <path d="M20.8 46v4M43.2 46v4"/>
  </g>
</svg>`;

const OG = `
<div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;
            padding:0 86px;box-sizing:border-box;
            background:linear-gradient(135deg,#123736 0%,#1c6663 58%,#27807b 100%);
            font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#fff">
  <div style="display:flex;align-items:center;gap:18px">
    <div style="width:64px;height:64px;border-radius:16px;background:rgba(255,255,255,.12);
                display:flex;align-items:center;justify-content:center">${MARK.replace('width="64" height="64"', 'width="40" height="40"').replace('<rect width="64" height="64" rx="14" fill="#123736"/>', '')}</div>
    <div style="font-size:26px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#a9d7d2">
      Sofa Cleaning London
    </div>
  </div>
  <div style="font-size:74px;font-weight:800;line-height:1.08;margin-top:34px;letter-spacing:-.02em;max-width:930px">
    Professional sofa &amp; upholstery cleaning
  </div>
  <div style="font-size:31px;line-height:1.45;margin-top:26px;color:#d4ebe8;max-width:860px">
    Fabric tested before any product is used. Price fixed before we start.
  </div>
  <div style="display:flex;gap:14px;margin-top:40px">
    <div style="background:#f2760c;color:#fff;font-size:26px;font-weight:800;padding:15px 30px;border-radius:999px">
      +44 7342 840056
    </div>
    <div style="border:2px solid rgba(255,255,255,.35);color:#fff;font-size:26px;font-weight:700;
                padding:15px 30px;border-radius:999px">
      Greater London · 7 days
    </div>
  </div>
</div>`;

const browser = await chromium.launch({ executablePath: findChromium() });

async function shoot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${html}</body></html>`,
    { waitUntil: 'load' },
  );
  const buf = await page.screenshot({ omitBackground: true, type: 'png' });
  writeFileSync(out, buf);
  await page.close();
  console.log(`  ${out.replace(ROOT + '/', '')}  ${width}x${height}`);
}

// Favicon stays SVG — it scales and weighs almost nothing.
writeFileSync(join(PUBLIC, 'favicon.svg'), MARK.trim() + '\n');
console.log('  public/favicon.svg');

await shoot(MARK, 180, 180, join(PUBLIC, 'apple-touch-icon.png'));
await shoot(MARK, 192, 192, join(PUBLIC, 'icon-192.png'));
await shoot(MARK, 512, 512, join(PUBLIC, 'icon-512.png'));
await shoot(OG, 1200, 630, join(PUBLIC, 'images', 'og-default.png'));

await browser.close();
console.log('Icons and Open Graph card written.');
