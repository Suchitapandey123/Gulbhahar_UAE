"use client";
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  History, 
  MapPin, 
  RefreshCcw, 
  ArrowLeftRight, 
  CreditCard,
  Package,
  ChevronRight
} from 'lucide-react';
import PaymentDetailsPage from './PaymentMethodsDetails';
import { OrderHistoryDetails } from './OrderHistoryDetails';
import { OrderDetailsPage } from './OrderDetailsPage';
import TrackOrderPage from './TrackOrderPage';
import RefundHistoryDetails from './RefundHistory';
import ReturnExchangeDetails from './ReturnExchangeDetails';

const OrderView = {
  MAIN: "main",
  HISTORY: "history", 
  DETAILS: "details",
  TRACK: "track",
  REFUND: "refund",
  RETURN: "return",
  PAYMENT: "payment",
};

// Mock OrderBox component with beautiful styling
const OrderBox = ({ title, description, onClick, icon: Icon, href }) => {
  const content = (
    <div 
      className="group relative bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-red-300 p-3 xs:p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[140px] xs:min-h-[160px] sm:min-h-[180px]"
      onClick={onClick}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Icon container */}
        <div className="mb-2 xs:mb-3 sm:mb-4 inline-flex items-center justify-center w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg bg-red-100 text-red-900 group-hover:bg-red-900 group-hover:text-white transition-colors duration-300 flex-shrink-0">
          <Icon size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </div>
        
        {/* Title */}
        <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-1 xs:mb-2 group-hover:text-red-900 transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-xs xs:text-sm leading-relaxed mb-2 xs:mb-3 sm:mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        
        {/* Arrow indicator */}
        <div className="flex items-center text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 mt-auto">
          <span className="text-xs xs:text-sm font-medium mr-1 xs:mr-2">Explore</span>
          <ChevronRight size={12} className="xs:w-4 xs:h-4" />
        </div>
      </div>
      
      {/* Decorative corner element */}
      <div className="absolute -bottom-1 -right-1 xs:-bottom-2 xs:-right-2 w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-red-900/5 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300" />
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
};

// Mock components for different views
const OrderHistoryDetails1 = ({ onOrderClick }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3  shadow-sm border border-red-200">
    <OrderHistoryDetails onOrderClick={onOrderClick}/>
    <button 
      onClick={onOrderClick}
      className="bg-red-900 text-white px-3 xs:px-4 py-2 rounded-md sm:rounded-lg hover:bg-red-800 transition-colors text-sm xs:text-base w-full xs:w-auto"
    >
      View Order Details
    </button>
  </div>
);

const OrderDetailsPage1 = ({ onBack }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3  shadow-sm border border-red-200">
    <button onClick={onBack} className="flex items-center text-red-900 mb-3 xs:mb-4 hover:text-red-700 text-sm xs:text-base">
      <ArrowLeft size={16} className="mr-1 xs:mr-2 xs:w-5 xs:h-5" />
      Back to Orders
    </button>
    <OrderDetailsPage />
      </div>
);

const TrackOrderPage1 = ({ onBack }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3 xs:p-4 shadow-sm border border-red-200">
    <button onClick={onBack} className="flex items-center text-red-900 mb-3 xs:mb-4 hover:text-red-700 text-sm xs:text-base">
      <ArrowLeft size={16} className="mr-1 xs:mr-2 xs:w-5 xs:h-5" />
      Back to Orders
    </button>
    <TrackOrderPage />
      </div>
);

const RefundHistoryDetails1 = ({ onBack }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-red-200">
    <button onClick={onBack} className="flex items-center text-red-900 mb-3 xs:mb-4 hover:text-red-700 text-sm xs:text-base">
      <ArrowLeft size={16} className="mr-1 xs:mr-2 xs:w-5 xs:h-5" />
      Back to Orders
    </button>
    <RefundHistoryDetails />
  </div>
);

const ReturnExchangeDetails1 = ({ onBack }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3  shadow-sm border border-red-200">
    <button onClick={onBack} className="flex items-center text-red-900 mb-3 xs:mb-4 hover:text-red-700 text-sm xs:text-base">
      <ArrowLeft size={16} className="mr-1 xs:mr-2 xs:w-5 xs:h-5" />
      Back to Orders
    </button>
    <ReturnExchangeDetails />
     </div>
);

const PaymentDetailsPage1 = ({ onBack }) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-red-200">
     <button onClick={onBack} className="flex items-center text-red-900 mb-3 xs:mb-4 hover:text-red-700 text-sm xs:text-base">
      <ArrowLeft size={16} className="mr-1 xs:mr-2 xs:w-5 xs:h-5" />
      Back to Orders
    </button>
    <PaymentDetailsPage />
  </div>
);

const OrderHistory = () => {
  const [activeView, setActiveView] = useState(OrderView.MAIN);

  const orderBoxes = [
    {
      title: "Order History",
      description: "Check order history, download invoices, raise query",
      icon: History,
      onClick: () => setActiveView(OrderView.HISTORY)
    },
    {
      title: "Track Orders", 
      description: "Track orders, cancellations, contact support",
      icon: MapPin,
      onClick: () => setActiveView(OrderView.TRACK)
    },
    {
      title: "Refund History",
      description: "Track refunds, view refund status and history",
      icon: RefreshCcw,
      // href: "/account/account-centre/my-order"
      onClick: () => setActiveView(OrderView.REFUND)
    },
    {
      title: "Return/Exchange Requests",
      description: "Problem with order? Request returns and exchanges",
      icon: ArrowLeftRight,
      onClick: () => setActiveView(OrderView.RETURN)
    },
    {
      title: "Payment Methods",
      description: "Default payment methods, saved cards, UPI IDs",
      icon: CreditCard,
      onClick: () => setActiveView(OrderView.PAYMENT)
    }
  ];

  return (
    <div className=" bg-gradient-to-br from-red-50/30 to-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        {activeView === OrderView.MAIN && (
          <>
            {/* Header Section */}
            <div className="mb-4 xs:mb-6 sm:mb-8">
              <div className="flex items-start xs:items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                <div className="p-1.5 xs:p-2  bg-red-900 rounded-md sm:rounded-lg flex-shrink-0">
                  <Package className="text-white w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight break-words">
                    My Orders
                  </h2>
                  <p className="text-gray-600 mt-0.5 xs:mt-1 text-xs xs:text-sm sm:text-base">
                    Manage your orders and track deliveries
                  </p>
                </div>
              </div>
              
              {/* Decorative divider */}
              <div className="h-0.5 xs:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-16 xs:w-20 sm:w-24" />
            </div>

            {/* Order Boxes Grid */}
            <div className="grid grid-cols-1  xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
              {orderBoxes.map((box, index) => (
                <OrderBox
                  key={index}
                  title={box.title}
                  description={box.description}
                  icon={box.icon}
                  onClick={box.onClick}
                  href={box.href}
                />
              ))}
            </div>

            {/* Bottom decorative element */}
            <div className="mt-6 xs:mt-8 sm:mt-12 text-center">
              <div className="inline-flex items-center gap-1 xs:gap-2 text-gray-500 text-xs xs:text-sm">
                <div className="w-4 xs:w-6 sm:w-8 h-px bg-gradient-to-r from-transparent to-red-300"></div>
                <span className="px-1 xs:px-2">Need help? Contact support</span>
                <div className="w-4 xs:w-6 sm:w-8 h-px bg-gradient-to-l from-transparent to-red-300"></div>
              </div>
            </div>
          </>
        )}

        {/* Different View Components */}
        {activeView === OrderView.HISTORY && (
          <OrderHistoryDetails1 onOrderClick={() => setActiveView(OrderView.DETAILS)} />
        )}

        {activeView === OrderView.DETAILS && (
          <OrderDetailsPage1 onBack={() => setActiveView(OrderView.MAIN)} />
        )}

        {activeView === OrderView.TRACK && (
          <TrackOrderPage1 onBack={() => setActiveView(OrderView.MAIN)} />
        )}

        {activeView === OrderView.REFUND && (
          <RefundHistoryDetails1 onBack={() => setActiveView(OrderView.MAIN)} />
        )}

        {activeView === OrderView.RETURN && (
          <ReturnExchangeDetails1 onBack={() => setActiveView(OrderView.MAIN)} />
        )}

        {activeView === OrderView.PAYMENT && (
          <PaymentDetailsPage1 onBack={() => setActiveView(OrderView.MAIN)} />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;