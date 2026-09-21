/**
 * Crawl/index self-check.
 *
 * Fetches every URL in sitemap.xml from a running server and verifies the
 * things that actually stop pages getting indexed: status codes, canonical
 * correctness, title and description uniqueness, noindex, JSON-LD validity,
 * H1 count, word count, and — most importantly — that every page has at least
 * three internal inbound links from elsewhere on the site.
 *
 * Usage: node scripts/audit.mjs http://127.0.0.1:3210
 */
const origin = (process.argv[2] || 'http://127.0.0.1:3210').replace(/\/$/, '');
const CANONICAL_HOST = 'https://sofacleaninglondon.com';

const fail = [];
const warn = [];
const problem = (list, url, msg) => list.push(`${url.padEnd(46)} ${msg}`);

const sitemapXml = await (await fetch(`${origin}/sitemap.xml`)).text();
const locs = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`sitemap.xml lists ${locs.length} URLs\n`);

const pages = new Map();
const inbound = new Map(locs.map((l) => [new URL(l).pathname, new Set()]));

for (const loc of locs) {
  const path = new URL(loc).pathname;
  const res = await fetch(origin + path, { redirect: 'manual' });
  const html = res.status === 200 ? await res.text() : '';
  pages.set(path, { status: res.status, html, loc });

  if (res.status !== 200) {
    problem(fail, path, `HTTP ${res.status} — a sitemap must list only 200s`);
    continue;
  }

  const pick = (re) => (html.match(re) || [])[1]?.trim();

  // Canonical must exist, be absolute, and match the sitemap <loc> exactly.
  const canonical = pick(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) problem(fail, path, 'no canonical tag');
  else if (canonical !== loc) problem(fail, path, `canonical ${canonical} != sitemap ${loc}`);
  else if (!canonical.startsWith(CANONICAL_HOST)) problem(fail, path, `canonical host wrong: ${canonical}`);

  const title = pick(/<title>([^<]*)<\/title>/);
  if (!title) problem(fail, path, 'no <title>');
  else if (title.length > 65) problem(warn, path, `title ${title.length} chars (>65)`);

  const desc = pick(/<meta name="description" content="([^"]*)"/);
  if (!desc) problem(fail, path, 'no meta description');
  else if (desc.length > 155) problem(fail, path, `description ${desc.length} chars (>155, Ahrefs flags this)`);

  if (/<meta name="robots"[^>]*noindex/i.test(html)) problem(fail, path, 'noindex but in sitemap');

  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) problem(fail, path, `${h1s} <h1> tags (want exactly 1)`);

  // JSON-LD must parse — invalid blocks are silently ignored by Google.
  // Exactly one block, shaped as an @graph containing the business node.
  // Nodes split across separate <script> tags cannot resolve each other's @id
  // references, which validators report as a schema.org error.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) problem(fail, path, 'no JSON-LD');
  else if (blocks.length > 1) problem(fail, path, `${blocks.length} JSON-LD blocks (want 1 @graph)`);
  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      problem(fail, path, `invalid JSON-LD: ${e.message}`);
      continue;
    }
    if (!Array.isArray(parsed['@graph'])) problem(fail, path, 'JSON-LD is not an @graph');
    else {
      const ids = parsed['@graph'].map((n) => n['@id']).filter(Boolean);
      const refs = JSON.stringify(parsed['@graph']).match(/"@id":"[^"]+"/g) ?? [];
      for (const ref of new Set(refs)) {
        const id = ref.slice(7, -1);
        if (!ids.includes(id)) problem(fail, path, `@id reference ${id} resolves to nothing`);
      }
    }
  }

  // Rough body word count from the served HTML — this is text a crawler sees
  // without running any JavaScript.
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  pages.get(path).words = words;
  pages.get(path).title = title;
  pages.get(path).desc = desc;

  // Record internal links for the inbound-link check.
  for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)) {
    const target = href.endsWith('/') ? href : `${href}/`;
    if (inbound.has(target) && target !== path) inbound.get(target).add(path);
  }
}

// Duplicate titles and descriptions across the site.
for (const field of ['title', 'desc']) {
  const seen = new Map();
  for (const [path, p] of pages) {
    if (!p[field]) continue;
    if (seen.has(p[field])) problem(fail, path, `duplicate ${field} with ${seen.get(p[field])}`);
    else seen.set(p[field], path);
  }
}

// Thin-content and orphan checks.
const MIN_WORDS = { service: 800, area: 650, default: 300 };
for (const [path, p] of pages) {
  if (p.status !== 200) continue;
  const kind = path.startsWith('/services/') && path !== '/services/'
    ? 'service'
    : path.startsWith('/areas-we-cover/') && path !== '/areas-we-cover/'
      ? 'area'
      : 'default';
  const min = MIN_WORDS[kind];
  if (p.words < min) problem(fail, path, `${p.words} words (want ${min}+ for a ${kind} page)`);

  const links = inbound.get(path)?.size ?? 0;
  if (path !== '/' && links < 3) problem(fail, path, `only ${links} internal inbound links (want 3+)`);
}

// robots.txt sanity.
const robots = await (await fetch(`${origin}/robots.txt`)).text();
if (/^Disallow: \/$/m.test(robots)) problem(fail, '/robots.txt', 'blanket Disallow: / would deindex the site');
if (!robots.includes('sitemap.xml')) problem(fail, '/robots.txt', 'does not reference sitemap.xml');

// Every Disallow rule is checked against every indexable URL. A wildcard rule
// that accidentally matches a real page is the single most effective way to
// deindex a site, and it is invisible until traffic disappears.
const rules = [...robots.matchAll(/^Disallow:\s*(\S+)\s*$/gm)].map((m) => m[1]);
const matches = (rule, path) => {
  const re = new RegExp(
    '^' +
      rule
        .replace(/[.+^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\\\$$/, '$'),
  );
  return re.test(path);
};
for (const rule of rules) {
  for (const path of pages.keys()) {
    if (matches(rule, path)) problem(fail, path, `blocked by robots.txt rule "${rule}"`);
  }
  if (matches(rule, '/robots.txt')) problem(fail, '/robots.txt', `rule "${rule}" blocks robots.txt itself`);
  if (matches(rule, '/sitemap.xml')) problem(fail, '/sitemap.xml', `rule "${rule}" blocks the sitemap`);
}

// And the RSC payloads should be blocked, since they mirror page text.
const payload = '/services/steam-sofa-cleaning-london/index.txt';
if (!rules.some((r) => matches(r, payload)))
  problem(warn, payload, 'RSC payload is crawlable — mirrors page text in a machine format');

console.log('Word counts');
for (const [path, p] of pages) {
  if (p.status === 200) console.log(`  ${String(p.words).padStart(5)}  ${path}`);
}

console.log('\nInbound internal links');
const counts = [...inbound.entries()].sort((a, b) => a[1].size - b[1].size);
for (const [path, set] of counts.slice(0, 8)) console.log(`  ${String(set.size).padStart(3)}  ${path}`);
console.log(`  … lowest 8 shown of ${counts.length}`);

if (warn.length) {
  console.log(`\nWarnings (${warn.length})`);
  warn.forEach((w) => console.log('  ! ' + w));
}
if (fail.length) {
  console.log(`\nFAILURES (${fail.length})`);
  fail.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('\nAll indexation checks passed.');
