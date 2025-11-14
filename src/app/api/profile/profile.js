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

      console.log("🔄 Update API Call:", userData);

      const response = await fetch(`${API_BASE_URL}/users/update-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });

      console.log("📡 Response Status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update profile: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Update Success:", result);
      return result;
      
    } catch (error) {
      console.error('🚨 API Error:', error);
      throw error;
    }
  },
};

export default profileAPI;