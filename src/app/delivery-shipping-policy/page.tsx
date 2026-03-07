import React from 'react'
import DeliveryShipping from "@/app/delivery-shipping-policy/components/DeliveryShipping"


export async function generateMetadata() {
  return {
    title:"Delivery & Shipping Policy - Gulbhahar Orders",
  description:"Learn about Gulbhahar's delivery options, shipping charges, and timelines for orders. Fast nationwide delivery with secure packaging .",
  keywords: ["delivery policy", "gulbhahar delivery", "gulbhahar shipping"],
    alternates: {
      canonical: "https://www.gulbhahar.com/delivery-shipping-policy",
    },
  //   openGraph: {
  //     title:"Delivery & Shipping Policy - Gulbhahar Jutti Orders",
  // description:"Learn about Gulbhahar's delivery options, shipping charges, and timelines for jutti orders. Fast nationwide delivery with secure packaging for your footwear.",
  //     type: "website",
  //     locale: "en_US",
  //     url: "https://www.gulbhahar.com/delivery-shipping-policy",
  //     siteName: "Gulbhahar",
  //   },
  };
}
const page = () => {
  return (
    <div>
      <DeliveryShipping/>
    </div>
  )
}

export default page
