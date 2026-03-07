import { API_BASE_URL } from "@/utils/envHere";
import { ApiResponse } from "@/types";

export const analyticsService = {
  trackAddToCart: async (productId: string): Promise<ApiResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/analytics/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking add to cart");
    }
    return response;
  },

  trackProceedToCheckout: async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/analytics/proceed-to-checkout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking proceed to checkout");
    }
    return response;
  },

  trackContinueToPayment: async (userData: unknown): Promise<ApiResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/analytics/continue-to-payment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking continue to payment");
    }
    return response;
  },

  trackPaymentMethod: async (paymentMethod: string): Promise<ApiResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/analytics/payment-method`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod }),
      }
    );
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking payment method");
    }
    return response;
  },

  trackOrderConfirmed: async (): Promise<ApiResponse> => {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/analytics/order-confirmed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking order confirmed");
    }
    return response;
  },

  trackOrderFailed: async (): Promise<ApiResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/v1/analytics/order-failed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const response: ApiResponse = await res.json();
    if (!response.success) {
      throw new Error(response.message || "Error tracking order failed");
    }
    return response;
  },
};

export default analyticsService;
