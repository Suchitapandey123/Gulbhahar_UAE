import React from 'react'
import SignupPage from './Component/Signup'



export async function generateMetadata() {
  return {
    title:"Create Account - Join Gulbhahar Jutti Community Today",
  description:"Join Gulbhahar jutti community today. Create your account for exclusive offers, order tracking, and personalized shopping experience. Quick and secure registration.",
    alternates: {
      canonical: "https://www.gulbhahar.com/signup",
    },
    openGraph: {
      title:"Create Account - Join Gulbhahar Jutti Community Today",
  description:"Join Gulbhahar jutti community today. Create your account for exclusive offers, order tracking, and personalized shopping experience. Quick and secure registration.",
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
