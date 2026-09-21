import { SITE_URL, testimonials, unverifiedClaims } from '@/lib/site';
import { BUSINESS_ID } from '@/lib/seo';

/**
 * Review markup for /reviews/.
 *
 * Returns null while there are no real reviews, which is the default. Review
 * and AggregateRating markup describing reviews that are not on the page — or
 * that do not exist — is a structured data violation, so the schema is built
 * from the same array the page renders and nothing else.
 */
export function buildReviewSchema(): Record<string, unknown> | null {
  if (testimonials.length === 0) return null;

  const reviews = testimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    datePublished: t.date,
    reviewBody: t.body,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
      worstRating: 1,
    },
    ...(t.sourceUrl ? { url: t.sourceUrl } : {}),
  }));

  const schema: Record<string, unknown> = {
    '@type': 'CleaningService',
    '@id': BUSINESS_ID,
    url: `${SITE_URL}/`,
    review: reviews,
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
