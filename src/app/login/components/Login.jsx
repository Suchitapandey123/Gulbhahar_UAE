"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaArrowLeft } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '@/providers/ContextProviders/AuthContext';
import { signIn, useSession } from 'next-auth/react';
import signupApi from "../../api/signup/signup";

const images = [
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
  "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
];

const bgColors = [
  "#665937",
  "#785025",
  "#e4c3a6",
];

const innerFormVariants = {
  enter: (direction) => ({
    x: direction === "forward" ? 500 : -500,
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "forward" ? 500 : -500,
    opacity: 1,
  }),
};

function MotionImageSlider({ onColorChange }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    onColorChange(bgColors[index]);
  }, [index, onColorChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-l-2xl">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ backgroundImage: `url(${images[index]})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}
        />
      </AnimatePresence>

      <div className="absolute bottom-8 left-8 flex gap-2 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

const LoginPage = () => {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  // UI state
  const [loginMethod, setLoginMethod] = useState("email");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [isMounted, setIsMounted] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoginLoading, setSocialLoginLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, authLoading]);

  // Show loading state during OAuth or if already authenticated
  if (authLoading || (status === 'authenticated' && !isAuthenticated) || socialLoginLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7f1d1d] mx-auto mb-4"></div>
          <p className="text-[#7f1d1d] font-medium">
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
          <h2 className="text-2xl font-bold text-[#7f1d1d] mb-4">Redirecting...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7f1d1d] mx-auto"></div>
        </div>
      </div>
    );
  }

  // Email login handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setGeneralError('Please fill in all fields');
      return;
    }
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
            setTimeout(() => { window.location.href = '/verify-email'; }, 1500);
          } else if (data.phoneVerified === false) {
            setSuccessMessage('Please verify your phone number to continue.');
            setTimeout(() => { window.location.href = '/verify-phone'; }, 1500);
          } else {
            setSuccessMessage('Login successful! Redirecting to Homepage...');
            setTimeout(() => { window.location.href = '/'; }, 500);
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
      console.error('Login error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setGeneralError('Network error. Please check your connection and try again.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP
  const sendOtp = async () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNumber) {
      setGeneralError('Mobile number is required');
      return;
    }
    if (!mobileRegex.test(mobileNumber)) {
      setGeneralError('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    setGeneralError('');

    try {
      const response = await signupApi.sendMobileLoginOtp(mobileNumber);
      const data = await response.json();

      if (response.ok) {
        setShowOtpInput(true);
        setUserId(data.userId || data.user?.id || data.id);
        setSuccessMessage('OTP sent successfully! Please check your phone.');
        setOtpTimer(30);
        setCanResend(false);
        const timer = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setGeneralError(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP sending error:', error);
      setGeneralError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      setGeneralError('Please enter complete 6-digit OTP');
      return;
    }
    setIsLoading(true);
    setGeneralError('');

    try {
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
          setTimeout(() => { window.location.href = '/'; }, 1000);
        } else {
          setGeneralError('Failed to save login data. Please try again.');
        }
      } else {
        setGeneralError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setGeneralError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ SIMPLE GOOGLE LOGIN - FIXED
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    setSocialLoginLoading(true);
    
    // Direct signIn call - SIMPLEST VERSION
    signIn("google", { callbackUrl: "/" })
      .catch(error => {
        console.error("Google login error:", error);
        setGeneralError("Google login failed. Please try again.");
        setSocialLoginLoading(false);
      });
  };

  // ✅ SIMPLE FACEBOOK LOGIN - FIXED
  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    setSocialLoginLoading(true);
    
    // Direct signIn call - SIMPLEST VERSION
    signIn("facebook", { callbackUrl: "/" })
      .catch(error => {
        console.error("Facebook login error:", error);
        setGeneralError("Facebook login failed. Please try again.");
        setSocialLoginLoading(false);
      });
  };

  const resendOtp = () => {
    setOtp('');
    sendOtp();
  };

  const switchToMobile = () => {
    setLoginMethod("mobile");
    setShowMobileInput(true);
    setGeneralError('');
    setSuccessMessage('');
  };

  const switchToEmail = () => {
    setDirection("forward");
    setLoginMethod("email");
    setShowMobileInput(false);
    setShowOtpInput(false);
    setGeneralError('');
    setSuccessMessage('');
    setOtp('');
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6"
      animate={{ backgroundColor: isMounted && typeof window !== 'undefined' && window.innerWidth >= 1024 ? bgColor : '#ffffff' }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="flex w-full max-w-[1570px] rounded-2xl bg-white md:h-full overflow-hidden shadow-lg md:shadow-xl">
        {/* Left side image slider - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2">
          <MotionImageSlider onColorChange={setBgColor} />
        </div>
        
        {/* Right side form - Full width on mobile */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Form Section */}
          <div className="flex-1 relative min-h-[500px] md:min-h-auto">
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center justify-center mb-4 sm:mb-6 relative">
                <button
                  onClick={() => { window.location.href = '/'; }}
                  className="absolute left-0 text-[#7f1d1d] hover:text-red-800 transition-colors cursor-pointer"
                >
                  <FaArrowLeft size={20} />
                </button>
                <h2 className="text-2xl sm:text-3xl text-center font-bold text-[#7f1d1d]">Welcome back</h2>
              </div>
              <p className="text-gray-500 text-sm sm:text-base text-center mb-4 sm:mb-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => { window.location.href = '/signup'; }}
                  className="text-[#7f1d1d] hover:underline ml-1 cursor-pointer font-medium"
                >
                  Sign up
                </button>
              </p>

              {/* Error / Success messages */}
              {generalError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm mb-4 text-center">
                  {generalError}
                </div>
              )}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm mb-4 text-center">
                  {successMessage}
                </div>
              )}

              {/* Toggle buttons - Stack on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setDirection("backward");
                    switchToMobile();
                  }}
                  className={`py-3 px-4 sm:px-6 rounded-lg shadow-md transition cursor-pointer text-sm sm:text-base ${
                    loginMethod === "mobile" ? "bg-[#7f1d1d] text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Login with Mobile
                </button>
                <button
                  type="button"
                  onClick={switchToEmail}
                  className={`py-3 px-4 sm:px-6 rounded-lg shadow-md transition cursor-pointer text-sm sm:text-base ${
                    loginMethod === "email" ? "bg-[#7f1d1d] text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Login with Email
                </button>
              </div>

              {/* Animated form area */}
              <div className="h-56 sm:h-64 flex flex-col justify-start mb-4 relative overflow-hidden w-full">
                <AnimatePresence initial={false}>
                  {loginMethod === "email" ? (
                    <motion.form
                      key="email-login"
                      variants={innerFormVariants}
                      custom={direction}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute w-full left-0 right-0"
                      onSubmit={handleEmailLogin}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full bg-white shadow-md p-3 sm:p-4 rounded-lg outline-none mb-4 cursor-text text-sm sm:text-base"
                        disabled={isLoading}
                      />
                      <div className="relative mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-white shadow-md p-3 sm:p-4 pr-10 rounded-lg outline-none cursor-text text-sm sm:text-base"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#7f1d1d] transition-colors cursor-pointer"
                        >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                      <div className="flex justify-center items-center text-xs sm:text-sm mb-4">
                        <button
                          type="button"
                          onClick={() => { window.location.href = '/forgot-password'; }}
                          className="text-[#7f1d1d] hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#7f1d1d] text-white py-3 sm:py-3.5 rounded-lg shadow-lg mb-4 disabled:opacity-50 cursor-pointer hover:bg-[#8b2525] transition-colors text-sm sm:text-base"
                      >
                        {isLoading ? 'Signing in...' : 'Log in'}
                      </button>
                    </motion.form>
                  ) : loginMethod === "mobile" && showMobileInput ? (
                    <motion.div
                      key="mobile-input"
                      variants={innerFormVariants}
                      custom={direction}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute w-full left-0 right-0"
                    >
                      {/* Mobile number input - ALWAYS visible */}
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mobile Number"
                        className="w-full bg-white shadow-md p-3 sm:p-4 rounded-lg outline-none mb-4 cursor-text text-sm sm:text-base"
                        maxLength={10}
                        disabled={isLoading || showOtpInput}
                      />
                      
                      {/* OTP input - ONLY visible after OTP is sent */}
                      {showOtpInput && (
                        <>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setOtp(value);
                            }}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            disabled={isLoading}
                            className="w-full bg-white shadow-md p-3 sm:p-4 rounded-lg outline-none mb-4 cursor-text text-sm sm:text-base"
                          />
                          
                          {/* VERIFY OTP BUTTON */}
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={isLoading || otp.length !== 6}
                            className="w-full bg-[#7f1d1d] text-white py-3 sm:py-3.5 rounded-lg shadow-lg disabled:opacity-50 mb-4 cursor-pointer hover:bg-[#8b2525] transition-colors text-sm sm:text-base"
                          >
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                          </button>
                          
                          {/* Resend OTP section */}
                          <div className="text-center mb-2">
                            {canResend ? (
                              <button 
                                onClick={resendOtp} 
                                className="text-[#7f1d1d] hover:underline cursor-pointer text-xs sm:text-sm"
                              >
                                Resend OTP
                              </button>
                            ) : (
                              <p className="text-gray-500 text-xs sm:text-sm">Resend OTP in {otpTimer}s</p>
                            )}
                          </div>
                        </>
                      )}
                      
                      {/* SEND OTP BUTTON - Only show when OTP input is NOT visible */}
                      {!showOtpInput && (
                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={isLoading || mobileNumber.length !== 10}
                          className="w-full bg-[#7f1d1d] text-white py-3 sm:py-3.5 rounded-lg shadow-lg disabled:opacity-50 mb-4 cursor-pointer hover:bg-[#8b2525] transition-colors text-sm sm:text-base"
                        >
                          {isLoading ? 'Sending...' : 'Send OTP'}
                        </button>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Social buttons section */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-10 pt-0 relative z-50">
            <div className="flex items-center my-4 sm:my-6 gap-3 sm:gap-4">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-xs sm:text-sm">Or continue with</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-50">
              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={socialLoginLoading}
                className="flex items-center justify-center gap-2 p-2.5 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer relative z-50 text-sm sm:text-base"
                style={{ pointerEvents: 'auto' }}
              >
                {socialLoginLoading ? (
                  <div className="w-4 h-4 border-2 border-[#7f1d1d] border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <FcGoogle size={18} className="sm:w-5 sm:h-5" />
                )}
                <span className="text-gray-700">Google</span>
              </button>
              
              {/* Facebook button */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={socialLoginLoading}
                className="flex items-center justify-center gap-2 p-2.5 sm:p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer relative z-50 text-sm sm:text-base"
                style={{ pointerEvents: 'auto' }}
              >
                {socialLoginLoading ? (
                  <div className="w-4 h-4 border-2 border-[#7f1d1d] border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <FaFacebookF size={16} className="text-blue-600 sm:w-5 sm:h-5" />
                )}
                <span className="text-gray-700">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;