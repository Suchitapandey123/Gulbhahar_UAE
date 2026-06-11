// @ts-nocheck
"use client";

import analyticsAPI from "@/services/analytics/analyticsService";
import { trackVisitorEvent } from "@/services/analytics/journeyService";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import { API_BASE_URL } from "@/utils/envHere";
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  CheckCircle,
  CreditCard,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: object) => { open(): void };
  }
}


/* ── Checkout Progress Bar ──────────────────────────────── */
const steps = ["Cart", "Checkout", "Payment"];
const CheckoutProgress = () => (
  <div className="mb-10">
    <div className="flex items-center gap-0">
      {steps.map((step, i) => {
        const isActive = i === steps.length - 1;
        const isDone = i < steps.length - 1;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all ${
                isActive
                  ? "bg-red-800 text-white shadow-md shadow-red-800/30"
                  : isDone
                    ? "bg-stone-200 text-stone-500"
                    : "bg-stone-100 text-stone-400"
              }`}>
                {isDone ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs font-semibold tracking-wide ${
                isActive ? "text-red-800" : "text-stone-400"
              }`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 min-w-[16px] mx-1.5 sm:mx-3 h-px bg-stone-200 relative">
                <div className={`absolute inset-y-0 left-0 bg-red-800 transition-all duration-500 ${isDone ? "w-full" : "w-0"}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

/* ── Segmented Payment Toggle ───────────────────────────── */
const PaymentToggle = ({ paymentMethod, setPaymentMethod, codAvailable }) => (
  <div className="bg-[#F3F4F6] rounded-[14px] p-1.5 flex flex-col sm:flex-row gap-2 sm:gap-1.5">
    <button
      onClick={() => codAvailable && setPaymentMethod("partial-cod")}
      disabled={!codAvailable}
      className={`flex-1 flex items-center justify-center gap-2.5 min-h-[48px] py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
        paymentMethod === "partial-cod"
          ? "bg-white text-[#1a1a1a] shadow-md shadow-black/[0.07]"
          : !codAvailable
            ? "text-stone-300 cursor-not-allowed"
            : "text-[#757575] hover:text-[#1a1a1a] hover:bg-white/50"
      }`}
    >
      <Banknote className={`h-4 w-4 flex-shrink-0 ${paymentMethod === "partial-cod" ? "text-red-800" : "text-stone-400"}`} />
      <span>Partial COD</span>
    </button>
    <button
      onClick={() => setPaymentMethod("online")}
      className={`flex-1 flex items-center justify-center gap-2.5 min-h-[48px] py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
        paymentMethod === "online"
          ? "bg-white text-[#1a1a1a] shadow-md shadow-black/[0.07]"
          : "text-[#757575] hover:text-[#1a1a1a] hover:bg-white/50"
      }`}
    >
      <CreditCard className={`h-4 w-4 flex-shrink-0 ${paymentMethod === "online" ? "text-red-800" : "text-stone-400"}`} />
      <span>Online Payment</span>
    </button>
  </div>
);

/* ── Main Content ───────────────────────────────────────── */
function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("partial-cod");
  const [isProcessingOnline, setIsProcessingOnline] = useState(false);
  const [isProcessingPartialCOD, setIsProcessingPartialCOD] = useState(false);
  const [onlinePaymentError, setOnlinePaymentError] = useState("");
  const [partialCodAmount, setPartialCodAmount] = useState<number>(300);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const source = searchParams.get("source");

  // Fetch partial COD amount from backend so it can be tuned without a frontend deploy
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/razorpay/config`)
      .then((r) => r.json())
      .then((data) => {
        if (data.partialCodAmount) setPartialCodAmount(data.partialCodAmount);
      })
      .catch((e) => console.error("Failed to fetch payment config:", e));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("checkoutFormData");
    if (!saved) { router.push("/cart/checkout"); return; }
    try {
      const parsed = JSON.parse(saved);
      setCheckoutData(parsed);
      trackVisitorEvent("CONTINUE_TO_PAYMENT", {
        orderId: parsed?.orderId || orderId,
        amount: parsed?.orderTotal || amount,
      });
    } catch {
      setCheckoutData({
        fullName: "Test User", email: "test@example.com", phone: "+919876543210",
        address: "123 Test Street", city: "Mumbai", region: "Maharashtra",
        postalCode: "400001", country: "India", orderId: orderId || "TEST_ORDER_001",
        orderTotal: amount || 1200, orderSubtotal: amount ? parseFloat(amount) - 100 : 1100,
        orderShipping: 100, orderItems: [{ id: "1", name: "Test Product", price: 1100, quantity: 1 }],
        deliveryInfo: { cod: true },
      });
    }
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 200);
  }, [orderId, amount, router]);

  /* ── open Razorpay modal for a given amount in paise ── */
  const openRazorpay = ({ amountInPaise, isPartialCOD, onSuccess, onDismiss }) => {
    const receiptBase = checkoutData?.orderId || `receipt_${Date.now()}`;
    const receipt = (isPartialCOD ? `pcod_${receiptBase}` : receiptBase).slice(0, 40);

    return fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInPaise, currency: "INR", receipt }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Order creation failed");
        }
        return res.json();
      })
      .then((order) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Gulbhahar",
          description: isPartialCOD
            ? `Advance ₹${partialCodAmount} for Order ${checkoutData?.orderId || ""}`
            : `Order ${checkoutData?.orderId || ""}`,
          order_id: order.order_id,
          prefill: {
            name: checkoutData?.fullName || "",
            email: checkoutData?.email || "",
            contact: (checkoutData?.phone || "").replace(/\D/g, ""),
          },
          theme: { color: "#7f1d1d" },
          handler: onSuccess,
          modal: { ondismiss: onDismiss },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      });
  };

  /* ── Full online payment via Razorpay ── */
  const handleOnlinePayment = async () => {
    setOnlinePaymentError("");

    if (!window.Razorpay) {
      setOnlinePaymentError("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    gaEvent({ action: "ONLINE_Initiated", params: { payment_method: "RAZORPAY", OrderID: checkoutData?.orderId } });
    fbEvent({ action: "ONLINE_Initiated", params: { payment_method: "RAZORPAY", OrderID: checkoutData?.orderId } });
    try { await analyticsAPI.trackPaymentMethod("ONLINE"); } catch (e) { console.error(e); }
    trackVisitorEvent("PAYMENT_METHOD_SELECTED", { method: "ONLINE", orderId: checkoutData?.orderId });

    setIsProcessingOnline(true);

    const amountInPaise = Math.round((checkoutData?.orderTotal || 0) * 100);
    if (amountInPaise < 100) {
      setOnlinePaymentError("Order total is too low to process payment.");
      setIsProcessingOnline(false);
      return;
    }

    try {
      await openRazorpay({
        amountInPaise,
        isPartialCOD: false,
        onSuccess: async (response) => {
          setIsProcessingOnline(true);
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/razorpay/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verifyRes.ok) throw new Error("Signature verification failed");

            try {
              const saved = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
              saved.paymentMethod = "ONLINE";
              saved.razorpayPaymentId = response.razorpay_payment_id;
              localStorage.setItem("checkoutFormData", JSON.stringify(saved));
            } catch (e) { console.error(e); }

            router.push(
              `/cart/checkout/payment/transaction-status?status=success&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=${encodeURIComponent(response.razorpay_payment_id)}&amount=${encodeURIComponent(checkoutData?.orderTotal || 0)}&payment_method=online`
            );
          } catch (err) {
            console.error("Razorpay verify error:", err);
            router.push(
              `/cart/checkout/payment/transaction-status?status=failed&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=${encodeURIComponent(response.razorpay_payment_id)}&amount=${encodeURIComponent(checkoutData?.orderTotal || 0)}&payment_method=online`
            );
          } finally {
            setIsProcessingOnline(false);
          }
        },
        onDismiss: () => {
          setIsProcessingOnline(false);
          router.push(
            `/cart/checkout/payment/transaction-status?status=cancelled&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=cancelled&amount=${encodeURIComponent(checkoutData?.orderTotal || 0)}&payment_method=online`
          );
        },
      });
    } catch (err) {
      console.error("Razorpay create-order error:", err);
      setOnlinePaymentError(err.message || "Could not initiate payment. Please try again.");
      setIsProcessingOnline(false);
    }
  };

  /* ── Partial COD: pay ₹300 advance via Razorpay, rest on delivery ── */
  const handlePartialCODPayment = async () => {
    setOnlinePaymentError("");

    if (!window.Razorpay) {
      setOnlinePaymentError("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    gaEvent({ action: "Partial_COD_Initiated", params: { payment_method: "PARTIAL_COD", OrderID: checkoutData?.orderId, advance_amount: partialCodAmount } });
    fbEvent({ action: "PARTIAL_COD_Initiated", params: { payment_method: "PARTIAL_COD", OrderID: checkoutData?.orderId, advance_amount: partialCodAmount } });
    try { await analyticsAPI.trackPaymentMethod("PARTIAL_COD"); } catch (e) { console.error(e); }
    trackVisitorEvent("PAYMENT_METHOD_SELECTED", { method: "PARTIAL_COD", orderId: checkoutData?.orderId });

    setIsProcessingPartialCOD(true);

    const amountInPaise = partialCodAmount * 100; // ₹300 → 30000 paise

    try {
      await openRazorpay({
        amountInPaise,
        isPartialCOD: true,
        onSuccess: async (response) => {
          setIsProcessingPartialCOD(true);
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/razorpay/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            if (!verifyRes.ok) throw new Error("Signature verification failed");

            try {
              const saved = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
              saved.paymentMethod = "PARTIAL_COD";
              saved.partialAmount = partialCodAmount;
              saved.razorpayPaymentId = response.razorpay_payment_id;
              localStorage.setItem("checkoutFormData", JSON.stringify(saved));
            } catch (e) { console.error(e); }

            router.push(
              `/cart/checkout/payment/transaction-status?status=success&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=${encodeURIComponent(response.razorpay_payment_id)}&amount=${encodeURIComponent(partialCodAmount)}&payment_method=partial_cod`
            );
          } catch (err) {
            console.error("Razorpay verify error (partial COD):", err);
            router.push(
              `/cart/checkout/payment/transaction-status?status=failed&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=${encodeURIComponent(response.razorpay_payment_id)}&amount=${encodeURIComponent(partialCodAmount)}&payment_method=partial_cod`
            );
          } finally {
            setIsProcessingPartialCOD(false);
          }
        },
        onDismiss: () => {
          setIsProcessingPartialCOD(false);
          router.push(
            `/cart/checkout/payment/transaction-status?status=cancelled&orderId=${encodeURIComponent(checkoutData?.orderId || "")}&transactionId=cancelled&amount=${encodeURIComponent(partialCodAmount)}&payment_method=partial_cod`
          );
        },
      });
    } catch (err) {
      console.error("Razorpay partial COD create-order error:", err);
      setOnlinePaymentError(err.message || "Could not initiate payment. Please try again.");
      setIsProcessingPartialCOD(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen mt-14 sm:mt-20 bg-[#f5f5f7] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-5">
          <div className="w-12 h-12 border-2 border-stone-200 rounded-full animate-spin" />
          <div className="absolute inset-0 border-2 border-red-800 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm font-medium text-stone-500 tracking-tight">Loading Payment Gateway</p>
      </div>
    </div>
  );

  const isPaying = isProcessingOnline || isProcessingPartialCOD;

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    <div className="min-h-screen mt-14 sm:mt-20 bg-[#F5F5F7]">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-10 lg:py-12">

        <CheckoutProgress />

        <div className={`transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-8 items-start">

            {/* ══ LEFT — Payment Options ══ */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a1a] tracking-tight leading-tight">
                  Secure Payment
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#757575] flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-red-800 flex-shrink-0" />
                  All transactions are encrypted & secure
                </p>
              </div>

              {/* Payment method card */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">

                {/* Toggle */}
                <div className="px-4 sm:px-6 pt-5 pb-4">
                  <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-3">Select Payment Method</p>
                  <PaymentToggle
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    codAvailable={!!checkoutData?.deliveryInfo?.cod}
                  />
                </div>

                <div className="border-t border-[#F3F4F6]" />

                {/* Method detail */}
                <div className="px-4 sm:px-6 py-4">
                  {paymentMethod === "online" ? (
                    <div className="flex items-start gap-3.5 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                      <div className="w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">Online Payment</p>
                        <p className="text-xs text-[#757575] leading-relaxed mb-3">
                          Pay the full amount securely via Credit / Debit Card, UPI, Net Banking, or Digital Wallets
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <CheckCircle className="h-3 w-3" /> Instant Confirmation
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                            <Shield className="h-3 w-3" /> SSL Secured
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Banknote className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">Partial Cash on Delivery</p>
                          <p className="text-xs text-[#757575] leading-relaxed mb-3">
                            Pay a small advance via Razorpay now — remaining amount collected at doorstep
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                              ₹{partialCodAmount} advance
                            </span>
                            {checkoutData?.deliveryInfo?.cod
                              ? <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">✓ Available</span>
                              : <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-50 text-red-700 border border-red-100">Unavailable</span>
                            }
                          </div>
                        </div>
                      </div>
                      {/* Split mini cards */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-xl px-4 py-3 border border-[#E5E7EB] text-center">
                          <p className="text-[10px] font-semibold text-[#757575] uppercase tracking-wide mb-1">Pay Now (Razorpay)</p>
                          <p className="text-lg font-bold text-red-800">₹{partialCodAmount}</p>
                        </div>
                        <div className="bg-white rounded-xl px-4 py-3 border border-[#E5E7EB] text-center">
                          <p className="text-[10px] font-semibold text-[#757575] uppercase tracking-wide mb-1">On Delivery</p>
                          <p className="text-lg font-bold text-[#1a1a1a]">
                            ₹{((checkoutData?.orderTotal || 1200) - partialCodAmount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#F3F4F6]" />

                {/* CTA buttons */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                  {onlinePaymentError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                      <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">{onlinePaymentError}</p>
                    </div>
                  )}

                  <button
                    onClick={paymentMethod === "online" ? handleOnlinePayment : handlePartialCODPayment}
                    disabled={isPaying}
                    className="w-full min-h-[52px] bg-red-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-red-900 active:bg-red-950 transition-all duration-150 shadow-md shadow-red-800/20 hover:shadow-lg hover:shadow-red-800/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPaying
                      ? <><Loader2 className="h-4 w-4 animate-spin" />Processing your order...</>
                      : paymentMethod === "online"
                        ? <><Lock className="h-4 w-4" />Pay ₹{(checkoutData?.orderTotal || 1200).toLocaleString()} Securely</>
                        : <><Lock className="h-4 w-4" />Pay ₹{partialCodAmount} Now via Razorpay</>
                    }
                  </button>

                  <button
                    onClick={() => router.push("/cart/checkout")}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 text-[#757575] text-sm font-medium hover:text-[#1a1a1a] transition-colors duration-150"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go back to checkout
                  </button>

                  <p className="text-center text-[11px] text-[#9CA3AF]">
                    Powered by Razorpay — 256-bit SSL encrypted
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-4 sm:px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-0 sm:flex sm:items-center sm:justify-around">
                  {[
                    { icon: Shield, title: "SSL Encrypted", sub: "256-bit security" },
                    { icon: CheckCircle, title: "PCI Compliant", sub: "Highest standard" },
                    { icon: Star, title: "Secured by Razorpay", sub: "10M+ customers" },
                  ].map(({ icon: Icon, title, sub }) => (
                    <div key={title} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-red-800" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1a1a1a] leading-tight">{title}</p>
                        <p className="text-[10px] text-[#9CA3AF] leading-tight">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ RIGHT — Order Summary ══ */}
            <div className="lg:col-span-2">
              <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] overflow-hidden lg:sticky lg:top-8">

                {/* Header */}
                <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-[#E5E7EB] bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="text-white h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-bold text-[#1a1a1a] tracking-tight">Order Summary</span>
                  </div>
                </div>

                {/* Meta rows */}
                <div className="px-5 sm:px-6 py-4 space-y-2.5 border-b border-[#E5E7EB]">
                  {[
                    { label: "Order ID", value: <span className="font-mono text-[11px] bg-white border border-[#E5E7EB] text-stone-500 px-2 py-0.5 rounded-lg">{checkoutData?.orderId || "TEST_ORDER_001"}</span> },
                    { label: "Customer", value: <span className="text-sm font-semibold text-[#1a1a1a]">{checkoutData?.fullName || "Test User"}</span> },
                    { label: "Items", value: <span className="text-sm font-bold text-red-800">{checkoutData?.orderItems?.length || 1} item(s)</span> },
                    { label: "Method", value: <span className="text-[11px] font-bold bg-red-50 border border-red-100 text-red-800 px-2.5 py-1 rounded-full">{paymentMethod === "partial-cod" ? "Partial COD" : "Razorpay"}</span> },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-[11px] text-[#9CA3AF] font-medium uppercase tracking-wider">{label}</span>
                      {value}
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="px-5 sm:px-6 py-4 space-y-2 border-b border-[#E5E7EB] bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#757575]">Subtotal</span>
                    <span className="text-sm font-medium text-[#1a1a1a]">₹{(checkoutData?.orderSubtotal || 1100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#757575]">Shipping</span>
                    <span className={`text-sm font-medium ${checkoutData?.orderShipping === 0 ? "text-emerald-600" : "text-[#1a1a1a]"}`}>
                      {checkoutData?.orderShipping === 0 ? "Free" : `₹${(checkoutData?.orderShipping || 100).toLocaleString()}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#F3F4F6] flex justify-between items-center">
                    <span className="text-sm font-semibold text-[#757575]">Total</span>
                    <span className="text-xl font-bold text-[#1a1a1a]">₹{(checkoutData?.orderTotal || 1200).toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment split */}
                {paymentMethod === "partial-cod" ? (
                  <div className="px-5 sm:px-6 py-4 space-y-2 border-b border-[#E5E7EB]">
                    <div className="flex justify-between items-center py-2.5 px-3 bg-white border border-red-100 rounded-xl">
                      <span className="text-xs font-medium text-[#757575]">Pay Now (Razorpay)</span>
                      <span className="text-sm font-bold text-red-800">₹{partialCodAmount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3 bg-white border border-amber-100 rounded-xl">
                      <span className="text-xs font-medium text-[#757575]">On Delivery</span>
                      <span className="text-sm font-bold text-amber-700">₹{((checkoutData?.orderTotal || 1200) - partialCodAmount).toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 sm:px-6 py-4 border-b border-[#E5E7EB]">
                    <div className="flex justify-between items-center py-2.5 px-3 bg-white border border-emerald-100 rounded-xl">
                      <span className="text-xs font-medium text-[#757575]">Pay Now</span>
                      <span className="text-sm font-bold text-emerald-700">₹{(checkoutData?.orderTotal || 1200).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Delivery info */}
                <div className="px-5 sm:px-6 py-4 space-y-2.5 border-b border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#9CA3AF] tracking-widest uppercase">Delivering To</p>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 text-red-800 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#1a1a1a]">{checkoutData?.fullName || "Test User"}</p>
                      <p className="text-xs text-[#757575] mt-0.5 leading-relaxed">
                        {checkoutData?.address || "123 Test Street"}, {checkoutData?.city || "Mumbai"}, {checkoutData?.region || "Maharashtra"} {checkoutData?.postalCode || "400001"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-3.5 w-3.5 text-red-800 flex-shrink-0" />
                    <span className="text-xs text-[#757575] truncate">{checkoutData?.email || "test@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-3.5 w-3.5 text-red-800 flex-shrink-0" />
                    <span className="text-xs text-[#757575]">{checkoutData?.phone || "+919876543210"}</span>
                  </div>
                </div>

                {/* Secure footer */}
                <div className="px-5 sm:px-6 py-3.5 flex items-center justify-center gap-2">
                  <Lock className="h-3 w-3 text-[#9CA3AF]" />
                  <span className="text-[11px] text-[#9CA3AF] font-medium">Secured by Razorpay</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    </>
  );
}

function PaymentLoading() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-5">
          <div className="w-12 h-12 border-2 border-stone-200 rounded-full animate-spin" />
          <div className="absolute inset-0 border-2 border-red-800 border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm font-medium text-stone-500">Loading Payment Page</p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentLoading />}>
      <PaymentContent />
    </Suspense>
  );
}
