"use client";

import React, { useState } from "react";
import { 
  Search, 
  Package, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Truck,
  Eye,
  Filter,
  Download,
  MoreVertical
} from "lucide-react";

const orders = [
  {
    id: "#5915",
    date: "15th Jan, 2025",
    status: "Cancelled",
    statusColor: "bg-red-50 text-red-700 border-red-200",
    statusIcon: AlertCircle,
    trackingNumber: "TN123456789",
    estimatedDelivery: "N/A",
    items: "2 items",
    total: "$89.99"
  },
  {
    id: "#5914",
    date: "14th Jan, 2025",
    status: "Shipped",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
    statusIcon: Truck,
    trackingNumber: "TN987654321",
    estimatedDelivery: "18th Jan, 2025",
    items: "3 items",
    total: "$156.50"
  },
  {
    id: "#5913",
    date: "12th Jan, 2025",
    status: "Delivered",
    statusColor: "bg-green-50 text-green-700 border-green-200",
    statusIcon: CheckCircle,
    trackingNumber: "TN456789123",
    estimatedDelivery: "Delivered",
    items: "1 item",
    total: "$45.00"
  },
  {
    id: "#5912",
    date: "10th Jan, 2025",
    status: "Processing",
    statusColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    statusIcon: Clock,
    trackingNumber: "TN789123456",
    estimatedDelivery: "20th Jan, 2025",
    items: "4 items",
    total: "$234.75"
  },
];

export default function TrackOrderPage({ onBack = () => {} }) {
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSearch = (value) => {
    setSearch(value);
    filterOrders(value, selectedStatus);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterOrders(search, status);
  };

  const filterOrders = (searchValue, statusValue) => {
    let filtered = orders;
    
    if (searchValue) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.trackingNumber.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    if (statusValue !== "all") {
      filtered = filtered.filter(order => 
        order.status.toLowerCase() === statusValue.toLowerCase()
      );
    }
    
    setFilteredOrders(filtered);
  };

  const handleTrackOrder = (orderId) => {
    alert(`Tracking details for order ${orderId}`);
  };

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "delivered", label: "Delivered" },
    { value: "shipped", label: "Shipped" },
    { value: "processing", label: "Processing" },
    { value: "cancelled", label: "Cancelled" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
      <div className="max-w-7xl mx-auto px-2 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-red-900 hover:text-red-700 transition-all duration-200 group p-2 rounded-lg hover:bg-red-50"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm sm:text-base font-medium hidden sm:inline">My Orders</span>
            </button>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 text-sm sm:text-base text-nowrap font-medium">Track Orders</span>
          </div>
          
          {/* Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-red-900 rounded-xl shadow-lg">
                <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  Track Your Orders
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Monitor your order status and delivery progress
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="fle hidden items-center gap-2 px-3 sm:px-4 py-2 text-red-900 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium shadow-lg">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-20 sm:w-24 mt-4" />
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-2 sm:p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Orders
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter Order ID or Tracking Number"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-all duration-200"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Container */}
        <div className="bg-white rounded-xl border border-red-100 shadow-sm overflow-hidden">
          {/* Table Headers - Desktop Only */}
          <div className="hidden xl:grid grid-cols-12 gap-4 py-4 px-6 bg-gradient-to-r from-red-50 to-red-25 border-b border-red-100">
            <div className="col-span-3 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Package className="w-4 h-4" />
              Order Details
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Clock className="w-4 h-4" />
              Status
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Calendar className="w-4 h-4" />
              Order Date
            </div>
            <div className="col-span-3 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Truck className="w-4 h-4" />
              Tracking Info
            </div>
            <div className="col-span-2 text-red-900 font-semibold text-sm text-center">
              Actions
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => {
                const StatusIcon = order.statusIcon;
                return (
                  <div
                    key={index}
                    className="group hover:bg-red-50/30 transition-all duration-200"
                  >
                    {/* Mobile/Tablet Layout */}
                    <div className="xl:hidden p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                            <Package className="w-5 h-5 text-red-900" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm sm:text-base">
                              Order {order.id}
                            </span>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {order.items} • {order.total}
                            </p>
                          </div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Order Date</p>
                          <p className="font-medium text-gray-900 text-sm">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Delivery</p>
                          <p className="font-medium text-gray-900 text-sm">{order.estimatedDelivery}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Tracking Number</p>
                        <p className="font-mono text-sm text-gray-700">{order.trackingNumber}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${order.statusColor}`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.status}
                        </div>
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors text-sm flex items-center gap-2 shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Track
                        </button>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden xl:grid grid-cols-12 gap-4 py-5 px-3 items-center">
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                          <Package className="w-6 h-6 text-red-900" />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-base">
                            Order {order.id}
                          </span>
                          <p className="text-sm text-gray-500">{order.items} • {order.total}</p>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${order.statusColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          {order.status}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="flex items-center gap-2 text-gray-900 font-medium text-sm">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {order.date}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900 font-mono">{order.trackingNumber}</p>
                          <p className="text-gray-500 text-xs">Est. Delivery: {order.estimatedDelivery}</p>
                        </div>
                      </div>

                      <div className="col-span-3 text-center">
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="bg-red-900 text-nowrap  text-white px-6 py-2.5 rounded-lg hover:bg-red-800 transition-colors text-sm font-medium flex items-center gap-2 mx-auto shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="text-center py-16 sm:py-20">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-red-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  No orders found
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
                  Try searching with a different Order ID or Tracking Number, or adjust your filters
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedStatus("all");
                    setFilteredOrders(orders);
                  }}
                  className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors text-sm sm:text-base font-medium shadow-lg"
                >
                  Show All Orders
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-red-200 rounded-xl p-5 hover:bg-red-50 transition-all duration-200 hover:shadow-md cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                <Package className="w-6 h-6 text-red-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Order History</h3>
                <p className="text-gray-500 text-sm">View all past orders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-red-200 rounded-xl p-5 hover:bg-red-50 transition-all duration-200 hover:shadow-md cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                <AlertCircle className="w-6 h-6 text-red-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Report Issue</h3>
                <p className="text-gray-500 text-sm">Need help with an order?</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-red-200 rounded-xl p-5 hover:bg-red-50 transition-all duration-200 hover:shadow-md cursor-pointer group sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                <Truck className="w-6 h-6 text-red-900" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base">Delivery Info</h3>
                <p className="text-gray-500 text-sm">Track delivery status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}