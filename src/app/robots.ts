import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// A static export has no server to generate this on request, so it is written
// out as a plain file at build time.
export const dynamic = 'force-static';

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
        disallow: [
          // Tracking parameters create duplicate URLs with no unique content.
          '/*?utm_',
          '/*?fbclid=',
          // Next.js writes a React Server Component payload next to every page
          // (/services/x/index.txt). Nothing links to them and they are not in
          // the sitemap, but they mirror each page's text in a machine format,
          // so they are a duplicate-content risk if one is ever crawled.
          //
          // Blocking them costs nothing: the same payload is already inlined in
          // the page's HTML, and these files are only fetched during
          // client-side navigation, which a crawler never performs. Rendering
          // is unaffected.
          '/index.txt$',
          '/*/index.txt$',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
