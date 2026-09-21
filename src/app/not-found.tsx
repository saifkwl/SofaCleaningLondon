import Link from 'next/link';
import { services } from '@/data/services';
import { areas } from '@/data/areas';
import { PHONE_DISPLAY, telHref } from '@/lib/site';
import { LinkPills } from '@/components/Ui';
import { PhoneIcon } from '@/components/Icons';
import { MobileCallBar } from '@/components/MobileCallBar';

export default function NotFound() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-content py-20 text-center sm:py-28">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-tight tracking-tight sm:text-4xl">
            We could not find that page
          </h1>
          <p className="prose-body mx-auto mt-4 max-w-prose">
            The link may be out of date. Everything on the site is listed on the{' '}
            <Link href="/sitemap/" className="font-semibold text-brand-700 underline underline-offset-4">
              site index
            </Link>
            , or start from one of these.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary px-7 py-3.5">
              Back to the homepage
            </Link>
            <a href={telHref} className="btn-outline px-7 py-3.5">
              <PhoneIcon className="h-[18px] w-[18px]" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-5">
            <div>
              <p className="mb-3 text-sm font-bold text-ink-muted">Services</p>
              <LinkPills
                links={services.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel }))}
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-bold text-ink-muted">Areas we cover</p>
              <LinkPills links={areas.map((a) => ({ path: `/areas-we-cover/${a.slug}/`, label: a.name }))} />
            </div>
          </div>
        </div>
      </section>
      <MobileCallBar />
    </>
  );
}
