import axios from 'axios';

const API_BASE_URL = 'https://api.gulbhahar.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactAPI = {
  
  createContactSupport: async (contactData) => {
    const response = await api.post(
      '/contactSupport/createContactSupport',
      contactData
    );
    return response.data;
  },

  
};

export default contactAPI;
