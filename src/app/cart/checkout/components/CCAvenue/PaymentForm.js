// Replace your existing payment page with this CCAvenue integration
// /pages/cart/checkout/payment.js

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Shield, ShoppingBag, ArrowLeft } from "lucide-react";

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

const CCAvenue = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [checkoutData, setCheckoutData] = useState(null);

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Get checkout data from localStorage
    const savedCheckoutData = localStorage.getItem('checkoutFormData');
    
    if (!savedCheckoutData || !orderId) {
      router.push('/cart/checkout');
      return;
    }

    const parsedData = JSON.parse(savedCheckoutData);
    setCheckoutData(parsedData);
    setIsLoading(false);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit the form
          const form = document.querySelector('form[name="customerData"]');
          if (form) {
            form.submit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId, router]);

  const handleManualSubmit = () => {
    const form = document.querySelector('form[name="customerData"]');
    if (form) {
      form.submit();
    }
  };

  const handleGoBack = () => {
    router.push('/cart/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading payment...</p>
        </div>
      </div>
    );
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Order not found</h2>
          <button 
            onClick={() => router.push('/cart/checkout')}
            className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
          >
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Gateway Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Secure Payment</h2>
                  <p className="text-sm text-gray-600">Powered by CCAvenue</p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Redirecting to Payment Gateway
                </h3>
                
                <p className="text-gray-600 mb-6">
                  You will be redirected to CCAvenue secure payment gateway to complete your payment.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">
                    <strong>Auto-redirect in {countdown} seconds...</strong>
                  </p>
                  <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-900 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleManualSubmit}
                    className="bg-gradient-to-r from-red-900 to-red-800 text-white px-6 py-3 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Pay Now
                  </button>
                  
                  <button
                    onClick={handleGoBack}
                    className="bg-white border-2 border-red-900 text-red-900 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-bold text-gray-900">Security Information</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  256-bit SSL encryption
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  PCI DSS compliant
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  No card details stored
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Trusted by millions
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <ShoppingBag className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-bold text-gray-900">{orderId}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-bold text-gray-900">{checkoutData.fullName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-bold text-gray-900">{checkoutData.email}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-bold text-gray-900">{checkoutData.orderItems?.length || 0}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-bold">₹{checkoutData.orderSubtotal?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-bold text-green-600">
                      {checkoutData.orderShipping === 0 ? 'FREE' : `₹${checkoutData.orderShipping?.toLocaleString() || '0'}`}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-red-900">
                      <span>Total:</span>
                      <span>₹{amount?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-900">{checkoutData.fullName}</p>
                <p>{checkoutData.address}</p>
                <p>{checkoutData.city}, {checkoutData.region} {checkoutData.postalCode}</p>
                <p>{checkoutData.country}</p>
                <p>{checkoutData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden CCAvenue Form */}
        <form 
          method="POST" 
          name="customerData" 
          action="https://api.gulbhahar.com/ccavRequestHandler"
          style={{ display: 'none' }}
        >
          {/* Compulsory fields */}
          <input type="hidden" name="merchant_id" value="" />
          <input type="hidden" name="order_id" value={orderId || ''} />
          <input type="hidden" name="currency" value="INR" />
          <input type="hidden" name="amount" value={amount || '0.00'} />
          <input type="hidden" name="redirect_url" value="https://api.gulbhahar.com/ccavResponseHandler" />
          <input type="hidden" name="cancel_url" value="https://api.gulbhahar.com/ccavResponseHandler" />
          <input type="hidden" name="language" value="EN" />

          {/* Billing information */}
          <input type="hidden" name="billing_name" value={checkoutData.fullName || ''} />
          <input type="hidden" name="billing_address" value={checkoutData.address || ''} />
          <input type="hidden" name="billing_city" value={checkoutData.city || ''} />
          <input type="hidden" name="billing_state" value={checkoutData.region || ''} />
          <input type="hidden" name="billing_zip" value={checkoutData.postalCode || ''} />
          <input type="hidden" name="billing_country" value={checkoutData.country || 'India'} />
          <input type="hidden" name="billing_tel" value={checkoutData.phone || ''} />
          <input type="hidden" name="billing_email" value={checkoutData.email || ''} />

          {/* Shipping information */}
          <input type="hidden" name="delivery_name" value={checkoutData.fullName || ''} />
          <input type="hidden" name="delivery_address" value={checkoutData.address || ''} />
          <input type="hidden" name="delivery_city" value={checkoutData.city || ''} />
          <input type="hidden" name="delivery_state" value={checkoutData.region || ''} />
          <input type="hidden" name="delivery_zip" value={checkoutData.postalCode || ''} />
          <input type="hidden" name="delivery_country" value={checkoutData.country || 'India'} />
          <input type="hidden" name="delivery_tel" value={checkoutData.phone || ''} />

          {/* Merchant parameters */}
          <input type="hidden" name="merchant_param1" value={`items_${checkoutData.orderItems?.length || 0}`} />
          <input type="hidden" name="merchant_param2" value={`subtotal_${checkoutData.orderSubtotal || 0}`} />
          <input type="hidden" name="merchant_param3" value={`shipping_${checkoutData.orderShipping || 0}`} />
          <input type="hidden" name="merchant_param4" value={`customer_${checkoutData.phone || ''}`} />
          <input type="hidden" name="merchant_param5" value="source_website" />

          {/* Optional fields */}
          <input type="hidden" name="promo_code" value="" />
          <input type="hidden" name="customer_identifier" value={checkoutData.phone || ''} />
        </form>
      </div>
    </div>
  );
};

const PaymentPageContent = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading payment...</p>
        </div>
      </div>
    }>
      <CCAvenue />
    </Suspense>
  );
};

export default PaymentPageContent;