import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';


export async function generateMetadata() {
    return {
      title:"Bridal Juttis Luxury Collection | GULBHAHAR | Handcrafted Bridal Jutti",
      description:"Explore Gulbhahar's luxury handcrafted bridal jutts collection. Premium Bridal Jutti with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/bridal-juttis",
      },
      openGraph: {
        title:"Bridal Juttis Luxury Collection | GULBHAHAR | Handcrafted Bridal Jutti",
        description:"Explore Gulbhahar's luxury handcrafted bridal jutts collection. Premium Bridal Jutti with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
        type: "website",
        locale: "en_US",
        url: "https://www.gulbhahar.com/collections/bridal-juttis",
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
