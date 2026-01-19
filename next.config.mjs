/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],

  // ISR-friendly caching headers
  // Pages will be cached and revalidated via on-demand revalidation (POST /api/revalidate)
  async headers() {
    return [
      {
        // Static assets - cache for 1 year
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Product pages - allow ISR caching with stale-while-revalidate
        source: '/products/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Collection pages - allow ISR caching with stale-while-revalidate
        source: '/collections/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Homepage - shorter cache for freshness
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=1800, stale-while-revalidate=3600' },
        ],
      },
      {
        // API routes - no caching
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gulbahar-backend.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol:"https",
        hostname:"www.banarasee.in",
      },
      {
        protocol:"https",
        hostname:"www.facebook.com",
      },
      {
        protocol: 'https',
        hostname: 'gulbhahar-test.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default',
  },
};

export default nextConfig;