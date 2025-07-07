import React from 'react'
import CookiePolicy from "@/app/cookies-policy/Component/CookiePolicy"
export const metadata={
  title:"Cookie Policy – Gulbhahar",
  description:"Learn more about cookies and how Gulbhahar uses cookies to elevate the user experience on our website and personalise your journey."
}

const page = () => {
  return (
    <div>
      <CookiePolicy/>
    </div>
  )
}

export default page
