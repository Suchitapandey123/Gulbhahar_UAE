"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { UserData, AuthContextValue } from "@/types";

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const getTokenFromStorage = (): string | null => {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
};

const getUserDataFromStorage = (): UserData | null => {
  try {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

const getLoginTimestampFromStorage = (): string | null => {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("loginTimestamp");
  } catch {
    return null;
  }
};

const setAuthToken = (token: string): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem("authToken", token);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
  } catch (error) {
    console.error("Error storing auth token:", error);
  }
};

const setUserData = (userData: UserData): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem("userData", JSON.stringify(userData));
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    const expires = expirationDate.toUTCString();

    if (userData.email) {
      document.cookie = `userEmail=${userData.email}; expires=${expires}; path=/; secure; samesite=strict`;
    }
    if (userData.firstName || userData.lastName) {
      const userName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();
      document.cookie = `userName=${userName}; expires=${expires}; path=/; secure; samesite=strict`;
    }
    if (userData.userId || userData.id) {
      document.cookie = `userId=${userData.userId || userData.id}; expires=${expires}; path=/; secure; samesite=strict`;
    }
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

const setLoginTimestamp = (): string | null => {
  try {
    if (typeof window === "undefined") return null;
    const timestamp = new Date().toISOString();
    localStorage.setItem("loginTimestamp", timestamp);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    document.cookie = `loginTimestamp=${timestamp}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    return timestamp;
  } catch {
    return null;
  }
};

const clearAuthData = (): void => {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("checkoutFormData");

    const pastDate = new Date(0).toUTCString();
    const cookiesToClear = [
      "authToken",
      "userEmail",
      "userName",
      "userId",
      "loginTimestamp",
      "next-auth.session-token",
      "next-auth.csrf-token",
      "next-auth.callback-url",
    ];

    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/; domain=${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${cookieName}=; expires=${pastDate}; path=/`;
    });
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);
  const [userData, setUserDataState] = useState<UserData | null>(null);
  const [loginTimestamp, setLoginTimestampState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const checkTokenExpiration = (timestamp: string | null): boolean => {
    if (!timestamp) return true;
    try {
      const loginDate = new Date(timestamp);
      const daysDifference =
        (Date.now() - loginDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDifference > 30;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (isLoggingOut) {
          setIsLoading(false);
          return;
        }

        const token = getTokenFromStorage();
        const user = getUserDataFromStorage();
        const timestamp = getLoginTimestampFromStorage();

        if (token && user) {
          if (checkTokenExpiration(timestamp)) {
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
        console.error("Error initializing auth state:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (token: string, user: UserData): Promise<boolean> => {
    try {
      setIsLoggingOut(false);
      setAuthToken(token);
      setUserData(user);
      const timestamp = setLoginTimestamp();

      setAuthTokenState(token);
      setUserDataState(user);
      setLoginTimestampState(timestamp);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoggingOut(true);
      setAuthTokenState(null);
      setUserDataState(null);
      setLoginTimestampState(null);
      setIsAuthenticated(false);
      clearAuthData();

      try {
        await signOut({ redirect: false, callbackUrl: "/login" });
      } catch {
        // NextAuth signout errors are non-critical
      }

      setTimeout(() => {
        setIsLoggingOut(false);
        window.location.href = "/login";
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
      window.location.href = "/login";
    }
  };

  const updateUserData = (newUserData: Partial<UserData>): void => {
    try {
      if (isLoggingOut) return;
      const updatedData = { ...userData, ...newUserData } as UserData;
      setUserData(updatedData);
      setUserDataState(updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const isTokenExpired = (): boolean => checkTokenExpiration(loginTimestamp);

  useEffect(() => {
    if (isAuthenticated && !isLoggingOut && isTokenExpired()) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loginTimestamp, isLoggingOut]);

  const value: AuthContextValue = {
    authToken,
    userData,
    loginTimestamp,
    isAuthenticated,
    isLoading,
    isLoggingOut,
    login,
    logout,
    updateUserData,
    isTokenExpired,
    getUserId: () => (userData?.userId as string) || (userData?.id as string) || null,
    getUserEmail: () => (userData?.email as string) || null,
    getUserName: () => {
      if (!userData) return null;
      return `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || null;
    },
    isEmailVerified: () => userData?.emailVerified !== false,
    isPhoneVerified: () => userData?.phoneVerified !== false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
