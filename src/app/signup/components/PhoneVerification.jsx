// src/app/signup/components/PhoneVerification.jsx
"use client"
import { FiPhone } from 'react-icons/fi';

const PhoneVerification = ({ 
  formData, 
  phoneInputRefs, 
  handleVerificationCodeChange,
  handleResendPhoneOTP,
  resendLoading, 
  autoLoginLoading, 
  error, 
  success 
}) => {
  return (
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
          <p className="text-red-600 mt-2">Please enter the 6-digit code below to complete your registration</p>
          <p className="text-sm text-green-600 mt-2 font-medium">📱 Check your WhatsApp for the OTP</p>
        </div>
        
        <div className="flex justify-center space-x-2 sm:space-x-4">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => phoneInputRefs.current[index] = el}
              type="text"
              name={`phone-code-${index}`}
              maxLength={1}
              value={formData.phoneVerificationCode[index]}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value, 'phone')}
              onKeyDown={(e) => {
                // Handle backspace navigation
                if (e.key === 'Backspace' && !formData.phoneVerificationCode[index] && index > 0) {
                  phoneInputRefs.current[index - 1]?.focus();
                }
              }}
              disabled={autoLoginLoading}
              className="w-12 h-12 sm:w-16 sm:h-16 text-center border-2 border-red-300 rounded-xl text-lg sm:text-2xl font-bold text-red-900 focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30 disabled:opacity-50"
            />
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-red-600">Didn't receive the code on WhatsApp?</p>
          <button 
            onClick={handleResendPhoneOTP}
            disabled={autoLoginLoading || resendLoading}
            className="text-red-900 font-semibold underline hover:text-red-700 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;