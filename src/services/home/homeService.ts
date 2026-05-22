import { API_BASE_URL } from "@/utils/envHere";
import { HomePageResponse } from "@/types";

export const homeService = {
  async getHomeData(): Promise<HomePageResponse> {
    const res = await fetch(`${API_BASE_URL}/new-api/home-page`, {
      next: {
        revalidate: 604800,
        tags: ["home-page"],
      },
    });

    if (!res.ok) return { success: false };
    return res.json();
  },

  async getCategoryProducts(): Promise<{ success: boolean; data: Record<string, any[]> }> {
    try {
      const res = await fetch(`${API_BASE_URL}/new-api/home-page/category-products`, {
        next: {
          revalidate: 3600,
          tags: ["category-products"],
        },
      });
      if (!res.ok) return { success: false, data: {} };
      return res.json();
    } catch {
      return { success: false, data: {} };
    }
  },
};

export default homeService;
