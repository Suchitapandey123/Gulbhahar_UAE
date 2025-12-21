import { API_BASE_URL } from "@/utils/envHere";

export const analyticsAPI = {

    trackAddToCart: async (productId) => {

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId})
            });
     
             const response  = await res.json()
            if (!response.success) {
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


    trackProceedToCheckout: async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/proceed-to-checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
     
          const response  = await res.json()
            if (!response.success) {
                // console.log(response)
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }

    },



    trackContinueToPayment: async (userData) => {
        console.log(userData)
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/continue-to-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(userData) 
            });
     
          const response  = await res.json()
            if (!response.success) {
                // console.log(response)
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }

    },


    trackPaymentMethod: async (paymentMethod) => {
        console.log(paymentMethod)
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/payment-method`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({paymentMethod}) 
            });
     
          const response  = await res.json()
            if (!response.success) {
                // console.log(response)
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }

    },


    trackOrderConfirmed: async (paymentMethod) => {
        console.log(paymentMethod)
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/order-confirmed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
     
          const response  = await res.json()
            if (!response.success) {
                // console.log(response)
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }

    },

     trackOrderFailed: async (paymentMethod) => {
        // console.log(paymentMethod)
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/analytics/order-failed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
     
          const response  = await res.json()
            if (!response.success) {
                // console.log(response)
                throw new Error(response.message || "Error Found");
            }

            return response
        } catch (error) {
            console.error(error);
            throw error;
        }

    },
 
};


export default analyticsAPI;


