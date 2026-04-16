// @ts-nocheck
import productApi from "@/services/product/productService";
import ProductModule from "@/modules/(gulbhahar)/products";
import { sizeChartService } from "@/services/sizeChart/sizeChartService";
import { Product, SimilarProduct } from "@/modules/(gulbhahar)/products/types";
import ProductSchema from "@/shared-components/seo/ProductSchema";
import BreadcrumbSchema from "@/shared-components/seo/BreadcrumbSchema";
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
  async (productID: string): Promise<{
    product: Product | null;
    similarProducts: SimilarProduct;
    sizeChart: any;
  }> => {
    try {
      const product = await productApi.getProductById(productID);
      
      if (!product) {
        return { 
          product: null, 
          similarProducts: { success: false, count: 0, products: [] },
          sizeChart: null 
        };
      }

      const [similarProducts, sizeChart] = await Promise.all([
        productApi.getSimilarProducts(productID).catch(() => ({ success: false, count: 0, products: [] })),
        sizeChartService.getSizeChartByParentCategory(product.parentCategory[0]).catch(() => null)
      ]);

      return { product, similarProducts, sizeChart };
    } catch (error) {
      console.error("Product bundle fetch failed:", error);
      return { product: null, similarProducts: { success: false, count: 0, products: [] }, sizeChart: null };
    }
  },
);

/* ------------------------------------------------------------------ */

export const revalidate = 3600; // 1 hour
export const fetchCache = 'force-cache';
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

  // Build OG image URL from first product image
  const firstImg = (product.images?.[0] as any)?.files?.[0];
  const ogImageUrl = firstImg?.name
    ? `https://cdn.gulbhahar.com/ProductImages/${params.id}/display/${firstImg.name}.webp`
    : "https://www.gulbhahar.com/gulbhaharlogoo.jpeg";

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
      images: [{ url: ogImageUrl, width: 800, height: 600, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page */
/* ------------------------------------------------------------------ */

export default async function CollectionPage(props: PageParams) {
  const params = await props.params;
  const { product, similarProducts, sizeChart } = await getProductBundle(params.id);
  console.log("PRODUCT DATA:", product);

  if (!product) return null;


  const productId = product.productId ?? product._id ?? params.id;
  const parentCategory = product.parentCategory?.[0] ?? "products";

  const breadcrumbItems = [
    { name: "Home", url: "https://www.gulbhahar.com" },
    {
      name: parentCategory.charAt(0).toUpperCase() + parentCategory.slice(1),
      url: `https://www.gulbhahar.com/collections/${parentCategory.toLowerCase()}`,
    },
    {
      name: product.name ?? "",
      url: `https://www.gulbhahar.com/products/${productId}`,
    },
  ];

  return (
    <>
      <ProductSchema
        product={{
          id: productId,
          title: product.name ?? "",
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
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductModule product={product} similarProducts={similarProducts} sizeChart={sizeChart} />
    </>
  );
}
