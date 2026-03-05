// "use client";
// import React, { useState } from 'react';
// import { 
//   ArrowLeft, 
//   History, 
//   MapPin, 
//   ArrowLeftRight, 
//   Package,
//   ChevronRight
// } from 'lucide-react';
// import PaymentDetailsPage from './PaymentMethodsDetails';
// import { OrderHistoryDetails } from './OrderHistoryDetails';
// import { OrderDetailsPage } from './OrderDetailsPage';
// import TrackOrderPage from './TrackOrderPage';
// import RefundHistoryDetails from './RefundHistory';
// import ReturnExchangeDetails from './ReturnExchangeDetails';

// const OrderView = {
//   MAIN: "main",
//   HISTORY: "history", 
//   DETAILS: "details",
//   TRACK: "track",
//   REFUND: "refund",
//   RETURN: "return",
//   PAYMENT: "payment",
// };

// // ✨ Light and Eye-catching OrderBox
// const OrderBox = ({ title, description, onClick, icon: Icon, href }) => {
//   const content = (
//     <div 
//       className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#7f1d1d]/40 p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
//       onClick={onClick}
//     >
//       {/* Subtle gradient on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#7f1d1d]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
//       {/* Content Container */}
//       <div className="relative z-10 flex items-start gap-4">
//         {/* Icon */}
//         <div className="flex-shrink-0">
//           <div className="w-12 h-12 rounded-lg bg-[#7f1d1d]/10 flex items-center justify-center group-hover:bg-[#7f1d1d] transition-all duration-300">
//             <Icon className="w-6 h-6 text-[#7f1d1d] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
//           </div>
//         </div>
        
//         <div className="flex-1 min-w-0">
//           {/* Title */}
//           <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-[#7f1d1d] transition-colors duration-300">
//             {title}
//           </h3>
          
//           {/* Description */}
//           <p className="text-sm text-gray-600 leading-relaxed mb-3">
//             {description}
//           </p>
          
//           {/* Arrow */}
//           <div className="flex items-center text-[#7f1d1d] text-sm font-medium">
//             <span>View details</span>
//             <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (href) return <a href={href}>{content}</a>;
//   return content;
// };

// // View Components with clean styling
// const OrderHistoryDetails1 = ({ onOrderClick, onBack }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <OrderHistoryDetails onOrderClick={onOrderClick} />
//   </div>
// );

// const OrderDetailsPage1 = ({ onBack, order }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <OrderDetailsPage selectedOrder={order} onBack={onBack} />
//   </div>
// );

// const TrackOrderPage1 = ({ onBack }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <TrackOrderPage />
//   </div>
// );

// const RefundHistoryDetails1 = ({ onBack }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <RefundHistoryDetails />
//   </div>
// );

// const ReturnExchangeDetails1 = ({ onBack }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <ReturnExchangeDetails />
//   </div>
// );

// const PaymentDetailsPage1 = ({ onBack }) => (
//   <div className="min-h-screen">
//     <button 
//       onClick={onBack}
//       className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
//     >
//       <ArrowLeft size={18} />
//       <span>Back to Orders</span>
//     </button>
//     <PaymentDetailsPage />
//   </div>
// );

// const OrderHistory = () => {
//   const [activeView, setActiveView] = useState(OrderView.MAIN);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setActiveView(OrderView.DETAILS);
//   };

//   const handleBack = () => {
//     setActiveView(OrderView.MAIN);
//     setSelectedOrder(null);
//   };

//   const orderBoxes = [
//     {
//       title: "Order History",
//       description: "View all your past orders, download invoices, and manage order queries seamlessly",
//       icon: History,
//       onClick: () => setActiveView(OrderView.HISTORY)
//     },
//     {
//       title: "Track Orders", 
//       description: "Real-time tracking for your deliveries with live updates and support access",
//       icon: MapPin,
//       onClick: () => setActiveView(OrderView.TRACK)
//     },
//     {
//       title: "Returns & Exchanges",
//       description: "Hassle-free returns and exchanges with quick processing and support",
//       icon: ArrowLeftRight,
//       onClick: () => setActiveView(OrderView.RETURN)
//     },
//   ];

//   return (
//     <div className="relative bg-white min-h-screen">
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {activeView === OrderView.MAIN && (
//           <div className="animate-fadeIn">
//             {/* Clean Header */}
//             <div className="mb-10">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-12 h-12 rounded-xl bg-[#7f1d1d] flex items-center justify-center">
//                   <Package className="text-white w-6 h-6" strokeWidth={2} />
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     My Orders
//                   </h1>
//                   <p className="text-gray-600 text-sm mt-0.5">
//                     Track and manage your orders
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Order Boxes Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
//               {orderBoxes.map((box, index) => (
//                 <OrderBox
//                   key={index}
//                   title={box.title}
//                   description={box.description}
//                   icon={box.icon}
//                   onClick={box.onClick}
//                 />
//               ))}
//             </div>

//             {/* Simple Footer Section */}
//             <div className="mt-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
//               <div className="text-center">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   Need Help?
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">
//                   Contact our support team for assistance
//                 </p>
//                 <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7f1d1d] text-white font-medium rounded-lg hover:bg-[#991b1b] transition-colors duration-300">
//                   Contact Support
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Different View Components */}
//         {activeView === OrderView.HISTORY && (
//           <OrderHistoryDetails1 
//             onOrderClick={handleOrderClick} 
//             onBack={handleBack} 
//           />
//         )}

//         {activeView === OrderView.DETAILS && (
//           <OrderDetailsPage1 
//             onBack={handleBack} 
//             order={selectedOrder} 
//           />
//         )}

//         {activeView === OrderView.TRACK && (
//           <TrackOrderPage1 onBack={handleBack} />
//         )}

//         {activeView === OrderView.REFUND && (
//           <RefundHistoryDetails1 onBack={handleBack} />
//         )}

//         {activeView === OrderView.RETURN && (
//           <ReturnExchangeDetails1 onBack={handleBack} />
//         )}

//         {activeView === OrderView.PAYMENT && (
//           <PaymentDetailsPage1 onBack={handleBack} />
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OrderHistory;





"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, History, MapPin, ArrowLeftRight,
  Package, ChevronRight, Headphones, Sparkles,
} from "lucide-react";

import PaymentDetailsPage from "./PaymentMethodsDetails";
import { OrderHistoryDetails } from "./OrderHistoryDetails";
import { OrderDetailsPage } from "./OrderDetailsPage";
import TrackOrderPage from "./TrackOrderPage";
import RefundHistoryDetails from "./RefundHistory";
import ReturnExchangeDetails from "./ReturnExchangeDetails";

const BRAND = "#7f1d1d";

const OrderView = {
  MAIN: "main", HISTORY: "history", DETAILS: "details",
  TRACK: "track", REFUND: "refund", RETURN: "return", PAYMENT: "payment",
};

/* ── Premium card for each section ── */
const OrderBox = ({ title, description, tag, onClick, icon: Icon, accent }) => (
  <div
    onClick={onClick}
    className="group relative bg-white rounded-2xl border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)" }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)"}
  >
    {/* top color bar */}
    <div className="h-[3px] w-full" style={{ background: accent }} />

    <div className="p-5 sm:p-6">
      {/* icon + tag row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${accent}14` }}
        >
          <Icon className="w-5 h-5 transition-colors duration-300" style={{ color: accent }} strokeWidth={1.75} />
        </div>
        {tag && (
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ background: `${accent}12`, color: accent }}
          >
            {tag}
          </span>
        )}
      </div>

      {/* text */}
      <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 mb-1.5 leading-tight">
        {title}
      </h3>
      <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
        {description}
      </p>

      {/* CTA row */}
      <div className="flex items-center gap-1 text-[12px] font-bold transition-all duration-200" style={{ color: accent }}>
        <span>View details</span>
        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

/* ── Back wrapper for sub-views ── */
const ViewWrapper = ({ onBack, children }) => (
  <div>
    <button
      onClick={onBack}
      className="group flex items-center gap-2 text-gray-500 hover:text-[#7f1d1d] mb-5 sm:mb-6 text-[13px] font-semibold transition-colors duration-150"
    >
      <ArrowLeft className="w-4 h-4 transition-transform duration-150 group-hover:-translate-x-0.5" strokeWidth={2} />
      Back to Orders
    </button>
    {children}
  </div>
);

/* ══════════════════════════════════════════════ */
const OrderHistory = () => {
  const [activeView, setActiveView] = useState(OrderView.MAIN);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const urlView = params.get("view");
    if (urlView && Object.values(OrderView).includes(urlView)) setActiveView(urlView);
  }, [params]);

  const changeView = (view) => {
    setActiveView(view);
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    router.replace(url.toString(), { scroll: false });
  };

  const handleOrderClick = (order) => { setSelectedOrder(order); changeView(OrderView.DETAILS); };
  const handleBack = () => { setSelectedOrder(null); changeView(OrderView.MAIN); };

  const orderBoxes = [
    {
      title: "Order History",
      description: "View all your past orders, download invoices and manage queries",
      tag: "All Orders",
      icon: History,
      accent: BRAND,
      onClick: () => changeView(OrderView.HISTORY),
    },
    {
      title: "Track Orders",
      description: "Real-time delivery tracking with live updates and courier support",
      tag: "Live",
      icon: MapPin,
      accent: BRAND,
      onClick: () => changeView(OrderView.TRACK),
    },
    {
      title: "Returns & Exchanges",
      description: "Hassle-free returns and exchanges processed quickly",
      tag: "Easy",
      icon: ArrowLeftRight,
      accent: BRAND,
      onClick: () => changeView(OrderView.RETURN),
    },
  ];

  return (
    <div className="w-full min-h-screen pb-10">

      {/* ── MAIN DASHBOARD ── */}
      {activeView === OrderView.MAIN && (
        <div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #a01212 100%)`, boxShadow: `0 4px 14px ${BRAND}35` }}
              >
                <Package className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <h1 className="text-[17px] sm:text-xl font-bold text-gray-900 leading-tight tracking-tight">
                  My Orders
                </h1>
                <p className="text-[11px] text-gray-400 mt-0.5">Track and manage your purchases</p>
              </div>
            </div>

            <span
              className="hidden sm:flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full"
              style={{ background: `${BRAND}0f`, color: BRAND }}
            >
              <Sparkles className="w-3 h-3" strokeWidth={2} />
              Account
            </span>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {orderBoxes.map((box, i) => (
              <OrderBox key={i} {...box} />
            ))}
          </div>

          {/* Need Help strip */}
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4 text-gray-400" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-gray-800">Need help with an order?</p>
                <p className="text-[11px] text-gray-400">Our support team is here for you</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold text-white transition-all active:scale-95 shrink-0 self-start sm:self-auto"
              style={{
                background: `linear-gradient(135deg, ${BRAND} 0%, #a01212 100%)`,
                boxShadow: `0 3px 10px ${BRAND}30`,
              }}
            >
              Contact Support
              <ChevronRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      )}

      {/* ── SUB VIEWS ── */}
      {activeView === OrderView.HISTORY && (
        <ViewWrapper onBack={handleBack}>
          <OrderHistoryDetails onOrderClick={handleOrderClick} />
        </ViewWrapper>
      )}
      {activeView === OrderView.DETAILS && (
        <ViewWrapper onBack={handleBack}>
          <OrderDetailsPage selectedOrder={selectedOrder} />
        </ViewWrapper>
      )}
      {activeView === OrderView.TRACK && (
        <ViewWrapper onBack={handleBack}><TrackOrderPage /></ViewWrapper>
      )}
      {activeView === OrderView.REFUND && (
        <ViewWrapper onBack={handleBack}><RefundHistoryDetails /></ViewWrapper>
      )}
      {activeView === OrderView.RETURN && (
        <ViewWrapper onBack={handleBack}><ReturnExchangeDetails /></ViewWrapper>
      )}
      {activeView === OrderView.PAYMENT && (
        <ViewWrapper onBack={handleBack}><PaymentDetailsPage /></ViewWrapper>
      )}
    </div>
  );
};

export default OrderHistory;
