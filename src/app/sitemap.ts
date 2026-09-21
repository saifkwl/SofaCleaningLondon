import type { MetadataRoute } from 'next';
import { allRoutes } from '@/lib/routes';
import { absoluteUrl } from '@/lib/site';

// A static export has no server to generate this on request, so it is written
// out as a plain file at build time.
export const dynamic = 'force-static';

/**
 * sitemap.xml
 *
 * Built from the same route inventory the nav and footer use, so it lists
 * every indexable URL and only indexable URLs. Each <loc> is byte-identical to
 * that page's canonical tag, trailing slash included — a mismatch there is one
 * of the most common reasons a correctly-built page still fails to index.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // A single build timestamp. Prefer real per-page modification dates if you
  // later move content into a CMS — Google learns to ignore a lastmod that is
  // identical across every URL and changes on every deploy.
  const lastModified = new Date();

  return allRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
