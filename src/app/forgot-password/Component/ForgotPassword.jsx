"use client"

import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiUser, FiLock, FiEye, FiEyeOff, FiMail, FiShield, FiCheck } from 'react-icons/fi';
import { ChevronRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast  } from '../../../hooks/useToast';
import forgotPasswordAPI from '../../api/forgotPassword/forgotPassword';
import { toast } from 'sonner';



// API configuration
// const API_BASE_URL = 'https://api.gulbhahar.com/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// const forgotPasswordAPI = async (email) => {
//   const response = await api.post('/users/forgot-password', { email });
//   return response.data;
// };

// const verifyEmailAPI = async ({ email, verificationCode }) => {
//   const response = await api.post('/users/verify-email', { 
//     email, 
//     verificationCode 
//   });
//   return response.data;
// };

// const resetPasswordAPI = async ({ email, verificationCode, newPassword }) => {
//   const response = await api.put('/users/reset-password', { 
//     email, 
//     verificationCode,
//     newPassword
//   });
//   return response.data;
// };

// Step indicators component
const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: "Verify Email", icon: FiMail },
    { id: 2, label: "Verify Code", icon: FiShield },
    { id: 3, label: "New Password", icon: FiLock }
  ];
  
  return (
    <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-red-200 shadow-lg">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step Circle */}
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'bg-red-900 border-red-900 text-white shadow-lg' 
                  : currentStep === step.id 
                    ? 'bg-red-100 border-red-900 text-red-900' 
                    : 'bg-white border-red-300 text-red-600'
              }`}>
                {currentStep > step.id ? (
                  <FiCheck className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <div className="text-sm font-semibold text-red-900">Step {step.id}</div>
                <div className="text-xs text-red-600">{step.label}</div>
              </div>
            </div>
            
            {/* Connector */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                currentStep > step.id ? 'bg-red-900' : 'bg-red-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Carousel component
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/forgot-password/002.jpg",
    "/forgot-password/003.jpg",
    "/forgot-password/IMG_1810.jpg",
    "/forgot-password/0004compress.jpg"
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
          <h3 className="text-3xl font-bold mb-3">Account Recovery</h3>
          <p className="text-red-100 text-lg">Secure and simple password recovery process</p>
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

// Step 1: Email Confirmation
const EmailConfirmationStep = ({ email, setEmail, goToNextStep }) => {
  // const { showToast } = useToast();
      
      const { showToast, ToastContainer } = useToast();
       const [emailError, setEmailError] = useState('');
   const [touched, setTouched] = useState(false);
  // React Query mutation for forgot password
  const forgotPasswordMutation = useMutation({  
    // mutationFn: forgotPasswordAPI,
    mutationFn: forgotPasswordAPI.forgotPassword,
    onSuccess: (data) => {
      // // console.log('Email sent successfully:', data);
      // showToast('Verification email sent successfully!', 'success');
      // toast.success('Email verified successfully!');
      toast.success('Verification email sent successfully!');

      goToNextStep();
    },
    onError: (error) => {
      console.error('Error sending email:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send verification email. Please try again.';
      setEmailError(errorMessage);
      // showToast(errorMessage, 'error');
      toast.error(errorMessage);
    },
  });

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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) {
      validateEmail(value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateEmail(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    setTouched(true);
    
    if (isEmailValid) {
      forgotPasswordMutation.mutate(email);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Recover Your Account</h1>
        <p className="text-lg text-red-700">Enter your email address to start the recovery process</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiMail className="w-10 h-10 text-red-900" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-red-900 mb-3">
              Confirm your Email address
            </label>
            <div className="relative group">
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type="email"
                id="email"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 ${
                  emailError 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-red-200 focus:border-red-900'
                }`}
                placeholder="name@email.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
              />
            </div>
            {(touched && emailError) && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {emailError}
              </p>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={forgotPasswordMutation.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-red-900 to-red-800 py-4 text-lg font-bold text-white shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {forgotPasswordMutation.isPending ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Sending verification...
              </div>
            ) : (
              <div className="flex items-center">
                <FiCheck className="mr-3" />
                Confirm Email
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 2: Verification Code
const VerificationCodeStep = ({ email, goToNextStep, goToPrevStep, setVerificationCode: setParentVerificationCode }) => {
  // const { showToast } = useToast();
  const { showToast, ToastContainer } = useToast();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // React Query mutation for email verification
  const verifyEmailMutation = useMutation({
    // mutationFn: verifyEmailAPI,
    // mutationFn: (data) => forgotPasswordAPI.verifyEmail(data.email, data.verificationCode),
    mutationFn: ({ email, verificationCode }) => 
    forgotPasswordAPI.verifyEmail(email, verificationCode), 
    onSuccess: (data) => {
      // // console.log('Email verified successfully:', data);
      setError('');
      setSuccessMessage('Email verified successfully!');
      // showToast('Email verified successfully!', 'success');
      toast.success('Email verified successfully!');
      
      // Store the verification code for the final step
      const code = verificationCode.join('');
      setParentVerificationCode(code);
      
      // Move to next step after a brief delay
      setTimeout(() => {
        goToNextStep();
      }, 1000);
    },
    onError: (error) => {
      console.error('Error verifying email:', error);
      const errorMessage = error.response?.data?.message || 'Invalid verification code. Please try again.';
      setError(errorMessage);
      setSuccessMessage('');
      // showToast(errorMessage, 'error');
      toast.error(errorMessage);
    },
  });

  // Mutation for resending verification email
  const resendEmailMutation = useMutation({
    // mutationFn: forgotPasswordAPI,
    mutationFn: forgotPasswordAPI.forgotPassword,
    onSuccess: (data) => {
      // // console.log('Email resent successfully:', data);
      setError('');
      setSuccessMessage('Verification code resent successfully!');
      // showToast('Verification code resent successfully!', 'success');
      toast.success('Verification code resent successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    },
    onError: (error) => {
      console.error('Error resending email:', error);
      const errorMessage = error.response?.data?.message || 'Failed to resend verification email.';
      setError(errorMessage);
      setSuccessMessage('');
      // showToast(errorMessage, 'error');
      toast.error(errorMessage);
    },
  });
  
  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.some(code => code === '')) {
      setError('Please enter the complete verification code');
      return;
    }
    
    const code = verificationCode.join('');
    
    // Call the verify email API
    verifyEmailMutation.mutate({ email, verificationCode: code });
  };

  const handleResendCode = () => {
    resendEmailMutation.mutate(email);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Verify Your Email</h1>
        <p className="text-lg text-red-700">Enter the verification code sent to your email</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiShield className="w-10 h-10 text-red-900" />
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-red-900 font-semibold text-lg mb-2">Verification code sent to:</p>
            <p className="text-red-700 font-medium bg-red-50 px-4 py-2 rounded-lg inline-block">{email}</p>
          </div>
          
          <div>
            <div className="flex justify-center space-x-3 mb-4">
              {verificationCode.map((code, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center border-2 border-red-300 rounded-xl text-xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            
            {error && (
              <p className="text-sm text-red-600 flex items-center justify-center mb-2">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {error}
              </p>
            )}
            
            {successMessage && (
              <p className="text-sm text-green-600 flex items-center justify-center mb-2">
                <FiCheck className="w-4 h-4 mr-2" />
                {successMessage}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={verifyEmailMutation.isPending}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-900 to-red-800 text-white font-bold shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-105 disabled:opacity-70 flex items-center justify-center"
            >
              {verifyEmailMutation.isPending ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center">
                  <FiCheck className="mr-3" />
                  Verify Code
                </div>
              )}
            </button>
            
            <button 
              onClick={goToPrevStep}
              className="px-6 py-3 text-red-700 hover:text-red-900 font-semibold transition-colors flex items-center justify-center group"
            >
              <IoIosArrowBack className="mr-3 group-hover:-translate-x-1 transition-transform" />
              Change Email
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-red-600">Didn't receive the code?</p>
            <button 
              onClick={handleResendCode}
              disabled={resendEmailMutation.isPending}
              className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2 disabled:opacity-50"
            >
              {resendEmailMutation.isPending ? 'Resending...' : 'Resend verification code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 3: Create New Password
const CreatePasswordStep = ({ email, verificationCode, goToHomePage }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [touched, setTouched] = useState({ password: false, confirm: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Query mutation for password reset
  const resetPasswordMutation = useMutation({
    mutationFn: forgotPasswordAPI.resetPassword,
    onSuccess: (data) => {
      // // console.log('Password reset successful:', data);
      // Show success message briefly before redirecting
      const successMessage = 'Password reset successfully! Redirecting to login...';
      alert(successMessage); // You can replace this with a proper toast/notification
      
      setTimeout(() => {
        goToHomePage();
      }, 2000);
    },
    onError: (error) => {
      console.error('Error resetting password:', error);
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Please try again.';
      setPasswordError(errorMessage);
    },
  });

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

  const validateConfirmPassword = (confirm) => {
    if (!confirm) {
      setConfirmError('Please confirm your password');
      return false;
    } else if (confirm !== password) {
      setConfirmError('Passwords do not match');
      return false;
    } else {
      setConfirmError('');
      return true;
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      validatePassword(value);
    }
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirm) {
      validateConfirmPassword(value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'password') {
      validatePassword(password);
    } else {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword);
    
    setTouched({ password: true, confirm: true });
    
    if (isPasswordValid && isConfirmValid) {
      resetPasswordMutation.mutate({ 
        email, 
        verificationCode, 
        newPassword: password 
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-900 mb-3">Create New Password</h1>
        <p className="text-lg text-red-700">Set up your new secure password</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiLock className="w-10 h-10 text-red-900" />
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-red-900 mb-3">
              Enter new password
            </label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 ${
                  passwordError 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-red-200 focus:border-red-900'
                }`}
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-900 transition-colors"
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
          
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-semibold text-red-900 mb-3">
              Confirm new password
            </label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600 group-focus-within:text-red-900" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 ${
                  confirmError 
                    ? 'border-red-500 focus:border-red-600' 
                    : 'border-red-200 focus:border-red-900'
                }`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={handleConfirmChange}
                onBlur={() => handleBlur('confirm')}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-600 hover:text-red-900 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {touched.confirm && confirmError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {confirmError}
              </p>
            )}
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-xl bg-gradient-to-r from-red-900 to-red-800 py-4 text-lg font-bold text-white shadow-xl hover:from-red-800 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {resetPasswordMutation.isPending ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Updating password...
              </div>
            ) : (
              <div className="flex items-center">
                <FiCheck className="mr-3" />
                Update Password
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Account Recovery Page
const RecoverAccountPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const goToHomePage = () => {
    window.location.href = '/';
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EmailConfirmationStep email={email} setEmail={setEmail} goToNextStep={goToNextStep} />;
      case 2:
        return <VerificationCodeStep 
          email={email} 
          goToNextStep={goToNextStep} 
          goToPrevStep={goToPrevStep} 
          setVerificationCode={setVerificationCode}
        />;
      case 3:
        return <CreatePasswordStep 
          email={email} 
          verificationCode={verificationCode}
          goToHomePage={goToHomePage} 
        />;
      default:
        return <EmailConfirmationStep email={email} setEmail={setEmail} goToNextStep={goToNextStep} />;
    }
  };

  return (
    <div className='w-full min-h-screen mt-20 bg-gradient-to-br from-red-50 via-rose-50 to-red-100'>
    
      {/* Back to Home */}
      <div className="max-w-[1600px] mx-auto px-6 pt-6">
        <button onClick={() => window.location.href = "/login"} className="group flex items-center text-red-700 hover:text-red-900 transition-all duration-200 transform hover:scale-105">
          <IoIosArrowBack className="mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className='font-medium'>Back to login</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex min-h-[calc(100vh-120px)] w-full items-center justify-center py-8">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col-reverse md:flex-row gap-8 px-6">
          {/* Form Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} />
            
            {/* Step Content */}
            {renderStep()}
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

export default RecoverAccountPage;