import { API_BASE_URL } from "@/utils/envHere";
import { ApiResponse } from "@/types";

export interface NewsletterPayload {
  email: string;
  [key: string]: unknown;
}

export const newsletterService = {
  subscribe: async (payload: NewsletterPayload): Promise<ApiResponse> => {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData: ApiResponse = await res.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return res.json();
  },
};

export default newsletterService;
