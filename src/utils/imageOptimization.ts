/**
 * Utility to check if an image should skip Vercel optimization
 * CloudFront and other CDN images are already optimized
 */

const CDN_DOMAINS = [
  'd21ojmskh8ksuv.cloudfront.net', // CloudFront CDN
  'cdn.gulbhahar.com',              // Gulbhahar product CDN — already WebP, no need for Vercel re-optimization
];

export function shouldSkipOptimization(imageUrl: string): boolean {
  if (!imageUrl) return false;
  
  return CDN_DOMAINS.some(domain => imageUrl.includes(domain));
}

/**
 * Get image props with automatic optimization detection
 */
export function getImageProps(imageUrl: string) {
  return {
    unoptimized: shouldSkipOptimization(imageUrl),
  };
}
