import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { areas, getArea } from '@/data/areas';
import { getService, services } from '@/data/services';
import { priceGroups, MINIMUM_CHARGE } from '@/data/pricing';
import { buildMetadata, serviceSchema } from '@/lib/seo';
import { PHONE_DISPLAY, site, telHref } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadForm } from '@/components/LeadForm';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, DataTable, LinkCard, LinkPills, SectionHeading } from '@/components/Ui';
import { ClockIcon, PhoneIcon, PinIcon, TagIcon } from '@/components/Icons';

type Params = { area: string };

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) return {};

  return buildMetadata({
    title: area.title,
    description: area.metaDescription,
    path: `/areas-we-cover/${area.slug}/`,
  });
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { area: slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const neighbours = area.neighbours.map((s) => getArea(s)).filter(Boolean);
  const popular = area.popularServices.map((s) => getService(s)).filter(Boolean);
  const sofaPrices = priceGroups[0].items.slice(0, 5);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Sofa and Upholstery Cleaning in ${area.name}`,
          description: area.metaDescription,
          path: `/areas-we-cover/${area.slug}/`,
          areaNames: [area.name, ...area.postcodes, ...area.alsoNearby],
        })}
      />

      <Breadcrumbs
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Areas we cover', path: '/areas-we-cover/' },
          { name: area.name },
        ]}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="eyebrow">{area.postcodes.join(' · ')}</p>
              <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                {area.h1}
              </h1>

              <div className="prose-body mt-5 max-w-xl">
                {area.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {/* Local facts — different on every area page */}
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <LocalFact icon={<PinIcon className="h-[18px] w-[18px]" />} label="Local authority">
                  {area.localAuthority}
                </LocalFact>
                <LocalFact icon={<TagIcon className="h-[18px] w-[18px]" />} label="Postcode districts">
                  {area.postcodes.join(', ')}
                </LocalFact>
                <LocalFact icon={<ClockIcon className="h-[18px] w-[18px]" />} label="Booking hours">
                  {site.openingHours.opens}–{site.openingHours.closes}, seven days
                </LocalFact>
                <LocalFact icon={<PhoneIcon className="h-[18px] w-[18px]" />} label="Call or WhatsApp">
                  <a href={telHref} className="font-bold text-brand-700 hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </LocalFact>
              </dl>
            </div>

            <div className="lg:sticky lg:top-24">
              <LeadForm
                defaultArea={area.name}
                heading={`Get a price in ${area.name}`}
                subheading={`Tell us what you have and your ${area.postcodes[0]} postcode. We come back with a figure and an available date.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coverage list + stations */}
      <section>
        <div className="container-content py-12 sm:py-14">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-lg font-extrabold">Where we cover {area.preposition} {area.name}</h2>
              <ul className="mt-4 space-y-2.5">
                {area.coverage.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-extrabold">Nearest stations</h2>
              <ul className="mt-4 space-y-2.5">
                {area.stations.map((s) => (
                  <li key={s} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                We also cover {area.alsoNearby.slice(0, -1).join(', ')} and{' '}
                {area.alsoNearby[area.alsoNearby.length - 1]}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Housing stock — the main differentiating body copy */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {area.housing.heading}
            </h2>
            <div className="prose-body mt-4 max-w-prose">
              {area.housing.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Access, parking, Congestion Charge */}
      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              align="left"
              eyebrow="Access and travel"
              title={`Parking and access ${area.preposition} ${area.name}`}
              intro="We would rather tell you about a cost before you book than put it on an invoice afterwards."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <InfoCard title="Getting to your door">{area.accessNote}</InfoCard>
              <InfoCard title="Parking">{area.parking}</InfoCard>
              <InfoCard title="Congestion Charge &amp; ULEZ">{area.congestionCharge}</InfoCard>
            </div>
          </div>
        </div>
      </section>

      {/* Local pricing */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Prices"
            title={`What sofa cleaning costs ${area.preposition} ${area.name}`}
            intro={`The same guide prices apply everywhere we work — location does not change the rate. Minimum call-out ${site.currencySymbol}${MINIMUM_CHARGE}.`}
          />
          <div className="mx-auto mt-9 max-w-4xl">
            <DataTable
              caption={`Guide prices for sofa cleaning in ${area.name}`}
              head={['Item', 'Guide price', 'Time on site']}
              rows={sofaPrices.map((p) => [
                p.item,
                `${site.currencySymbol}${p.from}–${site.currencySymbol}${p.to}`,
                p.minutes,
              ])}
            />
            <p className="mt-5 text-[0.95rem] text-ink-soft">
              Full breakdown on the{' '}
              <Link
                href="/sofa-cleaning-prices-london/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                price list
              </Link>
              , or{' '}
              <Link
                href="/get-a-quote/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                build an estimate
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Most-requested services here */}
      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Most requested here"
            title={`What we are booked for most ${area.preposition} ${area.name}`}
            intro="Driven by the local housing stock more than anything else — which is why the mix differs from one area to the next."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {popular.map((s) => (
              <LinkCard
                key={s!.slug}
                href={`/services/${s!.slug}/`}
                title={s!.navLabel}
                body={s!.summary}
                footnote={s!.keyFacts[s!.keyFacts.length - 1].value}
              />
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-bold text-ink-muted">All services available here</p>
            <LinkPills
              links={services.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel }))}
            />
          </div>
        </div>
      </section>

      {/* Commercial */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {area.commercial.heading}
            </h2>
            <p className="prose-body mt-4 max-w-prose">{area.commercial.body}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {area.commercial.examples.map((e) => (
                <li
                  key={e}
                  className="flex gap-2.5 rounded-xl border border-brand-100 bg-white p-4 text-[0.95rem] leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              <Link
                href="/services/commercial-upholstery-cleaning-london/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                More on commercial upholstery cleaning
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={area.faqs} heading={`Sofa cleaning ${area.preposition} ${area.name}: your questions`} />

      {/* Neighbouring areas — the lateral link block */}
      <section className="defer-paint">
        <div className="container-content py-12 sm:py-14">
          <SectionHeading
            eyebrow="Nearby"
            title={`Areas next to ${area.name}`}
            intro="We are often in these on the same day, which sometimes means we can fit you in sooner."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {neighbours.map((n) => (
              <LinkCard
                key={n!.slug}
                href={`/areas-we-cover/${n!.slug}/`}
                title={`Sofa cleaning in ${n!.name}`}
                body={`${n!.postcodes.slice(0, 4).join(', ')} — ${n!.localAuthority.replace('London Borough of ', '')}.`}
                footnote="See coverage"
              />
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-bold text-ink-muted">Everywhere else we cover</p>
            <LinkPills
              links={areas
                .filter((a) => a.slug !== area.slug)
                .map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title={`Book sofa cleaning ${area.preposition} ${area.name}`}
        body={`Call or message with your ${area.postcodes[0]} postcode and what needs doing. We will give you a price and a date, and tell you honestly if a mark is unlikely to come out.`}
        context={`sofa cleaning in ${area.name}`}
      />
      <MobileCallBar context={`sofa cleaning in ${area.name}`} />
    </>
  );
}

function LocalFact({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-brand-100 bg-white p-4">
      <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-600">
        <span className="text-brand-500">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.95rem] font-semibold leading-snug text-ink">{children}</dd>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h3 className="text-[1.05rem] font-extrabold text-ink">{title}</h3>
      <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{children}</p>
    </div>
  );
}
