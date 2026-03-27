// @ts-nocheck
import productApi from "@/services/product/productService";
import ProductModule from "@/modules/(gulbhahar)/products";
import { Product, SimilarProduct } from "@/modules/(gulbhahar)/products/types";
import ProductSchema from "@/shared-components/seo/ProductSchema";
import type { Metadata } from "next";
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
/* SINGLE SHARED CACHED FETCH */
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

  if (!product) return {};

  const title = product.seo?.metaTitle;
  const description = product.seo?.metaDescription;
  const keywords = product.seo?.keywords;
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.gulbhahar.com/products/${params.id}`,
    },
    keywords,
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

  console.log("PRODUCT DATA:", product);

  if (!product) return null;


  return (
    <>
      <ProductSchema
        product={{
          id: product.productId ?? product._id ?? params.id,
          title: product.title ?? product.name ?? "",
          description: product.description ?? "",
          price: product.price,
          currency: "INR",
          image: (() => {
            try {
              const img = product.images?.[0] as any;
              if (img?.files?.[0]?.name)
                return `https://cdn.gulbhahar.com/ProductImages/${product.productId ?? params.id}/cards/${img.files[0].name}.webp`;
              return img?.[0] ?? "";
            } catch {
              return "";
            }
          })(),
          brand: "Gulbhahar",
          sku: product.productId ?? params.id,
          availability: "InStock",
          rating: 0,
          reviewCount: 0,
        }}
      />
      <ProductModule product={product} similarProducts={similarProducts} />
    </>
  );
}
