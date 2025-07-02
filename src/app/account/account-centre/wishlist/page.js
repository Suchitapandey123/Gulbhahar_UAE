import React from 'react'
import Wishlist from './Component/Wishlist'

export const metadata={
  title:"Wishlist – Save Your Favorite Juttis | Gulbhahar",
  description:"View and manage your saved mirrorwork juttis for possible purchasing at Gulbhahar. Your selected juttis are only a click away!"
}

const page = () => {
  return (
    <div>
      <Wishlist/>
    </div>
  )
}

export default page
