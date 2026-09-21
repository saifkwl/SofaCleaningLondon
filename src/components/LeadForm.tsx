'use client';

import { useMemo, useState } from 'react';
import { PHONE_DISPLAY, telHref, whatsappHref } from '@/lib/site';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/**
 * Quote request form.
 *
 * There is no server: the form composes a readable message and hands it to
 * WhatsApp via a click-to-chat link, which opens the app on mobile and
 * WhatsApp Web on desktop. That keeps the site fully static (so every page stays
 * pre-rendered HTML) and means enquiries land where they get answered fastest.
 *
 * The trade-off is stated plainly in the UI: pressing the button opens
 * WhatsApp with the message ready to send, and the customer still has to press
 * send. Nothing is transmitted from this page, so nothing is stored here
 * either — which is also what the privacy policy says.
 */

type Props = {
  /** Pre-fills the "what needs cleaning" field, e.g. from a service page. */
  defaultItem?: string;
  /** Pre-fills the area field, e.g. from a location page. */
  defaultArea?: string;
  /** Shown above the form. */
  heading?: string;
  subheading?: string;
  /** Compact rendering for sidebars. */
  compact?: boolean;
};

const ITEMS = [
  '2-seater sofa',
  '3-seater sofa',
  '4-seater sofa',
  'L-shape / corner sofa',
  'Armchair',
  'Sofa bed',
  'Leather suite',
  'Dining chairs',
  'Carpets and sofa together',
  'Something else',
];

const WHEN = ['As soon as possible', 'Within the next few days', 'Next week', 'Just after a price for now'];

export function LeadForm({
  defaultItem = '',
  defaultArea = '',
  heading = 'Get a price on WhatsApp',
  subheading = 'Fill this in and we will come back with a price. No obligation, and no call-out fee for quoting.',
  compact = false,
}: Props) {
  const [name, setName] = useState('');
  const [area, setArea] = useState(defaultArea);
  const [item, setItem] = useState(defaultItem);
  const [fabric, setFabric] = useState('');
  const [when, setWhen] = useState(WHEN[0]);
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState(false);

  const valid = name.trim().length > 1 && area.trim().length > 1 && item.trim().length > 0;

  const message = useMemo(() => {
    const lines = [
      'Hi Sofa Cleaning London, I would like a quote.',
      '',
      `Name: ${name.trim() || '—'}`,
      `Area / postcode: ${area.trim() || '—'}`,
      `What needs cleaning: ${item || '—'}`,
    ];
    if (fabric.trim()) lines.push(`Fabric or material: ${fabric.trim()}`);
    lines.push(`When: ${when}`);
    if (notes.trim()) lines.push('', `Extra details: ${notes.trim()}`);
    return lines.join('\n');
  }, [name, area, item, fabric, when, notes]);

  const href = whatsappHref(message);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  const showError = touched && !valid;

  return (
    <form
      onSubmit={handleSubmit}
      className={`card ${compact ? 'p-5' : 'p-6 sm:p-7'}`}
      aria-labelledby="lead-form-heading"
      noValidate
    >
      <h2 id="lead-form-heading" className={compact ? 'text-lg font-extrabold' : 'text-xl font-extrabold sm:text-2xl'}>
        {heading}
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{subheading}</p>

      <div className={`mt-5 grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className={compact ? '' : 'sm:col-span-1'}>
          <label className="field-label" htmlFor="lf-name">
            Your name
          </label>
          <input
            id="lf-name"
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Jane Okafor"
            required
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-1'}>
          <label className="field-label" htmlFor="lf-area">
            Area or postcode
          </label>
          <input
            id="lf-area"
            className="field"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            autoComplete="postal-code"
            placeholder="SW18 or Wandsworth"
            required
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="field-label" htmlFor="lf-item">
            What needs cleaning
          </label>
          <select
            id="lf-item"
            className="field"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
          >
            <option value="">Choose one…</option>
            {ITEMS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-1'}>
          <label className="field-label" htmlFor="lf-fabric">
            Fabric <span className="font-normal text-ink-muted">(if you know it)</span>
          </label>
          <input
            id="lf-fabric"
            className="field"
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            placeholder="Velvet, linen, leather…"
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-1'}>
          <label className="field-label" htmlFor="lf-when">
            When suits you
          </label>
          <select id="lf-when" className="field" value={when} onChange={(e) => setWhen(e.target.value)}>
            {WHEN.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className="field-label" htmlFor="lf-notes">
            Anything we should know <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            id="lf-notes"
            className="field min-h-[5.5rem] resize-y"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Pet stains on one cushion, second floor flat, needs doing before the 14th…"
          />
        </div>
      </div>

      {showError && (
        <p role="alert" className="mt-4 rounded-lg bg-accent-50 px-3.5 py-2.5 text-sm font-medium text-accent-800">
          Please add your name, your area and what needs cleaning so we can price it properly.
        </p>
      )}

      <button type="submit" className="btn-whatsapp mt-5 w-full py-3.5 text-[1.05rem]">
        <WhatsAppIcon className="h-5 w-5" />
        Send on WhatsApp
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">
        This opens WhatsApp with your details written out — you press send. Nothing is submitted
        from this page and nothing is stored on this website.
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-brand-100 pt-4">
        <span className="text-sm text-ink-muted">Prefer to talk?</span>
        <a href={telHref} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-900">
          <PhoneIcon className="h-4 w-4" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </form>
  );
}
