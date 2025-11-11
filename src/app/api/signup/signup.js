const BASE_URL = 'https://api.gulbhahar.com';

export const signupApi = {
  // User registration
  signUp: async (userData) => {
    const response = await fetch(`${BASE_URL}/api/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response;
  },

  // Email verification
  verifyEmail: async (email, verificationCode) => {
    const response = await fetch(`${BASE_URL}/api/users/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        verificationCode
      }),
    });
    return response;
  },

  // Resend verification code
  resendVerificationCode: async (email) => {
    const response = await fetch(`${BASE_URL}/api/users/resend-verification-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });
    return response;
  },

  // Phone OTP initiation
  initiatePhoneOTP: async (phoneNumber) => {
    const response = await fetch(`${BASE_URL}/codRoutes/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber
      }),
    });
    return response;
  },

  // Phone OTP verification
  verifyPhoneOTP: async (sessionId, otp) => {
    const response = await fetch(`${BASE_URL}/codRoutes/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        otp
      }),
    });
    return response;
  },

  // User login
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    return response;
  },
   
  // Image upload (presigned URL usage)
  uploadImage: async (uploadUrl, imageFile) => {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: imageFile,
      headers: {
        'Content-Type': imageFile.type,
      },
    });
    return response;
  },

  // Mobile Login - Send OTP (FIXED: using phoneNumber instead of phone)
  sendMobileLoginOtp: async (phoneNumber) => {
    const response = await fetch(`${BASE_URL}/loginwithphone/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber  // Changed from 'phone' to 'phoneNumber'
      }),
    });
    return response;
  },

  // Mobile Login - Verify OTP
  verifyMobileLoginOtp: async (userId, otp) => {
    const response = await fetch(`${BASE_URL}/loginwithphone/verify-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        otp: otp
      }),
    });
    return response;
  },

  // Mobile Login - Resend OTP
  resendMobileLoginOtp: async (userId) => {
    const response = await fetch(`${BASE_URL}/loginwithphone/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId
      }),
    });
    return response;
  },

  // Get user by token
  getUserByToken: async (token) => {
    const response = await fetch(`${BASE_URL}/loginwithphone/user-by-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
};

export default signupApi;