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
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { orderHistoryAPI } from '../../../../api/order/orderApi';
import { profileAPI } from '../../../../api/profile/profile';

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
    if (savedAddresses.length > 0) return; 
    
    setIsLoadingAddresses(true);
    setAddressError(null);
    
    try {
      const response = await profileAPI.getUserAddresses();     
      if (response.success && Array.isArray(response.data)) {
        setSavedAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddress(response.data[0]);
        }
      } else {
        setAddressError("No addresses found");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddressError("Failed to load addresses");
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
        console.log(`Found email in key '${key}':`, foundEmail);
        break;
      }
    }
  }
  
  // Method 4: Check user object
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
    console.log("✅ Email set to state:", foundEmail);
  } else {
    console.warn("⚠️ Email not found in localStorage. Using fallback.");
  }
};

  // Format address function
  const formatAddress = (addressData) => {
    if (!addressData?.shippingAddress) return "No address available";
    
    const { shippingAddress } = addressData;
    const parts = [
      shippingAddress.addressLine1,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.postalCode,
      shippingAddress.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  };

  // Transform order data when selectedOrder changes
  useEffect(() => {
    if (selectedOrder) {
      console.log('SelectedOrder found, checking for data...');
      console.log('SelectedOrder structure:', {
        hasOriginalData: !!selectedOrder.originalData,
        hasItems: !!selectedOrder.items,
        hasOrderId: !!selectedOrder.orderId,
        keys: Object.keys(selectedOrder)
      });
  
      if (selectedOrder.originalData) {
        console.log('🔄 Transforming from originalData');
        try {
          const transformedData = transformOrderDetails(selectedOrder.originalData);
          setOrderData(transformedData);
          setError(null);
        } catch (err) {
          setError('Failed to load order details');
        }
      }

      else if (selectedOrder.items || selectedOrder.orderId) {
        console.log('🔄 Using selectedOrder directly as order data');
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
        console.log('⚠️ No structured order data found, using fallback');
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
    console.log("🔍 Fetching user data for cancellation...");
    
    const userEmailFromStorage = localStorage.getItem("userEmail");
    const userNameFromStorage = localStorage.getItem("userName");
    const userDataStr = localStorage.getItem("user");
    const authTokenStr = localStorage.getItem("authToken");
    
    console.log("📋 Found in localStorage:", {
      userEmail: userEmailFromStorage,
      userName: userNameFromStorage,
      hasUserData: !!userDataStr,
      hasAuthToken: !!authTokenStr
    });

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
          console.log("Found email in cookie:", foundEmail);
          break;
        }
      }
    }

    // Debug: Show all localStorage items if email not found
    if (!foundEmail) {
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
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

    console.log("🎯 Final user data for cancellation:", {
      email: foundEmail || "Not found",
      name: foundName || "Not found"
    });
  };

  // Send OTP for cancellation - REAL API CALL
  const handleSendOtp = async () => {
    if (!orderData) {
      setApiError("Order data not available");
      return;
    }
    
    // First, check if we have user email
    if (!userEmail) {
      setApiError("User email not found. Please ensure you are logged in.");
      console.error(" User email is empty when trying to send OTP");
      console.log("📊 Current user data:", { userEmail, userName });
      
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
      console.log('Sending OTP for cancellation:', {
        email: userEmail,
        userName: userName || "User",
        orderId: orderData.orderId
      });
      
      const response = await orderHistoryAPI.sendOtpForCancellation({
        email: userEmail,
        userName: userName || "User",
        orderId: orderData.orderId
      });

      console.log(' OTP sent successfully:', response);
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
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;
    
    // If user is pasting 6-digit OTP
    if (value.length === 6) {
      console.log("📋 Pasting OTP:", value);
      const digits = value.split('');
      const newOtp = [...otp];
      
      // Fill all 6 inputs with the pasted digits
      for (let i = 0; i < 6; i++) {
        if (i < digits.length) {
          newOtp[i] = digits[i];
        }
      }
      
      setOtp(newOtp);
      
      // Focus on the last input after a short delay
      setTimeout(() => {
        const lastInput = document.getElementById(`otp-input-5`);
        if (lastInput) lastInput.focus();
      }, 50);
      
      return;
    }
    
    // Single digit input
    if (value.length > 1) {
      value = value.charAt(value.length - 1); // Take last character (for mobile keyboard suggestions)
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input if current has value
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
    console.log("📋 Pasted data:", pastedData);
    
    // Check if it's a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      handleOtpChange(0, pastedData);
    } else {
      // Show error if invalid
      setApiError('Please paste a valid 6-digit OTP');
      setTimeout(() => setApiError(''), 3000);
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    console.log('🔍 OTP entered:', enteredOtp);
    
    if (enteredOtp.length !== 6) {
      setApiError('Please enter all 6 digits of the OTP');
      return;
    }
    
    setIsVerifyingOtp(true);
    setApiError("");
    
    try {
      console.log('📤 Calling verify OTP API...');
      
      const requestBody = {
        email: userEmail,
        userName: userName,
        otp: enteredOtp,
        orderId: orderData.orderId,
        cancellationReason: cancelReason
      };
      
      console.log('📝 Request body:', requestBody);
      
      const response = await orderHistoryAPI.verifyOtpForCancellation(requestBody);

      console.log('✅ Order cancelled successfully:', response);
      
      // Success handling
      setIsVerifyingOtp(false);
      setCancelStep(3);
      setSuccessMessage(response.message || "Order cancelled successfully!");
      setCancelledDate(new Date()); // Set cancellation date
      
      // Update order status locally
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

  // Reset cancellation flow
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

    // First check if we have user data
    if (!userEmail) {
      setApiError('User information not found. Please try again.');
      return;
    }

    // Step 1: Send OTP
    await handleSendOtp();
  };

  // Handle modal open
  const handleOpenCancelModal = () => {
    // Reset any previous state
    resetCancelFlow();
    // Open modal - this will trigger the useEffect to fetch user data
    setShowCancelModal(true);
  };

  // Handle success after cancellation - Redirect to order history
  const handleSuccessDone = () => {
    setShowCancelModal(false);
    resetCancelFlow();
    // Redirect back to order history after 2 seconds
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

  // Generate order timeline based on status - UPDATED VERSION
  const generateOrderTimeline = (status, orderDate, cancelledAt = null, cancellationReason = '') => {
    // Get current date for cancelled timeline
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
        status: "completed"
      },
      {
        title: "Product Packaging",
        date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        description: "Product packed in warehouse",
        icon: Package,
        status: status === 'Pending' ? 'pending' : 'completed'
      },
      {
        title: "Product Shipped",
        date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
        description: "Product shipped from warehouse",
        icon: Truck,
        status: ['Shipped', 'Delivered'].includes(status) ? 'completed' : 'pending'
      },
      {
        title: "Out for Delivery",
        date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        description: "Product out for delivery",
        icon: Truck,
        status: status === 'Delivered' ? 'completed' : 'pending'
      },
      {
        title: "Delivered",
        date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        description: "Product delivered successfully",
        icon: CheckCircle,
        status: status === 'Delivered' ? 'completed' : 'pending'
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
        productImages: productImages.slice(0, 4), // Show max 4 images
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
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center">
        <div className="text-center">
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
      <div className="min-h-screen bg-gradient-to-br from-[#7f1d1d]/5 to-white flex items-center justify-center">
        <div className="text-center">
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
      <div className="max-w-[1600px] mx-auto px-0 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 md:py-8">
        {/* Header Navigation */}
        <div className="mb-4 xs:mb-6 sm:mb-8">
          <div className="flex items-center gap-1 xs:gap-2 mb-3 xs:mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 xs:gap-2 text-[#7f1d1d] hover:text-[#991b1b] transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs xs:text-sm sm:text-base font-medium">My Orders</span>
            </button>
            <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
            <span className="text-gray-700 text-xs xs:text-sm sm:text-base font-medium">Order Details</span>
          </div>
        </div>

        {/* Order Header Card - Professional Design */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Order Info & Products */}
            <div className="flex-1">
              {/* Order ID and Basic Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#7f1d1d]/10 rounded-xl">
                  <Package className="w-8 h-8 text-[#7f1d1d]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-mono tracking-tight">
                    {orderData.orderId}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">
                      {orderData.totalItems} item{orderData.totalItems > 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {orderData.orderDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Products Display - New Design */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#7f1d1d]" />
                  Products in this order
                </h3>
                
                <div className="space-y-4">
                  {productsToDisplay.map((product, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-300 bg-white">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <Package className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                          {product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                          {product.quantity > 1 && (
                            <span className="bg-gray-200 px-2 py-0.5 rounded-md">
                              Qty: {product.quantity}
                            </span>
                          )}
                          {product.color && product.color !== 'Not specified' && (
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: product.color}} />
                              {product.color}
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
                      className="flex items-center justify-center gap-2 w-full py-3 text-[#7f1d1d] hover:text-[#991b1b] font-medium border border-gray-300 rounded-xl hover:border-[#7f1d1d]/30 transition-all"
                    >
                      {showAllProducts ? (
                        <>
                          <span>Show Less</span>
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </>
                      ) : (
                        <>
                          <span>Show {orderData.uniqueProducts.length - 3} more items</span>
                          <ChevronRight className="w-4 h-4 -rotate-90" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Order Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#7f1d1d]" />
                    <span className="font-medium text-gray-900">Order Date</span>
                  </div>
                  <p className="text-gray-700">{orderData.orderDate}</p>
                </div>
                
                <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-[#7f1d1d]" />
                    <span className="font-medium text-gray-900">Expected Delivery</span>
                  </div>
                  <p className="text-gray-700">{orderData.expectedDelivery}</p>
                </div>
                
                <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-[#7f1d1d]" />
                    <span className="font-medium text-gray-900">Tracking Number</span>
                  </div>
                  <p className="text-gray-700 font-mono text-sm">{orderData.trackingId}</p>
                </div>
                
                <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-[#7f1d1d]" />
                    <span className="font-medium text-gray-900">Total Amount</span>
                  </div>
                  <p className="text-gray-900 font-bold text-xl">{orderData.totalAmount}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Status & Actions */}
            <div className="lg:w-80 flex-shrink-0">
              {/* Status Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
                  <div className={`w-3 h-3 rounded-full ${orderData.badgeColor}`} />
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${orderData.statusColor.split(' ')[0]}`}>
                    <StatusIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{orderData.status}</p>
                    <p className="text-sm text-gray-600">
                      Last updated: {orderData.orderDate}
                    </p>
                  </div>
                </div>

                {/* Status Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                <div className="space-y-3">
                  {/* Free Shipping - Conditionally Hide When Cancelled */}
  {shouldShowFreeShipping() && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-4 py-3 rounded-lg">
                    <Truck className="w-5 h-5" />
                    <span>Free Shipping</span>
                  </div>
                   )}
                  {canCancelOrder() && (
                    <button
                      onClick={handleOpenCancelModal}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel Order
                    </button>
                  )}

                  {/* <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 hover:border-[#7f1d1d] text-gray-700 hover:text-[#7f1d1d] font-medium rounded-lg transition-colors">
                    <ExternalLink className="w-5 h-5" />
                    Track Order
                  </button> */}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Need help?</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Contact our support team for any queries about your order.
                    </p>
                    <Link 
        href="/contact" className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium">
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
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-[#7f1d1d] text-white border-b-2 border-[#7f1d1d]"
                      : "text-gray-600 hover:text-[#7f1d1d] hover:bg-[#7f1d1d]/5"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* History Tab with Timeline */}
            {activeTab === "history" && (
              <div className="relative">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#7f1d1d]" />
                  Order Timeline
                  {orderData.status === 'Cancelled' && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Cancelled
                    </span>
                  )}
                </h3>
                
                <div className="relative ml-6">
                  {orderData.timeline.map((stage, index) => {
                    const StageIcon = stage.icon;
                    const isCancelledStage = stage.status === 'cancelled';
                    
                    return (
                      <div key={index} className="relative pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index !== orderData.timeline.length - 1 && (
                          <div className={`absolute left-4 top-8 w-0.5 h-full ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 
                            isCancelledStage ? 'bg-red-200' :
                            'bg-[#7f1d1d]/20'
                          }`}></div>
                        )}
                        
                        {/* Timeline node */}
                        <div className="flex items-start gap-4">
                          <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 
                            isCancelledStage ? 'bg-red-500' :
                            'bg-gray-300'
                          }`}>
                            <StageIcon className={`w-4 h-4 ${
                              isCancelledStage ? 'text-white' : 'text-white'
                            }`} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={`rounded-xl p-4 border ${
                              stage.status === 'completed' 
                                ? 'bg-[#7f1d1d]/5 border-[#7f1d1d]/10' 
                                : isCancelledStage
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-semibold ${
                                  isCancelledStage ? 'text-red-800' : 'text-gray-900'
                                }`}>
                                  {stage.title}
                                </h4>
                                {isCancelledStage && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                    Cancelled
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {stage.formattedDate}
                              </p>
                              {stage.description && (
                                <p className={`text-sm ${
                                  isCancelledStage ? 'text-red-700' : 'text-gray-500'
                                }`}>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#7f1d1d]" />
                  Order Items ({orderData.totalItems})
                </h3>
                
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 bg-white">
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
                                <ImageIcon className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">
                            Product ID: <span className="font-mono">{item.productId}</span>
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            {item.selectedColor} | Size {item.selectedSize}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-lg font-semibold text-[#7f1d1d]">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">
                        {formatCurrency(orderData.originalData.totalAmount || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">₹ 0</span>
                    </div>
                    <div className="border-t border-gray-300 pt-4 mt-4">
                      <div className="flex justify-between font-bold text-lg">
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
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-[#7f1d1d]" />
        Receiver Information
      </h3>
      
      {/* Loading State */}
      {isLoadingAddresses && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#7f1d1d] mb-4"></div>
          <p className="text-gray-600">Loading address information...</p>
        </div>
      )}
      
      {/* Error State */}
      {addressError && !isLoadingAddresses && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">{addressError}</p>
          <button
            onClick={fetchUserAddresses}
            className="text-[#7f1d1d] hover:text-[#991b1b] font-medium"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* No Addresses State */}
      {!isLoadingAddresses && !addressError && savedAddresses.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">No shipping addresses found in your profile</p>
          <p className="text-sm text-gray-500 mb-4">
            Please add your shipping address in the Address Book section
          </p>
        </div>
      )}
      
      {/* Address Display - SIMPLIFIED (no dropdown) */}
      {!isLoadingAddresses && selectedAddress && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-[#7f1d1d]" />
              <span className="font-medium text-gray-900">Full Name</span>
            </div>
            <p className="text-gray-700">
              {selectedAddress.shippingAddress?.fullName || 'Not specified'}
            </p>
          </div>
          
          <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-[#7f1d1d]" />
              <span className="font-medium text-gray-900">Email</span>
            </div>
            <p className="text-gray-700">
              {userEmail || 'Loading...'}
            </p>
          </div>
          
          <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-5 h-5 text-[#7f1d1d]" />
              <span className="font-medium text-gray-900">Phone</span>
            </div>
            <p className="text-gray-700">
              {selectedAddress.shippingAddress?.phone || 'Not specified'}
            </p>
          </div>
          
          <div className="p-4 bg-[#7f1d1d]/5 rounded-xl border border-[#7f1d1d]/10 md:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-[#7f1d1d]" />
              <span className="font-medium text-gray-900">Shipping Address</span>
            </div>
            <p className="text-gray-700">
              {formatAddress(selectedAddress)}
            </p>
          </div>
        </div>
      )}
      
      {/* Show multiple addresses option (optional) */}
      {!isLoadingAddresses && savedAddresses.length > 1 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> You have {savedAddresses.length} saved addresses. 
            This order will be delivered to the default address shown above.
          </p>
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
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  cancelStep === 1 ? "bg-amber-100" : 
                  cancelStep === 2 ? "bg-blue-100" : 
                  "bg-red-100"
                }`}>
                  {cancelStep === 1 ? (
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  ) : cancelStep === 2 ? (
                    <Lock className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Key className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {cancelStep === 1 && "Cancel Order"}
                    {cancelStep === 2 && "Verify Your Identity"}
                    {cancelStep === 3 && "Order Cancelled"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
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
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Error Message Display */}
              {apiError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {apiError}
                  </p>
                </div>
              )}

              {/* Success Message Display */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>Success:</strong> {successMessage}
                  </p>
                </div>
              )}

              {/* Step 1: Cancellation Reason */}
              {cancelStep === 1 && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Once cancelled, this action cannot be undone. You will receive a refund within 5-7 business days.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Please select a reason for cancellation <span className="text-red-600">*</span>
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {cancellationReasons.map((reason, index) => (
                        <label
                          key={index}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="radio"
                            name="cancelReason"
                            value={reason}
                            checked={cancelReason === reason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-4 h-4 text-[#7f1d1d] focus:ring-[#7f1d1d]"
                          />
                          <span className="text-sm text-gray-700">{reason}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {cancelStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-800 font-medium">
                          Verification code sent to
                        </p>
                        <p className="text-sm text-blue-900 font-semibold">
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
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Enter 6-digit verification code <span className="text-red-600">*</span>
                    </label>
                    <div className="flex justify-center gap-2 mb-4">
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
                          className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#7f1d1d] focus:ring-2 focus:ring-[#7f1d1d]/20 outline-none transition-colors"
                          autoFocus={index === 0 && !otp[0]}
                        />
                      ))}
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center">
                      {countdown > 0 ? (
                        <p className="text-sm text-gray-500">
                          Resend code in <span className="font-semibold">{countdown}s</span>
                        </p>
                      ) : (
                        <button
                          onClick={handleResendOtp}
                          disabled={isSendingOtp}
                          className="text-sm text-[#7f1d1d] hover:text-[#991b1b] font-medium disabled:opacity-50"
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Order Cancelled Successfully!
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Your order <span className="font-semibold">{orderData.orderId}</span> has been cancelled.
                  </p>
                  <div className="animate-pulse text-sm text-gray-500">
                    Redirecting to order history...
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              {/* Step 1 Buttons */}
              {cancelStep === 1 && (
                <>
                  <button
                    onClick={() => {
                      setShowCancelModal(false);
                      resetCancelFlow();
                    }}
                    disabled={isCancelling}
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    Keep Order
                  </button>
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCancelling || !cancelReason}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCancelling ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
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
                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || otp.join('').length !== 6}
                    className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isVerifyingOtp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
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
                  className="flex-1 px-4 py-3 bg-[#7f1d1d] hover:bg-[#991b1b] text-white font-medium rounded-lg transition-colors"
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
        status: "completed"
      },
      {
        title: "Product Packaging",
        date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000),
        description: "Product packed in warehouse",
        icon: Package,
        status: status === 'Pending' ? 'pending' : 'completed'
      },
      {
        title: "Product Shipped",
        date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
        description: "Product shipped from warehouse",
        icon: Truck,
        status: ['Shipped', 'Delivered'].includes(status) ? 'completed' : 'pending'
      },
      {
        title: "Out for Delivery",
        date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000),
        description: "Product out for delivery",
        icon: Truck,
        status: status === 'Delivered' ? 'completed' : 'pending'
      },
      {
        title: "Delivered",
        date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        description: "Product delivered successfully",
        icon: CheckCircle,
        status: status === 'Delivered' ? 'completed' : 'pending'
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
      formattedDate: formatDate(stage.date)
    }));
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
    status: selectedOrder?.status || 'Processing',
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    statusIcon: Clock,
    badgeColor: "bg-amber-500",
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
    timeline: generateOrderTimeline(selectedOrder?.status || 'Pending', fallbackDate),
    originalData: selectedOrder || {}
  };
}