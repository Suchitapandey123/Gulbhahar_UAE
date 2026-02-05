
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
