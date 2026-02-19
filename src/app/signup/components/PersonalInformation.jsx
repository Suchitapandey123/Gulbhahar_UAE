// src/app/signup/components/PersonalInformation.jsx
"use client"
import { FiUser, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const PersonalInformation = ({ formData, handleChange, error }) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    const syntheticEvent = {
      target: {
        name: 'phoneNumber',
        value: numericValue
      }
    };
    handleChange(syntheticEvent);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50/80 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">First name *</label>
          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="James"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Last name *</label>
          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Jakob"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email address *</label>
          <div className="relative group">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Location *</label>
          <div className="relative group">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone number *</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
            <FiPhone className="text-gray-300 w-4 h-4 group-focus-within:text-[#800000] transition-colors duration-300" />
            <span className="text-gray-400 text-sm ml-2 border-r border-gray-200 pr-2.5">+91</span>
          </div>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="9876543210"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            required
            maxLength={10}
            inputMode="numeric"
            className="w-full pl-[5.5rem] pr-4 py-3.5 border border-gray-200 rounded-xl focus:border-[#800000] focus:outline-none focus:ring-4 focus:ring-[#800000]/8 transition-all duration-300 bg-gray-50/50 focus:bg-white placeholder:text-gray-300 text-sm"
          />
        </div>
        <p className="text-xs text-gray-300 mt-1.5 ml-1">10-digit mobile number</p>
      </div>
    </div>
  );
};

export default PersonalInformation;
