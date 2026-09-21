/**
 * Single source of truth for business facts.
 *
 * IMPORTANT — honesty policy for this site:
 * Nothing in this file is invented marketing. Anything that would be a factual
 * claim about the business (certifications, insurance cover, review scores,
 * years trading, number of jobs completed) lives under `unverifiedClaims`
 * and is DISABLED by default. The UI renders those blocks only when the owner
 * flips a flag, after they can actually evidence the claim.
 *
 * Do not enable a claim you cannot prove with a document, a policy number or a
 * public review profile.
 */

export const SITE_URL = 'https://sofacleaninglondon.com';

export const PHONE_DISPLAY = '+44 7342 840056';
/** E.164, used in tel: links and schema.org telephone. */
export const PHONE_E164 = '+447342840056';
/** wa.me requires the number with no plus and no spaces. */
export const WHATSAPP_NUMBER = '447342840056';

export const site = {
  name: 'Sofa Cleaning London',
  legalName: 'Sofa Cleaning London',
  url: SITE_URL,
  /** Used as the default OG image and the schema.org `image` value. */
  ogImage: `${SITE_URL}/images/og-default.png`,
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  whatsappNumber: WHATSAPP_NUMBER,
  email: 'hello@sofacleaninglondon.com',
  /**
   * A mobile service has no shopfront. schema.org wants an address, so we
   * publish the service area rather than a fake street address — Google
   * treats this as a service-area business.
   */
  addressLocality: 'London',
  addressRegion: 'Greater London',
  addressCountry: 'GB',
  priceRange: '££',
  /** Hours you actually answer the phone. Edit if these change. */
  openingHours: { opens: '08:00', closes: '20:00', days: [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ] },
  currency: 'GBP',
  currencySymbol: '£',
} as const;

/**
 * Claims that need evidence before they go live.
 * Set `enabled: true` ONLY once the underlying document exists.
 */
export const unverifiedClaims = {
  /** Public liability insurance. Set the real cover amount and insurer. */
  insurance: { enabled: false, cover: '', insurer: '' },
  /** Trade bodies, e.g. NCCA / WoolSafe. Only list memberships you hold. */
  accreditations: { enabled: false, bodies: [] as string[] },
  /**
   * Aggregate review rating. Leave disabled until you have a real, public
   * review profile — fabricated AggregateRating markup is a manual-action risk
   * and is removed from rich results when Google cannot corroborate it.
   */
  aggregateRating: { enabled: false, ratingValue: 0, reviewCount: 0, profileUrl: '' },
  /** Years in business / jobs completed counters. */
  trackRecord: { enabled: false, yearsTrading: 0, jobsCompleted: 0 },
} as const;

/**
 * Public review profiles. Add the URLs once the listings exist; the reviews
 * page links to them instead of displaying invented testimonials.
 */
export const reviewProfiles: { label: string; url: string }[] = [
  // { label: 'Google Business Profile', url: 'https://...' },
  // { label: 'Trustpilot', url: 'https://...' },
];

/**
 * Real customer reviews, added by hand after the customer gives permission.
 * Ships empty on purpose. Never populate this with written-for-you copy.
 */
export type Testimonial = {
  name: string;
  area: string;
  date: string; // ISO date
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  sourceUrl?: string;
};

export const testimonials: Testimonial[] = [];

/** tel: href */
export const telHref = `tel:${PHONE_E164}`;

/** Builds a wa.me deep link with a pre-filled message. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Absolute URL for canonicals, OG tags and sitemap entries. */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+|\/+$/g, '')}/`;
  return `${SITE_URL}${clean}`;
}
