"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Calendar, CreditCard, Package, ShoppingBag, Star, ArrowRight, XCircle, AlertTriangle } from "lucide-react";
import { useCart } from "@/Providers/ContextProviders/CartContext";

// Confetti component
const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ['#dc2626', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];
    const newConfetti = [];
    
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      });
    }
    
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 opacity-80"
          style={{
            left: `${piece.x}%`,
            top: `-10px`,
            backgroundColor: piece.color,
            animation: `confetti-fall ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Animated Success/Error Icon
const AnimatedStatusIcon = ({ status }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowIcon(true), 500);
    const timer2 = setTimeout(() => setShowPulse(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'from-green-500 to-green-600',
          textColor: 'text-green-600'
        };
      case 'failed':
        return {
          icon: XCircle,
          bgColor: 'from-red-500 to-red-600',
          textColor: 'text-red-600'
        };
      case 'pending':
        return {
          icon: AlertTriangle,
          bgColor: 'from-yellow-500 to-yellow-600',
          textColor: 'text-yellow-600'
        };
      default:
        return {
          icon: CheckCircle,
          bgColor: 'from-green-500 to-green-600',
          textColor: 'text-green-600'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className="relative">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-br ${config.bgColor} rounded-full flex items-center justify-center shadow-lg transform transition-all duration-700 ${showIcon ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
        <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white transform transition-all duration-500 ${showIcon ? 'scale-100' : 'scale-0'}`} />
      </div>
    </div>
  );
};

// Animated Counter
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [target, duration]);

  return <span>₹{count.toLocaleString()}</span>;
};

export default function TransactionStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, clearCart } = useCart();
  
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  // Get transaction details from URL params
  const status = searchParams.get('status') || 'success';
  const txnId = searchParams.get('txnId') || '';
  const error = searchParams.get('error') || '';

  // Get current image for cart items
  const getCurrentImage = (item) => {
    if (!item) return '/Image/About1.png';
    
    try {
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        if (Array.isArray(item.images[0])) {
          const colorIndex = item.selectedColorIndex || 0;
          const colorImages = item.images[colorIndex];
          if (colorImages && Array.isArray(colorImages) && colorImages.length > 0) {
            return colorImages[0] || '/Image/About1.png';
          }
          if (item.images[0] && Array.isArray(item.images[0]) && item.images[0].length > 0) {
            return item.images[0][0] || '/Image/About1.png';
          }
        } else {
          return item.images[0] || '/Image/About1.png';
        }
      }
      
      if (item.image) {
        return Array.isArray(item.image) ? item.image[0] || '/Image/About1.png' : item.image;
      }
      
      if (item.currentMainImage) {
        return item.currentMainImage;
      }
      
      return '/Image/About1.png';
    } catch (error) {
      console.warn('Error getting image for item:', item?.id, error);
      return '/Image/About1.png';
    }
  };

  // Get customer data from localStorage
  const getCustomerData = () => {
    try {
      const checkoutData = localStorage.getItem('checkoutFormData');
      if (checkoutData) {
        return JSON.parse(checkoutData);
      }
    } catch (error) {
      console.warn('Could not retrieve customer data:', error);
    }
    return { email: 'customer@example.com', fullName: 'Customer' };
  };

  // Calculate totals
  const subtotal = cart && Array.isArray(cart) ? cart.reduce((sum, item) => {
    if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
      return sum;
    }
    return sum + (item.price * item.quantity);
  }, 0) : 0;

  const isFreeShippingEligible = subtotal >= 5000;
  const shipping = isFreeShippingEligible ? 0 : 350;
  const discount = 0;
  const total = subtotal + shipping - discount;

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 300);
    const timer2 = setTimeout(() => {
      if (status === 'success') {
        setShowConfetti(true);
      }
    }, 800);
    const timer3 = setTimeout(() => setShowConfetti(false), 5000);
    
    // Set transaction data
    const customerData = getCustomerData();
    setTransactionData({
      id: txnId,
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      customer: customerData,
      paymentMethod: 'Credit Card', // This could be retrieved from payment data
      shippingMethod: isFreeShippingEligible ? 'Free Shipping' : 'Standard Shipping',
      items: cart || []
    });

    // Clear cart on successful payment
    if (status === 'success') {
      // Clear cart after a delay to allow user to see the items
      setTimeout(() => {
        clearCart();
      }, 5000);
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [status, txnId, cart, clearCart, subtotal, isFreeShippingEligible]);

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          title: 'Payment Successful! 🎉',
          subtitle: 'Your order has been confirmed',
          bgColor: 'from-green-50 to-white',
          borderColor: 'border-green-200'
        };
      case 'failed':
        return {
          title: 'Payment Failed 😞',
          subtitle: 'There was an issue processing your payment',
          bgColor: 'from-red-50 to-white',
          borderColor: 'border-red-200'
        };
      case 'pending':
        return {
          title: 'Payment Pending ⏳',
          subtitle: 'Your payment is being processed',
          bgColor: 'from-yellow-50 to-white',
          borderColor: 'border-yellow-200'
        };
      default:
        return {
          title: 'Transaction Status',
          subtitle: 'Please check your payment status',
          bgColor: 'from-gray-50 to-white',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Redirect if no cart items and not success status
  if ((!cart || cart.length === 0) && status !== 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No transaction found</h2>
          <Link href="/" className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      {showConfetti && status === 'success' && <Confetti />}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className={`bg-white rounded-2xl shadow-2xl border-2 border-red-100 overflow-hidden transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>
          
          {/* Status Header */}
          <div className={`text-center px-6 sm:px-10 lg:px-16 py-8 sm:py-12 lg:py-16 bg-gradient-to-br ${statusConfig.bgColor} relative overflow-hidden`}>
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-float" style={{animationDelay: '0s'}} />
            <div className="absolute top-10 right-0 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}} />
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}} />
            
            <AnimatedStatusIcon status={status} />
            
            <div className={`transform transition-all duration-1000 delay-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 animate-bounce-in">
                {statusConfig.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {status === 'success' && transactionData ? (
                  <>
                    Your order confirmation has been sent to{' '}
                    <span className="font-semibold text-red-900">
                      {transactionData.customer.email}
                    </span>
                  </>
                ) : status === 'failed' ? (
                  <>
                    {error ? `Error: ${error}` : 'Please try again or contact support'}
                  </>
                ) : (
                  statusConfig.subtitle
                )}
              </p>
              
              {txnId && (
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                  Transaction ID: <span className="font-mono font-semibold">{txnId}</span>
                </p>
              )}
            </div>
            
            <div className={`w-24 h-1 bg-gradient-to-r from-red-900 to-red-600 rounded-full mx-auto transform transition-all duration-1000 delay-1000 ${showContent ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>

          <div className={`px-6 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-10 space-y-6 sm:space-y-8 transform transition-all duration-1000 delay-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Transaction Details */}
            {transactionData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Transaction Date */}
                <div className="bg-red-50 rounded-xl p-3 sm:p-6 border border-red-200 hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center animate-spin-once">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Transaction Date</h2>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 font-medium">
                    {transactionData.date}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="bg-red-50 rounded-xl p-4 sm:p-6 border border-red-200 hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.7s'}}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center animate-spin-once">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Payment Method</h2>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 font-medium">
                    {transactionData.paymentMethod}
                  </p>
                </div>

                {/* Shipping Method */}
                <div className="bg-red-50 rounded-xl p-4 sm:p-6 border border-red-200 hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up sm:col-span-2 lg:col-span-1" style={{animationDelay: '0.9s'}}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center animate-spin-once">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Shipping Method</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                      {transactionData.shippingMethod} ({isFreeShippingEligible ? '5-7' : '3-5'} business days)
                    </p>
                    {isFreeShippingEligible && (
                      <div className="flex items-center text-xs text-green-600">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        <span className="hidden sm:inline">Free</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Order Items Section */}
            {transactionData && transactionData.items.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 sm:p-6 lg:p-8 border-2 border-red-200 animate-fade-in" style={{animationDelay: '1.1s'}}>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Order</h2>
                </div>

                {transactionData.items.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 border border-red-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-102 animate-slide-up mb-4" style={{animationDelay: `${1.3 + index * 0.2}s`}}>
                    
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={getCurrentImage(item)}
                            alt={item.name || 'Product'}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              if (e.target) {
                                e.target.src = '/Image/About1.png';
                              }
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.selectedColor && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium text-xs">
                                Size {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600 font-medium">
                          Qty: <span className="text-red-900 font-bold">{item.quantity}</span>
                        </div>
                        <p className="font-bold text-lg text-red-900">
                          <AnimatedCounter target={item.price * item.quantity} />
                        </p>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={getCurrentImage(item)}
                          alt={item.name || 'Product'}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (e.target) {
                              e.target.src = '/Image/About1.png';
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          {item.selectedColor && (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <>
                              <span>•</span>
                              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
                                Size {item.selectedSize}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-2 font-medium">
                          Quantity: <span className="text-red-900 font-bold">{item.quantity}</span>
                        </div>
                      </div>
                      <p className="font-bold text-xl text-red-900 flex-shrink-0">
                        <AnimatedCounter target={item.price * item.quantity} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Summary */}
            {status === 'success' && (
              <div className="bg-white rounded-xl border-2 border-red-200 p-4 sm:p-6 lg:p-8 animate-fade-in" style={{animationDelay: '1.5s'}}>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between py-2 border-b border-red-100 transform transition-all duration-300 hover:scale-105">
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Subtotal</span>
                    <span className="text-sm sm:text-base font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-red-100 transform transition-all duration-300 hover:scale-105">
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Applied Discount</span>
                    <span className="text-sm sm:text-base font-bold text-green-600">₹{discount}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-red-100 transform transition-all duration-300 hover:scale-105">
                    <span className="text-sm sm:text-base text-gray-700 font-medium">Shipping Cost</span>
                    <span className="text-sm sm:text-base font-bold text-green-600">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="bg-red-50 p-4 sm:p-6 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">Grand Total</span>
                      <span className="text-xl sm:text-2xl font-bold text-red-900">
                        <AnimatedCounter target={total} duration={2500} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 sm:pt-6 animate-slide-up" style={{animationDelay: '1.7s'}}>
              {status === 'success' ? (
                <>
                  <Link href="/" className="flex-1">
                    <button className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 animate-pulse-button">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      Continue Shopping
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </Link>
                  
                  <Link href="/orders" className="flex-1">
                    <button className="w-full bg-white border-2 border-red-900 text-red-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                      Track Order
                    </button>
                  </Link>
                </>
              ) : status === 'failed' ? (
                <>
                  <button 
                    onClick={() => router.back()}
                    className="flex-1 bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    Try Again
                  </button>
                  
                  <Link href="/" className="flex-1">
                    <button className="w-full bg-white border-2 border-red-900 text-red-900 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105">
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      Continue Shopping
                    </button>
                  </Link>
                </>
              ) : (
                <Link href="/" className="flex-1">
                  <button className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    Continue Shopping
                  </button>
                </Link>
              )}
            </div>

            {/* Thank You Message */}
            {status === 'success' && (
              <div className="text-center bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-6 rounded-xl border border-red-200 animate-fade-in" style={{animationDelay: '1.9s'}}>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  🎊 Thank you for choosing us! We hope you love your new purchase. 
                  <br className="hidden sm:block" />
                  <span className="text-red-900 font-bold">Your order will be processed within 24 hours.</span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {status === 'failed' && (
              <div className="text-center bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-6 rounded-xl border border-red-200 animate-fade-in" style={{animationDelay: '1.9s'}}>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  😞 We're sorry your payment couldn't be processed. 
                  <br className="hidden sm:block" />
                  <span className="text-red-900 font-bold">Please try again or contact our support team.</span>
                </p>
              </div>
            )}

            {/* Pending Message */}
            {status === 'pending' && (
              <div className="text-center bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-xl border border-yellow-200 animate-fade-in" style={{animationDelay: '1.9s'}}>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  ⏳ Your payment is being processed. 
                  <br className="hidden sm:block" />
                  <span className="text-yellow-900 font-bold">You will receive a confirmation email shortly.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) translateY(-100px); opacity: 0; }
          50% { transform: scale(1.05) translateY(0); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-button {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out both; }
        .animate-fade-in { animation: fade-in 0.8s ease-out both; }
        .animate-spin-once { animation: spin-once 1s ease-out; }
        .animate-pulse-button { animation: pulse-button 2s ease-in-out infinite; }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}