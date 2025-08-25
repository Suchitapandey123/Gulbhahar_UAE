
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';


export async function generateMetadata() {
    return {
      title:"Buy Juttis (New Collection) | GULBHAHAR | Handcrafted Premium Juttis",
      description:"Checkout Gulbhahar's premium handcrafted jutti collection. Premium Juttis with exclusive embroidery and authentic designs. Shop traditional Indian juttis online today.",
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/juttis",
      },
      openGraph: {
        title:"Buy Juttis (New Collection) | GULBHAHAR | Handcrafted Premium Juttis",
        description:"Checkout Gulbhahar's premium handcrafted jutti collection. Premium Juttis with exclusive embroidery and authentic designs. Shop traditional Indian juttis online today.",
          type: "website",
        locale: "en_US",
        url: "https://www.gulbhahar.com/collections/juttis",
        siteName: "Gulbhahar",
      },
    };
}

const page = () => {
  return (
    <div className='mt-24'>
      <Collection />
      <ContentJuttis />
    </div>
  )
}

export default page
