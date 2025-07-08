import React from 'react'
import ForgotPassword from "@/app/forgot-password/Component/ForgotPassword"


export async function generateMetadata() {
  return {
    title:"Forgot Password - Reset Gulbhahar Jutti Account Access",
  description:"Recover your Gulbhahar account access quickly and securely. Reset your password in simple steps to continue shopping your favorite handcrafted jutis.",
    alternates: {
      canonical: "https://www.gulbhahar.com/forgot-password",
    },
    openGraph: {
      title:"Forgot Password - Reset Gulbhahar Jutti Account Access",
      description:"Recover your Gulbhahar account access quickly and securely. Reset your password in simple steps to continue shopping your favorite handcrafted jutis.",
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
