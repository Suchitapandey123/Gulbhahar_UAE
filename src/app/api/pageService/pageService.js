export const pageService = {


  async validateSlug(slug) {
    const res = await fetch(
      `https://api.gulbhahar.com/api/pages/validateSlug?slug=${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { success: false };
    return res.json();
  },
  // Fetch a single page by slug
  async getPageBySlug(slug) {
    if (!slug) throw new Error("Slug is required");

    const res = await fetch(
      `https://api.gulbhahar.com/api/pages/slug/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Error response:", text);
      throw new Error("Failed to fetch page");
    }

    return res.json(); // { success, page } or { data }
  },

  // Optionally, fetch all pages if needed for a list or sitemap
  async getAllPages(page = 1, limit = 10) {
    const res = await fetch(
      `https://api.gulbhahar.com/api/pages/getAll?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch pages");
    return res.json();
  },
};
