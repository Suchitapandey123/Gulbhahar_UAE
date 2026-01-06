
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';
import QuickTag from "../../components/QuickTag";
import { popularTags  } from "../../tag";
import QuickSearch from '@/all_components/Homepage/QuickLinks';

// Force dynamic rendering - always fetch fresh data (fixes AWS Amplify caching issue)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
    return {
      title:"Juttis : Buy Juttis @ Gulbhahar (upto 50% OFF)",
      description:"Gulbhahar's handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery.",
      keywords: ["Juttis", "Jutis", "juti", "Jutti", "jutty", "juty", "juttee", "jute", "jutties", "buy juttis", "buy juti"],
       
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/juttis",
      },
      // openGraph: {
      //   title:"Juttis | Gulbhahar’s Limited-Edition Juttis | Only 24 Pairs per Design",
      //   description:"Own a piece of heritage: Gulbhahar’s handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery and a numbered collector’s box. Buy jutis Online.",
     
      //   type: "website",
      //   locale: "en_US",
      //   url: "https://www.gulbhahar.com/collections/juttis",
      //   siteName: "Gulbhahar",
      // },
    };
}

const page = () => {
  return (
    <div className='mt-24'>
      <Collection />
      <ContentJuttis />
      <QuickTag popularTags={popularTags["juttis"]}  />
      <QuickSearch />
    </div>
  )
}

export default page
