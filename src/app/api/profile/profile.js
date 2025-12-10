const API_BASE_URL = 'https://api.gulbhahar.com/api';


export const profileAPI = {
 
  getUserProfile: async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await fetch(`${API_BASE_URL}/users/user-by-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },
  
  
  updateUserProfile: async (userData) => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        throw new Error("No auth token found");
      }

      

      const response = await fetch(`${API_BASE_URL}/users/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update profile: ${response.status}`);
      }

      const result = await response.json();
      
      return result;
      
    } catch (error) {
      
      throw error;
    }
  },

 getUserAddresses: async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const response = await fetch(
      `${API_BASE_URL}/get-address/get-user-saved-address`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch addresses: ${response.status}`);
    }

    return await response.json(); 
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { success: false, data: [] };
  }
},
  
   
 getShippingAddressByOrderId: async (orderId) => {
  try {
    if (!orderId) {
      return {
        success: false,
        error: 'Order ID is required',
        shippingAddress: null
      };
    }
    
    const response = await fetch(
      `${API_BASE_URL}/get-address/get-user-address-by-orderid?orderId=${orderId}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `API Error: ${response.status}`,
        shippingAddress: null
      };
    }
    
    const data = await response.json();
    
    return {
      success: true,
      shippingAddress: data.shippingAddress || data.address || data,
      ...data
    };

    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      shippingAddress: null
    };
  }
}

};




export default profileAPI;