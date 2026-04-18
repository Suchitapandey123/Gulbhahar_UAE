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

      const allSimilar = (similarProducts as any)?.products ?? [];
      console.log(`=== SIMILAR PRODUCTS (${allSimilar.length}/8) for [${productID}] ===`);
      allSimilar.forEach((p: any, i: number) => {
        const hasImages = Array.isArray(p.images) && p.images.length > 0 && p.images[0]?.files?.length > 0;
        const colors = p.availableColors || p.colors || [];
        const hasColors = Array.isArray(colors) && colors.length > 0;
        // console.log(`[${i + 1}] ${p.productId} | ${p.name}`);
        // console.log(`     images: ${hasImages ? `✅ ${p.images.length} color(s), first has ${p.images[0].files.length} file(s)` : "❌ MISSING"}`);
        // console.log(`     colors: ${hasColors ? `✅ ${colors.length} color(s) → ${JSON.stringify(colors.slice(0, 3))}` : "❌ MISSING"}`);
        // console.log(`     RAW colors field: ${JSON.stringify(p.colors)} | RAW availableColors: ${JSON.stringify(p.availableColors)}`);
      });
      // console.log("============================");

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

export async function generateStaticParams() {
  try {
    const data = await productApi.getAllProducts();
    const products = data?.products ?? [];
    return products
      .filter((p) => p.productId)
      .map((p) => ({ id: p.productId }));
  } catch {
    return [];
  }
}

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
              return img?.[0] || "https://www.gulbhahar.com/gulbhaharlogoo.jpeg";
            } catch {
              return "https://www.gulbhahar.com/gulbhaharlogoo.jpeg";
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
