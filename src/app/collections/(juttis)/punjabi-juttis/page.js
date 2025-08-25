import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentPunjabiJuttis';


export async function generateMetadata() {
    return {
      title:"Punjabi Juttis (New Collection)| Handcrafted Punjabi Juttis",
      description:"Explore Gulbhahar's luxury Punjabi jutti collection. Premium Punjabi Juttis with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/punjabi-juttis",
      },
      openGraph: {
        title:"Punjabi Juttis (New Collection)| Handcrafted Punjabi Juttis",
        description:"Explore Gulbhahar's luxury Punjabi jutti collection. Premium Punjabi Juttis with intricate embroidery and authentic designs. Shop traditional Indian juttis online today.",
           type: "website",
        locale: "en_US",
        url: "https://www.gulbhahar.com/collections/punjabi-juttis",
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
