"use client";
import { formatAED } from "@/utils/currency";

import { PreOrderProductData } from "@/services/preOrder/preOrderTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PreOrderForm from "./PreOrderForm";
import { ArrowLeft } from "lucide-react";

const BRAND = "#7f1d1e";

export default function PreOrderPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<PreOrderProductData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`preorder_${id}`);
    if (stored) {
      try { setProduct(JSON.parse(stored)); }
      catch { setProduct(null); }
    }
    setReady(true);
  }, [id]);

  /* Loading */
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${BRAND} transparent transparent transparent` }} />
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#9A8A78]">Loading</p>
        </div>
      </div>
    );
  }

  /* Not found */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#FAF7F2] space-y-5">
        <div className="w-12 h-px mx-auto" style={{ background: BRAND }} />
        <h2 className="text-2xl font-serif text-gray-900">Product not found</h2>
        <p className="text-[#9A8A78] text-sm max-w-xs leading-relaxed">
          Please return to the collection and click the Pre-Order button again.
        </p>
        <Link href="/collections" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors" style={{ color: BRAND }}>
          <ArrowLeft size={13} /> Back to Collections
        </Link>
      </div>
    );
  }

  const imageUrl = Array.isArray(product.images)
    ? typeof product.images[0] === "string"
      ? product.images[0]
      : (product.images[0] as unknown as string[])?.[0] ?? ""
    : "";

   

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Top nav */}
      <div className="border-b border-[#EDE8E0] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/collections" className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#9A8A78] hover:opacity-70 transition-opacity">
            <ArrowLeft size={12} /> Collections
          </Link>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#9A8A78]">Gulbhahar</p>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Page title — mobile only shows compact version */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-light" style={{ color: BRAND }}>Exclusive</p>
          <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 tracking-wide">Pre-Order Enquiry</h1>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-px w-10 sm:w-16" style={{ background: `${BRAND}55` }} />
            <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[#9A8A78]">Reserve yours today</p>
            <div className="h-px w-10 sm:w-16" style={{ background: `${BRAND}55` }} />
          </div>
        </div>

        {/* Two-column grid — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 lg:items-stretch">

          {/* ── LEFT: Image with details overlaid at bottom ── */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-[#F3EDE4]"
            style={{ aspectRatio: "3 / 4" }}>

            {/* Product image */}
            {imageUrl && (
              <Image src={imageUrl} alt={product.name} fill
                className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            )}

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              <span className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full text-white font-medium"
                style={{ background: BRAND }}>
                Pre-Order
              </span>
              {discount > 0 && (
                <span className="text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-full font-medium bg-white/90 text-[#5A4A3A]">
                  {discount}% Off
                </span>
              )}
            </div>

            {/* Bottom details overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 rounded-b-2xl px-5 py-4"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)" }}>

              {/* Category */}
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">
                {product.category?.[0] ?? product.parentCategory?.[0] ?? ""}
              </p>

              {/* Name */}
              <h2 className="text-base sm:text-lg font-serif text-white tracking-wide leading-snug mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl sm:text-2xl font-serif font-semibold text-white">
                  {formatAED(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-white/50 line-through">
                    {formatAED(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="h-px bg-white/20 mb-3" />

              {/* Colors + Sizes in one row */}
              <div className="flex items-center gap-4 flex-wrap">
                {product.availableColors && product.availableColors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Colours</span>
                    <div className="flex gap-1.5">
                      {product.availableColors.map((c) => (
                        <span key={c.name} title={c.name}
                          className="w-4 h-4 rounded-full ring-1 ring-white/40 ring-offset-1 ring-offset-transparent"
                          style={{ backgroundColor: c.hexCode }} />
                      ))}
                    </div>
                  </div>
                )}

                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Sizes</span>
                    {product.availableSizes.map((s) => (
                      <span key={s.name}
                        className="text-[10px] border border-white/30 text-white/80 px-2 py-0.5 rounded-full">
                        {s.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col">
            <div className="mb-7">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: BRAND }}>Enquiry</p>
              <h3 className="text-2xl sm:text-3xl font-serif text-gray-900 tracking-wide">Fill in your details</h3>
              <p className="text-[#9A8A78] text-sm mt-2 leading-relaxed">
                We'll reach out within 24 hours with availability, customisation, and delivery details.
              </p>
            </div>

            <div className="flex-1">
              <PreOrderForm product={product} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
