/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Emit a folder of plain HTML files (out/) instead of a Node server bundle.
  // Every page on this site is pre-rendered anyway, so nothing is lost — and it
  // means the site can be hosted on Cloudflare Pages, or any static host, with
  // no adapter and no server to keep running.
  output: 'export',

  // Every internal link, canonical tag and sitemap <loc> uses a trailing slash.
  // With `export` this also makes Next write /services/index.html rather than
  // /services.html, which is what static hosts expect.
  trailingSlash: true,

  poweredByHeader: false,

  images: {
    // next/image's on-demand resizing needs a running server. Without one the
    // images are served exactly as they sit in public/ — which is fine here,
    // because they are already correctly sized SVGs. If you swap in large
    // photographs (see scripts/fetch-photos.mjs), resize them before committing
    // rather than relying on the optimiser, which no longer runs.
    unoptimized: true,
  },

  // NOTE: security and cache headers are NOT set here. A static export has no
  // server to run next.config's headers(), so they live in public/_headers,
  // which Cloudflare Pages (and Netlify) read natively. If you move to a host
  // that ignores that file, set the headers in that host's own config.
};

export default nextConfig;
