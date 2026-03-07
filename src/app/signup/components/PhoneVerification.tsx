// @ts-nocheck
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
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50/80 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50/80 text-green-600 px-4 py-2.5 rounded-xl text-sm border border-green-100">
          {success}
        </div>
      )}

      {autoLoginLoading && (
        <div className="bg-blue-50/80 text-blue-600 px-4 py-2.5 rounded-xl text-sm flex items-center border border-blue-100">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
          Logging you in automatically...
        </div>
      )}

      <div className="text-center space-y-6 py-6">
        <div className="w-16 h-16 bg-[#800000]/[0.06] rounded-2xl flex items-center justify-center mx-auto">
          <FiPhone className="w-7 h-7 text-[#800000]" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">Verify your phone</h3>
          <p className="text-gray-400 text-sm mt-1.5">
            Code sent to <span className="font-medium text-gray-600">+91 {formData.phoneNumber}</span>
          </p>
          <p className="text-xs text-green-600 mt-1.5 font-medium">Check your WhatsApp for the OTP</p>
        </div>

        <div className="flex justify-center gap-2.5 sm:gap-3">
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
                if (e.key === 'Backspace' && !formData.phoneVerificationCode[index] && index > 0) {
                  phoneInputRefs.current[index - 1]?.focus();
                }
              }}
              disabled={autoLoginLoading}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center border-2 border-gray-200 rounded-xl text-lg font-bold text-gray-900 focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white disabled:opacity-50"
            />
          ))}
        </div>

        <div>
          <p className="text-gray-300 text-sm">Didn&apos;t receive the code?</p>
          <button
            onClick={handleResendPhoneOTP}
            disabled={autoLoginLoading || resendLoading}
            className="text-[#800000] font-semibold text-sm hover:text-[#6b0000] transition-colors duration-300 mt-1.5 disabled:opacity-50"
          >
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
