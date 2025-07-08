import React from 'react'
import Component from "@/app/about/Component/About"

export async function generateMetadata() {
  return { 
    title: ' About Gulbhahar - Handcrafted Juttis - Tradition In Every Step',
    description: "Discover Gulbhahar's heritage of crafting premium handmade jutis. Learn about our artisan tradition, quality craftsmanship, and commitment to authentic Indian footwear.",
    icons: {
      icon: "/logo.png",
    },
    alternates: {
      canonical: 'https://gulbhahar.com/about', 
    },
    openGraph: {
      title: ' About Gulbhahar - Handcrafted Juttis - Tradition In Every Step',
    description: "Discover Gulbhahar's heritage of crafting premium handmade jutis. Learn about our artisan tradition, quality craftsmanship, and commitment to authentic Indian footwear.",
      type: 'website',
      locale: 'en_US',
      url: 'https://gulbhahar.com/about', 
      siteName: 'Gulbhahar', 
    },
  };
}


const page = () => {
  return (
    <div>
      <Component/>
    </div>
  )
}

export default page
