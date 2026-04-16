// @ts-nocheck

import { getProductImagesForColor } from "@/utils/productImageUtils";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { DeliveryChecker } from "./components/DeliveryChecker";
import { ProductDetails } from "./components/ProductDetails";
import { ProductView } from "./components/ProductView";
import Reviews from "./components/Reviews";
import { SimilarProductsSection } from "./components/SimilarProductsSection";
import { Product, SimilarProduct } from "./types";

interface ProductModuleProps {
  product: Product;
  similarProducts: SimilarProduct;
  sizeChart: any;
}

const CUSTOM_RED = "hsl(359.39deg 63.87% 30.39%)";

export default async function ProductModule({ product, similarProducts, sizeChart }: ProductModuleProps) {


  

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

      <div className="bg-white py-4 mt-10 sm:mt-0 px-2 sm:py-3 sm:px-3 lg:py-4 lg:px-4 font-raleway">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">
          <Breadcrumbs
            parentCategoryName={parentCategoryName}
            productName={product.name || ""}
            customRed={CUSTOM_RED}
          />

         <ProductView sizeChart={sizeChart?.data || null} product={product} customRed={CUSTOM_RED} />
          <div className="block md:hidden">
            <DeliveryChecker customRed={CUSTOM_RED} />
          </div>

          {/* Server-rendered product details section */}
          <div className="pt-16 border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <ProductDetails product={product} />
              <div className="lg:border-l lg:pl-4 border-gray-100">
                <Reviews
                  variant="mobile"
                  productId={product.productId || product.id || ""}
                />
                <Reviews
                  variant="desktop"
                  productId={product.productId || product.id || ""}
                />
              </div>
            </div>
          </div>

          <SimilarProductsSection
            similarProducts={similarProducts}
            customRed={CUSTOM_RED}
          />
        </div>
      </div>
    </>
  );
}
