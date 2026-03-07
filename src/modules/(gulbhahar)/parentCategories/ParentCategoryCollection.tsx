// @ts-nocheck
import productApi from "@/services/product/productService";
import { Product } from "../products/types";
import CategoryCollectionClient from "../categoryPages/CategoryCollectionClient";


interface CategoryCollectionProps {
  initialParentCategory?: string;
  products?: Product[];
}

export default async function ParentCategoryCollection({
  initialParentCategory = "all"
}: CategoryCollectionProps) {
  const products = await productApi.getProductsByParentCategory(initialParentCategory);

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
    <>
      {products.length > 0 && (
        <CategoryCollectionClient
        show = {false}
          products={products}
          initialParentCategory={initialParentCategory}
        />
      )}
    </>

  );
}
