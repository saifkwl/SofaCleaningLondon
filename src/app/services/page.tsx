import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageSchema } from '@/components/PageSchema';
import { LinkCard, LinkPills, SectionHeading, CtaBand, DataTable } from '@/components/Ui';
import { MobileCallBar } from '@/components/MobileCallBar';
import { Faq } from '@/components/Faq';

export const metadata: Metadata = buildMetadata({
  title: 'Our Services | Sofa & Upholstery Cleaning London',
  description:
    'Steam, dry, leather, sofa bed, combined carpet and commercial upholstery cleaning across London. Which method suits which fabric, and what each one costs.',
  path: '/services/',
});

const hubFaqs = [
  {
    q: 'How do I know which service I need?',
    a: 'The fabric decides it, not preference. Polyester, poly-blends and microfibre take steam extraction. Velvet, linen, viscose and anything with an "S" on the care label need the low-moisture dry method. Leather needs its own pH-balanced products and conditioning. If you are unsure, send a photo of the sofa and its care label and we will tell you which applies.',
  },
  {
    q: 'Can you combine services in one visit?',
    a: 'Yes, and it is usually cheaper. Most of the fixed cost of a visit is the visit itself — travel, parking, carrying equipment in and setting up — and that is the same whether we clean one sofa or a sofa and four rooms. Booking carpets and upholstery together means you pay it once rather than twice.',
  },
  {
    q: 'Do you clean things other than sofas?',
    a: 'Yes — armchairs, dining chairs, footstools, mattresses, headboards, rugs, carpets and stairs, plus commercial seating. Anything upholstered is worth asking about. Items are priced individually, so a mixed booking is quoted per item rather than as a package.',
  },
  {
    q: 'What is the difference between steam and dry cleaning?',
    a: 'Steam cleaning, properly called hot water extraction, injects heated solution into the fabric and vacuums it straight back out, flushing soil out of the foam as well as the fibre. Dry cleaning is low-moisture: cleaning agent applied as foam or mist, worked in mechanically and vacuumed away. Steam removes more; dry protects fabrics that water would damage and has the sofa usable again in one to two hours instead of three to six.',
  },
];

export default function ServicesHubPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Services' }]} nodes={[faqSchema(hubFaqs)]} />
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Services' }]} />

      <section>
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Services</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Sofa and upholstery cleaning services in London
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              Six services covering every fabric we are likely to meet in a London home or business. The method is chosen by the fabric — each page below explains which fabrics it suits, which it does not, and what it realistically will and will not remove.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content pb-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <LinkCard
                key={s.slug}
                href={`/services/${s.slug}/`}
                title={s.navLabel}
                body={s.summary}
                footnote={s.keyFacts[s.keyFacts.length - 1].value}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Compare"
            title="Which service does what"
            intro="A side-by-side view, so you can tell before you call which one your sofa needs."
          />
          <div className="mx-auto mt-9 max-w-5xl">
            <DataTable
              caption="Comparison of upholstery cleaning services"
              head={['Service', 'Best for', 'Drying time', 'From']}
              rows={services.map((s) => [
                s.navLabel,
                s.suitedTo[0],
                s.keyFacts.find((f) => f.label.includes('drying'))?.value ?? '—',
                s.keyFacts[s.keyFacts.length - 1].value,
              ])}
            />
          </div>
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Coverage"
            title="Every service, everywhere we work"
            intro="All six services are available across our full coverage area. The area pages cover local parking, Congestion Charge position and what we typically find in the local housing."
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <LinkPills
              links={areas.map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))}
            />
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              <Link
                href="/areas-we-cover/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                See all areas we cover
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={hubFaqs} heading="Choosing a service" emitSchema={false} />
      <CtaBand />
      <MobileCallBar />
    </>
  );
}
