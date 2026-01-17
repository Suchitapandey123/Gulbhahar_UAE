'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import HeroAnimated from './HeroAnimated'
import BrandSection from './BrandSection'
import NewCollection from './NewCollection'

// Lazy load below-fold sections for better initial load performance
const AboutUsSection = dynamic(() => import('./AboutUsSection.'), {
  loading: () => <div className="min-h-[400px]" />,
})
const CollectionsPage = dynamic(() => import('./CollectionPage'), {
  loading: () => <div className="min-h-[400px]" />,
})
const NewCulture = dynamic(() => import('./NewCulture'), {
  loading: () => <div className="min-h-[400px]" />,
})
const Culture = dynamic(() => import('./Culture'), {
  loading: () => <div className="min-h-[400px]" />,
})
const QuickSearch = dynamic(() => import('./QuickLinks'), {
  loading: () => <div className="min-h-[200px]" />,
})

const HomePage = ({data}) => {
  return (
    <>
      <HeroAnimated/>
      <BrandSection />
      <NewCollection newCollection = {data} />
      <AboutUsSection />
      <CollectionsPage collections={data} />
      <NewCulture />
      <Culture />
      <QuickSearch />
    </>
  )
}

export default HomePage
