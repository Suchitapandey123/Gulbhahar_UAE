import axios from "axios";

const API_BASE_URL = "http://194.238.23.44:9080";

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
      //   giving only 100 data
      const data = response.data;
      return data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
  productById: async (productId) => {
    // console.log(productId)
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
    // console.log(productId)
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
    // console.log(productId)
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
};
export default productApi;
