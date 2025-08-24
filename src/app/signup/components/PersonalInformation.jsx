// src/app/signup/components/PersonalInformation.jsx
"use client"
import { FiUser, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const PersonalInformation = ({ formData, handleChange, error }) => {
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 10);
    
    // Create a synthetic event object for the parent handler
    const syntheticEvent = {
      target: {
        name: 'phoneNumber',
        value: numericValue
      }
    };
    
    handleChange(syntheticEvent);
  };

  return (
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
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="1234567890"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              required
              maxLength={10}
              className="w-full pl-20 pr-4 py-4 border-2 border-red-200 rounded-xl focus:border-red-900 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-red-50/30"
            />
          </div>
          <p className="text-xs text-red-600 ml-1">Enter 10-digit mobile number without +91</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;