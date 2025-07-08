"use client"

import { useState } from "react";
import { Truck } from "lucide-react";

const DeliveryInformation = ({ variant = "desktop" }) => {
  const [pincode, setPincode] = useState("");

  if (variant === "mobile") {
    return (
      <div className="mb-8">
        <h3 className="text-sm font-medium mb-3">Delivery to</h3>
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            className="px-3 py-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-red-900 text-sm">
            Delivery by 31st January, Friday |
            <span className="text-gray-400 line-through ml-2">
              Free ₹60
            </span>
          </p>
          <p className="text-gray-400 text-sm">
            If order before 9:30 P.M
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 bg-red-900 rounded-full"></div>
        <h3 className="text-base font-semibold text-gray-900">Delivery Information</h3>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
        <div className="flex gap-2 max-w-md mb-3">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium">
            Check
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-red-900 text-sm font-medium">
              Delivery by 31st January, Friday |
              <span className="text-gray-400 line-through ml-2">₹60</span>
              <span className="text-green-600 ml-1">FREE</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-gray-600 text-sm">
              If order before 9:30 P.M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FreeDeliveryBanner = ({ variant = "desktop" }) => {
  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
        <Truck className="w-6 h-6 text-red-900 flex-shrink-0" />
        <span className="text-red-900 text-sm font-medium">
          Free delivery on orders above ₹500.00
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
      <Truck className="w-6 h-6 text-red-900 flex-shrink-0" />
      <div>
        <span className="text-red-900 text-sm font-semibold block">
          Free delivery on orders above ₹500.00
        </span>
        <span className="text-red-700 text-xs">
          Save on shipping costs with minimum order value
        </span>
      </div>
    </div>
  );
};

// Demo component showing both variants
export default function DeliveryDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Components</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Desktop Version</h2>
          <div className="max-w-md">
            <DeliveryInformation variant="desktop" />
            <FreeDeliveryBanner variant="desktop" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Mobile Version</h2>
          <div className="max-w-md">
            <DeliveryInformation variant="mobile" />
            <FreeDeliveryBanner variant="mobile" />
          </div>
        </div>
      </div>
    </div>
  );
}