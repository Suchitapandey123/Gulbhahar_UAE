import React from 'react'
import ForgotPassword from "@/app/forgot-password/Component/ForgotPassword"

export const metadata={
  title:" Forgot Password – Gulbhahar Account Recovery",
  description:"Reset your password safely and securely, and gain access to your Gulbhahar account to keep shopping for your favourite mirrorwork juttis."
}

const page = () => {
  return (
    <div>
      <ForgotPassword/>
    </div>
  )
}

export default page
