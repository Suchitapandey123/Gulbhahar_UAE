import Image from 'next/image';

const S3_DOMAIN = 'gulbahar-backend.s3.ap-south-1.amazonaws.com';
const CLOUDFRONT_DOMAIN = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN || S3_DOMAIN;

/**
 * OptimizedImage - Automatically replaces S3 URLs with CloudFront URLs
 *
 * This component wraps Next.js Image and automatically converts S3 URLs
 * to CloudFront URLs for faster delivery through CDN.
 *
 * Usage: Replace <Image> with <OptimizedImage> - same props!
 */
export default function OptimizedImage({ src, alt, ...props }) {
  // Convert S3 URL to CloudFront URL if needed
  let optimizedSrc = src;

  if (typeof src === 'string' && src.includes(S3_DOMAIN)) {
    optimizedSrc = src.replace(S3_DOMAIN, CLOUDFRONT_DOMAIN);
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt || ''}
      {...props}
    />
  );
}