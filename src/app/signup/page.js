"use client"
import { useEffect, useState, useRef } from 'react';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiUser, FiLock, FiMail, FiMapPin, FiPhone, FiShield, FiCheck } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-red-900/20"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="text-white">
          <h3 className="text-3xl font-bold mb-3">Join Our Community</h3>
          <p className="text-red-100 text-lg">Create your account and start your journey with us</p>
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

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    verificationCode: ['', '', '', '']
  });

  const inputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
    
  const handleVerificationCodeChange = (index, value) => {
    const newVerificationCode = [...formData.verificationCode];
    newVerificationCode[index] = value;
    
    setFormData(prevState => ({
      ...prevState,
      verificationCode: newVerificationCode
    }));

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Step 1: Personal Information
  const renderPersonalInformation = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Enter your personal information to get started</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-lg font-semibold text-red-900">First name</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="James"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-lg font-semibold text-red-900">Last name</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Jakob"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-semibold text-red-900">Email address</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-lg font-semibold text-red-900">Location</label>
            <div className="relative group">
              <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-lg font-semibold text-red-900">Phone number</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
              <FiPhone className="text-red-600 mr-2" />
              <span className="text-red-700 font-medium">+90</span>
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pl-20 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Security
  const renderSecurity = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Set up your password and security preferences</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-lg font-semibold text-red-900">Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-900 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-lg font-semibold text-red-900">Confirm Password</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-900 transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="securityQuestion" className="text-lg font-semibold text-red-900">Security question</label>
            <div className="relative group">
              <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 appearance-none"
              >
                <option value="">Select a question</option>
                <option value="petName">What is your pet's name?</option>
                <option value="birthCity">What city were you born in?</option>
                <option value="mothersMaiden">What is your mother's maiden name?</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="securityAnswer" className="text-lg font-semibold text-red-900">Answer to security question</label>
            <div className="relative group">
              <FiCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="securityAnswer"
                name="securityAnswer"
                placeholder="e.g. Pet name"
                value={formData.securityAnswer}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Verification
  const renderVerification = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Almost there! Just verify your email</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FiMail className="w-12 h-12 text-red-900" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Verify your email address</h2>
          <p className="text-red-700 text-lg">
            We've sent a verification code to <span className="font-semibold">{formData.email}</span>
          </p>
          <p className="text-red-600 mt-2">Please enter the 4-digit code below to continue</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => inputRefs.current[index] = el}
              type="text"
              name={`code-${index}`}
              maxLength={1}
              value={formData.verificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
              className="w-16 h-16 text-center border-2 border-red-300 rounded-xl text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-red-600">Didn't receive the code?</p>
          <button className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2">
            Resend code
          </button>
        </div>
      </div>
    </div>
  );

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

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse md:flex-row gap-8 px-6">
          
          {/* Carousel Section */}
          <div className="hidden md:block md:w-2/5">
            <div className="h-full min-h-[700px]">
              <Carousel />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-3/5 flex flex-col justify-center">
            
            {/* Progress Steps */}
            <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200 shadow-lg">
              <div className="flex items-center justify-between">
                {/* Step 1 */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step >= 1 ? 'bg-red-900 border-red-900 text-white shadow-lg' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    {step > 1 ? <FiCheck className="w-6 h-6" /> : "1"}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 1</div>
                    <div className="text-xs text-red-600">Personal Info</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step > 1 ? 'bg-red-900' : 'bg-red-200'
                }`}></div>
                
                {/* Step 2 */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step >= 2 ? 'bg-red-900 border-red-900 text-white shadow-lg' : 
                    step === 2 ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    {step > 2 ? <FiCheck className="w-6 h-6" /> : "2"}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 2</div>
                    <div className="text-xs text-red-600">Security</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step > 2 ? 'bg-red-900' : 'bg-red-200'
                }`}></div>
                
                {/* Step 3 */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step === 3 ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    3
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 3</div>
                    <div className="text-xs text-red-600">Verification</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {step === 1 && renderPersonalInformation()}
              {step === 2 && renderSecurity()}
              {step === 3 && renderVerification()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 text-red-700 hover:text-red-900 font-semibold transition-colors group"
                >
                  <IoIosArrowBack className='sm:mr-3 mr-1 group-hover:-translate-x-1 transition-transform' />
                  Previous step
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-red-900 to-red-800 text-white px-8 py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold"
                >
                  Next
                  <IoIosArrowForward className='ml-3' />
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r text-nowrap from-red-900 to-red-800 text-white sm:px-8 px-4 py-3 sm:py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold"
                >
                  <FiCheck className='sm:mr-3 mr-1' />
                  Verify Account
                </button>
              )}
            </div>
            
            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-red-700 text-lg">
                Already have an account? 
                <button
                onClick={() => window.location.href = '/login'}
                 className="text-red-900 font-bold underline decoration-2 underline-offset-2 hover:text-red-700 transition-colors ml-2">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;