// src/app/api/order/orderApi.js

export const orderHistoryAPI = {
  getOrderHistory: async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        throw new Error("No auth token found");
      }

      console.log("📡 Fetching order history from API...");
      
      
      const response = await fetch('https://api.gulbhahar.com/orders/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response received:", data);
      return data;
      
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
