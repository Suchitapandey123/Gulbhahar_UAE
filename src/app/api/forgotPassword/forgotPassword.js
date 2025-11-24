
import axios from 'axios';

const API_BASE_URL = 'https://api.gulbhahar.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const forgotPasswordAPI = {
  
  forgotPassword: async (email) => {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  },

  
  verifyEmail: async (email, verificationCode) => {
    const response = await api.post('/users/verify-email', { 
      email, 
      verificationCode 
    });
    return response.data;
  },

  
    resetPassword: async ({ email, verificationCode, newPassword }) => {
    const response = await api.put('/users/reset-password', {
        email,
        verificationCode,
        newPassword,
    });
    return response.data;
  },

  
      resendVerificationCode: async (email) => {
        const response = await api.post('/users/resend-verification-code', { 
          email 
        });
        return response.data;
        }
    };

export default forgotPasswordAPI;