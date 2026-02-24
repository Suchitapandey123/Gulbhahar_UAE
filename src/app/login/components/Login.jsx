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
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "forward" ? -500 : 500,
    opacity: 0,
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
    <div className="relative w-full h-full overflow-hidden md:rounded-l-2xl">
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7f1d1d] mx-auto mb-4"></div>
          <p className="text-[#7f1d1d] font-medium">
            {socialLoginLoading ? 'Completing social login...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-red-50">
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
        setSuccessMessage('OTP sent successfully! Please check your WhatsApp.');
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
      className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center p-0 sm:p-4 md:p-6"
      animate={{ backgroundColor: isMounted && typeof window !== 'undefined' && window.innerWidth >= 1024 ? bgColor : '#ffffff' }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
     
        <div className="flex w-full max-w-[1200px] 
rounded-none md:rounded-2xl 
bg-white 
md:h-[85vh] 
max-h-[700px] 
overflow-hidden 
shadow-none md:shadow-xl">
        {/* Left side image slider - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2">
          <MotionImageSlider onColorChange={setBgColor} />
        </div>
        
        {/* Right side form - Full width on mobile */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Form Section */}
          <div className="flex-1 relative flex flex-col justify-center">
            <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
              {/* HEADER - Made sticky for mobile */}
              <div className="sticky top-0 z-10 bg-white pt-4 pb-3 -mx-5 px-5 sm:static sm:bg-transparent sm:mx-0 sm:px-0">
                <div className="flex items-center justify-center mb-4 relative">
                  <button
                    onClick={() => { window.location.href = '/'; }}
                    className="absolute left-0 text-[#7f1d1d] hover:text-red-800 transition-all duration-300 cursor-pointer p-2 rounded-full hover:bg-red-50"
                  >
                    <FaArrowLeft size={22} />
                  </button>
                  <h2 className="text-2xl sm:text-3xl text-center font-bold text-[#7f1d1d] bg-gradient-to-r from-[#7f1d1d] to-red-700 bg-clip-text text-transparent">
                    Welcome back
                  </h2>
                </div>
                <p className="text-gray-600 text-sm sm:text-base text-center mb-5">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => { window.location.href = '/signup'; }}
                    className="text-[#7f1d1d] hover:text-red-800 font-semibold ml-1 cursor-pointer transition-all duration-300 hover:underline underline-offset-2"
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Error / Success messages */}
              {generalError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4 text-center shadow-sm"
                >
                  {generalError}
                </motion.div>
              )}
              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-4 text-center shadow-sm"
                >
                  {successMessage}
                </motion.div>
              )}

              {/* Toggle buttons */}
              <div className="flex flex-row gap-3 justify-center mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setDirection("backward");
                    switchToMobile();
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base font-medium ${
                    loginMethod === "mobile" 
                      ? "bg-gradient-to-r from-[#7f1d1d] to-red-800 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  Login with Mobile
                </button>
                <button
                  type="button"
                  onClick={switchToEmail}
                  className={`flex-1 py-3 px-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer text-sm sm:text-base font-medium ${
                    loginMethod === "email" 
                      ? "bg-gradient-to-r from-[#7f1d1d] to-red-800 text-white shadow-lg" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  Login with Email
                </button>
              </div>

              {/* Animated form area - height adapts to content */}
              <div
                className="relative overflow-hidden w-full transition-[height] duration-300 ease-in-out"
                style={{
                  height: loginMethod === 'mobile' && showMobileInput && !showOtpInput
                    ? '140px'
                    : '264px'
                }}
              >
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
                        className="w-full bg-white shadow-sm p-4 rounded-xl outline-none mb-4 cursor-text text-base border border-gray-200 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 transition-all duration-300"
                        disabled={isLoading}
                      />
                      <div className="relative mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-white shadow-sm p-4 rounded-xl outline-none cursor-text text-base border border-gray-200 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 transition-all duration-300 pr-12"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-[#7f1d1d] transition-colors cursor-pointer"
                        >
                          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                      </div>
                      <div className="flex justify-center items-center text-sm mb-4">
                        <button
                          type="button"
                          onClick={() => { window.location.href = '/forgot-password'; }}
                          className="text-[#7f1d1d] hover:text-red-800 cursor-pointer font-medium transition-all duration-300 hover:underline underline-offset-2"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#7f1d1d] to-red-800 text-white py-4 rounded-xl shadow-lg mb-2 disabled:opacity-50 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing in...
                          </span>
                        ) : 'Log in'}
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
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mobile Number"
                        className="w-full bg-white shadow-sm p-4 rounded-xl outline-none mb-4 cursor-text text-base border border-gray-200 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 transition-all duration-300"
                        maxLength={10}
                        disabled={isLoading || showOtpInput}
                      />
                      
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
                            className="w-full bg-white shadow-sm p-4 rounded-xl outline-none mb-4 cursor-text text-base border border-gray-200 focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 transition-all duration-300 text-center tracking-widest"
                          />
                          
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={isLoading || otp.length !== 6}
                            className="w-full bg-gradient-to-r from-[#7f1d1d] to-red-800 text-white py-4 rounded-xl shadow-lg disabled:opacity-50 mb-2 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold"
                          >
                            {isLoading ? (
                              <span className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Verifying...
                              </span>
                            ) : 'Verify OTP'}
                          </button>
                          
                          <div className="text-center mb-2">
                            {canResend ? (
                              <button 
                                onClick={resendOtp} 
                                className="text-[#7f1d1d] hover:text-red-800 cursor-pointer text-sm font-medium transition-all duration-300 hover:underline underline-offset-2"
                              >
                                Resend OTP
                              </button>
                            ) : (
                              <p className="text-gray-500 text-sm">Resend OTP in <span className="font-semibold">{otpTimer}s</span></p>
                            )}
                          </div>
                        </>
                      )}
                      
                      {!showOtpInput && (
                        <button
                          type="button"
                          onClick={sendOtp}
                          disabled={isLoading || mobileNumber.length !== 10}
                          className="w-full bg-gradient-to-r from-[#7f1d1d] to-red-800 text-white py-4 rounded-xl shadow-lg disabled:opacity-50 mb-2 cursor-pointer hover:shadow-xl active:scale-[0.98] transition-all duration-300 text-base font-semibold"
                        >
                          {isLoading ? (
                            <span className="flex items-center justify-center">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Sending...
                            </span>
                          ) : 'Send OTP'}
                        </button>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Social buttons section - REDUCED GAP */}
          <div className="p-5 sm:p-6 md:p-8 lg:p-10 pt-0">
            <div className="flex items-center my-2 sm:my-3 gap-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500 text-xs sm:text-sm font-medium">Or continue with</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={socialLoginLoading}
                className="flex items-center justify-center gap-2 p-3.5 sm:p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 cursor-pointer hover:shadow-md active:scale-[0.98] text-sm sm:text-base font-medium"
              >
                {socialLoginLoading ? (
                  <div className="w-5 h-5 border-2 border-[#7f1d1d] border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <FcGoogle size={22} className="sm:w-5 sm:h-5" />
                )}
                <span className="text-gray-700">Google</span>
              </button>
              
              <button
                type="button"
                onClick={handleFacebookLogin}
                disabled={socialLoginLoading}
                className="flex items-center justify-center gap-2 p-3.5 sm:p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 cursor-pointer hover:shadow-md active:scale-[0.98] text-sm sm:text-base font-medium"
              >
                {socialLoginLoading ? (
                  <div className="w-5 h-5 border-2 border-[#7f1d1d] border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <FaFacebookF size={20} className="text-blue-600 sm:w-5 sm:h-5" />
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