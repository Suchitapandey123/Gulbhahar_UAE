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
  AlertCircle
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

// Phone OTP Verification Modal Component
const PhoneOTPModal = ({ isOpen, onClose, onVerify, phone, isVerifying, error, sessionId }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
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
      
      // Auto-focus next input
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
      onVerify(codeString, sessionId, false); // Pass OTP, sessionId, and isResend=false
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Call the same initiate API for resending OTP
      const response = await fetch('https://api.gulbhahar.com/codRoutes/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone.replace(/\D/g, '') // Remove non-digits from phone number
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setTimeLeft(600); // Reset to 10 minutes
          setCanResend(false);
          setVerificationCode(['', '', '', '', '', '']);
          console.log('✅ OTP resent successfully:', result.message);
          // Update sessionId in parent component
          onVerify(null, result.sessionId, true); // Pass isResend=true
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Phone</h3>
          <p className="text-gray-600">
            We've sent a 6-digit verification code via WhatsApp to<br />
            <span className="font-semibold text-green-900">{phone}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-2">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-green-200 rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all"
                maxLength="1"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            </div>
          )}

          <div className="text-center">
            {!canResend ? (
              <p className="text-gray-600">
                Resend OTP in <span className="font-bold text-green-600">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-green-600 font-semibold hover:text-green-700 transition-colors disabled:opacity-50"
              >
                {isResending ? 'Resending...' : 'Resend OTP'}
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={verificationCode.join('').length !== 6 || isVerifying}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              verificationCode.join('').length === 6 && !isVerifying
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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

// Separate component that uses useSearchParams
function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'
  const [isProcessingCOD, setIsProcessingCOD] = useState(false);
  const [showPhoneOTPModal, setShowPhoneOTPModal] = useState(false);
  const [phoneVerification, setPhoneVerification] = useState({
    isVerifying: false,
    error: null
  });
  const [otpSessionId, setOtpSessionId] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;
    
    const savedCheckoutData = localStorage.getItem('checkoutFormData');
    
    if (!savedCheckoutData) {
      // If no checkout data found, redirect back to checkout
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
      // Use fallback data for testing
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
          cod: true // Default to COD available for testing
        }
      };
      setCheckoutData(defaultData);
    }
    
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  }, [orderId, amount, router]);

  const handleOnlinePayment = () => {
    setCountdown(2);
    
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
  };

  const handleCODPayment = async () => {
    // Verify checkout data before proceeding
    if (!checkoutData) {
      alert('Checkout data not found. Please go back and complete checkout.');
      router.push('/cart/checkout');
      return;
    }

    // Verify required fields
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

    console.log('📋 COD Payment - Using checkout data:', checkoutData);

    setIsProcessingCOD(true);
    
    // Send OTP to phone
    try {
      console.log('📱 Sending OTP to phone:', checkoutData.phone);
      
      // Clean phone number - remove all non-digits
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
          console.log('✅ OTP sent:', result.message);
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
    // If this is a resend operation, just update the sessionId
    if (isResend) {
      setOtpSessionId(sessionId);
      return;
    }

    setPhoneVerification({ isVerifying: true, error: null });
    
    try {
      console.log('🔍 Verifying phone with OTP:', verificationCode);
      console.log('🔑 Using sessionId:', sessionId);
      
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
        console.log('✅ Phone verified:', result.message);
        
        // Phone verified successfully, process COD order
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
    try {
      // Get fresh checkout data from localStorage (this should have all user data)
      const savedCheckoutData = localStorage.getItem('checkoutFormData');
      let checkoutData = {};
      
      if (savedCheckoutData) {
        try {
          checkoutData = JSON.parse(savedCheckoutData);
          console.log('📋 Retrieved checkout data for COD:', checkoutData);
        } catch (e) {
          console.warn('Could not parse checkout data from localStorage');
        }
      } else {
        console.warn('⚠️ No checkout data found in localStorage');
        throw new Error('Checkout data not found. Please go back and complete the checkout form.');
      }

      // Generate unique IDs similar to checkout page
      const generateTransactionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `COD_${timestamp}_${random}`.toUpperCase();
      };

      const generateSessionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `SESSION_${timestamp}_${random}`.toUpperCase();
      };

      const generateFingerprint = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          ctx.textBaseline = 'top';
          ctx.font = '14px Arial';
          ctx.fillText('Browser fingerprint', 2, 2);
          
          const screen = `${window.screen.width}x${window.screen.height}`;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const language = navigator.language;
          const platform = navigator.platform;
          
          const fingerprint = btoa(`${canvas.toDataURL()}_${screen}_${timezone}_${language}_${platform}`);
          return `FP_${fingerprint.substring(0, 16)}`;
        } catch (error) {
          return `FP_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        }
      };

      const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
          cleanPhone = cleanPhone.substring(2);
        }
        return cleanPhone;
      };

      const getProductImages = (item) => {
        if (!item) return [];
        
        try {
          if (item.images && Array.isArray(item.images)) {
            if (item.images.length > 0 && Array.isArray(item.images[0])) {
              const colorIndex = item.selectedColorIndex || 0;
              const colorImages = item.images[colorIndex];
              if (colorImages && Array.isArray(colorImages)) {
                return colorImages;
              }
              return item.images[0] || [];
            } else {
              return item.images;
            }
          }
          
          if (item.image) {
            return Array.isArray(item.image) ? item.image : [item.image];
          }
          
          if (item.currentMainImage) {
            return [item.currentMainImage];
          }
          
          return [];
        } catch (error) {
          console.warn('Error getting product images:', error);
          return [];
        }
      };

      const trackingId = generateTransactionId();

      // Prepare complete order data for COD
      const completeOrderData = {
        tracking_id: trackingId,
        timestamp: new Date().toISOString(),
        
        order: {
          orderId: checkoutData?.orderId,
          items: (checkoutData.orderItems || []).map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            selectedColor: item.selectedColor || null,
            selectedSize: item.selectedSize || null,
            productImage: getProductImages(item)
          })),
          itemCount: (checkoutData.orderItems || []).length,
          totalQuantity: (checkoutData.orderItems || []).reduce((sum, item) => sum + item.quantity, 0),
          subtotal: checkoutData.orderSubtotal || 0,
          shipping: checkoutData.orderShipping || 0,
          discount: 0,
          total: checkoutData.orderTotal || 0,
          currency: "INR"
        },

        customer: {
          fullName: checkoutData.fullName || "Guest Customer",
          email: checkoutData.email || "",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          userId: null
        },

        shippingAddress: {
          fullName: checkoutData.fullName || "Guest Customer",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          addressLine1: checkoutData.address || "",
          city: checkoutData.city || "",
          state: checkoutData.region || "",
          postalCode: checkoutData.postalCode || "",
          country: checkoutData.country || "India",
          isDefault: false
        },

        billingAddress: {
          fullName: checkoutData.fullName || "Guest Customer",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          addressLine1: checkoutData.address || "",
          city: checkoutData.city || "",
          state: checkoutData.region || "",
          postalCode: checkoutData.postalCode || "",
          country: checkoutData.country || "India",
          sameAsShipping: true
        },

        payment: {
          method: "COD",
          amount: checkoutData.orderTotal || 0,
          currency: "INR",
          trackingId: trackingId,
          bankRefNo: null,
          status: "success", // COD orders are marked as success after OTP verification
          statusMessage: "Cash on Delivery - OTP Verified",
          errorMessage: null,
          gateway: "COD"
        },

        shipping: {
          method: checkoutData.shippingMethod || "Standard Shipping",
          cost: checkoutData.orderShipping || 0,
          estimatedDelivery: "3-5 business days",
          isFreeShippingApplied: (checkoutData.orderShipping || 0) === 0
        },

        metadata: {
          source: "payment_page_cod",
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          saveInfo: false,
          promocode: null,
          referralCode: null,
          notes: "COD Order - OTP Verified",
          paymentCompletedAt: new Date().toISOString()
        },

        security: {
          ipAddress: null,
          sessionId: checkoutData.sessionId || generateSessionId(),
          fingerprint: checkoutData.fingerprint || generateFingerprint()
        },

        transactionStatus: {
          finalStatus: "success",
          receivedAt: new Date().toISOString(),
          source: "payment_page_cod",
          isPaymentComplete: true,
          processingSource: "frontend_cod_payment"
        }
      };

      console.log('📤 Sending COD order data to backend:', JSON.stringify(completeOrderData, null, 2));

      // Send to backend
      const response = await fetch('https://api.gulbhahar.com/guestorderRoutes/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeOrderData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || 'Failed to place COD order');
      }

      const result = await response.json();
      console.log('✅ COD Order placed successfully:', result);

      // 🎯 IMPORTANT: Don't clear localStorage yet - let transaction-status page read it first
      // We'll clear it in the transaction-status page after sending to backend
      
      console.log('🔄 Redirecting to transaction-status page...');

      // Redirect to success page with all necessary parameters
      const redirectUrl = `/cart/checkout/payment/transaction-status?status=success&orderId=${checkoutData?.orderId}&amount=${checkoutData?.orderTotal}&transactionId=${trackingId}&payment_method=cod`;
      console.log('🔗 Redirect URL:', redirectUrl);
      
      router.push(redirectUrl);

    } catch (error) {
      console.error('❌ Error processing COD order:', error);
      setPhoneVerification({ 
        isVerifying: false, 
        error: 'Failed to place order. Please try again.' 
      });
    }
  };

  const handleSubmitPayment = () => {
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
            
            {/* Payment Method Selection */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Payment Options Card */}
              <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-transparent rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-50 to-transparent rounded-full opacity-30 transform -translate-x-12 translate-y-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Lock className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Choose Payment Method</h2>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        Secure Payment Options
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="space-y-4 mb-8">
                    {/* Online Payment Option */}
                    <label className={`flex items-center p-6 border-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                      paymentMethod === 'online'
                        ? 'border-red-600 bg-red-50 ring-2 ring-red-200'
                        : 'border-red-200 hover:border-red-300 hover:bg-red-50'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-red-600 focus:ring-red-500"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                              <CreditCard className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Online Payment (Pre-Paid)</h3>
                              <p className="text-sm text-gray-600">Pay securely with Card, UPI, Net Banking</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Instant Confirmation
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                  SSL Encrypted
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>

                    {/* COD Option */}
                    <label className={`flex items-center p-6 border-2 rounded-2xl transition-all duration-200 ${
                      checkoutData?.deliveryInfo?.cod
                        ? `cursor-pointer ${
                            paymentMethod === 'cod'
                              ? 'border-green-600 bg-green-50 ring-2 ring-green-200'
                              : 'border-green-200 hover:border-green-300 hover:bg-green-50'
                          }`
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => checkoutData?.deliveryInfo?.cod && setPaymentMethod(e.target.value)}
                        disabled={!checkoutData?.deliveryInfo?.cod}
                        className="w-5 h-5 text-green-600 focus:ring-green-500 disabled:cursor-not-allowed"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                              checkoutData?.deliveryInfo?.cod
                                ? 'bg-gradient-to-br from-green-600 to-green-700'
                                : 'bg-gray-400'
                            }`}>
                              <Banknote className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold ${
                                checkoutData?.deliveryInfo?.cod ? 'text-gray-900' : 'text-gray-500'
                              }`}>
                                Cash on Delivery (COD)
                              </h3>
                              <p className={`text-sm ${
                                checkoutData?.deliveryInfo?.cod ? 'text-gray-600' : 'text-gray-400'
                              }`}>
                                Pay when your order is delivered
                              </p>
                              {checkoutData?.deliveryInfo?.cod ? (
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Phone OTP Verification
                                  </span>
                                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Available
                                  </span>
                                </div>
                              ) : (
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block">
                                  Not Available for this location
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Payment Action Section */}
                  {paymentMethod === 'online' && (
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
                          <CreditCard className="w-16 h-16 lg:w-20 lg:h-20 text-white animate-pulse" />
                        </div>
                        <div className="absolute inset-0 w-32 h-32 lg:w-40 lg:h-40 border-4 border-blue-300 rounded-full mx-auto animate-ping opacity-20"></div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {countdown !== null ? 'Redirecting to Payment Gateway' : 'Ready for Secure Payment'}
                      </h3>
                      
                      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        {countdown !== null 
                          ? 'You will be securely redirected to CCAvenue payment gateway to complete your transaction.'
                          : 'Click below to proceed to our secure payment gateway powered by CCAvenue.'
                        }
                      </p>

                      {countdown !== null && (
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                          <div className="flex items-center justify-center gap-3 mb-4">
                            <Clock className="h-6 w-6 text-blue-700 animate-pulse" />
                            <span className="text-xl font-bold text-blue-800">
                              Auto-redirect in {countdown} seconds
                            </span>
                          </div>
                          
                          <div className="w-full bg-blue-200 rounded-full h-3 mb-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-blue-700 h-3 rounded-full transition-all duration-1000 ease-out shadow-inner"
                              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-blue-600 font-medium">
                            {countdown === 0 ? 'Redirecting now...' : 'Please wait or click Pay Now below'}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleOnlinePayment}
                          disabled={countdown !== null && countdown === 0}
                          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <CreditCard className="h-6 w-6" />
                          {countdown !== null && countdown === 0 ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Redirecting...
                            </>
                          ) : (
                            'Pay Now - Online'
                          )}
                        </button>
                        
                        <button
                          onClick={handleGoBack}
                          className="bg-white border-2 border-blue-300 text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
                        >
                          <ArrowLeft className="h-5 w-5" />
                          Go Back
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-center">
                      <div className="relative mb-8">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
                          <Banknote className="w-16 h-16 lg:w-20 lg:h-20 text-white animate-pulse" />
                        </div>
                        <div className="absolute inset-0 w-32 h-32 lg:w-40 lg:h-40 border-4 border-green-300 rounded-full mx-auto animate-ping opacity-20"></div>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        Cash on Delivery
                      </h3>
                      
                      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                        Pay when your order is delivered to your doorstep. We'll send an OTP to your phone for verification.
                      </p>

                      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <Phone className="h-6 w-6 text-green-700" />
                          <span className="text-xl font-bold text-green-800">
                            Phone OTP Verification Required
                          </span>
                        </div>
                        <p className="text-sm text-green-600 font-medium">
                          We'll send a verification code to {checkoutData?.phone || 'your phone'} to confirm your order
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleCODPayment}
                          disabled={isProcessingCOD}
                          className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-green-900 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessingCOD ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Sending WhatsApp OTP...
                            </>
                          ) : (
                            <>
                              <Banknote className="h-6 w-6" />
                              Place COD Order
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={handleGoBack}
                          className="bg-white border-2 border-green-300 text-green-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-50 hover:border-green-400 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:scale-105"
                        >
                          <ArrowLeft className="h-5 w-5" />
                          Go Back
                        </button>
                      </div>
                    </div>
                  )}
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

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Payment Method:</span>
                    <span className={`font-bold ${paymentMethod === 'cod' ? 'text-green-900' : 'text-blue-900'}`}>
                      {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                    </span>
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

              {/* Payment Method Notice */}
              {paymentMethod === 'cod' ? (
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Banknote className="h-6 w-6 text-green-600" />
                    <h3 className="font-bold text-green-800">Cash on Delivery</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Pay when your order is delivered
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      WhatsApp OTP verification for security
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      No advance payment required
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <h3 className="font-bold text-blue-800">100% Secure Payment</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-blue-700">
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
              )}
            </div>
          </div>
        </div>

        {/* Hidden CCAvenue Form - Only for Online Payments */}
        {paymentMethod === 'online' && (
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