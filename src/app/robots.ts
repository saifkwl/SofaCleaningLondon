import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * robots.txt
 *
 * Everything is crawlable. Note what is deliberately NOT blocked: /_next/ and
 * the image directory. Google renders pages before judging them, and blocking
 * CSS, JavaScript or images breaks that render and the mobile-usability
 * assessment along with it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Tracking parameters create duplicate URLs with no unique content.
        disallow: ['/*?utm_', '/*?fbclid='],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
