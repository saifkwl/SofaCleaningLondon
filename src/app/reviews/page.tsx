import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { reviewProfiles, testimonials, unverifiedClaims, whatsappHref } from '@/lib/site';
import { buildReviewSchema } from './schema';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Faq } from '@/components/Faq';
import { MobileCallBar } from '@/components/MobileCallBar';
import { CtaBand, SectionHeading } from '@/components/Ui';
import { WhatsAppIcon } from '@/components/Icons';

export const metadata: Metadata = buildMetadata({
  title: 'Reviews | Sofa Cleaning London',
  description:
    'How we handle customer feedback, where our reviews are published, and what to do if a clean did not meet the standard we promised.',
  path: '/reviews/',
});

const reviewFaqs = [
  {
    q: 'Why are there no testimonials on this page?',
    a: 'Because we only publish reviews real customers have written, with their permission, and linked to a public profile where you can verify them. Written-for-you testimonials with invented names are easy to produce and worth nothing to you as a buyer. When there are reviews to show, they appear here with a link to the original.',
  },
  {
    q: 'What happens if I am not happy with the result?',
    a: 'Tell us while we are still there — that is why we walk through the finished work with you before packing up. Most issues are fixable on the spot, usually an area that needed a second pass. If something only becomes apparent after drying, call us within 48 hours and we will come back and look at it.',
  },
  {
    q: 'Do you ever refuse a job?',
    a: 'Yes, and it is worth knowing why. If a piece needs a leather repair technician, a textile conservator or a new mattress rather than a clean, we say so instead of taking a fee. If a fabric tests badly and no method we have is safe for it, we will not clean it. Turning work down is not good for a day’s takings and it is the right answer often enough that we keep doing it.',
  },
  {
    q: 'How do I leave a review?',
    a: 'Ask us on the day and we will point you at the right place. We do not offer discounts or incentives in exchange for a review — an incentivised review is not an honest one, and it breaches the terms of most review platforms anyway.',
  },
];

export default function ReviewsPage() {
  const hasTestimonials = testimonials.length > 0;
  const schema = buildReviewSchema();

  return (
    <>
      {schema && <JsonLd data={schema} />}
      <Breadcrumbs crumbs={[{ name: 'Home', path: '/' }, { name: 'Reviews' }]} />

      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-10 sm:py-14">
          <div className="max-w-3xl">
            <p className="eyebrow">Reviews and feedback</p>
            <h1 className="mt-2.5 text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              What our customers say
            </h1>
            <p className="mt-5 text-[1.075rem] leading-[1.7] text-ink-soft">
              We publish reviews written by real customers, with their permission, and we link to the
              public profile so you can check them yourself. We do not write testimonials, we do not
              buy them, and we do not offer a discount in exchange for one.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container-content py-12 sm:py-14">
          {hasTestimonials ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={`${t.name}-${t.date}`} className="card p-6">
                  <p className="text-sm font-bold text-accent-600" aria-label={`${t.rating} out of 5`}>
                    {'★'.repeat(t.rating)}
                    <span className="text-brand-200">{'★'.repeat(5 - t.rating)}</span>
                  </p>
                  <blockquote className="mt-3 text-[0.975rem] leading-relaxed text-ink-soft">
                    {t.body}
                  </blockquote>
                  <footer className="mt-4 border-t border-brand-100 pt-3 text-sm">
                    <cite className="font-bold not-italic text-ink">{t.name}</cite>
                    <span className="text-ink-muted"> · {t.area}</span>
                    {t.sourceUrl && (
                      <>
                        {' · '}
                        <a
                          href={t.sourceUrl}
                          rel="nofollow noopener"
                          className="font-semibold text-brand-700 underline underline-offset-4"
                        >
                          View original
                        </a>
                      </>
                    )}
                  </footer>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl rounded-xl2 border border-brand-100 bg-brand-50/50 p-7 text-center sm:p-9">
              <h2 className="text-xl font-extrabold">We are still collecting reviews</h2>
              <p className="prose-body mt-3">
                Rather than fill this page with invented testimonials, we have left it as it is until
                there are real ones to show. If you have used us, a review helps the next person
                decide — and we will publish it here exactly as you wrote it.
              </p>
              {reviewProfiles.length > 0 ? (
                <ul className="mt-6 flex flex-wrap justify-center gap-3">
                  {reviewProfiles.map((p) => (
                    <li key={p.url}>
                      <a
                        href={p.url}
                        rel="noopener"
                        className="inline-flex rounded-full border border-brand-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-800 hover:border-brand-400"
                      >
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-ink-muted">
                  Ask us on the day and we will point you at the right place to leave one.
                </p>
              )}
              <a
                href={whatsappHref('Hi, I used your service recently and would like to leave feedback.')}
                className="btn-whatsapp mt-7 px-6 py-3"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Send us feedback
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="defer-paint bg-brand-50/60">
        <div className="container-content py-14 sm:py-18">
          <SectionHeading
            eyebrow="Our position"
            title="Why this page looks different to most"
            intro="A few things we have decided not to do, and why."
          />
          <div className="mx-auto mt-9 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              [
                'No invented testimonials',
                'Anything on this page was written by a customer, with their permission, and links to the original where one exists.',
              ],
              [
                'No star rating in our search result',
                unverifiedClaims.aggregateRating.enabled
                  ? 'Our aggregate rating comes from a public review profile you can check.'
                  : 'We do not publish an aggregate rating in our search listing until there is a real, public review profile behind it. A number Google cannot corroborate gets stripped anyway.',
              ],
              [
                'No incentivised reviews',
                'We will not offer a discount in exchange for a review. It makes the review worthless and breaches most platforms’ terms.',
              ],
            ].map(([title, body]) => (
              <div key={title} className="card p-6">
                <h3 className="text-[1.05rem] font-extrabold text-ink">{title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq faqs={reviewFaqs} heading="Feedback and standards" />

      <section className="defer-paint">
        <div className="container-content pb-8 text-center">
          <p className="mx-auto max-w-prose text-[0.95rem] text-ink-soft">
            Deciding whether to book? The{' '}
            <Link href="/services/" className="font-semibold text-brand-700 underline underline-offset-4">
              service pages
            </Link>{' '}
            are specific about what each method does and does not remove, and the{' '}
            <Link
              href="/sofa-cleaning-prices-london/"
              className="font-semibold text-brand-700 underline underline-offset-4"
            >
              price list
            </Link>{' '}
            has every rate.
          </p>
        </div>
      </section>

      <CtaBand />
      <MobileCallBar />
    </>
  );
}
