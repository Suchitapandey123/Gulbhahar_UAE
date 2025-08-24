"use client"
import { FiLock, FiShield, FiCheck } from 'react-icons/fi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Security = ({ 
  formData, 
  handleChange, 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword, 
  error 
}) => {
  return (
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
};

export default Security;