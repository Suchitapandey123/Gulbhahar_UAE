import { API_BASE_URL } from "@/utils/envHere";



export const orderHistoryAPI = {
  getOrderHistory: async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        throw new Error("No auth token found");
      }
          
      const response = await fetch(`${API_BASE_URL}/orders/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      // console.log("API Response received:", data);
      return data;
      
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
   sendOtpForCancellation: async (data) => {
    try {
     
      
      const response = await fetch(`${API_BASE_URL}/orders/send-otp-for-order-cancellation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          userName: data.userName,
          orderId: data.orderId
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to send OTP');
      }

     
      return responseData;

    } catch (error) {
      console.error(' Error sending OTP:', error);
      throw error;
    }
  },

  verifyOtpForCancellation: async (data) => {
  try {
    // console.log('[API] Verifying OTP for cancellation:', {
    //   ...data,
    //   timestamp: new Date().toISOString()
    // });
    
    const response = await fetch(`${API_BASE_URL}/orders/verify-otp-for-order-cancellation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        user: data.userName, 
        otp: data.otp,
        orderId: data.orderId
      }),
    });

    const responseText = await response.text();
    
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      console.error('[API] Server error response:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      throw new Error(responseData.message || `OTP verification failed (Status: ${response.status})`);
    }

   
    return responseData;

  } catch (error) {
    console.error('[API] Error verifying OTP:', error);
    throw error;
  }
}
};
