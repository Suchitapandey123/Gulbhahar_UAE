import React from 'react'
import HeroAnimated from './HeroAnimated'
import BrandSection from './BrandSection'
import NewCollection from './NewCollection'
import AboutUsSection from './AboutUsSection.'
import CollectionsPage from './CollectionPage'
import Culture from './Culture'
import QuickSearch from './QuickLinks'
import NewCulture from './NewCulture'

const HomePage = ({data}) => {
  // console.log(data)
  return (
    <>
      <HeroAnimated/>
      <BrandSection />
      <NewCollection newCollection = {data.slice(26,35)} />
      <AboutUsSection />
      <CollectionsPage collections={data.slice(26,35)} />
      <NewCulture />
      <Culture />
      <QuickSearch />
    </>
  )
}

export default HomePage
