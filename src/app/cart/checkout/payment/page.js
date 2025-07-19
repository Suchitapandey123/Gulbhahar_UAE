"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CreditCard, 
  Shield, 
  ShoppingBag, 
  ArrowLeft, 
  Loader2, 
  Lock,
  CheckCircle,
  Clock,
  Star,
  Truck,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 lg:mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">Home</span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Cart</span>
    <span className="text-red-900">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Checkout</span>
    <span className="text-red-900">/</span>
    <span className="text-red-900 font-semibold bg-red-50 px-3 py-1 rounded-md">Payment</span>
  </nav>
);

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.max(1, Math.floor((1 - progress) * target));
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(0);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  return count;
};

// Separate component that uses useSearchParams
function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(2);
  const [checkoutData, setCheckoutData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;
    
    const savedCheckoutData = localStorage.getItem('checkoutFormData');
    
    if (!savedCheckoutData) {
      const defaultData = {
        fullName: "Test User",
        email: "test@example.com",
        phone: "+919876543210",
        address: "123 Test Street",
        city: "Mumbai",
        region: "Maharashtra",
        postalCode: "400001",
        country: "India",
        orderId: orderId || "TEST_ORDER_001",
        orderTotal: amount || 1200,
        orderSubtotal: amount ? parseFloat(amount) - 100 : 1100,
        orderShipping: 100,
        orderItems: [
          {
            id: "test-product-1",
            name: "Test Product",
            price: 1100,
            quantity: 1
          }
        ]
      };
      setCheckoutData(defaultData);
    } else {
      const parsedData = JSON.parse(savedCheckoutData);
      setCheckoutData(parsedData);
    }
    
    setIsLoading(false);
    
    setTimeout(() => setShowContent(true), 300);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitPayment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId, amount]);

  const handleSubmitPayment = () => {
    const form = document.querySelector('form[name="customerData"]');
    if (form) {
      form.submit();
    }
  };

  const handleGoBack = () => {
    router.push('/cart/checkout');
  };

  const handleManualSubmit = () => {
    handleSubmitPayment();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-900/20 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Payment Gateway</h3>
          <p className="text-gray-500">Please wait while we prepare your secure payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <Breadcrumb />
        
        <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            
            {/*Payment Gateway Info */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Main Payment Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-6 lg:p-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-30 transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Lock className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Secure Payment</h2>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        Powered by CCAvenue
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    {/* Animated Payment Icon */}
                    <div className="relative mb-8">
                      <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-red-900 via-red-700 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <CreditCard className="w-16 h-16 lg:w-20 lg:h-20 text-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 w-32 h-32 lg:w-40 lg:h-40 border-4 border-red-300 rounded-full mx-auto animate-ping opacity-20"></div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Redirecting to Payment Gateway
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                      You will be securely redirected to CCAvenue payment gateway to complete your transaction.
                    </p>

                    {/* Countdown with Progress */}
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Clock className="h-6 w-6 text-red-700 animate-pulse" />
                        <span className="text-xl font-bold text-red-800">
                          Auto-redirect in {countdown} seconds
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-red-200 rounded-full h-3 mb-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-red-700 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner"
                          style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-red-600 font-medium">
                        {countdown === 0 ? 'Redirecting now...' : 'Please wait or click Pay Now below'}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handleManualSubmit}
                        disabled={countdown === 0}
                        className="bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-red-800 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CreditCard className="h-6 w-6" />
                        {countdown === 0 ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Redirecting...
                          </>
                        ) : (
                          'Pay Now'
                        )}
                      </button>
                      
                      <button
                        onClick={handleGoBack}
                        className="bg-white border-2 border-red-300 text-red-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-red-50 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">SSL Encrypted</h3>
                  <p className="text-sm text-gray-600">256-bit encryption</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">PCI Compliant</h3>
                  <p className="text-sm text-gray-600">Secure standards</p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Trusted Gateway</h3>
                  <p className="text-sm text-gray-600">Millions of users</p>
                </div>
              </div>
            </div>

            {/* Right- Order Summary */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-6 lg:p-8 sticky top-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-900 to-red-700 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <ShoppingBag className="text-white h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Order ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{checkoutData?.orderId || 'TEST_ORDER_001'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Customer:</span>
                    <span className="font-bold text-gray-900 text-right">{checkoutData?.fullName || 'Test User'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Items:</span>
                    <span className="font-bold text-red-900">{checkoutData?.orderItems?.length || 1} item(s)</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-bold text-gray-900">₹{(checkoutData?.orderSubtotal || 1100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping:</span>
                      <span className={`font-bold ${(checkoutData?.orderShipping || 100) === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                        {(checkoutData?.orderShipping || 100) === 0 ? 'FREE' : `₹${(checkoutData?.orderShipping || 100).toLocaleString()}`}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-red-900">₹{(checkoutData?.orderTotal || 1200).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{checkoutData?.email || 'test@example.com'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{checkoutData?.phone || '+919876543210'}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{checkoutData?.address || '123 Test Street'}</p>
                      <p className="truncate">{checkoutData?.city || 'Mumbai'}, {checkoutData?.region || 'Maharashtra'} {checkoutData?.postalCode || '400001'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-green-800">100% Secure Payment</h3>
                </div>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Your payment information is encrypted
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    No card details stored on our servers
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Trusted by millions of customers
                  </li>
                </ul>
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
          <input type="hidden" name="merchant_id" value="4371009" />
          <input type="hidden" name="order_id" value={checkoutData?.orderId || 'TEST_ORDER_001'} />
          <input type="hidden" name="currency" value="INR" />
          <input type="hidden" name="amount" value={checkoutData?.orderTotal || '1200.00'} />
          <input type="hidden" name="redirect_url" value="https://api.gulbhahar.com/ccavResponseHandler" />
          <input type="hidden" name="cancel_url" value="https://api.gulbhahar.com/ccavResponseHandler" />
          <input type="hidden" name="language" value="EN" />

          {/* Billing information */}
          <input type="hidden" name="billing_name" value={checkoutData?.fullName || 'Peter'} />
          <input type="hidden" name="billing_address" value={checkoutData?.address || 'Santacruz'} />
          <input type="hidden" name="billing_city" value={checkoutData?.city || 'Mumbai'} />
          <input type="hidden" name="billing_state" value={checkoutData?.region || 'MH'} />
          <input type="hidden" name="billing_zip" value={checkoutData?.postalCode || '400054'} />
          <input type="hidden" name="billing_country" value={checkoutData?.country || 'India'} />
          <input type="hidden" name="billing_tel" value={checkoutData?.phone || '9876543210'} />
          <input type="hidden" name="billing_email" value={checkoutData?.email || 'testing@domain.com'} />

          {/* Shipping information */}
          <input type="hidden" name="delivery_name" value={checkoutData?.fullName || 'Sam'} />
          <input type="hidden" name="delivery_address" value={checkoutData?.address || 'Vile Parle'} />
          <input type="hidden" name="delivery_city" value={checkoutData?.city || 'Mumbai'} />
          <input type="hidden" name="delivery_state" value={checkoutData?.region || 'Maharashtra'} />
          <input type="hidden" name="delivery_zip" value={checkoutData?.postalCode || '400038'} />
          <input type="hidden" name="delivery_country" value={checkoutData?.country || 'India'} />
          <input type="hidden" name="delivery_tel" value={checkoutData?.phone || '0123456789'} />

          {/* Merchant parameters */}
          <input type="hidden" name="merchant_param1" value="additional Info." />
          <input type="hidden" name="merchant_param2" value="additional Info." />
          <input type="hidden" name="merchant_param3" value="additional Info." />
          <input type="hidden" name="merchant_param4" value="additional Info." />
          <input type="hidden" name="merchant_param5" value="additional Info." />

          {/* Optional fields */}
          <input type="hidden" name="promo_code" value="" />
          <input type="hidden" name="customer_identifier" value={checkoutData?.phone || ''} />
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Loading fallback component
function PaymentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-red-900/20 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Payment Page</h3>
        <p className="text-gray-500">Please wait...</p>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}