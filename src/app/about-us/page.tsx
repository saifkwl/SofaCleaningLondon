import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getImage } from '@/data/images';
import { site, unverifiedClaims } from '@/lib/site';
import { areas } from '@/data/areas';
import { services } from '@/data/services';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MobileCallBar } from '@/components/MobileCallBar';
import { VerifiedClaims } from '@/components/TrustSignals';
import { CtaBand, LinkPills, SectionHeading } from '@/components/Ui';

export const metadata: Metadata = buildMetadata({
  title: 'About Us | Sofa Cleaning London',
  description:
    'How we work: fabric identified and tested before any product is used, the price fixed before we start, and an honest answer about what will and will not come out.',
  path: '/about-us/',
});

export default function AboutPage() {
  const image = getImage('process');

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'About us' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">About us</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Upholstery cleaning, done the way it should be
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              Sofa Cleaning London is a mobile sofa, upholstery and carpet cleaning service working
              across Greater London, seven days a week. We come to you, we clean by the method your
              fabric actually needs, and we tell you the truth about what will come out before you
              agree to anything.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content py-12 sm:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            <div className="prose-body max-w-prose">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Why the first two steps matter more than the machine
              </h2>
              <p>
                Most of what goes wrong in upholstery cleaning goes wrong before any water is
                involved. A viscose sofa wet-cleaned loses half its strength and can tear. Cotton
                velvet under an extraction wand comes out with crushed pile and watermarks that do
                not lift. An alkaline product on wool yellows the fibre. Aniline leather cleaned with
                a pigmented-leather product ends up permanently patchy.
              </p>
              <p>
                None of those outcomes is about equipment quality. They are about identification.
                That is why the first thing we do on every job is find the care label and test on a
                hidden panel — a few minutes at the start that decides whether the rest of the visit
                improves your sofa or damages it.
              </p>
              <p>
                The second reason results vary so much between companies is dwell time. Pre-spray
                needs eight to ten minutes of contact to break the bond between soil and fibre, and
                there is no way to make up for skipping it with more pressure or hotter water. A job
                done properly is slower than a job done quickly, and that is most of the difference
                you can see afterwards.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                What we will tell you that others might not
              </h2>
              <p>
                Some things do not come out. Bleach damage is dye loss, not soiling — the fibre is a
                different colour now, and cleaning makes that patch cleaner rather than darker. A
                shiny, flattened sofa arm is abraded fibre and abrasion is permanent. Old oxidised red
                wine, curry oil, ballpoint ink and hair dye frequently do not fully lift, however
                they are treated.
              </p>
              <p>
                We say this at the walk-through, before starting, and where we are unsure we will
                treat one area first and let you look at the result before you commit to the whole
                suite. Occasionally the honest answer is that a piece needs a leather repair
                technician or a textile conservator rather than a cleaner, and we would rather tell
                you that than take a fee for a result you will not be happy with.
              </p>

              <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                How we price
              </h2>
              <p>
                Per seat, with published ranges, and the same rates everywhere we work. The only
                things that can appear on top are costs we actually pay out — parking where no
                visitor permit is available, and the Congestion Charge where an address falls inside
                the zone, which applies to almost none of our coverage. Both are itemised at cost and
                you hear about them before you book, not on the invoice.
              </p>
              <p>
                The final figure is agreed at the walk-through, before equipment comes off the van.
                If it is higher than you expected you can send us away with nothing to pay. A quote is
                free whether we end up doing the work or not.
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-xl2 border border-brand-100 shadow-card">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 440px, 100vw"
                  className="h-auto w-full"
                />
              </div>

              <div className="card mt-6 p-6">
                <h2 className="text-lg font-extrabold">The basics</h2>
                <dl className="mt-3 divide-y divide-brand-100">
                  {[
                    ['Service area', 'Greater London'],
                    ['Hours', `${site.openingHours.opens}–${site.openingHours.closes}, seven days`],
                    ['Type', 'Mobile — we come to you'],
                    ['Quotes', 'Free, no call-out fee'],
                    ['Minimum call-out', `${site.currencySymbol}60`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-sm font-semibold text-ink-muted">{label}</dt>
                      <dd className="text-sm font-bold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials — only rendered once the owner has enabled them. */}
      {(unverifiedClaims.insurance.enabled ||
        unverifiedClaims.accreditations.enabled ||
        unverifiedClaims.trackRecord.enabled) && (
        <section className="defer-paint bg-brand-50/60">
          <div className="container-content py-14 sm:py-18">
            <SectionHeading eyebrow="Credentials" title="Cover and accreditation" />
            <VerifiedClaims />
          </div>
        </section>
      )}

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Explore"
            title="What we do and where"
            intro="Each service page explains the method in detail; each area page covers the local postcodes, parking and housing stock."
          />
          <div className="mx-auto mt-8 max-w-4xl space-y-4">
            <LinkPills links={services.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel }))} />
            <LinkPills links={areas.map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))} />
          </div>
          <p className="mx-auto mt-7 max-w-prose text-center text-[0.95rem] text-ink-soft">
            Full rates are on the{' '}
            <Link
              href="/sofa-cleaning-prices-london/"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              price list
            </Link>
            , and{' '}
            <Link href="/contact-us/" className="font-semibold text-brand-700 underline underline-offset-4">
              contact
            </Link>{' '}
            has every way to reach us.
          </p>
        </div>
      </section>

      <CtaBand />
      <MobileCallBar />
    </>
  );
}
