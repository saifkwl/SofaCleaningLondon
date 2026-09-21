import type { FAQ } from '@/data/services';
import { ChevronIcon } from './Icons';
import { JsonLd } from './JsonLd';
import { faqSchema } from '@/lib/seo';

/**
 * FAQ accordion built on native <details>.
 *
 * No JavaScript, and — more importantly — every answer is in the served HTML
 * whether or not the item is open. An accordion that fetches or mounts its
 * answers on click hides that text from crawlers, which defeats the point of
 * writing it.
 *
 * `emitSchema` should be true only once per page, on the block that is
 * actually visible.
 */
export function Faq({
  faqs,
  heading = 'Frequently asked questions',
  intro,
  emitSchema = true,
  id = 'faq',
}: {
  faqs: FAQ[];
  heading?: string;
  intro?: string;
  emitSchema?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="defer-paint">
      {emitSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="container-content py-14 sm:py-16">
        <div className="mx-auto max-w-prose text-center">
          <p className="eyebrow">Questions</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{heading}</h2>
          {intro && <p className="mt-3 prose-body">{intro}</p>}
        </div>

        <div className="mx-auto mt-9 max-w-3xl divide-y divide-brand-100 border-y border-brand-100">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.05rem] font-bold leading-snug text-ink">{f.q}</h3>
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-200 text-brand-700 transition-transform group-open:rotate-180">
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </summary>
              <div className="prose-body pb-5 pr-11">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
