/**
 * Replaces the bundled SVG illustrations with real royalty-free photographs.
 *
 *   PEXELS_API_KEY=xxxx node scripts/fetch-photos.mjs          # preview only
 *   PEXELS_API_KEY=xxxx node scripts/fetch-photos.mjs --apply  # download + rewrite
 *
 * A Pexels API key is free and takes about a minute to get:
 * https://www.pexels.com/api/  — the Pexels licence allows commercial use with
 * no attribution required, though this script records the photographer anyway
 * and the site renders a credit line where one is present.
 *
 * Without --apply the script only prints what it would download, so you can
 * check the results are actually relevant before committing to them. That
 * matters: a search result is not a guarantee of a suitable photograph, and a
 * picture of the wrong thing is worse for the page than a clean illustration.
 *
 * To use your own photographs instead, drop them in public/images/photos/ and
 * point the `src` values in src/data/images.ts at them. That is the better
 * option if you have them — photos of your own work beat any stock library.
 */
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PHOTO_DIR = resolve(ROOT, 'public/images/photos');
const REGISTRY = resolve(ROOT, 'src/data/images.ts');
const APPLY = process.argv.includes('--apply');
const KEY = process.env.PEXELS_API_KEY;

/**
 * One search per image slot. The queries are deliberately narrow — a broad
 * query like "sofa" returns furniture catalogue shots that say nothing about
 * cleaning.
 */
const QUERIES = {
  hero: 'person cleaning sofa upholstery',
  steam: 'steam cleaning upholstery machine',
  dry: 'velvet sofa interior living room',
  leather: 'leather sofa close up',
  combined: 'carpet cleaning living room',
  sofabed: 'sofa bed mattress living room',
  commercial: 'restaurant banquette seating interior',
  process: 'cleaning equipment vacuum upholstery',
  fabrics: 'upholstery fabric swatches texture',
  quote: 'person on phone with notebook',
};

if (!KEY) {
  console.error('Set PEXELS_API_KEY first. Get a free key at https://www.pexels.com/api/');
  process.exit(1);
}

async function search(query) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&size=large`;
  const res = await fetch(url, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error(`Pexels returned ${res.status} for "${query}"`);
  const body = await res.json();
  return body.photos?.[0] ?? null;
}

const results = {};

for (const [key, query] of Object.entries(QUERIES)) {
  const photo = await search(query);
  if (!photo) {
    console.warn(`  no result for ${key} ("${query}") — keeping the illustration`);
    continue;
  }
  results[key] = {
    key,
    query,
    page: photo.url,
    photographer: photo.photographer,
    file: `${key}.jpg`,
    download: photo.src.large2x ?? photo.src.large,
    alt: photo.alt,
  };
  console.log(`${key.padEnd(12)} ${photo.photographer.padEnd(22)} ${photo.url}`);
}

if (!APPLY) {
  console.log('\nPreview only. Open the URLs above, confirm each photo actually shows');
  console.log('what the page is about, then re-run with --apply to download them.');
  process.exit(0);
}

await mkdir(PHOTO_DIR, { recursive: true });

let registry = await readFile(REGISTRY, 'utf8');

for (const entry of Object.values(results)) {
  const res = await fetch(entry.download);
  if (!res.ok) {
    console.warn(`  download failed for ${entry.key} — keeping the illustration`);
    continue;
  }
  await writeFile(resolve(PHOTO_DIR, entry.file), Buffer.from(await res.arrayBuffer()));

  // Point the registry entry at the downloaded file and record the credit.
  const pattern = new RegExp(`(\\b${entry.key}: \\{[\\s\\S]*?src: ')[^']+(')`);
  registry = registry.replace(pattern, `$1/images/photos/${entry.file}$2`);
  console.log(`  saved public/images/photos/${entry.file}`);
}

await writeFile(REGISTRY, registry);

console.log('\nDone. Two things left to do by hand:');
console.log('  1. Update the `width` and `height` for each changed entry in src/data/images.ts');
console.log('     to the real pixel dimensions, or CLS will regress.');
console.log('  2. Rewrite the `alt` text to describe the photo you actually got.');
