// Enhanced transaction-status page that handles both Online Payment and COD

"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, AlertTriangle, ArrowRight, ShoppingBag, Package, Loader2, Banknote, CreditCard } from "lucide-react";

const TransactionStatusContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [backendSent, setBackendSent] = useState(false);
  
  useEffect(() => {
    // Get parameters from URL
    const status = searchParams.get('status');
    const orderId = searchParams.get('orderId') || searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const trackingId = searchParams.get('transactionId') || searchParams.get('tracking_id');
    const error = searchParams.get('error');
    const bankRefNo = searchParams.get('bank_ref_no');
    const statusMessage = searchParams.get('status_message');
    const method = searchParams.get('payment_method'); // 'online' or 'cod'

    console.log('🎯 Transaction Status Page - URL Parameters:', {
      status,
      orderId,
      amount,
      trackingId,
      error,
      bankRefNo,
      statusMessage,
      method
    });

    // Determine payment method
    let detectedMethod = 'online'; // default
    if (method) {
      detectedMethod = method.toLowerCase();
    } else if (trackingId && trackingId.startsWith('COD_')) {
      detectedMethod = 'cod';
    } else if (bankRefNo || statusMessage?.toLowerCase().includes('bank')) {
      detectedMethod = 'online';
    }

    setPaymentMethod(detectedMethod);

    if (status && orderId && trackingId) {
      const transactionData = {
        status: status.toLowerCase(),
        orderId,
        amount,
        trackingId, // Same trackingID logic as before
        error,
        bankRefNo,
        statusMessage,
        paymentMethod: detectedMethod,
        receivedAt: new Date().toISOString()
      };

      setPaymentStatus(status.toLowerCase());
      setPaymentData(transactionData);

      // Send complete checkout data to backend (only for successful payments)
      sendCompleteOrderDataToBackend(transactionData);
    } else {
      console.warn('❌ Missing required parameters:', { status, orderId, trackingId });
      setPaymentStatus('unknown');
    }

    // Show content with animation delay
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 500);
  }, [searchParams]);

  // Function to send complete order data (enhanced for both payment methods)
  const sendCompleteOrderDataToBackend = async (transactionData) => {
    if (backendSent) {
      console.log('⏭️ Backend data already sent, skipping...');
      return;
    }

    // 🎯 ONLY send data to backend if payment is successful
    if (transactionData.status !== 'success') {
      console.log('❌ Payment not successful, NOT sending data to backend');
      console.log('📊 Payment Status:', transactionData.status);
      console.log('💳 Payment Method:', transactionData.paymentMethod);
      setBackendSent(true); // Mark as "sent" to stop trying
      return;
    }

    console.log('✅ Payment successful! Sending complete order data to backend...');
    console.log('💳 Payment Method:', transactionData.paymentMethod);

    try {
      // Get checkout data from localStorage
      const savedCheckoutData = localStorage.getItem('checkoutFormData');
      let checkoutData = {};
      
      if (savedCheckoutData) {
        try {
          checkoutData = JSON.parse(savedCheckoutData);
        } catch (e) {
          console.warn('Could not parse checkout data from localStorage');
        }
      }

      // Generate unique IDs if not available
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

      // Helper function to format phone number
      const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
          cleanPhone = cleanPhone.substring(2);
        }
        return cleanPhone;
      };

      // Helper function to get product images
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

      // Prepare payment object based on method
      const preparePaymentObject = () => {
        const basePayment = {
          amount: transactionData.amount ? parseFloat(transactionData.amount) : 0,
          currency: "INR",
          trackingId: transactionData.trackingId, // 🎯 Same trackingId logic as before
          status: transactionData.status,
          statusMessage: transactionData.statusMessage,
          errorMessage: transactionData.error
        };

        if (transactionData.paymentMethod === 'cod') {
          return {
            ...basePayment,
            method: "COD",
            bankRefNo: null,
            gateway: "COD"
          };
        } else {
          return {
            ...basePayment,
            method: "CCAvenue",
            bankRefNo: transactionData.bankRefNo,
            gateway: "CCAvenue"
          };
        }
      };

      // Prepare complete order data in your backend format
      const completeOrderData = {
        tracking_id: transactionData.trackingId, // 🎯 Use trackingId from URL as transactionId (same logic)
        timestamp: new Date().toISOString(),
        
        order: {
          orderId: transactionData.orderId,
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
          subtotal: checkoutData.orderSubtotal || (transactionData.amount ? parseFloat(transactionData.amount) : 0),
          shipping: checkoutData.orderShipping || 0,
          discount: 0,
          total: transactionData.amount ? parseFloat(transactionData.amount) : (checkoutData.orderTotal || 0),
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

        payment: preparePaymentObject(), // Dynamic payment object based on method

        shipping: {
          method: checkoutData.shippingMethod || "Standard Shipping",
          cost: checkoutData.orderShipping || 0,
          estimatedDelivery: "3-5 business days",
          isFreeShippingApplied: (checkoutData.orderShipping || 0) === 0
        },

        metadata: {
          source: "transaction_status_page",
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          saveInfo: false,
          promocode: null,
          referralCode: null,
          notes: transactionData.paymentMethod === 'cod' ? 'COD Order - OTP Verified' : null,
          paymentCompletedAt: new Date().toISOString()
        },

        security: {
          ipAddress: null, // Backend will capture this
          sessionId: checkoutData.sessionId || generateSessionId(),
          fingerprint: checkoutData.fingerprint || generateFingerprint()
        },

        // Additional transaction status specific data
        transactionStatus: {
          finalStatus: transactionData.status,
          receivedAt: transactionData.receivedAt,
          source: "transaction_status_page",
          isPaymentComplete: transactionData.status === 'success',
          processingSource: `frontend_transaction_status_${transactionData.paymentMethod}`
        }
      };

      console.log('📤 Sending complete order data to backend:', JSON.stringify(completeOrderData, null, 2));

      // Send to your backend endpoint (same endpoint as checkout would use)
      const response = await fetch('https://api.gulbhahar.com/guestorderRoutes/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeOrderData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(errorData.message || 'Failed to send order data');
      }

      const result = await response.json();
      console.log('✅ Backend response:', result);

      setBackendSent(true);

      // Clear localStorage after successful send
      try {
        localStorage.removeItem('checkoutFormData');
        console.log('🗑️ Checkout data cleared from localStorage');
      } catch (e) {
        console.warn('Could not clear localStorage');
      }

      console.log(`🎉 Complete ${transactionData.paymentMethod.toUpperCase()} order data sent to backend successfully`);

    } catch (error) {
      console.error('❌ Error sending complete order data to backend:', error);
      
      // Retry logic (optional)
      setTimeout(() => {
        console.log('🔄 Retrying backend request...');
        sendCompleteOrderDataToBackend(transactionData);
      }, 5000);
    }
  };

  // Function to manually retry sending to backend
  const retryBackendRequest = () => {
    // Only allow retry if payment is successful
    if (paymentData && paymentData.status === 'success') {
      setBackendSent(false);
      sendCompleteOrderDataToBackend(paymentData);
    } else {
      console.log('❌ Cannot retry - payment not successful');
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />;
      case 'failed':
      case 'failure':
        return <XCircle className="w-20 h-20 text-red-500 animate-pulse" />;
      case 'cancelled':
      case 'aborted':
        return <AlertTriangle className="w-20 h-20 text-yellow-500 animate-pulse" />;
      default:
        return <AlertTriangle className="w-20 h-20 text-gray-500" />;
    }
  };

  const getPaymentMethodIcon = () => {
    if (paymentMethod === 'cod') {
      return <Banknote className="h-5 w-5 text-green-600" />;
    } else {
      return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPaymentMethodText = () => {
    if (paymentMethod === 'cod') {
      return {
        text: 'Cash on Delivery',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else {
      return {
        text: 'Online Payment',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      };
    }
  };

  const getStatusMessage = () => {
    const methodInfo = getPaymentMethodText();
    
    switch (paymentStatus) {
      case 'success':
        return {
          title: paymentMethod === 'cod' ? 'COD Order Confirmed! 🎉' : 'Payment Successful! 🎉',
          message: paymentMethod === 'cod' 
            ? 'Your COD order has been confirmed. Pay when your order is delivered to your doorstep!'
            : 'Your payment has been processed successfully. Your order is confirmed!',
          color: 'text-green-600',
          bgColor: 'from-green-50 to-white'
        };
      case 'failed':
      case 'failure':
        return {
          title: paymentMethod === 'cod' ? 'COD Order Failed 😞' : 'Payment Failed 😞',
          message: paymentMethod === 'cod'
            ? 'Your COD order could not be processed. Please try again or contact support.'
            : 'Your payment could not be processed. Please try again or use a different payment method.',
          color: 'text-red-600',
          bgColor: 'from-red-50 to-white'
        };
      case 'cancelled':
      case 'aborted':
        return {
          title: paymentMethod === 'cod' ? 'COD Order Cancelled ⏹️' : 'Payment Cancelled ⏹️',
          message: paymentMethod === 'cod'
            ? 'You have cancelled the COD order process. Your order has not been placed.'
            : 'You have cancelled the payment process. Your order has not been placed.',
          color: 'text-yellow-600',
          bgColor: 'from-yellow-50 to-white'
        };
      default:
        return {
          title: 'Order Status Unknown',
          message: 'We could not determine your order status. Please contact support.',
          color: 'text-gray-600',
          bgColor: 'from-gray-50 to-white'
        };
    }
  };

  const statusInfo = getStatusMessage();
  const methodInfo = getPaymentMethodText();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading transaction status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen mt-6 sm:mt-12 bg-gradient-to-br ${statusInfo.bgColor} flex items-center justify-center p-0 sm:p-3 lg:p-8`}>
      <div className={`bg-white rounded-2xl shadow-2xl border-2 border-red-100 p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-[600px] text-center transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>
        
        {/* Status Icon */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          {getStatusIcon()}
        </div>

        {/* Status Title */}
        <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 ${statusInfo.color} animate-fade-in`}>
          {statusInfo.title}
        </h1>

        {/* Status Message */}
        <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed px-2">
          {statusInfo.message}
        </p>

        {/* Payment Method Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${methodInfo.bgColor} ${methodInfo.borderColor} border-2 mb-4 sm:mb-6`}>
          {getPaymentMethodIcon()}
          <span className={`font-bold text-sm ${methodInfo.color}`}>
            {methodInfo.text}
          </span>
        </div>

        {/* Transaction Details */}
        {paymentData && (
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
            <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-center text-sm sm:text-base">Transaction Details</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {paymentData.orderId && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Order ID:</span>
                  <span className="font-mono text-gray-900 bg-white px-2 py-1 rounded text-xs break-all">{paymentData.orderId}</span>
                </div>
              )}
              {paymentData.trackingId && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Tracking ID:</span>
                  <span className="font-mono text-gray-900 bg-white px-2 py-1 rounded text-xs break-all">{paymentData.trackingId}</span>
                </div>
              )}
              {paymentData.bankRefNo && paymentMethod === 'online' && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-600 font-medium">Bank Ref:</span>
                  <span className="font-mono text-gray-900 bg-white px-2 py-1 rounded text-xs break-all">{paymentData.bankRefNo}</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-200 gap-1 sm:gap-0">
                <span className="text-gray-600 font-medium">Payment Method:</span>
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon()}
                  <span className={`font-bold text-sm ${methodInfo.color}`}>{methodInfo.text}</span>
                </div>
              </div>
              {paymentData.amount && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                  <span className="text-gray-600 font-medium">Amount:</span>
                  <span className="font-bold text-base sm:text-lg text-red-900">₹{parseFloat(paymentData.amount).toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Details */}
        {paymentData?.error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-bold text-red-800 mb-2 text-sm sm:text-base">Error Details</h3>
            <p className="text-xs sm:text-sm text-red-600 break-words">{paymentData.error}</p>
          </div>
        )}

        {/* Order Status Message */}
        {paymentStatus === 'success' && (
          <div className={`${methodInfo.bgColor} border ${methodInfo.borderColor} rounded-xl p-3 sm:p-4 mb-4 sm:mb-6`}>
            <div className="flex items-center justify-center gap-2">
              {backendSent ? (
                <>
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-800 font-medium text-center">
                    {paymentMethod === 'cod' ? 'COD Order Created Successfully' : 'Order Created Successfully'}
                  </span>
                </>
              ) : (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 animate-spin flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-green-800 font-medium text-center">
                    {paymentMethod === 'cod' ? 'Creating Your COD Order...' : 'Creating Your Order...'}
                  </span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          {paymentStatus === 'success' ? (
            <>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Continue Shopping</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>
              <button
                onClick={() => router.push('/orders')}
                className="w-full bg-white border-2 border-red-900 text-red-900 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Package className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Track Order</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/cart/checkout')}
                className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <span>Try Again</span>
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-white border-2 border-red-900 text-red-900 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Continue Shopping</span>
              </button>
            </>
          )}
        </div>

        {/* Support Link */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-500">
            Having issues?{' '}
            <a href="/contact" className="text-red-600 hover:underline font-medium">
              Contact Support
            </a>
          </p>
        </div>

        {/* Success Message */}
        {paymentStatus === 'success' && (
          <div className="text-center bg-gradient-to-r from-green-50 to-green-100 p-3 sm:p-4 rounded-xl border border-green-200">
            <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
              🎊 <strong>Thank you for your order!</strong>
              <br />
              {paymentMethod === 'cod' 
                ? 'Your COD order is confirmed. Pay when delivered!'
                : 'You will receive an order confirmation email shortly.'
              }
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

const TransactionStatusLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading transaction status...</p>
      </div>
    </div>
  );
};

export default function TransactionStatus() {
  return (
    <Suspense fallback={<TransactionStatusLoading />}>
      <TransactionStatusContent />
    </Suspense>
  );
}