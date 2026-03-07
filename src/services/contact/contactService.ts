import { API_BASE_URL } from "@/utils/envHere";
import axios from "axios";
import { ApiResponse } from "@/types";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export interface ContactData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  [key: string]: unknown;
}

export const contactService = {
  createContactSupport: async (contactData: ContactData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>(
      "/api/contactSupport/createContactSupport",
      contactData
    );
    return response.data;
  },
};

export default contactService;
