'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroAnimated from './HeroAnimated'
import BrandSection from './BrandSection'
import NewCollection from './NewCollection'

// Skeleton loader for sections
const SectionSkeleton = ({ height = 400 }) => (
  <div
    className="animate-pulse bg-gray-100"
    style={{ minHeight: `${height}px` }}
  />
)

// Lazy load below-fold sections for better initial load performance
const AboutUsSection = dynamic(() => import('./AboutUsSection.'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})
const CollectionsPage = dynamic(() => import('./CollectionPage'), {
  loading: () => <SectionSkeleton height={600} />,
  ssr: false,
})
const NewCulture = dynamic(() => import('./NewCulture'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})
const Culture = dynamic(() => import('./Culture'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})
const QuickSearch = dynamic(() => import('./QuickLinks'), {
  loading: () => <SectionSkeleton height={200} />,
  ssr: false,
})
const MatchSareeSection = dynamic(() => import('./MatchSareeSection'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})
const MatchSuitSection = dynamic(() => import('./MatchSuitSection'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})
const MatchCollection = dynamic(() => import('./MatchCollection'), {
  loading: () => <SectionSkeleton height={400} />,
  ssr: false,
})

const HomePage = ({data}) => {
  return (
    <>
      {/* Above-fold: Critical content loaded immediately */}
      <HeroAnimated/>
      <BrandSection />
      <NewCollection newCollection={data} />

      {/* Below-fold: Lazy loaded for better initial performance */}
      <Suspense fallback={<SectionSkeleton height={400} />}>
        <AboutUsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={600} />}>
        <CollectionsPage collections={data} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <MatchCollection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <MatchSareeSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <MatchSuitSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <NewCulture />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <Culture />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={200} />}>
        <QuickSearch />
      </Suspense>
    </>
  )
}

export default HomePage
