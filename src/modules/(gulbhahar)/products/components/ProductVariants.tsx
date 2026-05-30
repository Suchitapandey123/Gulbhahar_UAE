"use client";

import { Ruler } from "lucide-react";
import { useMemo } from "react";
import { Product } from "../types";

interface ProductVariantsProps {
  product: Product;
  selectedColorIndex: number;
  setSelectedColorIndex: (index: number) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  customRed: string;
  setShowSizeGuide: (show: boolean) => void;
  shouldShowSizeGuide: boolean;
  sizeRange: { size: string; available: boolean; quantity: number }[];
  inventory: { color: string; size: string; quantity: number }[];
}

export const ProductVariants = ({
  product,
  selectedColorIndex,
  setSelectedColorIndex,
  selectedSize,
  setSelectedSize,
  customRed,
  sizeRange,
  setShowSizeGuide,
  shouldShowSizeGuide,
  inventory,
}: ProductVariantsProps) => {
  
  const availableColors = useMemo(() => {

    if (!product.availableColors || product.availableColors.length === 0) {
      return [];
    }
    return product.availableColors.map((color) => ({
      name: typeof color === "string" ? color : color.name,
      hexcode: typeof color === "string" ? "#e5ab0b" : color.hexcode || "#e5ab0b",
    }));
  }, [product.availableColors]);

  const currentColor = availableColors[selectedColorIndex]?.name || "";

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {availableColors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-medium text-gray-900">Color:</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColorIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all duration-200 capitalize border ${
                  selectedColorIndex === idx
                    ? "text-white font-semibold shadow-md border-transparent"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                }`}
                style={
                  selectedColorIndex === idx
                    ? { backgroundColor: customRed }
                    : {}
                }
              >
                <div
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hexcode }}
                />
                <span>{color.name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <span>
              <span className="font-medium">Selected:</span>{" "}
              <span className="capitalize font-semibold" style={{ color: customRed }}>
                {currentColor}
              </span>
            </span>
            {/* {(() => {
              const colorStock = inventory
                .filter((inv) => inv.color?.toLowerCase() === currentColor?.toLowerCase())
                .reduce((sum, inv) => sum + (inv.quantity ?? 0), 0);
              return (
                <span className={`flex items-center gap-1 text-xs font-medium ${colorStock === 0 ? "text-gray-400" : "text-green-600"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${colorStock === 0 ? "bg-gray-400" : "bg-green-500"}`} />
                  {colorStock === 0 ? "Out of Stock" : "In Stock"}
                </span>
              );
            })()} */}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-medium text-gray-900">Available Sizes:</h3>
            {selectedSize && (() => {
              const selected = sizeRange.find((s) => s.size === selectedSize);
              if (!selected) return null;
              return (
                <span className={`flex items-center gap-1 text-xs font-medium ${selected.available ? "text-green-600" : "text-[#7f0001]"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${selected.available ? "bg-green-500" : "bg-[#7f0001]"}`} />
                  {/* {selected.available ? `In Stock (${selected.quantity})` : "Out of Stock"} */}
                  {selected.available ? `In Stock` : "Out of Stock"}
                </span>
              );
            })()}
          </div>
          {shouldShowSizeGuide && (
          <button
            disabled={!shouldShowSizeGuide}
            onClick={() => {
     
              setShowSizeGuide(true);
            }}
            className="text-sm hover:underline flex items-center gap-1 font-medium"
            style={{ color: customRed }}
          >
            <Ruler className="w-4 h-4" />
            Size Guide
          </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeRange.map(({ size, available, quantity }) => (
            <button
              key={size}
              onClick={() => available && setSelectedSize(size)}
              disabled={!available}
              className={`px-4 py-2.5 text-sm border rounded transition-all font-medium ${
                selectedSize === size && available
                  ? "text-white border-transparent"
                  : available
                    ? "border-gray-300 hover:border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
              }`}
              style={
                selectedSize === size && available
                  ? { backgroundColor: customRed, borderColor: customRed }
                  : {}
              }
              title={available ? `${quantity} available` : "Out of stock"}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
