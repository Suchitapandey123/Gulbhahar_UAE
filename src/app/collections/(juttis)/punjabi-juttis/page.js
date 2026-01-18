import React, { Suspense } from 'react'
import nextDynamic from 'next/dynamic'
import Collection from '../../components/Collection';
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";
import { GulbharLoader } from '@/shared-components/loader/GulbharLoader';

// Lazy load below-fold components
const ContentJuttis = nextDynamic(() => import('./components/ContentPunjabiJuttis'), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-100" />,
});
const QuickSearch = nextDynamic(() => import('@/shared-components/Homepage/QuickLinks'), {
  loading: () => <div className="min-h-[150px] animate-pulse bg-gray-100" />,
});

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-punjabi-juttis' tags for targeted revalidation
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
    description: "Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",
    keywords: ["Punjabi Juttis", "Panjabi Juttis", "Punjabi Jutis", "Panjabi Jutis", "Punjabi Jutti", "Panjabi Jutti", "Punjabi Juti", "Panjabi Juti", "buy Punjabi Juttis", "buy Panjabi Juttis", "buy Punjabi Jutis", "buy Panjabi Jutis", "buy Punjabi Jutti", "buy Panjabi Jutti", "buy Punjabi Juti", "buy Panjabi Juti", "Punjabi Juttis online", "Panjabi Juttis online"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/punjabi-juttis",
    },
    openGraph: {
      title: "Punjabi Juttis, Buy Punjabi Juttis (New Designs)",
      description: "Gulbhahar's handcrafted Punjabi juttis/ jutis are released in just 24 pairs per design. Each Panjabi Jutti comes with complimentary custom embroidery.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/punjabi-juttis",
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
      <QuickTag popularTags={popularTags["punjabi-juttis"]} />
      <QuickSearch />
    </div>
  )
}
