
// const BASE_URL = "http://localhost:8080"

import { API_BASE_URL } from "@/utils/envHere";

export const signupApi = {
  
  signUp: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  
  verifyEmail: async (email, verificationCode) => {
    const response = await fetch(`${API_BASE_URL}/api/users/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        verificationCode
      }),
    });
    return response;
  },

  
  resendVerificationCode: async (email) => {
    const response = await fetch(`${API_BASE_URL}/api/users/resend-verification-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });
    return response;
  },

  initiatePhoneOTP: async (phoneNumber) => {
    const response = await fetch(`${API_BASE_URL}/codRoutes/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber
      }),
    });
    return response;
  },

  verifyPhoneOTP: async (sessionId, otp) => {
    const response = await fetch(`${API_BASE_URL}/codRoutes/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        otp
      }),
    });
    return response;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    console.log(response)
    return response;
  },
   
  uploadImage: async (uploadUrl, imageFile) => {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: imageFile,
      headers: {
        'Content-Type': imageFile.type,
      },
    });
    return response;
  },

  sendMobileLoginOtp: async (phoneNumber) => {
    const response = await fetch(`${API_BASE_URL}/loginwithphone/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber  
      }),
    });
    return response;
  },

  verifyMobileLoginOtp: async (userId, otp) => {
    const response = await fetch(`${API_BASE_URL}/loginwithphone/verify-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        otp: otp
      }),
    });
    return response;
  },

  resendMobileLoginOtp: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/loginwithphone/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId
      }),
    });
    return response;
  },


  getUserByToken: async (token) => {
    const response = await fetch(`${API_BASE_URL}/loginwithphone/user-by-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
};

export default signupApi;