// src/app/signup/page.jsx
"use client"
import { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FiCheck, FiUpload } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa6';
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
          const response = await signupApi.login(formData.email, formData.password);

          const data = await response.json();

          if (response.ok) {
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
          console.error('Login error:', error);

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

      const response = await signupApi.initiatePhoneOTP(formData.phoneNumber);
      const data = await response.json();

      if (response.ok && data.success) {
        setPhoneSessionId(data.sessionId);
        setSuccess(data.message || 'OTP sent on WhatsApp – verify within 2 min.');
      } else {
        setError(data.message || 'Failed to send OTP. Please try again.');
        console.error('Phone OTP initiation failed:', data);
      }
    } catch (error) {
      console.error('Error initiating phone OTP:', error);
      setError('Network error. Please try again.');
    }
  };

  const handlePhoneVerification = async () => {
    setPhoneVerificationLoading(true);
    setError('');
    setSuccess('');

    const verificationCode = formData.phoneVerificationCode.join('');

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
      const response = await signupApi.verifyPhoneOTP(phoneSessionId, verificationCode);
      const data = await response.json();


      if (response.ok) {
        setSuccess('Phone verified successfully! Completing registration...');

        // Clear the session ID after successful verification
        setPhoneSessionId('');

        // Call auto-login after 1 second delay
        setTimeout(() => {
          performAutoLogin();
        }, 1000);
      } else {
        console.error('Phone OTP verification failed:', data);
        setError(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying phone OTP:', error);
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

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.message || 'Failed to resend OTP. Please try again.');
        console.error('Phone OTP resend failed:', data);
      }
    } catch (error) {
      console.error('Error resending phone OTP:', error);
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
    <div className="w-full min-h-screen overflow-x-hidden mt-20 bg-[#f8f7f6]">
      <div className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center py-6 px-4 sm:px-6">
      {/* Single Card Container */}
            <div className="flex w-full max-w-[1200px] 
      rounded-none md:rounded-3xl 
      bg-white 
      md:h-[85vh] 
      max-h-[720px] 
      overflow-hidden 
      shadow-none md:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)]">
        {/* Left Side - Carousel (50% width) */}
        <div className="hidden md:block md:w-1/2">
          <div className="h-full">
            <Carousel />
          </div>
        </div>

        {/* Right Side - Form (50% width) */}
        <div className="w-full md:w-1/2 flex flex-col bg-white">
          <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-10 lg:p-12 overflow-y-auto">

            {/* Header */}
            <div className="relative pb-6">
              <button
                onClick={() => { window.location.href = '/'; }}
                className="absolute left-0 top-0 text-[#800000] hover:text-[#600000] transition-all duration-300 cursor-pointer p-2 rounded-full hover:bg-[#800000]/5"
              >
                <FaArrowLeft size={18} />
              </button>

              <div className="text-center space-y-1.5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#800000] font-medium">
                  Let&apos;s setup your account
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Create Account
                </h2>
                <p className="text-gray-400 text-sm">
                  Enter your personal information to get started
                </p>
              </div>
            </div>


            {/* Progress Steps */}
            <ProgressSteps step={step} />

            {/* Form Content */}
            <div className="flex-1">
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
              <div className="mt-6 p-4 bg-[#800000]/[0.03] rounded-2xl border border-[#800000]/8">
                <p className="text-gray-500 text-center mb-3 text-sm">
                  Already have an account with this email?
                </p>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-white border border-gray-200 text-[#800000] px-6 py-3 rounded-xl hover:border-[#800000]/30 hover:bg-[#800000]/[0.02] focus:outline-none transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? 'Checking...' : 'Login Instead'}
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center px-5 py-2.5 text-gray-500 hover:text-[#800000] font-medium transition-all duration-300 group text-sm rounded-xl hover:bg-[#800000]/[0.03]"
                  disabled={loading || emailVerificationLoading || phoneVerificationLoading || imageUploadLoading || autoLoginLoading}
                >
                  <IoIosArrowBack className='sm:mr-2 mr-1 group-hover:-translate-x-1 transition-transform duration-300' />
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={loading}
                  className="bg-[#800000] text-white px-10 py-3.5 rounded-xl hover:bg-[#6b0000] focus:outline-none focus:ring-4 focus:ring-[#800000]/15 transition-all duration-300 flex items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Continue
                      <IoIosArrowForward className='ml-2' />
                    </>
                  )}
                </button>
              ) : step === 3 ? (
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setStep(4);
                      setError('');
                    }}
                    className="bg-white border border-gray-200 text-gray-600 px-5 py-3 rounded-xl hover:border-[#800000]/30 hover:text-[#800000] focus:outline-none transition-all duration-300 font-medium text-sm"
                  >
                    Skip for now
                  </button>
                  {selectedImage && (
                    <button
                      onClick={uploadProfileImage}
                      disabled={imageUploadLoading}
                      className="bg-[#800000] text-white px-6 py-3 rounded-xl hover:bg-[#6b0000] focus:outline-none focus:ring-4 focus:ring-[#800000]/15 transition-all duration-300 flex items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                    >
                      {imageUploadLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <FiUpload className='mr-2' />
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
                  className="bg-[#800000] text-nowrap text-white sm:px-10 px-5 py-3 sm:py-3.5 rounded-xl hover:bg-[#6b0000] focus:outline-none focus:ring-4 focus:ring-[#800000]/15 transition-all duration-300 flex items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {emailVerificationLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent sm:mr-2 mr-1"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <FiCheck className='sm:mr-2 mr-1' />
                      Verify Email
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handlePhoneVerification}
                  disabled={phoneVerificationLoading || autoLoginLoading}
                  className="bg-[#800000] text-nowrap text-white sm:px-10 px-5 py-3 sm:py-3.5 rounded-xl hover:bg-[#6b0000] focus:outline-none focus:ring-4 focus:ring-[#800000]/15 transition-all duration-300 flex items-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide"
                >
                  {phoneVerificationLoading || autoLoginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent sm:mr-2 mr-1"></div>
                      {autoLoginLoading ? 'Logging in...' : 'Verifying...'}
                    </>
                  ) : (
                    <>
                      <FiCheck className='sm:mr-2 mr-1' />
                      Complete Registration
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Bottom Login Link */}
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?
                <button
                  onClick={handleLogin}
                  className="ml-1 font-semibold text-[#800000] hover:text-[#6b0000] hover:underline underline-offset-2 transition-all duration-300"
                >
                  Login
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignupPage;