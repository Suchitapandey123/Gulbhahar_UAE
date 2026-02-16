import { API_BASE_URL } from "@/utils/envHere";

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
      const response = await fetch(`${API_BASE_URL}/new-api/products/get-similar-products/${productId}?limit=8`, {
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
      if (!response) {
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


  getProductsByCategory: async (categoryName) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/new-api/products/get-product-by-category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ category: categoryName }),
          next: {
            revalidate: 3600,
            tags: ["products", "collections", "collection-juttis"],
          },
        }
      );


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const products = data?.products || data?.data || data;
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching juttis products:", error);
      return [];
    }
  },
  getProductsByParentCategory: async (parentCategory) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/new-api/products/get-product-by-parentCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ parentCategory: parentCategory }),
          next: {
            revalidate: 3600,
            tags: ["products", "collections", "collection-juttis"],
          },
        }
      );


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const products = data?.products || data?.data || data;
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error("Error fetching juttis products:", error);
      return [];
    }
  }

}

export default productApi;