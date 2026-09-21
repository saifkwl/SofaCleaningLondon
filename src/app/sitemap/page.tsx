import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import {
  areaRoutes,
  companyRoutes,
  coreRoutes,
  hubRoutes,
  legalRoutes,
  serviceRoutes,
  allRoutes,
} from '@/lib/routes';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageSchema } from '@/components/PageSchema';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, SectionHeading } from '@/components/Ui';

export const metadata: Metadata = buildMetadata({
  title: 'Site Index | Sofa Cleaning London',
  description:
    'Every page on Sofa Cleaning London in one place — services, areas we cover, prices, quotes and company information.',
  path: '/sitemap/',
});

/**
 * HTML sitemap.
 *
 * Generated from the same route inventory as sitemap.xml, so the two can never
 * disagree. This page exists for crawl depth: it puts every URL on the site
 * within two clicks of the homepage via the footer link, which matters most for
 * the area and service families.
 */
export default function SitemapPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Site index' }]} />
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Site index' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Site index</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl">
              Every page on this site
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              All {allRoutes.length} pages, grouped. There is also a{' '}
              <a href="/sitemap.xml" className="font-semibold text-brand-700 underline underline-offset-4">
                machine-readable sitemap
              </a>{' '}
              for search engines.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content py-12 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Group title="Main pages" links={[...coreRoutes, ...hubRoutes]} />

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">Services</h2>
              <ul className="mt-4 space-y-3">
                {serviceRoutes.map((r, i) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      className="font-semibold text-ink transition-colors hover:text-brand-700 hover:underline"
                    >
                      {r.label}
                    </Link>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                      {services[i].summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">
                Areas we cover
              </h2>
              <ul className="mt-4 space-y-3">
                {areaRoutes.map((r, i) => (
                  <li key={r.path}>
                    <Link
                      href={r.path}
                      className="font-semibold text-ink transition-colors hover:text-brand-700 hover:underline"
                    >
                      Sofa cleaning in {r.label}
                    </Link>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                      {areas[i].postcodes.join(', ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <Group title="Company" links={companyRoutes} />
            <Group title="Legal" links={legalRoutes} />
          </div>
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="For search engines"
            title="Crawl resources"
            intro="Everything a crawler needs is linked from here and from the footer of every page."
          />
          <ul className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
            <li>
              <a
                href="/sitemap.xml"
                className="inline-flex rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-800 hover:border-brand-400"
              >
                sitemap.xml
              </a>
            </li>
            <li>
              <a
                href="/robots.txt"
                className="inline-flex rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-800 hover:border-brand-400"
              >
                robots.txt
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
      <MobileCallBar />
    </>
  );
}

function Group({ title, links }: { title: string; links: { path: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((r) => (
          <li key={r.path}>
            <Link
              href={r.path}
              className="font-semibold text-ink transition-colors hover:text-brand-700 hover:underline"
            >
              {r.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
