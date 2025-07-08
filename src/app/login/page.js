import React from 'react'
import LoginPage from './Component/Login'

export async function generateMetadata() {
  return {
    title:"Login to Your Account - Gulbhahar Jutti Online Store",
  description:"Access your Gulbhahar account to track orders, manage wishlist, and enjoy personalized shopping. Secure login to your favorite jutti destination.",
    alternates: {
      canonical: "https://gulbhahar.com/login",
    },
    openGraph: {
      title:"Login to Your Account - Gulbhahar Jutti Online Store",
  description:"Access your Gulbhahar account to track orders, manage wishlist, and enjoy personalized shopping. Secure login to your favorite jutti destination.",
      type: "website",
      locale: "en_US",
      url: "https://gulbhahar.com/login",
      siteName: "Gulbhahar",
    },
  };
}



const page = () => {
  return (
    <div>
      <LoginPage/>
    </div>
  )
}

export default page
