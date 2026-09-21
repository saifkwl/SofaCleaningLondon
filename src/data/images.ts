/**
 * Image registry.
 *
 * Every image on the site is referenced through this file, so swapping the
 * bundled illustrations for photographs is a one-file change (see
 * scripts/fetch-photos.mjs, which rewrites the `src` values for you).
 *
 * `width` and `height` are the intrinsic dimensions and must be accurate —
 * Next/Image uses them to reserve space before the file loads, which is what
 * keeps Cumulative Layout Shift at zero.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  /** Describes what is in the image, for screen readers and for image search. */
  alt: string;
  /**
   * 1200x630 JPEG for og:image, generated from the SVG by
   * scripts/build-social-cards.mjs. Social platforms do not render SVG in a
   * link preview, so this is what gets shared — never the .svg.
   */
  og: string;
  /** Set when a stock photograph replaces the drawing. */
  credit?: { photographer: string; sourceUrl: string; license: string };
};

export const images: Record<string, SiteImage> = {
  hero: {
    src: '/images/hero.svg',
    og: '/images/og/hero.jpg',
    width: 1200,
    height: 800,
    alt: 'A fabric three-seater sofa being cleaned with an upholstery extraction tool, with steam rising from the seat cushions.',
  },
  steam: {
    src: '/images/steam.svg',
    og: '/images/og/steam.jpg',
    width: 1200,
    height: 800,
    alt: 'Hot water extraction in progress on a fabric sofa, the hand tool drawing cleaning solution back out of the seat.',
  },
  dry: {
    src: '/images/dry.svg',
    og: '/images/og/dry.jpg',
    width: 1200,
    height: 800,
    alt: 'A velvet sofa being dry cleaned with low-moisture foam and a soft upholstery brush.',
  },
  leather: {
    src: '/images/leather.svg',
    og: '/images/og/leather.jpg',
    width: 1200,
    height: 800,
    alt: 'A brown leather sofa being cleaned with a pH-balanced product applied to a soft cloth, ready for conditioning.',
  },
  combined: {
    src: '/images/combined.svg',
    og: '/images/og/combined.jpg',
    width: 1200,
    height: 800,
    alt: 'A living room with a sofa, an armchair and a carpet all being cleaned in the same visit.',
  },
  sofabed: {
    src: '/images/sofabed.svg',
    og: '/images/og/sofabed.jpg',
    width: 1200,
    height: 800,
    alt: 'A sofa bed opened out with the fold-out mattress exposed for cleaning on both faces.',
  },
  commercial: {
    src: '/images/commercial.svg',
    og: '/images/og/commercial.jpg',
    width: 1200,
    height: 800,
    alt: 'A run of restaurant banquette seating and an office task chair being cleaned outside trading hours.',
  },
  process: {
    src: '/images/process.svg',
    og: '/images/og/process.jpg',
    width: 1200,
    height: 800,
    alt: 'A diagram of the six-stage upholstery cleaning process arranged around a sofa.',
  },
  fabrics: {
    src: '/images/fabrics.svg',
    og: '/images/og/fabrics.jpg',
    width: 1200,
    height: 800,
    alt: 'Six upholstery fabric swatches: cotton, velvet, linen, leather, polyester and microfibre.',
  },
  quote: {
    src: '/images/quote.svg',
    og: '/images/og/quote.jpg',
    width: 1200,
    height: 800,
    alt: 'An itemised cleaning quote alongside a mobile phone, representing a no-obligation written price.',
  },
};

/** The share-card URL for an illustration key. Never returns an SVG. */
export function ogFor(key: string): string {
  return getImage(key).og;
}

export function getImage(key: string): SiteImage {
  const image = images[key];
  if (!image) throw new Error(`Unknown image key: ${key}`);
  return image;
}
