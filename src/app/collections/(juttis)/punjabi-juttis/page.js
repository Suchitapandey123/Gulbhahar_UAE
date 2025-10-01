import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentPunjabiJuttis';
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";

export async function generateMetadata() {
    return {
      title:"Punjabi Juttis | Gulbhahar’s Limited‑Edition Punjabi Juttis | Only 24 Pairs per Design",
      description:"Own a piece of heritage: Gulbhahar’s handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery and a numbered collector’s box.",
      keywords: ["Punjabi Juttis", "Punjabi Jutis", "Punjabi juti", "Punjabi Jutti", "Punjabi jutty", "Punjabi juty", "Punjabi juttee", "Punjabi jute", "Punjabi jutties", "Panjabi Juttis", "Panjabi Jutis", "Panjabi juti", "Panjabi Jutti", "Panjabi jutty", "Panjabi juty", "Panjabi juttee", "Panjabi jute", "Panjabi jutties"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/punjabi-juttis",
      },
      openGraph: {
        title:"Punjabi Juttis | Gulbhahar’s Limited‑Edition Punjabi Juttis | Only 24 Pairs per Design",
        description:"Own a piece of heritage: Gulbhahar’s handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery and a numbered collector’s box.",
     
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
      <QuickTag popularTags={popularTags["punjabi-juttis"]}  />
    </div>
  )
}

export default page
