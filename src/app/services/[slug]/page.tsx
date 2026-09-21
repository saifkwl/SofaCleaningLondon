import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getService, services } from '@/data/services';
import { areas } from '@/data/areas';
import { Photo, photoUrl } from '@/components/Photo';
import { getImage } from '@/data/images';
import { buildMetadata, faqSchema, serviceSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import { PageSchema } from '@/components/PageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadForm } from '@/components/LeadForm';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import {
  CtaBand,
  DataTable,
  FactList,
  FitPanel,
  LinkCard,
  LinkPills,
  ProcessSteps,
  SectionHeading,
} from '@/components/Ui';

type Params = { slug: string };

/**
 * Pre-renders every service page at build time. Without this the pages are
 * still server-rendered, but generating them up front means the crawler is
 * served static HTML from cache on the first request rather than waiting on a
 * render — which is the difference that shows up in crawl stats.
 */
export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}/`,
    image: getImage(service.image).src,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const image = getImage(service.image);
  // Slots in scripts/image-kit/images.json drop the "-london" suffix.
  const slot = service.slug.replace(/-london$/, '');
  const related = service.related.map((s) => getService(s)).filter(Boolean);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: service.navLabel },
  ];

  return (
    <>
      <PageSchema
        crumbs={crumbs}
        nodes={[
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}/`,
            areaNames: ['Greater London', ...areas.map((a) => a.name)],
            image: photoUrl(slot),
          }),
          faqSchema(service.faqs),
        ]}
      />

      <Breadcrumbs crumbs={crumbs} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="eyebrow">{service.name}</p>
              <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                {service.h1}
              </h1>
              <p className="mt-5 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft">
                {service.summary}
              </p>

              <div className="mt-7 overflow-hidden rounded-xl2 border border-brand-100 shadow-card">
                <Photo
                  slot={slot}
                  fallback={service.image}
                  priority
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
              </div>

              <div className="card mt-7 p-6">
                <h2 className="text-lg font-extrabold">At a glance</h2>
                <div className="mt-2">
                  <FactList facts={service.keyFacts} />
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <LeadForm
                defaultItem=""
                heading={`Price for ${service.navLabel.toLowerCase()}`}
                subheading="Tell us what you have and where you are. We come back with a figure and an available date."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro copy */}
      <section>
        <div className="container-content py-12 sm:py-14">
          <div className="prose-body mx-auto max-w-prose">
            {service.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Step by step"
            title={`How ${service.navLabel.toLowerCase()} works`}
            intro="Every stage below is done on every job. The order matters as much as the products."
          />
          <ProcessSteps steps={service.method} />
        </div>
      </section>

      {/* Body sections */}
      {service.sections.map((section) => (
        <section key={section.h2} className="defer-paint">
          <div className="container-content py-12 sm:py-14">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{section.h2}</h2>

              {section.paragraphs && (
                <div className="prose-body mt-4 max-w-prose">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2.5 rounded-xl border border-brand-100 bg-white p-4 text-[0.95rem] leading-relaxed text-ink-soft"
                    >
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="mt-6">
                  <DataTable caption={section.h2} head={section.table.head} rows={section.table.rows} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Suitability */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Honest fit"
            title="Is this the right service for your sofa?"
            intro="We would rather turn a job down than take it on knowing the result will disappoint you."
          />
          <div className="mx-auto mt-9 max-w-4xl">
            <FitPanel yes={service.suitedTo} no={service.notSuitedTo} />
          </div>
        </div>
      </section>

      <Faq
        faqs={service.faqs}
        heading={`${service.navLabel} — common questions`}
        emitSchema={false}
      />

      {/* Related services */}
      <section className="defer-paint">
        <div className="container-content py-12 sm:py-14">
          <SectionHeading
            eyebrow="Related"
            title="Other services that may suit better"
            intro="If the fit panel above suggests this is not your method, these are the nearest alternatives."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <LinkCard
                key={r!.slug}
                href={`/services/${r!.slug}/`}
                title={r!.navLabel}
                body={r!.summary}
                footnote={r!.keyFacts[r!.keyFacts.length - 1].value}
              />
            ))}
          </div>

          <div className="mt-12 rounded-xl2 border border-brand-100 bg-brand-50/50 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold">
              {service.navLabel} across London
            </h2>
            <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink-soft">
              This service is available everywhere we work. Each area page covers the local
              postcodes, parking and Congestion Charge position, and what we typically find in the
              housing there.
            </p>
            <div className="mt-5">
              <LinkPills
                links={areas.map((a) => ({
                  path: `/areas-we-cover/${a.slug}/`,
                  label: a.name,
                }))}
              />
            </div>
            <p className="mt-5 text-[0.95rem] text-ink-soft">
              Prices for this and every other service are on the{' '}
              <Link
                href="/sofa-cleaning-prices-london/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                full price list
              </Link>
              , or{' '}
              <Link
                href="/get-a-quote/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                build an estimate
              </Link>{' '}
              in about thirty seconds. Minimum call-out {site.currencySymbol}60.
            </p>
          </div>
        </div>
      </section>

      <CtaBand context={service.navLabel.toLowerCase()} />
      <MobileCallBar context={service.navLabel.toLowerCase()} />
    </>
  );
}
