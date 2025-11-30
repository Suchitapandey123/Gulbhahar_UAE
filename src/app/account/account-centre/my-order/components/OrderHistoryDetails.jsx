"use client";
import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Calendar, 
  Eye, 
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  IndianRupee,
  Truck,
  ShoppingBag
} from 'lucide-react';

import { orderHistoryAPI } from '../../../../api/order/orderApi';

export const OrderHistoryDetails = ({ onOrderClick }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderHistoryData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(' Starting API call to fetch order history...');
      
      
      if (!orderHistoryAPI || !orderHistoryAPI.getOrderHistory) {
        throw new Error('API function not available. Please check the import path.');
      }
      
      const data = await orderHistoryAPI.getOrderHistory();
      console.log('📦 FULL API RESPONSE:', JSON.stringify(data, null, 2));
      
      // Transform API data to match your UI structure
      const ordersData = data.orders || [];
      const transformedOrders = transformOrderData(ordersData);
      setOrders(transformedOrders);
      
      console.log('✅ Orders transformed and set:', transformedOrders.length, 'orders');
      
    } catch (err) {
      console.error(' Error fetching order history:', err);
      setError(err.message || 'Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const transformOrderData = (apiOrders) => {
    if (!apiOrders || !Array.isArray(apiOrders)) {
      console.log('⚠️ No orders data found in API response');
      return [];
    }

    console.log('Transforming orders:', apiOrders.length, 'orders found');

    return apiOrders.map((order, index) => {
      
      console.log(`\n Order ${index} full data:`, order);
      console.log(` Order ${index} items:`, order.items);
      
      if (order.items && order.items.length > 0) {
        console.log(`🔍 Order ${index} first item fields:`, Object.keys(order.items[0]));
        console.log(`🏷️ Order ${index} first item productName:`, order.items[0].productName);
        console.log(`🆔 Order ${index} first item productId:`, order.items[0].productId);
      }

     
      const orderId = order.orderId ? order.orderId.replace('ORDER_', '#') : `#${5913 + index}`;
           
      let productName = "Product Name Not Available";
      
      if (order.items && order.items.length > 0) {
        const firstItem = order.items[0];
        
        
        if (firstItem.productName) {
          productName = firstItem.productName;
        }
       
        else if (firstItem.productId) {
          productName = `Product ${firstItem.productId}`;
        }
        
        else if (firstItem.selectedColor || firstItem.selectedSize) {
          const color = firstItem.selectedColor || '';
          const size = firstItem.selectedSize ? `Size ${firstItem.selectedSize}` : '';
          productName = `${color} ${size}`.trim() || 'Custom Product';
        }
      }
      
      console.log(`Order ${index} final productName:`, productName);

     
      const orderDate = new Date(order.placedAt);
      const formattedDate = formatDate(orderDate);
      
      
      const formattedValue = formatCurrency(order.totalAmount);
      
      
      const statusInfo = determineOrderStatus(order.status);
      
     
      const productImage = order.items && order.items[0] && order.items[0].productImage && order.items[0].productImage.length > 0
        ? order.items[0].productImage[0] 
        : '';
      
      return {
        id: orderId,                    
        productName: productName,     
        date: formattedDate,           
        value: formattedValue,        
        status: statusInfo.status,     
        statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon,
        productImage: productImage,     
        originalData: order
      };
    });
  };

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

  // Format currency to Indian Rupees format
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return '₹ 0';
    }
    
    return ` ${amount.toLocaleString('en-IN')}`;
  };

  
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
      },
      'Returned': { 
        status: "Returned", 
        statusColor: "bg-gray-100 text-gray-800 border-gray-200", 
        statusIcon: XCircle 
      }
    };
    
    return statusMap[status] || { 
      status: "Processing", 
      statusColor: "bg-amber-100 text-amber-800 border-amber-200", 
      statusIcon: Clock 
    };
  };

  // Handle View Details button click
  // Handle View Details button click
const handleViewDetails = (order, e) => {
  e.stopPropagation();
  
  console.log('🖱️ === VIEW DETAILS CLICKED ===');
  console.log('📦 Order object:', order);
  console.log('🔍 Order structure analysis:', {
    id: order.id,
    productName: order.productName,
    hasOriginalData: !!order.originalData,
    originalData: order.originalData,
    allKeys: Object.keys(order)
  });
  
  if (onOrderClick) {
    console.log('🚀 Calling onOrderClick with order...');
    onOrderClick(order);
  } else {
    console.error('❌ CRITICAL: onOrderClick prop is undefined!');
    console.error('Check if OrderHistoryDetails has onOrderClick prop');
  }
};

// Also add debugging to the row click
const handleRowClick = (order) => {
  console.log('📋 === ROW CLICKED ===');
  console.log('📦 Order object:', order);
  
  if (onOrderClick) {
    console.log('🚀 Calling onOrderClick from row click...');
    onOrderClick(order);
  } else {
    console.error('❌ CRITICAL: onOrderClick prop is undefined in row click!');
  }
};

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrderHistoryData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load orders</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchOrderHistoryData}
            className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1600px] mx-auto py-3 sm:py-6 md:py-8">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 bg-red-900 rounded-lg">
              <Package className="text-white w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                Order History
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base">Track and manage your order history</p>
            </div>
          </div>
          
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-16 sm:w-20 md:w-24" />
        </div>

        {/* Orders Container */}
        <div className="bg-white rounded-none sm:rounded-xl shadow-none sm:shadow-sm border-0 sm:border sm:border-red-100 overflow-hidden">
          {/* Table Headers - Desktop Only */}
          <div className="hidden lg:grid grid-cols-12 gap-4 py-4 px-6 bg-red-50 border-b border-red-100">
            {/* <div className="col-span-3 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Package className="w-4 h-4" />
              Order Id
            </div> */}
            <div className="col-span-3 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Package className="w-4 h-4" />
              Product Name
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Clock className="w-4 h-4" />
              Status
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Calendar className="w-4 h-4" />
              Order Date
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <IndianRupee className="w-4 h-4" />
              Total Value
            </div>
            <div className="col-span-3 flex items-center justify-end gap-2 text-red-900 font-semibold text-sm">
              <Eye className="w-4 h-4" />
              Actions
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              // Empty state
              <div className="p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              </div>
            ) : (
              orders.map((order, index) => {
                const StatusIcon = order.statusIcon;
                return (
                  <div
                    key={order.id}
                    className="group hover:bg-red-50/50 transition-all duration-200 cursor-pointer"
                    onClick={() => onOrderClick && onOrderClick(order)}
                  >
                    {/* Mobile Layout */}
                    <div className="lg:hidden p-3 sm:p-4 md:p-5">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                            <Package className="w-4 sm:w-5 h-4 sm:h-5 text-red-900" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm sm:text-base">
                              {order.id}
                            </span>
                            <p className="text-gray-600 text-xs sm:text-sm truncate">
                              {order.productName}
                            </p>
                          </div>
                        </div>
                        <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Date</p>
                          <p className="font-medium text-gray-900 text-xs sm:text-sm">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Amount</p>
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm">{order.value}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium border ${order.statusColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span className="text-xs text-nowrap sm:text-sm">{order.status}</span>
                        </div>
                        
                        {/* View Details Button - Mobile */}
                        <button 
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors text-xs font-medium flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 py-5 px-6 items-center">
                      {/* <div className="col-span-3 flex items-center gap-4">
                        <div className="p-3 bg-red-50 rounded-lg group-hover:bg-red-200 transition-colors">
                          <Package className="w-3 h-3 text-red-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-base">
                            {order.id}
                          </span>
                         
                        </div>
                      </div> */}
                        
                      <div className="col-span-3">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          {/* <Package className="w-4 h-4 text-gray-500" /> */}
                          <span className="truncate">{order.productName}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className={`inline-flex text-nowrap items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${order.statusColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          {order.status}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {order.date}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          <IndianRupee className="w-4 h-4 text-gray-500" />
                          {order.value}
                        </div>
                      </div>

                      <div className="col-span-3 flex justify-end">
                        <button 
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {orders.length > 0 && (
            <div className="p-3 sm:p-6 text-center border-t border-gray-100 bg-gray-50">
              <p className="text-gray-500 text-xs sm:text-sm">
                Showing {orders.length} orders • 
                <button 
                  onClick={fetchOrderHistoryData}
                  className="text-red-900 hover:text-red-700 ml-1 font-medium"
                >
                  Refresh orders
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-white border-0 sm:border sm:border-red-200 rounded-none sm:rounded-lg hover:bg-red-50 sm:hover:border-red-300 shadow-sm sm:shadow-none transition-colors">
            <Package className="w-4 sm:w-5 h-4 sm:h-5 text-red-900" />
            <span className="font-medium text-gray-900 text-sm sm:text-base">Track Orders</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-white border-0 sm:border sm:border-red-200 rounded-none sm:rounded-lg hover:bg-red-50 sm:hover:border-red-300 shadow-sm sm:shadow-none transition-colors">
            <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-red-900" />
            <span className="font-medium text-gray-900 text-sm sm:text-base">Refund History</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 sm:p-4 bg-white border-0 sm:border sm:border-red-200 rounded-none sm:rounded-lg hover:bg-red-50 sm:hover:border-red-300 shadow-sm sm:shadow-none transition-colors sm:col-span-2 lg:col-span-1">
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-red-900" />
            <span className="font-medium text-gray-900 text-sm sm:text-base">Return & Exchange</span>
          </button>
        </div>
      </div>
    </div>
  );
};