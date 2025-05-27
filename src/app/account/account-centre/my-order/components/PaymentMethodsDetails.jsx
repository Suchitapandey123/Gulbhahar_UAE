import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Trash2, 
  Plus, 
  Shield, 
  CheckCircle,
  ChevronRight 
} from 'lucide-react';

// Mock payment method icons
const UPIIcon = () => (
  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
    <span className="text-blue-600 font-semibold text-xs">UPI</span>
  </div>
);

const VisaIcon = () => (
  <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-xs">VISA</span>
  </div>
);

const MasterCardIcon = () => (
  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-xs">MC</span>
  </div>
);

const PayPalIcon = () => (
  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
    <span className="text-white font-bold text-xs">PP</span>
  </div>
);

export default function PaymentDetailsPage() {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [selectedNewMethod, setSelectedNewMethod] = useState("");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleNewMethodSelect = (method) => {
    setSelectedNewMethod(method);
    setShowCreditCardForm(method === "credit-card");
  };

  const handleRemove = () => {
    alert("Payment method removed!");
  };

  const handleSave = () => {
    alert("Payment method saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-900 rounded-lg">
              <CreditCard className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                Payment Methods
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Manage your saved payment options</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-20 sm:w-24" />
        </div>

        {/* Saved Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-red-900 w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Saved Payment Methods</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* UPI Method */}
            <div
              className={`group relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                selectedMethod === "upi" 
                  ? "border-red-900 bg-red-50 shadow-md" 
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50/50"
              }`}
              onClick={() => handleSelect("upi")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`relative ${selectedMethod === "upi" ? "text-red-900" : "text-gray-400"}`}>
                    <input
                      type="radio"
                      name="saved-method"
                      checked={selectedMethod === "upi"}
                      readOnly
                      className="w-4 h-4 accent-red-900"
                    />
                    {selectedMethod === "upi" && (
                      <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-red-900 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-blue-600 w-5 h-5" />
                    <div>
                      <span className="font-medium text-gray-900">UPI ID: 1234567@okaxis</span>
                      <p className="text-xs text-gray-500">Instant payments</p>
                    </div>
                  </div>
                </div>
                <UPIIcon />
              </div>
              {selectedMethod === "upi" && (
                <div className="absolute top-0 right-0 w-6 h-6 bg-red-900 rounded-bl-lg rounded-tr-xl">
                  <CheckCircle className="w-4 h-4 text-white m-1" />
                </div>
              )}
            </div>

            {/* Visa Card Method */}
            <div
              className={`group relative rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
                selectedMethod === "visa" 
                  ? "border-red-900 bg-red-50 shadow-md" 
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50/50"
              }`}
              onClick={() => handleSelect("visa")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`relative ${selectedMethod === "visa" ? "text-red-900" : "text-gray-400"}`}>
                    <input
                      type="radio"
                      name="saved-method"
                      checked={selectedMethod === "visa"}
                      readOnly
                      className="w-4 h-4 accent-red-900"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-blue-600 w-5 h-5" />
                    <div>
                      <span className="font-medium text-gray-900">Credit Card ending 7908</span>
                      <p className="text-xs text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                </div>
                <VisaIcon />
              </div>
              {selectedMethod === "visa" && (
                <div className="absolute top-0 right-0 w-6 h-6 bg-red-900 rounded-bl-lg rounded-tr-xl">
                  <CheckCircle className="w-4 h-4 text-white m-1" />
                </div>
              )}
            </div>
          </div>

          {/* Remove Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors duration-200 text-sm sm:text-base"
            >
              <Trash2 className="w-4 h-4" />
              Remove Selected
            </button>
          </div>
        </div>

        {/* Add New Payment Method Section */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="text-red-900 w-5 h-5" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Payment Method</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* Credit Card Option */}
            <div className="rounded-xl border-2 border-gray-200 hover:border-red-300 transition-colors duration-200">
              <div
                className="p-4 cursor-pointer"
                onClick={() => handleNewMethodSelect("credit-card")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="new-method" 
                      checked={selectedNewMethod === "credit-card"}
                      readOnly
                      className="w-4 h-4 accent-red-900" 
                    />
                    <CreditCard className="text-gray-600 w-5 h-5" />
                    <span className="font-medium text-gray-900">Credit Card</span>
                  </div>
                  <div className="flex gap-2">
                    <MasterCardIcon />
                    <VisaIcon />
                  </div>
                </div>
              </div>

              {/* Credit Card Form */}
              {showCreditCardForm && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      className="w-full border border-gray-300 p-3 rounded-lg focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-colors text-sm sm:text-base" 
                    />
                    <input 
                      type="text" 
                      placeholder="Name on Card" 
                      className="w-full border border-gray-300 p-3 rounded-lg focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-colors text-sm sm:text-base" 
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="border border-gray-300 p-3 rounded-lg focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-colors text-sm sm:text-base" 
                      />
                      <input 
                        type="text" 
                        placeholder="CVV" 
                        className="border border-gray-300 p-3 rounded-lg focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-colors text-sm sm:text-base" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PayPal Option */}
            <div 
              className="rounded-xl border-2 border-gray-200 hover:border-red-300 p-4 cursor-pointer transition-colors duration-200"
              onClick={() => handleNewMethodSelect("paypal")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="new-method" 
                    checked={selectedNewMethod === "paypal"}
                    readOnly
                    className="w-4 h-4 accent-red-900" 
                  />
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <span className="font-medium text-gray-900">PayPal</span>
                </div>
                <PayPalIcon />
              </div>
            </div>

            {/* UPI Option */}
            <div 
              className="rounded-xl border-2 border-gray-200 hover:border-red-300 p-4 cursor-pointer transition-colors duration-200"
              onClick={() => handleNewMethodSelect("upi")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="new-method" 
                    checked={selectedNewMethod === "upi"}
                    readOnly
                    className="w-4 h-4 accent-red-900" 
                  />
                  <Smartphone className="text-blue-600 w-5 h-5" />
                  <span className="font-medium text-gray-900">UPI</span>
                </div>
                <UPIIcon />
              </div>
            </div>
          </div>

          {/* Save & Verify Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              <Shield className="w-4 h-4" />
              Verify and Save
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-900">
            <Shield className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">Your payment information is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}