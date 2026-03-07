import { API_BASE_URL } from "@/utils/envHere";
import { SizeChartResponse } from "./sizeChartTypes";

export const sizeChartService = {
  async getSizeChartByParentCategory(parentCategory: string): Promise<SizeChartResponse> {
    const res = await fetch(
      `${API_BASE_URL}/new-api/size-chart/parent-category/${parentCategory}`,
      {
        next: {
          revalidate: 604800,
          tags: ["collections", `siz-chart-${parentCategory}`],
        },
      },
    );
    if (!res.ok) return { success: false };
    return res.json();
  },
};
