import { beforeAfterPairs } from '@/data/beforeAfter';

/**
 * Real job photographs, before and after. Plain <img> with explicit width and
 * height (like Photo.tsx's photo path) — this is a static export with no
 * image optimiser, and the site is not running next/image over these.
 */
export function BeforeAfterGallery({ limit }: { limit?: number }) {
  const pairs = limit ? beforeAfterPairs.slice(0, limit) : beforeAfterPairs;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pairs.map((pair) => (
        <figure key={pair.slug} className="card overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="relative">
              <img
                src={pair.before.src}
                width={pair.before.width}
                height={pair.before.height}
                alt={pair.before.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Before
              </span>
            </div>
            <div className="relative">
              <img
                src={pair.after.src}
                width={pair.after.width}
                height={pair.after.height}
                alt={pair.after.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] h-full w-full object-cover"
              />
              <span className="absolute right-2 top-2 rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                After
              </span>
            </div>
          </div>
          <figcaption className="p-4 text-sm font-bold text-ink">{pair.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
