import React from 'react'
import LuxuryCulturePage from './components/CulturePage'

export const revalidate = 604800; // 7 days

export async function generateMetadata() {
  return {
    title: "Heritage Culture - Celebrate Tradition with Gulbhahar Juttis",
    description:
      "Discover the richness of heritage and tradition with Gulbhahar Juttis. We celebrate the craftsmanship, unique designs.",
    keywords: ["Gulbhahar Heritage"],
    alternates: {
      canonical: "/heritage-culture",
    },
    openGraph: {
      title: "Heritage Culture - Celebrate Tradition with Gulbhahar Juttis",
    description:
      "Discover the richness of heritage and tradition with Gulbhahar Juttis. We celebrate the craftsmanship, unique designs.",
      type: "website",
      locale: "en_US",
      url: "heritage-culture",
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
