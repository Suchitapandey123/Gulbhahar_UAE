import { GulbharLoader } from '@/shared-components/loader/GulbharLoader';
import nextDynamic from 'next/dynamic';
import { Suspense } from 'react';
import Collection from '../../components/Collection';
import QuickTag from "../../components/QuickTag";
import { popularTags } from "../../tag";

// Lazy load below-fold components
const ContentJuttis = nextDynamic(() => import('./components/ContentJuttis'), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-gray-100" />,
});
const QuickSearch = nextDynamic(() => import('@/shared-components/Homepage/QuickLinks'), {
  loading: () => <div className="min-h-[150px] animate-pulse bg-gray-100" />,
});

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'collections' and 'collection-bridal-juttis' tags for targeted revalidation
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Bridal Juttis (New Stock) Wedding juttis | Gulbhahar",
    description: "Gulbhahar's limited-edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing.",
    keywords: ["Bridal Juttis", "Wedding Juttis", "bridal Shoes", "Wedding Shoes", "Bridal Jutis", "Wedding Jutis", "Bridal Jutti", "Wedding Jutti", "bridal Shoe", "Wedding Shoe", "Bridal Juti", "Wedding Juti", "marriage Juttis", "marriage Jutis", "marriage Jutti", "marriage Juti", "nikah Juttis", "nikah Jutis", "nikah Jutti", "nikah Juti"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/bridal-juttis",
    },
    openGraph: {
      title: "Bridal Juttis (New Stock) Wedding juttis | Gulbhahar",
      description: "Gulbhahar's limited-edition bridal jutis are handcrafted and released in only 24 pairs per design. Each pair features elegant detailing.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/bridal-juttis",
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
      <QuickTag popularTags={popularTags["bridal-juttis"]} />
      <QuickSearch />
    </div>
  )
}
