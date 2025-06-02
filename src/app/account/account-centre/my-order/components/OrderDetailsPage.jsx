"use client"
import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';

const orderStages = [
  {
    title: "Product Shipped",
    date: "13/09/2024 05:23 pm",
    description: "Product shipped from Delhi warehouse",
    icon: Truck,
    status: "completed"
  },
  {
    title: "Product Packaging",
    date: "13/09/2024 05:23 pm",
    description: "Product packed in Delhi warehouse",
    icon: Package,
    status: "completed"
  },
  {
    title: "Order Confirmed",
    date: "13/09/2024 05:23 pm",
    description: "Tracking Number Assigned: 09876543212345",
    icon: CheckCircle,
    status: "completed"
  },
  {
    title: "Order Placed",
    date: "13/09/2024 05:23 pm",
    icon: Info,
    status: "completed"
  },
];

export function OrderDetailsPage({ onBack = () => {} }) {
  const [activeTab, setActiveTab] = useState("history");

  const tabs = [
    { id: "history", label: "History", icon: Clock },
    { id: "details", label: "Details", icon: Package },
    { id: "receiver", label: "Receiver", icon: User }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1600px] mx-auto px-0 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 md:py-8">
        {/* Header Navigation - Fully Responsive */}
        <div className="mb-4 xs:mb-6 sm:mb-8">
          <div className="flex items-center gap-1 xs:gap-2 mb-3 xs:mb-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-1 xs:gap-2 text-red-900 hover:text-red-700 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs xs:text-sm sm:text-base font-medium">My Orders</span>
            </button>
            <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
            <span className="text-gray-700 text-xs xs:text-sm sm:text-base font-medium">Order Details</span>
          </div>
        </div>

        {/* Order Header Card - Fully Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-red-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <div className="flex flex-col xs:flex-row items-start justify-between gap-3 xs:gap-4">
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 w-full xs:w-auto">
              <div className="p-2 xs:p-2.5 sm:p-3 bg-red-100 rounded-lg sm:rounded-xl flex-shrink-0">
                <Package className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-red-900" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">Order #5913</h1>
                <p className="text-gray-600 text-xs xs:text-sm sm:text-base">Noorani Jutti</p>
              </div>
            </div>

            <div className="flex flex-col items-start xs:items-end gap-2 w-full xs:w-auto">
              <div className="flex items-center gap-1 xs:gap-2 bg-amber-100 text-amber-800 px-2 xs:px-3 py-1 xs:py-1.5 rounded-full border border-amber-200">
                <Clock className="w-3 h-3 xs:w-4 xs:h-4" />
                <span className="text-xs xs:text-sm font-medium">In Progress</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs xs:text-sm">
                <Truck className="w-3 h-3 xs:w-4 xs:h-4" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Information Grid - Fully Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-red-100 p-3 xs:p-4 sm:p-6 mb-4 xs:mb-6">
          <h2 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 xs:w-5 xs:h-5 text-red-900" />
            Order Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 text-xs xs:text-sm">
            <div className="p-2 xs:p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                <span className="font-medium text-gray-900">Order Date</span>
              </div>
              <p className="text-gray-700">12th Jan, 2024</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                <span className="font-medium text-gray-900">Delivery Address</span>
              </div>
              <p className="text-gray-700 break-words">12th Avenue, Mumbai, Maharashtra, 110071</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                <span className="font-medium text-gray-900">Expected Delivery</span>
              </div>
              <p className="text-gray-700">18th Jan, 2024</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Truck className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                <span className="font-medium text-gray-900">Tracking Number</span>
              </div>
              <p className="text-gray-700 font-mono text-xs xs:text-sm break-all">09876543212345</p>
            </div>
            
            <div className="p-2 xs:p-3 bg-red-50 rounded-lg border border-red-100 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                <Package className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                <span className="font-medium text-gray-900">Total Amount</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm xs:text-base sm:text-lg">₹15,000</p>
            </div>
          </div>
        </div>

        {/* Tabs - Fully Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-red-100 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 xs:gap-2 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4 font-medium text-xs xs:text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? "bg-red-900 text-white border-b-2 border-red-900"
                      : "text-gray-600 hover:text-red-900 hover:bg-red-50"
                  }`}
                >
                  <TabIcon className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span className="hidden xs:inline sm:hidden md:inline">{tab.label}</span>
                  <span className="xs:hidden sm:inline md:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content - Fully Responsive */}
          <div className="p-3 xs:p-4 sm:p-6">
            {activeTab === "history" && (
              <div className="relative">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 xs:w-5 xs:h-5 text-red-900" />
                  Order Timeline
                </h3>
                
                <div className="relative ml-3 xs:ml-4 sm:ml-6">
                  {orderStages.map((stage, index) => {
                    const StageIcon = stage.icon;
                    return (
                      <div key={index} className="relative pb-6 xs:pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index !== orderStages.length - 1 && (
                          <div className="absolute left-3 xs:left-4 top-6 xs:top-8 w-0.5 h-full bg-red-200"></div>
                        )}
                        
                        {/* Timeline node */}
                        <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                          <div className="relative z-10 flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-red-900 rounded-full flex-shrink-0">
                            <StageIcon className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="bg-red-50 rounded-lg p-2 xs:p-3 sm:p-4 border border-red-100">
                              <h4 className="font-semibold text-gray-900 mb-1 text-xs xs:text-sm sm:text-base">{stage.title}</h4>
                              <p className="text-xs xs:text-sm text-gray-600 mb-1 xs:mb-2">{stage.date}</p>
                              {stage.description && (
                                <p className="text-xs xs:text-sm text-gray-500 break-words">{stage.description}</p>
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
                  <Package className="w-4 h-4 xs:w-5 xs:h-5 text-red-900" />
                  Order Items
                </h3>
                
                <div className="space-y-3 xs:space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 xs:p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 min-w-0 flex-1">
                        <div className="p-1.5 xs:p-2 bg-red-100 rounded-lg flex-shrink-0">
                          <Package className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-red-900" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 text-xs xs:text-sm sm:text-base">New Jutti</h4>
                          <p className="text-xs xs:text-sm text-gray-600">Green | Size M</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-medium text-gray-900 text-xs xs:text-sm">1 piece</p>
                        <p className="text-sm xs:text-base sm:text-lg font-semibold text-red-900">₹8,500</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "receiver" && (
              <div>
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2">
                  <User className="w-4 h-4 xs:w-5 xs:h-5 text-red-900" />
                  Receiver Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <User className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Full Name</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">John Doe</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <Mail className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Email Address</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm break-all">johndoe@email.com</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <Phone className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Phone Number</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">+91 9876543210</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Delivery Address</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm break-words">Qash India, Rajouri Garden</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">City & Postal Code</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">New Delhi 110071</p>
                  </div>
                  
                  <div className="p-2 xs:p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1 xs:gap-2 mb-1 xs:mb-2">
                      <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-900 flex-shrink-0" />
                      <span className="font-medium text-gray-900 text-xs xs:text-sm">Region</span>
                    </div>
                    <p className="text-gray-700 text-xs xs:text-sm">New Delhi</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}