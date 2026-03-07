import { API_BASE_URL } from "@/utils/envHere";
import { GetPreOrderProductsResponse } from "./preOrderTypes";

export const preOrderService = {
  async getPreOrderProducts(parentCategory: string, category?: string): Promise<GetPreOrderProductsResponse> {
    const res = await fetch(
      `${API_BASE_URL}/api/products/pre-order/by-category`,
      {
        next: {
          revalidate: 604800,
          tags: ["collections", `pre-order-${parentCategory}`],
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ parentCategory, category }),
      }
    );
    if (!res.ok) return { success: false, products: [], count: 0 };
    return res.json();
  },
};
