import Link from 'next/link';

export type Crumb = { name: string; path?: string };

/**
 * The visible breadcrumb trail.
 *
 * The matching BreadcrumbList markup is emitted by <PageSchema>, from the same
 * `crumbs` array — pass one array to both so the structured data can never
 * describe a hierarchy the page does not actually show.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-content pt-5">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
          {crumbs.map((c, i) => (
            <li key={c.name} className="flex items-center gap-2">
              {c.path ? (
                <Link href={c.path} className="transition-colors hover:text-brand-700 hover:underline">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink-soft">
                  {c.name}
                </span>
              )}
              {i < crumbs.length - 1 && (
                <span aria-hidden className="text-brand-300">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
    </nav>
  );
}
