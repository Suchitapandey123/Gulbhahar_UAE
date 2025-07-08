import React from 'react'
import Wishlist from './Component/Wishlist'

export async function generateMetadata() {
  return {
    title: "My Wishlist - Save Your Favorite Gulbhahar Jutti Styles",
    description:
      "Save your favorite Gulbhahar jutti styles in your wishlist. Keep track and get notified about sales on your preferred handcrafted footwear. Your juttis are only a click away!",
    alternates: {
      canonical: "https://www.gulbhahar.com/account/account-centre/wishlist",
    },
    openGraph: {
      title: "My Wishlist - Save Your Favorite Gulbhahar Jutti Styles",
      description:
        "Save your favorite Gulbhahar jutti styles in your wishlist. Keep track and get notified about sales on your preferred handcrafted footwear. Your juttis are only a click away!",
      type: "website",
      locale: "en_US",
      url: "https://www.gulbhahar.com/account/account-centre/wishlist",
      siteName: "Gulbhahar",
    },
  };
}

const page = () => {
  return (
    <div>
      <Wishlist/>
    </div>
  )
}

export default page
