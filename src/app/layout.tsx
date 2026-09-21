import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { localBusinessSchema, websiteSchema } from '@/lib/seo';
import { SITE_URL, site } from '@/lib/site';

export const metadata: Metadata = {
  // Every page's canonical is resolved against this, so relative paths are safe.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sofa Cleaning London | Upholstery Cleaners Across Greater London',
    template: '%s | Sofa Cleaning London',
  },
  description:
    'Sofa and upholstery cleaning across Greater London. Fabric tested before any product is used, and the price fixed before we start. 3-seater from £75.',
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: false, email: true },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#123736',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        {/* Site-wide entities. Page-level schema (Service, FAQPage,
            BreadcrumbList) is emitted by each page and references these by @id. */}
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
