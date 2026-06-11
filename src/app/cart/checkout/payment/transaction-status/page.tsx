// @ts-nocheck
// src\app\cart\checkout\payment\transaction-status\page.js
"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShoppingBag,
  Package,
  Loader2,
  Banknote,
  CreditCard,
  Truck,
  Clock,
  ShieldCheck,
  MessageCircle,
  FileText,
  Download,
  Calendar,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { API_BASE_URL } from "@/utils/envHere";
import { gaEvent } from "@/utils/gtm/gtag";
import { fbEvent } from "@/utils/fb/metaPixels";
import analyticsAPI from "@/services/analytics/analyticsService";
import { trackVisitorEvent } from "@/services/analytics/journeyService";

const TransactionStatusContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState("processing");
  const [paymentData, setPaymentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [backendSent, setBackendSent] = useState(false);
  const [backendProcessing, setBackendProcessing] = useState(false);
  const { clearCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // User data state for Meta Pixel
  const [userData, setUserData] = useState({
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
  });

  // 🎯 Refs to prevent duplicate API calls
  const apiCallInProgress = useRef(false);
  const apiCallCompleted = useRef(false);
  const processedTransactionId = useRef(null);

  // 🆕 Local user data ref (immediate access ke liye)
  const userDataRef = useRef({
    email: null,
    firstName: null,
    lastName: null,
    phone: null,
  });

  useEffect(() => {
    // Get parameters from URL
    const status = searchParams.get("status");
    const orderId = searchParams.get("orderId") || searchParams.get("order_id");
    const amount = searchParams.get("amount");
    const trackingId = searchParams.get("transactionId");
    const error = searchParams.get("error");
    const bankRefNo = searchParams.get("bank_ref_no");
    const statusMessage = searchParams.get("status_message");
    const method = searchParams.get("payment_method");

    // 1. Pehle localStorage se data extract karo
    const rawGeneric = localStorage.getItem("checkoutFormData");
    const rawByOrderId = orderId ? localStorage.getItem(`checkoutData_${orderId}`) : null;
    const savedCheckoutData = rawGeneric || rawByOrderId;
    let checkoutData = {};
    let extractedUserData = {
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
    };

    if (savedCheckoutData) {
      try {
        const parsed = JSON.parse(savedCheckoutData);
        // prefer orderId-keyed entry if generic entry has no items
        if (rawByOrderId && (!parsed.orderItems || parsed.orderItems.length === 0)) {
          try { checkoutData = JSON.parse(rawByOrderId); } catch { checkoutData = parsed; }
        } else {
          checkoutData = parsed;
        }

        // 🔥 User data extract karo Meta Pixel ke liye
        if (checkoutData.email) {
          const email = checkoutData.email.trim().toLowerCase();
          let firstName = null;
          let lastName = null;
          let phone = checkoutData.phone || null;

          // Full name se first aur last name extract karo
          if (checkoutData.fullName) {
            const nameParts = checkoutData.fullName.trim().split(" ");
            if (nameParts[0]) {
              firstName = nameParts[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
            }
            if (nameParts.length > 1) {
              lastName = nameParts
                .slice(1)
                .join(" ")
                .replace(/[^a-zA-Z]/g, "")
                .toLowerCase();
            }
          }

          extractedUserData = {
            email,
            firstName,
            lastName,
            phone,
          };

          // 🆕 REF mein bhi save karo for immediate access
          userDataRef.current = extractedUserData;
        }
      } catch (e) {
        console.warn("Could not parse checkout data from localStorage:", e);
      }
    }

    // Set user data state (async hotta hai)
    setUserData(extractedUserData);

    // Prevent processing the same transaction multiple times
    if (trackingId && processedTransactionId.current === trackingId) {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 500);
      return;
    }

    // Determine payment method
    let detectedMethod = "online";
    if (method) {
      detectedMethod = method.toLowerCase();
    } else if (checkoutData.paymentMethod === "PARTIAL_COD") {
      detectedMethod = "partial_cod";
    } else if (trackingId && trackingId.startsWith("COD_")) {
      detectedMethod = "cod";
    } else if (bankRefNo || statusMessage?.toLowerCase().includes("bank")) {
      detectedMethod = "online";
    }

    setPaymentMethod(detectedMethod);

    if (status && orderId && trackingId) {
      const transactionData = {
        status: status.toLowerCase(),
        orderId,
        amount,
        trackingId,
        error,
        bankRefNo,
        statusMessage,
        paymentMethod: detectedMethod,
        receivedAt: new Date().toISOString(),
      };

      setPaymentStatus(status.toLowerCase());
      setPaymentData(transactionData);

      // Pre-set processing flag so the UI never flashes "Order Creation Pending"
      if (status.toLowerCase() === "success") {
        setBackendProcessing(true);
      }

      // 🎯 Mark this transaction as processed
      processedTransactionId.current = trackingId;

      // 🆕 User data directly pass karo (extractedUserData se)
      sendCompleteOrderDataToBackend(
        transactionData,
        checkoutData,
        extractedUserData,
      );
    } else {
      console.warn("❌ Missing required parameters:", {
        status,
        orderId,
        trackingId,
      });
      setPaymentStatus("unknown");
    }

    // Show content with animation delay
    setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 500);
  }, []);
  // 🛡️ Enhanced function to prevent duplicate API calls
  const sendCompleteOrderDataToBackend = async (
    transactionData,
    checkoutData,
    userDataParam,
  ) => {
    if (apiCallInProgress.current) {
      return;
    }

    if (apiCallCompleted.current) {
      return;
    }

    if (backendSent) {
      return;
    }

    // 🎯 ONLY send data to backend if payment is successful
    if (transactionData.status !== "success") {
      apiCallCompleted.current = true;
      return;
    }

    // 🛡️ Set flags to prevent duplicate calls
    apiCallInProgress.current = true;
    setBackendProcessing(true);

    // 🆕 User data source decide karo (parameter ya ref)
    const finalUserData = userDataParam || userDataRef.current || userData;

    try {
      const generateSessionId = () => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `SESSION_${timestamp}_${random}`.toUpperCase();
      };

      const generateFingerprint = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          ctx.textBaseline = "top";
          ctx.font = "14px Arial";
          ctx.fillText("Browser fingerprint", 2, 2);

          const screen = `${window.screen.width}x${window.screen.height}`;
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const language = navigator.language;
          const platform = navigator.platform;

          const fingerprint = btoa(
            `${canvas.toDataURL()}_${screen}_${timezone}_${language}_${platform}`,
          );
          return `FP_${fingerprint.substring(0, 16)}`;
        } catch (error) {
          return `FP_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 8)}`;
        }
      };

      // Helper function to format phone number
      const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        let cleanPhone = phone.replace(/\D/g, "");
        if (cleanPhone.startsWith("91") && cleanPhone.length === 12) {
          cleanPhone = cleanPhone.substring(2);
        }
        return cleanPhone;
      };

      const getProductImages = (item) => {
        if (!item) return [];

        try {
          if (item.images && Array.isArray(item.images)) {
            if (item.images.length > 0 && Array.isArray(item.images[0])) {
              const colorIndex = item.selectedColorIndex || 0;
              const colorImages = item.images[colorIndex];
              if (colorImages && Array.isArray(colorImages)) {
                return colorImages;
              }
              return item.images[0] || [];
            } else {
              return item.images;
            }
          }

          if (item.image) {
            return Array.isArray(item.image) ? item.image : [item.image];
          }

          if (item.currentMainImage) {
            return [item.currentMainImage];
          }

          return [];
        } catch (error) {
          console.warn("Error getting product images:", error);
          return [];
        }
      };

      // Prepare payment object based on method
      const preparePaymentObject = () => {
        const basePayment = {
          amount: transactionData.amount
            ? parseFloat(transactionData.amount)
            : 0,
          currency: "INR",
          trackingId: transactionData.trackingId,
          status: transactionData.status,
          statusMessage: transactionData.statusMessage,
          errorMessage: transactionData.error,
        };

        if (transactionData.paymentMethod === "cod") {
          return {
            ...basePayment,
            method: "COD",
            bankRefNo: null,
            gateway: "COD",
          };
        } else if (
          transactionData.paymentMethod === "partial_cod" ||
          checkoutData.paymentMethod === "PARTIAL_COD"
        ) {
          // Razorpay advance paid — rest collected on delivery
          return {
            ...basePayment,
            method: "PARTIAL_COD",
            razorpayPaymentId: transactionData.trackingId,
            gateway: "Razorpay",
            partialAmountPaid: transactionData.amount
              ? parseFloat(transactionData.amount)
              : 0,
            totalOrderAmount: checkoutData.orderTotal || 0,
            codAmount:
              (checkoutData.orderTotal || 0) -
              (transactionData.amount ? parseFloat(transactionData.amount) : 0),
          };
        } else {
          // Razorpay full payment — trackingId holds razorpay_payment_id
          return {
            ...basePayment,
            method: "Razorpay",
            razorpayPaymentId: transactionData.trackingId,
            gateway: "Razorpay",
          };
        }
      };

      const completeOrderData = {
        tracking_id: transactionData.trackingId,
        timestamp: new Date().toISOString(),

        order: {
          orderId: transactionData.orderId,
          items: (checkoutData.orderItems || []).map((item) => ({
            productId: item.productId || item.id,
            productName: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            selectedColor: item.selectedColor || null,
            selectedSize: item.selectedSize || null,
            productImage: getProductImages(item),
          })),
          itemCount: (checkoutData.orderItems || []).length,
          totalQuantity: (checkoutData.orderItems || []).reduce(
            (sum, item) => sum + item.quantity,
            0,
          ),
          subtotal:
            checkoutData.orderSubtotal ||
            (transactionData.amount ? parseFloat(transactionData.amount) : 0),
          shipping: checkoutData.orderShipping || 0,
          discount: 0,
          total:
            checkoutData.orderTotal ||
            (transactionData.amount ? parseFloat(transactionData.amount) : 0),
          currency: "INR",
        },

        customer: {
          fullName: checkoutData.fullName || "Guest Customer",
          email: checkoutData.email || "",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          userId: null,
        },

        shippingAddress: {
          fullName: checkoutData.fullName || "Guest Customer",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          addressLine1: checkoutData.address || "",
          city: checkoutData.city || "",
          state: checkoutData.regionLabel || checkoutData.region || "",
          postalCode: checkoutData.postalCode || "",
          country: checkoutData.country || "India",
          isDefault: false,
        },

        billingAddress: {
          fullName: checkoutData.fullName || "Guest Customer",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          addressLine1: checkoutData.address || "",
          city: checkoutData.city || "",
          state: checkoutData.regionLabel || checkoutData.region || "",
          postalCode: checkoutData.postalCode || "",
          country: checkoutData.country || "India",
          sameAsShipping: true,
        },

        payment: preparePaymentObject(),

        shipping: {
          method: checkoutData.shippingMethod || "Standard Shipping",
          cost: checkoutData.orderShipping || 0,
          estimatedDelivery: "3-5 business days",
          isFreeShippingApplied: (checkoutData.orderShipping || 0) === 0,
        },

        metadata: {
          source: checkoutData.source || "direct",
          userAgent:
            typeof window !== "undefined" ? window.navigator.userAgent : "",
          saveInfo: false,
          promocode: null,
          referralCode: null,
          notes:
            transactionData.paymentMethod === "cod"
              ? "COD Order - OTP Verified"
              : transactionData.paymentMethod === "partial_cod" ||
                  checkoutData.paymentMethod === "PARTIAL_COD"
                ? `Partial COD - Paid ₹${transactionData.amount || 0} via Razorpay, ₹${(checkoutData.orderTotal || 0) - parseFloat(transactionData.amount || 0)} COD`
                : null,
          paymentCompletedAt: new Date().toISOString(),
        },

        security: {
          ipAddress: null,
          sessionId: checkoutData.sessionId || generateSessionId(),
          fingerprint: checkoutData.fingerprint || generateFingerprint(),
        },

        transactionStatus: {
          finalStatus: transactionData.status,
          receivedAt: transactionData.receivedAt,
          source: "transaction_status_page",
          isPaymentComplete: transactionData.status === "success",
          processingSource: `frontend_transaction_status_${transactionData.paymentMethod}`,
        },
      };

      // Send to backend with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_BASE_URL}/guestorderRoutes/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeOrderData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        try {
          const res = await analyticsAPI.trackOrderFailed();
        } catch (error) {
          console.error(error);
        }

        trackVisitorEvent("PAYMENT_FAILED", {
          orderId: transactionData.orderId,
          transactionId: transactionData.trackingId,
          amount: transactionData.amount,
          paymentMethod: transactionData.paymentMethod,
        });

        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || "Failed to send order data");
      }

      const result = await response.json();

      gaEvent({
        action: "Final Order Placed SuccessFully",
        params: {
          payment_method: transactionData.paymentMethod,
        },
      });

      fbEvent({
        action: "Purchase",
        params: {
          content_name: `${transactionData.paymentMethod}_Order_Placed_SuccessFully`,
          content_type: transactionData.paymentMethod,
        },
      });

      try {
        const res = await analyticsAPI.trackOrderConfirmed();
      } catch (error) {
        console.error(error);
      }

      trackVisitorEvent("PAYMENT_SUCCESS", {
        orderId: transactionData.orderId,
        transactionId: transactionData.trackingId,
        amount: transactionData.amount,
        paymentMethod: transactionData.paymentMethod,
      });

      // 🎯 Mark as successfully completed
      apiCallCompleted.current = true;

      setBackendSent(true);
      setBackendProcessing(false);

      // Clear localStorage and cart after successful send
      try {
        localStorage.removeItem("checkoutFormData");
        localStorage.removeItem("shopping-cart");
        clearCart();

        // 🛒 Clear cart only on successful transaction
        localStorage.removeItem("cart");

        // Dispatch custom event to notify cart context of the change
        window.dispatchEvent(new Event("cartCleared"));
      } catch (e) {
        console.warn("Could not clear localStorage");
      }
    } catch (error) {
      console.error("❌ Error sending complete order data to backend:", error);

      // 🛡️ Reset flags on error, but don't automatically retry
      apiCallInProgress.current = false;
      setBackendProcessing(false);

      // Allow retry for all error types
    }
  };

  // 🎯 Manual retry function with better protection
  const retryBackendRequest = () => {
    if (apiCallInProgress.current) {
      return;
    }

    if (backendSent && apiCallCompleted.current) {
      return;
    }

    if (paymentData && paymentData.status === "success") {
      // Reset flags for retry
      apiCallInProgress.current = false;
      apiCallCompleted.current = false;
      setBackendSent(false);
      setBackendProcessing(false);

      // Re-read checkout data from localStorage
      let retryCheckoutData = {};
      let retryUserData = userDataRef.current;
      try {
        const saved = localStorage.getItem("checkoutFormData");
        if (saved) retryCheckoutData = JSON.parse(saved);
      } catch (e) {
        console.error("Error reading checkout data for retry:", e);
      }

      sendCompleteOrderDataToBackend(
        paymentData,
        retryCheckoutData,
        retryUserData,
      );
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "success":
        return (
          <CheckCircle className="w-16 h-16  sm:w-20 lg:w-24 lg:h-24 text-green-500 animate-bounce-gentle status-icon" />
        );
      case "failed":
      case "failure":
        return (
          <XCircle className="w-16 h-16  sm:w-20 lg:w-24 lg:h-24 text-red-500 animate-pulse status-icon" />
        );
      case "cancelled":
      case "aborted":
        return (
          <AlertTriangle className="w-16 h-16  sm:w-20 lg:w-24 lg:h-24 text-yellow-500 animate-pulse status-icon" />
        );
      default:
        return (
          <AlertTriangle className="w-16 h-16 sm:w-20 lg:w-24 lg:h-24 text-gray-500 status-icon" />
        );
    }
  };

  const getPaymentMethodIcon = () => {
    if (paymentMethod === "cod" || paymentMethod === "partial_cod") {
      return <Banknote className="h-5 w-5 text-red-900" />;
    } else {
      return <CreditCard className="h-5 w-5 text-[#7f0001]" />;
    }
  };

  const getPaymentMethodText = () => {
    if (paymentMethod === "partial_cod") {
      return {
        text: "Partial Cash on Delivery",
        color: "text-red-900",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    } else if (paymentMethod === "cod") {
      return {
        text: "Cash on Delivery",
        color: "text-red-900",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    } else {
      return {
        text: "Online Payment",
        color: "text-[#7f0001]",
        bgColor: "bg-gradient-to-r from-[#7f0001]/10 to-gray-100",
        borderColor: "border-gray-300",
      };
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "success":
        return {
          title:
            paymentMethod === "partial_cod"
              ? "Order Confirmed! 🎉"
              : paymentMethod === "cod"
                ? "COD Order Confirmed! 🎉"
                : "Payment Successful! 🎉",
          message:
            paymentMethod === "partial_cod"
              ? "Your advance payment is confirmed! Pay the remaining amount when your order is delivered."
              : paymentMethod === "cod"
                ? "Your COD order has been confirmed. Pay when your order is delivered to your doorstep!"
                : "Your payment has been processed successfully. Your order is confirmed!",
          color: "text-green-600",
          bgColor: "from-green-50 to-white",
        };
      case "failed":
      case "failure":
        return {
          title:
            paymentMethod === "partial_cod"
              ? "Payment Failed 😞"
              : paymentMethod === "cod"
                ? "COD Order Failed 😞"
                : "Payment Failed 😞",
          message:
            paymentMethod === "partial_cod"
              ? "Your advance payment could not be processed. Please try again or use a different payment method."
              : paymentMethod === "cod"
                ? "Your COD order could not be processed. Please try again or contact support."
                : "Your payment could not be processed. Please try again or use a different payment method.",
          color: "text-red-600",
          bgColor: "from-red-50 to-white",
        };
      case "cancelled":
      case "aborted":
        return {
          title:
            paymentMethod === "partial_cod"
              ? "Payment Cancelled ⏹️"
              : paymentMethod === "cod"
                ? "COD Order Cancelled ⏹️"
                : "Payment Cancelled ⏹️",
          message:
            paymentMethod === "partial_cod"
              ? "You have cancelled the payment process. Your order has not been placed."
              : paymentMethod === "cod"
                ? "You have cancelled the COD order process. Your order has not been placed."
                : "You have cancelled the payment process. Your order has not been placed.",
          color: "text-yellow-600",
          bgColor: "from-yellow-50 to-white",
        };
      default:
        return {
          title: "Order Status Unknown",
          message:
            "We could not determine your order status. Please contact support.",
          color: "text-gray-700",
          bgColor: "from-gray-50/80 to-white",
        };
    }
  };

  const statusInfo = getStatusMessage();
  const methodInfo = getPaymentMethodText();

  if (isLoading) {
    return (
      <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8 max-w-md w-full">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-[#7f0001] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Processing Transaction
          </h3>
          <p className="text-gray-600 font-medium">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen mt-20 bg-gradient-to-br ${statusInfo.bgColor} flex items-center justify-center px-4 py-8 sm:py-12 backdrop-blur-sm`}
    >
      <div
        className={`bg-white rounded-3xl shadow-2xl border border-red-100 p-6 sm:p-8 lg:p-10 w-full max-w-md sm:max-w-lg lg:max-w-2xl text-center transform transition-all duration-1000 ${
          showContent
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        {/* Status Icon with Enhanced Animation */}
        <div className="mb-8 flex justify-center relative">
          <div className="relative">
            {getStatusIcon()}
          </div>
        </div>

        {/* Status Title with Better Typography */}
        <h1
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 ${statusInfo.color} animate-fade-in leading-tight`}
        >
          {statusInfo.title}
        </h1>

        {/* Status Message with Better Spacing */}
        <p className="text-gray-600 mb-8 text-base sm:text-lg lg:text-xl leading-relaxed px-2 max-w-lg mx-auto">
          {statusInfo.message}
        </p>

        {/* Enhanced Payment Method Badge */}
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${methodInfo.bgColor} ${methodInfo.borderColor} border-2 mb-8 shadow-sm hover:shadow-md transition-all duration-300`}
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
            {getPaymentMethodIcon()}
          </div>
          <span className={`font-bold text-base ${methodInfo.color}`}>
            {methodInfo.text}
          </span>
        </div>

        {/* Enhanced Transaction Details Card */}
        {paymentData && (
          <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl p-6 mb-8 text-left shadow-inner border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-[#7f0001] to-gray-700 rounded-lg flex items-center justify-center mr-3">
                <Package className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Transaction Details
              </h3>
            </div>
            <div className="space-y-4 text-sm sm:text-base">
              {paymentData.orderId && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 gap-2">
                  <span className="text-gray-600 font-medium">Order ID:</span>
                  <span className="font-mono text-gray-900 bg-white px-3 py-2 rounded-lg shadow-sm text-sm break-all border border-gray-200">
                    {paymentData.orderId}
                  </span>
                </div>
              )}
              {paymentData.trackingId && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 gap-2">
                  <span className="text-gray-600 font-medium">
                    Tracking ID:
                  </span>
                  <span className="font-mono text-gray-900 bg-white px-3 py-2 rounded-lg shadow-sm text-sm break-all border border-gray-200">
                    {paymentData.trackingId}
                  </span>
                </div>
              )}
              {paymentData.bankRefNo && paymentMethod === "online" && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 gap-2">
                  <span className="text-gray-600 font-medium">
                    Bank Reference:
                  </span>
                  <span className="font-mono text-gray-900 bg-white px-3 py-2 rounded-lg shadow-sm text-sm break-all border border-gray-200">
                    {paymentData.bankRefNo}
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-gray-200 gap-2">
                <span className="text-gray-600 font-medium">
                  Payment Method:
                </span>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                  {getPaymentMethodIcon()}
                  <span className={`font-bold text-sm ${methodInfo.color}`}>
                    {methodInfo.text}
                  </span>
                </div>
              </div>
              {paymentData.amount && (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3">
                  <span className="text-gray-600 font-medium">
                    Total Amount:
                  </span>
                  <span className="font-bold text-xl text-[#7f0001] bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                    ₹{parseFloat(paymentData.amount).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Error Details */}
        {paymentData?.error && (
          <div className="bg-gradient-to-br from-red-50/80 to-red-100/80 border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="font-bold text-red-800 text-lg">Error Details</h3>
            </div>
            <div className="bg-white/80 rounded-xl p-4 shadow-inner border border-red-100">
              <p className="text-sm sm:text-base text-red-700 break-words leading-relaxed">
                {paymentData.error}
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Order Status Message with Retry Option */}
        {paymentStatus === "success" && (
          <div
            className={`${methodInfo.bgColor} border-2 ${methodInfo.borderColor} rounded-2xl p-6 mb-8 shadow-lg`}
          >
            <div className="flex flex-col items-center gap-4">
              {backendSent && apiCallCompleted.current ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm sm:text-base text-green-800 font-semibold">
                    {paymentMethod === "partial_cod"
                      ? "Partial COD Order Created Successfully"
                      : paymentMethod === "cod"
                        ? "COD Order Created Successfully"
                        : "Order Created Successfully"}
                  </span>
                </div>
              ) : backendProcessing || apiCallInProgress.current ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Loader2 className="h-5 w-5 text-red-900 animate-spin" />
                  </div>
                  <span className="text-sm sm:text-base text-red-900 font-semibold">
                    {paymentMethod === "partial_cod"
                      ? "Creating Your Partial COD Order..."
                      : paymentMethod === "cod"
                        ? "Creating Your COD Order..."
                        : "Creating Your Order..."}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <span className="text-sm sm:text-base text-yellow-800 font-semibold">
                      Order Creation Pending
                    </span>
                  </div>
                  <button
                    onClick={retryBackendRequest}
                    className="bg-red-900 text-white px-6 py-2 rounded-xl hover:bg-red-800 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Retry Order Creation
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {paymentStatus !== "success" && (
            <button
              onClick={() => router.push("/cart/checkout")}
              className="w-full bg-gradient-to-r from-[#7f0001] to-gray-800 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center gap-3 text-base"
            >
              <span>Try Again</span>
            </button>
          )}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-bold hover:border-[#7f0001] hover:text-[#7f0001] transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-3 text-base group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:animate-bounce" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Enhanced Support Link */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl p-4 border border-gray-200">
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              <span className="font-semibold">Need Help?</span>
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[#7f0001] hover:text-gray-800 font-semibold text-sm sm:text-base transition-all duration-300 hover:underline"
            >
              📞 Contact Support Team
            </a>
          </div>
        </div>

        {/* Enhanced Success Message */}
        {paymentStatus === "success" && (
          <div className="text-center bg-gradient-to-r from-green-50 via-green-100 to-green-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-sm sm:text-base text-green-800 leading-relaxed font-medium">
              🎊{" "}
              <strong className="text-green-900">
                Thank you for your order!
              </strong>
              <br />
              <span className="text-green-700">
                {paymentMethod === "partial_cod"
                  ? "💰 Your advance payment is done! Pay the remaining amount on delivery."
                  : paymentMethod === "cod"
                    ? "💰 Your COD order is confirmed. Pay when it's delivered to your doorstep!"
                    : "📧 You will receive an order confirmation email shortly."}
              </span>
            </p>
            {paymentMethod !== "cod" && paymentMethod !== "partial_cod" && (
              <div className="mt-4 text-xs text-green-600 bg-white rounded-lg p-3 border border-green-200">
                💡 <strong>Pro Tip:</strong> Check your email (including spam
                folder) for order updates
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        /* Mobile-first responsive improvements */
        @media (max-width: 640px) {
          .status-icon {
            width: 4rem;
            height: 4rem;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .status-icon {
            width: 5rem;
            height: 5rem;
          }
        }

        @media (min-width: 1025px) {
          .status-icon {
            width: 6rem;
            height: 6rem;
          }
        }
      `}</style>
    </div>
  );
};

const TransactionStatusLoading = () => {
  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 p-8 max-w-md w-full">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#7f0001] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Loading Transaction Status
        </h3>
        <p className="text-gray-600 font-medium">
          Please wait while we verify your payment...
        </p>
        <div className="mt-6 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-[#7f0001] to-gray-700 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-gradient-to-r from-[#7f0001] to-gray-700 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gradient-to-r from-[#7f0001] to-gray-700 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TransactionStatus() {
  return (
    <Suspense fallback={<TransactionStatusLoading />}>
      <TransactionStatusContent />
    </Suspense>
  );
}
