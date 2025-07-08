import React from 'react'
import CollectionPage from '@/app/collections/components/Collection'

export async function generateMetadata() {
  return {
    title:"Gulbhahar Jutti Collection - Handcrafted Traditional Footwear",
    description:"Explore Gulbhahar's exquisite handcrafted jutti collection. Premium footwear with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
    alternates: {
      canonical: "https://gulbhahar.com/collections",
    },
    openGraph: {
      title:"Gulbhahar Jutti Collection - Handcrafted Traditional Footwear",
    description:"Explore Gulbhahar's exquisite handcrafted jutti collection. Premium footwear with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/collections",
      siteName: "Gulbhahar",
    },
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
