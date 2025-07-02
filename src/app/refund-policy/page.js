import React from 'react'
import RefundPolicy from "@/app/refund-policy/Component/RefundPolicy"

export const metadata={
  title:"Refunds & Cancellation Policy – Gulbhahar",
  description:"Read about Gulbhahar's straightforward return, refund, and cancellation policy regarding orders of your handcrafted mirrorwork juttis."
}

const page = () => {
  return (
    <div>
      <RefundPolicy/>
    </div>
  )
}

export default page
