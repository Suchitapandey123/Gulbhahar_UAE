import React, { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import Collection from '../../components/Collection';
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import { GulbharLoader } from '@/shared-components/loader/GulbharLoader';

// Lazy load below-fold components
const ContentJuttis = nextDynamic(() => import('./components/ContentJuttis'), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-100" />,
});
const QuickSearch = nextDynamic(() => import('@/shared-components/Homepage/QuickLinks'), {
  loading: () => <div className="min-h-[150px] animate-pulse bg-gray-100" />,
});

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-punjabi-juttis-for-ladies' tags for targeted revalidation
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Punjabi Juttis for ladies, Buy Punjabi Jutis : Gulbhahar",
    description: "Gulbhahar's Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, with modern comfort.",
    keywords: ["Punjabi Juttis for ladies", "Panjabi Juttis for ladies", "Punjabi Jutis for ladies", "Panjabi Jutis for ladies", "Punjabi Jutti for ladies", "Panjabi Jutti for ladies", "Punjabi Juti for ladies", "Panjabi Juti for ladies", "Punjabi Juttis for women", "Panjabi Juttis for women", "Punjabi Jutis for women", "Panjabi Jutis for women", "Punjabi Jutti for women", "Panjabi Jutti for women", "Punjabi Juti for women", "Panjabi Juti for women", "ladies Punjabi Juttis", "ladies Panjabi Juttis"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/punjabi-juttis-for-ladies",
    },
    openGraph: {
      title: "Punjabi Juttis for ladies, Buy Punjabi Jutis : Gulbhahar",
      description: "Gulbhahar's Punjabi juttis for ladies, limited to just 24 pairs per design. Each pair is hand stitched by master artisans, with modern comfort.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/punjabi-juttis-for-ladies",
      siteName: "Gulbhahar",
    },
  };
}

export default function Page() {
  return (
    <div className='mt-24'>
      <Suspense fallback={<GulbharLoader />}>
        <Collection />
      </Suspense>
      <ContentJuttis />
      <QuickTag popularTags={popularTags["punjabi-juttis-for-ladies"]} />
      <QuickSearch />
    </div>
  )
}
