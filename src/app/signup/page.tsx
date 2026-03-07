import React from 'react'
import SignupPage from './components/Main';



export async function generateMetadata() {
  return {
    title:"Create Account - Join Gulbhahar Community Today",
  description:"Join Gulbhahar community today. Create your account for exclusive offers, order tracking, and personalized shopping experience.",
  keywords: ["signup", "gulbhahar signup page", "gulbhahar account"],
    alternates: {
      canonical: "https://www.gulbhahar.com/signup",
    },
    openGraph: {
      title:"Create Account - Join Gulbhahar Community Today",
  description:"Join Gulbhahar community today. Create your account for exclusive offers, order tracking, and personalized shopping experience.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/signup",
      siteName: "Gulbhahar",
    },
  };
}


const page = () => {
  return (
    <div>
      <SignupPage/>
      
    </div>
  )
}

export default page
