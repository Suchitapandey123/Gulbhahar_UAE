import React from "react";
import { ProductClient } from "./client";
import productApi from "@/app/api/v0/product-service";
import { redirect } from "next/navigation";
import { cache } from "react";

// Cache the product fetch to avoid duplicate calls between generateMetadata and page
const getProduct = cache(async (productID) => {
  try {
    return await productApi.productById(productID);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
});

// Cache similar products fetch
const getSimilarProducts = cache(async (productID) => {
  try {
    return await productApi.getSimilarProducts(productID);
  } catch (error) {
    console.error('Error fetching similar products:', error);
    return [];
  }
});

export async function generateStaticParams() {
  try {
    const products = await productApi.getAllProduct();
    return products?.map((product) => ({
      id: product.productId,
    })) || [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// ISR: Revalidate every hour (fallback), or on-demand via /api/revalidate
// Uses 'products' and 'product-{id}' tags for targeted revalidation
export const revalidate = 3600;
export const dynamicParams = true;

// Parallel data fetching for product and similar products
async function getProductData(productID) {
  const [product, similarProducts] = await Promise.all([
    getProduct(productID),
    getSimilarProducts(productID),
  ]);

  if (!product) {
    throw new Error('Product not found');
  }

  return { product, similarProducts };
}


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

// Generate metadata function - uses cached getProduct to avoid duplicate fetches
export async function generateMetadata({ params }) {
  try {
    const param = await params;
    const productID = param.id;

    // Uses cached function - same request won't be duplicated in page component
    const product = await getProduct(productID);

    if (!product) {
      throw new Error('Product not found');
    }

    const title = product.title ? `${product.title.slice(0, 43)}... - Gulbhahar` : 'Gulbhahar';
    const description = product.details?.[0] || 'Shop handcrafted products at Gulbhahar';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'en_US',
        url: `https://www.gulbhahar.com/products/${productID}`,
        siteName: 'Gulbhahar',
        images: product.images?.[0]?.[0] ? [{
          url: product.images[0][0],
          width: 800,
          height: 600,
          alt: product.name || 'Product Image',
        }] : undefined,
      },
      alternates: {
        canonical: `https://www.gulbhahar.com/products/${productID}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);

    return {
      title: 'Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags',
      description: 'Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans.',
      alternates: {
        canonical: 'https://www.gulbhahar.com',
      },
      openGraph: {
        title: 'Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags',
        description: 'Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans.',
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

    // Get all images from the first color variant (what user sees first)
    const firstColorImages = product.images?.[0] || [];
    const cacheVersion = product.updatedAt ? `?v=${product.updatedAt}` : '';

    // Preload first 4 images (above the fold in grid)
    const imagesToPreload = firstColorImages.slice(0, 4).map(img =>
      img.startsWith('/') ? img : `${img}${cacheVersion}`
    );

    return (
      <>
        {/* Critical: Preload images before React renders */}
        {imagesToPreload.map((img, idx) => (
          <link
            key={`preload-${idx}`}
            rel="preload"
            as="image"
            href={img}
            // Highest priority for first 2 images
            fetchPriority={idx < 2 ? "high" : "low"}
          />
        ))}

        <ProductClient
          product={product}
          similarProducts={similarProducts || fallbackSimilarProducts}
        />
      </>
    );
  } catch (error) {
    console.error('Error in CollectionPage:', error);
    redirect('/not-found');
  }
}