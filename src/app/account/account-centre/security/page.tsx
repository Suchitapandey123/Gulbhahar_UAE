import React from 'react'
import SecurityPrivacy from './SecurityPrivacy'

export async function generateMetadata() {
  return {
    title:"Account Security - Protect Your Gulbhahar Account",
    description:"Secure your Gulbhahar account with advanced protection settings. Manage passwords, enable two-factor authentication, and keep you and your orders safe.",
    keywords: ["Account Security"],
    alternates: {
      canonical: "https://www.gulbhahar.com/account/account-centre/security",
    },
    openGraph: {
      title:"Account Security - Protect Your Gulbhahar Account",
      description:"Secure your Gulbhahar account with advanced protection settings. Manage passwords, enable two-factor authentication, and keep you and your orders safe.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/account/account-centre/security",
      siteName: "Gulbhahar",
    },
  };
}

const page = () => {
  return (
   <SecurityPrivacy />
  )
}

export default page
