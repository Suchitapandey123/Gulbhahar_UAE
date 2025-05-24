"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { CreditCard, Shield, MapPin, User, Package, ShoppingBag, Star, CheckCircle } from "lucide-react";

// Mock Breadcrumb component
const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">Home</span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Cart</span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Checkout</span>
    <span className="text-red-900">/</span>
    <span className="text-red-900 font-semibold bg-red-50 px-3 py-1 rounded-md">Payment</span>
  </nav>
);

// Mock payment icons
const Mastercard = () => (
  <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
);

const Visa = () => (
  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
);

const PayPal = () => (
  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
);

const UPI = () => (
  <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">UPI</div>
);

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

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const router = useRouter();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 350;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handlePayment = () => {
    router.push("/cart/checkout/payment/transaction-status");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:mt-20">
          <Breadcrumb />
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <CreditCard className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Method</h2>
                  <p className="text-sm text-gray-600">Choose your preferred payment option</p>
                </div>
              </div>
              
              {/* Credit Card Option */}
              <div className={`rounded-xl border-2 mb-4 transition-all duration-200 ${
                paymentMethod === "credit-card" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200 shadow-md" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4 sm:p-6" 
                  onClick={() => setPaymentMethod("credit-card")}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "credit-card"} 
                      readOnly 
                      className="h-5 w-5 text-red-900 focus:ring-red-500" 
                    />
                    <span className="text-base sm:text-lg font-bold text-gray-900">Credit Card</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Mastercard />
                    <Visa />
                  </div>
                </label>
                {paymentMethod === "credit-card" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4 sm:p-6 space-y-4">
                      <input 
                        type="text" 
                        placeholder="Card Number" 
                        className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                      <input 
                        type="text" 
                        placeholder="Name on Card" 
                        className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                        />
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          className="border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* PayPal Option */}
              <div className={`rounded-xl border-2 mb-4 transition-all duration-200 ${
                paymentMethod === "paypal" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200 shadow-md" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4 sm:p-6" 
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "paypal"} 
                      readOnly 
                      className="h-5 w-5 text-red-900 focus:ring-red-500" 
                    />
                    <span className="text-base sm:text-lg font-bold text-gray-900">PayPal</span>
                  </div>
                  <PayPal />
                </label>
                {paymentMethod === "paypal" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4 sm:p-6">
                      <input 
                        type="email" 
                        placeholder="PayPal Email ID" 
                        className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                    </div>
                  </>
                )}
              </div>

              {/* UPI Option */}
              <div className={`rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === "upi" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200 shadow-md" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4 sm:p-6" 
                  onClick={() => setPaymentMethod("upi")}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={paymentMethod === "upi"} 
                      readOnly 
                      className="h-5 w-5 text-red-900 focus:ring-red-500" 
                    />
                    <span className="text-base sm:text-lg font-bold text-gray-900">UPI</span>
                  </div>
                  <UPI />
                </label>
                {paymentMethod === "upi" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4 sm:p-6">
                      <input 
                        type="text" 
                        placeholder="UPI ID (e.g. name@upi)" 
                        className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Billing Address</h2>
                  <p className="text-sm text-gray-600">Enter your billing information</p>
                </div>
              </div>

              {/* Same as Shipping Checkbox */}
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <input 
                  type="checkbox" 
                  id="same-address" 
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="h-5 w-5 text-red-900 focus:ring-red-500" 
                />
                <label htmlFor="same-address" className="text-gray-700 text-sm sm:text-base font-medium">
                  Same as my shipping address
                </label>
              </div>

              <div className="space-y-4 sm:space-y-6">  
                <div>
                  <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                  />
                </div>

                <div>
                  <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">
                    Street Name and House Number
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter your house number and street name" 
                    className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                  />
                </div>

                {/* City and Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">City</label>
                    <input 
                      type="text" 
                      placeholder="City" 
                      className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                    />
                  </div>
                  <div>
                    <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">Region</label>
                    <select className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30">
                      <option>Select Region</option>
                      <option>Delhi</option>
                      <option>Mumbai</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    placeholder="Postal code" 
                    className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                  />
                </div>

                <div>
                  <label className="font-bold text-sm sm:text-base text-gray-700 block mb-2">Country</label>
                  <select className="w-full border-2 border-red-200 p-3 sm:p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30">
                    <option>Select country</option>
                    <option>🇮🇳 India</option>
                    <option>🇺🇸 USA</option>
                    <option>🇬🇧 UK</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Info */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-6 sm:p-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <Shield className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Remember Information</h2>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <input 
                  type="checkbox" 
                  id="save-info"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="h-5 w-5 text-red-900 focus:ring-red-500" 
                />
                <label htmlFor="save-info" className="text-sm sm:text-base text-gray-700 font-medium">
                  Save my information for future checkout
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-red-100 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-8 hover:shadow-xl hover:border-red-200 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-900 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <ShoppingBag className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Your Order</h2>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-red-50/50 rounded-xl border border-red-100 hover:bg-red-50 transition-colors p-3 sm:p-4">
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-start space-x-3 mb-2">
                        <div className="text-xl flex-shrink-0">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-gray-900 leading-tight">{item.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium text-xs">{item.color}</span>
                            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium text-xs">Size {item.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-600 font-medium">
                          Qty: <span className="text-red-900 font-bold">{item.quantity}</span>
                        </div>
                        <span className="font-bold text-sm text-red-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Tablet Layout */}
                    <div className="hidden sm:block lg:hidden">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl flex-shrink-0">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">{item.color}</span>
                            <span>•</span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">Size {item.size}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1 font-medium">
                            Qty: <span className="text-red-900 font-bold">{item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-base text-red-900 flex-shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl flex-shrink-0">{item.image}</div>
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="font-bold text-base xl:text-lg text-gray-900 leading-tight break-words">{item.name}</h3>
                          <div className="flex flex-wrap items-center gap-1 xl:gap-2 text-xs xl:text-sm text-gray-600 mt-1">
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs whitespace-nowrap">{item.color}</span>
                            <span className="hidden xl:inline">•</span>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs whitespace-nowrap">Size {item.size}</span>
                          </div>
                          <div className="text-xs xl:text-sm text-gray-600 mt-1 font-medium">
                            Qty: <span className="text-red-900 font-bold">{item.quantity}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="font-bold text-sm xl:text-lg text-red-900 whitespace-nowrap">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Order Summary */}
                <div className="border-t-2 border-red-100 pt-3 sm:pt-4 lg:pt-6 space-y-2 sm:space-y-3 lg:space-y-4">
                  <div className="flex justify-between text-gray-700 py-1">
                    <span className="font-medium text-sm sm:text-base">Subtotal</span>
                    <span className="font-bold text-sm sm:text-base">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 py-1">
                    <span className="font-medium text-sm sm:text-base">Shipping</span>
                    <span className="font-bold text-sm sm:text-base">₹{shipping}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 py-1">
                    <span className="font-medium text-sm sm:text-base">Discount</span>
                    <span className="font-bold text-green-600 text-sm sm:text-base">₹{discount}</span>
                  </div>
                  <div className="border-t-2 border-red-200 pt-2 sm:pt-3 lg:pt-4 bg-red-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex justify-between font-bold text-red-900">
                      <span className="text-base sm:text-lg lg:text-xl">Grand Total</span>
                      <span className="text-base sm:text-lg lg:text-xl">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Link href={"/cart/checkout/payment/transaction-status"} className="hidden sm:inline">Complete Payment →</Link>
                  <Link href={"/cart/checkout/payment/transaction-status"} className="sm:hidden">Pay Now →</Link>
                </button>

                {/* Customer Notice */}
                <div className="text-center bg-red-50 p-3 sm:p-4 rounded-xl border border-red-100">
                  <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    <span className="font-semibold text-red-900 text-xs sm:text-sm">Secure Payment</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    <span className="font-medium">New customer? </span>
                    <Link href="#" className="text-red-900 hover:text-red-700 font-bold underline transition-colors">
                      Sign up
                    </Link>
                    <span> for better offers! 🎉</span>
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