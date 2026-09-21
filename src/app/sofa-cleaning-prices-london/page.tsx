import Link from 'next/link';
import type { Metadata } from 'next';
import { MINIMUM_CHARGE, priceGroups, travelPolicy } from '@/data/pricing';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { site } from '@/lib/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageSchema } from '@/components/PageSchema';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, DataTable, LinkPills, SectionHeading } from '@/components/Ui';

export const metadata: Metadata = buildMetadata({
  title: 'Sofa Cleaning Prices London | Transparent Price List',
  description:
    'Sofa cleaning prices in London: 2-seater from £55, 3-seater from £75, corner sofa from £115. £60 minimum. Fixed price, no hidden extras.',
  path: '/sofa-cleaning-prices-london/',
});

const priceFaqs = [
  {
    q: 'Why is the price a range rather than one figure?',
    a: `Because three things move it and none of them can be judged over the phone: the fabric, how soiled the piece is, and access. A lightly used polyester 3-seater on the ground floor sits at the bottom of its range; the same sofa in cotton velvet, heavily soiled, on a third floor with no lift sits at the top. You get one exact figure at the walk-through, before any equipment comes off the van.`,
  },
  {
    q: 'Is there a minimum charge?',
    a: `Yes, ${site.currencySymbol}${MINIMUM_CHARGE}. A visit that would price below that is quoted at ${site.currencySymbol}${MINIMUM_CHARGE}, because most of the cost of any job is travel across London, parking and set-up rather than the cleaning itself. It is usually worth adding an armchair or a rug to make the visit work harder.`,
  },
  {
    q: 'Do you charge extra for stains?',
    a: 'General spot treatment is included — tannin, protein and oil spotting is part of a normal clean. Separate charges apply only where something needs a distinct treatment and significant extra time: heavy pet-hair removal woven into the weave, or an enzyme odour treatment where urine has reached the foam. Both are listed in the extras table and both are agreed with you before they happen.',
  },
  {
    q: 'What happens if the price changes on the day?',
    a: 'It only changes before we start, never after. If the walk-through turns up something the phone description did not — a fabric that needs the slower method, or a stain needing specialist treatment — we tell you the revised figure then, and you decide. If you would rather not go ahead, there is no charge for the visit.',
  },
  {
    q: 'Do you charge a call-out fee for quoting?',
    a: 'No. Quoting is free, whether by phone, WhatsApp photo or in person. The minimum charge applies to work carried out, not to giving you a price.',
  },
  {
    q: 'Do prices differ by area?',
    a: 'No. The rates are the same everywhere we work. The only location-dependent costs are ones we actually pay out: parking where no visitor permit is available, and the Congestion Charge where an address is inside the zone — which applies to almost none of our coverage. Both are itemised at cost and told to you before you book.',
  },
];

export default function PricesPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Prices' }]} nodes={[faqSchema(priceFaqs)]} />
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Prices' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Price list</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Sofa cleaning prices in London
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              Priced per seat, with ranges rather than single figures because fabric, soil level and
              access genuinely change the work involved. You get one exact number at the walk-through,
              before any equipment comes off the van — and if it is higher than you expected, you can
              send us away with nothing to pay.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-800">
                Minimum call-out {site.currencySymbol}
                {MINIMUM_CHARGE}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-800">
                Free quotes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-bold text-brand-800">
                Same rates London-wide
              </span>
            </div>
          </div>
        </div>
      </section>

      {priceGroups.map((group, i) => (
        <section key={group.id} id={group.id} className={i % 2 === 1 ? 'defer-paint bg-brand-50/60' : 'defer-paint'}>
          <div className="container-content py-14 sm:py-18">
            <div className="max-w-4xl">
              <SectionHeading align="left" eyebrow={`0${i + 1}`} title={group.title} intro={group.intro} />
              <div className="mt-7">
                <DataTable
                  caption={group.title}
                  head={['Item', 'Guide price', 'Time on site', 'What moves the price']}
                  rows={group.items.map((item) => [
                    item.item,
                    `${site.currencySymbol}${item.from}–${site.currencySymbol}${item.to}`,
                    item.minutes,
                    item.note,
                  ])}
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              align="left"
              eyebrow="Travel costs"
              title="Parking, Congestion Charge and ULEZ"
              intro="These are the only costs that can appear on top of the quoted price, and they are all things we pay out ourselves and pass on at cost."
            />
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <div className="card p-6">
                <h3 className="text-[1.05rem] font-extrabold">Congestion Charge</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
                  {travelPolicy.congestionCharge}
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-[1.05rem] font-extrabold">ULEZ</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{travelPolicy.ulez}</p>
              </div>
              <div className="card p-6">
                <h3 className="text-[1.05rem] font-extrabold">Parking</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{travelPolicy.parking}</p>
              </div>
            </div>
            <p className="mt-6 text-[0.95rem] text-ink-soft">
              Almost everywhere we work is outside the Congestion Charge zone — see the{' '}
              <Link
                href="/areas-we-cover/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                coverage table
              </Link>{' '}
              for the position in each area.
            </p>
          </div>
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Included"
            title="What every price covers"
            intro="No line items appear on the invoice that were not in the quote."
          />
          <div className="mx-auto mt-9 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              ['Fabric identification and testing', 'Care label read, fibre identified, solution tested on a hidden panel before anything else happens.'],
              ['HEPA-filtered dry vacuuming', 'Every seam, both faces of each cushion and the deck underneath, before any moisture goes on.'],
              ['Pre-spray with proper dwell time', 'Eight to ten minutes of contact time, then agitation. This is where most of the cleaning happens.'],
              ['General spot treatment', 'Tannin, protein and oil spotting with the right chemistry for each, included as standard.'],
              ['Neutralising rinse', 'Returns the fabric to neutral pH so no residue is left to attract dirt.'],
              ['Grooming and assisted drying', 'Pile set in one direction and an air mover run where the room allows it.'],
              ['Itemised invoice', 'Dated, naming the address, every item cleaned and the method used on each.'],
              ['Honest assessment', 'We tell you before starting which marks are unlikely to lift, rather than afterwards.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-brand-100 bg-white p-5">
                <h3 className="text-[0.975rem] font-extrabold text-ink">{title}</h3>
                <p className="mt-1.5 text-[0.925rem] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq faqs={priceFaqs} heading="Pricing questions" emitSchema={false} />

      <section className="defer-paint">
        <div className="container-content pb-8">
          <div className="mx-auto max-w-4xl rounded-xl2 border border-brand-100 bg-brand-50/50 p-6 sm:p-8">
            <h2 className="text-lg font-extrabold">Prices by service and area</h2>
            <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink-soft">
              The rates above apply to every service and everywhere we work. Each page adds the
              detail specific to it.
            </p>
            <div className="mt-5 space-y-4">
              <LinkPills links={services.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel }))} />
              <LinkPills links={areas.map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))} />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer an exact number?"
        body="Build an estimate in about thirty seconds, or send us a photo on WhatsApp and we will price it properly."
      />
      <MobileCallBar />
    </>
  );
}
