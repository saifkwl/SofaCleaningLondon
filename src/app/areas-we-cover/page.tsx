import Link from 'next/link';
import type { Metadata } from 'next';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { PHONE_DISPLAY } from '@/lib/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageSchema } from '@/components/PageSchema';
import { CtaBand, DataTable, LinkCard, LinkPills, SectionHeading } from '@/components/Ui';
import { MobileCallBar } from '@/components/MobileCallBar';
import { Faq } from '@/components/Faq';

export const metadata: Metadata = buildMetadata({
  title: 'Areas We Cover | Sofa Cleaning Across Greater London',
  description:
    'Sofa and upholstery cleaning across Wandsworth, Fulham, Clapham, Putney, Balham, Streatham, Islington, Hackney, Chiswick, Barnet and wider London.',
  path: '/areas-we-cover/',
});

const hubFaqs = [
  {
    q: 'Do you cover areas that are not listed?',
    a: 'Usually, yes. The ten areas with their own pages are where we work most often, but we cover Greater London generally. Call with your postcode and we will tell you straight away whether we can reach you, rather than taking the booking and hoping.',
  },
  {
    q: 'Will I be charged the Congestion Charge?',
    a: 'Only if your address is inside the zone, which applies to almost none of our coverage. The one area where it genuinely matters is Islington, where Clerkenwell and Finsbury in EC1 fall inside the boundary while the rest of the borough does not. A narrow strip at the southern tip of Hackney around Shoreditch is also inside. Everywhere else we work is outside it. Where the charge does apply, it is added at cost as a separate line and you are told before you book.',
  },
  {
    q: 'Do you charge for parking?',
    a: 'Only where we have to pay for it. A visitor permit from you removes the cost entirely and is the simplest option in any controlled parking zone. Without one, pay-and-display or permit parking goes on the invoice at cost, itemised separately so you can see exactly what it was. In Barnet, where most streets are unrestricted, a parking line almost never appears at all.',
  },
  {
    q: 'How far ahead do I need to book?',
    a: 'Two to three working days is normally enough, and we can often fit a same-week slot. Book further ahead if your date is fixed by a tenancy check-out or a move. If you have a hard deadline, say so on the call — we would rather tell you we cannot hit it than take the booking and let you down.',
  },
];

export default function AreasHubPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Areas we cover' }]} nodes={[faqSchema(hubFaqs)]} />
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Areas we cover' }]} />

      <section>
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Coverage</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Sofa cleaning across Greater London
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              Ten areas with pages of their own, covering the postcodes we work in, the parking and Congestion Charge position, and what we typically find in the local housing stock. We cover a good deal more than this — if your area is not listed, call and ask.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content pb-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <LinkCard
                key={a.slug}
                href={`/areas-we-cover/${a.slug}/`}
                title={`Sofa cleaning in ${a.name}`}
                body={`${a.postcodes.slice(0, 4).join(', ')}${a.postcodes.length > 4 ? ' and more' : ''} — ${a.localAuthority}.`}
                footnote={`${a.coverage.length} coverage areas`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="At a glance"
            title="Postcodes, councils and travel costs"
            intro="The only travel cost that ever appears on an invoice is one we actually pay — parking where no visitor permit is available, and the Congestion Charge where an address falls inside the zone."
          />
          <div className="mt-9">
            <DataTable
              caption="Coverage areas with postcodes, local authority and Congestion Charge position"
              head={['Area', 'Postcodes', 'Local authority', 'Congestion Charge']}
              rows={areas.map((a) => [
                a.name,
                a.postcodes.join(', '),
                a.localAuthority.replace('London Borough of ', ''),
                a.slug === 'islington'
                  ? 'EC1 only — rest outside'
                  : a.slug === 'hackney'
                    ? 'Shoreditch tip only'
                    : 'Outside the zone',
              ])}
            />
          </div>
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Services"
            title="Every service, in every area"
            intro="All six services are available across the full coverage area. The method is chosen by your fabric, not by where you live."
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <LinkPills
              links={services.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel }))}
            />
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              Not sure which you need?{' '}
              <Link href="/services/" className="font-semibold text-brand-700 underline underline-offset-4">
                Compare all six services
              </Link>{' '}
              or call {PHONE_DISPLAY}.
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={hubFaqs} heading="Coverage and travel" emitSchema={false} />
      <CtaBand />
      <MobileCallBar />
    </>
  );
}
