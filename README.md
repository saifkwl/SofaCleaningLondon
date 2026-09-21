# Sofa Cleaning London

A static, pre-rendered Next.js site for a London sofa and upholstery cleaning
business. 32 pages: 6 services, 10 areas, prices, a quote estimator, and the
usual company and legal pages.

Lead capture hands off to WhatsApp — there is no backend, no database and no
form endpoint.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

---

## ⚠️ Before you go live

Six things need your confirmation. The site is honest by default, which means a
few blocks are switched **off** until you can evidence them.

### 1. Confirm the prices — `src/data/pricing.ts`

Every price on the site comes from this one file. The figures in it are
plausible London market rates, **not your rates**. Set `from` and `to` on each
item, plus `MINIMUM_CHARGE`, then delete the notice at the top of the file.

### 2. Confirm the operational claims

These appear in page copy and are true only if you operate this way:

| Claim | Where | Change it in |
|---|---|---|
| ULEZ-compliant van, no emissions surcharge | Every area page | `src/data/areas.ts` → `congestionCharge` |
| Open 08:00–20:00, seven days | Site-wide | `src/lib/site.ts` → `openingHours` |
| Free quotes, no call-out fee | Prices, quote, contact | `src/app/sofa-cleaning-prices-london/page.tsx` |
| 2–3 working day lead time | Area FAQs | `src/data/areas.ts` → `faqs` |
| 48-hour window for damage claims | Terms | `src/app/terms/page.tsx` |

### 3. Turn on the claims you can evidence — `src/lib/site.ts`

`unverifiedClaims` ships with everything disabled. Enable an entry only when the
document behind it exists:

```ts
insurance:      { enabled: true, cover: '£5m', insurer: 'Your Insurer Ltd' },
accreditations: { enabled: true, bodies: ['NCCA', 'WoolSafe'] },
aggregateRating:{ enabled: true, ratingValue: 4.9, reviewCount: 87, profileUrl: '…' },
trackRecord:    { enabled: true, yearsTrading: 8, jobsCompleted: 3200 },
```

Why these are off by default:

- **Accreditation badges** — displaying an NCCA or WoolSafe mark without the
  membership is trademark misuse, and both bodies publish member directories
  that customers check.
- **Insurance figures** — a cover amount you cannot produce a certificate for is
  a misrepresentation, and it is the first thing a commercial client asks for.
- **Aggregate rating** — `AggregateRating` markup that Google cannot corroborate
  against a real review profile gets stripped from rich results at best, and is
  a manual-action risk at worst.

### 4. Reviews are empty on purpose — `src/lib/site.ts`

`testimonials` is an empty array and `/reviews/` renders an honest "still
collecting" state. Add real reviews, with permission, and a `sourceUrl` pointing
at the public original. The `Review` schema is generated from the same array the
page renders, so the two can never disagree. Add your Google Business Profile and
Trustpilot URLs to `reviewProfiles` once they exist.

### 5. Check the legal pages

`/privacy-policy/` describes the site accurately **as built**: no cookies, no
analytics, no form endpoint. If you add analytics, a pixel, a chat widget or a
server-side form, it stops being true and you will also need cookie consent
under PECR. Have a solicitor review both legal pages.

### 6. Replace the illustrations with photographs (optional)

See **Images** below.

---

## Images

Every image slot has a bundled SVG illustration in `public/images/`, generated
by `scripts/build-illustrations.mjs`. They depict what each page is about, weigh
2–4 KB and never shift layout. The site is complete with these alone.

Photographs are **additive**: a page uses one when it exists and keeps its
illustration when it does not, so adding them is never all-or-nothing.

### Adding photographs

`scripts/image-kit/` holds the slot manifest (25 slots, one per page) and a
Pexels fetcher. Pexels images are free for commercial use.

```bash
cd scripts/image-kit
pip install requests pillow
export PEXELS_API_KEY=...            # free key: https://www.pexels.com/api/

python fetch_images.py               # downloads 3 candidates per slot
open contact-sheet.html              # look at them, choose one per slot
                                     # write picks.json: {"home-hero": "home-hero-2", ...}
python fetch_images.py --pick picks.json   # compresses to WebP, writes the manifest

cd ../..
npm run photos:apply                 # generates src/data/photos.ts
npm run build
```

**Look at the candidates before picking.** A search result is not a guarantee of
a relevant photograph. Reject anything showing another company's logo, branded
vans or uniforms, a readable face as the main subject, or a location that does
not match the area page.

`npm run photos:apply` validates every slot before writing it — the files it
names must exist on disk, carry real dimensions, and have alt text. A slot that
fails is reported and skipped, so that page keeps its illustration rather than
shipping a broken image.

### What the pages then do

- Hero slots get `fetchpriority="high"`, no lazy loading, and a
  `<link rel="preload" as="image" imagesrcset>` in `<head>`.
- Everything else gets `loading="lazy" decoding="async"`.
- Every image carries explicit `width`/`height`, so CLS stays at zero.
- The lead photo becomes the `image` on that page's `Service` JSON-LD.
- Area pages gain a local photo they do not otherwise have.

### Honesty rule for stock photographs

These are illustrative. **Never caption them as "our work", "our team", or
"before and after".** Keep the alt text descriptive of what the photo shows.
Photographs of your own jobs beat any stock library — drop them in
`public/images/` and add them to the manifest by hand.

### Share cards (og:image)

Facebook, WhatsApp, LinkedIn and X do not render SVG in a link preview, so an
SVG `og:image` means a shared link shows no image at all. Every illustration
therefore has a 1200x630 JPEG beside it in `public/images/og/`, and that is what
the pages point `og:image` at — never the `.svg`.

When the image kit produces a real hero photo it also writes `<slot>-og.jpg`,
and the page prefers that over the illustration's card automatically.

### In-page photos on service pages

`scripts/image-kit/SERVICE_PAGES_IMAGE_PLAN.md` places 3–4 photos inside each
service page, under named H2s. The pairing is made at render time by matching
the photo's `section` against the heading the page actually renders, compared
loosely on case and punctuation.

That means a reworded heading cannot put a photo in the wrong place — it simply
stops matching and the section renders without an image.

### Regenerating brand assets

```bash
npm run illustrations   # the SVGs
npm run social          # the 1200x630 share cards
npm run icons           # favicon, apple touch icon, default Open Graph card
```

## Adding a page

`src/lib/routes.ts` is the single URL inventory. The header, footer,
`/sitemap/` page and `sitemap.xml` are **all** generated from it, so they cannot
drift apart — a sitemap listing a page the nav does not link to is the most
common reason pages sit in "Discovered – currently not indexed".

- **A service** → add an entry to `src/data/services.ts`. The route, nav link,
  footer link, sitemap entry and static params follow automatically.
- **An area** → add an entry to `src/data/areas.ts`, and set `neighbours` on it
  *and* on the areas it borders so the lateral links work both ways.
- **A one-off page** → create the route, then add it to `src/lib/routes.ts`.

### Area pages have a content bar

Every field in the `Area` type marked `VARY` must carry real local detail:
postcodes, named streets, real stations, the actual housing stock, and the
genuine parking and Congestion Charge position. Ten pages that differ only by a
swapped place name are doorway pages, and shipping them actively suppresses the
pages that would otherwise rank. If you cannot fill those fields for a new area,
do not add the page.

---

## Verifying

```bash
npm run build
npx serve out -l 3210          # or: cd out && python3 -m http.server 3210

SITE_ORIGIN=http://127.0.0.1:3210 npm run audit -- http://127.0.0.1:3210
SITE_ORIGIN=http://127.0.0.1:3210 npm run verify:leads
SITE_ORIGIN=http://127.0.0.1:3210 npm run screenshots
npm run typecheck
```

`npm run audit` fetches every URL in `sitemap.xml` and fails on: non-200s,
canonical mismatches, duplicate titles or descriptions, `noindex` in the
sitemap, missing or multiple `<h1>`, invalid JSON-LD, thin content (800+ words
for service pages, 650+ for area pages) and any page with fewer than three
internal inbound links.

Current state: **0 failures, 0 warnings.** Service pages run 2,200–2,500 words,
area pages 1,800–1,900, and every page has 26+ inbound internal links.

---

## Deploying to Cloudflare Pages

The site is a static export, so there is no adapter and no server to run.
Settings for the Cloudflare Pages setup screen:

| Field | Value |
|---|---|
| Production branch | `claude/adoring-mendel-t8cy09` (rename to `main` first — see below) |
| Framework preset | **Next.js (Static HTML Export)** |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | leave blank |
| Environment variables | none needed |

Node 22 is pinned by `.node-version` and `wrangler.toml` sets the output
directory, so those two are handled by the repo. The build command is the one
setting that only exists in the dashboard — it is currently set to
`npm run build`, and if it is ever cleared, every URL returns 404 because no
build runs and `out/` is never created.

`public/_headers` is copied into `out/` and read by Cloudflare Pages natively;
it carries the security and cache headers that a static export cannot set in
`next.config.mjs`.

### Rename the branch to `main` first

Right now the only branch in the repo is `claude/adoring-mendel-t8cy09`, which
is why the production branch dropdown looks near-empty. A long-lived site should
deploy from `main`:

```bash
git branch -m claude/adoring-mendel-t8cy09 main
git push -u origin main
git push origin --delete claude/adoring-mendel-t8cy09
```

Then pick `main` as the production branch.

---

## After deploying

1. Point `SITE_URL` in `src/lib/site.ts` at the live domain if it is not
   `https://sofacleaninglondon.com`. It drives every canonical, the Open Graph
   URLs and `sitemap.xml`.
2. Verify the domain in Google Search Console and submit
   `https://yourdomain.com/sitemap.xml`.
3. Create the Google Business Profile — for a local service business it drives
   more enquiries than the site does, and it is where reviews accumulate.
4. Re-run `npm run audit` against the live domain.

Indexing takes days to several weeks on a new domain, and large page families
are indexed progressively rather than all at once. Nobody can promise indexing;
partial early coverage is normal.

---

## Stack

Next.js 15 (App Router, `output: 'export'`) · React 19 · TypeScript (strict) ·
Tailwind CSS 3.

`npm run build` writes a folder of plain HTML to `out/` — no Node server, no
hosting adapter. Every page is statically pre-rendered. Shared JavaScript is ~102 KB; only
`/get-a-quote/` adds meaningfully to it (2.5 KB for the calculator). The FAQ
accordions and the mobile menu use native `<details>`, so their content is in
the served HTML and readable without JavaScript.

| Path | What it is |
|---|---|
| `src/lib/site.ts` | Business facts, phone number, claim flags |
| `src/lib/routes.ts` | The URL inventory everything derives from |
| `src/lib/seo.ts` | Metadata builder and JSON-LD |
| `src/data/` | Services, areas, pricing, image registry |
| `src/components/` | UI, forms, schema emitters |
| `scripts/` | Illustrations, icons, photos, audit, tests |
