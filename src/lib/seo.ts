import type { Metadata } from 'next';
import { SITE_URL, absoluteUrl, site, unverifiedClaims } from './site';
import type { FAQ } from '@/data/services';

/**
 * Builds the per-page <head>. Every page calls this, so no two pages can end
 * up sharing a title, a description or a canonical by accident.
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  /** Path with leading and trailing slash. Becomes the canonical and og:url. */
  path: string;
  /** Absolute or root-relative image. Defaults to the site OG image. */
  image?: string;
  /** Set for pages that should stay out of the index. */
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image
    ? opts.image.startsWith('http')
      ? opts.image
      : `${SITE_URL}${opts.image}`
    : site.ogImage;

  return {
    // Absolute, so the layout's "%s | Sofa Cleaning London" template does not
    // append a second brand suffix — each title below already carries one.
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-image-preview': 'large',
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_GB',
      url,
      title: opts.title,
      description: opts.description,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * The site-wide business entity, emitted once in the root layout.
 *
 * Note what is NOT here: aggregateRating. Publishing a review score the
 * business cannot evidence is a manual-action risk and Google strips ratings
 * it cannot corroborate anyway. The block is added only when the owner enables
 * it in src/lib/site.ts, after a real public review profile exists.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': BUSINESS_ID,
    name: site.name,
    url: `${SITE_URL}/`,
    telephone: site.phoneE164,
    email: site.email,
    image: site.ogImage,
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.addressLocality,
      addressRegion: site.addressRegion,
      addressCountry: site.addressCountry,
    },
    areaServed: {
      '@type': 'City',
      name: 'London',
      containedInPlace: { '@type': 'Country', name: 'United Kingdom' },
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.openingHours.days,
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
  };

  if (unverifiedClaims.aggregateRating.enabled) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: unverifiedClaims.aggregateRating.ratingValue,
      reviewCount: unverifiedClaims.aggregateRating.reviewCount,
    };
  }

  return schema;
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaNames?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { '@id': BUSINESS_ID },
    areaServed: (opts.areaNames ?? ['London']).map((name) => ({ '@type': 'Place', name })),
  };
}

/** Mirrors the visible breadcrumb exactly. The last crumb carries no `item`. */
export function breadcrumbSchema(crumbs: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: absoluteUrl(c.path) } : {}),
    })),
  };
}

/** Only emit this where the questions and answers are visible on the page. */
export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: site.name,
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'en-GB',
  };
}
