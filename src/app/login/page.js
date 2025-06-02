"use client"
import { useEffect, useState, useRef } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail, FiPhone, FiCheck } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';

// Carousel component
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/api/placeholder/600/800",
    "/api/placeholder/600/800", 
    "/api/placeholder/600/800",
    "/api/placeholder/600/800",
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
              className="h-full scale-125 w-full object-cover"
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
  // States for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  
  // States for verification flow
  const [currentStep, setCurrentStep] = useState('login'); // 'login', 'email-verify', 'phone-verify'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [phoneVerificationLoading, setPhoneVerificationLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [emailVerificationCode, setEmailVerificationCode] = useState(['', '', '', '']);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState(['', '', '', '']);
  
  const emailInputRefs = useRef([]);
  const phoneInputRefs = useRef([]);

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
    if (touched.email) {
      validateEmail(value);
    }
    // Clear general errors when user types
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      validatePassword(value);
    }
    // Clear general errors when user types
    if (error) setError('');
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      validateEmail(email);
    } else {
      validatePassword(password);
    }
  };

  const handleVerificationCodeChange = (index, value, type) => {
    const setState = type === 'email' ? setEmailVerificationCode : setPhoneVerificationCode;
    const refs = type === 'email' ? emailInputRefs : phoneInputRefs;
    
    setState(prev => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    if (value && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  // API call for login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    setTouched({ email: true, password: true });
    
    if (!isEmailValid || !isPasswordValid) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://194.238.23.44:9080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Login successful:', data);
        setUserInfo(data.user || data);
        
        // Check verification status
        if (data.emailVerified === false || data.user?.emailVerified === false) {
          setSuccess('Login successful! Please verify your email to continue.');
          setTimeout(() => {
            setCurrentStep('email-verify');
            setSuccess('');
          }, 1500);
        } else if (data.phoneVerified === false || data.user?.phoneVerified === false) {
          setSuccess('Login successful! Please verify your phone number to continue.');
          setTimeout(() => {
            setCurrentStep('phone-verify');
            setSuccess('');
          }, 1500);
        } else {
          // User is fully verified, redirect to dashboard
          setSuccess('Login successful! Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // API call to verify email
  const handleEmailVerification = async () => {
    setEmailVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = emailVerificationCode.join('');
    
    if (verificationCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      setEmailVerificationLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://194.238.23.44:9080/api/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          verificationCode: verificationCode
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Email verified successfully:', data);
        setSuccess('Email verified successfully!');
        
        // Check if phone verification is needed
        if (userInfo?.phoneVerified === false) {
          setTimeout(() => {
            setCurrentStep('phone-verify');
            setSuccess('');
          }, 1500);
        } else {
          // Redirect to dashboard
          setTimeout(() => {
            setSuccess('Verification complete! Redirecting...');
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1000);
          }, 1500);
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setError('Network error. Please try again.');
    } finally {
      setEmailVerificationLoading(false);
    }
  };

  // API call to resend verification code
  const handleResendVerificationCode = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('http://194.238.23.44:9080/api/users/resend-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Verification code resent:', data);
        setSuccess('Verification code sent successfully!');
        // Clear the input fields
        setEmailVerificationCode(['', '', '', '']);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Error resending verification code:', error);
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Handle phone verification (placeholder for now)
  const handlePhoneVerification = async () => {
    setPhoneVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = phoneVerificationCode.join('');
    
    if (verificationCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      setPhoneVerificationLoading(false);
      return;
    }
    
    try {
      // TODO: Replace with actual phone verification API
      const response = await fetch('http://194.238.23.44:9080/api/users/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // or phone number depending on your API
          verificationCode: verificationCode
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Phone verified successfully:', data);
        setSuccess('Phone verified successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying phone:', error);
      setError('Network error. Please try again.');
    } finally {
      setPhoneVerificationLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Welcome Back</h1>
        <p className="text-lg text-red-700">Sign in to your account to continue</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-8">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
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
                required
              />
            </div>
            {touched.email && emailError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {emailError}
              </p>
            )}
          </div>
          
          {/* Password Field */}
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
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-red-600 hover:text-red-900 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
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
          
          {/* Forgot Password */}
          <div className="flex justify-center">
            <button
              type="button" 
              className="text-red-700 hover:text-red-900 font-medium underline decoration-2 underline-offset-2 transition-colors"
              onClick={() => window.location.href = '/forgot-password'}
            >
              Forgot password?
            </button>
          </div>
          
          {/* Login Button */}
          <button
            type="submit"
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
        </form>
        
        {/* Social Login */}
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
              className="flex w-full items-center justify-center rounded-xl border-2 border-red-200 bg-white py-3 px-4 text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105"
            >
              <FaGoogle className='mr-3 text-red-600'/>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="flex w-full items-center justify-center rounded-xl border-2 border-red-200 bg-white py-3 px-4 text-sm font-medium text-red-900 shadow-sm hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 transform hover:scale-105"
            >
              <FaFacebook className='mr-3 text-red-600'/>
              Facebook
            </button>
          </div>
        </div>
        
        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-red-700">
            Don't have an account?{' '}
            <button 
              type="button"
              className="font-bold text-red-900 hover:text-red-700 underline decoration-2 underline-offset-2 transition-colors"
              onClick={() => window.location.href = '/signup'}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Render email verification
  const renderEmailVerification = () => (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Verify Your Email</h1>
        <p className="text-lg text-red-700">We've sent a verification code to your email</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FiMail className="w-12 h-12 text-red-900" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Verify your email address</h2>
          <p className="text-red-700 text-lg">
            We've sent a verification code to <span className="font-semibold">{email}</span>
          </p>
          <p className="text-red-600 mt-2">Please enter the 4-digit code below to continue</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => emailInputRefs.current[index] = el}
              type="text"
              name={`email-code-${index}`}
              maxLength={1}
              value={emailVerificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value, 'email')}
              className="w-16 h-16 text-center border-2 border-red-300 rounded-xl text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          ))}
        </div>
        
        <button
          onClick={handleEmailVerification}
          disabled={emailVerificationLoading}
          className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {emailVerificationLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Verifying...
            </>
          ) : (
            <>
              <FiCheck className='mr-3' />
              Verify Email
            </>
          )}
        </button>
        
        <div className="text-center">
          <p className="text-red-600">Didn't receive the code?</p>
          <button 
            onClick={handleResendVerificationCode}
            disabled={resendLoading}
            className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>
        
        <button
          onClick={() => setCurrentStep('login')}
          className="text-red-700 hover:text-red-900 font-medium underline transition-colors"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );

  // Render phone verification
  const renderPhoneVerification = () => (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Verify Your Phone</h1>
        <p className="text-lg text-red-700">We've sent a verification code to your phone</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FiPhone className="w-12 h-12 text-red-900" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Verify your phone number</h2>
          <p className="text-red-700 text-lg">
            We've sent a verification code to <span className="font-semibold">+91 {userInfo?.phoneNumber || '****'}</span>
          </p>
          <p className="text-red-600 mt-2">Please enter the 4-digit code below to continue</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => phoneInputRefs.current[index] = el}
              type="text"
              name={`phone-code-${index}`}
              maxLength={1}
              value={phoneVerificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value, 'phone')}
              className="w-16 h-16 text-center border-2 border-red-300 rounded-xl text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          ))}
        </div>
        
        <button
          onClick={handlePhoneVerification}
          disabled={phoneVerificationLoading}
          className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center justify-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {phoneVerificationLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Verifying...
            </>
          ) : (
            <>
              <FiCheck className='mr-3' />
              Verify Phone
            </>
          )}
        </button>
        
        <div className="text-center">
          <p className="text-red-600">Didn't receive the code?</p>
          <button 
            className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2"
          >
            Resend code
          </button>
        </div>
        
        <button
          onClick={() => setCurrentStep('email-verify')}
          className="text-red-700 hover:text-red-900 font-medium underline transition-colors"
        >
          ← Back to email verification
        </button>
      </div>
    </div>
  );

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100'>
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-red-100 shadow-sm">
        <div className="flex items-center justify-center py-6">
          <div className="max-w-[1600px] mx-auto flex justify-center items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-900 to-rose-700 bg-clip-text text-transparent">
              LOGO
            </div>
          </div>
        </div>
      </header>

      {/* Back to Home */}
      <div className="max-w-[1600px] mx-auto px-6 pt-6">
        <button 
          onClick={() => window.location.href = '/'}
          className="group flex items-center text-red-700 hover:text-red-900 transition-all duration-200 transform hover:scale-105"
        >
          <IoIosArrowBack className="mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className='font-medium'>Go to home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center py-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse md:flex-row gap-12 px-6">
          
          {/* Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {currentStep === 'login' && renderLoginForm()}
            {currentStep === 'email-verify' && renderEmailVerification()}
            {currentStep === 'phone-verify' && renderPhoneVerification()}
          </div>
          
          {/* Image Carousel Section */}
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