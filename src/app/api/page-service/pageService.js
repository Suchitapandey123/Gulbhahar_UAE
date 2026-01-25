import { API_BASE_URL } from "@/utils/envHere";

// ISR with on-demand revalidation via cache tags
// Tags: 'collections', 'collection-{slug}'
// Revalidate via: POST /api/revalidate { secret, type: 'tag', tag: 'collections' }
export const pageService = {
  async validateSlug(slug) {
    const res = await fetch(
      `${API_BASE_URL}/api/pages/validateSlug?slug=${slug}`,
      {
        next: {
          revalidate: 604800,
          tags: ["collections", `collection-${slug}`],
        },
      },
    );
    if (!res.ok) return { success: false };
    return res.json();
  },

  async getPageBySlug(slug) {
    if (!slug) throw new Error("Slug is required");
    const res = await fetch(`${API_BASE_URL}/api/pages/slug/${slug}`, {
      next: {
        revalidate: 604800,
        tags: ["collections", `collection-${slug}`],
      },
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Error response:", text);
      throw new Error("Failed to fetch page");
    }
    return res.json();
  },

  async getAllPages(page = 1, limit = 10) {
    const res = await fetch(
      `${API_BASE_URL}api/pages/getAll?page=${page}&limit=${limit}`,
      {
        next: {
          revalidate: 604800,
          tags: ["collections"],
        },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch pages");
    return res.json();
  },

  async getQuickLinks(parentCategory, currentSlug) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/pages/get-quicklinks?parentCategory=${encodeURIComponent(
          parentCategory,
        )}&currentSlug=${encodeURIComponent(currentSlug)}`,
        {
          next: {
            revalidate: 604800,
            tags: ["collections", `collection-${currentSlug}`],
          },
        },
      );

      if (!res.ok) throw new Error("Failed to fetch quick links");

      return res.json();
    } catch (error) {
      console.error("QuickLinks API Error:", error);
      return { success: false, data: [] };
    }
  },
};
