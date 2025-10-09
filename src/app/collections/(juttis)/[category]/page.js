
import ProductNotAvailable from '@/app/products/[id]/components/ProductNotFound/ProductNotFound'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({ params }) => {
  const { category } = await params
  console.log("Category:", category)

  // Pattern: starts with 'P' followed by 11 digits
  const pattern = /^P\d{11}$/
  const isMatching = pattern.test(category)
    if (isMatching) {
        redirect(`/products/${category}`)
    } else {
       return(
        <div className="mt-32">
        <ProductNotAvailable />
         </div>
       )
    }
}

export default page
