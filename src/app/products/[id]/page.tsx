// @ts-nocheck
import productApi from "@/services/product/productService";
import ProductModule from "@/modules/(gulbhahar)/products";
import { Product, SimilarProduct } from "@/modules/(gulbhahar)/products/types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type PageParams = {
  params: Promise<{
    id: string;
  }>;
};

/* ------------------------------------------------------------------ */
/* 🔥 SINGLE SHARED CACHED FETCH */
/* ------------------------------------------------------------------ */

const getProductBundle = cache(
  async (
    productID: string,
  ): Promise<{
    product: Product | null;
    similarProducts: SimilarProduct;
  }> => {
    try {
      const [product, similarProducts] = await Promise.all([
       productApi.getProductById(productID),
        productApi.getSimilarProducts(productID),
      ]);

      return {
        product,
        similarProducts: similarProducts ?? { success: false, count: 0, products: [] },
      };
    } catch (error) {
      console.error("Product bundle fetch failed:", error);
      return { product: null, similarProducts: { success: false, count: 0, products: [] } };
    }
  },
);

/* ------------------------------------------------------------------ */

export const revalidate = 3600;
export const dynamicParams = true;

/* ------------------------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------------------------ */

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;
  const { product } = await getProductBundle(params.id);


  if (!product) {
    return {
      title: "Gulbhahar | Crafting Luxury – Handmade Juttis & Designer Bags",
      description:
        "Gulbhahar offers luxury handmade juttis and designer bags crafted by skilled artisans.",
      alternates: {
        canonical: "https://www.gulbhahar.com",
      },
    };
  }

  const title = product.seo?.metaTitle
  const description = product.seo?.metaTitle
  const keywords = product.seo?.keywords
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.gulbhahar.com/products/${params.id}`,
    },
    keywords ,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "Gulbhahar",
      url: `https://www.gulbhahar.com/products/${params.id}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function CollectionPage(props: PageParams) {
  const params = await props.params;
  const { product, similarProducts } = await getProductBundle(params.id);

  if (!product) {
    redirect("/not-found");
  }

  return <ProductModule product={product} similarProducts={similarProducts} />;
}
