/** @type {import('next').NextConfig} */
const nextConfig = {
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
      ],
    },
    // async rewrites() {
    //   return [
    //     {
    //       source: '/redirect',
    //       destination: '/redirect'
    //     }
    //   ];
    // }
  };
  
  export default nextConfig;
  