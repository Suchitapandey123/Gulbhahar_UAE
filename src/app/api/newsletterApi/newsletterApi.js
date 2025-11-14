const API_BASE_URL = "https://api.gulbhahar.com";

export const newsletterAPI = {
  subscribe: async (payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API Error: ${res.status} → ${text}`);
      }

      return await res.json();
    } catch (error) {
      throw error;
    }
  },
};
