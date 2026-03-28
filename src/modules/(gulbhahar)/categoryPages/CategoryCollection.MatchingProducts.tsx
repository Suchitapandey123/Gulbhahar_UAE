// @ts-nocheck
import productApi from "@/services/product/productService";
import HorizontalCarousel from "@/shared-components/Scrollbar/HorizontalCarousel";
import Link from "next/link";
import ProductCard from "../common/ProductCard";

interface AvailableSize {
  name: string;
}

interface AvailableColor {
  name: string;
  hexcode: string;
}

interface Product {
  id?: string;
  productId?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice?: number;
  images?: string[][];
  availableSizes?: AvailableSize[];
  availableColors?: AvailableColor[];
  category?: string[];
  parentCategory?: string[];
  isActive?: boolean;
}

interface CategoryCollection_MatchingProductsProps {
  parentCategory: string;
}

const categoryLabels: Record<string, string> = {
  suit: "Suits",
  bags: "Bags",
  juttis: "Juttis",
};

const CategoryCollection_MatchingProducts = async ({
  parentCategory,
}: CategoryCollection_MatchingProductsProps) => {
  const matchingCategories = ["suit", "bags", "juttis"].filter(
    (cat) => cat !== parentCategory,
  );

  let groupedProducts: Record<string, Product[]> = {};

  try {
    const results = await Promise.all(
      matchingCategories.map((cat) =>
        productApi.getProductsByParentCategory(cat).then((products) => ({
          cat,
          products: products.slice(0, 8),
        }))
      )
    );
    for (const { cat, products } of results) {
      groupedProducts[cat] = products;
    }
  } catch (error) {
    console.error("Error fetching matching products:", error);
  }

  const nonEmptyCategories = matchingCategories.filter(
    (cat) => groupedProducts[cat]?.length > 0,
  );

  if (nonEmptyCategories.length === 0) {
    return null;
  }

  return (
    <>
      {nonEmptyCategories.map((cat) => (
        <div key={cat} className="col-span-full">
          {/* Heading */}
          <div className="w-full my-6 text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-900">
              Complete Your Look With {categoryLabels[cat]}
            </h2>
            <p className="text-sm text-gray-600">
              Perfect picks to pair with your dream outfit
            </p>
          </div>

          {/* Products Grid */}
          <HorizontalCarousel
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth"
            wrapperClassName="w-full"
          >
            {groupedProducts[cat].map((product, index) => (
              <div
                key={product.productId || product.id || index}
                className="w-[240px] sm:w-[340px] flex-shrink-0"
              >
                <ProductCard
                  item={product}
                  index={index}
                  priority={index < 2}
                />
              </div>
            ))}
          </HorizontalCarousel>

          {/* Discover All Button */}

          <div className="flex justify-center ">
            <Link
              href={`/${cat}`}
              className="group relative px-4 py-4 bg-transparent overflow-hidden border border-[#800000]/20 text-[#800000] transition-all duration-500 hover:border-[#800000]"
            >
              <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
              <span className="relative text-xs font-bold tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
                Discover All {categoryLabels[cat]}
              </span>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryCollection_MatchingProducts;
