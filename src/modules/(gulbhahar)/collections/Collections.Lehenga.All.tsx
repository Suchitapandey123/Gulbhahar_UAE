// @ts-nocheck
import productApi from "@/services/product/productService";
import Image from "next/image";
import { Fragment } from "react";
import ProductCard from "../common/ProductCard";

export const Collections_Lehenga_All = async () => {
  const products = await productApi.getProductsByParentCategory("lehenga");
  if (products.length === 0) {
    return (
      <div className="mt-10 mt-16 pt-2 lg:mt-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mt-16 pt-2 lg:mt-10">
      <div className="max-w-[1600px] mx-auto px-2 lg:px-4">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          <p className="text-sm tracking-[0.3em] text-red-800 uppercase mb-2">
            Handcrafted with Love
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Collection
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-red-800" />
            <span className="h-2 w-2 rounded-full bg-red-800" />
            <span className="h-[1px] w-12 bg-red-800" />
          </div>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Discover our exquisite collection of handcrafted juttis, blending
            traditional artistry with contemporary elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product: any, index: number) => {
            const key = product.productId || product._id || `product-${index}`;
            return (
              <Fragment key={key}>
                {index === 4 && (
                  <div className="col-span-full w-full my-4">
                    <Image
                      src="https://d21ojmskh8ksuv.cloudfront.net/static/banners/banner-image.jpg"
                      height={500}
                      width={1000}
                      alt="Gulbhahar Collection Banner"
                      loading="lazy"
                      unoptimized
                      className="w-full   rounded-lg"
                    />
                  </div>
                )}
                <ProductCard
                  item={product}
                  index={index}
                  priority={index < 4}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
