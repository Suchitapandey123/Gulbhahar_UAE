// @ts-nocheck
"use client";

import analyticsAPI from "@/services/analytics/analyticsService";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
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
  RefreshCw,
  Shield,
  ShoppingBag,
  Smartphone,
  Star,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const PARTIAL_COD_AMOUNT = 300;

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
              {/* Circle */}
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all ${
                isActive
                  ? "bg-red-800 text-white shadow-md shadow-red-800/30"
                  : isDone
                    ? "bg-stone-200 text-stone-500"
                    : "bg-stone-100 text-stone-400"
              }`}>
                {isDone ? <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : i + 1}
              </div>
              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-semibold tracking-wide ${
                isActive ? "text-red-800" : "text-stone-400"
              }`}>{step}</span>
            </div>
            {/* Connector */}
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

/* ── OTP Modal ──────────────────────────────────────────── */
const PhoneOTPModal = ({ isOpen, onClose, onVerify, phone, isVerifying, error, sessionId }) => {
  const [verificationCode, setVerificationCode] = useState(["","","","","",""]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [localError, setLocalError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => { if (error) setLocalError(""); }, [error]);
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0) setCanResend(true);
  }, [isOpen, timeLeft]);
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, [isOpen]);

  const handleCodeChange = (index, value) => {
    if (localError) setLocalError("");
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); handlePaste(index); }
    if (e.key === "Enter" && verificationCode.join("").length === 6) { e.preventDefault(); handleVerify(); }
    if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); inputRefs.current[index - 1]?.focus(); }
    if (e.key === "ArrowRight" && index < 5) { e.preventDefault(); inputRefs.current[index + 1]?.focus(); }
  };
  const handlePaste = async (startIndex) => {
    try {
      const digits = (await navigator.clipboard.readText()).replace(/\D/g, "").slice(0, 6);
      if (!digits.length) return;
      const newCode = [...verificationCode];
      for (let i = 0; i < digits.length && startIndex + i < 6; i++) newCode[startIndex + i] = digits[i];
      setVerificationCode(newCode);
      inputRefs.current[Math.min(startIndex + digits.length, 5)]?.focus();
    } catch {}
  };
  const handleVerify = () => {
    const code = verificationCode.join("");
    if (code.length !== 6) { setLocalError("Please enter the complete 6-digit code"); return; }
    setLocalError("");
    onVerify(code, sessionId, false);
  };
  const handleResend = async () => {
    setIsResending(true); setLocalError("");
    try {
      const res = await fetch("https://api.gulbhahar.com/codRoutes/initiate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\D/g, "") }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setTimeLeft(120); setCanResend(false);
        setVerificationCode(["","","","","",""]);
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
        onVerify(null, result.sessionId, true);
      } else throw new Error(result.message || "Failed to resend OTP");
    } catch (err) {
      console.error(err);
      setLocalError("Failed to resend OTP. Please try again.");
    } finally { setIsResending(false); }
  };
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!isOpen) return null;
  const displayError = error || localError;
  const isCodeComplete = verificationCode.join("").length === 6;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 relative mx-4">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 text-stone-300 hover:text-stone-500 hover:bg-stone-50 rounded-full transition-all" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-red-800 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-900/20">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">Verify Your Phone</h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            6-digit code sent via WhatsApp to <span className="font-semibold text-red-800">{phone}</span>
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex justify-center gap-2.5">
            {verificationCode.map((digit, index) => (
              <input
                key={index} ref={(el) => (inputRefs.current[index] = el)}
                type="tel" inputMode="numeric" pattern="[0-9]*" value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => { e.preventDefault(); handlePaste(index); }}
                className={`w-11 h-12 text-center text-lg font-bold rounded-xl outline-none border-2 transition-all duration-150 ${
                  digit ? "border-red-800 bg-red-50 text-red-900"
                  : displayError ? "border-red-300 bg-red-50/30"
                  : "border-stone-200 bg-stone-50 focus:border-red-700 focus:bg-white"
                }`}
                maxLength="1" autoComplete="one-time-code" aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          {displayError && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <span className="text-red-700 text-sm">{displayError}</span>
            </div>
          )}
          <div className="text-center">
            {!canResend
              ? <p className="text-stone-400 text-sm">Resend in <span className="font-semibold text-red-800">{formatTime(timeLeft)}</span></p>
              : <button onClick={handleResend} disabled={isResending} className="inline-flex items-center gap-1.5 text-red-800 text-sm font-semibold hover:text-red-700 transition-colors disabled:opacity-50">
                  <RefreshCw className={`h-3.5 w-3.5 ${isResending ? "animate-spin" : ""}`} />
                  {isResending ? "Resending..." : "Resend OTP"}
                </button>
            }
          </div>
          <button
            onClick={handleVerify} disabled={!isCodeComplete || isVerifying}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
              isCodeComplete && !isVerifying
                ? "bg-red-800 text-white hover:bg-red-900 shadow-md shadow-red-800/20 hover:shadow-lg hover:shadow-red-800/30 hover:-translate-y-0.5"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}
          >
            {isVerifying ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying...</>
              : isCodeComplete ? <><CheckCircle className="h-4 w-4" />Verify & Place Order</>
              : <><Smartphone className="h-4 w-4" />Enter 6-digit code</>}
          </button>
          <p className="text-center text-xs text-stone-400">You can paste the OTP directly into any field</p>
        </div>
      </div>
    </div>
  );
};

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
  const [showPhoneOTPModal, setShowPhoneOTPModal] = useState(false);
  const [phoneVerification, setPhoneVerification] = useState({ isVerifying: false, error: null });
  const [otpSessionId, setOtpSessionId] = useState(null);

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("checkoutFormData");
    if (!saved) { router.push("/cart/checkout"); return; }
    try {
      setCheckoutData(JSON.parse(saved));
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

  const handleOnlinePayment = async () => {
    setIsProcessingOnline(true);
    gaEvent({ action: "ONLINE_Initiated", params: { payment_method: "ONLINE", OrderID: checkoutData?.orderId } });
    fbEvent({ action: "ONLINE_Initiated", params: { payment_method: "ONLINE", OrderID: checkoutData?.orderId } });
    try { await analyticsAPI.trackPaymentMethod("ONLINE"); } catch (e) { console.error(e); }
    setTimeout(() => handleSubmitPayment(), 1000);
  };

  const handlePartialCODPayment = async () => {
    setIsProcessingPartialCOD(true);
    gaEvent({ action: "Partial_COD_Initiated", params: { payment_method: "PARTIAL_COD", OrderID: checkoutData?.orderId, advance_amount: 300 } });
    fbEvent({ action: "PARTIAL_COD_Initiated", params: { payment_method: "PARTIAL_COD", OrderID: checkoutData?.orderId, advance_amount: 300 } });
    try { await analyticsAPI.trackPaymentMethod("PARTIAL_COD"); } catch (e) { console.error(e); }
    setTimeout(() => handleSubmitPayment(PARTIAL_COD_AMOUNT), 1000);
  };

  const handleSubmitPayment = (partialAmount = null) => {
   
    try {
      const saved = JSON.parse(localStorage.getItem("checkoutFormData") || "{}");
      saved.paymentMethod = partialAmount ? "PARTIAL_COD" : "ONLINE";
      saved.partialAmount = partialAmount || null;
      localStorage.setItem("checkoutFormData", JSON.stringify(saved));
    } catch (e) { console.error(e); }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://api.gulbhahar.com/ccavRequestHandler";
    form.style.display = "none";
    const chargeAmount = partialAmount || checkoutData?.orderTotal;
    const fields = {
      merchant_id: "4371009", order_id: checkoutData?.orderId || "TEST_ORDER_001",
      currency: "INR", amount: chargeAmount.toString(),
      redirect_url: "https://api.gulbhahar.com/ccavResponseHandler",
      cancel_url: "https://api.gulbhahar.com/ccavResponseHandler",
      language: "EN", billing_name: checkoutData?.fullName, billing_address: checkoutData?.address,
      billing_city: checkoutData?.city, billing_state: checkoutData?.region,
      billing_zip: checkoutData?.postalCode, billing_country: checkoutData?.country,
      billing_tel: checkoutData?.phone, billing_email: checkoutData?.email,
      delivery_name: checkoutData?.fullName, delivery_address: checkoutData?.address,
      delivery_city: checkoutData?.city, delivery_state: checkoutData?.region,
      delivery_zip: checkoutData?.postalCode, delivery_country: checkoutData?.country,
      delivery_tel: checkoutData?.phone,
      merchant_param1: partialAmount ? "PARTIAL_COD" : "FULL_PAYMENT",
      merchant_param2: partialAmount ? `Advance: ${partialAmount}` : `Full: ${checkoutData?.orderTotal || 0}`,
      merchant_param3: partialAmount ? `COD_Amount: ${(checkoutData?.orderTotal || 0) - partialAmount}` : "FULL_ONLINE",
      merchant_param4: partialAmount ? `Total: ${checkoutData?.orderTotal || 0}` : "additional Info.",
      merchant_param5: checkoutData?.orderId || "NO_ORDER_ID",
      promo_code: "", customer_identifier: checkoutData?.phone || "",
    };
    Object.entries(fields).forEach(([k, v]) => {
      const inp = document.createElement("input");
      inp.type = "hidden"; inp.name = k; inp.value = v;
      form.appendChild(inp);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
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
    <div className="min-h-screen mt-14 sm:mt-20 bg-[#F5F5F7]">
      <div className="w-full max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-10 lg:py-12">

        <CheckoutProgress />

        <div className={`transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-8 items-start">

            {/* ══ LEFT — Payment Options ══ */}
            <div className="lg:col-span-3 flex flex-col gap-4">

              {/* Page heading */}
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

                {/* Divider */}
                <div className="border-t border-[#F3F4F6]" />

                {/* Method detail */}
                <div className="px-4 sm:px-6 py-4">
                  {paymentMethod === "online" ? (
                    <div className="flex items-start gap-3.5 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                      <div className="w-10 h-10 bg-red-800 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CreditCard className="w-4.5 h-4.5 text-white w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1a1a1a] mb-0.5">Online Payment</p>
                        <p className="text-xs text-[#757575] leading-relaxed mb-3">
                          Pay securely via Credit / Debit Card, UPI, Net Banking, or Digital Wallets
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
                            Pay a small advance now, remaining amount collected at doorstep
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                              ₹{PARTIAL_COD_AMOUNT} advance
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
                          <p className="text-[10px] font-semibold text-[#757575] uppercase tracking-wide mb-1">Pay Now</p>
                          <p className="text-lg font-bold text-red-800">₹{PARTIAL_COD_AMOUNT}</p>
                        </div>
                        <div className="bg-white rounded-xl px-4 py-3 border border-[#E5E7EB] text-center">
                          <p className="text-[10px] font-semibold text-[#757575] uppercase tracking-wide mb-1">On Delivery</p>
                          <p className="text-lg font-bold text-[#1a1a1a]">
                            ₹{((checkoutData?.orderTotal || 1200) - PARTIAL_COD_AMOUNT).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-[#F3F4F6]" />

                {/* CTA buttons */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3">
                  {/* Primary pay button */}
                  <button
                    onClick={paymentMethod === "online" ? handleOnlinePayment : handlePartialCODPayment}
                    disabled={isProcessingOnline || isProcessingPartialCOD}
                    className="w-full min-h-[52px] bg-red-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-red-900 active:bg-red-950 transition-all duration-150 shadow-md shadow-red-800/20 hover:shadow-lg hover:shadow-red-800/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {(isProcessingOnline || isProcessingPartialCOD)
                      ? <><Loader2 className="h-4 w-4 animate-spin" />Processing your order...</>
                      : paymentMethod === "online"
                        ? <><Lock className="h-4 w-4" />Pay ₹{(checkoutData?.orderTotal || 1200).toLocaleString()} Securely</>
                        : <><Lock className="h-4 w-4" />Pay ₹{PARTIAL_COD_AMOUNT} Now</>
                    }
                  </button>

                  {/* Secondary back button */}
                  <button
                    onClick={() => router.push("/cart/checkout")}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 text-[#757575] text-sm font-medium hover:text-[#1a1a1a] transition-colors duration-150"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Go back to checkout
                  </button>

                  <p className="text-center text-[11px] text-[#9CA3AF]">
                    Redirected to CCAvenue — India's most trusted payment gateway
                  </p>
                </div>
              </div>

              {/* Trust badges — row on desktop, 2×2 on mobile */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-4 sm:px-6 py-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-0 sm:flex sm:items-center sm:justify-around">
                  {[
                    { icon: Shield, title: "SSL Encrypted", sub: "256-bit security" },
                    { icon: CheckCircle, title: "PCI Compliant", sub: "Highest standard" },
                    { icon: Star, title: "Trusted Gateway", sub: "10M+ customers" },
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
                    { label: "Method", value: <span className="text-[11px] font-bold bg-red-50 border border-red-100 text-red-800 px-2.5 py-1 rounded-full">{paymentMethod === "partial-cod" ? "Partial COD" : "Online"}</span> },
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
                {paymentMethod === "partial-cod" && (
                  <div className="px-5 sm:px-6 py-4 space-y-2 border-b border-[#E5E7EB]">
                    <div className="flex justify-between items-center py-2.5 px-3 bg-white border border-red-100 rounded-xl">
                      <span className="text-xs font-medium text-[#757575]">Pay Now (Advance)</span>
                      <span className="text-sm font-bold text-red-800">₹{PARTIAL_COD_AMOUNT}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3 bg-white border border-amber-100 rounded-xl">
                      <span className="text-xs font-medium text-[#757575]">On Delivery</span>
                      <span className="text-sm font-bold text-amber-700">₹{((checkoutData?.orderTotal || 1200) - PARTIAL_COD_AMOUNT).toLocaleString()}</span>
                    </div>
                  </div>
                )}
                {paymentMethod === "online" && (
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
                  <span className="text-[11px] text-[#9CA3AF] font-medium">Secured by CCAvenue</span>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* OTP Modal (commented out) */}
        {/* <PhoneOTPModal
          isOpen={showPhoneOTPModal}
          onClose={() => setShowPhoneOTPModal(false)}
          onVerify={handlePhoneVerify}
          phone={checkoutData?.phone || "+919876543210"}
          isVerifying={phoneVerification.isVerifying}
          error={phoneVerification.error}
          sessionId={otpSessionId}
        /> */}
        
      </div>
    </div>
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
