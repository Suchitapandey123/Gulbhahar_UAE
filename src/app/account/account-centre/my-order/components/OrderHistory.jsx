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
import { useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  History, 
  MapPin, 
  ArrowLeftRight, 
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

// ✨ Light and Eye-catching OrderBox
const OrderBox = ({ title, description, onClick, icon: Icon }) => {
  return (
    <div 
      className="group relative bg-white rounded-xl border border-gray-200 hover:border-[#7f1d1d]/40 p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#7f1d1d]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-lg bg-[#7f1d1d]/10 flex items-center justify-center group-hover:bg-[#7f1d1d] transition-all duration-300">
            <Icon className="w-6 h-6 text-[#7f1d1d] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1.5 group-hover:text-[#7f1d1d] transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            {description}
          </p>
          
          <div className="flex items-center text-[#7f1d1d] text-sm font-medium">
            <span>View details</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

// View Components
const ViewWrapper = ({ onBack, children }) => (
  <div className="min-h-screen">
    <button 
      onClick={onBack}
      className="flex items-center gap-2 text-gray-700 hover:text-[#7f1d1d] mb-6 font-medium transition-colors"
    >
      <ArrowLeft size={18} />
      <span>Back to Orders</span>
    </button>
    {children}
  </div>
);

const OrderHistory = () => {
  const [activeView, setActiveView] = useState(OrderView.MAIN);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const router = useRouter();
  const params = useSearchParams();

  // Load view from URL on refresh
  useEffect(() => {
    const urlView = params.get("view");
    if (urlView && Object.values(OrderView).includes(urlView)) {
      setActiveView(urlView);
    }
  }, [params]);

  // Change view + update URL params
  const changeView = (view) => {
    setActiveView(view);

    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("view", view);
    router.replace(newUrl.toString(), { scroll: false });
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    changeView(OrderView.DETAILS);
  };

  const handleBack = () => {
    setSelectedOrder(null);
    changeView(OrderView.MAIN);
  };

  const orderBoxes = [
    {
      title: "Order History",
      description: "View all your past orders, download invoices, and manage order queries seamlessly",
      icon: History,
      onClick: () => changeView(OrderView.HISTORY)
    },
    {
      title: "Track Orders", 
      description: "Real-time tracking for your deliveries with live updates and support access",
      icon: MapPin,
      onClick: () => changeView(OrderView.TRACK)
    },
    {
      title: "Returns & Exchanges",
      description: "Hassle-free returns and exchanges with quick processing and support",
      icon: ArrowLeftRight,
      onClick: () => changeView(OrderView.RETURN)
    },
  ];

  return (
    <div className="relative bg-white min-h-screen">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {activeView === OrderView.MAIN && (
          <div className="animate-fadeIn">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#7f1d1d] flex items-center justify-center">
                  <Package className="text-white w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    My Orders
                  </h1>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Track and manage your orders
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {orderBoxes.map((box, index) => (
                <OrderBox
                  key={index}
                  title={box.title}
                  description={box.description}
                  icon={box.icon}
                  onClick={box.onClick}
                />
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-gray-50 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need Help?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact our support team for assistance
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7f1d1d] text-white font-medium rounded-lg hover:bg-[#991b1b] transition-colors duration-300">
                  Contact Support
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW SECTIONS */}
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
          <ViewWrapper onBack={handleBack}>
            <TrackOrderPage />
          </ViewWrapper>
        )}

        {activeView === OrderView.REFUND && (
          <ViewWrapper onBack={handleBack}>
            <RefundHistoryDetails />
          </ViewWrapper>
        )}

        {activeView === OrderView.RETURN && (
          <ViewWrapper onBack={handleBack}>
            <ReturnExchangeDetails />
          </ViewWrapper>
        )}

        {activeView === OrderView.PAYMENT && (
          <ViewWrapper onBack={handleBack}>
            <PaymentDetailsPage />
          </ViewWrapper>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;
