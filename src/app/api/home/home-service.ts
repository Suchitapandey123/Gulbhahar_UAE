import { API_BASE_URL } from "@/utils/envHere";
import { HomePageData } from "./type";

export interface HomePageResponse {
  success: boolean;
  data?: HomePageData;
}

export const homePageService = {
  async getHomeData(): Promise<HomePageResponse> {
    const res = await fetch(
      `${API_BASE_URL}/new-api/home-page`,
      {
        next: {
          revalidate: 604800,
          tags: ["home-page"],
        },
      },
    );

    if (!res) return { success: false };
    const data = await res.json()

    return data
  },
};


