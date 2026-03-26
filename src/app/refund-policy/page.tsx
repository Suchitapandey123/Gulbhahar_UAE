import React from 'react'
import RefundPolicy from "@/app/refund-policy/components/RefundPolicy"

export const revalidate = 604800; // 7 days

export async function generateMetadata() {
  return {
    title:"Refund & Cancellation Policy - Gulbhahar Store",
  description:"Understand Gulbhahar's hassle-free return and cancellation policy for purchases. Customer-friendly terms with easy refund process.",
  keywords: ["gulbhahar refund", "gulbhahar refund policy", "refund policy"],
    alternates: {
      canonical: "https://www.gulbhahar.com/refund-policy",
    },
    // openGraph: {
    //   title:" Refund & Cancellation Policy - Gulbhahar Jutti Store",
    //   description:"Understand Gulbhahar's hassle-free return and cancellation policy for jutti purchases. Customer-friendly terms with easy refund process and flexible options.",
    //   type: "website",
    //   locale: "en_US",
    //   url: "https://www.gulbhahar.com/refund-policy",
    //   siteName: "Gulbhahar",
    // },
  };
}


const page = () => {
  return (
    <div>
      <RefundPolicy/>
    </div>
  )
}

export default page
