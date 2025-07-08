import React from "react";
import { ProductClient } from "./client";
import { QueryClient } from "@tanstack/react-query";
import productApi from "@/app/api/v0/product-service";
import { url } from "inspector";

async function getProductData(productID) {
  const queryClient = new QueryClient();

  try {
    // Fetch product details using fetchQuery
    const product = await queryClient.fetchQuery({
      queryKey: ['product', productID],
      queryFn: () => productApi.productById(productID)
    });

    // Fetch similar products using fetchQuery
    const similarProducts = await queryClient.fetchQuery({
      queryKey: ['similarProducts', productID],
      queryFn: () => productApi.getSimilarProducts(productID)
    });

    return {
      product,
      similarProducts
    };

  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}

// Fallback similar products in case the API fails
const fallbackSimilarProducts = [
  {
    id: 1,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 2,
  },
  {
    id: 2,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 3,
  },
  {
    id: 3,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 2,
  },
];

// Generate metadata function
export async function generateMetadata({ params }) {
  try {
    const param = await params;
    const productID = param.id;
    
    const { product } = await getProductData(productID);
    // console.log(product.details[0]);
    
    return {
      title: `${product.title.slice(0,43)}... - Gulbhahar`,
      description: product.details[0],
      openGraph: {
        title: `${product.title.slice(0,43)}... - Gulbhahar`,
      description: product.details[0],
        type: 'website',
        locale: 'en_US',
        url : `https://www.gulbhahar.com/collections/${productID}`,
        siteName: 'Gulbhahar',
      },
      alternates: {
        canonical: `https://www.gulbhahar.com/collections/${productID}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return { 
      title: 'Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags',
      description: 'Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans. Shop exclusive, handcrafted collections that redefine elegance and style.',
      icons: {
        icon: "/logo.png",
      },
      alternates: {
        canonical: 'https://www.gulbhahar.com',
      },
      openGraph: {
        title: 'Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags', 
        description: 'Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans. Shop exclusive, handcrafted collections that redefine elegance and style.',
        type: 'website',
        locale: 'en_US',
        url: 'https://www.gulbhahar.com', 
        siteName: 'Gulbhahar',
      },
    };
  }
}

export default async function CollectionPage({ params }) {
  try {
    const param = await params;
    const productID = param.id;
    // console.log('Params:', productID);
    
    const { product, similarProducts } = await getProductData(productID);

    // console.log('Product:', product);
    // console.log('Similar Products:', similarProducts);
    
    return (
      <ProductClient 
        product={product} 
        similarProducts={similarProducts || fallbackSimilarProducts} 
      />
    );
  } catch (error) {
    console.error('Error in CollectionPage:', error);
    
    return (
      <div className="error-container">
        <h2>Error loading product</h2>
        <p>Unable to load product details. Please try again later.</p>
      </div>
    );
  }
}