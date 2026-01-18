import React from 'react'
import ForgotPassword from "@/app/forgot-password/components/ForgotPassword"


export async function generateMetadata() {
  return {
    title:"Forgot Password - Reset Gulbhahar Account Access",
  description:"Recover your Gulbhahar account access quickly and securely. Reset your password in simple steps to continue shopping on platform.",
  keywords: ["gulbhahar forgot password", "gulbhahar password recovery", "gulbhahar recovery"],
    alternates: {
      canonical: "https://www.gulbhahar.com/forgot-password",
    },
    openGraph: {
      title:"Forgot Password - Reset Gulbhahar Account Access",
      description:"Recover your Gulbhahar account access quickly and securely. Reset your password in simple steps to continue shopping on platform.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/forgot-password",
      siteName: "Gulbhahar",
    },
  };
}


const page = () => {
  return (
    <div>
      <ForgotPassword/>
    </div>
  )
}

export default page
