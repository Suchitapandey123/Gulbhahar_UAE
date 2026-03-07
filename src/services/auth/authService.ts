import axios, { AxiosError } from "axios";
import { UserData } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.gulbhahar.com/api";

export const authService = {
  getUserByToken: async (token: string): Promise<UserData> => {
    try {
      const response = await axios.post<{ user: UserData }>(
        `${API_BASE_URL}/users/user-by-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.user;

      return {
        email: data.email,
        name: data.name,
        firstName: (data.firstName as string) || "",
        lastName: (data.lastName as string) || "",
        userId: (data.userId as string) || (data.id as string) || "",
        location: (data.location as string) || "",
        phoneNumber: (data.phoneNumber as string) || "",
        profilePicture: (data.profilePicture as string) || (data.image as string) || "",
        emailVerified: data.emailVerified !== undefined ? Boolean(data.emailVerified) : true,
        phoneVerified: data.phoneVerified !== undefined ? Boolean(data.phoneVerified) : true,
      };
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Error fetching user by token:", error);
      throw new Error(
        axiosError.response?.data?.message || "Failed to fetch user data"
      );
    }
  },

  handleSocialLoginCallback: async (
    backendToken: string
  ): Promise<{ success: boolean; userData?: UserData; error?: string }> => {
    try {
      const userData = await authService.getUserByToken(backendToken);
      return { success: true, userData };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  },
};

export default authService;
