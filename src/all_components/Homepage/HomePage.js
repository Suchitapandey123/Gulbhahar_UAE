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
  // console.log("google client : ",process.env.GOOGLE_CLIENT_ID)
  // console.log("google client secret : ",process.env.GOOGLE_CLIENT_SECRET)
  // console.log("next auth secret : ",process.env.NEXTAUTH_SECRET)
  // console.log("next auth url : ",process.env.NEXTAUTH_URL)
  
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
