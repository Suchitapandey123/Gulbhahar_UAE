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
  console.log(process.env.GOOGLE_CLIENT_ID)
  console.log(process.env.GOOGLE_CLIENT_SECRET)
  console.log(process.env.NEXT_PUBLIC_GOOGLE_ID)
  console.log(process.env.NEXT_PUBLIC_GOOGLE_SECRET)
  
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
