import { PHONE_DISPLAY, telHref, whatsappHref } from '@/lib/site';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/**
 * Sticky call/WhatsApp bar, phones and small tablets only.
 *
 * Fixed height matching --mobile-bar in globals.css, which reserves the same
 * amount of body padding — so the bar never covers the end of the page and
 * never shifts layout when it appears.
 */
export function MobileCallBar({ context }: { context?: string }) {
  const message = context
    ? `Hi, I would like a quote for ${context}.`
    : 'Hi, I would like a quote for sofa cleaning.';

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-100 bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch gap-2 px-3 py-2.5">
        <a href={telHref} className="btn-secondary flex-1 px-4 py-3 text-[0.95rem]" aria-label={`Call ${PHONE_DISPLAY}`}>
          <PhoneIcon className="h-[18px] w-[18px]" />
          Call now
        </a>
        <a
          href={whatsappHref(message)}
          className="btn-whatsapp flex-1 px-4 py-3 text-[0.95rem]"
          aria-label="Message us on WhatsApp"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
