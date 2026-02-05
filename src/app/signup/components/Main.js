// src/app/signup/page.jsx
"use client"
import { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiCheck, FiUpload } from 'react-icons/fi';
import Carousel from './Carousel';
import ProgressSteps from './ProgressSteps';
import PersonalInformation from './PersonalInformation';
import Security from './Security';
import ProfileImageUpload from './ProfileImageUpload';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';
import { useAuth } from '@/providers/ContextProviders/AuthContext';
import signupApi from "../../api/signup/signup";


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
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  
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
    emailVerificationCode: ['', '', '', '', '', ''], 
    phoneVerificationCode: ['', '', '', '', '', '']  
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
    if (error) setError('');
  };

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

  const uploadProfileImage = async () => {
    if (!selectedImage || !profileImageUrl) return;

    setImageUploadLoading(true);
    setError('');

    try {
      // const response = await fetch(profileImageUrl, {
      //   method: 'PUT',
      //   body: selectedImage,
      //   headers: {
      //     'Content-Type': selectedImage.type,
      //   },
      // });
      const response = await signupApi.uploadImage(profileImageUrl, selectedImage);


      if (response.ok) {
        setSuccess('Profile image uploaded successfully!');
        setTimeout(() => {
          setStep(4);
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

  const performAutoLogin = async () => {
    setAutoLoginLoading(true);
    setError('');
    setSuccess('');


     try {
          // // console.log('🔄 Attempting login with:', { email, password: '***' });
          
          // const response = await fetch('https://api.gulbhahar.com/api/users/login', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     email: formData.email,
          //     password: formData.password
          //   }),
          // });

          const response = await signupApi.login(formData.email, formData.password);
    
          // console.log('📡 Response status:', response.status);
          
          const data = await response.json();
          // console.log('📦 Full API Response:', data);
          
          if (response.ok) {
            // console.log('✅ Login successful:', data);
            
            const token = data.token || data.accessToken || data.authToken;
            
            if (!token) {
              setError('Login successful but no token received. Please try again.');
              return;
            }
            
            const userData = {
              email: data.user.email || "",
              firstName: data.firstName || data.first_name || data.user?.firstName || data.user.name || '',
              lastName: data.lastName || data.last_name || data.user?.lastName || '',
              userId: data.userId || data.id || data.user?.userId || '',
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
                setSuccess('Please verify your email to continue.');
                setTimeout(() => {
                  window.location.href = '/verify-email';
                }, 1500);
              } else if (data.phoneVerified === false) {
                setSuccess('Please verify your phone number to continue.');
                setTimeout(() => {
                  window.location.href = '/verify-phone';
                }, 1500);
              } else {
                setSuccess('Login successful! Redirecting to Homepage...');
                setTimeout(() => {
                  window.location.href = '/';
                }, 500);
              }
            } else {
              setError('Failed to save login data. Please try again.');
            }
          } else {
            if (response.status === 401) {
              setError('Invalid email or password. Please try again.');
            } else if (response.status === 404) {
              setError('User not found. Please check your email or sign up.');
            } else if (response.status === 429) {
              setError('Too many login attempts. Please try again later.');
            } else {
              setError(data.message || 'Login failed. Please try again.');
            }
          }
        } catch (error) {
          console.error('🚨 Login error:', error);
          
          if (error.name === 'TypeError' && error.message.includes('fetch')) {
            setError('Network error. Please check your connection and try again.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        } finally {
          setAutoLoginLoading(false);
        }
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

    if (value && index < 5) { // Changed from 3 to 5 for 6-digit OTP
      refs.current[index + 1]?.focus();
    }
  };

  const handleEmailVerification = async () => {
    setEmailVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = formData.emailVerificationCode.join('');
    
    if (verificationCode.length !== 6) { // Changed from 4 to 6
      setError('Please enter the complete 6-digit verification code');
      setEmailVerificationLoading(false);
      return;
    }
    
    try {
      // const response = await fetch('https://api.gulbhahar.com/api/users/verify-email', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     verificationCode: verificationCode
      //   }),
      // });
      const response = await signupApi.verifyEmail(formData.email, verificationCode);


      if (response.ok) {
        const data = await response.json();
        setSuccess('Email verified successfully!');
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

  const [phoneSessionId, setPhoneSessionId] = useState(''); // Add this state for sessionId
  
  const initiatePhoneOTP = async () => {
    try {
      setError('');
      setSuccess('');
      // console.log('🔄 Initiating phone OTP for:', formData.phoneNumber);
      
      // const response = await fetch('https://api.gulbhahar.com/codRoutes/initiate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phone: formData.phoneNumber
      //   }),
      // });
      
      const response = await signupApi.initiatePhoneOTP(formData.phoneNumber);
      const data = await response.json();
      // console.log('📱 Phone OTP Response:', data);

      if (response.ok && data.success) {
        setPhoneSessionId(data.sessionId);
        setSuccess(data.message || 'OTP sent on WhatsApp – verify within 2 min.');
        // console.log('✅ Phone OTP initiated successfully, sessionId:', data.sessionId);
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
        console.error('❌ Phone OTP initiation failed:', data);
      }
    } catch (error) {
      console.error('🚨 Error initiating phone OTP:', error);
      setError('Network error. Please try again.');
    }
  };

  const handlePhoneVerification = async () => {
    setPhoneVerificationLoading(true);
    setError('');
    setSuccess('');
    
    const verificationCode = formData.phoneVerificationCode.join('');
    // console.log('🔍 Starting phone verification with code:', verificationCode);
    
    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit verification code');
      setPhoneVerificationLoading(false);
      return;
    }

    if (!phoneSessionId) {
      setError('Session expired. Please request a new OTP.');
      setPhoneVerificationLoading(false);
      return;
    }
    
    try {
      // console.log('🔍 Verifying phone OTP:', verificationCode, 'with sessionId:', phoneSessionId);
      
      // const response = await fetch('https://api.gulbhahar.com/codRoutes/verify', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     sessionId: phoneSessionId,
      //     otp: verificationCode
      //   }),
      // });
      
      const response = await signupApi.verifyPhoneOTP(phoneSessionId, verificationCode);
      const data = await response.json();


      if (response.ok) {
        // console.log('✅ Phone verified successfully, proceeding to auto-login');
        setSuccess('Phone verified successfully! Completing registration...');
        
        // Clear the session ID after successful verification
        setPhoneSessionId('');
        
        // Call auto-login after 1 second delay
        setTimeout(() => {
          // console.log('🚀 Calling performAutoLogin...');
          performAutoLogin();
        }, 1000);
      } else {
        console.error('❌ Phone OTP verification failed:', data);
        setError(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('🚨 Error verifying phone OTP:', error);
      setError('Network error. Please try again.');
    } finally {
      setPhoneVerificationLoading(false);
    }
  };

  const handleResendPhoneOTP = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // console.log('🔄 Resending phone OTP for:', formData.phoneNumber);
      
      // const response = await fetch('https://api.gulbhahar.com/codRoutes/initiate', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phone: formData.phoneNumber
      //   }),
      // });
       
      const response = await signupApi.initiatePhoneOTP(formData.phoneNumber);
      const data = await response.json();

      if (response.ok && data.success) {
        setPhoneSessionId(data.sessionId);
        setSuccess(data.message || 'OTP sent on WhatsApp – verify within 2 min.');
        // Clear the phone verification code inputs
        setFormData(prevState => ({
          ...prevState,
          phoneVerificationCode: ['', '', '', '', '', '']
        }));
        // console.log('✅ Phone OTP resent successfully, new sessionId:', data.sessionId);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to resend OTP. Please try again.');
        console.error('❌ Phone OTP resend failed:', data);
      }
    } catch (error) {
      console.error('🚨 Error resending phone OTP:', error);
      setError('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleResendVerificationCode = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // const response = await fetch('https://api.gulbhahar.com/api/users/resend-verification-code', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: formData.email
      //   }),
      // });
      const response = await signupApi.resendVerificationCode(formData.email);

      if (response.ok) {
        const data = await response.json();
        setSuccess('Verification code sent successfully!');
        setFormData(prevState => ({
          ...prevState,
          emailVerificationCode: ['', '', '', '', '', ''] // 6 empty strings
        }));
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
    
    // try {
    //   const response = await fetch('https://api.gulbhahar.com/api/users/sign-up', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       firstName: formData.firstName,
    //       lastName: formData.lastName,
    //       email: formData.email,
    //       password: formData.password,
    //       location: formData.location,
    //       phoneNumber: formData.phoneNumber,
    //       secQues: formData.securityQuestion,
    //       secAns: formData.securityAnswer
    //     }),
    //   });

            try {
          const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            location: formData.location,
            phoneNumber: formData.phoneNumber,
            secQues: formData.securityQuestion,
            secAns: formData.securityAnswer
          };

          const response = await signupApi.signUp(userData);



      if (response.ok) {
        const data = await response.json();
        
        if (data.imgUploadUrl) {
          setProfileImageUrl(data.imgUploadUrl);
        }
        
        // Automatically initiate phone OTP when user account is created
        // console.log('✅ User account created, initiating phone OTP...');
        await initiatePhoneOTP();
        
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
      handleSignup();
    } else {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className='w-full min-h-screen mt-20'>
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
            <ProgressSteps step={step} />

            {/* Form Content */}
            <div className="mb-8">
              {step === 1 && (
                <PersonalInformation 
                  formData={formData} 
                  handleChange={handleChange} 
                  error={error} 
                />
              )}
              {step === 2 && (
                <Security 
                  formData={formData} 
                  handleChange={handleChange} 
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  error={error} 
                />
              )}
              {step === 3 && (
                <ProfileImageUpload 
                  selectedImage={selectedImage}
                  previewImage={previewImage}
                  fileInputRef={fileInputRef}
                  handleImageSelect={handleImageSelect}
                  error={error}
                  success={success}
                />
              )}
              {step === 4 && (
                <EmailVerification 
                  formData={formData}
                  emailInputRefs={emailInputRefs}
                  handleVerificationCodeChange={handleVerificationCodeChange}
                  handleResendVerificationCode={handleResendVerificationCode}
                  resendLoading={resendLoading}
                  error={error}
                  success={success}
                />
              )}
              {step === 5 && (
                <PhoneVerification 
                  formData={formData}
                  phoneInputRefs={phoneInputRefs}
                  handleVerificationCodeChange={handleVerificationCodeChange}
                  handleResendPhoneOTP={handleResendPhoneOTP}
                  resendLoading={resendLoading}
                  autoLoginLoading={autoLoginLoading}
                  error={error}
                  success={success}
                />
              )}
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
      </div>Welcome Back
    </div>
  );
};

export default SignupPage;