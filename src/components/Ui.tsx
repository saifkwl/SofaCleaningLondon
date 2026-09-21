import Link from 'next/link';
import { ArrowIcon, CheckIcon, CrossIcon, PhoneIcon, WhatsAppIcon } from './Icons';
import { PHONE_DISPLAY, telHref, whatsappHref } from '@/lib/site';

/** Centred section heading with an eyebrow. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  as: As = 'h2',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
  as?: 'h2' | 'h3';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-prose'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <As className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</As>
      {intro && <p className="mt-3 prose-body">{intro}</p>}
    </div>
  );
}

/** A responsive data table. Scrolls horizontally on phones rather than squashing. */
export function DataTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: (string | number)[][];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl2 border border-brand-100 shadow-card">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.95rem]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-brand-50">
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3.5 text-sm font-bold text-brand-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100">
          {rows.map((row, i) => (
            <tr key={i} className="align-top transition-colors hover:bg-brand-50/50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3.5 ${j === 0 ? 'font-semibold text-ink' : 'text-ink-soft'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Two-column "suits this / does not suit this" panel. */
export function FitPanel({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="card p-6">
        <h3 className="flex items-center gap-2 text-lg font-extrabold text-brand-800">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-brand-700">
            <CheckIcon className="h-4 w-4" />
          </span>
          Right for
        </h3>
        <ul className="mt-4 space-y-3">
          {yes.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card bg-brand-50/40 p-6">
        <h3 className="flex items-center gap-2 text-lg font-extrabold text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-ink-muted">
            <CrossIcon className="h-4 w-4" />
          </span>
          Not right for
        </h3>
        <ul className="mt-4 space-y-3">
          {no.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-soft">
              <CrossIcon className="mt-1 h-4 w-4 shrink-0 text-ink-muted" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Numbered process steps. */
export function ProcessSteps({ steps }: { steps: { step: string; body: string }[] }) {
  return (
    <ol className="mt-9 grid gap-5 md:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.step} className="card flex gap-4 p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-700 text-base font-extrabold text-white">
            {i + 1}
          </span>
          <div className="min-w-0">
            <h3 className="text-[1.05rem] font-bold leading-snug text-ink">{s.step}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  title = 'Get a price without the sales call',
  body = 'Tell us what you have and where you are. We come back with a figure, and if we think the job is not worth doing we will say so.',
  context,
}: {
  title?: string;
  body?: string;
  context?: string;
}) {
  const message = context
    ? `Hi, I would like a quote for ${context}.`
    : 'Hi, I would like a quote for sofa cleaning.';

  return (
    <section className="defer-paint">
      <div className="container-content py-14 sm:py-16">
        <div className="relative overflow-hidden rounded-xl2 bg-brand-900 px-6 py-12 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-brand-700/50 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-brand-800/60 blur-2xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-brand-100">{body}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={whatsappHref(message)} className="btn-whatsapp px-7 py-3.5">
                <WhatsAppIcon className="h-5 w-5" />
                Message on WhatsApp
              </a>
              <a href={telHref} className="btn px-7 py-3.5 bg-white text-brand-900 hover:bg-brand-50">
                <PhoneIcon className="h-[18px] w-[18px]" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <p className="mt-5 text-sm text-brand-200">
              Open {' '}
              <span className="font-semibold text-white">08:00–20:00, seven days a week</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Card linking to a service or area page. */
export function LinkCard({
  href,
  title,
  body,
  footnote,
}: {
  href: string;
  title: string;
  body: string;
  footnote?: string;
}) {
  return (
    <Link
      href={href}
      className="card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <h3 className="text-[1.1rem] font-extrabold leading-snug text-ink group-hover:text-brand-800">{title}</h3>
      <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
        {footnote ?? 'Read more'}
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Compact inline list of links, used for cross-family linking. */
export function LinkPills({ links }: { links: { path: string; label: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.path}>
          <Link
            href={l.path}
            className="inline-flex rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-400 hover:bg-brand-50"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Key/value facts panel used in service and area hero sidebars. */
export function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-brand-100">
      {facts.map((f) => (
        <div key={f.label} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 py-3">
          <dt className="text-sm font-semibold text-ink-muted">{f.label}</dt>
          <dd className="text-sm font-bold text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
