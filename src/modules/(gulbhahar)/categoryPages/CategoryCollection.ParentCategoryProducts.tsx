// @ts-nocheck
import productApi from "@/services/product/productService";
import Link from "next/link";
import { Fragment } from "react";
import ProductCard from "../common/ProductCard";
import CategoryCollectionPreOrderProducts from "./CategoryCollection.PreOrderProducts";

interface ParentCategoryProps {
  parentCategory: string;
  slug?: string ;
}

export const CategoryCollection_ParentCategoryProducts = async ({
  parentCategory,slug
}: ParentCategoryProps) => {
  // Use the dynamic parentCategory prop for the API call
  const products = await productApi.getProductsByParentCategory(parentCategory);

  if (products.length === 0) {
    return <CategoryCollectionPreOrderProducts parentCategory={parentCategory} slug={slug} />;
  }

  // Format parentCategory for display (e.g., 'suit' -> 'Suits')
  const displayName = parentCategory
    ? parentCategory.charAt(0).toUpperCase() + parentCategory.slice(1)
    : "";

  return (
    <div className="max-w-[1600px] mx-auto pt-10">
      {/* Header Section - Refined & Smoother */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-8 bg-[#800000]/30" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#800000]/60">
            Heritage Collection
          </span>
          <div className="h-px w-8 bg-[#800000]/30" />
        </div>

        <h2
          className="text-3xl md:text-4xl font-serif text-[#2d2d2d] mb-4"
          style={{ fontFamily: "'Old Standard TT', serif" }}
        >
          Explore Our{" "}
          <span className="text-[#800000] italic">{displayName}</span> Range
        </h2>

        <p className="text-gray-500 max-w-lg text-sm md:text-base italic">
          While this specific niche is being curated, you might find your
          perfect match in our broader {parentCategory} collection.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.slice(0, 8).map((product: any, index: number) => {
          const key = product.productId || product._id || `product-${index}`;
          return (
            <Fragment key={key}>
              <ProductCard item={product} index={index} priority={index < 4} />
            </Fragment>
          );
        })}
      </div>

      <div className="flex justify-center mt-14 mb-8">
        <Link
          href={`/${parentCategory.toLowerCase()}`}
          className="group relative px-10 py-4 bg-transparent overflow-hidden border border-[#800000]/20 text-[#800000] transition-all duration-500 hover:border-[#800000]"
        >
          <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
          <span className="relative text-xs font-bold tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
            Discover All {displayName}
          </span>
        </Link>
      </div>
    </div>
  );
};
