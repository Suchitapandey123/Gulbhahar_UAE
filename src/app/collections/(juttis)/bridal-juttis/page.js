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
      title:"Bridal Juttis (New Stock) Wedding juttis | Gulbhahar",
      description:"Gulbhahar's limited-edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing.",
      keywords: ["Bridal Juttis", "Wedding Juttis", "bridal Shoes", "Wedding Shoes", "Bridal Jutis", "Wedding Jutis", "Bridal Jutti", "Wedding Jutti", "bridal Shoe", "Wedding Shoe", "Bridal Juti", "Wedding Juti", "marriage Juttis", "marriage Jutis", "marriage Jutti", "marriage Juti", "nikah Juttis", "nikah Jutis", "nikah Jutti", "nikah Juti"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/bridal-juttis",
      },
      // openGraph: {
      //   title:"Bridal Juttis (New Stock) Wedding juttis | Gulbhahar",
      //  description:"Gulbhahar's limited-edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing.",

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
