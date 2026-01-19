import { API_BASE_URL } from "@/utils/envHere";

// ISR with on-demand revalidation via cache tags
// Tags: 'products', 'product-{id}', 'collections', 'home'
// Revalidate via: POST /api/revalidate { secret, type: 'tag', tag: 'products' }
const productApi = {
  getAllProduct: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/new-api/products/get-all-product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        next: {
          revalidate: 3600, // Fallback: revalidate every hour
          tags: ['products', 'home'] // On-demand revalidation tags
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },

  productById: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/new-api/products/get-product-by-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ productId }),
        next: {
          revalidate: 3600, // Fallback: revalidate every hour
          tags: ['products', `product-${productId}`] // On-demand revalidation tags
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("productById API data:", data);
      return data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },

  getSimilarProducts: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/get-similar-product?productId=${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        next: {
          revalidate: 3600,
          tags: ['products', `product-${productId}-similar`]
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching similar products:', error);
      throw error;
    }
  },

  getInterestedProducts: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/intrested-product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ productId }),
        next: {
          revalidate: 3600,
          tags: ['products']
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching interested products:', error);
      throw error;
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
    try {
      // console.log("API CALL - Fetching products for category:", categoryName);

      const response = await fetch(`${API_BASE_URL}/api/products/get-all-product-by-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ category: categoryName }),
        next: {
          revalidate: 3600,
          tags: ['products', 'collections', `collection-${categoryName}`]
        },
      });

      // console.log("API Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API RAW RESPONSE:", data);

      // Handle different response structures
      const products = data?.products || data?.data || data;
      // console.log("API PRODUCTS for", categoryName, ":", Array.isArray(products) ? products.length : 0, "products");

      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },
};

export default productApi;