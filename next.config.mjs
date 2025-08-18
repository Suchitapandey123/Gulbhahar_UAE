/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
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
      ],
    },
    
  };
  
  export default nextConfig;
  