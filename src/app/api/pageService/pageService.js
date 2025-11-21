export const pageService = {


  async validateSlug(slug) {
    const res = await fetch(
      `https://api.gulbhahar.com/api/pages/validateSlug?slug=${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { success: false };
    return res.json();
  },
  

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
    return res.json(); 
  },

  
  async getAllPages(page = 1, limit = 10) {
    const res = await fetch(
      `https://api.gulbhahar.com/api/pages/getAll?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch pages");
    return res.json();
  },
};
