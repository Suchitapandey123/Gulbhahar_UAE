import { API_BASE_URL } from "@/utils/envHere";

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  [key: string]: unknown;
}

export const signupService = {
  signUp: async (userData: SignUpData): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  },

  verifyEmail: async (
    email: string,
    verificationCode: string
  ): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/users/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, verificationCode }),
    });
  },

  resendVerificationCode: async (email: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/users/resend-verification-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },

  initiatePhoneOTP: async (phoneNumber: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/codRoutes/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneNumber }),
    });
  },

  verifyPhoneOTP: async (
    sessionId: string,
    otp: string
  ): Promise<Response> => {
    return fetch(`${API_BASE_URL}/codRoutes/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, otp }),
    });
  },

  login: async (email: string, password: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  uploadImage: async (uploadUrl: string, imageFile: File): Promise<Response> => {
    return fetch(uploadUrl, {
      method: "PUT",
      body: imageFile,
      headers: { "Content-Type": imageFile.type },
    });
  },

  sendMobileLoginOtp: async (phoneNumber: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/loginwithphone/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
  },

  verifyMobileLoginOtp: async (
    userId: string,
    otp: string
  ): Promise<Response> => {
    return fetch(`${API_BASE_URL}/loginwithphone/verify-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, otp }),
    });
  },

  resendMobileLoginOtp: async (userId: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/loginwithphone/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  },

  getUserByToken: async (token: string): Promise<Response> => {
    return fetch(`${API_BASE_URL}/loginwithphone/user-by-token`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default signupService;
