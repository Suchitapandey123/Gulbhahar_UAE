"use client";

import { PreOrderProductData } from "@/services/preOrder/preOrderTypes";
import { useState } from "react";
import { toast } from "sonner";

interface PreOrderFormProps {
  product: PreOrderProductData;
}

const inputClass =
  "w-full bg-[#FDFAF6] border border-[#E4DDD4] rounded-lg px-4 py-3 text-sm text-gray-800 placeholder:text-[#C0B4A8] focus:outline-none focus:ring-2 focus:ring-[#7f1d1e]/20 focus:border-[#7f1d1e] transition-all duration-200";

const labelClass = "block text-[11px] uppercase tracking-[0.15em] text-[#9A8A78] mb-1.5 font-medium";

export default function PreOrderForm({ product }: PreOrderFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const imageUrl = Array.isArray(product.images)
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : (product.images[0] as unknown as string[])?.[0] ?? ""
    : "";

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length === 0) return null;
    if (cleanPhone.length < 10) return "Phone number must be 10 digits";
    if (cleanPhone.length > 10) return "Phone number must be exactly 10 digits";
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) return "Phone number must start with 6, 7, 8, or 9";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const cleanValue = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, [name]: cleanValue }));
      setPhoneError(validatePhone(cleanValue));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const phoneValidationError = validatePhone(form.phone);
    if (phoneValidationError) {
      toast.error(phoneValidationError);
      setPhoneError(phoneValidationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/pre-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.productId,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          images: imageUrl,
          parentCategory: product.parentCategory,
          user: { name: form.name, email: form.email, phone: form.phone },
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        toast.error(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("[PreOrderForm] fetch error:", err);
      toast.error(`Error: ${err instanceof Error ? err.message : "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success State ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-5">
        {/* Gold circle check */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7f1d1e22, #7f1d1e44)" }}
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#7f1d1e" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-serif text-gray-900 tracking-wide">Enquiry Received</h3>
          <div className="h-px w-12 bg-[#7f1d1e] mx-auto" />
        </div>

        <p className="text-[#9A8A78] text-sm max-w-xs leading-relaxed">
          Thank you for your interest in{" "}
          <span className="text-gray-700 font-medium">{product.name}</span>. Our team will reach out to{" "}
          <span className="text-gray-700 font-medium">{form.email}</span> within 24 hours.
        </p>

        <p className="text-[11px] uppercase tracking-[0.2em] text-[#7f1d1e]">
          ✦ &nbsp; Gulbhahar
        </p>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Full Name <span className="text-[#7f1d1e]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>
            Phone <span className="text-[#7f1d1e]">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5">
              <span className="text-gray-500 text-sm font-medium border-r border-gray-200 pr-2">
                +91
              </span>
            </div>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              maxLength={10}
              pattern="[6-9][0-9]{9}"
              inputMode="numeric"
              className={`${inputClass} pl-16 ${phoneError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' : ''}`}
              required
            />
          </div>
          {phoneError && (
            <p className="mt-1.5 text-xs text-red-500">{phoneError}</p>
          )}
          {!phoneError && form.phone && form.phone.length === 10 && (
            <p className="mt-1.5 text-xs text-emerald-600">✓ Valid phone number</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>
          Email Address <span className="text-[#7f1d1e]">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          
          className={inputClass}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>
          Message <span className="text-[#7f1d1e]">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="relative w-full py-3.5 rounded-lg text-sm uppercase tracking-[0.2em] font-medium text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
        style={{ background: "linear-gradient(135deg, #7f1d1e, #A07840)" }}
      >
        <span className="relative z-10">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Submitting…
            </span>
          ) : (
            "Submit Pre-Order Enquiry"
          )}
        </span>
        {/* Shine overlay on hover */}
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
      </button>

      <p className="text-[11px] text-[#B0A090] text-center leading-relaxed">
        By submitting, you agree to be contacted by Gulbhahar regarding this enquiry.
        <br />Your details are kept confidential and never shared.
      </p>
    </form>
  );
}
