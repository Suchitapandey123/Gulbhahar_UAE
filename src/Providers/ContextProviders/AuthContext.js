"use client"
import { createContext, useContext, useEffect, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Utility functions for token storage
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('authToken') || null;
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
};

const getUserDataFromStorage = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    return null;
  }
};

const getLoginTimestampFromStorage = () => {
  try {
    return localStorage.getItem('loginTimestamp') || null;
  } catch (error) {
    console.error('Error reading login timestamp from localStorage:', error);
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    // Store in localStorage
    localStorage.setItem('authToken', token);
    
    // Store in cookie with 30 days expiration
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

const setUserData = (userData) => {
  try {
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Store essential user info in cookies
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    
    if (userData.email) {
      document.cookie = `userEmail=${userData.email}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    }
    if (userData.firstName || userData.lastName) {
      const userName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
      document.cookie = `userName=${userName}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    }
    if (userData.userId || userData.id) {
      document.cookie = `userId=${userData.userId || userData.id}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    }
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

const setLoginTimestamp = () => {
  try {
    const timestamp = new Date().toISOString();
    localStorage.setItem('loginTimestamp', timestamp);
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `loginTimestamp=${timestamp}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    
    return timestamp;
  } catch (error) {
    console.error('Error storing login timestamp:', error);
    return null;
  }
};

const clearAuthData = () => {
  try {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('loginTimestamp');
    
    // Clear cookies by setting them to expire
    const pastDate = new Date(0).toUTCString();
    document.cookie = `authToken=; expires=${pastDate}; path=/`;
    document.cookie = `userEmail=; expires=${pastDate}; path=/`;
    document.cookie = `userName=; expires=${pastDate}; path=/`;
    document.cookie = `userId=; expires=${pastDate}; path=/`;
    document.cookie = `loginTimestamp=; expires=${pastDate}; path=/`;
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthTokenState] = useState(null);
  const [userData, setUserDataState] = useState(null);
  const [loginTimestamp, setLoginTimestampState] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getTokenFromStorage();
        const user = getUserDataFromStorage();
        const timestamp = getLoginTimestampFromStorage();

        if (token && user) {
          setAuthTokenState(token);
          setUserDataState(user);
          setLoginTimestampState(timestamp);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (token, user) => {
    try {
      // Store in storage
      setAuthToken(token);
      setUserData(user);
      const timestamp = setLoginTimestamp();

      // Update context state
      setAuthTokenState(token);
      setUserDataState(user);
      setLoginTimestampState(timestamp);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    try {
      clearAuthData();
      setAuthTokenState(null);
      setUserDataState(null);
      setLoginTimestampState(null);
      setIsAuthenticated(false);
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user data
  const updateUserData = (newUserData) => {
    try {
      const updatedData = { ...userData, ...newUserData };
      setUserData(updatedData);
      setUserDataState(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Check if token is expired (optional - you can implement based on your token structure)
  const isTokenExpired = () => {
    if (!loginTimestamp) return true;
    
    try {
      const loginDate = new Date(loginTimestamp);
      const currentDate = new Date();
      const daysDifference = (currentDate - loginDate) / (1000 * 60 * 60 * 24);
      
      // Consider token expired after 30 days
      return daysDifference > 30;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  // Auto logout if token is expired
  useEffect(() => {
    if (isAuthenticated && isTokenExpired()) {
      console.log('Token expired, logging out...');
      logout();
    }
  }, [isAuthenticated, loginTimestamp]);

  // Context value
  const value = {
    // State
    authToken,
    userData,
    loginTimestamp,
    isAuthenticated,
    isLoading,
    
    // Functions
    login,
    logout,
    updateUserData,
    isTokenExpired,
    
    // Getters for easy access
    getUserId: () => userData?.userId || userData?.id || null,
    getUserEmail: () => userData?.email || null,
    getUserName: () => {
      if (!userData) return null;
      return `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || null;
    },
    isEmailVerified: () => userData?.emailVerified !== false,
    isPhoneVerified: () => userData?.phoneVerified !== false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};