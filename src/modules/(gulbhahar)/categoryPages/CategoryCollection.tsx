import { API_BASE_URL } from "@/utils/envHere";
import CategoryCollectionClient from "./CategoryCollectionClient";
import productApi from "@/app/api/v0/product-service";

interface Product {
  _id?: string;
  productId?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice?: number;
  images?: string[][];
  availableSizes?: { name: string }[];
  availableColors?: { name: string; hexcode: string }[];
  parentCategory?: string[];
  category?: string[];
  stock?: number;
  isActive?: boolean;
  createdAt?: string;
  season?: string;
  fabric?: string;
}

interface CategoryCollectionProps {
  initialParentCategory?: string;
}

export default async function CategoryCollection({
  initialParentCategory = "all",
}: CategoryCollectionProps) {
  const products = await productApi.getProductsByParentCategory(initialParentCategory);

  if (products.length === 0) {
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
    <CategoryCollectionClient
      products={products}
      initialParentCategory={initialParentCategory}
    />
  );
}
