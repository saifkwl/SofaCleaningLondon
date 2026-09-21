/**
 * Responsive photographs, keyed by the slot names in scripts/image-kit/images.json.
 *
 * THIS FILE IS GENERATED. Run `npm run photos:apply` after the image kit has
 * produced public/images/manifest.json — do not edit the `photos` object by hand.
 *
 * It ships empty on purpose. Every page falls back to its bundled illustration
 * when a slot has no photograph, so the site is complete either way and adding
 * photos is additive rather than a prerequisite.
 */

export type PhotoSource = { file: string; width: number; height: number };

export type Photo = {
  slot: string;
  /** Page path this photo belongs to, e.g. "/areas-we-cover/putney/". */
  page: string;
  alt: string;
  /** Above the fold: preloaded, high priority, never lazy-loaded. */
  hero: boolean;
  /**
   * The exact H2 this photo belongs under, when it is an in-page image rather
   * than a hero. Matched against the heading the page renders, so the pairing
   * cannot drift if a heading is reworded — it simply stops matching, and the
   * page renders without that image rather than putting it in the wrong place.
   */
  section?: string;
  /** 1200x630 JPEG share card, when the kit generated one for this slot. */
  og?: string;
  /** Ascending by width. The largest is used as the `src`. */
  sources: PhotoSource[];
};

/* GENERATED:START — replaced by scripts/apply-photos.mjs */
export const photos: Record<string, Photo> = {};
/* GENERATED:END */

export function getPhoto(slot: string): Photo | undefined {
  const p = photos[slot];
  return p && p.sources.length > 0 ? p : undefined;
}

/** The widest source, used as the `src` and for the og:image / JSON-LD image. */
export function largest(photo: Photo): PhotoSource {
  return photo.sources[photo.sources.length - 1];
}

/**
 * The photo that belongs under a given heading on a given page, if any.
 * Headings are compared loosely on case and punctuation so an ampersand or a
 * stray comma does not break the pairing.
 */
export function photoForSection(page: string, heading: string): Photo | undefined {
  const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const want = norm(heading);
  return Object.values(photos).find(
    (p) => p.page === page && p.section && norm(p.section) === want && p.sources.length > 0,
  );
}

/** A `srcset` string listing every generated width. */
export function srcSet(photo: Photo): string {
  return photo.sources.map((s) => `${s.file} ${s.width}w`).join(', ');
}
