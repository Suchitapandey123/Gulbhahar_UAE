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
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50/80 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password *</label>
          <div className="relative group">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors duration-300"
            >
              {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Confirm Password *</label>
          <div className="relative group">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors duration-300"
            >
              {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="securityQuestion" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Security question *</label>
          <div className="relative group">
            <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <select
              id="securityQuestion"
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white text-sm appearance-none"
            >
              <option value="">Select a question</option>
              <option value="petName">What is your pet&apos;s name?</option>
              <option value="birthCity">What city were you born in?</option>
              <option value="mothersMaiden">What is your mother&apos;s maiden name?</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="securityAnswer" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Security answer *</label>
          <div className="relative group">
            <FiCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type="text"
              id="securityAnswer"
              name="securityAnswer"
              placeholder="Your answer"
              value={formData.securityAnswer}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
