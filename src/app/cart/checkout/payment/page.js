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
  MapPin,
  Banknote,
  AlertCircle,
  Smartphone,
  Building2,
  Zap,
  User,
  Calendar,
  Globe,
  Eye,
  EyeOff,
  Wallet
} from "lucide-react";

const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">Home</span>
    <span className="text-gray-300">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Cart</span>
    <span className="text-gray-300">/</span>
    <span className="hover:text-red-900 transition-colors cursor-pointer">Checkout</span>
    <span className="text-gray-300">/</span>
    <span className="text-red-900 font-medium bg-red-50 px-3 py-1 rounded-full">Payment</span>
  </nav>
);

// Phone OTP Verification Modal Component
const PhoneOTPModal = ({ isOpen, onClose, onVerify, phone, isVerifying, error, sessionId }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [isOpen, timeLeft]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = () => {
    const codeString = verificationCode.join('');
    if (codeString.length === 6) {
      onVerify(codeString, sessionId, false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await fetch('https://api.gulbhahar.com/codRoutes/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone.replace(/\D/g, '')
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setTimeLeft(120);
          setCanResend(false);
          setVerificationCode(['', '', '', '', '', '']);
          onVerify(null, result.sessionId, true);
        } else {
          throw new Error(result.message || 'Failed to resend OTP');
        }
      } else {
        throw new Error('Failed to resend OTP');
      }
    } catch (error) {
      console.error('❌ Error resending OTP:', error);
    } finally {
      setIsResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Verify Your Phone</h3>
          <p className="text-gray-600 leading-relaxed">
            We've sent a 6-digit verification code via WhatsApp to<br />
            <span className="font-semibold text-red-900">{phone}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all outline-none"
                maxLength="1"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-600">
                Resend OTP in <span className="font-bold text-red-900">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-red-900 font-semibold hover:text-red-700 transition-colors disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={verificationCode.join('').length !== 6 || isVerifying}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              verificationCode.join('').length === 6 && !isVerifying
                ? 'bg-red-900 text-white hover:bg-red-800 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment Method Card Component
const PaymentMethodCard = ({ 
  icon: Icon, 
  title, 
  description, 
  badges, 
  isSelected, 
  onClick, 
  disabled = false,
  gradient = "from-blue-500 to-blue-600"
}) => (
  <label className={`block cursor-pointer transition-all duration-300 ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
    <div className={`relative p-3 border-2 rounded-xl transition-all duration-300 ${
      isSelected 
        ? 'border-red-900 bg-red-50 shadow-lg scale-[1.02]' 
        : disabled
        ? 'border-gray-200 bg-gray-50'
        : 'border-gray-200 hover:border-red-300 hover:bg-red-25 hover:shadow-md'
    }`}>
      <input
        type="radio"
        name="paymentMethod"
        checked={isSelected}
        onChange={onClick}
        disabled={disabled}
        className="sr-only"
      />
      
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-red-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>
          
          <div className="flex gap-2 flex-wrap">
            {badges.map((badge, index) => (
              <span 
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  badge.type === 'success' ? 'bg-green-100 text-green-700' :
                  badge.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                  badge.type === 'info' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </label>
);

// Security Badge Component
const SecurityBadge = ({ icon: Icon, title, description, color = "red" }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
    <div className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className={`h-6 w-6 text-${color}-700`} />
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Separate component that uses useSearchParams
function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessingCOD, setIsProcessingCOD] = useState(false);
  const [isProcessingOnline, setIsProcessingOnline] = useState(false);
  const [showPhoneOTPModal, setShowPhoneOTPModal] = useState(false);
  const [phoneVerification, setPhoneVerification] = useState({
    isVerifying: false,
    error: null
  });
  const [otpSessionId, setOtpSessionId] = useState(null);

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedCheckoutData = localStorage.getItem('checkoutFormData');
    
    if (!savedCheckoutData) {
      console.warn('⚠️ No checkout data found, redirecting to checkout page');
      router.push('/cart/checkout');
      return;
    }

    try {
      const parsedData = JSON.parse(savedCheckoutData);
      console.log('📋 Loaded checkout data:', parsedData);
      setCheckoutData(parsedData);
    } catch (e) {
      console.error('❌ Error parsing checkout data:', e);
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
        ],
        deliveryInfo: {
          cod: true
        }
      };
      setCheckoutData(defaultData);
    }
    
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  }, [orderId, amount, router]);

  const handleOnlinePayment = () => {
    setIsProcessingOnline(true);
    // Process online payment without auto-redirect
    setTimeout(() => {
      handleSubmitPayment();
    }, 1000);
  };

  const handleCODPayment = async () => {
    if (!checkoutData) {
      alert('Checkout data not found. Please go back and complete checkout.');
      router.push('/cart/checkout');
      return;
    }

    const requiredFields = ['fullName', 'email', 'phone', 'orderId', 'orderTotal'];
    const missingFields = requiredFields.filter(field => !checkoutData[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields in checkout data:', missingFields);
      alert(`Missing required information: ${missingFields.join(', ')}. Please go back and complete checkout.`);
      router.push('/cart/checkout');
      return;
    }

    if (!checkoutData?.deliveryInfo?.cod) {
      alert('COD is not available for this location');
      return;
    }

    setIsProcessingCOD(true);
    
    try {
      const cleanPhone = checkoutData.phone.replace(/\D/g, '');
      
      const response = await fetch('https://api.gulbhahar.com/codRoutes/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: cleanPhone
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setOtpSessionId(result.sessionId);
          setShowPhoneOTPModal(true);
        } else {
          throw new Error(result.message || 'Failed to send OTP');
        }
      } else {
        throw new Error('Failed to send OTP');
      }
      
      setIsProcessingCOD(false);
    } catch (error) {
      console.error('❌ Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
      setIsProcessingCOD(false);
    }
  };

  const handlePhoneVerify = async (verificationCode, sessionId, isResend = false) => {
    if (isResend) {
      setOtpSessionId(sessionId);
      return;
    }

    setPhoneVerification({ isVerifying: true, error: null });
    
    try {
      const response = await fetch('https://api.gulbhahar.com/codRoutes/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          otp: verificationCode
        })
      });

      if (response.ok) {
        const result = await response.json();
        await processCODOrder();
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Invalid OTP' }));
        throw new Error(errorData.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('❌ Phone verification failed:', error);
      setPhoneVerification({ 
        isVerifying: false, 
        error: error.message || 'Phone verification failed. Please try again.' 
      });
    }
  };

  const processCODOrder = async () => {
    // COD order processing logic here
    const redirectUrl = `/cart/checkout/payment/transaction-status?status=success&orderId=${checkoutData?.orderId}&amount=${checkoutData?.orderTotal}&transactionId=COD_${Date.now()}&payment_method=cod`;
    router.push(redirectUrl);
  };

  const handleSubmitPayment = () => {
    // Create form element programmatically
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://api.gulbhahar.com/ccavRequestHandler';
    form.style.display = 'none';

    // Add form fields
    const formData = {
      merchant_id: "4371009",
      order_id: checkoutData?.orderId || 'TEST_ORDER_001',
      currency: "INR",
      amount: checkoutData?.orderTotal || '1200.00',
      redirect_url: "https://api.gulbhahar.com/ccavResponseHandler",
      cancel_url: "https://api.gulbhahar.com/ccavResponseHandler",
      language: "EN",
      billing_name: checkoutData?.fullName || 'Peter',
      billing_address: checkoutData?.address || 'Santacruz',
      billing_city: checkoutData?.city || 'Mumbai',
      billing_state: checkoutData?.region || 'MH',
      billing_zip: checkoutData?.postalCode || '400054',
      billing_country: checkoutData?.country || 'India',
      billing_tel: checkoutData?.phone || '9876543210',
      billing_email: checkoutData?.email || 'testing@domain.com',
      delivery_name: checkoutData?.fullName || 'Sam',
      delivery_address: checkoutData?.address || 'Vile Parle',
      delivery_city: checkoutData?.city || 'Mumbai',
      delivery_state: checkoutData?.region || 'Maharashtra',
      delivery_zip: checkoutData?.postalCode || '400038',
      delivery_country: checkoutData?.country || 'India',
      delivery_tel: checkoutData?.phone || '0123456789',
      merchant_param1: "additional Info.",
      merchant_param2: "additional Info.",
      merchant_param3: "additional Info.",
      merchant_param4: "additional Info.",
      merchant_param5: "additional Info.",
      promo_code: "",
      customer_identifier: checkoutData?.phone || ''
    };

    // Create hidden inputs
    Object.keys(formData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key];
      form.appendChild(input);
    });

    // Append to body and submit
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handleGoBack = () => {
    router.push('/cart/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Payment Gateway</h3>
          <p className="text-gray-500">Preparing your secure payment experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-14 sm:mt-20 bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Breadcrumb />
        
        <div className={`transform transition-all duration-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Payment Method Selection */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Header */}
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Choose Payment Method
                </h1>
                <p className="text-gray-600 text-lg mb-8 flex items-center justify-center lg:justify-start gap-2">
                  <Shield className="h-5 w-5 text-red-900" />
                  Secure & encrypted payment options
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <PaymentMethodCard
                  icon={CreditCard}
                  title="Online Payment"
                  description="Credit/Debit Card, UPI, Net Banking, or Digital Wallets"
                  badges={[
                    { text: "Instant Confirmation", type: "success" },
                    { text: "SSL Encrypted", type: "info" },
                    // { text: "Multiple Options", type: "info" }
                  ]}
                  isSelected={paymentMethod === 'online'}
                  onClick={() => setPaymentMethod('online')}
                  gradient="from-red-800 to-red-900"
                />

                <PaymentMethodCard
                  icon={Banknote}
                  title="Cash on Delivery"
                  description="Pay when your order is delivered to your doorstep. Phone verification required."
                  badges={[
                    { text: "OTP Verification", type: "warning" },
                    checkoutData?.deliveryInfo?.cod 
                      ? { text: "Available", type: "success" }
                      : { text: "Not Available", type: "error" }
                  ]}
                  isSelected={paymentMethod === 'cod'}
                  onClick={() => checkoutData?.deliveryInfo?.cod && setPaymentMethod('cod')}
                  disabled={!checkoutData?.deliveryInfo?.cod}
                  gradient="from-red-800 to-red-900"
                />
              </div>

              {/* Payment Action */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                {paymentMethod === 'online' ? (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <CreditCard className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Secure Online Payment
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                      You'll be redirected to our secure payment gateway powered by CCAvenue to complete your transaction.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <button
                        onClick={handleOnlinePayment}
                        disabled={isProcessingOnline}
                        className="flex-1 bg-gradient-to-r from-red-800 to-red-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-900 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessingOnline ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="h-5 w-5" />
                            Pay ₹{(checkoutData?.orderTotal || 1200).toLocaleString()}
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={handleGoBack}
                        className="flex-1 bg-white border-2 border-red-300 text-red-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-800 to-red-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Banknote className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Cash on Delivery
                    </h3>
                    
                    <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                      Pay when your order arrives. We'll send an OTP to your phone for verification.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <Smartphone className="h-5 w-5 text-red-900" />
                        <span className="font-semibold text-red-900">Phone Verification Required</span>
                      </div>
                      <p className="text-sm text-red-800">
                        OTP will be sent to {checkoutData?.phone || 'your phone'}
                      </p>
                    </div>

                    <div className="flex text-nowrap flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <button
                        onClick={handleCODPayment}
                        disabled={isProcessingCOD}
                        className="flex-1 bg-gradient-to-r from-red-800 to-red-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-900 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessingCOD ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <Banknote className="h-5 w-5 text-nowrap" />
                            Place COD Order
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={handleGoBack}
                        className="flex-1 bg-white border-2 border-red-300 text-red-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SecurityBadge
                  icon={Shield}
                  title="SSL Encrypted"
                  description="256-bit encryption protects your data"
                  color="red"
                />
                <SecurityBadge
                  icon={CheckCircle}
                  title="PCI Compliant"
                  description="Meets highest security standards"
                  color="red"
                />
                <SecurityBadge
                  icon={Star}
                  title="Trusted Gateway"
                  description="Used by millions of customers"
                  color="red"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 sticky top-8">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-800 to-red-900 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <ShoppingBag className="text-white h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Order ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-lg">{checkoutData?.orderId || 'TEST_ORDER_001'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Customer:</span>
                    <span className="font-semibold text-gray-900 text-right">{checkoutData?.fullName || 'Test User'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Items:</span>
                    <span className="font-semibold text-red-900">{checkoutData?.orderItems?.length || 1} item(s)</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Payment Method:</span>
                    <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                      paymentMethod === 'cod' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold text-gray-900">₹{(checkoutData?.orderSubtotal || 1100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping:</span>
                      <span className={`font-semibold ${(checkoutData?.orderShipping || 100) === 0 ? 'text-green-600' : 'text-gray-900'}`}>
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
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-4 w-4 text-red-900" />
                    <span className="truncate">{checkoutData?.email || 'test@example.com'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-4 w-4 text-red-900" />
                    <span>{checkoutData?.phone || '+919876543210'}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-900" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{checkoutData?.address || '123 Test Street'}</p>
                      <p className="truncate">{checkoutData?.city || 'Mumbai'}, {checkoutData?.region || 'Maharashtra'} {checkoutData?.postalCode || '400001'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form Data - Prepared for submission */}
        {paymentMethod === 'online' && (
          <div style={{ display: 'none' }}>
            {/* Form data will be prepared and submitted programmatically */}
          </div>
        )}

        {/* Phone OTP Verification Modal */}
        <PhoneOTPModal
          isOpen={showPhoneOTPModal}
          onClose={() => setShowPhoneOTPModal(false)}
          onVerify={handlePhoneVerify}
          phone={checkoutData?.phone || '+919876543210'}
          isVerifying={phoneVerification.isVerifying}
          error={phoneVerification.error}
          sessionId={otpSessionId}
        />
      </div>
    </div>
  );
}

function PaymentLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-red-200 rounded-full animate-spin mx-auto mb-6"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
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