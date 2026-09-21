import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { MINIMUM_CHARGE } from '@/data/pricing';
import { PHONE_DISPLAY, site } from '@/lib/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { MobileCallBar } from '@/components/MobileCallBar';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | Sofa Cleaning London',
  description:
    'Booking, pricing, cancellation, access and liability terms for sofa and upholstery cleaning work carried out by Sofa Cleaning London.',
  path: '/terms/',
});

/**
 * NOTE FOR THE SITE OWNER
 *
 * These terms describe the working practices the rest of the site commits to,
 * so they stay consistent with the marketing copy. They are a starting point,
 * not legal advice — have a solicitor review them before relying on them, and
 * check the cancellation terms against the Consumer Contracts Regulations,
 * which give consumers a 14-day right to cancel services arranged off-premises
 * or at a distance.
 */
export default function TermsPage() {
  const updated = '21 September 2026';

  const sections = [
    {
      h: 'Quotes and prices',
      p: [
        `Prices shown on this site are guide ranges. They are not a contractual offer. The binding price is the one we confirm at the walk-through, before any equipment is unloaded.`,
        `Quotes are free and carry no obligation. If our confirmed price is higher than you expected, you may decline the work at that point with nothing to pay.`,
        `A minimum call-out of ${site.currencySymbol}${MINIMUM_CHARGE} applies to work carried out. It does not apply to quoting.`,
        `Where an address falls inside the Congestion Charge zone, or where we have to pay for parking because no visitor permit is available, those costs are added at cost and itemised separately. We tell you before you book, not afterwards.`,
      ],
    },
    {
      h: 'Booking and cancellation',
      p: [
        'Bookings are confirmed by phone, WhatsApp or email. We will confirm the date, the expected arrival window and the price.',
        'Please give us at least 24 hours notice if you need to cancel or move a booking, so the slot can go to someone else. We do not charge a cancellation fee, but repeated late cancellations may mean we ask for confirmation closer to the date in future.',
        'If we cannot attend — vehicle failure, illness, a road closure — we will tell you as soon as we know and offer the earliest alternative. We are not liable for consequential losses arising from a missed appointment.',
        'Where the Consumer Contracts Regulations apply, you have a 14-day right to cancel. If you ask us to start work within that period and then cancel, we may charge for work already carried out.',
      ],
    },
    {
      h: 'Access and preparation',
      p: [
        'We need access to the room, a working power socket and, for extraction work, access to a water supply and a place to empty waste water.',
        'Please clear small items, ornaments and anything fragile from the area before we arrive. We move light furniture such as dining chairs and coffee tables and put it back. We do not move beds with storage bases, wardrobes, pianos, large electricals or anything on a stone or glass top.',
        'If we cannot gain access at the agreed time and nobody is contactable, we will wait 20 minutes and then have to move on. In that case the minimum call-out may be charged.',
      ],
    },
    {
      h: 'What we can and cannot achieve',
      p: [
        'We identify the fabric and test on a concealed area before cleaning. Where testing indicates a fabric will not take a method safely, we will say so and either use a gentler method or decline the work.',
        'We do not guarantee the removal of any particular stain. Bleach damage, dye loss, abraded or shiny fabric, and permanent marks such as some inks, dyes and oxidised stains may not improve. We will tell you our honest assessment before starting.',
        'Pre-existing damage — weak seams, perished foam, loose frames, previous poor repairs — may become more apparent after cleaning. We are not liable for the failure of an item that was already in that condition, and we will point out anything we notice before starting.',
        'Drying times given are estimates and depend on ventilation, room temperature and how soiled the item was.',
      ],
    },
    {
      h: 'Liability',
      p: [
        'We take reasonable care in your property and we are responsible for damage we cause through negligence.',
        'Claims for damage must be raised with us within 48 hours of the visit so we can inspect it. That is not a technicality — after that it becomes impossible to establish what happened.',
        'Nothing in these terms limits our liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot be limited under English law. Nothing here affects your statutory rights as a consumer.',
      ],
    },
    {
      h: 'Payment',
      p: [
        'Payment is due on completion unless we have agreed an account in advance, which we do for commercial customers.',
        'You get an itemised invoice showing the address, the items cleaned and the method used on each.',
        'Commercial accounts are invoiced monthly and payable within the terms stated on the invoice.',
      ],
    },
    {
      h: 'Complaints',
      p: [
        'Tell us while we are still there if you are not happy with the result — most issues are fixable on the spot, usually an area needing a second pass. That is why we walk through the finished work with you before packing up.',
        `If something only becomes apparent after drying, call ${PHONE_DISPLAY} or email ${site.email} within 48 hours and we will come back and look at it.`,
      ],
    },
    {
      h: 'Governing law',
      p: [
        'These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.',
      ],
    },
  ];

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Terms of service' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl">
              Terms of service
            </h1>
            <p className="mt-4 text-sm text-ink-muted">Last updated: {updated}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content py-10 sm:py-14">
          <div className="prose-body max-w-prose">
            <p>
              These terms apply to sofa, upholstery and carpet cleaning work carried out by{' '}
              {site.name}. They sit alongside your statutory rights as a consumer, which they do not
              affect.
            </p>

            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="mt-9 text-xl font-extrabold text-ink">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
            ))}

            <p className="mt-9">
              See also our <Link href="/privacy-policy/">privacy policy</Link>, or{' '}
              <Link href="/contact-us/">contact us</Link> with any question about these terms.
            </p>
          </div>
        </div>
      </section>

      <MobileCallBar />
    </>
  );
}
