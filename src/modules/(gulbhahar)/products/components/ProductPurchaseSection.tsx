"use client";

import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { Product } from "../types";

interface ProductPurchaseSectionProps {
  product: Product;
  selectedSize: string;
  availableQuantity: number;
  addingToCart: boolean;
  onAddToCart: () => void;
  customRed: string;
}

export const ProductPurchaseSection = ({
  product,
  selectedSize,
  availableQuantity,
  addingToCart,
  onAddToCart,
  customRed,
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
          disabled={addingToCart || !selectedSize || availableQuantity === 0}
          className={`w-full py-3.5 text-white rounded-lg font-medium text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
            addingToCart || !selectedSize || availableQuantity === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90"
          }`}
          style={{ backgroundColor: customRed }}
        >
          {addingToCart ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Adding...
            </>
          ) : !selectedSize ? (
            "SELECT SIZE"
          ) : availableQuantity === 0 ? (
            "OUT OF STOCK"
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              ADD TO CART
            </>
          )}
        </button>

        {/* <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium">
          <Heart className="w-5 h-5" />
          Add to Wishlist
        </button> */}
      </div>
    </div>
  );
};
