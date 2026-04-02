/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],

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
      {
        // Category/parent-category pages
        source: '/:category(juttis|suit|saree|bags|lehenga|jewellery)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Collection detail pages
        source: '/collections/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gulbhahar.com",
      },
      {
        protocol: "https",
        hostname: "gulbahar-backend.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "d21ojmskh8ksuv.cloudfront.net", // CloudFront CDN
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
    // Keep all quality values that are explicitly used across components (60, 75, 100)
    // Removed 65 and 95 which were never explicitly referenced anywhere
    qualities: [60, 70, 75, 85, 100],
    formats: ['image/avif', 'image/webp'],
    // Fewer breakpoints = fewer unique image variants Vercel has to generate and cache
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [48, 96, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Keep Vercel image optimization ON for product images (cdn.gulbhahar.com, S3)
    // but CloudFront-hosted static assets are already optimized — mark those unoptimized
    // via the `unoptimized` prop directly on <Image> components for those assets.
    unoptimized: false,
    loader: 'default',
  },
};

export default nextConfig;