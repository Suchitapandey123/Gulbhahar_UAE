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
