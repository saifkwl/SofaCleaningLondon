import NextImage from 'next/image';
import { getPhoto, largest, srcSet, type Photo as PhotoData } from '@/data/photos';
import { getImage } from '@/data/images';

/**
 * Renders a photograph if the image kit has produced one for this slot, and
 * the bundled illustration otherwise.
 *
 * Both paths always carry explicit width and height, so the space is reserved
 * before anything loads and Cumulative Layout Shift stays at zero.
 *
 * Photographs are plain <img> with a srcset, not next/image: the kit has
 * already produced each width as a compressed WebP, and this site is a static
 * export with no image optimiser running, so there is nothing for next/image
 * to add.
 */
export function Photo({
  slot,
  fallback,
  sizes = '(max-width: 768px) 100vw, 800px',
  className = 'h-auto w-full',
  priority = false,
}: {
  /** Slot name from scripts/image-kit/images.json, e.g. "area-putney". */
  slot: string;
  /** Illustration key from src/data/images.ts. Omit to render nothing without a photo. */
  fallback?: string;
  sizes?: string;
  className?: string;
  /** Above the fold. Overridden to true when the slot is marked hero. */
  priority?: boolean;
}) {
  const photo = getPhoto(slot);

  if (photo) {
    const main = largest(photo);
    const eager = photo.hero || priority;
    return (
      <>
        {eager && (
          // React hoists this into <head>, so the browser starts fetching the
          // LCP image while it is still parsing the page rather than after.
          // imageSrcSet + imageSizes make it pick the same width the <img>
          // will, instead of downloading a second file.
          <link
            rel="preload"
            as="image"
            href={main.file}
            imageSrcSet={srcSet(photo)}
            imageSizes={sizes}
            fetchPriority="high"
          />
        )}
        <img
          src={main.file}
          srcSet={srcSet(photo)}
          sizes={sizes}
          width={main.width}
          height={main.height}
          alt={photo.alt}
          className={className}
          {...(eager
            ? { fetchPriority: 'high' as const, decoding: 'sync' as const }
            : { loading: 'lazy' as const, decoding: 'async' as const })}
        />
      </>
    );
  }

  if (!fallback) return null;

  const illustration = getImage(fallback);
  return (
    <NextImage
      src={illustration.src}
      alt={illustration.alt}
      width={illustration.width}
      height={illustration.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

/**
 * The absolute URL of a slot's photo, for og:image and the page's JSON-LD.
 * Returns undefined when the slot has no photograph.
 */
export function photoUrl(slot: string): string | undefined {
  const photo = getPhoto(slot);
  return photo ? largest(photo).file : undefined;
}

export type { PhotoData };
