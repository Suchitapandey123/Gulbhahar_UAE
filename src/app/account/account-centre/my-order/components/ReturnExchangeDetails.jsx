// import { 
//     ArrowLeft,
//     ChevronRight, 
//     RotateCcw, 
//     RefreshCw,
//     Search,
//     Package,
//     Calendar,
//     Clock,
//     CheckCircle,
//     XCircle,
//     Filter,
//     Download
//   } from "lucide-react";
  
//   const ReturnExchangeDetails = ({ onBack = () => {} }) => {
//     const returnRequests = [
//       {
//         id: "#6013",
//         orderDate: "12th Jan, 2025",
//         status: "Eligible",
//         items: "Wireless Headphones",
//         amount: "$89.99",
//         returnWindow: "25 days left",
//         canReturn: true,
//         canExchange: true
//       },
//       {
//         id: "#6012",
//         orderDate: "10th Jan, 2025",
//         status: "Eligible",
//         items: "Smart Watch Pro",
//         amount: "$299.99",
//         returnWindow: "23 days left",
//         canReturn: true,
//         canExchange: true
//       },
//       {
//         id: "#6011",
//         orderDate: "8th Jan, 2025",
//         status: "Return Requested",
//         items: "Phone Case Set",
//         amount: "$45.00",
//         returnWindow: "Processing",
//         canReturn: false,
//         canExchange: false
//       },
//       {
//         id: "#6010",
//         orderDate: "5th Jan, 2025",
//         status: "Expired",
//         items: "Laptop Stand",
//         amount: "$156.50",
//         returnWindow: "Window closed",
//         canReturn: false,
//         canExchange: false
//       }
//     ];
  
//     const handleRequestReturn = (orderId) => {
//       // // console.log(`Request return for order ${orderId}`);
//     };
  
//     const handleRequestExchange = (orderId) => {
//       // // console.log(`Request exchange for order ${orderId}`);
//     };
  
//     const handleSearch = (e) => {
//       // // console.log(`Search for: ${e.target.value}`);
//     };
  
//     const getStatusBadge = (status) => {
//       switch (status) {
//         case "Eligible":
//           return "bg-green-100 text-green-800 border-green-200";
//         case "Return Requested":
//           return "bg-blue-100 text-blue-800 border-blue-200";
//         case "Expired":
//           return "bg-red-100 text-red-800 border-red-200";
//         default:
//           return "bg-gray-100 text-gray-800 border-gray-200";
//       }
//     };
  
//     const getStatusIcon = (status) => {
//       switch (status) {
//         case "Eligible":
//           return CheckCircle;
//         case "Return Requested":
//           return Clock;
//         case "Expired":
//           return XCircle;
//         default:
//           return Package;
//       }
//     };
  
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-red-50/40 via-white to-red-50/20">
//         <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
//           {/* Header Section */}
//           <div className="mb-8">
//             {/* Breadcrumb */}
//             <div className="flex items-center gap-2 mb-6">
//               <button 
//                 onClick={onBack}
//                 className="flex items-center gap-2 text-red-900 hover:text-red-700 transition-colors group"
//               >
//                 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
//                 <span className="text-sm sm:text-base font-medium">My Orders</span>
//               </button>
//               <ChevronRight className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-700 text-sm sm:text-base font-medium">Return/Exchange</span>
//             </div>
            
//             {/* Title and Search */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-900 rounded-xl">
//                   <RotateCcw className="text-white w-6 h-6" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                     Return & Exchange
//                   </h1>
//                   <p className="text-gray-600 text-sm sm:text-base mt-1">
//                     Manage your return and exchange requests
//                   </p>
//                 </div>
//               </div>
              
//               {/* Search Bar */}
//               <div className="w-full lg:w-96">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by Order ID or Tracking Number"
//                     onChange={handleSearch}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-24 mt-6" />
//           </div>
  
//           {/* Filter and Actions Bar */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <button className="flex items-center gap-2 px-4 py-2 text-red-900 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
//                 <Filter className="w-4 h-4" />
//                 Filter by Status
//               </button>
//               <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900 focus:border-red-900 text-sm">
//                 <option>All Orders</option>
//                 <option>Eligible</option>
//                 <option>Return Requested</option>
//                 <option>Expired</option>
//               </select>
//             </div>
            
//             <button className="flex items-center gap-2 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium">
//               <Download className="w-4 h-4" />
//               Export Data
//             </button>
//           </div>
  
//           {/* Return/Exchange List - Card Layout */}
//           <div className="space-y-6">
//             {returnRequests.length > 0 ? (
//               returnRequests.map((request, index) => {
//                 const StatusIcon = getStatusIcon(request.status);
//                 return (
//                   <div
//                     key={index}
//                     className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-200 hover:shadow-md transition-all duration-200"
//                   >
//                     {/* Card Header */}
//                     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//                       <div className="flex items-center gap-4">
//                         <div className="p-3 bg-red-100 rounded-xl">
//                           <Package className="w-6 h-6 text-red-900" />
//                         </div>
//                         <div>
//                           <h3 className="font-semibold text-lg text-gray-900">
//                             Order {request.id}
//                           </h3>
//                           <p className="text-gray-600 text-sm">{request.items}</p>
//                         </div>
//                       </div>
                      
//                       <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusBadge(request.status)}`}>
//                         <StatusIcon className="w-4 h-4" />
//                         {request.status}
//                       </div>
//                     </div>
  
//                     {/* Card Content */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Calendar className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm font-medium text-gray-700">Order Date</span>
//                         </div>
//                         <p className="text-lg font-semibold text-gray-900">{request.orderDate}</p>
//                       </div>
                      
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Package className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm font-medium text-gray-700">Order Amount</span>
//                         </div>
//                         <p className="text-lg font-semibold text-gray-900">{request.amount}</p>
//                       </div>
                      
//                       <div className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex items-center gap-2 mb-2">
//                           <Clock className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm font-medium text-gray-700">Return Window</span>
//                         </div>
//                         <p className={`text-lg font-semibold ${
//                           request.status === "Expired" ? "text-red-600" : 
//                           request.status === "Return Requested" ? "text-blue-600" : "text-green-600"
//                         }`}>
//                           {request.returnWindow}
//                         </p>
//                       </div>
//                     </div>
  
//                     {/* Return Policy Info */}
//                     {request.status === "Eligible" && (
//                       <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                         <div className="flex items-start gap-3">
//                           <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
//                           <div>
//                             <p className="text-blue-800 font-medium text-sm">Return Policy</p>
//                             <p className="text-blue-700 text-sm mt-1">
//                               You can return this item within 30 days of delivery. Items must be in original condition with tags attached.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
  
//                     {/* Actions */}
//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <button
//                         onClick={() => handleRequestExchange(request.id)}
//                         disabled={!request.canExchange}
//                         className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
//                           request.canExchange
//                             ? "bg-red-900 text-white hover:bg-red-800"
//                             : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                         }`}
//                       >
//                         <RefreshCw className="w-4 h-4" />
//                         Request Exchange
//                       </button>
                      
//                       <button
//                         onClick={() => handleRequestReturn(request.id)}
//                         disabled={!request.canReturn}
//                         className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
//                           request.canReturn
//                             ? "border border-red-200 text-red-900 hover:bg-red-50"
//                             : "border border-gray-200 text-gray-400 cursor-not-allowed"
//                         }`}
//                       >
//                         <RotateCcw className="w-4 h-4" />
//                         Request Return
//                       </button>
                      
//                       <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               /* Empty State */
//               <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
//                 <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <RotateCcw className="w-12 h-12 text-red-900" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-3">
//                   No Return Requests Found
//                 </h3>
//                 <p className="text-gray-500 mb-8 max-w-md mx-auto">
//                   You haven't made any return or exchange requests yet. Eligible orders will appear here.
//                 </p>
//                 <button
//                   onClick={onBack}
//                   className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-medium"
//                 >
//                   View Orders
//                 </button>
//               </div>
//             )}
//           </div>
  
//           {/* Summary Cards */}
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-white border border-green-200 rounded-xl p-5 hover:bg-green-50 transition-all duration-200">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-green-100 rounded-xl">
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base">Eligible</h3>
//                   <p className="text-gray-500 text-sm">2 orders</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white border border-blue-200 rounded-xl p-5 hover:bg-blue-50 transition-all duration-200">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-xl">
//                   <Clock className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base">Processing</h3>
//                   <p className="text-gray-500 text-sm">1 request</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white border border-red-200 rounded-xl p-5 hover:bg-red-50 transition-all duration-200">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 rounded-xl">
//                   <XCircle className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base">Expired</h3>
//                   <p className="text-gray-500 text-sm">1 order</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white border border-red-200 rounded-xl p-5 hover:bg-red-50 transition-all duration-200">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-red-100 rounded-xl">
//                   <Package className="w-6 h-6 text-red-900" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900 text-base">Total Orders</h3>
//                   <p className="text-gray-500 text-sm">4 orders</p>
//                 </div>
//               </div>
//             </div>
//           </div>
  
//           {/* Help Section */}
//           <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-1">Need Help with Returns?</h3>
//                 <p className="text-sm text-gray-600">
//                   Check our return policy or contact customer support for assistance.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
//                   Return Policy
//                 </button>
//                 <button className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium">
//                   Contact Support
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default ReturnExchangeDetails;



"use client";

import {
  ChevronRight,
  XCircle,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Ban,
} from "lucide-react";

export default function CancelOrderComingSoon({ onBack = () => {} }) {
  return (
    <div className="bg-gradient-to-br from-red-50/40 via-white to-red-50/20 flex justify-center px-0 py-2">
      <div className="w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 px-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-red-900 hover:text-red-700 transition-colors group"
          >
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-xs sm:text-sm md:text-base font-medium">
              Cancel Order
            </span>
          </button>
        </div>

        {/* Main Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-red-100 shadow-xl rounded-2xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 text-center">

          {/* Icon */}
          <div className="mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-red-100 via-white to-red-50 shadow-inner flex items-center justify-center">
            <XCircle className="w-9 h-9 sm:w-12 sm:h-12 text-red-900 animate-pulse" />
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3">
            Cancel Your Order – Coming Soon
          </h1>

          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Soon, you will be able to cancel orders directly from your dashboard.
            We're working on a seamless process to improve your shopping flexibility.
            Stay tuned!
          </p>

          {/* Highlights Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 px-1">
            
            {/* Fast Cancellation */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <Clock className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-red-900" />
              <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">
                Fast Cancellation
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 text-center">
                Cancel eligible orders in seconds
              </p>
            </div>

            {/* Secure Process */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-green-700" />
              <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">
                Secure Process
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 text-center">
                Verified and safe system
              </p>
            </div>

            {/* Full Transparency */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-yellow-600" />
              <p className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">
                Full Transparency
              </p>
              <p className="text-[10px] sm:text-xs text-gray-600 text-center">
                Clear refund & status info
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 mx-2">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <Ban className="w-6 h-6 text-blue-700" />
              <div>
                <p className="font-semibold text-blue-800 text-sm sm:text-base">
                  Feature in Development
                </p>
                <p className="text-blue-700 text-xs sm:text-sm mt-1 leading-relaxed">
                  Our team is currently creating a smooth & fast cancellation workflow.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="px-5 py-2 sm:px-6 sm:py-3 bg-red-900 text-white rounded-lg shadow-md text-xs sm:text-sm lg:text-base font-medium hover:bg-red-800 transition-colors">
            Coming Soon
          </button>

          {/* Decorative Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full mx-auto mt-6" />
        </div>
      </div>
    </div>
  );
}
