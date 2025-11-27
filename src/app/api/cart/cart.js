import { API_BASE_URL } from '@/utils/envHere';
import axios from 'axios';

const DELHIVERY_TOKEN = "8225de";

export const checkoutApi = {
  validatePostalCode: async (postalCode) => {
    try {
      const response = await axios.get(
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

      if (
        response.data.msg &&
        response.data.msg.delivery_codes &&
        response.data.msg.delivery_codes.length > 0
      ) {
        const deliveryData = response.data.msg.delivery_codes[0].postal_code;

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
      let errorMessage = "Unable to validate postal code";
      if (error.code === "ECONNABORTED") {
        errorMessage = "Validation timeout - please try again";
      } else if (error.response?.status === 401) {
        errorMessage = "Authentication failed - please contact support";
      } else if (error.response?.status === 403) {
        errorMessage = "Access denied - please contact support";
      } else if (error.response?.status === 404) {
        errorMessage = "Postal code not found";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests - please wait and try again";
      }

      return {
        isValidating: false,
        isValid: false,
        error: errorMessage,
        deliveryInfo: null,
      };
    }
  }
};