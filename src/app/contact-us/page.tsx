import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { PHONE_DISPLAY, site, telHref, whatsappHref } from '@/lib/site';
import { areas } from '@/data/areas';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageSchema } from '@/components/PageSchema';
import { LeadForm } from '@/components/LeadForm';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, LinkPills, SectionHeading } from '@/components/Ui';
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/Icons';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us | Sofa Cleaning London',
  description:
    'Call or WhatsApp +44 7342 840056 for sofa and upholstery cleaning across Greater London. Open 08:00–20:00, seven days a week. Free quotes, no call-out fee.',
  path: '/contact-us/',
});

const contactFaqs = [
  {
    q: 'What is the quickest way to get a price?',
    a: 'WhatsApp with a photo. A picture of the sofa, a close-up of any bad marks and a shot of the care label under a cushion tells us more than a phone description, and we can usually come back with a firm price rather than a range.',
  },
  {
    q: 'What should I have ready when I call?',
    a: 'Your postcode, roughly what needs cleaning — the number of seats rather than "a sofa" — and whether you know the fabric. If there is a particular mark you care about, describe it and say roughly how old it is. Those four things let us price it properly first time.',
  },
  {
    q: 'Do you answer outside working hours?',
    a: `The phone is answered from ${site.openingHours.opens} to ${site.openingHours.closes}, seven days a week. WhatsApp messages sent outside those hours are read first thing the next morning. For commercial sites we work evenings and overnight, but the office hours for booking stay the same.`,
  },
  {
    q: 'Can you come today?',
    a: 'Sometimes. Two to three working days is the normal lead time and we can often fit a same-week slot, but genuine same-day work depends entirely on where we already are that day. Call rather than message if it is urgent — it is a faster answer.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageSchema crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} nodes={[faqSchema(contactFaqs)]} />
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                Contact Sofa Cleaning London
              </h1>
              <p className="mt-5 max-w-xl text-[1.075rem] leading-[1.7] text-ink-soft">
                Call, WhatsApp or send the form. Quotes are free and carry no obligation — if we
                think a piece is not worth cleaning, we will tell you that instead of booking it in.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a
                  href={telHref}
                  className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <PhoneIcon className="h-[22px] w-[22px]" />
                  </span>
                  <h2 className="mt-4 text-[1.05rem] font-extrabold text-ink">Call us</h2>
                  <p className="mt-1 text-[1.05rem] font-bold text-brand-700">{PHONE_DISPLAY}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Fastest for urgent or same-week work.
                  </p>
                </a>

                <a
                  href={whatsappHref('Hi, I would like a quote for sofa cleaning.')}
                  className="card group flex flex-col p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]/15 text-[#128C4A]">
                    <WhatsAppIcon className="h-[22px] w-[22px]" />
                  </span>
                  <h2 className="mt-4 text-[1.05rem] font-extrabold text-ink">WhatsApp</h2>
                  <p className="mt-1 text-[1.05rem] font-bold text-brand-700">{PHONE_DISPLAY}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Best for photos — we can price more accurately from one.
                  </p>
                </a>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-brand-100 bg-white p-5">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-600">
                    <ClockIcon className="h-[18px] w-[18px] text-brand-500" />
                    Hours
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] font-semibold text-ink">
                    {site.openingHours.opens}–{site.openingHours.closes}, seven days a week
                  </dd>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white p-5">
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-brand-600">
                    <PinIcon className="h-[18px] w-[18px] text-brand-500" />
                    Service area
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] font-semibold text-ink">
                    Mobile across Greater London
                  </dd>
                </div>
              </dl>

              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                We are a mobile service, so there is no shop to visit — we come to you. Email:{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  {site.email}
                </a>
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <LeadForm
                heading="Send us the details"
                subheading="We will come back with a price and the dates we have free. Nothing is stored on this website — the form opens WhatsApp with your message ready to send."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Coverage"
            title="Where we come to"
            intro="Greater London, with the heaviest coverage in these areas. If yours is not listed, call and ask rather than assuming."
          />
          <div className="mx-auto mt-8 max-w-4xl">
            <LinkPills links={areas.map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))} />
            <p className="mt-6 text-center text-[0.95rem] text-ink-soft">
              <Link
                href="/areas-we-cover/"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                See the full coverage list with postcodes
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Faq faqs={contactFaqs} heading="Getting in touch" emitSchema={false} />
      <CtaBand />
      <MobileCallBar />
    </>
  );
}
