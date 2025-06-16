"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Headphones, 
  Building2, 
  Send, 
  ChevronDown,
  Clock,
  Users,
  Star
} from "lucide-react";

export default function ContactPage() {
  const [queryType, setQueryType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { queryType, ...formData });
    // Handle form submission logic here
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDropdownClick = (type) => {
    setQueryType(type);
    setIsDropdownOpen(false);
  };

  const queryOptions = [
    { value: "Sales Inquiry", icon: "💼", description: "Business sales inquiries" },
    { value: "Technical Support", icon: "🔧", description: "Technical help and support" },
    { value: "General Question", icon: "❓", description: "General questions and info" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 bg-red-50 px-4 py-2 rounded-full mb-4">
            <MessageCircle className="h-5 w-5 text-red-900" />
            <span className="text-sm font-semibold text-red-900">Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact & Support
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Interested in business sales? Message us and our team will get back to you within 24 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-sm text-gray-600">We'd love to hear from you</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Query Type Dropdown */}
                <div className="pb-6 border-b-2 border-red-100">
                  <label className="block text-base sm:text-lg font-bold text-gray-900 mb-3">
                    How can we help you? *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full px-4 py-3 sm:py-4 text-left border-2 border-red-200 rounded-xl bg-red-50/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 flex items-center justify-between hover:bg-red-50"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={queryType ? "text-gray-900 font-medium" : "text-gray-500"}>
                        {queryType || "Select query type"}
                      </span>
                      <ChevronDown className={`h-5 w-5 text-red-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-white border-2 border-red-200 rounded-xl shadow-xl overflow-hidden">
                        {queryOptions.map((option) => (
                          <div
                            key={option.value}
                            className="py-3 px-4 hover:bg-red-50 cursor-pointer transition-colors duration-200 border-b border-red-100 last:border-b-0 flex items-center gap-3"
                            onClick={() => handleDropdownClick(option.value)}
                          >
                            <span className="text-lg">{option.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-900">{option.value}</p>
                              <p className="text-xs text-gray-600">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 12345 67890"
                      className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your city/location"
                      className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 sm:py-4 border-2 border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-900 transition-all duration-200 bg-red-50/30 hover:bg-red-50 min-h-[120px] resize-y"
                      rows="4"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* Sales Contact */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Chat to Sales</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">Business inquiries</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Interested in business sales? Speak to our dedicated sales team
              </p>
              <a 
                href="mailto:sales@gulbhahar.com" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100"
              >
                <Mail className="h-4 w-4" />
                sales@gulbhahar.com
              </a>
            </div>

            {/* Email Support */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Email Support</h3>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-gray-600">Quick response</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Need help? Our support team is here to assist you
              </p>
              <a 
                href="mailto:support@gulbhahar.com" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100"
              >
                <Mail className="h-4 w-4" />
                support@gulbhahar.com
              </a>
            </div>

            {/* Phone Support */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Call Us</h3>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span className="text-xs text-gray-600">Mon - Fri, 9 AM - 5 PM</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Mon - Fri, 9:00 AM - 5:00 PM (UTC/GMT + 05:30)
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 block w-full"
                >
                  <Phone className="h-4 w-4" />
                  +91 9220927241
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="inline-flex hidden items-center gap-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 block w-full"
                >
                  <Phone className="h-4 w-4" />
                  +91 9876543210
                </a>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Office Address</h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span className="text-xs text-gray-600">Visit us</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                S-12, Rajouri Garden, New Delhi-110027
              </p>
              <a 
                href="#" 
                className="inline-flexv hidden items-center gap-2 text-sm font-semibold text-red-900 hover:text-red-700 transition-colors bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100"
              >
                <MapPin className="h-4 w-4" />
                Locate on Map
              </a>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl border-2 border-red-200 p-6 sm:p-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Response Guarantee</h3>
                <p className="text-sm text-gray-700">
                  We typically respond to all inquiries within <span className="font-bold text-red-900">24 hours</span> during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}