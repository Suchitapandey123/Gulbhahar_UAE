"use client"
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiUser, FiLock, FiMail, FiMapPin, FiPhone, FiShield, FiCheck, FiCamera, FiUpload } from 'react-icons/fi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Utility functions for token storage
const setAuthToken = (token) => {
  // Store in localStorage
  localStorage.setItem('authToken', token);
  
  // Store in cookie with 30 days expiration
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);
  document.cookie = `authToken=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
};

const setUserData = (userData) => {
  // Store user data in localStorage
  localStorage.setItem('userData', JSON.stringify(userData));
  
  // Store essential user info in cookies
  document.cookie = `userEmail=${userData.email || ''}; path=/; secure; samesite=strict`;
  document.cookie = `userName=${userData.firstName || ''} ${userData.lastName || ''}; path=/; secure; samesite=strict`;
};

// Carousel component
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    
   "/Signup/001.webp",
    "/Signup/002.webp",
    "/Signup/003.webp",
    "/Signup/004.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full max-h-[85vh] overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl shadow-2xl">
  <div className="h-full w-full">
    {slides.map((slide, index) => (
      <div
        key={index}
        className={`absolute h-full w-full transition-all duration-1000 ${
          index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      >
        <Image
          src={slide}
          alt={`Carousel slide ${index + 1}`}
          fill
          priority
          className="object-cover"
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
  const [loading, setLoading] = useState(false);
  const [emailVerificationLoading, setEmailVerificationLoading] = useState(false);
  const [phoneVerificationLoading, setPhoneVerificationLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [autoLoginLoading, setAutoLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
    emailVerificationCode: ['', '', '', ''],
    phoneVerificationCode: ['', '', '', '']
  });

  const emailInputRefs = useRef([]);
  const phoneInputRefs = useRef([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload profile image to S3
  const uploadProfileImage = async () => {
    if (!selectedImage || !profileImageUrl) return;

    setImageUploadLoading(true);
    setError('');

    try {
      const response = await fetch(profileImageUrl, {
        method: 'PUT',
        body: selectedImage,
        headers: {
          'Content-Type': selectedImage.type,
        },
      });

      if (response.ok) {
        setSuccess('Profile image uploaded successfully!');
        setTimeout(() => {
          setStep(4); // Move to email verification
          setSuccess('');
        }, 500);
      } else {
        setError('Failed to upload profile image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Network error during image upload. Please try again.');
    } finally {
      setImageUploadLoading(false);
    }
  };

  // Auto-login function after successful registration
  const performAutoLogin = async () => {
    setAutoLoginLoading(true);
    setError('');

    try {
      // // console.log('Attempting auto-login for:', formData.email);
      
      const response = await fetch('https://api.gulbhahar.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // // console.log('Auto-login successful:', data);
        
        // Store authentication token
        if (data.token || data.accessToken || data.authToken) {
          const token = data.token || data.accessToken || data.authToken;
          setAuthToken(token);
          // // console.log('Token stored successfully');
        }
        
        // Store user data
        const userData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.location,
          phoneNumber: formData.phoneNumber,
          ...data.user 
        };
        setUserData(userData);
        // // console.log('User data stored successfully');
        
        setSuccess('Registration complete! Auto-login successful. Redirecting to Homepage...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
        
      } else {
        console.error('Auto-login failed:', data);
        setError(`Auto-login failed: ${data.message || 'Unknown error'}`);
        
        // Still redirect to login page if auto-login fails
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    } catch (error) {
      console.error('Error during auto-login:', error);
      setError('Network error during auto-login. Redirecting to login page...');
      
      // Redirect to login page on error
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } finally {
      setAutoLoginLoading(false);
    }
  };

  // API call for login (can be used when user exists)
  const handleLogin = async () => {
    window.location.href = '/login'; // Redirect to login page
  };
    
  const handleVerificationCodeChange = (index, value, type) => {
    const fieldName = type === 'email' ? 'emailVerificationCode' : 'phoneVerificationCode';
    const refs = type === 'email' ? emailInputRefs : phoneInputRefs;
    
    const newVerificationCode = [...formData[fieldName]];
    newVerificationCode[index] = value;
    
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: newVerificationCode
    }));

    if (value && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  // API call to verify email
  const handleEmailVerification = async () => {
    setEmailVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = formData.emailVerificationCode.join('');
    
    if (verificationCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      setEmailVerificationLoading(false);
      return;
    }
    
    try {
      const response = await fetch('https://api.gulbhahar.com/api/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          verificationCode: verificationCode
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // // console.log('Email verified successfully:', data);
        setSuccess('Email verified successfully!');
        // Move to phone verification step after a short delay
        setTimeout(() => {
          setStep(5);
          setSuccess('');
        }, 1000);
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

  // Enhanced phone verification with auto-login
  const handlePhoneVerification = async () => {
    setPhoneVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = formData.phoneVerificationCode.join('');
    
    if (verificationCode.length !== 4) {
      setError('Please enter the complete 4-digit verification code');
      setPhoneVerificationLoading(false);
      return;
    }
    
    // Check if code is 1234 - bypass API call and perform auto-login
    if (verificationCode === '1234') {
      setSuccess('Phone verified successfully! Completing registration...');
      setPhoneVerificationLoading(false);
      
      // Perform auto-login after a short delay
      setTimeout(() => {
        performAutoLogin();
      }, 1000);
      return;
    }
    
    // For other codes, make API call
    try {
      const response = await fetch('https://api.gulbhahar.com/api/users/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          verificationCode: verificationCode
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // // console.log('Phone verified successfully:', data);
        setSuccess('Phone verified successfully! Completing registration...');
        setPhoneVerificationLoading(false);
        
        // Perform auto-login after successful phone verification
        setTimeout(() => {
          performAutoLogin();
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid verification code');
        setPhoneVerificationLoading(false);
      }
    } catch (error) {
      console.error('Error verifying phone:', error);
      setError('Network error. Please try again.');
      setPhoneVerificationLoading(false);
    }
  };

  // API call to resend verification code
  const handleResendVerificationCode = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('https://api.gulbhahar.com/api/users/resend-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // // console.log('Verification code resent:', data);
        setSuccess('Verification code sent successfully!');
        // Clear the input fields
        setFormData(prevState => ({
          ...prevState,
          emailVerificationCode: ['', '', '', '']
        }));
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

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.gulbhahar.com/api/users/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          location: formData.location,
          phoneNumber: formData.phoneNumber,
          secQues: formData.securityQuestion,
          secAns: formData.securityAnswer
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // // console.log('User created successfully:', data);
        
        // Store the image upload URL for profile picture upload
        if (data.imgUploadUrl) {
          setProfileImageUrl(data.imgUploadUrl);
        }
        
        // Move to profile image upload step
        setStep(3);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Validate current step
  const validateStep = () => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.location || !formData.phoneNumber) {
        setError('Please fill in all required fields');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword || !formData.securityQuestion || !formData.securityAnswer) {
        setError('Please fill in all required fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    
    if (step === 2) {
      // Create user account when moving from step 2 to 3
      handleSignup();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  // Step 1: Personal Information
  const renderPersonalInformation = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Enter your personal information to get started</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-lg font-semibold text-red-900">First name *</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="James"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-lg font-semibold text-red-900">Last name *</label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Jakob"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-semibold text-red-900">Email address *</label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-lg font-semibold text-red-900">Location *</label>
            <div className="relative group">
              <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-lg font-semibold text-red-900">Phone number *</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
              <FiPhone className="text-red-600 mr-2" />
              <span className="text-red-700 font-medium">+91</span>
            </div>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
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
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="password" className="text-lg font-semibold text-red-900">Password *</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
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
            <label htmlFor="confirmPassword" className="text-lg font-semibold text-red-900">Confirm Password *</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
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
            <label htmlFor="securityQuestion" className="text-lg font-semibold text-red-900">Security question *</label>
            <div className="relative group">
              <FiShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <select
                id="securityQuestion"
                name="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                required
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
            <label htmlFor="securityAnswer" className="text-lg font-semibold text-red-900">Answer to security question *</label>
            <div className="relative group">
              <FiCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="text"
                id="securityAnswer"
                name="securityAnswer"
                placeholder="e.g. Pet name"
                value={formData.securityAnswer}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Profile Image Upload
  const renderProfileImageUpload = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Add a profile picture to personalize your account</p>
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
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto relative overflow-hidden border-4 border-red-200">
          {previewImage ? (
            <Image
              fill
              priority
              src={previewImage} 
              alt="Profile preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <FiCamera className="w-16 h-16 text-red-600" />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Upload Profile Picture</h2>
          <p className="text-red-700 text-lg">
            Choose a photo that represents you best
          </p>
          <p className="text-red-600 mt-2">This step is optional - you can skip it and add a photo later</p>
        </div>
        
        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-red-100 border-2 border-red-300 border-dashed text-red-900 px-8 py-6 rounded-xl hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 flex items-center justify-center mx-auto font-semibold"
          >
            <FiUpload className="mr-3 w-6 h-6" />
            {selectedImage ? 'Change Photo' : 'Choose Photo'}
          </button>
          
          {selectedImage && (
            <p className="text-red-700 text-sm">
              Selected: {selectedImage.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Step 4: Email Verification
  const renderEmailVerification = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">Almost there! Just verify your email</p>
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
              ref={(el) => emailInputRefs.current[index] = el}
              type="text"
              name={`email-code-${index}`}
              maxLength={1}
              value={formData.emailVerificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value, 'email')}
              className="w-16 h-16 text-center border-2 border-red-300 rounded-xl text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          ))}
        </div>
        
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
      </div>
    </div>
  );

  // Step 5: Phone Verification
  const renderPhoneVerification = () => (
    <div className="w-full space-y-8">
      <div className="text-center">
        <span className="text-red-600 font-medium text-lg">Let's setup your account</span>
        <h1 className="text-4xl font-bold text-red-900 mt-2">Create Account</h1>
        <p className="text-red-700 mt-2">One more step! Verify your phone number</p>
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

      {/* Auto-login loading indicator */}
      {autoLoginLoading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl mb-6 flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-3"></div>
          Logging you in automatically...
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center space-y-8">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <FiPhone className="w-12 h-12 text-red-900" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-red-900 mb-4">Verify your phone number</h2>
          <p className="text-red-700 text-lg">
            We've sent a verification code to <span className="font-semibold">+91 {formData.phoneNumber}</span>
          </p>
          <p className="text-red-600 mt-2">Please enter the 4-digit code below to complete your registration</p>
          <p className="text-sm text-red-500 mt-2 italic">💡 Tip: Try entering "1234" for quick verification</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(el) => phoneInputRefs.current[index] = el}
              type="text"
              name={`phone-code-${index}`}
              maxLength={1}
              value={formData.phoneVerificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value, 'phone')}
              disabled={autoLoginLoading}
              className="w-16 h-16 text-center border-2 border-red-300 rounded-xl text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 disabled:opacity-50"
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-red-600">Didn't receive the code?</p>
          <button 
            disabled={autoLoginLoading}
            className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className='w-full min-h-screen mt-20'>
      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center py-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse md:flex-row gap-8 px-6">
          
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
                    step >= 3 ? 'bg-red-900 border-red-900 text-white shadow-lg' : 
                    step === 3 ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    {step > 3 ? <FiCheck className="w-6 h-6" /> : "3"}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 3</div>
                    <div className="text-xs text-red-600">Profile Image</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step > 3 ? 'bg-red-900' : 'bg-red-200'
                }`}></div>
                
                {/* Step 4 */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step >= 4 ? 'bg-red-900 border-red-900 text-white shadow-lg' : 
                    step === 4 ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    {step > 4 ? <FiCheck className="w-6 h-6" /> : "4"}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 4</div>
                    <div className="text-xs text-red-600">Email Verify</div>
                  </div>
                </div>
                
                {/* Connector */}
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                  step > 4 ? 'bg-red-900' : 'bg-red-200'
                }`}></div>
                
                {/* Step 5 */}
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step === 5 ? 'bg-red-100 border-red-900 text-red-900' : 'bg-white border-red-300 text-red-600'
                  }`}>
                    5
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className="text-sm font-semibold text-red-900">Step 5</div>
                    <div className="text-xs text-red-600">Phone Verify</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="mb-8">
              {step === 1 && renderPersonalInformation()}
              {step === 2 && renderSecurity()}
              {step === 3 && renderProfileImageUpload()}
              {step === 4 && renderEmailVerification()}
              {step === 5 && renderPhoneVerification()}
            </div>

            {/* Login/Signup Toggle for Existing Users */}
            {step === 2 && (
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-700 text-center mb-3">
                  Already have an account with this email?
                </p>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-white border-2 border-red-300 text-red-900 px-6 py-3 rounded-xl hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Checking...' : 'Login Instead'}
                </button>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 text-red-700 hover:text-red-900 font-semibold transition-colors group"
                  disabled={loading || emailVerificationLoading || phoneVerificationLoading || imageUploadLoading || autoLoginLoading}
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
                  disabled={loading}
                  className="bg-gradient-to-r from-red-900 to-red-800 text-white px-8 py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Next
                      <IoIosArrowForward className='ml-3' />
                    </>
                  )}
                </button>
              ) : step === 3 ? (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setStep(4);
                      setError('');
                    }}
                    className="bg-white border-2 border-red-300 text-red-900 px-6 py-3 rounded-xl hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 font-semibold"
                  >
                    Skip for now
                  </button>
                  {selectedImage && (
                    <button
                      onClick={uploadProfileImage}
                      disabled={imageUploadLoading}
                      className="bg-gradient-to-r from-red-900 to-red-800 text-white px-8 py-3 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {imageUploadLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FiUpload className='mr-3' />
                          Upload & Continue
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : step === 4 ? (
                <button
                  onClick={handleEmailVerification}
                  disabled={emailVerificationLoading}
                  className="bg-gradient-to-r text-nowrap from-red-900 to-red-800 text-white sm:px-8 px-4 py-3 sm:py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {emailVerificationLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white sm:mr-3 mr-1"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiCheck className='sm:mr-3 mr-1' />
                      Verify Email
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handlePhoneVerification}
                  disabled={phoneVerificationLoading || autoLoginLoading}
                  className="bg-gradient-to-r text-nowrap from-red-900 to-red-800 text-white sm:px-8 px-4 py-3 sm:py-4 rounded-xl shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 flex items-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {phoneVerificationLoading || autoLoginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white sm:mr-3 mr-1"></div>
                      {autoLoginLoading ? 'Logging in...' : 'Verifying...'}
                    </>
                  ) : (
                    <>
                      <FiCheck className='sm:mr-3 mr-1' />
                      Complete Registration
                    </>
                  )}
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