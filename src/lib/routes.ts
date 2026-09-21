import { services } from '@/data/services';
import { areas } from '@/data/areas';

/**
 * The complete URL inventory for the site.
 *
 * Everything that lists pages — the header nav, the footer, the HTML sitemap
 * page and sitemap.xml — is generated from this one array. That is deliberate:
 * a sitemap that lists a page the nav does not link to (or the reverse) is the
 * single most common cause of pages sitting in "Discovered – currently not
 * indexed", and deriving both from one source makes that drift impossible.
 *
 * Adding a page means adding it here. Nothing else needs changing.
 */
export type RouteTier = 'home' | 'money' | 'hub' | 'area' | 'company' | 'legal';

export type Route = {
  /** Path with a leading and trailing slash, e.g. "/services/x/". */
  path: string;
  /** Link text used in nav and link lists. */
  label: string;
  tier: RouteTier;
  /** sitemap.xml priority. Tiered so Google can see what matters most. */
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  /** True for the handful of pages that belong in the primary header nav. */
  inPrimaryNav?: boolean;
};

const PRIORITY: Record<RouteTier, number> = {
  home: 1.0,
  money: 0.9,
  hub: 0.8,
  area: 0.7,
  company: 0.6,
  legal: 0.3,
};

function route(
  path: string,
  label: string,
  tier: RouteTier,
  changeFrequency: Route['changeFrequency'] = 'monthly',
  inPrimaryNav = false,
): Route {
  return { path, label, tier, priority: PRIORITY[tier], changeFrequency, inPrimaryNav };
}

export const coreRoutes: Route[] = [
  route('/', 'Home', 'home', 'weekly'),
  route('/sofa-cleaning-prices-london/', 'Prices', 'money', 'monthly', true),
  route('/get-a-quote/', 'Get a quote', 'money', 'monthly', true),
];

export const hubRoutes: Route[] = [
  route('/services/', 'Services', 'hub', 'monthly', true),
  route('/areas-we-cover/', 'Areas we cover', 'hub', 'monthly', true),
];

export const serviceRoutes: Route[] = services.map((s) =>
  route(`/services/${s.slug}/`, s.navLabel, 'money'),
);

export const areaRoutes: Route[] = areas.map((a) =>
  route(`/areas-we-cover/${a.slug}/`, a.name, 'area'),
);

export const companyRoutes: Route[] = [
  route('/about-us/', 'About us', 'company', 'yearly'),
  route('/reviews/', 'Reviews', 'company', 'monthly'),
  route('/contact-us/', 'Contact', 'company', 'yearly', true),
  route('/sitemap/', 'Site index', 'company', 'weekly'),
];

export const legalRoutes: Route[] = [
  route('/privacy-policy/', 'Privacy policy', 'legal', 'yearly'),
  route('/terms/', 'Terms of service', 'legal', 'yearly'),
];

/** Every indexable URL on the site, in crawl-priority order. */
export const allRoutes: Route[] = [
  ...coreRoutes,
  ...hubRoutes,
  ...serviceRoutes,
  ...areaRoutes,
  ...companyRoutes,
  ...legalRoutes,
];

/** The links shown in the header. Kept short on purpose. */
export const primaryNav: Route[] = [
  hubRoutes[0],
  hubRoutes[1],
  coreRoutes[1],
  coreRoutes[2],
  companyRoutes[2],
];

export function routeFor(path: string): Route | undefined {
  return allRoutes.find((r) => r.path === path);
}
