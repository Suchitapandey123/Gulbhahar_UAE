import React from 'react'
import Cookies from './components/privacy-policy'


export async function generateMetadata() {
  return {
    title:"Privacy Policy - Your Data Protection on Gulbhahar Jutti",
  description:"Read more about how Gulbhahar protects your personal data during jutti purchases. Learn about data collection, usage and secutiry measures for safe shopping." ,
    alternates: {
      canonical: "https://www.gulbhahar.com/privacy-policy",
    },
    // openGraph: {
    //   title:"Privacy Policy - Your Data Protection on Gulbhahar Jutti",
    //   description:"Read more about how Gulbhahar protects your personal data during jutti purchases. Learn about data collection, usage and secutiry measures for safe shopping.",
    //   type: "website",
    //   locale: "en_US",
    //   url: "https://www.gulbhahar.com/privacy-policy",
    //   siteName: "Gulbhahar",
    // },
  };
}


const page = () => {


  return (
    <Cookies />
  )
}

export default page
