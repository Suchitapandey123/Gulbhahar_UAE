import React from 'react'
import LoginPage from './components/Login'

export async function generateMetadata() {
  return {
    title:"Login to Your Account - Gulbhahar Online Store",
  description:"Access your Gulbhahar account to track orders, manage wishlist, and enjoy personalized shopping. Secure login to your favorite destination.",
  keywords: ["login", "Gulbhahar login", "Gulbhahar login page"],
    alternates: {
      canonical: "https://www.gulbhahar.com/login",
    },
    openGraph: {
      title:"Login to Your Account - Gulbhahar Online Store",
  description:"Access your Gulbhahar account to track orders, manage wishlist, and enjoy personalized shopping. Secure login to your favorite destination.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/login",
      siteName: "Gulbhahar",
    },
  };
}



const page = () => {
  return (
    <div>
      <h1 className="sr-only">
        Login to Your Gulbhahar Account
      </h1>
      <LoginPage/>
    </div>
  )
}

export default page
