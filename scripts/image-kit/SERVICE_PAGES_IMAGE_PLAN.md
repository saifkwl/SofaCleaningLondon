# Service pages: image plan (built from the live pages, 21 Sep 2026)

Each service page currently has one illustration (`/images/<name>.svg`) as its hero **and** as og:image/twitter:image.
Plan: replace the hero SVG with a real photo, and add 3–4 photos inside the page, each placed directly after the H2 named below.
`images.json` holds the search queries, alt text and sizes for every slot.

| Page | Hero (replaces) | In-page images: after H2 |
|---|---|---|
| Steam sofa cleaning | steam.svg: extraction tool on a fabric sofa | "How steam sofa cleaning works": vacuuming cushion · "Which fabrics take steam cleaning well": fabric close-up · "Drying: what actually controls it": ventilated room · "Steam cleaning for end-of-tenancy checkouts": empty rented flat |
| Sofa dry cleaning | dry.svg: velvet sofa | "Velvet, and why it needs a different pair of hands": velvet pile close-up · "When dry cleaning is the right choice over steam": linen sofa · "Antique and high-value upholstery": antique armchair |
| Leather sofa cleaning | leather.svg: brown leather sofa | "Identifying your leather…": grain close-up · "What we can fix…": cracked leather · "Keeping leather in condition…": leather sofa in a room |
| Carpet & sofa combined | combined.svg: living room carpet + sofa | "How carpet & sofa combined works": carpet cleaning · "What a combined visit typically covers": carpeted stairs · "Carpet fibres and what changes": carpet/wool close-up |
| Sofa bed cleaning | sofabed.svg: opened sofa bed | "What we most often find inside a sofa bed": mattress close-up · "Sofa beds, guests and allergies": guest room · "Keeping it fresh between cleans": fresh bedding |
| Commercial upholstery | commercial.svg: restaurant banquette | "What we clean, by sector": office chairs · "Contract fabrics…": hotel lobby seating · "Odour control in pubs and restaurants": pub seating |

## Rules while choosing photos
- The photo must show what its alt text says. If the best candidate differs slightly, rewrite the alt to describe the actual photo. Never keep an alt that describes something not in the image.
- Hero photos: the current SVG alt texts describe a cleaning action in progress. If the chosen photo is only the furniture (no cleaning), change the alt accordingly.
- Reject: other companies' logos/vans/uniforms, visible brand names, watermarks, obviously non-UK settings for tenancy/pub images, dirty/"before" shots presented as results.
- Don't caption any stock photo as our work, our team, or before/after.

## Social share images (og:image)
All six pages use an **SVG** as og:image. Facebook, WhatsApp, LinkedIn and X don't display SVG previews, so shared links show no image.
`fetch_images.py --pick` also writes `<slot>-og.jpg` (1200×630) for every hero. Point `og:image` and `twitter:image` on each service page at that JPG (absolute URL) and set og:image:alt to the hero alt.

## Keep the SVGs?
Keep the SVG files in the repo if they're used elsewhere (e.g. the /services/ hub cards). Only swap the hero on each service page.
