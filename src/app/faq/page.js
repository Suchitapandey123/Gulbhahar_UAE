import React from 'react'
import FAQ from './Component/Faq'
export const metadata={
  title:"FAQs – Gulbhahar",
  description:"Get answers to common questions regarding your orders, payments, shipping and our handcrafted mirrorwork juttis."
}

export async function generateMetadata() {
  return {
    title:"FAQs - Gulbhahar Jutti Size Guide & Customer Help",
  description:"Find answers to common questions about Gulbhahar jutti sizing, care, shipping, and returns. Complete guide to help you choose and maintain your juttis.",
    alternates: {
      canonical: "https://gulbhahar.com/faq",
    },
    openGraph: {
      title:"FAQs - Gulbhahar Jutti Size Guide & Customer Help",
  description:"Find answers to common questions about Gulbhahar jutti sizing, care, shipping, and returns. Complete guide to help you choose and maintain your juttis.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/faq",
      siteName: "Gulbhahar",
    },
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
