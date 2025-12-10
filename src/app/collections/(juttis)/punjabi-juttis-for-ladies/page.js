import CollectionsPage from '@/all_components/Homepage/CollectionPage';
import React from 'react'
import Collection from '../../components/Collection';
import ContentJuttis from './components/ContentJuttis';
import QuickTag from "../../components/QuickTag";
import { popularTags  } from "../../tag";
import QuickSearch from '@/all_components/Homepage/QuickLinks';

export async function generateMetadata() {
    return {
      title:"Punjabi Juttis for ladies | Gulbhahar’s Limited Punjabi Jutis for Ladies| Only 24 Pairs ",
      description:"Gulbhahar’s exclusive Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, blending tradition with modern comfort. Make a statement with personalized elegance.",
      keywords: ["Punjabi Juttis for ladies", "Punjabi Jutis for ladies", "Punjabi juti for ladies", "Punjabi Jutti for ladies", "Punjabi jutty for ladies", "Punjabi juty for ladies", "Punjabi juttee for ladies", "Punjabi jute for ladies", "Punjabi jutties for ladies", "Panjabi Juttis for ladies", "Panjabi Jutis for ladies", "Panjabi juti for ladies", "Panjabi Jutti for ladies", "Panjabi jutty for ladies", "Panjabi juty for ladies", "Panjabi juttee for ladies", "Panjabi jute for ladies", "Panjabi jutties for ladies", "jutties for ladies", "ladies jutti", "ladies juti", "jutti ladies"],

      alternates: {
        canonical: "https://www.gulbhahar.com/collections/punjabi-juttis-for-ladies",
      },
      // openGraph: {
      //    title:"Punjabi Juttis for ladies | Gulbhahar’s Limited Punjabi Jutis for Ladies| Only 24 Pairs ",
      //  description:"Gulbhahar’s exclusive Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, blending tradition with modern comfort. Make a statement with personalized elegance.",  
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
