"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductPurchaseSectionProps {
  product: Product;
  selectedSize: string;
  addingToCart: boolean;
  onAddToCart: () => void;
  customRed: string;
  isOutOfStock: boolean;
}

export const ProductPurchaseSection = ({
  product,
  selectedSize,
  addingToCart,
  onAddToCart,
  customRed,
  isOutOfStock,
}: ProductPurchaseSectionProps) => {

  return (
    <div className="space-y-6">
      {/* Pricing */}
      {/* <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-lg md:text-xl text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
              <span
                className="px-2 py-1 rounded text-sm font-semibold"
                style={{ backgroundColor: `${customRed}20`, color: customRed }}
              >
                {discountPercentage}% Off
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500">Inclusive Of All Taxes</p>
      </div> */}

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onAddToCart}
          disabled={addingToCart || !selectedSize || isOutOfStock}
          className={`w-full py-3.5 text-white rounded-lg font-medium text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
            addingToCart || !selectedSize || isOutOfStock
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
          style={{ backgroundColor: customRed }}
        >
          {isOutOfStock ? (
            "OUT OF STOCK"
          ) : addingToCart ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Adding...
            </>
          ) : !selectedSize ? (
            "SELECT SIZE"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              ADD TO CART
            </>
          )}
        </button>
      </div>

      {/* Delhi NCR Express banner */}
      <div className="bg-stone-900 rounded-xl px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0 text-base">
          ⚡
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-xs leading-tight">Delhi NCR? Get your order in 2–3 hours!</p>
          <p className="text-stone-400 text-[10px] mt-0.5 leading-tight">
            Order between <span className="text-yellow-400 font-semibold">10 AM – 7 PM</span> for same-day express delivery.
          </p>
        </div>
        <span className="text-[10px] font-bold text-yellow-400 border border-yellow-400/40 bg-yellow-400/10 px-2 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
          Same Day
        </span>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          { icon: "🔒", label: "Secure Checkout" },
          { icon: "↩️", label: "7-Day Returns" },
          { icon: "🤝", label: "Handcrafted" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1 py-2 px-1 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-base">{b.icon}</span>
            <span className="text-[9px] md:text-[10px] text-gray-500 font-medium text-center leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
