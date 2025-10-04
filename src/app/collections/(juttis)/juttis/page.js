
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';
import QuickTag from "../../components/QuickTag";
import { popularTags  } from "../../tag";
export async function generateMetadata() {
    return {
      title:"Juttis | Gulbhahar’s Limited-Edition Juttis | Only 24 Pairs per Design",
      description:"Own a piece of heritage: Gulbhahar’s handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery and a numbered collector’s box. Buy jutis Online.",
      keywords: ["Juttis", "Jutis", "juti", "Jutti", "jutty", "juty", "juttee", "jute", "jutties", "buy juttis", "buy juti"],
       
      alternates: {
        canonical: "https://www.gulbhahar.com/collections/juttis",
      },
      openGraph: {
        title:"Juttis | Gulbhahar’s Limited-Edition Juttis | Only 24 Pairs per Design",
        description:"Own a piece of heritage: Gulbhahar’s handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery and a numbered collector’s box. Buy jutis Online.",
     
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
      <QuickTag popularTags={popularTags["juttis"]}  />
    </div>
  )
}

export default page
