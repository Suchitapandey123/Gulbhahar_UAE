import CollectionsPage from '@/all_components/Homepage/CollectionPage';
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
      title:"Bridal Juttis | Gulbhahar’s Limited‑Edition Bridal/ Wedding Juttis | Only 24 Pairs per Design",
      description:"Step into your wedding day in luxury .Gulbhahar’s limited‑edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing, free custom embroidery and comes in a numbered collector’s box.",
      keywords: ["Bridal Juttis", "Bridal Jutis", "Bridal juti", "Bridal Jutti", "Bridal Bridal jutty", "Bridal juty", "Bridal juttee", "Bridal jute", "Bridal jutties", "Wedding Juttis", "Wedding Jutis", "Wedding juti", "Wedding Jutti", "Wedding jutty", "Wedding juty", "Wedding juttee", "Wedding jute", "Wedding jutties", "bridal Shoes", "Wedding Shoes"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/bridal-juttis",
      },
      // openGraph: {
      //   title:"Bridal Juttis | Gulbhahar’s Limited‑Edition Bridal/ Wedding Juttis | Only 24 Pairs per Design",
      //  description:"Step into your wedding day in luxury .Gulbhahar’s limited‑edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing, free custom embroidery and comes in a numbered collector’s box.",
      
      //   type: "website",
      //   locale: "en_US",
      //   url: "https://www.gulbhahar.com/collections/bridal-juttis",
      //   siteName: "Gulbhahar",
      // },
    };
}

const page = () => {
  return (
    <div className='mt-24'>
      <Collection />
      <ContentJuttis />
      <QuickTag popularTags={popularTags["bridal-juttis"]}  />
      <QuickSearch />
    </div>
  )
}

export default page
