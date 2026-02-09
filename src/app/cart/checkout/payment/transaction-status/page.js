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
import analyticsAPI from "@/app/api/analytics/analytics";

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
    phone: null
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
    phone: null
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
    const savedCheckoutData = localStorage.getItem("checkoutFormData");
    let checkoutData = {};
    let extractedUserData = {
      email: null,
      firstName: null,
      lastName: null,
      phone: null
    };

    if (savedCheckoutData) {
      try {
        checkoutData = JSON.parse(savedCheckoutData);
        
        // Order summary extract karo
        if (checkoutData.orderItems) {
          setOrderSummary({
            items: checkoutData.orderItems,
            subtotal: checkoutData.orderSubtotal || 0,
            shipping: checkoutData.orderShipping || 0,
            total: checkoutData.orderTotal || 0
          });
        }

        // User info extract karo
        if (checkoutData.fullName || checkoutData.email || checkoutData.phone) {
          setUserInfo({
            name: checkoutData.fullName || "Guest",
            email: checkoutData.email || "Not provided",
            phone: checkoutData.phone || "Not provided",
            address: checkoutData.address || "Not provided",
            city: checkoutData.city || "Not provided",
            region: checkoutData.region || "Not provided",
            postalCode: checkoutData.postalCode || "Not provided"
          });
        }
        
        // 🔥 User data extract karo Meta Pixel ke liye
        if (checkoutData.email) {
          const email = checkoutData.email.trim().toLowerCase();
          let firstName = null;
          let lastName = null;
          let phone = checkoutData.phone || null;

          // Full name se first aur last name extract karo
          if (checkoutData.fullName) {
            const nameParts = checkoutData.fullName.trim().split(' ');
            if (nameParts[0]) {
              firstName = nameParts[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
            }
            if (nameParts.length > 1) {
              lastName = nameParts.slice(1).join(' ').replace(/[^a-zA-Z]/g, '').toLowerCase();
            }
          }

          extractedUserData = {
            email,
            firstName,
            lastName,
            phone
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

      // 🎯 Mark this transaction as processed
      processedTransactionId.current = trackingId;

      // 🆕 User data directly pass karo (extractedUserData se)
      sendCompleteOrderDataToBackend(transactionData, checkoutData, extractedUserData);
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
  const sendCompleteOrderDataToBackend = async (transactionData, checkoutData, userDataParam) => {
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
            `${canvas.toDataURL()}_${screen}_${timezone}_${language}_${platform}`
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
        } else {
          return {
            ...basePayment,
            method: "CCAvenue",
            bankRefNo: transactionData.bankRefNo,
            gateway: "CCAvenue",
          };
        }
      };

      const completeOrderData = {
        tracking_id: transactionData.trackingId,
        timestamp: new Date().toISOString(),

        order: {
          orderId: transactionData.orderId,
          items: (checkoutData.orderItems || []).map((item) => ({
            productId: item.id,
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
            0
          ),
          subtotal:
            checkoutData.orderSubtotal ||
            (transactionData.amount ? parseFloat(transactionData.amount) : 0),
          shipping: checkoutData.orderShipping || 0,
          discount: 0,
          total: transactionData.amount
            ? parseFloat(transactionData.amount)
            : checkoutData.orderTotal || 0,
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
          state: checkoutData.region || "",
          postalCode: checkoutData.postalCode || "",
          country: checkoutData.country || "India",
          isDefault: false,
        },

        billingAddress: {
          fullName: checkoutData.fullName || "Guest Customer",
          phone: formatPhoneNumber(checkoutData.phone || ""),
          addressLine1: checkoutData.address || "",
          city: checkoutData.city || "",
          state: checkoutData.region || "",
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
          source: "transaction_status_page",
          userAgent:
            typeof window !== "undefined" ? window.navigator.userAgent : "",
          saveInfo: false,
          promocode: null,
          referralCode: null,
          notes:
            transactionData.paymentMethod === "cod"
              ? "COD Order - OTP Verified"
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

      const response = await fetch(
        `${API_BASE_URL}/guestorderRoutes/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeOrderData),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        try {
          const res = await analyticsAPI.trackOrderFailed();
        } catch (error) {
          console.error(error);
        }

        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || "Failed to send order data");
      }

      const result = await response.json();

      gaEvent({
        action: "Final Order Placed SuccessFully",
        params: {
          "payment_method": transactionData.paymentMethod,
        }
      });

      fbEvent({
        action: "Purchase",
        params: {
          "content_name": `${transactionData.paymentMethod}_Order_Placed_SuccessFully`,
          "content_type": transactionData.paymentMethod
        }
      });

      try {
        const res = await analyticsAPI.trackOrderConfirmed();
      } catch (error) {
        console.error(error);
      }

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

      // Only set as completed if it's a permanent error (not network issues)
      if (error.name === "AbortError" || error.message.includes("network")) {
        // Network error, don't mark as completed
      } else {
        apiCallCompleted.current = true;
      }
    }
  };

  // 🎯 Manual retry function with better protection
  const retryBackendRequest = () => {
    if (apiCallInProgress.current) {
      return;
    }

    if (apiCallCompleted.current) {
      return;
    }

    if (paymentData && paymentData.status === "success") {
      // Reset only the necessary flags for retry
      apiCallInProgress.current = false;
      setBackendSent(false);
      setBackendProcessing(false);
      sendCompleteOrderDataToBackend(paymentData);
    } else {
      // Handle other cases if needed
    }
  };

  // ✅ DOWNLOAD ORDER SUMMARY AS TEXT FILE
  const downloadOrderSummary = () => {
    setIsAnimating(true);
    
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const orderTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Create comprehensive order summary content
    const orderDetails = `
╔══════════════════════════════════════════════════════════╗
║                    COD ORDER CONFIRMATION                ║
║                    🛒 YOUR STORE NAME                    ║
╚══════════════════════════════════════════════════════════╝

ORDER DETAILS
─────────────
📋 Order ID:      ${paymentData?.orderId || "N/A"}
🔢 Tracking ID:   ${paymentData?.trackingId || "N/A"}
📅 Date:          ${orderDate}
⏰ Time:          ${orderTime}
📦 Order Type:    Cash on Delivery (COD)

CUSTOMER INFORMATION
────────────────────
👤 Name:          ${userInfo?.name || "Guest"}
📧 Email:         ${userInfo?.email || "Not provided"}
📱 Phone:         ${userInfo?.phone || "Not provided"}
📍 Address:       ${userInfo?.address || "Not provided"}
                   ${userInfo?.city ? userInfo.city + ', ' : ''}${userInfo?.region || ''} ${userInfo?.postalCode || ''}

PAYMENT INFORMATION
───────────────────
💰 Payment Method: Cash on Delivery
💵 Amount to Pay:  ₹${paymentData?.amount ? parseFloat(paymentData.amount).toLocaleString('en-IN') : "0"}
⚡ Status:        PAID ON DELIVERY

ORDER SUMMARY
─────────────
${orderSummary?.items?.map((item, index) => `
${index + 1}. ${item.name}
   ├─ Quantity: ${item.quantity}
   ├─ Unit Price: ₹${item.price}
   ${item.selectedColor ? `├─ Color: ${item.selectedColor}` : ''}
   ${item.selectedSize ? `├─ Size: ${item.selectedSize}` : ''}
   └─ Total: ₹${item.price * item.quantity}
`).join('')}

BILL SUMMARY
────────────
Subtotal:        ₹${orderSummary?.subtotal || 0}
Shipping:        ₹${orderSummary?.shipping || 0}
────────────────────────────────────
GRAND TOTAL:     ₹${orderSummary?.total || paymentData?.amount || "0"}
────────────────────────────────────

DELIVERY INFORMATION
────────────────────
🚚 Method:        Standard Delivery
📅 Estimated:      3-5 business days
💰 Payment:        Pay Cash on Delivery
📞 Contact:        Keep phone ready for delivery call

ORDER STATUS TIMELINE
─────────────────────
✅ Order Placed:   ${orderDate} ${orderTime}
⏳ Processing:     Within 24-48 hours
🚚 Shipped:        Will be updated
📦 Delivered:      Expected in 3-5 days

IMPORTANT NOTES
───────────────
• Please keep exact cash ready for delivery
• Delivery agent will call before arrival
• Check your email for order updates
• Contact support for any queries

CONTACT INFORMATION
───────────────────
📞 Support:        +91-XXXXXXXXXX
📧 Email:          support@yourstore.com
🌐 Website:        www.yourstore.com

══════════════════════════════════════════════════════════════
            THANK YOU FOR SHOPPING WITH US! 🎉
══════════════════════════════════════════════════════════════

Order Generated: ${new Date().toLocaleString()}
This is a computer generated invoice.
    `;

    // Create blob and download
    const blob = new Blob([orderDetails], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `COD_Order_${paymentData?.orderId || 'Summary'}_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setIsAnimating(false);
      
      // Show success message
      alert('✅ Order summary downloaded successfully!');
    }, 100);
  };

  // ✅ PRINT ORDER SUMMARY
  const printOrderSummary = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order Summary - ${paymentData?.orderId || 'COD Order'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #7f0001; margin: 0; }
          .section { margin-bottom: 20px; }
          .section-title { background: #f0f0f0; padding: 10px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f5f5f5; }
          .total-row { font-weight: bold; background: #f9f9f9; }
          .note { background: #fff8e1; padding: 10px; border-left: 4px solid #ffc107; margin: 20px 0; }
          .footer { text-align: center; margin-top: 40px; color: #666; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>COD ORDER CONFIRMATION</h1>
          <p>Order ID: ${paymentData?.orderId || 'N/A'} | Date: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Customer Information</div>
          <p><strong>Name:</strong> ${userInfo?.name || 'Guest'}</p>
          <p><strong>Email:</strong> ${userInfo?.email || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${userInfo?.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> ${userInfo?.address || 'Not provided'}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Order Summary</div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderSummary?.items?.map(item => `
                <tr>
                  <td>${item.name} ${item.selectedColor ? `(${item.selectedColor})` : ''}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                  <td>₹${item.price * item.quantity}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="3">Subtotal</td>
                <td>₹${orderSummary?.subtotal || 0}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3">Shipping</td>
                <td>₹${orderSummary?.shipping || 0}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3"><strong>Total Amount to Pay</strong></td>
                <td><strong>₹${orderSummary?.total || paymentData?.amount || "0"}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="section">
          <div class="section-title">Payment Information</div>
          <p><strong>Payment Method:</strong> Cash on Delivery</p>
          <p><strong>Amount:</strong> ₹${paymentData?.amount ? parseFloat(paymentData.amount).toLocaleString() : "0"}</p>
          <p><strong>Status:</strong> Pay on Delivery</p>
        </div>
        
        <div class="note">
          <strong>Important Note:</strong> Please keep exact cash ready. Delivery agent will call before arrival.
        </div>
        
        <div class="footer">
          <p>Thank you for shopping with us! 🎉</p>
          <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 30px;">
          <button onclick="window.print()" style="padding: 10px 20px; background: #7f0001; color: white; border: none; cursor: pointer;">
            Print this Order Summary
          </button>
          <button onclick="window.close()" style="padding: 10px 20px; background: #666; color: white; border: none; cursor: pointer; margin-left: 10px;">
            Close
          </button>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
  };

  // ✅ COMPACT & MODERN COD CONFIRMATION PAGE
  if (paymentStatus === "success") {
    return (
      <div className={`min-h-screen mt-20 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 sm:p-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Simple Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7f0001]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7f0001]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Container */}
        <div className="relative w-full max-w-2xl">
          
          {/* Success Card - Clean & Modern */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Success Header */}
            <div className="relative p-8 text-center border-b border-gray-100">
              {/* Success Icon */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7f0001]/20 to-[#7f0001]/5 rounded-full animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-[#7f0001] to-[#a00001] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              
              {/* Main Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                COD Order Confirmed! 🎉
              </h1>
              <p className="text-gray-600 text-lg">
                Pay when your order arrives at your doorstep
              </p>
            </div>

            {/* Order Details */}
            <div className="p-8">
              
              {/* Amount Card */}
              <div className="bg-gradient-to-r from-[#7f0001]/5 to-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-300 mb-2">
                    <Banknote className="w-4 h-4 text-[#7f0001]" />
                    <span className="text-sm font-medium text-gray-700">Amount to Pay on Delivery</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-2xl text-gray-700">₹</span>
                    <h3 className="text-5xl md:text-6xl font-bold text-[#7f0001]">
                      {paymentData?.amount ? parseFloat(paymentData.amount).toLocaleString() : "0"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#7f0001]/10 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-[#7f0001]" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Order ID</span>
                  </div>
                  <p className="font-mono text-gray-900 font-semibold text-sm">
                    #{paymentData?.orderId?.slice(-8) || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#7f0001]/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-[#7f0001]" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Date & Time</span>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>

              {/* Order Summary Section */}
              {orderSummary && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#7f0001]" />
                    Order Summary
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      {orderSummary.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                              {item.selectedSize && ` | Size: ${item.selectedSize}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                            <p className="text-[#7f0001] font-bold">₹{item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-300 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-semibold">₹{orderSummary.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-semibold">₹{orderSummary.shipping}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-[#7f0001] pt-2 border-t border-gray-300">
                          <span>Total</span>
                          <span>₹{orderSummary.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Download & Action Buttons */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={downloadOrderSummary}
                    className={`w-full bg-gradient-to-r from-[#7f0001] to-[#a00001] text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${isAnimating ? 'animate-bounce' : ''}`}
                  >
                    <Download className="w-5 h-5" />
                    Download Summary
                  </button>
                  
                  <button
                    onClick={printOrderSummary}
                    className="w-full bg-white border-2 border-[#7f0001] text-[#7f0001] font-semibold py-4 rounded-xl hover:bg-[#7f0001] hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    Print Invoice
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => router.push("/orders")}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:border-[#7f0001] hover:text-[#7f0001] transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <Truck className="w-5 h-5" />
                    Track Order
                  </button>
                  
                  <button
                    onClick={() => router.push("/")}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 rounded-xl hover:border-[#7f0001] hover:text-[#7f0001] transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop More
                  </button>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#7f0001]" />
                  What happens next?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#7f0001]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#7f0001]">1</span>
                    </div>
                    <span className="text-gray-700">Order confirmation email sent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#7f0001]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#7f0001]">2</span>
                    </div>
                    <span className="text-gray-700">Order processing (24-48 hours)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#7f0001]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-[#7f0001]">3</span>
                    </div>
                    <span className="text-gray-700">Delivery at your doorstep (3-5 days)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Footer */}
            <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">
                Need help with your order?
              </p>
              <button 
                onClick={() => router.push("/contact")}
                className="text-[#7f0001] font-medium hover:underline text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Contact our support team →
              </button>
            </div>
          </div>

          {/* Simple Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Thank you for shopping with us! 🛒
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ For failed/cancelled payments - Keep existing (unchanged)
  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "failed":
      case "failure":
        return (
          <XCircle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-red-500 animate-pulse status-icon" />
        );
      case "cancelled":
      case "aborted":
        return (
          <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-amber-500 animate-pulse status-icon" />
        );
      default:
        return (
          <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-500 status-icon" />
        );
    }
  };

  const getPaymentMethodIcon = () => {
    if (paymentMethod === "cod") {
      return <Banknote className="h-5 w-5 text-[#7f0001]" />;
    } else {
      return <CreditCard className="h-5 w-5 text-[#7f0001]" />;
    }
  };

  const getPaymentMethodText = () => {
    if (paymentMethod === "cod") {
      return {
        text: "Cash on Delivery",
        color: "text-[#7f0001]",
        bgColor: "bg-gradient-to-r from-[#7f0001]/10 to-gray-100",
        borderColor: "border-gray-300",
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
      case "failed":
      case "failure":
        return {
          title:
            paymentMethod === "cod"
              ? "COD Order Failed 😞"
              : "Payment Failed 😞",
          message:
            paymentMethod === "cod"
              ? "Your COD order could not be processed. Please try again or contact support."
              : "Your payment could not be processed. Please try again or use a different payment method.",
          color: "text-red-700",
          bgColor: "from-red-50/80 to-white",
        };
      case "cancelled":
      case "aborted":
        return {
          title:
            paymentMethod === "cod"
              ? "COD Order Cancelled ⏹️"
              : "Payment Cancelled ⏹️",
          message:
            paymentMethod === "cod"
              ? "You have cancelled the COD order process. Your order has not been placed."
              : "You have cancelled the payment process. Your order has not been placed.",
          color: "text-amber-700",
          bgColor: "from-amber-50/80 to-white",
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
        className={`bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-md sm:max-w-lg lg:max-w-2xl text-center transform transition-all duration-1000 ${showContent
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

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={() => router.push("/cart/checkout")}
            className="w-full bg-gradient-to-r from-[#7f0001] to-gray-800 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center gap-3 text-base"
          >
            <span>Try Again</span>
          </button>
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