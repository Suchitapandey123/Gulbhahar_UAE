"use client"
import { useState } from "react";
import { MapPin, User, CreditCard, Package, ShoppingBag, Star, Shield } from "lucide-react";
import Link from "next/link";

// Mock components for demonstration
const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">Home</span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Cart</span>
    <span className="text-red-900">/</span>
    <span className="text-red-900 font-semibold bg-red-50 px-3 py-1 rounded-md">Checkout</span>
  </nav>
);

export default function CheckoutComponent() {
  const [shippingMethod, setShippingMethod] = useState("free");
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = () => {
    console.log("Proceeding to payment...", { formData, shippingMethod });
  };

  const cartItems = [
    {
      id: 1,
      name: "Premium Jutti",
      price: 8500,
      image: "🥿",
      quantity: 3,
      color: "Emerald Green",
      size: "M",
    },
    {
      id: 2,
      name: "Classic Jutti",
      price: 8500,
      image: "👠",
      quantity: 2,
      color: "Royal Blue",
      size: "L",
    },
  ];

  const shippingOptions = {
    free: { price: 0, days: "3-5 business days", icon: "🚛" },
    standard: { price: 350, days: "2-3 business days", icon: "📦" },
    express: { price: 750, days: "1-2 business days", icon: "⚡" },
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingOptions[shippingMethod].price;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1600px] mx-auto px-1 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Country Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Shipping Destination</h3>
                  <p className="text-sm text-gray-600">Choose your delivery location</p>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Country *
                </label>
                <div className="relative">
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 pr-12 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 appearance-none bg-red-50/30 hover:bg-red-50"
                  >
                    <option value="">Choose your country</option>
                    <option value="india">🇮🇳 India</option>
                    <option value="usa">🇺🇸 United States</option>
                    <option value="uk">🇬🇧 United Kingdom</option>
                    <option value="canada">🇨🇦 Canada</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <User className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Shipping Address</h3>
                  <p className="text-sm text-gray-600">Enter your delivery details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="+91 12345 67890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="House number and street name"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-semibold text-gray-700 mb-2">
                    State/Region
                  </label>
                  <div className="relative ml-4 sm:ml-0">
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full border-2 border-red-200 rounded-xl p-4 pr-12 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 appearance-none bg-red-50/30 hover:bg-red-50"
                    >
                      <option value="">Select Region</option>
                      <option value="delhi">Delhi</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border-2 border-red-200 rounded-xl p-4 text-gray-700 focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-red-50/30 hover:bg-red-50"
                    placeholder="110001"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method Card */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <Package className="text-white h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Shipping Method</h3>
                  <p className="text-sm text-gray-600">Choose your preferred delivery speed</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(shippingOptions).map(([key, { price, days, icon }]) => (
                  <label
                    key={key}
                    className={`flex items-start sm:items-center p-4 sm:p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-red-50 ${
                      shippingMethod === key
                        ? 'border-red-900 bg-red-50 ring-2 ring-red-200 shadow-md'
                        : 'border-red-200 hover:border-red-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={key}
                      checked={shippingMethod === key}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-900 focus:ring-red-500 focus:ring-2 mt-1 sm:mt-0 flex-shrink-0"
                    />
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      {/* Mobile Layout */}
                      <div className="block sm:hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{icon}</span>
                            <p className="font-bold text-sm text-gray-900 capitalize">
                              {key === 'free' ? 'Free' : key === 'standard' ? 'Standard' : 'Express'} Shipping
                            </p>
                          </div>
                          <span className="font-bold text-sm text-red-900 flex-shrink-0">
                            {price === 0 ? 'FREE' : `₹${price}`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{days}</p>
                          {key === 'express' && (
                            <div className="flex items-center text-xs text-amber-600">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Most Popular
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{icon}</span>
                          <div>
                            <p className="font-bold text-gray-900 capitalize text-lg">
                              {key === 'free' ? 'Free' : key === 'standard' ? 'Standard' : 'Express'} Shipping
                            </p>
                            <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md inline-block">{days}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-xl text-red-900">
                            {price === 0 ? 'FREE' : `₹${price}`}
                          </span>
                          {key === 'express' && (
                            <div className="flex items-center text-xs text-amber-600 mt-1 justify-end">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Most Popular
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <ShoppingBag className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-red-50/50 rounded-xl border border-red-100 hover:bg-red-50 transition-colors">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden p-3">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl flex-shrink-0">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-sm text-gray-900 truncate pr-2">{item.name}</h3>
                            <span className="font-bold text-sm text-red-900 flex-shrink-0">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">{item.color}</span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">Size {item.size}</span>
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            Qty: <span className="text-red-900">{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center space-x-4 p-4">
                      <div className="text-3xl lg:text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">{item.color}</span>
                          <span>•</span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Size {item.size}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1 font-medium">
                          Qty: <span className="text-red-900">{item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-lg text-red-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Summary Section */}
                <div className="border-t-2 border-red-100 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-gray-700 py-1 sm:py-2">
                    <span className="font-medium text-sm sm:text-base">Subtotal</span>
                    <span className="font-bold text-sm sm:text-base">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 py-1 sm:py-2">
                    <span className="font-medium text-sm sm:text-base">Shipping</span>
                    <span className="font-bold text-green-600 text-sm sm:text-base">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 py-1 sm:py-2">
                    <span className="font-medium text-sm sm:text-base">Discount</span>
                    <span className="font-bold text-green-600 text-sm sm:text-base">₹{discount}</span>
                  </div>
                  <div className="border-t-2 border-red-200 pt-3 sm:pt-4 bg-red-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex justify-between text-lg sm:text-2xl font-bold text-red-900">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Link href={'/cart/checkout/payment'} className="hidden sm:inline">Continue to Payment →</Link>
                  <Link href={'/cart/checkout/payment'} className="sm:hidden">Checkout →</Link>
                </button>

                {/* Security Notice */}
                <div className="text-center text-xs sm:text-sm text-gray-600 bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100">
                  <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    <span className="font-semibold text-red-900 text-xs sm:text-sm">Secure Checkout</span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    <span className="font-medium">New customer? </span>
                    <button className="text-red-900 hover:text-red-700 font-bold underline transition-colors">
                      Sign up
                    </button>
                    <span> for exclusive offers! 🎉</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}