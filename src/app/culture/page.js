import React from 'react'
import LuxuryCulturePage from './components/CulturePage'

export async function generateMetadata() {
  return {
    title: "Heritage Culture - Celebrate Tradition with Gulbhahar Juttis",
    description:
      "Discover the richness of heritage and tradition with Gulbhahar Juttis. We celebrate the craftsmanship, unique designs, and the cultural essence that inspires every handcrafted pair of juttis.",
    alternates: {
      canonical: "https://gulbhahar.com/culture",
    },
    openGraph: {
      title: "Heritage Culture - Celebrate Tradition with Gulbhahar Juttis",
    description:
      "Discover the richness of heritage and tradition with Gulbhahar Juttis. We celebrate the craftsmanship, unique designs, and the cultural essence that inspires every handcrafted pair of juttis.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/culture",
      siteName: "Gulbhahar",
    },
  };
}


const page = () => {
  return (
    <LuxuryCulturePage />
  )
}

export default page
