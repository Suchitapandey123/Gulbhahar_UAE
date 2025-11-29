"use client"
import React, { useState, useEffect } from 'react';
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
  AlertTriangle
} from 'lucide-react';

export function OrderDetailsPage({ selectedOrder, onBack = () => {} }) {
  const [activeTab, setActiveTab] = useState("history");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // Transform order data when selectedOrder changes
  useEffect(() => {
    console.log('🔍 OrderDetailsPage - selectedOrder received:', selectedOrder);
    
    // ✅ FIX: Check multiple possible data sources
    if (selectedOrder) {
      console.log('✅ SelectedOrder found, checking for data...');
      console.log('📋 SelectedOrder structure:', {
        hasOriginalData: !!selectedOrder.originalData,
        hasItems: !!selectedOrder.items,
        hasOrderId: !!selectedOrder.orderId,
        keys: Object.keys(selectedOrder)
      });
      
      // Method 1: If selectedOrder has originalData
      if (selectedOrder.originalData) {
        console.log('🔄 Transforming from originalData');
        try {
          const transformedData = transformOrderDetails(selectedOrder.originalData);
          setOrderData(transformedData);
          setError(null);
        } catch (err) {
          console.error('❌ Error transforming order data:', err);
          setError('Failed to load order details');
        }
      }
      // Method 2: If selectedOrder itself has the order data
      else if (selectedOrder.items || selectedOrder.orderId) {
        console.log('🔄 Using selectedOrder directly as order data');
        try {
          const transformedData = transformOrderDetails(selectedOrder);
          setOrderData(transformedData);
          setError(null);
        } catch (err) {
          console.error('❌ Error transforming order data:', err);
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
          console.error('❌ Error with fallback data:', err);
          setError('No order data available');
        }
      }
    } else {
      console.log('❌ No selectedOrder provided');
      setError('No order selected');
    }
    
    setLoading(false);
  }, [selectedOrder]);

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert('Please select a cancellation reason');
      return;
    }

    setIsCancelling(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Order cancelled:', {
        orderId: orderData.orderId,
        reason: cancelReason
      });

      // Update order data to show cancelled status
      setOrderData(prev => ({
        ...prev,
        status: 'Cancelled',
        statusColor: 'bg-red-100 text-red-800 border-red-200',
        statusIcon: XCircle
      }));

      setIsCancelling(false);
      setShowCancelModal(false);
      setCancelReason("");

      // Show success message
      alert('Order cancelled successfully!');
    }, 1500);
  };

  // Check if order can be cancelled
  const canCancelOrder = () => {
    if (!orderData) return false;
    return !['Delivered', 'Cancelled'].includes(orderData.status);
  };

  // Enhanced transform function
  const transformOrderDetails = (order) => {
    if (!order) {
      throw new Error('Order data is null');
    }

    console.log('📦 Transforming order details:', order);

    try {
      // 1. Order Information - multiple possible fields
      const orderId = order.orderId 
        ? order.orderId.replace('ORDER_', '#') 
        : (order.id ? order.id.replace('ORDER_', '#') : '#ORDER');

      // 2. Product Information (first item or use direct fields)
      let productName = 'Product Name Not Available';
      let productColor = 'Not specified';
      let productSize = 'Not specified';
      let quantity = 1;

      // Check if order has items array
      if (order.items && order.items.length > 0) {
        const firstItem = order.items[0];
        productName = firstItem?.productName || `Product ${firstItem?.productId || ''}`;
        productColor = firstItem?.selectedColor || 'Not specified';
        productSize = firstItem?.selectedSize || 'Not specified';
        quantity = firstItem?.quantity || 1;
      } else {
        // Use direct fields from order if no items array
        productName = order.productName || 'Product';
        productColor = order.productColor || 'Not specified';
        productSize = order.productSize || 'Not specified';
        quantity = order.quantity || 1;
      }

      // 3. Format dates - handle multiple date fields
      const orderDate = new Date(order.placedAt || order.orderDate || order.date || new Date());
      const formattedOrderDate = formatDate(orderDate);
      
      // Expected delivery date (order date + 7 days)
      const expectedDelivery = new Date(orderDate);
      expectedDelivery.setDate(orderDate.getDate() + 7);
      const formattedExpectedDate = formatDate(expectedDelivery);

      // 4. Format currency - handle multiple amount fields
      const amount = order.totalAmount || order.amount || order.value || 0;
      const formattedAmount = formatCurrency(amount);

      // 5. Status information
      const statusInfo = determineOrderStatus(order.status);

      // 6. Generate order timeline based on status
      const orderTimeline = generateOrderTimeline(order.status, orderDate);

      return {
        orderId,
        productName,
        productColor,
        productSize,
        quantity,
        orderDate: formattedOrderDate,
        expectedDelivery: formattedExpectedDate,
        totalAmount: formattedAmount,
        status: statusInfo.status,
        statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon,
        trackingId: order.trackingId || 'Not assigned',
        items: order.items || [{
          productName: productName,
          selectedColor: productColor,
          selectedSize: productSize,
          quantity: quantity,
          productId: '1'
        }],
        timeline: orderTimeline,
        originalData: order
      };
    } catch (error) {
      console.error('❌ Error in transformOrderDetails:', error);
      throw new Error('Failed to transform order data');
    }
  };

  // Fallback data function
  const getFallbackOrderData = (selectedOrder) => {
    console.log('🔄 Creating fallback data from:', selectedOrder);
    
    const fallbackDate = new Date();
    return {
      orderId: selectedOrder?.id || '#ORDER_12345',
      productName: selectedOrder?.productName || 'Sample Product',
      productColor: 'Not specified',
      productSize: 'Not specified',
      quantity: 1,
      orderDate: formatDate(fallbackDate),
      expectedDelivery: formatDate(new Date(fallbackDate.setDate(fallbackDate.getDate() + 7))),
      totalAmount: selectedOrder?.value || '₹ 0',
      status: selectedOrder?.status || 'Processing',
      statusColor: selectedOrder?.statusColor || "bg-amber-100 text-amber-800 border-amber-200",
      statusIcon: selectedOrder?.statusIcon || Clock,
      trackingId: 'Not assigned',
      items: [{
        productName: selectedOrder?.productName || 'Sample Product',
        selectedColor: 'Not specified',
        selectedSize: 'Not specified',
        quantity: 1,
        productId: '1'
      }],
      timeline: generateOrderTimeline(selectedOrder?.status || 'Pending', fallbackDate),
      originalData: selectedOrder || {}
    };
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
        statusIcon: Clock
      },
      'Confirmed': { 
        status: "Confirmed", 
        statusColor: "bg-blue-100 text-blue-800 border-blue-200",
        statusIcon: ShoppingBag
      },
      'Shipped': { 
        status: "Shipped", 
        statusColor: "bg-purple-100 text-purple-800 border-purple-200",
        statusIcon: Truck
      },
      'Delivered': { 
        status: "Delivered", 
        statusColor: "bg-green-100 text-green-800 border-green-200",
        statusIcon: CheckCircle
      },
      'Cancelled': { 
        status: "Cancelled", 
        statusColor: "bg-red-100 text-red-800 border-red-200",
        statusIcon: XCircle
      }
    };
    
    return statusMap[status] || { 
      status: "Processing", 
      statusColor: "bg-amber-100 text-amber-800 border-amber-200",
      statusIcon: Clock
    };
  };

  // Generate order timeline based on status
  const generateOrderTimeline = (status, orderDate) => {
    const baseStages = [
      {
        title: "Order Placed",
        date: orderDate,
        icon: Info,
        status: "completed"
      },
      {
        title: "Order Confirmed",
        date: new Date(orderDate.getTime() + 30 * 60 * 1000), // 30 minutes later
        description: "Tracking Number Assigned",
        icon: CheckCircle,
        status: "completed"
      },
      {
        title: "Product Packaging",
        date: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
        description: "Product packed in warehouse",
        icon: Package,
        status: status === 'Pending' ? 'pending' : 'completed'
      },
      {
        title: "Product Shipped",
        date: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000), // 1 day later
        description: "Product shipped from warehouse",
        icon: Truck,
        status: ['Shipped', 'Delivered'].includes(status) ? 'completed' : 'pending'
      },
      {
        title: "Out for Delivery",
        date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days later
        description: "Product out for delivery",
        icon: Truck,
        status: status === 'Delivered' ? 'completed' : 'pending'
      },
      {
        title: "Delivered",
        date: new Date(orderDate.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days later
        description: "Product delivered successfully",
        icon: CheckCircle,
        status: status === 'Delivered' ? 'completed' : 'pending'
      }
    ];

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

        {/* Order Header Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#7f1d1d]/10 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col xs:flex-row items-start justify-between gap-3 xs:gap-4">
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 w-full xs:w-auto">
                <div className="p-2 xs:p-2.5 sm:p-3 bg-[#7f1d1d]/10 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Package className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-[#7f1d1d]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">
                    {orderData.orderId}
                  </h1>
                  <p className="text-gray-600 text-xs xs:text-sm sm:text-base">{orderData.productName}</p>
                </div>
              </div>

              <div className="flex flex-col items-start xs:items-end gap-2 w-full xs:w-auto">
                <div className={`flex items-center gap-1 xs:gap-2 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full border ${orderData.statusColor}`}>
                  <StatusIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span className="text-xs xs:text-sm font-medium">{orderData.status}</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 text-xs xs:text-sm">
                  <Truck className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Cancel Order Button */}
            {canCancelOrder() && (
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors duration-300 font-medium text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Order Information Grid */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#7f1d1d]/10 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 xs:w-5 xs:h-5 text-[#7f1d1d]" />
            Order Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 text-xs xs:text-sm">
            <div className="p-2 xs:p-3 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                <span className="font-medium text-gray-900">Order Date</span>
              </div>
              <p className="text-gray-700">{orderData.orderDate}</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                <span className="font-medium text-gray-900">Expected Delivery</span>
              </div>
              <p className="text-gray-700">{orderData.expectedDelivery}</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Truck className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                <span className="font-medium text-gray-900">Tracking Number</span>
              </div>
              <p className="text-gray-700 font-mono text-xs xs:text-sm break-all">{orderData.trackingId}</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Package className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                <span className="font-medium text-gray-900">Total Amount</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm xs:text-base sm:text-lg">{orderData.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-[#7f1d1d]/10 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 xs:gap-2 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 font-medium text-xs xs:text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-[#7f1d1d] text-white border-b-2 border-[#7f1d1d]"
                      : "text-gray-600 hover:text-[#7f1d1d] hover:bg-[#7f1d1d]/5"
                  }`}
                >
                  <TabIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span className="hidden xs:inline sm:hidden md:inline">{tab.label}</span>
                  <span className="xs:hidden sm:inline md:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-3 xs:p-4 sm:p-6">
            {activeTab === "history" && (
              <div className="relative">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 xs:w-5 xs:h-5 text-[#7f1d1d]" />
                  Order Timeline
                </h3>
                
                <div className="relative ml-3 xs:ml-4 sm:ml-6">
                  {orderData.timeline.map((stage, index) => {
                    const StageIcon = stage.icon;
                    return (
                      <div key={index} className="relative pb-6 xs:pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index !== orderData.timeline.length - 1 && (
                          <div className={`absolute left-3 xs:left-4 top-6 xs:top-8 w-0.5 h-full ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 'bg-[#7f1d1d]/20'
                          }`}></div>
                        )}
                        
                        {/* Timeline node */}
                        <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                          <div className={`relative z-10 flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 rounded-full flex-shrink-0 ${
                            stage.status === 'completed' ? 'bg-[#7f1d1d]' : 'bg-gray-300'
                          }`}>
                            <StageIcon className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className={`rounded-lg p-2 xs:p-3 sm:p-4 border ${
                              stage.status === 'completed' 
                                ? 'bg-[#7f1d1d]/5 border-[#7f1d1d]/10' 
                                : 'bg-gray-50 border-gray-200'
                            }`}>
                              <h4 className="font-semibold text-gray-900 mb-1 text-xs xs:text-sm sm:text-base">
                                {stage.title}
                              </h4>
                              <p className="text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2">
                                {stage.formattedDate}
                              </p>
                              {stage.description && (
                                <p className="text-xs xs:text-sm text-gray-500 break-words">
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
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2">
                  <Package className="w-4 h-4 xs:w-5 xs:h-5 text-[#7f1d1d]" />
                  Order Items
                </h3>
                
                <div className="space-y-3 xs:space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 xs:p-4 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
                      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="p-1.5 xs:p-2 bg-[#7f1d1d]/10 rounded-lg flex-shrink-0">
                          <Package className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-[#7f1d1d]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-xs xs:text-sm sm:text-base">
                            {item.productName || `Product ${item.productId || ''}`}
                          </h4>
                          <p className="text-xs xs:text-sm text-gray-600">
                            {item.selectedColor} | Size {item.selectedSize}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-medium text-gray-900 text-xs xs:text-sm">
                          {item.quantity} piece{item.quantity > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm xs:text-base sm:text-lg font-semibold text-[#7f1d1d]">
                          {formatCurrency(orderData.originalData.totalAmount / orderData.items.length)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "receiver" && (
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2">
                  <User className="w-4 h-4 xs:w-5 xs:h-5 text-[#7f1d1d]" />
                  Receiver Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                  <div className="p-2 xs:p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <User className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Full Name</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">John Doe</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <Mail className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Email</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">john.doe@example.com</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <Phone className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Phone</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">+91 98765 43210</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-[#7f1d1d]/5 rounded-lg border border-[#7f1d1d]/10 sm:col-span-2">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-[#7f1d1d] flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Shipping Address</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">
                      123 Main Street, Mumbai, Maharashtra 400001, India
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cancel Order</h3>
              </div>
              <button
                onClick={() => setShowCancelModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Once cancelled, this action cannot be undone. You will receive a refund within 5-7 business days.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Please select a reason for cancellation <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
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
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
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
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Cancel Order
                  </>
                )}
              </button>
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