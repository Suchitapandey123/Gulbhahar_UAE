// @ts-nocheck
import productApi from "@/services/product/productService";
import ParentCategoryCollectionClient from "./ParentCategoryCollectionClient";

interface CategoryCollectionProps {
  initialParentCategory?: string;
}

export default async function ParentCategoryCollection({
  initialParentCategory = "all"
}: CategoryCollectionProps) {
  const { products, nextCursor } = await productApi.getProductsByParentCategoryPage(initialParentCategory);
  

  if (!products || products.length === 0) {
    return (
      <div className="mt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">
            No products available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ParentCategoryCollectionClient
      initialProducts={products}
      initialCursor={nextCursor}
      parentCategory={initialParentCategory}
      show={false}
    />
  );
}
