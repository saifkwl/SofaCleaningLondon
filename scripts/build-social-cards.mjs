/**
 * Renders a 1200x630 JPEG share card for every illustration.
 *
 * Why this exists: Facebook, WhatsApp, LinkedIn and X do not render SVG in a
 * link preview. Pointing og:image at an .svg means a shared link shows no image
 * at all — which matters most here, because WhatsApp is the site's main lead
 * channel and every quote link gets pasted into a chat.
 *
 * Run: npm run social
 * Output: public/images/og/<key>.jpg
 */
import { chromium } from 'playwright-core';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public/images');
const OUT = join(SRC, 'og');
mkdirSync(OUT, { recursive: true });

const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
const exe = join(base, readdirSync(base).find((d) => /^chromium-\d+$/.test(d)), 'chrome-linux', 'chrome');

const illustrations = readdirSync(SRC).filter((f) => f.endsWith('.svg'));
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const file of illustrations) {
  const svg = readFileSync(join(SRC, file), 'utf8');
  // The illustrations are 3:2; a share card is 1.9:1. Cover-crop rather than
  // letterbox, anchored slightly above centre so the sofa stays in frame.
  await page.setContent(
    `<html><body style="margin:0;width:1200px;height:630px;overflow:hidden;background:#eef7f6">
       <div style="width:1200px;height:630px;display:flex;align-items:center;justify-content:center;overflow:hidden">
         <div style="width:1200px;height:800px;margin-top:-60px;flex:none">${svg
           .replace(/width="\d+"/, 'width="1200"')
           .replace(/height="\d+"/, 'height="800"')}</div>
       </div>
     </body></html>`,
    { waitUntil: 'load' },
  );
  const name = file.replace(/\.svg$/, '.jpg');
  await page.screenshot({ path: join(OUT, name), type: 'jpeg', quality: 82 });
  console.log(`  og/${name.padEnd(18)} ${Math.round(statSync(join(OUT, name)).size / 1024)} KB`);
}

await browser.close();
console.log(`\n${illustrations.length} share cards written to public/images/og/`);
