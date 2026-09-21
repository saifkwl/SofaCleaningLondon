import Link from 'next/link';
import { areaRoutes, companyRoutes, legalRoutes, serviceRoutes } from '@/lib/routes';
import { PHONE_DISPLAY, site, telHref, whatsappHref } from '@/lib/site';
import { ClockIcon, PhoneIcon, PinIcon, SofaIcon, WhatsAppIcon } from './Icons';

/**
 * The footer carries the full service and area lists.
 *
 * This is the site-wide safety net for crawl discovery: every page links to
 * every service page and every area page from here, so nothing in either
 * family can become an orphan even if a link elsewhere is removed.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-brand-100 bg-brand-950 text-brand-100">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
                <SofaIcon className="h-6 w-6" />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.95rem] font-extrabold tracking-tight">Sofa Cleaning</span>
                <span className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-300">
                  London
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-brand-200">
              Sofa, upholstery and carpet cleaning across Greater London. Fabric identified and tested
              before any product is used, and the price confirmed before we start.
            </p>

            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              <li>
                <a href={telHref} className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-accent-300">
                  <PhoneIcon className="h-[18px] w-[18px] text-brand-300" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref('Hi, I would like a quote for sofa cleaning.')}
                  className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-accent-300"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
                  WhatsApp us
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200">
                <ClockIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-300" />
                <span>
                  {site.openingHours.opens}–{site.openingHours.closes}, seven days a week
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-brand-200">
                <PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-300" />
                <span>Mobile service across Greater London</span>
              </li>
            </ul>
          </div>

          <FooterColumn title="Services" links={serviceRoutes} />
          <FooterColumn title="Areas we cover" links={areaRoutes} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-300">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {companyRoutes.map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="text-brand-200 transition-colors hover:text-white">
                    {r.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sofa-cleaning-prices-london/" className="text-brand-200 transition-colors hover:text-white">
                  Prices
                </Link>
              </li>
              <li>
                <Link href="/get-a-quote/" className="text-brand-200 transition-colors hover:text-white">
                  Get a quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-800 pt-7 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalRoutes.map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="transition-colors hover:text-white">
                  {r.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sitemap/" className="transition-colors hover:text-white">
                Site index
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { path: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-300">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">
        {links.map((l) => (
          <li key={l.path}>
            <Link href={l.path} className="text-brand-200 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
