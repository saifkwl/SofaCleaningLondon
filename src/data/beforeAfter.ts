/**
 * Real before/after job photographs, shown on the homepage and reviews page.
 *
 * These are photos of actual jobs, not stock images — unlike the illustration
 * fallbacks in `src/data/images.ts`. Add a new pair here and drop the two
 * files in public/images/before-after/ to add another one.
 */
export type BeforeAfterPair = {
  slug: string;
  title: string;
  before: { src: string; width: number; height: number; alt: string };
  after: { src: string; width: number; height: number; alt: string };
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    slug: 'grey-armchair',
    title: 'Grey suede-effect armchair',
    before: {
      src: '/images/before-after/grey-armchair-before.jpg',
      width: 1080,
      height: 1440,
      alt: 'Grey suede-effect armchair before cleaning, showing dull, patchy fabric and general soiling.',
    },
    after: {
      src: '/images/before-after/grey-armchair-after.jpg',
      width: 1080,
      height: 1440,
      alt: 'The same grey suede-effect armchair after cleaning, with an even colour and drying equipment beside it.',
    },
  },
  {
    slug: 'wingback-armchair',
    title: 'Tufted wingback armchair',
    before: {
      src: '/images/before-after/wingback-armchair-before.jpg',
      width: 686,
      height: 960,
      alt: 'Beige tufted wingback armchair before cleaning, with heavy grey soiling across the seat and back.',
    },
    after: {
      src: '/images/before-after/wingback-armchair-after.jpg',
      width: 716,
      height: 960,
      alt: 'The same wingback armchair after cleaning, restored to an even cream colour.',
    },
  },
  {
    slug: 'corner-sofa-cushion',
    title: 'Fabric sofa seat cushion',
    before: {
      src: '/images/before-after/corner-sofa-cushion-before.jpg',
      width: 720,
      height: 1245,
      alt: 'Close-up of a grey fabric sofa cushion before cleaning, with a dark ring stain and general grime.',
    },
    after: {
      src: '/images/before-after/corner-sofa-cushion-after.jpg',
      width: 720,
      height: 1233,
      alt: 'The same sofa cushion after cleaning, stain fully removed with an even, groomed pile.',
    },
  },
  {
    slug: 'velvet-dining-chair',
    title: 'Crushed velvet dining chair',
    before: {
      src: '/images/before-after/velvet-dining-chair-before.jpg',
      width: 736,
      height: 1000,
      alt: 'Crushed velvet dining chair before cleaning, with an orange rust-coloured stain across the seat and arm.',
    },
    after: {
      src: '/images/before-after/velvet-dining-chair-after.jpg',
      width: 736,
      height: 1000,
      alt: 'The same crushed velvet dining chair after cleaning, with the stain removed.',
    },
  },
  {
    slug: 'corner-sofa',
    title: 'L-shape corner sofa',
    before: {
      src: '/images/before-after/corner-sofa-before.jpg',
      width: 1200,
      height: 900,
      alt: 'Large fabric L-shape corner sofa before cleaning, looking dull and unevenly soiled.',
    },
    after: {
      src: '/images/before-after/corner-sofa-after.jpg',
      width: 1200,
      height: 900,
      alt: 'The same L-shape corner sofa after cleaning, with a richer, even colour throughout.',
    },
  },
  {
    slug: 'staircase-carpet',
    title: 'Stair carpet',
    before: {
      src: '/images/before-after/staircase-carpet-before.jpg',
      width: 720,
      height: 950,
      alt: 'Blue stair carpet before cleaning, with dark grey soil tracked into the pile on every step.',
    },
    after: {
      src: '/images/before-after/staircase-carpet-after.jpg',
      width: 720,
      height: 1094,
      alt: 'The same stair carpet after cleaning, restored to an even, bright blue with the extraction tool still on the stairs.',
    },
  },
];
