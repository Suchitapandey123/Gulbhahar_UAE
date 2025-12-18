import { API_BASE_URL } from "@/utils/envHere";
import axios from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

  
const productApi = {
  getAllProduct: async () => {
    try {
      const response = await api.get(
        "/api/products/get-all-product"
      );
      
      const data = response.data;
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  

  productById: async (productId) => {
    // // console.log(productId)
    try {
      const response = await api.post(
        "/api/products/get-product-by" ,
        {
            productId
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  
   
  getSimilarProducts: async (productId) => {
    // // console.log(productId)
    try {
      const response = await api.get(
        "/api/products/get-similar-product" ,
        {
            productId
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },


  getInterestedProducts: async (productId) => {
    // // console.log(productId)
    try {
      const response = await api.post(
        "api/products/intrested-product",
        {
            productId
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  

  // new services
  //   getSarees: async () => {
  //   try {
  //     const response = await api.post('/api/products/get-all-product/sarees');
  //     return response.data;
  //   } catch (err) {
  //     console.error('API error', err.response?.status, err.response?.data);
  //     return [];
  //   }
  // },

  // getSuits: async () => {
  //   try {
  //     const response = await api.post('/api/products/get-all-product/suits');
  //     return response.data;
  //   } catch (err) {
  //     console.error('API error', err.response?.status, err.response?.data);
  //     return [];
  //   }
  // },

  // getHeels: async () => {
  //   try {
  //     const response = await api.post('/api/products/get-all-product/heels');
  //     return response.data;
  //   } catch (err) {
  //     console.error('API error', err.response?.status, err.response?.data);
  //     return [];
  //   }
  // },

  // getBags: async () => {
  //   try {
  //     const response = await api.post('/api/products//get-all-product-by-category' ,{
  //       category: "bags"
  //     });
      
  //     return response.data;
  //   } catch (err) {
  //     console.error('API error', err.response?.status, err.response?.data);
  //     return [];
  //   }
  // },  
     
  
    getProductsByCategory: async (categoryName) => {
      // console.log(categoryName)
    try {
  const response = await api.post("/api/products/get-all-product-by-category", {
    category:  categoryName 
  });
  // console.log('API raw response:', response.data); 
  // return response.data.data || response.data; 
   return response.data;
} catch (err) {
  console.error("API error", err.response?.status, err.response?.data);
  return [];
}

  },
  
  
};
export default productApi;