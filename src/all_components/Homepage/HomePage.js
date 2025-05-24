import React from 'react'
import HeroAnimated from './HeroAnimated'
import BrandSection from './BrandSection'
import NewCollection from './NewCollection'
import AboutUsSection from './AboutUsSection.'
import CollectionsPage from './CollectionPage'
import Culture from './Culture'
import QuickSearch from './QuickLinks'

const HomePage = () => {
  return (
    <>
      <HeroAnimated/>
      <BrandSection />
      <NewCollection  />
      <AboutUsSection />
      <CollectionsPage />
      <Culture />
      <QuickSearch />
    </>
  )
}

export default HomePage
