import { API_BASE_URL } from "@/utils/envHere";
import { ShippingAddressResponse, ApiResponse } from "@/types";

export interface CategorySlug {
  slug: string;
  title: string;
  parentCategory: string;
  fullSlug: string;
}

export const profileService = {
  getUserProfile: async (): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(`${API_BASE_URL}/api/users/user-by-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    return response.json();
  },

  updateUserProfile: async (userData: Record<string, unknown>): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(`${API_BASE_URL}/api/users/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(
        errorData.message || `Failed to update profile: ${response.status}`
      );
    }

    return response.json();
  },

  getUserAddresses: async (): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(
      `${API_BASE_URL}/api/get-address/get-user-saved-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch addresses: ${response.status}`);
    }

    return response.json();
  },

  getShippingAddressByOrderId: async (
    orderId: string
  ): Promise<ShippingAddressResponse> => {
    if (!orderId) {
      return { success: false, error: "Order ID is required", shippingAddress: null };
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/get-address/get-user-address-by-orderid?orderId=${orderId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: `API Error: ${response.status}`,
          shippingAddress: null,
        };
      }

      const data = await response.json();
      return {
        success: true,
        shippingAddress: data.shippingAddress || data.address || data,
        ...data,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
        shippingAddress: null,
      };
    }
  },

  searchCategories: async (searchQuery = ""): Promise<CategorySlug[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/pages/search-category-slug?search=${encodeURIComponent(searchQuery)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<Array<{ slug: string; parentCategory: string }>> =
        await response.json();

      if (data.success && data.data) {
        return data.data.map((item) => ({
          slug: item.slug,
          title: item.slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          parentCategory: item.parentCategory,
          fullSlug: `/collections/${item.slug}`,
        }));
      }

      return [];
    } catch (error) {
      console.error("Error searching categories:", error);
      return [];
    }
  },
};

export const searchCategories = profileService.searchCategories;

export default profileService;
