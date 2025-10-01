import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.gulbhahar.com/api';

// Auth API functions
export const authApi = {
  // Get user data by token (only what's needed for OAuth callback)
  getUserByToken: async (token) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/user-by-token`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const data = response.data.user;
      
      // Normalize user data structure
      return {
        email: data.email,
        name: data.name,
        firstName: data.firstName || data.first_name || data.user?.firstName || '',
        lastName: data.lastName || data.last_name || data.user?.lastName || '',
        userId: data.userId || data.id || data.user?.id || '',
        location: data.location || data.user?.location || '',
        phoneNumber: data.phoneNumber || data.phone || data.user?.phoneNumber || '',
        profilePicture: data.profilePicture || data.avatar || data.user?.profilePicture || data?.image || '',
        emailVerified: data.emailVerified !== undefined ? data.emailVerified : true,
        phoneVerified: data.phoneVerified !== undefined ? data.phoneVerified : true,
        ...data.user
      };
    } catch (error) {
      console.error('Error fetching user by token:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  },

  // Social login callback handler
  handleSocialLoginCallback: async (backendToken) => {
    try {
      const userData = await authApi.getUserByToken(backendToken);
      return { success: true, userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default authApi;