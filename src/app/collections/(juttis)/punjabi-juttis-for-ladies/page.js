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
      title:"Punjabi Juttis for ladies, Buy Punjabi Jutis : Gulbhahar",
      description:"Gulbhahar's Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, with modern comfort.",
      keywords: ["Punjabi Juttis for ladies", "Panjabi Juttis for ladies", "Punjabi Jutis for ladies", "Panjabi Jutis for ladies", "Punjabi Jutti for ladies", "Panjabi Jutti for ladies", "Punjabi Juti for ladies", "Panjabi Juti for ladies", "Punjabi Juttis for women", "Panjabi Juttis for women", "Punjabi Jutis for women", "Panjabi Jutis for women", "Punjabi Jutti for women", "Panjabi Jutti for women", "Punjabi Juti for women", "Panjabi Juti for women", "ladies Punjabi Juttis", "ladies Panjabi Juttis"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/punjabi-juttis-for-ladies",
      },
      // openGraph: {
      //    title:"Punjabi Juttis for ladies, Buy Punjabi Jutis : Gulbhahar",
      //  description:"Gulbhahar's Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, with modern comfort.",
      //   type: "website",
      //   locale: "en_US",
      //   url: "https://www.gulbhahar.com/collections/punjabi-juttis-for-ladies",
      //   siteName: "Gulbhahar",
      // },
    };
}

const page = () => {
  return (
    <div className='mt-24'>
      <Collection />
      <ContentJuttis />
      <QuickTag popularTags={popularTags["punjabi-juttis-for-ladies"]}  />
      <QuickSearch />
    </div>
  )
}

export default page
