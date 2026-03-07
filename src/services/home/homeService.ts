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
};

export default homeService;
