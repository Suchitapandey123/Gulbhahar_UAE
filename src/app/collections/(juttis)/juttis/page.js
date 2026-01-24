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
// Uses 'collections' and 'collection-juttis' tags for targeted revalidation
export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Juttis : Buy Juttis @ Gulbhahar (upto 50% OFF)",
    description: "Gulbhahar's handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery.",
    keywords: ["Juttis", "Jutis", "juti", "Jutti", "jutty", "juty", "juttee", "jute", "jutties", "buy juttis", "buy juti"],
    alternates: {
      canonical: "https://www.gulbhahar.com/collections/juttis",
    },
    openGraph: {
      title: "Juttis | Gulbhahar's Limited-Edition Juttis | Only 24 Pairs per Design",
      description: "Gulbhahar's handcrafted juttis are released in just 24 pairs per design. Each Jutti comes with complimentary custom embroidery.",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/collections/juttis",
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
      <QuickTag popularTags={popularTags["juttis"]} />
      <QuickSearch />
    </div>
  )
}
