import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';


export async function generateMetadata() {
    return {
      title:"Gulbhahar Juttis Collection | GULBHAHAR | Handcrafted Traditional Juttis",
      description:"Explore Gulbhahar's exquisite handcrafted jutti collection. Premium footwear with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/juttis",
      },
      openGraph: {
        title:"Gulbhahar Juttis Collection | GULBHAHAR | Handcrafted Traditional Juttis",
        description:"Explore Gulbhahar's exquisite handcrafted jutti collection. Premium footwear with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
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
