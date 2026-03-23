import { API_BASE_URL } from "@/utils/envHere";
import { Product, ProductApiResponse } from "@/types";

export const productService = {
  getAllProducts: async (): Promise<ProductApiResponse> => {
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
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getProductById: async (productId: string): Promise<ProductApiResponse | null> => {
    const response = await fetch(
      `${API_BASE_URL}/new-api/products/get-product-by-id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ productId }),
        next: {
          revalidate: 3600,
          tags: ["products", `product-${productId}`],
        },
      }
    );

    // 404 / 410 from the API → product doesn't exist or was deleted.
    // Return null so the page can call gone() cleanly instead of crashing.
    if (response.status === 404 || response.status === 410) return null;

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getSimilarProducts: async (productId: string): Promise<ProductApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/new-api/products/get-similar-products/${productId}?limit=8`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        next: {
          revalidate: 3600,
          tags: ["products", `product-${productId}-similar`],
        },
      }
    );

    if (!response.ok) return { success: false, products: [], data: [] };

    return response.json();
  },

  getInterestedProducts: async (productId: string): Promise<ProductApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/products/intrested-product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ productId }),
        next: { revalidate: 3600, tags: ["products"] },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  getProductsByCategory: async (categoryName: string): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/new-api/products/get-product-by-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ category: categoryName }),
          next: {
            revalidate: 3600,
            tags: ["products", "collections", "collection-juttis"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductApiResponse = await response.json();
      const products = data?.products || (data?.data as Product[]) || [];
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  },

  getProductsByParentCategory: async (
    parentCategory: string
  ): Promise<Product[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/new-api/products/get-product-by-parentCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ parentCategory }),
          next: {
            revalidate: 3600,
            tags: ["products", "collections", "collection-juttis"],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductApiResponse = await response.json();
      const products = data?.products || (data?.data as Product[]) || [];
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching products by parent category:", error);
      return [];
    }
  },

  getProductsByParentCategoryPage: async (
    parentCategory: string,
    cursor?: string
  ): Promise<{ products: Product[]; nextCursor: string | null }> => {
    try {
      const body: Record<string, string> = { parentCategory };
      if (cursor) body.cursor = cursor;

      const response = await fetch(
        `${API_BASE_URL}/new-api/products/get-product-by-parentCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
          next: {
            revalidate: 3600,
            tags: ["products", "collections", `parent-${parentCategory}`],
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductApiResponse = await response.json();

      const products = data?.products || (data?.data as Product[]) || [];
      return {
        products: Array.isArray(products) ? products : [],
        nextCursor: (data as { nextCursor?: string })?.nextCursor ?? null,
      };
    } catch (error) {
      console.error("Error fetching products by parent category:", error);
      return { products: [], nextCursor: null };
    }
  },

  // V1 - cart operations
  addToCart: async (
    product: { productId: string; size?: string; color?: string },
    token: string
  ): Promise<unknown> => {
    const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.productId,
        size: product.size,
        color: product.color,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  },
};

export default productService;
