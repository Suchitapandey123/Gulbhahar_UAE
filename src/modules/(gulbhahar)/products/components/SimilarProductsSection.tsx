import { SimilarProduct } from "../types";
import { SimilarProductCard } from "./SimilarProductCard";

interface SimilarProductsSectionProps {
  similarProducts: SimilarProduct[];
  customRed: string;
}

export const SimilarProductsSection = ({
  similarProducts,
  customRed,
}: SimilarProductsSectionProps) => {
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <div className="mt-4 lg:mt-4">
      <div className="flex items-center justify-center mb-8">
        <div className="flex-grow h-px bg-gray-300"></div>
        <h3 className="text-xl sm:text-2xl font-medium mx-4 text-gray-900">
          Similar Products
        </h3>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {similarProducts.map((item) => (
          <SimilarProductCard
            key={item.productId}
            item={item}
            customRed={customRed}
          />
        ))}
      </div>
    </div>
  );
};
