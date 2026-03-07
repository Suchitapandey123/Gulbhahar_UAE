import { API_BASE_URL } from "@/utils/envHere";
import {
  OrderCancellationData,
  OtpVerificationData,
  ApiResponse,
} from "@/types";

export const orderService = {
  getOrderHistory: async (): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(`${API_BASE_URL}/orders/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    return response.json();
  },

  sendOtpForCancellation: async (
    data: OrderCancellationData
  ): Promise<ApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/orders/send-otp-for-order-cancellation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          userName: data.userName,
          orderId: data.orderId,
        }),
      }
    );

    const responseData: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to send OTP");
    }

    return responseData;
  },

  verifyOtpForCancellation: async (
    data: OtpVerificationData
  ): Promise<ApiResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/orders/verify-otp-for-order-cancellation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          user: data.userName,
          otp: data.otp,
          orderId: data.orderId,
        }),
      }
    );

    const responseText = await response.text();
    let responseData: ApiResponse;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      throw new Error("Invalid response from server");
    }

    if (!response.ok) {
      throw new Error(
        responseData.message ||
          `OTP verification failed (Status: ${response.status})`
      );
    }

    return responseData;
  },
};

export default orderService;
