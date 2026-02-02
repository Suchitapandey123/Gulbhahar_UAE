import { API_BASE_URL } from "@/utils/envHere";
import CategoryCollectionClient from "./CategoryCollectionClient";

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

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/new-api/products/get-all-product`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
          tags: ["products", "home"],
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Filter only active products on the server
    return Array.isArray(data)
      ? data.filter((p: Product) => p.isActive !== false)
      : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function CategoryCollection({
  initialParentCategory = "all",
}: CategoryCollectionProps) {
  const products = await getProducts();

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
