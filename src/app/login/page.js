

"use client"
import { useEffect, useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import img1 from '../../../public/Image/About1.png';
import { useRouter } from 'next/navigation';

// Carousel component
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample images for the carousel
  const slides = [
    img1,
    "../../../public/Image/Hero1.png", 
    "../../../public/Image/About1.png",
    "../../../public/Image/Hero1.png",
  ];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl shadow-2xl">
      {/* Carousel images */}
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute h-full w-full transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={"/Image/Hero1.png"}
              alt={`Carousel slide ${index + 1}`}
              className="h-full scale-125 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-transparent to-red-900/10"></div>
          </div>
        ))}
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2">Discover Premium Fashion</h3>
          <p className="text-red-100 text-lg">Join thousands of fashion enthusiasts</p>
        </div>
      </div>
      
      {/* Navigation dots */}
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
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
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
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    setTouched({ email: true, password: true });
    
    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        console.log('Form submitted:', { email, password });
      }, 2000);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-red-100'>
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-red-100 shadow-sm">
        <div className="flex items-center justify-center py-6">
          <div className="max-w-7xl mx-auto flex justify-center items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-red-900 to-rose-700 bg-clip-text text-transparent">
              LOGO
            </div>
          </div>
        </div>
      </header>

      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button className="group flex items-center text-red-700 hover:text-red-900 transition-all duration-200 transform hover:scale-105">
          <IoIosArrowBack className="mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className='font-medium'>Go to home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center py-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse md:flex-row gap-12 px-6">
          
          {/* Login Form Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Welcome Section */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-red-900 mb-3">Welcome Back</h1>
                <p className="text-lg text-red-700">Sign in to your account to continue</p>
              </div>
              
              {/* Login Form */}
              <div className="bg-white rounded-2xl shadow-2xl border border-red-100 p-8">
                <div className="space-y-6">
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
                    <button onClick={() => router.push('/forgot-password')}
                      type="button" 
                      className="text-red-700 hover:text-red-900 font-medium underline decoration-2 underline-offset-2 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  
                  {/* Login Button */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleSubmit}
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
                        onClick={() => router.push('/signup')}
                      type="button"
                      className="font-bold text-red-900 hover:text-red-700 underline decoration-2 underline-offset-2 transition-colors"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </div>
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