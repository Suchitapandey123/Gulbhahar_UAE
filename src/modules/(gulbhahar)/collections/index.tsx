import React from 'react'
import Collections_Juttis_All from './Collections.Juttis.All'
import { Collections_Suits_All } from './Collections.Suits.All'
import { Collections_Bags_All } from './Collections.Bags.All'


const All_Collections = () => {
  return (
    <div className='max-w-7xl  mt-16 pt-2 lg:mt-10 2xl:max-w-[1600px] mx-auto'>
    <Collections_Juttis_All />
    <Collections_Suits_All />
    <Collections_Bags_All />
    </div>
  )
}
export default All_Collections
