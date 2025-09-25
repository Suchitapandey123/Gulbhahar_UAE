// profile-api.js
const API_BASE_URL = 'https://api.gulbhahar.com/api';

export const profileAPI = {
  // Get user profile by token
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
  }
};

export default profileAPI;