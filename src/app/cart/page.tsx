// @ts-nocheck
"use client";

import { useCart } from "@/providers/ContextProviders/CartContext";
import { API_BASE_URL } from "@/utils/envHere";
import { CheckCircle, CreditCard, Loader2, Lock, ShoppingBag, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getProductImagesForColor } from "@/utils/productImageUtils";

declare global {
  interface Window {
    Razorpay: new (options: object) => { open(): void };
  }
}

type PaymentState = "idle" | "creating" | "verifying" | "success" | "error";

export default function CartPage() {
  const { cart, getCartTotal, getCartItemsCount, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const total = getCartTotal();
  const itemsCount = getCartItemsCount();
  const amountInPaise = Math.round(total * 100);

  const handleRazorpayPayment = async () => {
    if (amountInPaise < 100) {
      setErrorMsg("Cart total must be at least ₹1 to proceed.");
      return;
    }

    setPaymentState("creating");
    setErrorMsg("");

    let order: { order_id: string; amount: number; currency: string };
    try {
      const res = await fetch(`${API_BASE_URL}/api/razorpay/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `gulbhahar_${Date.now()}`,
        }),
      });
      if (!res.ok) throw new Error("Failed to create order");
      order = await res.json();
    } catch {
      setPaymentState("error");
      setErrorMsg("Could not initiate payment. Please try again.");
      return;
    }

    setPaymentState("idle");

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: "Gulbhahar",
      description: `Order for ${itemsCount} item(s)`,
      order_id: order.order_id,
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        setPaymentState("verifying");
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
          if (!verifyRes.ok) throw new Error("Signature mismatch");
          setPaymentState("success");
          clearCart();
        } catch {
          setPaymentState("error");
          setErrorMsg("Payment verification failed. Contact support with your payment ID: " + response.razorpay_payment_id);
        }
      },
      modal: {
        ondismiss: () => {
          if (paymentState !== "success") setPaymentState("idle");
        },
      },
      prefill: {},
      theme: { color: "#7f1d1d" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ── Success screen ── */
  if (paymentState === "success") {
    return (
      <div className="min-h-screen mt-14 sm:mt-20 bg-[#F5F5F7] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E5E7EB] max-w-md w-full p-10 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Payment Successful!</h2>
          <p className="text-sm text-[#757575] mb-8">Thank you for your purchase. We'll send an update soon.</p>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="min-h-screen mt-14 sm:mt-20 bg-[#F5F5F7]">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] tracking-tight">Your Cart</h1>
            <p className="mt-1 text-sm text-[#757575]">{itemsCount} item{itemsCount !== 1 ? "s" : ""}</p>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-16 text-center">
              <ShoppingBag size={56} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Add products to get started.</p>
              <button
                onClick={() => router.push("/")}
                className="bg-red-900 hover:bg-red-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

              {/* ── Cart Items ── */}
              <div className="lg:col-span-3 space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.cartId || `${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex gap-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image ||
                          getProductImagesForColor(item.productId, item.images, 0, "cards")[0]?.url ||
                          "/about/lal-ishq-1.jpg"
                        }
                        alt={item.name}
                        width={80}
                        height={80}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#1a1a1a] truncate">{item.name}</h4>
                      <div className="flex gap-2 mt-1">
                        {item.selectedColor && (
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{item.selectedColor}</span>
                        )}
                        {item.selectedSize && (
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">Size: {item.selectedSize}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-[#757575]">Qty:</span>
                          <span className="font-semibold text-[#1a1a1a]">{item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-red-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
                >
                  Clear All Items
                </button>
              </div>

              {/* ── Order Summary + Pay ── */}
              <div className="lg:col-span-2 lg:sticky lg:top-8">
                <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">

                  {/* Summary header */}
                  <div className="px-5 py-4 border-b border-[#F3F4F6] flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-900 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="text-white h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-[#1a1a1a]">Order Summary</span>
                  </div>

                  {/* Price rows */}
                  <div className="px-5 py-4 space-y-2.5 border-b border-[#F3F4F6]">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#757575]">Subtotal ({itemsCount} items)</span>
                      <span className="font-medium text-[#1a1a1a]">₹{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#757575]">Shipping</span>
                      <span className="font-medium text-emerald-600">Free</span>
                    </div>
                    <div className="pt-2 border-t border-[#F3F4F6] flex justify-between">
                      <span className="text-sm font-semibold text-[#757575]">Total</span>
                      <span className="text-xl font-bold text-[#1a1a1a]">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pay button */}
                  <div className="px-5 py-5 space-y-3">
                    {paymentState === "error" && (
                      <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
                        <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      onClick={handleRazorpayPayment}
                      disabled={paymentState === "creating" || paymentState === "verifying"}
                      className="w-full min-h-[52px] bg-red-900 hover:bg-red-800 active:bg-red-950 text-white rounded-xl font-bold text-sm tracking-wide transition-all duration-150 shadow-md shadow-red-900/20 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {paymentState === "creating" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Creating order...</>
                      ) : paymentState === "verifying" ? (
                        <><Loader2 className="h-4 w-4 animate-spin" />Verifying payment...</>
                      ) : (
                        <><CreditCard className="h-4 w-4" />Pay ₹{total.toLocaleString()} with Razorpay</>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-[#9CA3AF] flex items-center justify-center gap-1">
                      <Lock className="h-3 w-3" />
                      Secured by Razorpay · SSL Encrypted
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
