"use client";

import { checkDeliveryAPI } from "@/app/api/delivery/deliveryApi";
import { AlertCircle, Check, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DeliveryCheckerProps {
  customRed: string;
}

export const DeliveryChecker = ({ customRed }: DeliveryCheckerProps) => {
  const [pincode, setPincode] = useState("");
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<any>(null);
  const [deliveryError, setDeliveryError] = useState("");

  const checkDelivery = async () => {
    if (!pincode || pincode.length !== 6) {
      setDeliveryError("Please enter a valid 6-digit pincode");
      return;
    }

    setIsCheckingDelivery(true);
    setDeliveryError("");
    setDeliveryInfo(null);

    try {
      const data = await checkDeliveryAPI(pincode);
      if (data.msg.delivery_codes && data.msg.delivery_codes.length > 0) {
        setDeliveryInfo(data.msg.delivery_codes[0].postal_code);
        toast.success(
          `Delivery available to ${data.msg.delivery_codes[0].postal_code.city}`,
        );
      } else {
        setDeliveryError("Delivery not available to this pincode");
        toast.error("Delivery not available to this pincode");
      }
    } catch (error) {
      setDeliveryError("Failed to check delivery. Please try again.");
      toast.error("Failed to check delivery availability");
    } finally {
      setIsCheckingDelivery(false);
    }
  };

  useEffect(() => {
    if (pincode.length < 6) {
      setDeliveryInfo(null);
      setDeliveryError("");
    }
  }, [pincode]);

  return (
    <div className="border-t border-b border-gray-200 py-6 space-y-4">
      <h3 className="text-base font-medium text-gray-900">Delivery For</h3>
      <div className="flex gap-2 w-full md:max-w-md">
        <input
          type="text"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="Enter your Pincode"
          className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
          maxLength={6}
          inputMode="numeric"
        />
        <button
          onClick={checkDelivery}
          disabled={isCheckingDelivery || pincode.length !== 6}
          className="px-6 py-3 text-white rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-all"
          style={{ backgroundColor: customRed }}
        >
          {isCheckingDelivery ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "CHECK"
          )}
        </button>
      </div>

      {/* Add a note :Note: The color of the product may vary slightly, as screen resolution differs on devices used to view our website.  */}
      {/* Delivery Details */}
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span>
            <span className="font-medium">Delivery available</span> between{" "}
            <span className="font-semibold">10:00 AM – 7:00 PM</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-600" />
          <span>
            Estimated delivery within{" "}
            <span className="font-semibold">7 days</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500">
            Delivery timelines may vary based on location and availability
          </span>
        </div>
      </div>

      {deliveryError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{deliveryError}</span>
        </div>
      )}

      {deliveryInfo && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>
            Delivery available to {deliveryInfo.city}, {deliveryInfo.district}
          </span>
        </div>
      )}
    </div>
  );
};
