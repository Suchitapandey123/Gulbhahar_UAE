import { API_BASE_URL } from "@/utils/envHere";
import { GetParentCategoryPageBySlugResponse } from "@/types";

export const parentCategoryPageService = {
  async getParentCategoryPageBySlug(
    slug: string
  ): Promise<GetParentCategoryPageBySlugResponse> {
    if (!slug) throw new Error("Slug is required");
    const res = await fetch(
      `${API_BASE_URL}/new-api/parent-category/slug/${slug}`,
      {
        next: {
          revalidate: 604800,
          tags: ["parent-categories", `parent-category-${slug}`],
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch parent page");
    }
    return res.json();
  },
};

export default parentCategoryPageService;
