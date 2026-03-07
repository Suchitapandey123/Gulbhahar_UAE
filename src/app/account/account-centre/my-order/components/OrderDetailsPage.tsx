// @ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Calendar, 
  Truck, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  Clock,
  Info,
  ChevronRight,
  ShoppingBag,
  XCircle,
  X,
  AlertTriangle,
  Image as ImageIcon,
  Eye,
  Lock,
  Key,
} from 'lucide-react';
import { orderService as orderHistoryAPI } from '@/services/order/orderService';
import { profileService as profileAPI } from '@/services/profile/profileService';
import Image from "next/image";

export function OrderDetailsPage({ selectedOrder, onBack = () => {} }) {
  const [activeTab, setActiveTab] = useState("history");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelStep, setCancelStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [fetchingUserData, setFetchingUserData] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [cancelledDate, setCancelledDate] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [addressError, setAddressError] = useState(null);
   
  
  useEffect(() => {
   
    fetchUserData();
    if (activeTab === "receiver") {
      fetchUserAddresses();
    }
  }, [activeTab]);

  const fetchUserAddresses = async () => {
  // Skip if we already have data or no order data
  if (savedAddresses.length > 0 || !orderData?.orderId) return;
  
  setIsLoadingAddresses(true);
  setAddressError(null);
  
  try {
    
    const response = await profileAPI.getShippingAddressByOrderId(orderData.orderId);
    
    
    if (response.success) {
     
      if (Array.isArray(response.data)) {
        setSavedAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddress(response.data[0]);
        }
      } else if (response.data && typeof response.data === 'object') {
       
        setSavedAddresses([response.data]);
        setSelectedAddress(response.data);
      } else if (response.shippingAddress) {
        
        const addressData = {
          shippingAddress: response.shippingAddress
        };
        setSavedAddresses([addressData]);
        setSelectedAddress(addressData);
      } else {
        setAddressError("Address data format is not recognized");
      }
    } else {
      setAddressError(response.message || "No address found for this order");
    }
  } catch (error) {
    
    setAddressError("Failed to load address information");
  } finally {
    setIsLoadingAddresses(false);
  }
};

const fetchUserData = () => {
  if (userEmail) {
    return;
  }
  
  if (userEmail && userEmail !== "user@example.com") {
    return;
  }

  let foundEmail = "";
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
  
    if (value && typeof value === 'string' && value.includes('@')) {
      const emailMatch = value.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        foundEmail = emailMatch[0];
        break;
      }
    }
  }

  if (!foundEmail) {
    const commonKeys = ['userEmail', 'email', 'user_email', 'userEmail', 'user.email'];
    for (const key of commonKeys) {
      const value = localStorage.getItem(key);
      if (value && value.includes('@')) {
        foundEmail = value;
        break;
      }
    }
  }
  
  
  if (!foundEmail) {
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.email && userData.email.includes('@')) {
          foundEmail = userData.email;
        }
      } catch (err) {

      }
    }
  }
  
  
  if (foundEmail) {
    setUserEmail(foundEmail);
   
  } else {
    
  }
};

  // Format address function
  // Format address function
const formatAddress = (addressData) => {
 
  
  if (!addressData) return "No address data";
  
  // If it has shippingAddress object (like your API response)
  if (addressData.shippingAddress) {
    const { shippingAddress } = addressData;
    const parts = [
      shippingAddress.fullName,
      shippingAddress.addressLine1,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postalCode,
      shippingAddress.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  }
  
  // If it's the shippingAddress object itself
  if (addressData.fullName || addressData.addressLine1) {
    const parts = [
      addressData.fullName,
      addressData.addressLine1,
      addressData.city,
      addressData.state,
      addressData.postalCode,
      addressData.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  }
  
  return "Address format not recognized";
};

  
  useEffect(() => {
    if (selectedOrder) {
  
  
      if (selectedOrder.originalData) {
       
        try {
          const transformedData = transformOrderDetails(selectedOrder.originalData);
          setOrderData(transformedData);
          setError(null);
        } catch (err) {
          setError('Failed to load order details');
        }
      }

      else if (selectedOrder.items || selectedOrder.orderId) {
        
        try {
          const transformedData = transformOrderDetails(selectedOrder);
          setOrderData(transformedData);
          setError(null);
        } catch (err) {
          setError('Failed to load order details');
        }
      }
      // Method 3: If no proper data found
      else {
   
        try {
          const fallbackData = getFallbackOrderData(selectedOrder);
          setOrderData(fallbackData);
          setError(null);
        } catch (err) {
          setError('No order data available');
        }
      }
    } else {
      setError('No order selected');
    }
    
    setLoading(false);
  }, [selectedOrder]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (showCancelModal) {
      fetchUserDataForCancellation();
    }
  }, [showCancelModal]);

  const fetchUserDataForCancellation = () => {
  
    
    const userEmailFromStorage = localStorage.getItem("userEmail");
    const userNameFromStorage = localStorage.getItem("userName");
    const userDataStr = localStorage.getItem("user");
    const authTokenStr = localStorage.getItem("authToken");
  

    let foundEmail = "";
    let foundName = "";

    if (userEmailFromStorage) {
      foundEmail = userEmailFromStorage;
    }

    if (userNameFromStorage) {
      foundName = userNameFromStorage;
    }

    if (!foundEmail && userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        if (userData.email) {
          foundEmail = userData.email;
        }
        if (userData.name && !foundName) {
          foundName = userData.name;
        }
      } catch (err) {
      }
    }

    // Method 4: Try from JWT token (for name only)
    if (!foundName && authTokenStr && authTokenStr.startsWith('eyJ')) {
      try {
        const payload = authTokenStr.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        if (decoded.name) {
          foundName = decoded.name;
          
        }
      } catch (jwtErr) {
        
      }
    }

    // Method 5: Try cookies as last resort
    if (!foundEmail) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name.includes('email') || name.includes('Email')) {
          foundEmail = value;

          break;
        }
      }
    }

    
    if (!foundEmail) {
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
     
      }
    }

    // Set the state
    if (foundEmail) {
      setUserEmail(foundEmail);
    } else {
      console.error(" Email not found anywhere!");
    }
    
    if (foundName) {
      setUserName(foundName);
    }

  };

  
  const handleSendOtp = async () => {
    if (!orderData) {
      setApiError("Order data not available");
      return;
    }
    
   
    if (!userEmail) {
      setApiError("User email not found. Please ensure you are logged in.");
      console.error(" User email is empty when trying to send OTP");
      
      // Try to fetch again
      fetchUserDataForCancellation();
      
      // Check again after fetching
      setTimeout(() => {
        if (!userEmail) {
          setApiError("Unable to retrieve user information. Please login again.");
        }
      }, 500);
      
      return;
    }
    
    setIsSendingOtp(true);
    setApiError("");
    
    try {
      
      const response = await orderHistoryAPI.sendOtpForCancellation({
        email: userEmail,
        userName: userName || "User",
        orderId: orderData.orderId
      });

      setIsSendingOtp(false);
      setOtpSent(true);
      setCountdown(30); 
      setCancelStep(2); 
      
    } catch (error) {
      console.error(' Error sending OTP:', error);
      setApiError(error.message || 'Failed to send OTP. Please try again.');
      setIsSendingOtp(false);
    }
  };

  // Handle OTP input with validation
  const handleOtpChange = (index, value) => {
   
    if (!/^\d*$/.test(value)) return;
    
    if (value.length === 6) {
   
      const digits = value.split('');
      const newOtp = [...otp];
      
      for (let i = 0; i < 6; i++) {
        if (i < digits.length) {
          newOtp[i] = digits[i];
        }
      }
      
      setOtp(newOtp);
      
      
      setTimeout(() => {
        const lastInput = document.getElementById(`otp-input-5`);
        if (lastInput) lastInput.focus();
      }, 50);
      
      return;
    }
    
   
    if (value.length > 1) {
      value = value.charAt(value.length - 1); 
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    
    if (value && index < 5) {
      setTimeout(() => {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }, 10);
    }
  };

  // Separate handlePaste function
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
 
    
    // Check if it's a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      handleOtpChange(0, pastedData);
    } else {
      
      setApiError('Please paste a valid 6-digit OTP');
      setTimeout(() => setApiError(''), 3000);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
   
    
    if (enteredOtp.length !== 6) {
      setApiError('Please enter all 6 digits of the OTP');
      return;
    }
    
    setIsVerifyingOtp(true);
    setApiError("");
    
    try {
     
      
      const requestBody = {
        email: userEmail,
        userName: userName,
        otp: enteredOtp,
        orderId: orderData.orderId,
        cancellationReason: cancelReason
      };
      
      
      
      const response = await orderHistoryAPI.verifyOtpForCancellation(requestBody);

   
      
     
      setIsVerifyingOtp(false);
      setCancelStep(3);
      setSuccessMessage(response.message || "Order cancelled successfully!");
      setCancelledDate(new Date()); 
      
     
      setOrderData(prev => {
        const newCancelledDate = new Date();
        return {
          ...prev,
          status: 'Cancelled',
          statusColor: 'bg-red-100 text-red-800 border-red-200',
          statusIcon: XCircle,
          // Regenerate timeline with cancellation
          timeline: generateOrderTimeline('Cancelled', new Date(prev.originalData.placedAt || prev.orderDate), newCancelledDate, cancelReason)
        };
      });
      
    } catch (error) {
      console.error(' Full error details:', error);
      
      setApiError(error.message || 'Failed to cancel order. Please try again.');
      setIsVerifyingOtp(false);
      
      // Clear OTP for retry
      setOtp(["", "", "", "", "", ""]);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    await handleSendOtp();
  };

  
  const resetCancelFlow = () => {
    setCancelStep(1);
    setCancelReason("");
    setOtp(["", "", "", "", "", ""]);
    setOtpSent(false);
    setCountdown(0);
    setApiError("");
    setSuccessMessage("");
    setCancelledDate(null);
  };

  // Handle cancel order button click
  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      setApiError('Please select a cancellation reason');
      return;
    }

    if (!userEmail) {
      setApiError('User information not found. Please try again.');
      return;
    }
    await handleSendOtp();
  };

 
  const handleOpenCancelModal = () => {
   
    resetCancelFlow();
   
    setShowCancelModal(true);
  };

  
  const handleSuccessDone = () => {
    setShowCancelModal(false);
    resetCancelFlow();
   
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  // Check if order can be cancelled
  const canCancelOrder = () => {
    if (!orderData) return false;
    return !['Delivered', 'Cancelled', 'Shipped'].includes(orderData.status);
  };

  // Format date function
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return 'Invalid Date';
    }
         
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    const getOrdinalSuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return '₹ 0';
    }
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };
     
  
  // Determine order status
  const determineOrderStatus = (status) => {
    const statusMap = {
      'Pending': { 
        status: "Pending", 
        statusColor: "bg-amber-100 text-amber-800 border-amber-200",
        statusIcon: Clock,
        badgeColor: "bg-amber-500"
      },
      'Confirmed': { 
        status: "Confirmed", 
        statusColor: "bg-blue-100 text-blue-800 border-blue-200",
        statusIcon: ShoppingBag,
        badgeColor: "bg-blue-500"
      },
      'Shipped': { 
        status: "Shipped", 
        statusColor: "bg-purple-100 text-purple-800 border-purple-200",
        statusIcon: Truck,
        badgeColor: "bg-purple-500"
      },
      'Delivered': { 
        status: "Delivered", 
        statusColor: "bg-green-100 text-green-800 border-green-200",
        statusIcon: CheckCircle,
        badgeColor: "bg-green-500"
      },
      'Cancelled': { 
        status: "Cancelled", 
        statusColor: "bg-red-100 text-red-800 border-red-200",
        statusIcon: XCircle,
        badgeColor: "bg-red-500"
      }
    };
    
    return statusMap[status] || { 
      status: "Processing", 
      statusColor: "bg-amber-100 text-amber-800 border-amber-200",
      statusIcon: Clock,
      badgeColor: "bg-amber-500"
    };
  };

  // Function to check if shipping should be shown
const shouldShowFreeShipping = () => {
  if (!orderData) return true;
  return orderData.status !== 'Cancelled';
};

 
const generateOrderTimeline = (status, orderDate, cancelledAt = null, cancellationReason = '') => {
 
  const currentDate = cancelledAt || new Date();
  
  const baseStages = [
    {
      title: "Order Placed",
      date: orderDate,
      icon: Info,
      status: "completed"
    },
    {
      title: "Order Confirmed",
      date: new Date(orderDate.getTime() + 30 * 60 * 1000),
      description: "Tracking Number Assigned",
      icon: CheckCircle,
      // FIX: Check if order is cancelled
      status: status === 'Cancelled' ? 'cancelled' : 'completed'
    },
    {
      title: "Product Packaging",
      date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
      description: "Product packed in warehouse",
      icon: Package,
      // FIX: Check if order is cancelled
      status: status === 'Pending' ? 'pending' : 
             status === 'Cancelled' ? 'cancelled' : 'completed'
    },
    {
      title: "Product Shipped",
      date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
      description: "Product shipped from warehouse",
      icon: Truck,
      // FIX: Check if order is cancelled
      status: ['Shipped', 'Delivered'].includes(status) ? 'completed' : 
             status === 'Cancelled' ? 'cancelled' : 'pending'
    },
    {
      title: "Out for Delivery",
      date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
      description: "Product out for delivery",
      icon: Truck,
      // FIX: Check if order is cancelled
      status: status === 'Delivered' ? 'completed' : 
             status === 'Cancelled' ? 'cancelled' : 'pending'
    },
    {
      title: "Delivered",
      date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000),
      description: "Product delivered successfully",
      icon: CheckCircle,
      // FIX: Check if order is cancelled
      status: status === 'Delivered' ? 'completed' : 
             status === 'Cancelled' ? 'cancelled' : 'pending'
    }
  ];

  // Add cancellation stage if order is cancelled
  if (status === 'Cancelled') {
    // Insert cancellation stage after order confirmation
    baseStages.splice(2, 0, {
      title: "Order Cancelled",
      date: currentDate,
      description: `Cancelled by customer${cancellationReason ? ` - Reason: ${cancellationReason}` : ''}`,
      icon: XCircle,
      status: "completed"
    });
    
    // Update all subsequent stages to be 'cancelled' state
   
    for (let i = 3; i < baseStages.length; i++) {
      baseStages[i].status = "cancelled";
      // Update icon for cancelled stages
      baseStages[i].icon = XCircle;
    }
  }

  return baseStages.map(stage => ({
    ...stage,
    formattedDate: formatDateTime(stage.date)
  }));
};

  // Format date with time
  const formatDateTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return 'Invalid Date';
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formatDate(date)} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // Transform function
  const transformOrderDetails = (order) => {
    if (!order) {
      throw new Error('Order data is null');
    }

    try {
      // 1. Order Information - Use orderId exactly as it appears in API
      const orderId = order.orderId || (order.id || 'ORDER_0000000000000_XXXXXX');

      // 2. Get all items
      const items = order.items || [];
      
      // 3. Get unique products with their first images
      const uniqueProducts = [];
      const productImages = [];
      
      items.forEach((item) => {
        const productName = item?.productName || `Product ${item?.productId || ''}`;
        const productImage = item?.productImage && item.productImage.length > 0 
          ? item.productImage[0] 
          : null;
        
        // Check if product already exists in uniqueProducts
        const existingProduct = uniqueProducts.find(p => p.name === productName);
        if (existingProduct) {
          existingProduct.quantity += item.quantity || 1;
        } else {
          uniqueProducts.push({
            name: productName,
            quantity: item.quantity || 1,
            image: productImage,
            color: item.selectedColor,
            size: item.selectedSize
          });
          if (productImage) {
            productImages.push(productImage);
          }
        }
      });

      // 4. Format dates
      const orderDate = new Date(order.placedAt || order.orderDate || order.date || new Date());
      const formattedOrderDate = formatDate(orderDate);
      
      // Expected delivery date
      const expectedDelivery = new Date(orderDate);
      expectedDelivery.setDate(orderDate.getDate() + 7);
      const formattedExpectedDate = formatDate(expectedDelivery);

      // 5. Format currency
      const amount = order.totalAmount || order.amount || order.value || 0;
      const formattedAmount = formatCurrency(amount);

      // 6. Status information
      const statusInfo = determineOrderStatus(order.status);

      // 7. Generate order timeline based on status
      const cancelledDate = order.cancelledAt ? new Date(order.cancelledAt) : null;
      const orderTimeline = generateOrderTimeline(order.status, orderDate, cancelledDate, order.cancellationReason);

      return {
        orderId,
        productImages: productImages.slice(0, 4), 
        uniqueProducts,
        orderDate: formattedOrderDate,
        expectedDelivery: formattedExpectedDate,
        totalAmount: formattedAmount,
        status: statusInfo.status,
        statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon,
        badgeColor: statusInfo.badgeColor,
        trackingId: order.trackingId || 'Not assigned',
        items: items.map(item => ({
          productName: item.productName || `Product ${item.productId || ''}`,
          productId: item.productId,
          selectedColor: item.selectedColor || 'Not specified',
          selectedSize: item.selectedSize || 'Not specified',
          quantity: item.quantity || 1,
          productImage: item.productImage || [],
          price: item.price || (order.totalAmount / (item.quantity || 1) / items.length)
        })),
        totalItems: order.totalItems || items.length,
        timeline: orderTimeline,
        originalData: order
      };
    } catch (error) {
      console.error('❌ Error in transformOrderDetails:', error);
      throw new Error('Failed to transform order data');
    }
  };

  // Function to get products to display
  const getProductsToDisplay = () => {
    if (showAllProducts) {
      return orderData.uniqueProducts;
    }
    return orderData.uniqueProducts.slice(0, 3);
  };

  const tabs = [
    { id: "history", label: "History", icon: Clock },
    { id: "details", label: "Details", icon: Package },
    { id: "receiver", label: "Receiver", icon: User }
  ];

  const cancellationReasons = [
    "Changed my mind",
    "Found a better price elsewhere",
    "Ordered by mistake",
    "Product no longer needed",
    "Delivery time too long",
    "Want to change product variant",
    "Financial reasons",
    "Other"
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7f1d1d] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load order details</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={onBack}
            className="bg-[#7f1d1d] text-white px-6 py-2 rounded-lg hover:bg-[#991b1b] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // Main order data not available
  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Order Selected</h3>
          <p className="text-gray-600 mb-4">Please select an order to view details</p>
          <button 
            onClick={onBack}
            className="bg-[#7f1d1d] text-white px-6 py-2 rounded-lg hover:bg-[#991b1b] transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = orderData.statusIcon;
  const productsToDisplay = getProductsToDisplay();
  const hasMoreProducts = orderData.uniqueProducts.length > 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        {/* Header Navigation */}
        <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 sm:gap-2 text-[#7f1d1d] hover:text-[#991b1b] transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm md:text-base font-medium">My Orders</span>
            </button>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-gray-700 text-xs sm:text-sm md:text-base font-medium">Order Details</span>
          </div>
        </div>

        {/* Order Header Card - Professional Design */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Left Column - Order Info & Products */}
            <div className="flex-1">
              {/* Order ID and Basic Info */}
              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 mb-4 sm:mb-5 md:mb-6">
                <div className="p-2 sm:p-3 bg-[#7f1d1d]/10 rounded-xl">
                  <Package className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#7f1d1d]" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 font-mono tracking-tight break-all">
                    {orderData.orderId}
                  </h1>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-xs sm:text-sm text-gray-600">
                      {orderData.totalItems} item{orderData.totalItems > 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-400 hidden xs:inline">•</span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {orderData.orderDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Display - New Design */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                  Products in this order
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {productsToDisplay.map((product, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-gray-300 bg-white">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate">
                          {product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-600">
                          {product.quantity > 1 && (
                            <span className="bg-gray-200 px-1.5 sm:px-2 py-0.5 rounded-md">
                              Qty: {product.quantity}
                            </span>
                          )}
                          {product.color && product.color !== 'Not specified' && (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-gray-300" style={{backgroundColor: product.color}} />
                              <span className="text-xs">{product.color}</span>
                            </span>
                          )}
                          {product.size && product.size !== 'Not specified' && (
                            <span>Size: {product.size}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Show More/Less Button */}
                  {hasMoreProducts && (
                    <button
                      onClick={() => setShowAllProducts(!showAllProducts)}
                      className="flex items-center justify-center gap-2 w-full py-2 sm:py-3 text-[#7f1d1d] hover:text-[#991b1b] font-medium border border-gray-300 rounded-xl hover:border-[#7f1d1d]/30 transition-all text-sm sm:text-base"
                    >
                      {showAllProducts ? (
                        <>
                          <span>Show Less</span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
                        </>
                      ) : (
                        <>
                          <span>Show {orderData.uniqueProducts.length - 3} more items</span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 -rotate-90" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Order Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Order Date</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 break-words">{orderData.orderDate}</p>
                </div>
                
                <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Expected Delivery</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 break-words">{orderData.expectedDelivery}</p>
                </div>
                
                <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Tracking Number</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-mono break-all">{orderData.trackingId}</p>
                </div>
                
                <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Total Amount</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 break-words">{orderData.totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Status & Actions */}
            <div className="lg:w-80 flex-shrink-0 mt-4 lg:mt-0">
              {/* Status Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Order Status</h3>
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${orderData.badgeColor}`} />
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl ${orderData.statusColor.split(' ')[0]}`}>
                    <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{orderData.status}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Last updated: {orderData.orderDate}
                    </p>
                  </div>
                </div>
                  
                <div className="mb-4 sm:mb-5 md:mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-1 sm:mb-2">
                    <span>Order Placed</span>
                    <span>{orderData.status === 'Cancelled' ? 'Cancelled' : 'Delivered'}</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${orderData.badgeColor} transition-all duration-500`}
                      style={{
                        width: orderData.status === 'Pending' ? '20%' :
                               orderData.status === 'Confirmed' ? '40%' :
                               orderData.status === 'Shipped' ? '70%' :
                               orderData.status === 'Delivered' ? '100%' :
                               orderData.status === 'Cancelled' ? '100%' : '20%'
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  {/* Free Shipping - Conditionally Hide When Cancelled */}
                  {shouldShowFreeShipping() && (
                    <div className="flex items-center gap-2 text-green-600 text-xs sm:text-sm bg-green-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Free Shipping</span>
                    </div>
                  )}
                  {canCancelOrder() && (
                    <button
                      onClick={handleOpenCancelModal}
                      className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm sm:text-base"
                    >
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-blue-800">Need help?</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Contact our support team for any queries about your order.
                    </p>
                    <Link 
                      href="/contact" className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium block">
                      Contact Support →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium whitespace-nowrap transition-colors flex-shrink-0 text-xs sm:text-sm ${
                    activeTab === tab.id
                      ? "bg-[#7f1d1d] text-white border-b-2 border-[#7f1d1d]"
                      : "text-gray-600 hover:text-[#7f1d1d] hover:bg-[#7f1d1d]/5"
                  }`}
                >
                  <TabIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 md:p-6">
            {/* History Tab with Timeline */}
            {activeTab === "history" && (
              <div className="relative">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                  Order Timeline
                  {orderData.status === 'Cancelled' && (
                    <span className="ml-2 px-1.5 sm:px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Cancelled
                    </span>
                  )}
                </h3>
                
                <div className="relative ml-3 sm:ml-6">
                  {orderData.timeline.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const isCancelledStage = stage.status === 'cancelled';
                    
                    return (
                      <div key={index} className="relative pb-6 sm:pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index !== orderData.timeline.length - 1 && (
                          <div className={`absolute left-3 sm:left-4 top-6 sm:top-8 w-0.5 h-full ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 
                            isCancelledStage ? 'bg-red-200' :
                            'bg-[#7f1d1d]/20'
                          }`}></div>
                        )}
                        
                        {/* Timeline node */}
                        <div className="flex items-start gap-2 sm:gap-4">
                          <div className={`relative z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0 ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 
                            isCancelledStage ? 'bg-red-500' :
                            'bg-gray-300'
                          }`}>
                            <StageIcon className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              isCancelledStage ? 'text-white' : 'text-white'
                            }`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={`rounded-lg sm:rounded-xl p-2 sm:p-4 border ${
                              stage.status === 'completed' 
                                ? 'bg-[#7f1d1d]/5 border-[#7f1d1d]/10' 
                                : isCancelledStage
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                <h4 className={`text-xs sm:text-sm font-semibold ${
                                  isCancelledStage ? 'text-red-800' : 'text-gray-900'
                                }`}>
                                  {stage.title}
                                </h4>
                                {isCancelledStage && (
                                  <span className="px-1 sm:px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                    Cancelled
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-1 sm:mb-2 break-words">
                                {stage.formattedDate}
                              </p>
                              {stage.description && (
                                <p className={`text-xs ${
                                  isCancelledStage ? 'text-red-700' : 'text-gray-500'
                                } break-words`}>
                                  {stage.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                  Order Items ({orderData.totalItems})
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-start justify-between p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-300 bg-white">
                            {item.productImage && item.productImage.length > 0 ? (
                              <img 
                                src={item.productImage[0]} 
                                alt={item.productName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 break-words">
                            {item.productName}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1 break-all">
                            Product ID: <span className="font-mono">{item.productId}</span>
                          </p>
                          <p className="text-xs text-gray-600 mb-1">
                            {item.selectedColor} | Size {item.selectedSize}
                          </p>
                          <p className="text-xs text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right flex-shrink-0 mt-2 sm:mt-0 sm:ml-4">
                        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#7f1d1d] break-words">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Order Summary</h4>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        {formatCurrency(orderData.originalData.totalAmount || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">₹ 0</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3 sm:pt-4 mt-3 sm:mt-4">
                      <div className="flex justify-between font-bold text-sm sm:text-base md:text-lg">
                        <span className="text-gray-900">Total</span>
                        <span className="text-[#7f1d1d]">{orderData.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "receiver" && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                  Receiver Information
                </h3>
                
                {/* Loading State */}
                {isLoadingAddresses && (
                  <div className="text-center py-6 sm:py-8">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-[#7f1d1d] mb-3 sm:mb-4"></div>
                    <p className="text-xs sm:text-sm text-gray-600">Loading address information...</p>
                  </div>
                )}
                
                {/* Error State */}
                {addressError && !isLoadingAddresses && (
                  <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-500 mx-auto mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-4">{addressError}</p>
                    <div className="space-y-2 px-4">
                      <button
                        onClick={fetchUserAddresses}
                        className="block w-full py-2 bg-[#7f1d1d] text-white rounded-lg hover:bg-[#991b1b] transition-colors text-xs sm:text-sm"
                      >
                        Retry Loading Address
                      </button>
                      <button
                        onClick={() => {
                          // Use fallback data from original order if available
                          if (orderData.originalData?.shippingAddress) {
                            const fallbackAddress = {
                              shippingAddress: orderData.originalData.shippingAddress
                            };
                            setSavedAddresses([fallbackAddress]);
                            setSelectedAddress(fallbackAddress);
                            setAddressError(null);
                          }
                        }}
                        className="block w-full py-2 border border-[#7f1d1d] text-[#7f1d1d] rounded-lg hover:bg-[#7f1d1d]/5 transition-colors text-xs sm:text-sm"
                      >
                        Use Order Data
                      </button>
                    </div>
                  </div>
                )}
                
                {/* No Addresses State */}
                {!isLoadingAddresses && !addressError && savedAddresses.length === 0 && (
                  <div className="text-center py-6 sm:py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400 mx-auto mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">No shipping addresses found for this order</p>
                    
                    {/* Check if we have address in original data */}
                    {orderData.originalData?.shippingAddress ? (
                      <div className="mt-4 px-4">
                        <p className="text-xs text-gray-500 mb-2">
                          Found address in order data:
                        </p>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-left">
                          <p className="text-xs sm:text-sm font-medium break-words">
                            {orderData.originalData.shippingAddress.fullName}
                          </p>
                          <p className="text-xs text-gray-600 break-words">
                            {orderData.originalData.shippingAddress.phone}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 break-words">
                            {orderData.originalData.shippingAddress.addressLine1}
                          </p>
                          <p className="text-xs text-gray-600 break-words">
                            {orderData.originalData.shippingAddress.city}, {orderData.originalData.shippingAddress.state} - {orderData.originalData.shippingAddress.postalCode}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={fetchUserAddresses}
                        className="mt-4 text-xs sm:text-sm text-[#7f1d1d] hover:text-[#991b1b] font-medium"
                      >
                        Try Loading Again
                      </button>
                    )}
                  </div>
                )}
                
                {/* Address Display */}
                {!isLoadingAddresses && selectedAddress && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                      <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                          <span className="text-xs sm:text-sm font-medium text-gray-900">Full Name</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 break-words">
                          {selectedAddress.shippingAddress?.fullName || 'Not specified'}
                        </p>
                      </div>
                      
                      <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                          <span className="text-xs sm:text-sm font-medium text-gray-900">Phone</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 break-words">
                          {selectedAddress.shippingAddress?.phone || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                        <span className="text-xs sm:text-sm font-medium text-gray-900">Shipping Address</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line break-words">
                        {formatAddress(selectedAddress)}
                      </p>
                    </div>
                    
                    {/* Additional Info if available */}
                    {(selectedAddress.shippingAddress?.email || userEmail) && (
                      <div className="p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#7f1d1d]" />
                          <span className="text-xs sm:text-sm font-medium text-gray-900">Email</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 break-words">
                          {selectedAddress.shippingAddress?.email || userEmail || 'Not specified'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Order Modal with OTP Verification */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${
                  cancelStep === 1 ? "bg-amber-100" : 
                  cancelStep === 2 ? "bg-blue-100" : 
                  "bg-red-100"
                }`}>
                  {cancelStep === 1 ? (
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  ) : cancelStep === 2 ? (
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  ) : (
                    <Key className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {cancelStep === 1 && "Cancel Order"}
                    {cancelStep === 2 && "Verify Your Identity"}
                    {cancelStep === 3 && "Order Cancelled"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {cancelStep === 1 && "Select reason and confirm"}
                    {cancelStep === 2 && "Enter OTP sent to your email"}
                    {cancelStep === 3 && "Your order has been cancelled"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  resetCancelFlow();
                }}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Error Message Display */}
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-red-800 break-words">
                    <strong>Error:</strong> {apiError}
                  </p>
                </div>
              )}

              {/* Success Message Display */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-green-800 break-words">
                    <strong>Success:</strong> {successMessage}
                  </p>
                </div>
              )}

              {/* Step 1: Cancellation Reason */}
              {cancelStep === 1 && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-amber-800">
                      <strong>Note:</strong> Once cancelled, this action cannot be undone. You will receive a refund within 5-7 business days.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      Please select a reason for cancellation <span className="text-red-600">*</span>
                    </label>
                    <div className="space-y-1.5 sm:space-y-2 max-h-48 sm:max-h-60 overflow-y-auto pr-1 sm:pr-2">
                      {cancellationReasons.map((reason, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="cancelReason"
                            value={reason}
                            checked={cancelReason === reason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-[#7f1d1d] focus:ring-[#7f1d1d]"
                          />
                          <span className="text-xs sm:text-sm text-gray-700 break-words">{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {cancelStep === 2 && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="break-words">
                        <p className="text-xs sm:text-sm text-blue-800 font-medium">
                          Verification code sent to
                        </p>
                        <p className="text-xs sm:text-sm text-blue-900 font-semibold break-all">
                          {userEmail}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          Please enter the 6-digit code to verify your identity and cancel the order.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OTP Input */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-900 mb-2 sm:mb-3">
                      Enter 6-digit verification code <span className="text-red-600">*</span>
                    </label>
                    <div className="flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={6}
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onPaste={index === 0 ? handlePaste : undefined}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              const prevInput = document.getElementById(`otp-input-${index - 1}`);
                              if (prevInput) prevInput.focus();
                            }
                          }}
                          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-base sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 outline-none transition-colors"
                          autoFocus={index === 0 && !otp[0]}
                        />
                      ))}
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center">
                      {countdown > 0 ? (
                        <p className="text-xs sm:text-sm text-gray-500">
                          Resend code in <span className="font-semibold">{countdown}s</span>
                        </p>
                      ) : (
                        <button
                          onClick={handleResendOtp}
                          disabled={isSendingOtp}
                          className="text-xs sm:text-sm text-[#7f1d1d] hover:text-[#991b1b] font-medium disabled:opacity-50"
                        >
                          {isSendingOtp ? 'Sending...' : 'Resend code'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Cancellation Confirmation */}
              {cancelStep === 3 && (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2">
                    Order Cancelled Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 px-4 break-words">
                    Your order <span className="font-semibold">{orderData.orderId}</span> has been cancelled.
                  </p>
                  <div className="animate-pulse text-xs sm:text-sm text-gray-500">
                    Redirecting to order history...
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200">
              {/* Step 1 Buttons */}
              {cancelStep === 1 && (
                <>
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      resetCancelFlow();
                    }}
                    disabled={isCancelling}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCancelling || !cancelReason}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    {isCancelling ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                        Verify & Cancel
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Step 2 Buttons */}
              {cancelStep === 2 && (
                <>
                  <button
                    onClick={() => {
                      setCancelStep(1);
                      setOtp(["", "", "", "", "", ""]);
                      setApiError("");
                    }}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.join('').length !== 6}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    {isVerifyingOtp ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Key className="w-3 h-3 sm:w-4 sm:h-4" />
                        Verify OTP & Cancel
                      </>
                    )}
                  </button>
                </>
              )}

              {/* Step 3 Buttons */}
              {cancelStep === 3 && (
                <button
                  onClick={handleSuccessDone}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-[#7f1d1d] hover:bg-[#991b1b] text-white font-medium rounded-lg transition-colors text-xs sm:text-sm"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Fallback data function

function getFallbackOrderData(selectedOrder) {
  const fallbackDate = new Date();
  
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return 'Invalid Date';
    }

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    const getOrdinalSuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  const formatDateTime = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return 'Invalid Date';
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formatDate(date)} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const generateOrderTimeline = (status, orderDate, cancelledAt = null, cancellationReason = '') => {
    const currentDate = cancelledAt || new Date();
    
    const baseStages = [
      {
        title: "Order Placed",
        date: orderDate,
        icon: Info,
        status: "completed"
      },
      {
        title: "Order Confirmed",
        date: new Date(orderDate.getTime() + 30 * 60 * 1000),
        description: "Tracking Number Assigned",
        icon: CheckCircle,
        // FIX: Check if order is cancelled
        status: status === 'Cancelled' ? 'cancelled' : 'completed'
      },
      {
        title: "Product Packaging",
        date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        description: "Product packed in warehouse",
        icon: Package,
        
        status: status === 'Pending' ? 'pending' : 
               status === 'Cancelled' ? 'cancelled' : 'completed'
      },
      {
        title: "Product Shipped",
        date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
        description: "Product shipped from warehouse",
        icon: Truck,
        
        status: ['Shipped', 'Delivered'].includes(status) ? 'completed' : 
               status === 'Cancelled' ? 'cancelled' : 'pending'
      },
      {
        title: "Out for Delivery",
        date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        description: "Product out for delivery",
        icon: Truck,
        // FIX: Check if order is cancelled
        status: status === 'Delivered' ? 'completed' : 
               status === 'Cancelled' ? 'cancelled' : 'pending'
      },
      {
        title: "Delivered",
        date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        description: "Product delivered successfully",
        icon: CheckCircle,
        // FIX: Check if order is cancelled
        status: status === 'Delivered' ? 'completed' : 
               status === 'Cancelled' ? 'cancelled' : 'pending'
      }
    ];
     
    // Add cancellation stage if order is cancelled
    if (status === 'Cancelled') {
      // Insert cancellation stage after order confirmation
      baseStages.splice(2, 0, {
        title: "Order Cancelled",
        date: currentDate,
        description: `Cancelled by customer${cancellationReason ? ` - Reason: ${cancellationReason}` : ''}`,
        icon: XCircle,
        status: "completed"
      });
      
      // Update all subsequent stages to be 'cancelled' state
      // FIX: Start from index 3 (after cancellation stage)
      for (let i = 3; i < baseStages.length; i++) {
        baseStages[i].status = "cancelled";
        // Update icon for cancelled stages
        baseStages[i].icon = XCircle;
      }
    }

    return baseStages.map(stage => ({
      ...stage,
      formattedDate: formatDateTime(stage.date)
    }));
  };

  // Get order status from selectedOrder
  const orderStatus = selectedOrder?.status || 'Processing';
  
  // Generate timeline
  const timeline = generateOrderTimeline(
    orderStatus, 
    fallbackDate,
    orderStatus === 'Cancelled' ? new Date() : null
  );

  return {
    orderId: selectedOrder?.id || 'ORDER_1234567890123_ABCDEF',
    productImages: [],
    uniqueProducts: [{
      name: selectedOrder?.productName || 'Sample Product',
      quantity: 1,
      image: null,
      color: 'Not specified',
      size: 'Not specified'
    }],
    orderDate: formatDate(fallbackDate),
    expectedDelivery: formatDate(new Date(fallbackDate.setDate(fallbackDate.getDate() + 7))),
    totalAmount: selectedOrder?.value || '₹ 0',
    status: orderStatus,
    statusColor: orderStatus === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-amber-100 text-amber-800 border-amber-200',
    statusIcon: orderStatus === 'Cancelled' ? XCircle : Clock,
    badgeColor: orderStatus === 'Cancelled' ? 'bg-red-500' : 'bg-amber-500',
    trackingId: 'Not assigned',
    items: [{
      productName: selectedOrder?.productName || 'Sample Product',
      productId: 'P00000000000',
      selectedColor: 'Not specified',
      selectedSize: 'Not specified',
      quantity: 1,
      productImage: [],
      price: 0
    }],
    totalItems: 1,
    timeline: timeline,
    originalData: selectedOrder || {}
  };
}