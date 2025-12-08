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
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';

import { orderHistoryAPI } from '../../../../api/order/orderApi';
import Image from 'next/image';

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
      // console.log('📦 FULL API RESPONSE:', JSON.stringify(data, null, 2));

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
      // console.log(`\nOrder ${index} full data:`, order);

      const orderId = order.orderId || `ORDER_${5913 + index}`;
      console.log(`Order ${index} orderId:`, orderId);

      const orderDate = new Date(order.placedAt);
      const formattedDate = formatDate(orderDate);

      const formattedValue = formatCurrency(order.totalAmount);

      const statusInfo = determineOrderStatus(order.status);

      // Get product images from all items in the order
      let productImages = [];
      let productCount = 0;

      if (order.items && Array.isArray(order.items)) {
        productCount = order.items.reduce((total, item) => total + (item.quantity || 1), 0);

        // Collect all product images
        order.items.forEach(item => {
          if (item.productImage && Array.isArray(item.productImage) && item.productImage.length > 0) {
            // Add the first image of each product
            productImages.push(item.productImage[0]);
          }
        });

        // Limit to 4 images maximum
        productImages = productImages.slice(0, 4);
      }

      return {
        id: orderId,
        date: formattedDate,
        value: formattedValue,
        status: statusInfo.status,
        statusColor: statusInfo.statusColor,
        statusIcon: statusInfo.statusIcon,
        productImages: productImages,
        productCount: productCount,
        originalData: order,
        trackingId: order.trackingId || '',
        items: order.items || []
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
      return '0';
    }

    return `${amount.toLocaleString('en-IN')}`;
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

  // Component to display product images
  const ProductImagesDisplay = ({ images, count, orderId }) => {
    if (images.length === 0) {
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-red-50 rounded-lg flex-shrink-0">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
              {orderId}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{count} item{count !== 1 ? 's' : ''}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Image Stack */}
        <div className="relative flex-shrink-0">
          <div className="flex -space-x-1.5 sm:-space-x-2">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-red-50">
                        <div class="text-red-900 font-bold text-xs">${index + 1}</div>
                      </div>
                    `;
                  }}
                />
              </div>
            ))}
          </div>
          {/* Product count badge */}
          {count > images.length && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md">
              +{count - images.length}
            </div>
          )}
        </div>

        {/* Order ID and Info */}
        <div className="min-w-0 flex-1">
          <p className="font-bold text-gray-900 text-xs sm:text-sm truncate">
            {orderId}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
            {count} item{count !== 1 ? 's' : ''} • {images.length} photo{images.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchOrderHistoryData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center p-3 sm:p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-3 sm:border-4 border-red-200 border-t-red-900 mx-auto"></div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20 flex items-center justify-center p-3 sm:p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">Failed to load orders</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 px-4">{error}</p>
          <button
            onClick={fetchOrderHistoryData}
            className="bg-red-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-red-800 transition-all duration-200 text-xs sm:text-sm md:text-base font-medium shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-red-50/20">
      <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 md:p-3 bg-red-900 rounded-lg sm:rounded-xl shadow-lg">
              <Package className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Order History
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">Track and manage all your orders</p>
            </div>
          </div>

          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-400 rounded-full w-16 sm:w-20 md:w-28" />
        </div>

        {/* Orders Container - Full Width */}
        <div className="bg-white shadow-lg border-y border-red-100/50 overflow-hidden">
          {/* Table Headers - Desktop & Tablet */}
          <div className="hidden md:grid md:grid-cols-11 lg:grid-cols-12 gap-3 lg:gap-4 py-3 lg:py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-red-50/50 border-b border-red-100">
            <div className="col-span-3 flex items-center gap-1.5 lg:gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <ImageIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Products</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5 lg:gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Status</span>
            </div>
            <div className="col-span-2 lg:col-span-2 flex items-center gap-1.5 lg:gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Date</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5 lg:gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <IndianRupee className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Total</span>
            </div>
            <div className="col-span-2 lg:col-span-3 flex items-center justify-end gap-1.5 lg:gap-2 text-red-900 font-bold text-xs lg:text-sm">
              <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Actions</span>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <div className="p-8 sm:p-12 md:p-16 text-center">
                <div className="bg-gray-50 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-300" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">You haven't placed any orders yet.</p>
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
                    <div className="md:hidden p-3 sm:p-4 space-y-2.5 sm:space-y-3">
                      {/* Header Row with Product Images */}
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <ProductImagesDisplay
                          images={order.productImages}
                          count={order.productCount}
                          orderId={order.id}
                        />
                      </div>

                      {/* Status and Amount Row */}
                      <div className="flex items-center justify-between gap-2 sm:gap-3">
                        <div className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{order.status}</span>
                        </div>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-gray-900 font-bold text-sm sm:text-base">
                          <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>{order.value}</span>
                        </div>
                      </div>

                      {/* Date and Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">{order.date}</span>
                        </div>
                        <button
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg hover:bg-red-800 active:bg-red-950 transition-all duration-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg flex-shrink-0"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          View
                        </button>
                      </div>
                    </div>

                    {/* Tablet Layout (md to lg) */}
                    <div className="hidden md:grid lg:hidden md:grid-cols-11 gap-3 py-3 md:py-4 px-4 sm:px-6 items-center">
                      {/* Product Images Column */}
                      <div className="col-span-3">
                        <ProductImagesDisplay
                          images={order.productImages}
                          count={order.productCount}
                          orderId={order.id}
                        />
                      </div>

                      {/* Status Column */}
                      <div className="col-span-2">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full text-xs font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </div>
                      </div>

                      {/* Date Column */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-700 text-xs md:text-sm">
                          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{order.date}</span>
                        </div>
                      </div>

                      {/* Amount Column */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-xs md:text-sm">
                          <IndianRupee className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          <span>{order.value}</span>
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="col-span-2 flex justify-end">
                        <button
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-red-800 transition-all duration-200 text-xs font-semibold flex items-center gap-1.5 md:gap-2 shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          Details
                        </button>
                      </div>
                    </div>

                    {/* Desktop Layout (lg+) */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 xl:gap-6 py-4 xl:py-5 px-6 xl:px-8 items-center">
                      {/* Product Images Column - Enhanced */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-3 xl:gap-4">
                          <div className="relative">
                            <div className="flex -space-x-6 xl:-space-x-8">
                              {order.productImages.slice(0, 2).map((img, index) => (
                                <div
                                  key={index}
                                  className="relative w-10 h-10 xl:w-12 xl:h-12 rounded-full border-2 border-white shadow-lg overflow-hidden group/image"
                                >
                                  <Image
                                    src={img}
                                    height={50}
                                    width={50}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-110"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.style.display = 'none';
                                      e.target.parentElement.innerHTML = `
                                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
                                          <div class="text-red-900 font-bold">${index + 1}</div>
                                        </div>
                                      `;
                                    }}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Product count badge - shows when more than 2 items */}
                            {order.productCount > 2 && (
                              <div className="absolute top-2.5 xl:top-3 -right-0.5 xl:-right-1 bg-red-900 text-white text-[10px] xl:text-xs font-bold rounded-full w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center shadow-lg">
                                +{order.productCount - 2}
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 text-sm xl:text-base truncate">
                              {order.id}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Column */}
                      <div className="col-span-2">
                        <div className={`inline-flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-semibold border ${order.statusColor}`}>
                          <StatusIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                          <span>{order.status}</span>
                        </div>
                      </div>

                      {/* Date Column */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2 xl:gap-3 text-gray-700 font-medium text-sm xl:text-base">
                          <div className="p-1.5 xl:p-2 bg-red-50 rounded-lg">
                            <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-red-600" />
                          </div>
                          <span className="truncate">{order.date}</span>
                        </div>
                      </div>

                      {/* Amount Column */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1.5 xl:gap-2 text-gray-900 font-bold text-base xl:text-lg">
                          <div className="p-1.5 xl:p-2 bg-green-50 rounded-lg">
                            <IndianRupee className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-green-600" />
                          </div>
                          <span>{order.value}</span>
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="col-span-3 flex justify-end">
                        <button
                          onClick={(e) => handleViewDetails(order, e)}
                          className="bg-red-900 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg hover:bg-red-800 transition-all duration-200 text-xs xl:text-sm font-semibold flex items-center gap-1.5 xl:gap-2 shadow-lg hover:shadow-xl"
                        >
                          <Eye className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
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
            <div className="p-3 sm:p-4 md:p-6 text-center border-t border-gray-100 bg-gray-50">
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{orders.length}</span> {orders.length === 1 ? 'order' : 'orders'}
                <span className="mx-1.5 sm:mx-2">•</span>
                <button
                  onClick={fetchOrderHistoryData}
                  className="text-red-900 hover:text-red-700 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Refresh
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};