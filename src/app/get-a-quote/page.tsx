import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { MINIMUM_CHARGE } from '@/data/pricing';
import { getImage } from '@/data/images';
import { site } from '@/lib/site';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PriceCalculator } from '@/components/PriceCalculator';
import { LeadForm } from '@/components/LeadForm';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, SectionHeading } from '@/components/Ui';

export const metadata: Metadata = buildMetadata({
  title: 'Get a Quote | Sofa Cleaning Price Estimator London',
  description:
    'Build a sofa cleaning estimate in about thirty seconds, then send it to us on WhatsApp. Free quotes, no call-out fee, minimum call-out £60.',
  path: '/get-a-quote/',
  image: '/images/quote.svg',
});

const quoteFaqs = [
  {
    q: 'Is the estimator price what I will actually pay?',
    a: `It is an estimate built from our "from" prices, so treat it as the lower end of a range. Fabric, soil level and access all move the real figure, which is why the tool shows a range rather than a single number. You get one exact price at the walk-through, before any equipment comes off the van.`,
  },
  {
    q: 'What happens after I send the WhatsApp message?',
    a: 'We read it, and if anything is unclear we ask — usually about the fabric, or whether a mark is a spill or a wear patch. Then we come back with a firm price and the dates we have available. There is no obligation at any point, and no call-out fee for quoting.',
  },
  {
    q: 'Can I send photos instead of filling this in?',
    a: 'Yes, and photos are genuinely useful. A picture of the sofa, a close-up of any bad marks and a shot of the care label under a cushion tells us more than a form does. Send them straight to our WhatsApp number and skip the estimator entirely.',
  },
  {
    q: 'Do I have to book once I have a price?',
    a: 'No. Quoting is free and carries no commitment. If our price is higher than you expected, or you decide the sofa is not worth cleaning, that is the end of it — we would rather tell you a piece is past saving than take payment for a clean that will disappoint you.',
  },
  {
    q: 'How quickly can you come?',
    a: 'Usually within two to three working days, and often the same week. If your date is fixed — a tenancy check-out, a move, guests arriving — say so in the message and we will tell you straight away whether we can hit it.',
  },
];

export default function QuotePage() {
  const image = getImage('quote');

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Get a quote' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <p className="eyebrow">Free, no obligation</p>
              <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                Get a sofa cleaning quote
              </h1>
              <p className="mt-5 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft">
                Add what you have below and an estimate appears as you go. When it looks right, send
                it to us on WhatsApp and we will come back with a firm price and the dates we have
                free. No call-out fee for quoting, and minimum call-out {site.currencySymbol}
                {MINIMUM_CHARGE}.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl2 border border-brand-100 shadow-card">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 460px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="estimator">
        <div className="container-content py-10 sm:py-14">
          <PriceCalculator />
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Rather write it out?"
            title="Send us the details instead"
            intro="If your job does not fit neatly into the estimator — an unusual fabric, an antique piece, a commercial site — use this and tell us in your own words."
          />
          <div className="mx-auto mt-9 max-w-2xl">
            <LeadForm
              heading="Tell us about the job"
              subheading="The more you tell us, the more accurate the price. Fabric type and a description of any bad marks help most."
            />
          </div>
        </div>
      </section>

      <section className="defer-paint">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="What happens next"
            title="From message to clean sofa"
            intro="Four steps, and you can stop at any of them."
          />
          <ol className="mx-auto mt-9 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['You send the details', 'Through the estimator, the form, WhatsApp or a phone call. Photos help more than words.'],
              ['We come back with a price', 'A firm figure and the dates we have free. We ask first if anything is unclear.'],
              ['We confirm on the day', 'A walk-through before anything starts. If the price changes, you hear it now and can send us away.'],
              ['We clean and sign off', 'You check the result while we are still there, and you get an itemised invoice.'],
            ].map(([title, body], i) => (
              <li key={title} className="card p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-extrabold text-ink">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-8 max-w-prose text-center text-[0.95rem] text-ink-soft">
            Want the full rates first? The{' '}
            <Link
              href="/sofa-cleaning-prices-london/"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              price list
            </Link>{' '}
            has every item, and each{' '}
            <Link href="/services/" className="font-semibold text-brand-700 underline underline-offset-4">
              service page
            </Link>{' '}
            explains what that method does and does not remove.
          </p>
        </div>
      </section>

      <Faq faqs={quoteFaqs} heading="Quotes and booking" />
      <CtaBand />
      <MobileCallBar />
    </>
  );
}
