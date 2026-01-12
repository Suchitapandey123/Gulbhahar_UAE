import React from 'react'
import HeroAnimated from './HeroAnimated'
import BrandSection from './BrandSection'
import NewCollection from './NewCollection'
import AboutUsSection from './AboutUsSection.'
import CollectionsPage from './CollectionPage'
import Culture from './Culture'
import QuickSearch from './QuickLinks'
import NewCulture from './NewCulture'
import MatchCollection from './matchCollection'
import MatchSareeSection from './MatchSareeSection'
import MatchSuitSection from './MatchSuitSection'

const HomePage = ({data}) => {
  
  return (
    <>
      <HeroAnimated/>
      <BrandSection />
      <NewCollection newCollection = {data} />
      <AboutUsSection />
      <CollectionsPage collections={data} />
      <MatchCollection />
      <MatchSareeSection />
      <MatchSuitSection />
      <NewCulture />
      <Culture />
      <QuickSearch />
    </>
  )
}

export default HomePage
