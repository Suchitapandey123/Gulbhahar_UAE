import React from 'react'
import DeliveryShipping from "@/app/delivery-shipping-policy/Component/DeliveryShipping"

export const metadata={
  title:"Delivery & Shipping Policy – Gulbhahar",
  description:"Read Gulbhahar's shipping policy to review delivery timelines, tracking, and regions we ship mirrorwork juttis."
}
const page = () => {
  return (
    <div>
      <DeliveryShipping/>
    </div>
  )
}

export default page
