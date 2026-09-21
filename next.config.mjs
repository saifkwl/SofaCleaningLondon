/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Every internal link, canonical tag and sitemap <loc> uses a trailing slash.
  // Keeping the server on the same convention avoids a 308 hop on every crawl.
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Photos dropped in by scripts/fetch-images.mjs are local files, so no
    // remotePatterns are needed. Add one here only if you switch to a CDN.
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
