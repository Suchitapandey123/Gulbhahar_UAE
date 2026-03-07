import { API_BASE_URL } from "@/utils/envHere";
import axios from "axios";
import { ApiResponse } from "@/types";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export interface ResetPasswordData {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export const forgotPasswordService = {
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/api/users/forgot-password", { email });
    return response.data;
  },

  verifyEmail: async (
    email: string,
    verificationCode: string
  ): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/api/users/verify-email", {
      email,
      verificationCode,
    });
    return response.data;
  },

  resetPassword: async ({
    email,
    verificationCode,
    newPassword,
  }: ResetPasswordData): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>("/api/users/reset-password", {
      email,
      verificationCode,
      newPassword,
    });
    return response.data;
  },

  resendVerificationCode: async (email: string): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(
      "/api/users/resend-verification-code",
      { email }
    );
    return response.data;
  },
};

export default forgotPasswordService;
