import React from 'react'
import FAQ from './components/Faq'

export async function generateMetadata() {
  return {
    title:"FAQs - Gulbhahar Jutti Size Guide & Customer Help",
  description:"Find answers to common questions about Gulbhahar collection sizing, care, shipping, and returns. Complete guide to help you.",
  keywords: ["Faq", "faqs", "gulbhahar Faqs"],
    alternates: {
      canonical: "https://www.gulbhahar.com/faq",
    },
  //   openGraph: {
  //     title:"FAQs - Gulbhahar Jutti Size Guide & Customer Help",
  // description:"Find answers to common questions about Gulbhahar jutti sizing, care, shipping, and returns. Complete guide to help you choose and maintain your juttis.",
  //     type: "website",
  //     locale: "en_US",
  //     url: "https://www.gulbhahar.com/faq",
  //     siteName: "Gulbhahar",
  //   },
  };
}

const page = () => {
  return (
    <div>
      <FAQ/>
      
    </div>
  )
}

export default page
