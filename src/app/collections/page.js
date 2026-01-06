import React from 'react'
import CollectionPage from '@/app/collections/components/Collection'


// Force dynamic rendering - always fetch fresh data (fixes AWS Amplify caching issue)
export const dynamic = 'force-dynamic';
export const revalidate = 0; // No caching
export const dynamicParams = true; // Enable on-demand generation

export async function generateMetadata() {
  return {
    title:"Gulbhahar Collection Page - Suits, Sarees, Juttis etc",
    description:"Explore Gulbhahar's exquisite ethnic wear collection. Premium footwear with embroidery suits & Saress with authentic designs. ",
    keywords: ["gulbhahar collection", "suits", "sarees", "juttis", "saree", "sadi", "jutti", "soots", "ethnic wear", "ethnic collection"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections",
    },
    // openGraph: {
    //   title:"Gulbhahar Jutti Collection - Handcrafted Traditional Footwear",
    // description:"Explore Gulbhahar's exquisite handcrafted jutti collection. Premium footwear with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
    //   type: "website",
    //   locale: "en_US",
    //   url: "https://www.gulbhahar.com/collections",
    //   siteName: "Gulbhahar",
    // },
  };
}

const page = () => {
  
  return (
    <div>
      <CollectionPage/>
    </div>
  )
}

export default page
