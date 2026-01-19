"use client";
import { ShoppingBag } from "lucide-react";

export default function DummyProductCard({ viewMode = "grid" }) {
  return (
    <div
      className={`group w-full ${
        viewMode === "list"
          ? "bg-white rounded-lg shadow-sm border border-gray-200"
          : ""
      }`}
    >
      <div
        className={`cursor-pointer relative ${
          viewMode === "grid" ? "space-y-3" : "flex gap-4 p-4"
        }`}
      >
        {/* Image Section - Skeleton */}
        <div
          className={`relative overflow-hidden ${
            viewMode === "grid"
              ? "w-full aspect-[3/4]"
              : "w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-lg"
          }`}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          {/* Dummy Indicators */}
          {viewMode === "grid" && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Dummy Badge */}
          <span className="absolute top-2 left-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded z-10 animate-pulse">
            Loading...
          </span>

          {/* Dummy Add to Cart Button */}
          {viewMode === "grid" && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-300 text-white text-center py-2 opacity-50">
              <button
                disabled
                className="w-full text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <ShoppingBag size={16} className="text-gray-400" />
                <span className="text-gray-400">Loading...</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Info - Skeleton */}
        {viewMode === "grid" ? (
          <div className="flex flex-col justify-between h-full px-2 py-2 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-5 bg-gray-300 rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-6 bg-gray-300 rounded animate-pulse w-1/2" />
          </div>
        )}
      </div>
    </div>
  );
}