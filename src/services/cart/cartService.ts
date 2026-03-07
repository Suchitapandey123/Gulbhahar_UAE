import { API_BASE_URL } from "@/utils/envHere";
import axios, { AxiosError } from "axios";
import { PostalCodeValidationResult } from "@/types";

const DELHIVERY_TOKEN = "8225de";

interface DelhiveryPostalCode {
  city: string;
  district: string;
  state_code: string;
  cod: "Y" | "N";
  pre_paid: "Y" | "N";
  pickup: "Y" | "N";
  covid_zone?: string;
  is_oda: "Y" | "N";
}

interface DelhiveryResponse {
  msg?: {
    delivery_codes?: Array<{
      postal_code: DelhiveryPostalCode;
    }>;
  };
}

export const cartService = {
  validatePostalCode: async (
    postalCode: string
  ): Promise<PostalCodeValidationResult> => {
    try {
      const response = await axios.get<DelhiveryResponse>(
        `${API_BASE_URL}/delhiveryRoutes/v0/checkAvalibility?pincode=${postalCode}`,
        {
          timeout: 10000,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${DELHIVERY_TOKEN}`,
          },
        }
      );

      const deliveryCodes = response.data.msg?.delivery_codes;
      if (deliveryCodes && deliveryCodes.length > 0) {
        const deliveryData = deliveryCodes[0].postal_code;
        return {
          isValidating: false,
          isValid: true,
          error: null,
          deliveryInfo: {
            city: deliveryData.city,
            district: deliveryData.district,
            state: deliveryData.state_code,
            cod: deliveryData.cod === "Y",
            prepaid: deliveryData.pre_paid === "Y",
            pickup: deliveryData.pickup === "Y",
            covidZone: deliveryData.covid_zone,
            isODA: deliveryData.is_oda === "Y",
          },
        };
      } else {
        return {
          isValidating: false,
          isValid: false,
          error: "Postal code not serviceable",
          deliveryInfo: null,
        };
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = "Unable to validate postal code";

      if (axiosError.code === "ECONNABORTED") {
        errorMessage = "Validation timeout - please try again";
      } else if (axiosError.response?.status === 401) {
        errorMessage = "Authentication failed - please contact support";
      } else if (axiosError.response?.status === 403) {
        errorMessage = "Access denied - please contact support";
      } else if (axiosError.response?.status === 404) {
        errorMessage = "Postal code not found";
      } else if (axiosError.response?.status === 429) {
        errorMessage = "Too many requests - please wait and try again";
      }

      return {
        isValidating: false,
        isValid: false,
        error: errorMessage,
        deliveryInfo: null,
      };
    }
  },
};
