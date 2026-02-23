"use client"
import { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FiUser, FiLock, FiEye, FiEyeOff, FiPhone } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '@/providers/ContextProviders/AuthContext';
import { signIn, useSession } from 'next-auth/react';
import signupApi from "../../api/signup/signup";
import Link from 'next/link';

// Carousel component (responsive)
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/login/001.webp",
    "/login/002.webp",
    "/login/003.webp",
    "/login/004.webp"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl">
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute h-full w-full transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide}
              alt={`Carousel slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-red-900/10"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
        <div className="text-white">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">Discover Premium Fashion</h3>
          <p className="text-red-100 text-sm sm:text-base lg:text-lg">Join thousands of fashion enthusiasts</p>
        </div>
      </div>
      
      <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide 
                ? 'w-6 sm:w-8 bg-white shadow-lg' 
                : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const LoginPage = () => {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  
  // State for login method
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'mobile'
  
  // Email login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Mobile login states
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userId, setUserId] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [otpError, setOtpError] = useState('');
  
  // Common states
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false, mobile: false });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginLoading, setSocialLoginLoading] = useState(false);
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, authLoading]);

  // Reset states when switching login methods
  useEffect(() => {
    setGeneralError('');
    setSuccessMessage('');
    setMobileError('');
    setOtpError('');
    setShowOtpField(false);
    setIsOtpSent(false);
    setMobileNumber('');
    setOtp('');
  }, [loginMethod]);

  // Show loading state during OAuth or if already authenticated
  if (authLoading || (status === 'authenticated' && !isAuthenticated) || socialLoginLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-red-900 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-red-900 font-medium text-sm sm:text-base">
            {socialLoginLoading ? 'Completing social login...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-900 mb-3 sm:mb-4">Redirecting...</h2>
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-red-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  // Mobile number validation
  const validateMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      setMobileError('Mobile number is required');
      return false;
    } else if (!mobileRegex.test(mobile)) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return false;
    } else {
      setMobileError('');
      return true;
    }
  };

  // OTP validation
  const validateOtp = (otp) => {
    const otpRegex = /^[0-9]{6}$/;
    if (!otp) {
      setOtpError('OTP is required');
      return false;
    } else if (!otpRegex.test(otp)) {
      setOtpError('Please enter a valid 6-digit OTP');
      return false;
    } else {
      setOtpError('');
      return true;
    }
  };

  // Handle input changes
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setGeneralError('');
    if (touched.email) {
      validateEmail(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setGeneralError('');
    if (touched.password) {
      validatePassword(value);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setMobileNumber(value);
    setGeneralError('');
    if (touched.mobile) {
      validateMobile(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setOtp(value);
    if (value.length === 6) {
      validateOtp(value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      validateEmail(email);
    } else if (field === 'password') {
      validatePassword(password);
    } else if (field === 'mobile') {
      validateMobile(mobileNumber);
    }
  };

  // Send OTP for mobile login using the API
  const handleSendOtp = async () => {
    setIsLoading(true);
    setGeneralError('');
    setOtpError('');
    
    try {
      const isMobileValid = validateMobile(mobileNumber);
      if (!isMobileValid) {
        setIsLoading(false);
        return;
      }

      // console.log('📱 Sending OTP to:', mobileNumber);
      
      const response = await signupApi.sendMobileLoginOtp(mobileNumber);
   
      const data = await response.json();

      
      if (response.ok) {
     
        setShowOtpField(true);
        setIsOtpSent(true);
        setUserId(data.userId || data.user?.id || data.id);
        setSuccessMessage('OTP sent successfully! Please check your phone.');
      } else {
        setGeneralError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('🚨 OTP sending error:', error);
      setGeneralError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP for mobile login using the API
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setGeneralError('');
    
    try {
      const isOtpValid = validateOtp(otp);
      if (!isOtpValid) {
        setIsLoading(false);
        return;
      }


      
      const response = await signupApi.verifyMobileLoginOtp(userId, otp);
      
      
      const data = await response.json();

      
      if (response.ok) {
       
        
        const token = data.token || data.accessToken || data.authToken;
        
        if (!token) {
          setGeneralError('Login successful but no token received. Please try again.');
          return;
        }
        
        const userData = {
          email: data.email || '',
          firstName: data.firstName || data.first_name || data.user?.firstName || '',
          lastName: data.lastName || data.last_name || data.user?.lastName || '',
          userId: data.userId || data.id || data.user?.id || '',
          location: data.location || data.user?.location || '',
          phoneNumber: mobileNumber,
          profilePicture: data.profilePicture || data.avatar || data.user?.profilePicture || '',
          emailVerified: data.emailVerified !== undefined ? data.emailVerified : true,
          phoneVerified: data.phoneVerified !== undefined ? data.phoneVerified : true,
          ...data.user
        };
        
        const loginSuccess = await login(token, userData);
        
        if (loginSuccess) {
          setSuccessMessage('Login successful! Redirecting...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        } else {
          setGeneralError('Failed to save login data. Please try again.');
        }
      } else {
        setGeneralError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('🚨 OTP verification error:', error);
      setGeneralError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Email login handler
  const handleEmailLogin = async () => {
    setIsLoading(true);
    setGeneralError('');
    setSuccessMessage('');
    
    try {
      
      const response = await signupApi.login(email, password);
      
      
      const data = await response.json();
    
      
      if (response.ok) {

        
        const token = data.token || data.accessToken || data.authToken;
        
        if (!token) {
          setGeneralError('Login successful but no token received. Please try again.');
          return;
        }
        
        const userData = {
          email: email,
          firstName: data.firstName || data.first_name || data.user?.firstName || '',
          lastName: data.lastName || data.last_name || data.user?.lastName || '',
          userId: data.userId || data.id || data.user?.id || '',
          location: data.location || data.user?.location || '',
          phoneNumber: data.phoneNumber || data.phone || data.user?.phoneNumber || '',
          profilePicture: data.profilePicture || data.avatar || data.user?.profilePicture || '',
          emailVerified: data.emailVerified !== undefined ? data.emailVerified : true,
          phoneVerified: data.phoneVerified !== undefined ? data.phoneVerified : true,
          ...data.user
        };
        
        const loginSuccess = await login(token, userData);
        
        if (loginSuccess) {
          if (data.emailVerified === false) {
            setSuccessMessage('Please verify your email to continue.');
            setTimeout(() => {
              window.location.href = '/verify-email';
            }, 1500);
          } else if (data.phoneVerified === false) {
            setSuccessMessage('Please verify your phone number to continue.');
            setTimeout(() => {
              window.location.href = '/verify-phone';
            }, 1500);
          } else {
            setSuccessMessage('Login successful! Redirecting to Homepage...');
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }
        } else {
          setGeneralError('Failed to save login data. Please try again.');
        }
      } else {
        if (response.status === 401) {
          setGeneralError('Invalid email or password. Please try again.');
        } else if (response.status === 404) {
          setGeneralError('User not found. Please check your email or sign up.');
        } else if (response.status === 429) {
          setGeneralError('Too many login attempts. Please try again later.');
        } else {
          setGeneralError(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('🚨 Login error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setGeneralError('Network error. Please check your connection and try again.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginMethod === 'email') {
      const isEmailValid = validateEmail(email);
      const isPasswordValid = validatePassword(password);
      
      setTouched({ email: true, password: true });
      
      if (isEmailValid && isPasswordValid) {
        await handleEmailLogin();
      }
    } else {
      if (!isOtpSent) {
        await handleSendOtp();
      } else {
        await handleVerifyOtp();
      }
    }
  };

  // Social login handler
  const handleSocialLogin = async (provider) => {
    // console.log(`🔄 Starting ${provider} OAuth flow...`);
    setGeneralError('');
    setSocialLoginLoading(true);
    
    try {
      await signIn(provider, { 
        callbackUrl: '/auth/callback'
      });
    } catch (error) {
      console.error(`❌ Error starting ${provider} login:`, error);
      setGeneralError(`Failed to start ${provider} login. Please try again.`);
      setSocialLoginLoading(false);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  const handleEditMobile = () => {
    setShowOtpField(false);
    setIsOtpSent(false);
    setOtp('');
    setSuccessMessage('');
    setGeneralError('');
  };

  const isButtonDisabled = isLoading || socialLoginLoading;

  return (
    <div className='w-full mt-12 sm:mt-16 md:mt-20'>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
  <button
    onClick={handleGoHome}
    className="group hidden sm:flex items-center text-red-700 hover:text-red-900 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
  >
    <IoIosArrowBack className="mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform" />
    <span className='font-medium'>Go to home</span>
  </button>
</div>

      <div className="flex w-full items-center justify-center py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-3 sm:px-4 md:px-6">
          
          {/* Login Form - Mobile first (full width), then half on larger screens */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-900 mb-2 sm:mb-3">Welcome Back</h1>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">Sign in to your account to continue</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border-0 sm:border border-red-100 p-3 sm:p-6 md:p-8">
              {/* <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-red-100 p-4 sm:p-6 md:p-8"> */}
                {/* Login Method Toggle */}
                <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-4 sm:mb-6">
                  <button
                    onClick={() => setLoginMethod('email')}
                    className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                      loginMethod === 'email'
                        ? 'bg-red-900 text-white shadow-lg'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Login with Email
                  </button>
                  <button
                    onClick={() => setLoginMethod('mobile')}
                    className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                      loginMethod === 'mobile'
                        ? 'bg-red-900 text-white shadow-lg'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Login with Mobile
                  </button>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  {generalError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base">
                      {generalError}
                    </div>
                  )}
                  
                  {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl flex items-center text-sm sm:text-base">
                      {(isLoading || socialLoginLoading) && (
                        <div className="animate-spin rounded-full h-3 sm:h-4 w-3 sm:w-4 border-b-2 border-green-700 mr-2 sm:mr-3"></div>
                      )}
                      {successMessage}
                    </div>
                  )}
                  
                  {/* Email Login Form */}
                  {loginMethod === 'email' && (
                    <>
                      <div>
                        <label htmlFor="email" className="block text-base sm:text-lg font-semibold text-red-900 mb-2 sm:mb-3">
                          Email Address
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                            <FiUser className={`transition-colors text-sm sm:text-base ${emailError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                          </div>
                          <input
                            type="email"
                            id="email"
                            className={`block w-full rounded-lg sm:rounded-xl border-2 ${
                              emailError 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-red-200 focus:border-red-900'
                            } py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 text-sm sm:text-base`}
                            placeholder="name@email.com"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => handleBlur('email')}
                            disabled={isButtonDisabled}
                          />
                        </div>
                        {touched.email && emailError && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-1 sm:mr-2"></span>
                            {emailError}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-base sm:text-lg font-semibold text-red-900 mb-2 sm:mb-3">
                          Password
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                            <FiLock className={`transition-colors text-sm sm:text-base ${passwordError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={`block w-full rounded-lg sm:rounded-xl border-2 ${
                              passwordError 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-red-200 focus:border-red-900'
                            } py-3 sm:py-4 pl-10 sm:pl-12 pr-10 sm:pr-12 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 text-sm sm:text-base`}
                            placeholder="••••••••"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => handleBlur('password')}
                            disabled={isButtonDisabled}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isButtonDisabled}
                          >
                            {showPassword ? <FiEyeOff className="text-sm sm:text-base" /> : <FiEye className="text-sm sm:text-base" />}
                          </button>
                        </div>
                        {touched.password && passwordError && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-start">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-1 sm:mr-2 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                            {passwordError}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex justify-center">
                        <button 
                          onClick={handleForgotPassword}
                          type="button" 
                          className="text-red-700 hover:text-red-900 font-medium underline decoration-2 underline-offset-2 transition-colors disabled:opacity-50 text-sm sm:text-base"
                          disabled={isButtonDisabled}
                        >
                          Forgot password?
                        </button>
                      </div>
                    </>
                  )}
                  
                  {/* Mobile Login Form */}
                  {loginMethod === 'mobile' && (
                    <>
                      <div>
                        <label htmlFor="mobile" className="block text-base sm:text-lg font-semibold text-red-900 mb-2 sm:mb-3">
                          Mobile Number
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                            <FiPhone className={`transition-colors text-sm sm:text-base ${mobileError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                          </div>
                          <input
                            type="tel"
                            id="mobile"
                            className={`block w-full rounded-lg sm:rounded-xl border-2 ${
                              mobileError 
                                ? 'border-red-500 focus:border-red-600' 
                                : 'border-red-200 focus:border-red-900'
                            } py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 text-sm sm:text-base ${
                              isOtpSent ? 'bg-gray-100 cursor-not-allowed' : ''
                            }`}
                            placeholder="Enter 10-digit mobile number"
                            value={mobileNumber}
                            onChange={handleMobileChange}
                            onBlur={() => handleBlur('mobile')}
                            disabled={isButtonDisabled || isOtpSent}
                            maxLength={10}
                          />
                        </div>
                        {touched.mobile && mobileError && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-1 sm:mr-2"></span>
                            {mobileError}
                          </p>
                        )}
                        {isOtpSent && (
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-700 flex items-center">
                            <button
                              onClick={handleEditMobile}
                              className="text-red-900 hover:text-red-700 underline font-medium"
                            >
                              Edit mobile number
                            </button>
                          </p>
                        )}
                      </div>
                      
                      {showOtpField && (
                        <div>
                          <label htmlFor="otp" className="block text-base sm:text-lg font-semibold text-red-900 mb-2 sm:mb-3">
                            Enter OTP
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
                              <FiLock className={`transition-colors text-sm sm:text-base ${otpError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                            </div>
                            <input
                              type="text"
                              id="otp"
                              className={`block w-full rounded-lg sm:rounded-xl border-2 ${
                                otpError 
                                  ? 'border-red-500 focus:border-red-600' 
                                  : 'border-red-200 focus:border-red-900'
                              } py-3 sm:py-4 pl-10 sm:pl-12 pr-3 sm:pr-4 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 text-sm sm:text-base`}
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={handleOtpChange}
                              disabled={isButtonDisabled}
                              maxLength={6}
                            />
                          </div>
                          {otpError && (
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                              <span className="w-1 h-1 bg-red-600 rounded-full mr-1 sm:mr-2"></span>
                              {otpError}
                            </p>
                          )}
                          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-700">
                            OTP sent to +91 {mobileNumber}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                    className="w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-red-900 to-red-800 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold text-white shadow-lg sm:shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3"></div>
                        {loginMethod === 'email' 
                          ? 'Signing in...' 
                          : isOtpSent ? 'Verifying...' : 'Sending OTP...'
                        }
                      </div>
                    ) : (
                      loginMethod === 'email' 
                        ? 'Sign In' 
                        : isOtpSent ? 'Verify OTP' : 'Send OTP'
                    )}
                  </button>
                </div>
                
                <div className="mt-6 sm:mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-red-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="bg-white px-2 sm:px-4 text-red-600 font-medium">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isButtonDisabled}
                      className="flex w-full items-center justify-center rounded-lg sm:rounded-xl border-2 border-red-200 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {socialLoginLoading ? (
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-900 border-t-transparent rounded-full animate-spin mr-1.5 sm:mr-2"></div>
                      ) : (
                        <FaGoogle className='mr-1.5 sm:mr-3 text-red-600 text-sm sm:text-base'/>
                      )}
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isButtonDisabled}
                      className="flex w-full items-center justify-center rounded-lg sm:rounded-xl border-2 border-red-200 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      {socialLoginLoading ? (
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-900 border-t-transparent rounded-full animate-spin mr-1.5 sm:mr-2"></div>
                      ) : (
                        <FaFacebook className='mr-1.5 sm:mr-3 text-red-600 text-sm sm:text-base'/>
                      )}
                      Facebook
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 text-center">
                  <p className="text-red-700 text-sm sm:text-base">
                    Don't have an account?{' '}
                    <Link
      href="/signup"
      className="font-bold text-red-900 hover:text-red-700 underline decoration-2 underline-offset-2 transition-colors"
    >
      Sign Up
    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel - Hidden on mobile, shown on medium and up */}
          <div className="hidden sm:block w-full lg:w-1/2">
            <div className="h-full">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;