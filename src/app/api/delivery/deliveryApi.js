import axios from "axios";

export const checkDeliveryAPI = async (pincodeValue) => {
  const response = await axios.get(
    `https://api.gulbhahar.com/delhiveryRoutes/v0/checkAvalibility`,
    {
      params: { pincode: pincodeValue },
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "www.gulbhahar.com",
      },
    }
  );
  return response.data;
};
