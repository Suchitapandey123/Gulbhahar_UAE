// @ts-nocheck
import productApi from "@/services/product/productService";
import Link from "next/link";
import { Fragment } from "react";
import ProductCard from "../common/ProductCard";

export const Collections_Bags_All = async () => {
  const products = await productApi.getProductsByParentCategory("bags");

  if (products.length === 0) {
    return (
      <div className="mt-10 pt-2 lg:mt-10 flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className=" mt-16 pt-2 lg:mt-20">
      <div className="max-w-[1600px] mx-auto px-2 lg:px-4">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          {/* <p className="text-sm tracking-[0.3em] text-red-800 uppercase mb-2">
            Handcrafted with Love
          </p> */}
          <h1 className="group relative inline-block  bg-transparent overflow-hidden  text-[#000000] mb-4">
            <div className="absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative text-xl sm:text-2xl lg:text-3xl  font-medium tracking-[0.15em] uppercase">
              Bags
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-12 bg-red-800" />
            <span className="h-2 w-2 rounded-full bg-red-800" />
            <span className="h-[1px] w-12 bg-red-800" />
          </div>
          {/* <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            Discover our exquisite collection of handcrafted juttis, blending
            traditional artistry with contemporary elegance.
          </p> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.slice(0, 8).map((product: any, index: number) => {
            const key = product.productId || product._id || `product-${index}`;
            return (
              <Fragment key={key}>
                <ProductCard
                  item={product}
                  index={index}
                  priority={index < 4}
                />
              </Fragment>
            );
          })}
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <Link
            href="/bags"
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none border border-[#800000] text-[#800000] transition-colors hover:text-white"
          >
            <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-300 ease-out group-hover:w-full" />
            <span className="relative text-sm font-medium tracking-[0.2em] uppercase">
              See All Bags
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
