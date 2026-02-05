"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

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
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken') || null;
  } catch (error) {
    console.error('Error reading token from localStorage:', error);
    return null;
  }
};

const getUserDataFromStorage = () => {
  try {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    return null;
  }
};

const getLoginTimestampFromStorage = () => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('loginTimestamp') || null;
  } catch (error) {
    console.error('Error reading login timestamp from localStorage:', error);
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    if (typeof window === 'undefined') return;
    
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
    if (typeof window === 'undefined') return;
    
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
    if (typeof window === 'undefined') return null;
    
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
    if (typeof window === 'undefined') return;

    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('loginTimestamp');
    
    // Clear any other auth-related items that might exist
    localStorage.removeItem('checkoutFormData'); // Clear checkout data too
    
    // Clear cookies by setting them to expire
    const pastDate = new Date(0).toUTCString();
    const cookiesToClear = [
      'authToken',
      'userEmail', 
      'userName',
      'userId',
      'loginTimestamp',
      'next-auth.session-token', // NextAuth session token
      'next-auth.csrf-token',    // NextAuth CSRF token
      'next-auth.callback-url'   // NextAuth callback URL
    ];
    
    cookiesToClear.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/; domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/`;
    });
    

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
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 🔥 NEW: Prevent auto-login during logout

  // Initialize auth state from storage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // 🔥 IMPORTANT: Don't initialize if we're in the middle of logging out
        if (isLoggingOut) {
         
          setIsLoading(false);
          return;
        }

        
        const token = getTokenFromStorage();
        const user = getUserDataFromStorage();
        const timestamp = getLoginTimestampFromStorage();
        if (token && user) {
          // Check if token is expired before setting authenticated
          const isExpired = checkTokenExpiration(timestamp);
          
          if (isExpired) {
            
            clearAuthData();
            setIsAuthenticated(false);
          } else {
           
            setAuthTokenState(token);
            setUserDataState(user);
            setLoginTimestampState(timestamp);
            setIsAuthenticated(true);
          }
        } else {
         
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('🚨 Error initializing auth state:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Only initialize once when component mounts
    initializeAuth();
  }, []); // 🔥 IMPORTANT: Empty dependency array, only run once

  // Helper function to check token expiration
  const checkTokenExpiration = (timestamp) => {
    if (!timestamp) return true;
    
    try {
      const loginDate = new Date(timestamp);
      const currentDate = new Date();
      const daysDifference = (currentDate - loginDate) / (1000 * 60 * 60 * 24);
      
      // Consider token expired after 30 days
      return daysDifference > 30;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  };

  // Login function
  const login = async (token, user) => {
    try {
      
      // Clear any existing logout state
      setIsLoggingOut(false);
      
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
      console.error('🚨 Error during login:', error);
      return false;
    }
  };

  // 🔥 IMPROVED LOGOUT FUNCTION
  const logout = async () => {
    try {

      
      // Set logout state to prevent re-initialization
      setIsLoggingOut(true);
      
      // Clear context state first
      setAuthTokenState(null);
      setUserDataState(null);
      setLoginTimestampState(null);
      setIsAuthenticated(false);
      
      // Clear storage and cookies
      clearAuthData();
      
      // 🔥 IMPORTANT: Also sign out of NextAuth to prevent conflicts
      try {
        await signOut({ 
          redirect: false, // Don't auto-redirect
          callbackUrl: '/login' 
        });

      } catch (nextAuthError) {
     
      }
      
     
      
      // Small delay to ensure all cleanup is done
      setTimeout(() => {
        setIsLoggingOut(false);
        window.location.href = '/login';
      }, 100);
      
    } catch (error) {
      console.error('🚨 Error during logout:', error);
      setIsLoggingOut(false);
      // Force redirect even if there's an error
      window.location.href = '/login';
    }
  };

  // Update user data
  const updateUserData = (newUserData) => {
    try {
      if (isLoggingOut) return; // Don't update if logging out
      
      const updatedData = { ...userData, ...newUserData };
      setUserData(updatedData);
      setUserDataState(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Check if token is expired
  const isTokenExpired = () => {
    return checkTokenExpiration(loginTimestamp);
  };

  // 🔥 IMPROVED: Auto logout if token is expired (but not during logout process)
  useEffect(() => {
    if (isAuthenticated && !isLoggingOut && isTokenExpired()) {
     
      logout();
    }
  }, [isAuthenticated, loginTimestamp, isLoggingOut]);

  // Context value
  const value = {
    // State
    authToken,
    userData,
    loginTimestamp,
    isAuthenticated,
    isLoading,
    isLoggingOut, // 🔥 NEW: Expose logout state
    
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