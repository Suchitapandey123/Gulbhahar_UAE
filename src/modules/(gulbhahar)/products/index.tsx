// @ts-nocheck

import { Suspense } from "react";
import { getProductImagesForColor } from "@/utils/productImageUtils";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { ProductDetails } from "./components/ProductDetails";
import { ProductView } from "./components/ProductView";
import Reviews from "./components/Reviews";
import { SimilarProductsSection } from "./components/SimilarProductsSection";
import { Product } from "./types";


interface ProductModuleProps {
  product: Product;
  sizeChart: any;
}


const CUSTOM_RED = "hsl(359.39deg 63.87% 30.39%)";

async function getReviewSummary(productId: string): Promise<{ avg: number; count: number }> {
  try {
    const res = await fetch(`https://api.gulbhahar.com/api/reviews/allReviews/${productId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { avg: 0, count: 0 };
    const data = await res.json();
    const reviews = data.reviews ?? [];
    if (!reviews.length) return { avg: 0, count: 0 };
    const avg = reviews.reduce((s: number, r: any) => s + (r.rating ?? 0), 0) / reviews.length;
    return { avg: Math.round(avg * 10) / 10, count: reviews.length };
  } catch {
    return { avg: 0, count: 0 };
  }
}

export default async function ProductModule({ product, similarProducts, sizeChart }: ProductModuleProps) {
  const reviewSummary = await getReviewSummary(product.productId || product.id || "");

  const parentCategoryName = Array.isArray(product.parentCategory) ? product.parentCategory[0] : product.parentCategory;
  const imagesToPreload = getProductImagesForColor(
    product.productId,
    product.images,
    0,
    "product"
  ).slice(0, 3);


  return (
    <>
      {/* Preload ONLY LCP-critical images */}
      {imagesToPreload.map((img, idx) => (
        <link
          key={img.url}
          rel="preload"
          as="image"
          href={img.url}
          fetchPriority={idx === 0 ? "high" : "low"}
        />
      ))}

      <div className="bg-white py-4 mt-10 sm:mt-0 px-3 sm:py-3 sm:px-4 lg:py-6 lg:px-[80px] font-raleway">
        <div className="max-w-[1440px] mx-auto mt-6 sm:mt-10 md:mt-24">
          <Breadcrumbs
            parentCategoryName={parentCategoryName}
            productName={product.name || ""}
            customRed={CUSTOM_RED}
          />

          <Suspense fallback={null}>
            <ProductView
              sizeChart={sizeChart?.data || null}
              product={product}
              customRed={CUSTOM_RED}
              avgRating={reviewSummary.avg}
              reviewCount={reviewSummary.count}
            />
          </Suspense>
          {/* Server-rendered product details section */}
          <div className="pt-4 md:pt-16 border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <ProductDetails product={product} />
              <div className="lg:border-l lg:pl-4 border-gray-100">
                <Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-lg" />}>
                  <Reviews
                    variant="mobile"
                    productId={product.productId || product.id || ""}
                  />
                  <Reviews
                    variant="desktop"
                    productId={product.productId || product.id || ""}
                  />
                </Suspense>
              </div>
            </div>
          </div>

          <Suspense fallback={null}>
            <SimilarProductsSection
              productId={product.productId || product.id || ""}
              customRed={CUSTOM_RED}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
