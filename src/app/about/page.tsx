import React from 'react'
import Component from "@/app/about/components/About"

export const revalidate = 604800; // 7 days

export async function generateMetadata() {
  return {
    title: 'About us | Gulbhahar : Crafting stories of Heritage',
    description: "Our master artisans, many represent the third and fourth generations of their craft, Know more about us @Gulbhahar.",
    keywords: ["About us", "About Gulbhahar", "Gulbhahar Story", "Gulbhahar Background"],
    
    icons: {
      icon: "/logo.png",
    },
    alternates: {
      canonical: 'https://www.gulbhahar.com/about', 
    },
    // openGraph: {
    //   title: 'About | Gulbhahar | Crafting Stories of Heritage',
    //  description: "Our journey began with a vision to preserve & celebrate the timeless art of hand crafts. Our master artisans, many represent the third and fourth generations of their craft, with decades of expertise to every piece.",
    
    // type: 'website',
    //   locale: 'en_US',
    //   url: 'https://www.gulbhahar.com/about', 
    //   siteName: 'Gulbhahar', 
    // },
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
