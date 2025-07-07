"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { CreditCard, Shield, MapPin, User, Package, ShoppingBag, Star, CheckCircle } from "lucide-react";
import { useCart } from "@/Providers/ContextProviders/CartContext";

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

// Payment icons
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

export default function PaymentPage() {
  const router = useRouter();
  const { cart } = useCart();
  
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [billingData, setBillingData] = useState({
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    country: ""
  });
  const [paymentData, setPaymentData] = useState({
    creditCard: {
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      cvv: ""
    },
    paypal: {
      email: ""
    },
    upi: {
      upiId: ""
    }
  });

  // Handle initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle shipping address data - get from localStorage or context
  const getShippingData = () => {
    // Try to get from localStorage first (from checkout page)
    try {
      const checkoutData = localStorage.getItem('checkoutFormData');
      if (checkoutData) {
        return JSON.parse(checkoutData);
      }
    } catch (error) {
      console.warn('Could not retrieve checkout data:', error);
    }
    
    // Return empty data if not found
    return {
      phone: "",
      address: "",
      city: "",
      region: "",
      postalCode: "",
      country: ""
    };
  };

  // Handle same as shipping address toggle
  const handleSameAsShipping = (checked) => {
    setSameAsShipping(checked);
    
    if (checked) {
      const shippingData = getShippingData();
      setBillingData({
        phone: shippingData.phone || "",
        address: shippingData.address || "",
        city: shippingData.city || "",
        region: shippingData.region || "",
        postalCode: shippingData.postalCode || "",
        country: shippingData.country || ""
      });
    } else {
      // Clear billing data when unchecked
      setBillingData({
        phone: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        country: ""
      });
    }
  };

  // Handle billing form input changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment form input changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    const [method, field] = name.split('.');
    
    setPaymentData(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value
      }
    }));
  };

  // Generate unique transaction ID
  const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `TXN_${timestamp}_${random}`.toUpperCase();
  };

  // Prepare comprehensive payment data for backend
  const preparePaymentData = () => {
    const shippingData = getShippingData();
    const transactionId = generateTransactionId();
    
    // Calculate order details
    const orderItems = cart.map(item => ({
      productId: item.id,
      productName: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      selectedColor: item.selectedColor || null,
      selectedSize: item.selectedSize || null,
      productImage: getCurrentImage(item)
    }));

    return {
      // Transaction Information
      transactionId,
      timestamp: new Date().toISOString(),
      
      // Order Information
      order: {
        orderId: `ORD_${Date.now()}`,
        items: orderItems,
        itemCount: cart.length,
        totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal,
        shipping,
        discount,
        total,
        currency: "INR"
      },

      // Customer Information
      customer: {
        fullName: shippingData.fullName || "",
        email: shippingData.email || "",
        phone: shippingData.phone || "",
        userId: null, // Add if user is logged in
      },

      // Shipping Address
      shippingAddress: {
        fullName: shippingData.fullName || "",
        phone: shippingData.phone || "",
        addressLine1: shippingData.address || "",
        city: shippingData.city || "",
        state: shippingData.region || "",
        postalCode: shippingData.postalCode || "",
        country: shippingData.country || "",
        isDefault: false
      },

      // Billing Address
      billingAddress: sameAsShipping ? {
        fullName: shippingData.fullName || "",
        phone: shippingData.phone || "",
        addressLine1: shippingData.address || "",
        city: shippingData.city || "",
        state: shippingData.region || "",
        postalCode: shippingData.postalCode || "",
        country: shippingData.country || "",
        sameAsShipping: true
      } : {
        fullName: shippingData.fullName || "", // Use shipping name if not provided in billing
        phone: billingData.phone,
        addressLine1: billingData.address,
        city: billingData.city,
        state: billingData.region,
        postalCode: billingData.postalCode,
        country: billingData.country,
        sameAsShipping: false
      },

      // Payment Information
      payment: {
        method: paymentMethod,
        amount: total,
        currency: "INR",
        
        // Payment Method Specific Data
        ...(paymentMethod === "credit-card" && {
          creditCard: {
            // Note: In production, never send full card details to your backend
            // Use payment gateway tokens instead
            cardNumber: paymentData.creditCard.cardNumber.replace(/\s/g, ''), // Remove spaces
            nameOnCard: paymentData.creditCard.nameOnCard,
            expiryMonth: paymentData.creditCard.expiryDate.split('/')[0],
            expiryYear: paymentData.creditCard.expiryDate.split('/')[1],
            cvv: paymentData.creditCard.cvv,
            // Add payment gateway specific fields
            gatewayName: "stripe", // or "razorpay", "paypal", etc.
          }
        }),

        ...(paymentMethod === "paypal" && {
          paypal: {
            email: paymentData.paypal.email,
            gatewayName: "paypal"
          }
        }),

        ...(paymentMethod === "upi" && {
          upi: {
            upiId: paymentData.upi.upiId,
            gatewayName: "razorpay" // or other UPI gateway
          }
        })
      },

      // Shipping Information
      shipping: {
        method: isFreeShippingEligible ? "free" : "standard",
        cost: shipping,
        estimatedDelivery: isFreeShippingEligible ? "5-7 business days" : "3-5 business days",
        isFreeShippingApplied: isFreeShippingEligible
      },

      // Additional Metadata
      metadata: {
        source: "web",
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        saveInfo,
        promocode: null, // Add if promocode functionality exists
        referralCode: null, // Add if referral system exists
        notes: null // Add if customer notes field exists
      },

      // Security & Compliance
      security: {
        ipAddress: null, // Backend should capture this
        sessionId: null, // Backend should generate this
        fingerprint: null, // Add device fingerprinting if needed
      }
    };
  };

  // Check if cart is empty after loading
  const isCartEmpty = !isLoading && (!cart || cart.length === 0);

  // Get the current image for display with proper error handling
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

  // Calculate totals from cart with safety checks
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

  const handlePayment = async () => {
    try {
      // Validate required fields
      const shippingData = getShippingData();
      const requiredShippingFields = ['fullName', 'email', 'phone'];
      const missingShippingFields = requiredShippingFields.filter(field => !shippingData[field]);
      
      if (missingShippingFields.length > 0) {
        alert(`Missing shipping information: ${missingShippingFields.join(', ')}`);
        return;
      }

      // Validate billing address if not same as shipping
      if (!sameAsShipping) {
        const requiredBillingFields = ['phone'];
        const missingBillingFields = requiredBillingFields.filter(field => !billingData[field]);
        
        if (missingBillingFields.length > 0) {
          alert(`Missing billing information: ${missingBillingFields.join(', ')}`);
          return;
        }
      }

      // Validate payment method specific fields
      if (paymentMethod === 'credit-card') {
        const { cardNumber, nameOnCard, expiryDate, cvv } = paymentData.creditCard;
        if (!cardNumber || !nameOnCard || !expiryDate || !cvv) {
          alert('Please fill in all credit card details');
          return;
        }
        
        // Basic card validation
        if (cardNumber.replace(/\s/g, '').length < 13) {
          alert('Please enter a valid card number');
          return;
        }
        
        if (cvv.length < 3) {
          alert('Please enter a valid CVV');
          return;
        }
      } else if (paymentMethod === 'paypal') {
        if (!paymentData.paypal.email) {
          alert('Please enter your PayPal email');
          return;
        }
      } else if (paymentMethod === 'upi') {
        if (!paymentData.upi.upiId) {
          alert('Please enter your UPI ID');
          return;
        }
      }

      // Prepare comprehensive payment data
      const paymentPayload = preparePaymentData();
      
      // Log the payment data for debugging (remove in production)
      console.log('Payment Data to be sent to backend:', JSON.stringify(paymentPayload, null, 2));

      // Here you would typically send to your backend
      // Example API call:
      /*
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // if user is authenticated
        },
        body: JSON.stringify(paymentPayload)
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();
      
      if (result.success) {
        // Payment successful
        router.push(`/cart/checkout/payment/transaction-status?status=success&txnId=${result.transactionId}`);
      } else {
        // Payment failed
        router.push(`/cart/checkout/payment/transaction-status?status=failed&error=${result.error}`);
      }
      */

      // For demo purposes, simulate API call
      setTimeout(() => {
        // Simulate successful payment
        router.push(`/cart/checkout/payment/transaction-status?status=success&txnId=${paymentPayload.transactionId}`);
      }, 2000);

    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment processing failed. Please try again.');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <span>/</span>
            <div className="h-6 w-20 bg-red-200 rounded animate-pulse"></div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                    <div>
                      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-gray-100 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-4"></div>
                  <div className="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-red-50/50 rounded-xl border border-red-100 p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                          <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
                        </div>
                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-5 h-5 border-2 border-red-900 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Loading payment...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (isCartEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => router.push('/')}
            className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                  <p className="text-sm text-gray-600">Choose your preferred payment option</p>
                </div>
              </div>
              
              {/* Credit Card Option */}
              <div className={`rounded-xl border-2 mb-4 transition-all duration-200 ${
                paymentMethod === "credit-card" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4" 
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
                    <span className="text-lg font-bold text-gray-900">Credit Card</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Mastercard />
                    <Visa />
                  </div>
                </label>
                {paymentMethod === "credit-card" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4 space-y-4">
                      <input 
                        type="text" 
                        name="creditCard.cardNumber"
                        value={paymentData.creditCard.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456" 
                        maxLength="19"
                        className="w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30"
                        onInput={(e) => {
                          // Format card number with spaces
                          let value = e.target.value.replace(/\D/g, '');
                          value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                          e.target.value = value;
                          handlePaymentChange(e);
                        }}
                      />
                      <input 
                        type="text" 
                        name="creditCard.nameOnCard"
                        value={paymentData.creditCard.nameOnCard}
                        onChange={handlePaymentChange}
                        placeholder="Name on Card" 
                        className="w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          name="creditCard.expiryDate"
                          value={paymentData.creditCard.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY" 
                          maxLength="5"
                          className="border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30"
                          onInput={(e) => {
                            // Format expiry date
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.substring(0, 2) + '/' + value.substring(2, 4);
                            }
                            e.target.value = value;
                            handlePaymentChange(e);
                          }}
                        />
                        <input 
                          type="text" 
                          name="creditCard.cvv"
                          value={paymentData.creditCard.cvv}
                          onChange={handlePaymentChange}
                          placeholder="CVV" 
                          maxLength="4"
                          className="border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30"
                          onInput={(e) => {
                            // Only allow numbers
                            e.target.value = e.target.value.replace(/\D/g, '');
                            handlePaymentChange(e);
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* PayPal Option */}
              <div className={`rounded-xl border-2 mb-4 transition-all duration-200 ${
                paymentMethod === "paypal" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4" 
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
                    <span className="text-lg font-bold text-gray-900">PayPal</span>
                  </div>
                  <PayPal />
                </label>
                {paymentMethod === "paypal" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4">
                      <input 
                        type="email" 
                        name="paypal.email"
                        value={paymentData.paypal.email}
                        onChange={handlePaymentChange}
                        placeholder="your-email@example.com" 
                        className="w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                    </div>
                  </>
                )}
              </div>

              {/* UPI Option */}
              <div className={`rounded-xl border-2 transition-all duration-200 ${
                paymentMethod === "upi" 
                  ? "border-red-900 bg-red-50 ring-2 ring-red-200" 
                  : "border-red-200 hover:border-red-300"
              }`}>
                <label 
                  className="flex items-center justify-between cursor-pointer p-4" 
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
                    <span className="text-lg font-bold text-gray-900">UPI</span>
                  </div>
                  <UPI />
                </label>
                {paymentMethod === "upi" && (
                  <>
                    <div className="w-full border-t-2 border-red-200"></div>
                    <div className="p-4">
                      <input 
                        type="text" 
                        name="upi.upiId"
                        value={paymentData.upi.upiId}
                        onChange={handlePaymentChange}
                        placeholder="yourname@paytm / yourname@googlepay" 
                        className="w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all bg-red-50/30" 
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="text-white h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Billing Address</h2>
                  <p className="text-sm text-gray-600">Enter your billing information</p>
                </div>
              </div>

              {/* Same as Shipping Checkbox */}
              <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <input 
                  type="checkbox" 
                  id="same-address" 
                  checked={sameAsShipping}
                  onChange={(e) => handleSameAsShipping(e.target.checked)}
                  className="h-5 w-5 text-red-900 focus:ring-red-500" 
                />
                <label htmlFor="same-address" className="text-gray-700 font-medium cursor-pointer">
                  Same as my shipping address
                </label>
              </div>

              <div className="space-y-4">  
                <div>
                  <label className="font-bold text-gray-700 block mb-2">
                    Phone Number<span className="text-red-600">*</span>
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={billingData.phone}
                    onChange={handleBillingChange}
                    placeholder="Enter your phone number" 
                    className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                      sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                    }`}
                    disabled={sameAsShipping}
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-2">
                    Street Name and House Number
                  </label>
                  <input 
                    type="text" 
                    name="address"
                    value={billingData.address}
                    onChange={handleBillingChange}
                    placeholder="Enter your house number and street name" 
                    className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                      sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                    }`}
                    disabled={sameAsShipping}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={billingData.city}
                      onChange={handleBillingChange}
                      placeholder="City" 
                      className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                        sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                      }`}
                      disabled={sameAsShipping}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-2">Region</label>
                    <select 
                      name="region"
                      value={billingData.region}
                      onChange={handleBillingChange}
                      className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                        sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                      }`}
                      disabled={sameAsShipping}
                    >
                      <option value="">Select Region</option>
                      <option value="delhi">Delhi</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bangalore">Bangalore</option>
                      <option value="chennai">Chennai</option>
                      <option value="kolkata">Kolkata</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    name="postalCode"
                    value={billingData.postalCode}
                    onChange={handleBillingChange}
                    placeholder="Postal code" 
                    className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                      sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                    }`}
                    disabled={sameAsShipping}
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-2">Country</label>
                  <select 
                    name="country"
                    value={billingData.country}
                    onChange={handleBillingChange}
                    className={`w-full border-2 border-red-200 p-4 rounded-xl focus:border-red-900 focus:ring-2 focus:ring-red-200 transition-all ${
                      sameAsShipping ? 'bg-gray-100 cursor-not-allowed' : 'bg-red-50/30'
                    }`}
                    disabled={sameAsShipping}
                  >
                    <option value="">Select country</option>
                    <option value="india">🇮🇳 India</option>
                    <option value="usa">🇺🇸 USA</option>
                    <option value="uk">🇬🇧 UK</option>
                    <option value="canada">🇨🇦 Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <Shield className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Remember Information</h2>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <input 
                  type="checkbox" 
                  id="save-info"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="h-5 w-5 text-red-900 focus:ring-red-500" 
                />
                <label htmlFor="save-info" className="text-gray-700 font-medium cursor-pointer">
                  Save my information for future checkout
                </label>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 lg:sticky lg:top-8 hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-red-900 rounded-full flex items-center justify-center mr-4">
                  <ShoppingBag className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
              </div>

              <div className="space-y-4">
                {/* Cart Items */}
                {cart && cart.length > 0 && cart.map((item) => {
                  if (!item || !item.id) return null;
                  
                  return (
                    <div key={item.id} className="bg-red-50/50 rounded-xl border border-red-100 p-4">
                      <div className="flex items-center space-x-3">
                        {/* Product Image */}
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
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{item.name || 'Product'}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            {item.selectedColor && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                                Size {item.selectedSize}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 font-medium">
                            Qty: <span className="text-red-900">{item.quantity || 1}</span>
                          </div>
                        </div>
                        <span className="font-bold text-lg text-red-900">
                          ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Order Summary */}
                <div className="border-t-2 border-red-100 pt-4 space-y-3">
                  {/* Free Shipping Notification */}
                  {isFreeShippingEligible && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                      <p className="text-sm text-green-800">
                        🎉 <strong>Free shipping applied!</strong> You saved ₹350
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Shipping</span>
                    <span className="font-bold text-green-600">
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium">Discount</span>
                    <span className="font-bold text-green-600">₹{discount}</span>
                  </div>
                  <div className="border-t-2 border-red-200 pt-3 bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between font-bold text-red-900">
                      <span className="text-xl">Grand Total</span>
                      <span className="text-xl">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-4 rounded-xl font-bold text-lg hover:from-red-800 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Complete Payment →
                </button>

                {/* Security Notice */}
                <div className="text-center bg-red-50 p-4 rounded-xl border border-red-100">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="font-semibold text-red-900">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-600">Your payment information is encrypted and secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}