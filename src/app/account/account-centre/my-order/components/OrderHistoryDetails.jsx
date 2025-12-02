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
  ShoppingBag,
  RefreshCw
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
      
      console.log('Starting API call to fetch order history...');
      
      if (!orderHistoryAPI || !orderHistoryAPI.getOrderHistory) {
        throw new Error('API function not available. Please check the import path.');
      }
      
      const data = await orderHistoryAPI.getOrderHistory();
      console.log('📦 FULL API RESPONSE:', JSON.stringify(data, null, 2));
      
      const ordersData = data.orders || [];
      const transformedOrders = transformOrderData(ordersData);
      setOrders(transformedOrders);
      
      console.log('✅ Orders transformed and set:', transformedOrders.length, 'orders');
      
    } catch (err) {
      console.error('Error fetching order history:', err);
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
      console.log(`\nOrder ${index} full data:`, order);
      
      const orderId = order.orderId || `ORDER_${5913 + index}`;
      console.log(`Order ${index} orderId:`, orderId);

      const orderDate = new Date(order.placedAt);
      const formattedDate = formatDate(orderDate);
      
      const formattedValue = formatCurrency(order.totalAmount);
      
      const statusInfo = determineOrderStatus(order.status);
      
      const productImage = order.items && order.items[0] && order.items[0].productImage && order.items[0].productImage.length > 0
        ? order.items[0].productImage[0] 
        : '';
      
      return {
        id: orderId,
        date: formattedDate,           
        value: formattedValue,        
        status: statusInfo.status,     
        statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon,
        productImage: productImage,     
        originalData: order,
        trackingId: order.trackingId || ''
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

  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') {
      return '₹0';
    }
    
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const determineOrderStatus = (status) => {
    const statusMap = {
      'Pending': { 
        status: "Pending", 
        statusColor: "bg-amber-50 text-amber-700 border-amber-200", 
        statusIcon: Clock 
      },
      'Confirmed': { 
        status: "Confirmed", 
        statusColor: "bg-blue-50 text-blue-700 border-blue-200", 
        statusIcon: ShoppingBag 
      },
      'Shipped': { 
        status: "Shipped", 
        statusColor: "bg-purple-50 text-purple-700 border-purple-200", 
        statusIcon: Truck 
      },
      'Delivered': { 
        status: "Delivered", 
        statusColor: "bg-green-50 text-green-700 border-green-200", 
        statusIcon: CheckCircle 
      },
      'Cancelled': { 
        status: "Cancelled", 
        statusColor: "bg-red-50 text-red-700 border-red-200", 
        statusIcon: XCircle 
      },
      'Returned': { 
        status: "Returned", 
        statusColor: "bg-gray-50 text-gray-700 border-gray-200", 
        statusIcon: XCircle 
      }
    };
    
    return statusMap[status] || { 
      status: "Processing", 
      statusColor: "bg-amber-50 text-amber-700 border-amber-200", 
      statusIcon: Clock 
    };
  };

  const handleViewDetails = (order, e) => {
    e.stopPropagation();
    
    console.log('🖱️ === VIEW DETAILS CLICKED ===');
    console.log('📦 Order object:', order);
    
    if (onOrderClick) {
      console.log('🚀 Calling onOrderClick with order...');
      onOrderClick(order);
    } else {
      console.error('❌ CRITICAL: onOrderClick prop is undefined!');
    }
  };

  useEffect(() => {
    fetchOrderHistoryData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200 border-t-red-900 mx-auto"></div>
          <p className="mt-4 text-sm md:text-base text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Failed to load orders</h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchOrderHistoryData}
            className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-all duration-200 text-sm md:text-base font-medium shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="w-full py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <div className="p-2 md:p-3 bg-red-900 rounded-xl shadow-lg">
              <Package className="text-white w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Order History
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Track and manage all your orders</p>
            </div>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-400 rounded-full w-20 md:w-28" />
        </div>

        {/* Orders Container - Full Width */}
        <div className="bg-white shadow-lg border-y border-red-100/50 overflow-hidden">
          {/* Table Headers - Desktop & Tablet */}
          <div className="hidden md:grid md:grid-cols-11 lg:grid-cols-12 gap-4 py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-red-50/50 border-b border-red-100">
            <div className="col-span-3 flex items-center gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Package className="w-4 h-4" />
              <span>Order ID</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Clock className="w-4 h-4" />
              <span>Status</span>
            </div>
            <div className="col-span-2 lg:col-span-2 flex items-center gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <IndianRupee className="w-4 h-4" />
              <span>Total</span>
            </div>
            <div className="col-span-2 lg:col-span-3 flex items-center justify-end gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Eye className="w-4 h-4" />
              <span>Actions</span>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <div className="p-12 md:p-16 text-center">
                <div className="bg-gray-50 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 md:w-12 md:h-12 text-gray-300" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                <p className="text-sm md:text-base text-gray-600">You haven't placed any orders yet.</p>
              </div>
            ) : (
              orders.map((order) => {
                const StatusIcon = order.statusIcon;
                return (
                  <div
                    key={order.id}
                    className="group hover:bg-red-50/50 transition-all duration-200 cursor-pointer"
                    onClick={() => onOrderClick && onOrderClick(order)}
                  >
                    {/* Mobile Layout (< md) */}
                    <div className="md:hidden p-4 space-y-3">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors flex-shrink-0">
                            <Package className="w-5 h-5 text-red-900" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-gray-900 text-sm truncate">
                              {order.id}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status and Amount Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-base">
                          <IndianRupee className="w-4 h-4" />
                          <span>{order.value}</span>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={(e) => handleViewDetails(order, e)}
                        className="w-full bg-red-900 text-white py-2.5 rounded-lg hover:bg-red-800 active:bg-red-950 transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>

                    {/* Tablet Layout (md to lg) */}
                    <div className="hidden md:grid lg:hidden md:grid-cols-11 gap-4 py-4 px-4 sm:px-6 items-center">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="p-2.5 bg-red-50 rounded-lg group-hover:bg-red-200 transition-colors">
                          <Package className="w-5 h-5 text-red-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">
                            {order.id}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{order.date}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-sm">
                          <IndianRupee className="w-4 h-4" />
                          <span>{order.value}</span>
                        </div>
                      </div>

                      <div className="col-span-2 flex justify-end">
                        <button 
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all duration-200 text-xs font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Desktop Layout (lg+) */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 py-5 px-8 items-center">
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-200 transition-colors">
                          <Package className="w-5 h-5 text-red-700" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate">
                            {order.id}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span>{order.status}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{order.date}</span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-1.5 text-gray-900 font-bold">
                          <IndianRupee className="w-4 h-4" />
                          <span>{order.value}</span>
                        </div>
                      </div>

                      <div className="col-span-3 flex justify-end">
                        <button 
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition-all duration-200 text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
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
            <div className="p-4 md:p-6 text-center border-t border-gray-100 bg-gray-50">
              <p className="text-xs md:text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{orders.length}</span> {orders.length === 1 ? 'order' : 'orders'}
                <span className="mx-2">•</span>
                <button 
                  onClick={fetchOrderHistoryData}
                  className="text-red-900 hover:text-red-700 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 md:mt-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <button className="flex items-center justify-center gap-2.5 p-4 md:p-5 bg-white border border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 hover:shadow-lg transition-all duration-200 group">
            <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
              <Package className="w-5 h-5 text-red-900" />
            </div>
            <span className="font-semibold text-gray-900 text-sm md:text-base">Track Orders</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 p-4 md:p-5 bg-white border border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 hover:shadow-lg transition-all duration-200 group">
            <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
              <Clock className="w-5 h-5 text-red-900" />
            </div>
            <span className="font-semibold text-gray-900 text-sm md:text-base">Refund History</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 p-4 md:p-5 bg-white border border-red-200 rounded-xl hover:bg-red-50 hover:border-red-300 hover:shadow-lg transition-all duration-200 group sm:col-span-2 lg:col-span-1">
            <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
              <ChevronRight className="w-5 h-5 text-red-900" />
            </div>
            <span className="font-semibold text-gray-900 text-sm md:text-base">Return & Exchange</span>
          </button>
        </div>
      </div>
    </div>
  );
};