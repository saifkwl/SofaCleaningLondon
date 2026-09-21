import { JsonLd } from './JsonLd';
import { pageGraph } from '@/lib/seo';
import type { Crumb } from './Breadcrumbs';

/**
 * The single JSON-LD block for a page.
 *
 * Every page renders exactly one of these. It carries the business and website
 * nodes plus whatever the page adds, all inside one `@graph` so that `@id`
 * references between them resolve.
 *
 * `crumbs` must be the same array passed to <Breadcrumbs>, so the markup and
 * the structured data describe the same trail.
 */
export function PageSchema({
  crumbs,
  nodes,
}: {
  crumbs?: Crumb[];
  nodes?: Record<string, unknown>[];
}) {
  return <JsonLd data={pageGraph({ crumbs, nodes })} />;
}
