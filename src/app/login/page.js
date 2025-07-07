import React from 'react'
import LoginPage from './Component/Login'
export const metadata={
  title:"Access Your Gulbhahar Account",
  description:" Log in to your Gulbhahar account to see orders and wishlist and track your handcrafted mirrorwork juttis in one space."
}

const page = () => {
  return (
    <div>
      <LoginPage/>
    </div>
  )
}

export default page
