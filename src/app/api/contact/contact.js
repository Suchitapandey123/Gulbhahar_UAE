import { API_BASE_URL } from '@/utils/envHere';
import axios from 'axios';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactAPI = {
  
  createContactSupport: async (contactData) => {
    const response = await api.post(
      '/api/contactSupport/createContactSupport',
      contactData
    );
    return response.data;
  },

  
};

export default contactAPI;
