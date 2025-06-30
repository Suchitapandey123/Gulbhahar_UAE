import axios from "axios";
import { color } from "framer-motion";

const API_BASE_URL = "https://api.gulbhahar.com";
// Main API instance with authentication for all operations
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const ProductApi_v1 = {
  // Add product to wishlist
  addToCart: async (product, token) => {
    console.log(product, token);  
    try {
      const response = await api.post("/api/cart/add", {
        productId: product.productId,
        size : product.size,
        color: product.color,

      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Get all wishlist items
  getAllCarts: async (token) => {
    try {
      const response = await api.post("/wishlist/allwishlist");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Delete item from wishlist
  deleteFromCart: async (productId , token) => {
    try {
      const response = await api.delete(`/wishlist/deletewish/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};


export default  ProductApi_v1 ;