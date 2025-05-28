"use client";
import React from 'react';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  Eye, 
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';

const orders = [
  {
    id: "#5913",
    date: "12th Jan, 2025",
    value: "INR 8,500",
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    statusIcon: Clock,
  },
  {
    id: "#5914",
    date: "14th Jan, 2025",
    value: "INR 7,000",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800 border-green-200",
    statusIcon: CheckCircle,
  },
  {
    id: "#5915",
    date: "15th Jan, 2025",
    value: "INR 5,500",
    status: "Canceled",
    statusColor: "bg-red-100 text-red-800 border-red-200",
    statusIcon: XCircle,
  },
  {
    id: "#5916",
    date: "16th Jan, 2025",
    value: "INR 9,200",
    status: "In Progress",
    statusColor: "bg-amber-100 text-amber-800 border-amber-200",
    statusIcon: Clock,
  },
];

export const OrderHistoryDetails = ({ onOrderClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1600px] mx-auto  py-3 sm:py-6 md:py-8">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          {/* <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
            <button 
              onClick={onOrderClick}
              className="flex items-center gap-1 sm:gap-2 text-red-900 hover:text-red-700 transition-colors group"
            >
              <ArrowLeft className="w-3 sm:w-4 h-3 sm:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs sm:text-sm md:text-base font-medium">My Orders</span>
            </button>
            <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
            <span className="text-gray-700 text-xs sm:text-sm md:text-base font-medium">Order History</span>
          </div> */}
          
          <div  className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
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
            <div className="col-span-4 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Package className="w-4 h-4" />
              Order Details
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Clock className="w-4 h-4" />
              Status
            </div>
            <div className="col-span-3 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <Calendar className="w-4 h-4" />
              Order Date
            </div>
            <div className="col-span-2 flex items-center gap-2 text-red-900 font-semibold text-sm">
              <DollarSign className="w-4 h-4" />
              Total Value
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Orders List */}
          <div className="divide-y  divide-gray-100">
            {orders.map((order, index) => {
              const StatusIcon = order.statusIcon;
              return (
                <div
                  key={index}
                  className="group hover:bg-red-50/50 transition-all duration-200 cursor-pointer"
                  onClick={onOrderClick}
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
                            Order {order.id}
                          </span>
                          <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Click to view details</p>
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
                      <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 group-hover:text-red-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:grid grid-cols-12 gap-4 py-5 px-6 items-center">
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                        <Package className="w-6 h-6 text-red-900" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 text-base">
                          Order {order.id}
                        </span>
                        <p className="text-sm text-gray-500">Click to view details</p>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className={`inline-flex text-nowrap items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border ${order.statusColor}`}>
                        <StatusIcon className="w-4 h-4" />
                        {order.status}
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="flex items-center gap-2 text-gray-900 font-medium">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {order.date}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex items-center gap-2 text-gray-900 font-semibold">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        {order.value}
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <Eye className="w-5 h-5 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State Footer */}
          <div className="p-3 sm:p-6 text-center border-t border-gray-100 bg-gray-50">
            <p className="text-gray-500 text-xs sm:text-sm">
              Showing {orders.length} orders • 
              <button className="text-red-900 hover:text-red-700 ml-1 font-medium">
                Load more orders
              </button>
            </p>
          </div>
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