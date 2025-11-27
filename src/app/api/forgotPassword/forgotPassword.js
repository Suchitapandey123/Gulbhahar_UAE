
import { API_BASE_URL } from '@/utils/envHere';
import axios from 'axios';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const forgotPasswordAPI = {
  
  forgotPassword: async (email) => {
    const response = await api.post('/api/users/forgot-password', { email });
    return response.data;
  },

  
  verifyEmail: async (email, verificationCode) => {
    const response = await api.post('/api/users/verify-email', { 
      email, 
      verificationCode 
    });
    return response.data;
  },

  
    resetPassword: async ({ email, verificationCode, newPassword }) => {
    const response = await api.put('/api/users/reset-password', {
        email,
        verificationCode,
        newPassword,
    });
    return response.data;
  },

  
      resendVerificationCode: async (email) => {
        const response = await api.post('/api/users/resend-verification-code', { 
          email 
        });
        return response.data;
        }
    };

export default forgotPasswordAPI;