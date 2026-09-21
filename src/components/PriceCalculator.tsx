'use client';

import { useMemo, useState } from 'react';
import { MINIMUM_CHARGE, quoteExtras, quoteItems } from '@/data/pricing';
import { PHONE_DISPLAY, WHATSAPP_NUMBER, site, telHref } from '@/lib/site';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/**
 * Interactive estimate builder.
 *
 * Deliberately labelled an estimate rather than a quote. It works from the
 * "from" prices in src/data/pricing.ts, and the real figure depends on fabric,
 * soil level and access — all of which need a look at the actual sofa. Showing
 * a precise total the business then has to walk back is worse for conversion
 * than being straight about the range up front.
 */
export function PriceCalculator({ defaultArea = '' }: { defaultArea?: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [area, setArea] = useState(defaultArea);

  const all = [...quoteItems, ...quoteExtras];

  const set = (id: string, next: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, Math.min(20, next)) }));

  const { lines, subtotal, total, upper } = useMemo(() => {
    const lines = all
      .filter((i) => (counts[i.id] ?? 0) > 0)
      .map((i) => ({ ...i, qty: counts[i.id], line: counts[i.id] * i.unit }));
    const subtotal = lines.reduce((sum, l) => sum + l.line, 0);
    const total = subtotal === 0 ? 0 : Math.max(subtotal, MINIMUM_CHARGE);
    // Upper end of the range: the published tables run roughly a third above
    // the "from" price depending on fabric and condition.
    const upper = Math.round((total * 1.33) / 5) * 5;
    return { lines, subtotal, total, upper };
  }, [counts, all]);

  const message = useMemo(() => {
    const body = lines.map((l) => `• ${l.qty} × ${l.label}`).join('\n');
    return [
      'Hi Sofa Cleaning London, I used the price estimator on your site.',
      '',
      area.trim() ? `Area / postcode: ${area.trim()}` : 'Area / postcode: —',
      '',
      'Items:',
      body || '—',
      '',
      `Estimate shown: ${site.currencySymbol}${total}–${site.currencySymbol}${upper}`,
      '',
      'Could you confirm a price and an available date?',
    ].join('\n');
  }, [lines, area, total, upper]);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const hasItems = lines.length > 0;

  const groups = Array.from(new Set(all.map((i) => i.group)));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="card p-5 sm:p-7">
        <h2 className="text-xl font-extrabold sm:text-2xl">Build your estimate</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          Add what you have. A seat is one cushion position, so a 3-seater with a chaise counts as a
          4-seater.
        </p>

        {groups.map((group) => (
          <fieldset key={group} className="mt-6">
            <legend className="eyebrow mb-3">{group}</legend>
            <ul className="divide-y divide-brand-100 border-y border-brand-100">
              {all
                .filter((i) => i.group === group)
                .map((i) => {
                  const qty = counts[i.id] ?? 0;
                  return (
                    <li key={i.id} className="flex items-center justify-between gap-4 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-[0.95rem] font-semibold text-ink">{i.label}</p>
                        <p className="text-sm text-ink-muted">
                          from {site.currencySymbol}
                          {i.unit}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => set(i.id, qty - 1)}
                          disabled={qty === 0}
                          className="grid h-9 w-9 place-items-center rounded-full border border-brand-200 text-lg font-bold text-brand-800 transition-colors hover:bg-brand-50 disabled:opacity-35"
                          aria-label={`Remove one ${i.label}`}
                        >
                          −
                        </button>
                        <output
                          className="w-8 text-center text-[0.95rem] font-bold tabular-nums text-ink"
                          aria-label={`${i.label} quantity`}
                        >
                          {qty}
                        </output>
                        <button
                          type="button"
                          onClick={() => set(i.id, qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full border border-brand-200 text-lg font-bold text-brand-800 transition-colors hover:bg-brand-50"
                          aria-label={`Add one ${i.label}`}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </fieldset>
        ))}
      </div>

      <div className="card sticky top-24 p-5 sm:p-6">
        <h3 className="text-lg font-extrabold">Your estimate</h3>

        {hasItems ? (
          <>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {lines.map((l) => (
                <li key={l.id} className="flex justify-between gap-3 text-ink-soft">
                  <span className="min-w-0 truncate">
                    {l.qty} × {l.label}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums text-ink">
                    {site.currencySymbol}
                    {l.line}
                  </span>
                </li>
              ))}
            </ul>

            {subtotal < MINIMUM_CHARGE && (
              <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs leading-relaxed text-brand-800">
                A minimum call-out of {site.currencySymbol}
                {MINIMUM_CHARGE} applies, so this visit would be quoted at that figure.
              </p>
            )}

            <div className="mt-4 border-t border-brand-100 pt-4">
              <p className="text-sm font-semibold text-ink-muted">Likely range</p>
              <p className="mt-0.5 text-3xl font-extrabold tabular-nums text-ink">
                {site.currencySymbol}
                {total}
                <span className="text-ink-muted">–</span>
                {site.currencySymbol}
                {upper}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                An estimate, not a quote. Where it lands depends on the fabric, how soiled the piece
                is and access. We confirm the exact figure before any equipment comes off the van.
              </p>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Add an item on the left and your estimate appears here.
          </p>
        )}

        <div className="mt-5">
          <label className="field-label" htmlFor="pc-area">
            Area or postcode
          </label>
          <input
            id="pc-area"
            className="field"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="SW18 or Wandsworth"
            autoComplete="postal-code"
          />
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!hasItems}
          onClick={(e) => {
            if (!hasItems) e.preventDefault();
          }}
          className={`btn-whatsapp mt-4 w-full py-3.5 ${hasItems ? '' : 'pointer-events-none opacity-50'}`}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Confirm on WhatsApp
        </a>

        <a href={telHref} className="btn-outline mt-2.5 w-full py-3">
          <PhoneIcon className="h-[18px] w-[18px]" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
