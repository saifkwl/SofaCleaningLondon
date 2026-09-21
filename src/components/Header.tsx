import Link from 'next/link';
import { areaRoutes, primaryNav, serviceRoutes } from '@/lib/routes';
import { PHONE_DISPLAY, telHref } from '@/lib/site';
import { ChevronIcon, MenuIcon, PhoneIcon, SofaIcon } from './Icons';

/**
 * Site header.
 *
 * The service and area lists are real anchors present in the served HTML at
 * all times — the dropdowns are shown and hidden with CSS only. A nav that
 * mounts its links with JavaScript gives a crawler nothing to follow, which is
 * how whole page families end up orphaned.
 *
 * The mobile menu uses a native <details> element, so it works with no
 * JavaScript at all and keeps its keyboard and screen-reader behaviour.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container-content">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 text-brand-800"
            aria-label="Sofa Cleaning London — home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white">
              <SofaIcon className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-extrabold tracking-tight text-ink">
                Sofa Cleaning
              </span>
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                London
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <NavDropdown label="Services" href="/services/" items={serviceRoutes} />
              <NavDropdown label="Areas we cover" href="/areas-we-cover/" items={areaRoutes} columns={2} />
              {primaryNav.slice(2).map((r) => (
                <li key={r.path}>
                  <Link
                    href={r.path}
                    className="rounded-lg px-3 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-full bg-brand-800 px-5 py-2.5 text-[0.95rem] font-bold text-white shadow-card transition-colors hover:bg-brand-900 sm:inline-flex"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              <span>{PHONE_DISPLAY}</span>
            </a>

            {/* Mobile menu — native disclosure, no JavaScript */}
            <details className="group relative lg:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-brand-200 text-brand-800 [&::-webkit-details-marker]:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="h-6 w-6" />
              </summary>
              <div className="absolute right-0 top-[calc(100%+0.6rem)] max-h-[70vh] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-xl2 border border-brand-100 bg-white p-2 shadow-lift">
                <MobileGroup label="Services" href="/services/" items={serviceRoutes} />
                <MobileGroup label="Areas we cover" href="/areas-we-cover/" items={areaRoutes} />
                <ul className="mt-1 border-t border-brand-100 pt-1">
                  {primaryNav.slice(2).map((r) => (
                    <li key={r.path}>
                      <Link
                        href={r.path}
                        className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-semibold text-ink hover:bg-brand-50"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavDropdown({
  label,
  href,
  items,
  columns = 1,
}: {
  label: string;
  href: string;
  items: { path: string; label: string }[];
  columns?: number;
}) {
  return (
    <li className="group relative">
      <Link
        href={href}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-800"
      >
        {label}
        <ChevronIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </Link>
      <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul
          className={`grid w-max gap-0.5 rounded-xl2 border border-brand-100 bg-white p-2 shadow-lift ${
            columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {items.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="block whitespace-nowrap rounded-lg px-3 py-2 text-[0.9rem] font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function MobileGroup({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { path: string; label: string }[];
}) {
  return (
    <div className="border-b border-brand-100 py-1 last:border-0">
      <Link href={href} className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-bold text-ink hover:bg-brand-50">
        {label}
      </Link>
      <ul className="pb-1 pl-3">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="block rounded-lg px-3 py-2 text-[0.875rem] text-ink-soft hover:bg-brand-50 hover:text-brand-800"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
