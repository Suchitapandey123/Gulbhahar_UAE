import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentPunjabiJuttis';
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import QuickSearch from '@/all_components/Homepage/QuickLinks';

// Force dynamic rendering - always fetch fresh data (fixes AWS Amplify caching issue)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
    return {
      title:"Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
      description:"Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",
      keywords: ["Punjabi Juttis", "Panjabi Juttis", "Punjabi Jutis", "Panjabi Jutis", "Punjabi Jutti", "Panjabi Jutti", "Punjabi Juti", "Panjabi Juti", "buy Punjabi Juttis", "buy Panjabi Juttis", "buy Punjabi Jutis", "buy Panjabi Jutis", "buy Punjabi Jutti", "buy Panjabi Jutti", "buy Punjabi Juti", "buy Panjabi Juti", "Punjabi Juttis online", "Panjabi Juttis online"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/punjabi-juttis",
      },
      // openGraph: {
      //   title:"Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
      //   description:"Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",

      //   type: "website",
      //   locale: "en_US",
      //   url: "https://www.gulbhahar.com/collections/punjabi-juttis",
      //   siteName: "Gulbhahar",
      // },
    };
}

const page = () => {
  return (
    <div className='mt-24'>
      <Collection />
      <ContentJuttis />
      <QuickTag popularTags={popularTags["punjabi-juttis"]}  />
      <QuickSearch />
    </div>
  )
}

export default page
