'use client';

import { useId, useState } from 'react';
import { beforeAfterPairs, getBeforeAfterPair, type BeforeAfterPair } from '@/data/beforeAfter';

/**
 * A single before/after pair as a draggable comparison slider: the "after"
 * photo sits underneath, full-width, and the "before" photo is clipped to a
 * percentage of it that a native range input controls. Using a range input
 * rather than pointer-move handlers keeps it keyboard- and touch-operable for
 * free, with no extra event wiring.
 */
export function BeforeAfterSlider({
  pair,
  priority = false,
  className = 'overflow-hidden rounded-xl2 border border-brand-100 shadow-card',
}: {
  pair: BeforeAfterPair;
  priority?: boolean;
  className?: string;
}) {
  const [position, setPosition] = useState(50);
  const id = useId();
  const ratio = (pair.after.height / pair.after.width) * 100;

  return (
    <div className={`relative select-none ${className}`}>
      <div className="relative w-full" style={{ paddingTop: `${ratio}%` }}>
        <img
          src={pair.after.src}
          alt={pair.after.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          {...(priority ? { fetchPriority: 'high' as const } : {})}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={pair.before.src}
            alt={pair.before.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${position}%` }}
        />
        <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Before
        </span>
        <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
          After
        </span>
        <label htmlFor={id} className="sr-only">
          Drag to compare before and after: {pair.title}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-x-0 bottom-3 mx-auto w-[85%] accent-brand-600"
        />
      </div>
      <p className="border-t border-brand-100 bg-white px-4 py-2.5 text-sm font-bold text-ink">
        {pair.title}
      </p>
    </div>
  );
}

/** A grid of before/after sliders, one per real job photo pair. */
export function BeforeAfterGallery({ limit, exclude }: { limit?: number; exclude?: string }) {
  const available = exclude ? beforeAfterPairs.filter((p) => p.slug !== exclude) : beforeAfterPairs;
  const pairs = limit ? available.slice(0, limit) : available;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pairs.map((pair) => (
        <BeforeAfterSlider key={pair.slug} pair={pair} className="card overflow-hidden" />
      ))}
    </div>
  );
}

export { getBeforeAfterPair };
