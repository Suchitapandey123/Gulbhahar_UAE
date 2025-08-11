"use client"
import { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { useAuth } from '../../../Providers/ContextProviders/AuthContext'; // Import the auth context

// Carousel component (unchanged)
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
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl shadow-2xl">
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
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2">Discover Premium Fashion</h3>
          <p className="text-red-100 text-lg">Join thousands of fashion enthusiasts</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide 
                ? 'w-8 bg-white shadow-lg' 
                : 'w-2 bg-white/50 hover:bg-white/70'
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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated, authLoading]);

  // Don't render login form if user is already authenticated
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Redirecting...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900 mx-auto"></div>
        </div>
      </div>
    );
  }

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

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      validateEmail(email);
    } else {
      validatePassword(password);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setGeneralError('');
    setSuccessMessage('');
    
    try {
      console.log('🔄 Attempting login with:', { email, password: '***' });
      
      const response = await fetch('https://api.gulbhahar.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 Full API Response:', data);
      
      if (response.ok) {
        console.log('✅ Login successful:', data);
        
        // Extract token
        const token = data.token || data.accessToken || data.authToken;
        
        if (!token) {
          setGeneralError('Login successful but no token received. Please try again.');
          return;
        }
        
        // Prepare user data object
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
          ...data.user // Include any additional user data from response
        };
        
        // Use context login function
        const loginSuccess = await login(token, userData);
        
        if (loginSuccess) {
          // Check verification status and redirect accordingly
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
            }, 1500);
          }
        } else {
          setGeneralError('Failed to save login data. Please try again.');
        }
      } else {
        console.log('❌ Login failed. Status:', response.status);
        console.log('❌ Error response:', data);
        
        // Handle different error statuses
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
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    setTouched({ email: true, password: true });
    
    if (isEmailValid && isPasswordValid) {
      await handleLogin();
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    setGeneralError(`${provider} login is not implemented yet.`);
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

  return (
    <div className='w-full min-h-screen mt-6'>
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-red-100 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="max-w-[1600px] mx-auto flex justify-center items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-900 to-rose-700 bg-clip-text text-transparent">
              LOGO
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 pt-6">
        <button 
          onClick={handleGoHome}
          className="group flex items-center text-red-700 hover:text-red-900 transition-all duration-200 transform hover:scale-105"
        >
          <IoIosArrowBack className="mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className='font-medium'>Go to home</span>
        </button>
      </div>

      <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center py-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse md:flex-row gap-12 px-6">
          
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-red-900 mb-3">Welcome Back</h1>
                <p className="text-lg text-red-700">Sign in to your account to continue</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-8">
                <div className="space-y-6">
                  {generalError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                      {generalError}
                    </div>
                  )}
                  
                  {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center">
                      {isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700 mr-3"></div>
                      )}
                      {successMessage}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-red-900 mb-3">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <FiUser className={`transition-colors ${emailError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        className={`block w-full rounded-xl border-2 ${
                          emailError 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-red-200 focus:border-red-900'
                        } py-4 pl-12 pr-4 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30`}
                        placeholder="name@email.com"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => handleBlur('email')}
                        disabled={isLoading}
                      />
                    </div>
                    {touched.email && emailError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {emailError}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-lg font-semibold text-red-900 mb-3">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <FiLock className={`transition-colors ${passwordError ? 'text-red-500' : 'text-red-600 group-focus-within:text-red-900'}`} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`block w-full rounded-xl border-2 ${
                          passwordError 
                            ? 'border-red-500 focus:border-red-600' 
                            : 'border-red-200 focus:border-red-900'
                        } py-4 pl-12 pr-12 text-gray-800 placeholder-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30`}
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() => handleBlur('password')}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-red-600 hover:text-red-900 transition-colors disabled:opacity-50"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    {touched.password && passwordError && (
                      <p className="mt-2 text-sm text-red-600 flex items-start">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {passwordError}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={handleForgotPassword}
                      type="button" 
                      className="text-red-700 hover:text-red-900 font-medium underline decoration-2 underline-offset-2 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Forgot password?
                    </button>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full rounded-xl bg-gradient-to-r from-red-900 to-red-800 py-4 text-lg font-bold text-white shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
                
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-red-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-red-600 font-medium">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Google')}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center rounded-xl border-2 border-red-200 bg-white py-3 px-4 text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      <FaGoogle className='mr-3 text-red-600'/>
                      Google
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Facebook')}
                      disabled={isLoading}
                      className="flex w-full items-center justify-center rounded-xl border-2 border-red-200 bg-white py-3 px-4 text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                    >
                      <FaFacebook className='mr-3 text-red-600'/>
                      Facebook
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-red-700">
                    Don't have an account?{' '}
                    <button 
                      onClick={handleSignUp}
                      type="button"
                      className="font-bold text-red-900 hover:text-red-700 underline decoration-2 underline-offset-2 transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2">
            <div className="h-full min-h-[600px]">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;