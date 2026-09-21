/**
 * Turns the image kit's output into src/data/photos.ts.
 *
 * Run after `python fetch_images.py --pick picks.json` has written
 * public/images/manifest.json and the WebP files beside it:
 *
 *   npm run photos:apply
 *
 * Every slot is validated before it is written: the files it names must exist
 * on disk, carry real dimensions, and have alt text. A slot that fails any of
 * those is reported and skipped rather than shipped broken — the page then
 * keeps its illustration, which is a working page rather than a missing image.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = join(ROOT, 'public/images/manifest.json');
const TARGET = join(ROOT, 'src/data/photos.ts');
const KIT = join(ROOT, 'scripts/image-kit/images.json');

if (!existsSync(MANIFEST)) {
  console.error(`No manifest at public/images/manifest.json.

Produce one first, from scripts/image-kit/:
  pip install requests pillow
  export PEXELS_API_KEY=...
  python fetch_images.py                    # downloads candidates
  open contact-sheet.html, write picks.json
  python fetch_images.py --pick picks.json  # compresses and writes the manifest`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const known = new Set(JSON.parse(readFileSync(KIT, 'utf8')).map((s) => s.slot));

const kept = {};
const skipped = [];

for (const entry of manifest) {
  const { slot, page, alt, hero, section, og_image: og, files } = entry;
  const problems = [];

  if (!slot) problems.push('no slot name');
  else if (!known.has(slot)) problems.push(`slot "${slot}" is not in images.json`);
  if (!alt || alt.trim().length < 10) problems.push('alt text missing or too short');
  if (!page) problems.push('no page path');
  if (!Array.isArray(files) || files.length === 0) problems.push('no files');

  const sources = [];
  for (const f of files ?? []) {
    const onDisk = join(ROOT, 'public', f.file.replace(/^\//, ''));
    if (!existsSync(onDisk)) {
      problems.push(`${f.file} is missing on disk`);
      continue;
    }
    if (!f.width || !f.height) {
      problems.push(`${f.file} has no dimensions (would cause layout shift)`);
      continue;
    }
    sources.push({ file: f.file, width: f.width, height: f.height, kb: Math.round(statSync(onDisk).size / 1024) });
  }

  if (problems.length) {
    skipped.push({ slot: slot ?? '(unnamed)', problems });
    continue;
  }

  sources.sort((a, b) => a.width - b.width);
  kept[slot] = {
    slot,
    page,
    alt: alt.trim(),
    hero: Boolean(hero),
    ...(section ? { section } : {}),
    ...(og && existsSync(join(ROOT, 'public', String(og).replace(/^\//, ''))) ? { og } : {}),
    sources: sources.map(({ file, width, height }) => ({ file, width, height })),
  };

  const weight = sources.reduce((max, s) => Math.max(max, s.kb), 0);
  console.log(`  ${slot.padEnd(28)} ${sources.length} widths, largest ${weight} KB`);
}

const body = `export const photos: Record<string, Photo> = ${JSON.stringify(kept, null, 2)};`;
const current = readFileSync(TARGET, 'utf8');
const updated = current.replace(
  /\/\* GENERATED:START[\s\S]*?\/\* GENERATED:END \*\//,
  `/* GENERATED:START — replaced by scripts/apply-photos.mjs */\n${body}\n/* GENERATED:END */`,
);
if (updated === current && Object.keys(kept).length) {
  console.error('Could not find the GENERATED markers in src/data/photos.ts.');
  process.exit(1);
}
writeFileSync(TARGET, updated);

console.log(`\nWrote ${Object.keys(kept).length} photo slots to src/data/photos.ts`);

if (skipped.length) {
  console.log(`\nSkipped ${skipped.length} slot(s) — these pages keep their illustration:`);
  for (const s of skipped) console.log(`  ${s.slot}: ${s.problems.join('; ')}`);
}

const heroes = Object.values(kept).filter((p) => p.hero);
if (heroes.length) {
  console.log(`\n${heroes.length} hero slot(s) will be preloaded: ${heroes.map((h) => h.slot).join(', ')}`);
}
console.log('\nNext: npm run build && npm run audit -- <origin>, then commit src/data/photos.ts and public/images/.');
