import React from 'react'
import Cookies from './components/privacy-policy'


export async function generateMetadata() {
  return {
    title:"Refunds & Cancellation Policy – Gulbhahar",
  description:"Read about Gulbhahar's straightforward return, refund, and cancellation policy regarding orders of your handcrafted mirrorwork juttis." ,
    alternates: {
      canonical: "https://gulbhahar.com/privacy-policy",
    },
    openGraph: {
      title:"Refunds & Cancellation Policy – Gulbhahar",
      description:"Read about Gulbhahar's straightforward return, refund, and cancellation policy regarding orders of your handcrafted mirrorwork juttis.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/privacy-policy",
      siteName: "Gulbhahar",
    },
  };
}


const page = () => {


  return (
    <Cookies />
  )
}

export default page
