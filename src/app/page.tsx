import Link from 'next/link';
import type { Metadata } from 'next';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { priceGroups, MINIMUM_CHARGE } from '@/data/pricing';
import { Photo } from '@/components/Photo';
import { buildMetadata, faqSchema, serviceSchema } from '@/lib/seo';
import { site, telHref, PHONE_DISPLAY } from '@/lib/site';
import { PageSchema } from '@/components/PageSchema';
import { LeadForm } from '@/components/LeadForm';
import { TrustSignals } from '@/components/TrustSignals';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import {
  CtaBand,
  DataTable,
  LinkCard,
  LinkPills,
  ProcessSteps,
  SectionHeading,
} from '@/components/Ui';
import { ArrowIcon, PhoneIcon } from '@/components/Icons';

export const metadata: Metadata = buildMetadata({
  title: 'Sofa Cleaning London | Upholstery Cleaners Across Greater London',
  description:
    'Sofa and upholstery cleaning across Greater London. Fabric tested before any product is used and the price fixed before we start. 3-seater from £75.',
  path: '/',
  image: '/images/og/hero.jpg',
});

/** The six-stage method, shared across the homepage and the about page. */
const method = [
  {
    step: 'Identify the fabric',
    body: 'We find the care label — W, S, S/W or X — and where there is none we identify the fibre by construction and feel. Everything that follows is decided here, because the wrong product on viscose or aniline leather causes damage no clean can undo.',
  },
  {
    step: 'Test before committing',
    body: 'A small amount of the chosen solution goes on a hidden panel and is blotted with white cloth. Colour on the cloth means the dye is not fast, and we switch method rather than risk it.',
  },
  {
    step: 'Remove the dry soil',
    body: 'HEPA-filtered vacuuming with a crevice tool through every seam, both faces of each cushion and the deck underneath. Skipping this is why some sofas look worse after cleaning — dry grit plus water makes mud, and mud wicks to the surface.',
  },
  {
    step: 'Pre-spray and let it dwell',
    body: 'The chemistry needs eight to ten minutes of contact time to break the bond between soil and fibre. No amount of scrubbing substitutes for dwell time. Spots get their own treatment: acid for tannin, enzyme for protein, solvent for oil.',
  },
  {
    step: 'Clean by the right method',
    body: 'Hot water extraction at 60–80°C where the fabric takes water, low-moisture foam or encapsulation where it does not. Then repeated dry passes, which is what decides whether the sofa is dry in four hours or damp for two days.',
  },
  {
    step: 'Neutralise, groom and dry',
    body: 'A mildly acidic rinse returns the fabric to neutral pH so no residue stays behind to attract dirt. Pile is groomed in one direction, and an air mover goes on where the room allows it.',
  },
];

const homeFaqs = [
  {
    q: 'How much does sofa cleaning cost in London?',
    a: `A 3-seater fabric sofa starts at ${site.currencySymbol}75 and an L-shape corner sofa from ${site.currencySymbol}115, with a minimum call-out of ${site.currencySymbol}${MINIMUM_CHARGE}. Where a job lands in its range depends on the fabric, how soiled the piece is and access. You get the exact figure at the walk-through, before any equipment comes off the van.`,
  },
  {
    q: 'How long does a sofa take to dry?',
    a: 'Three to six hours after hot water extraction in a ventilated room, and one to two hours after low-moisture dry cleaning. Dense foam cushions and flats with no opening windows push it to the upper end. If you need the sofa usable the same evening, say so when booking and we will use the low-moisture method.',
  },
  {
    q: 'Which parts of London do you cover?',
    a: 'Greater London, with the heaviest coverage in south-west London — Wandsworth, Fulham, Clapham, Putney, Balham and Streatham — plus Islington, Hackney, Chiswick and Barnet. If you are outside those, call and we will tell you straight away whether we can reach you rather than taking the booking and hoping.',
  },
  {
    q: 'Can you remove every stain?',
    a: 'No, and we would rather say so before taking your money. General soiling, body oils, food residue, most drink spills and pet odour in the fabric come out well. Bleach damage and abraded, shiny fabric are permanent. Old oxidised red wine, curry oil, ballpoint ink and hair dye often do not fully lift. We tell you which category your worst marks fall into before starting.',
  },
  {
    q: 'Do I need to be home during the clean?',
    a: 'Someone needs to let us in, approve the price at the walk-through and sign off at the end. Beyond that you can get on with your day. For a typical 3-seater plus an armchair we are on site around 90 minutes to two hours.',
  },
  {
    q: 'Is it safe around children and pets?',
    a: 'The solutions are chosen to leave no harmful residue, and the neutralising rinse removes what would otherwise stay in the fabric. Keep children and pets off the sofa until it is dry to the touch — mainly so the damp pile is not flattened while it dries, which is standard practice after any wet-cleaning method.',
  },
];

export default function HomePage() {
  const sofaPrices = priceGroups[0].items.slice(0, 6);

  return (
    <>
      <PageSchema
        nodes={[
          serviceSchema({
            name: 'Sofa and Upholstery Cleaning',
            description:
              'Professional sofa, upholstery and carpet cleaning across Greater London, using hot water extraction or low-moisture methods chosen by fabric type.',
            path: '/',
            areaNames: ['Greater London', ...areas.map((a) => a.name)],
          }),
          faqSchema(homeFaqs),
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-12 sm:py-16 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">
                Greater London · Seven days a week
              </p>

              <h1 className="mt-5 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Professional sofa &amp; upholstery cleaning in London
              </h1>

              <p className="mt-5 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft sm:text-[1.15rem]">
                We identify your fabric and test it before any product goes on, clean by the method
                that fabric actually needs, and fix the price before we start. A 3-seater from{' '}
                <strong className="font-bold text-ink">
                  {site.currencySymbol}75
                </strong>
                , dry in three to six hours.
              </p>

              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {[
                  'Fabric identified and tested first',
                  'Price confirmed before we start',
                  'Steam or low-moisture, by fabric',
                  'Itemised invoice for tenancy checkouts',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[0.95rem] font-medium text-ink-soft">
                    <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m20 6-11 11-5-5" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/get-a-quote/" className="btn-primary px-7 py-3.5 text-[1.05rem]">
                  Get a price
                  <ArrowIcon className="h-[18px] w-[18px]" />
                </Link>
                <a href={telHref} className="btn-outline px-7 py-3.5 text-[1.05rem]">
                  <PhoneIcon className="h-[18px] w-[18px]" />
                  {PHONE_DISPLAY}
                </a>
              </div>

              <div className="mt-9 overflow-hidden rounded-xl2 border border-brand-100 shadow-card">
                <Photo
                  slot="home-hero"
                  fallback="hero"
                  priority
                  sizes="(min-width: 1024px) 620px, 100vw"
                />
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      {/* ---------------------------------------------------------------- */}
      {/* Services                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="What we clean"
            title="Six services, chosen by what your fabric needs"
            intro="The method is decided by the fabric, not by preference. If you are not sure which of these applies to your sofa, send us a photo and we will tell you."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ---------------------------------------------------------------- */}
      {/* Method                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="The method"
            title="What a proper upholstery clean actually involves"
            intro="Six stages. The first two decide everything that follows, and they are the ones most often skipped."
          />
          <ProcessSteps steps={method} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Fabric matrix                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Fabric guide"
                title="Which method suits which fabric"
                intro="Getting this wrong is how sofas get damaged. Water on viscose, cotton velvet or aniline leather causes problems no subsequent clean can undo, so we identify the fibre before anything else happens."
              />
              <div className="mt-7 overflow-hidden rounded-xl2 border border-brand-100 shadow-card">
                <Photo
                  slot="home-living-room"
                  fallback="fabrics"
                  sizes="(min-width: 1024px) 460px, 100vw"
                />
              </div>
            </div>

            <DataTable
              caption="Upholstery fabrics and the cleaning method each one needs"
              head={['Fabric', 'Method', 'Why']}
              rows={[
                ['Polyester & blends', 'Steam extraction', 'Tolerates water well, dries fast, holds colour.'],
                ['Cotton', 'Steam, reduced moisture', 'Can shrink if over-wet; needs extra dry passes.'],
                ['Linen', 'Low-moisture', 'Shrinks, creases and watermarks at the seams.'],
                ['Microfibre', 'Steam extraction', 'Cleans well; pile needs grooming or it dries patchy.'],
                ['Velvet (synthetic)', 'Either, with grooming', 'Pile direction must be reset while damp.'],
                ['Velvet (cotton/silk)', 'Low-moisture only', 'Pile crushes permanently and watermarks.'],
                ['Viscose / rayon', 'Low-moisture only', 'Loses around half its strength when wet.'],
                ['Wool & wool blends', 'Wool-safe, low moisture', 'Alkaline products damage the fibre and yellow it.'],
                ['Leather (pigmented)', 'Clean + condition', 'pH-balanced product, then oils replaced.'],
                ['Leather (aniline)', 'Specialist, no water', 'Uncoated hide absorbs and stains permanently.'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Pricing snapshot                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Pricing"
            title="What it costs, before you call"
            intro={`Priced per seat. A seat is one cushion position, so a 3-seater with a chaise is charged as four. Minimum call-out ${site.currencySymbol}${MINIMUM_CHARGE}.`}
          />
          <div className="mx-auto mt-9 max-w-4xl">
            <DataTable
              caption="Guide prices for sofa and upholstery cleaning in London"
              head={['Item', 'Guide price', 'Time on site', 'What moves the price']}
              rows={sofaPrices.map((p) => [
                p.item,
                `${site.currencySymbol}${p.from}–${site.currencySymbol}${p.to}`,
                p.minutes,
                p.note,
              ])}
            />
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/sofa-cleaning-prices-london/" className="btn-secondary px-7 py-3.5">
                Full price list
                <ArrowIcon className="h-[18px] w-[18px]" />
              </Link>
              <Link href="/get-a-quote/" className="btn-outline px-7 py-3.5">
                Build your own estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Areas                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Where we work"
            title="Sofa cleaning across Greater London"
            intro="Each area page covers the postcodes we work in, the parking and Congestion Charge position, and what we typically find in the local housing stock."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.slice(0, 6).map((a) => (
              <LinkCard
                key={a.slug}
                href={`/areas-we-cover/${a.slug}/`}
                title={`Sofa cleaning in ${a.name}`}
                body={`${a.postcodes.slice(0, 4).join(', ')} and the surrounding streets — ${a.coverage[0].toLowerCase()} through to ${a.coverage[a.coverage.length - 1].toLowerCase()}.`}
                footnote={`${a.postcodes.length} postcode districts`}
              />
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-bold text-ink-muted">Also covering</p>
            <LinkPills
              links={areas.slice(6).map((a) => ({
                path: `/areas-we-cover/${a.slug}/`,
                label: a.name,
              }))}
            />
          </div>

          <p className="mt-6 text-[0.95rem] text-ink-soft">
            Not listed?{' '}
            <Link href="/areas-we-cover/" className="font-semibold text-brand-700 underline underline-offset-4">
              See the full coverage list
            </Link>{' '}
            or call {PHONE_DISPLAY} — we will tell you straight away whether we can reach you.
          </p>
        </div>
      </section>

      <Faq
        faqs={homeFaqs}
        heading="Sofa cleaning in London: your questions"
        intro="If yours is not here, the service and area pages go into more detail, or just call and ask."
        emitSchema={false}
      />

      <CtaBand />
      <MobileCallBar />
    </>
  );
}
