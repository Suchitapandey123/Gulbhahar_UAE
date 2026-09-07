"use client";

import { deliveryService as checkDeliveryAPI } from "@/services/delivery/deliveryService";
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
      const data = await checkDeliveryAPI.checkDelivery(pincode) as any;
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
            Estimated delivery within <span className="font-semibold">7 days</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base leading-none">⚡</span>
          <span>
            Estimated delivery in <span className="font-semibold">Dubai &amp; Abu Dhabi</span> within{" "}
            <span className="font-semibold">2–4 business days</span>{" "}
            <span className="text-gray-400 text-xs">(Express)</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500">
            Delivery timelines may vary based on location and availability
          </span>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="pt-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Delivery Timeline</p>

        {/* Standard timeline */}
        <div className="flex items-start gap-0 mb-3">
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold">1</div>
            <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">Order<br/>Placed</span>
          </div>
          <div className="flex-1 flex flex-col items-center pt-3.5 px-1">
            <div className="w-full h-px bg-gray-300" />
            <span className="text-[10px] text-gray-400 mt-1.5 text-center leading-tight">Ships in<br/><span className="font-semibold text-gray-600">1–2 days</span></span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">2</div>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Out for<br/>Delivery</span>
          </div>
          <div className="flex-1 flex flex-col items-center pt-3.5 px-1">
            <div className="w-full h-px bg-gray-300" />
            <span className="text-[10px] text-gray-400 mt-1.5 text-center leading-tight">Delivered<br/><span className="font-semibold text-gray-600">3–5 days</span></span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">✓</div>
            <span className="text-[10px] text-gray-400 font-medium text-center leading-tight">Delivered</span>
          </div>
        </div>

        {/* Delhi NCR Express timeline */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-3">⚡ UAE Express</p>

        <div className="flex items-start gap-0">
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
            <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-yellow-400 text-xs font-bold">1</div>
            <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">Order<br/>Placed</span>
          </div>
          <div className="flex-1 flex flex-col items-center pt-3.5 px-1">
            <div className="w-full h-px bg-yellow-300" />
            <span className="text-[10px] text-yellow-700 mt-1.5 text-center leading-tight font-semibold">2–4 business days</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-16">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-stone-900 text-xs font-bold">✓</div>
            <span className="text-[10px] text-gray-500 font-medium text-center leading-tight">Delivered</span>
          </div>
        </div>
        <p className="text-[9px] text-gray-400 mt-2">⚡ Express delivery available across Dubai, Abu Dhabi, Sharjah &amp; all Emirates</p>
      </div>

      {deliveryError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{deliveryError}</span>
        </div>
      )}

      {deliveryInfo && (
        <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>
            Delivery available to {deliveryInfo.city}, {deliveryInfo.district}
          </span>
        </div>
      )}
    </div>
  );
};
