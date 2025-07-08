import React from 'react'
import Profile from './Component/Profile'

export async function generateMetadata() {
  return {
    title:"My Profile - Update Your Gulbhahar Account Details",
  description:"Update your Gulbhahar profile information, preferences, and delivery details. Manage your account settings for a personalized jutti shopping experience.",
    alternates: {
      canonical: "https://gulbhahar.com/account/account-centre/profile",
    },
    openGraph: {
      title:"My Profile - Update Your Gulbhahar Account Details",
  description:"Update your Gulbhahar profile information, preferences, and delivery details. Manage your account settings for a personalized jutti shopping experience.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/account/account-centre/profile",
      siteName: "Gulbhahar",
    },
  };
}


const page = () => {
  return (
    <div>
      <Profile/>
    </div>
  )
}

export default page
