/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
        // Product pages — s-maxage matches page revalidate=3600; stale-while-revalidate serves instant while regenerating
        source: '/products/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        // Collection pages — same ISR alignment
        source: '/collections/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
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
        // Homepage
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
    // Single quality bucket — Vercel generates one variant per image instead of 5
    qualities: [75],
    formats: ['image/avif', 'image/webp'],
    // Fewer breakpoints = fewer unique image variants Vercel has to generate and cache
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [48, 96, 256, 384],
    minimumCacheTTL: 604800,
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