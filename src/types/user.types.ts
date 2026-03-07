export interface UserData {
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  id?: string;
  location?: string;
  phoneNumber?: string;
  profilePicture?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  image?: string;
  [key: string]: unknown;
}

export interface AuthState {
  authToken: string | null;
  userData: UserData | null;
  loginTimestamp: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (token: string, user: UserData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserData: (newUserData: Partial<UserData>) => void;
  isTokenExpired: () => boolean;
  getUserId: () => string | null;
  getUserEmail: () => string | null;
  getUserName: () => string | null;
  isEmailVerified: () => boolean;
  isPhoneVerified: () => boolean;
}
