"use client";
import { Star } from "lucide-react";

export function ReviewStats({ 
  avgRating, 
  totalReviews, 
  breakdown, 
  loading = false, 
  variant = "desktop" 
}) {
  const isMobile = variant === "mobile";

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className={`w-${isMobile ? '8' : '12'} h-${isMobile ? '8' : '12'} border-2 border-red-900 border-t-transparent rounded-full animate-spin mx-auto mb-${isMobile ? '2' : '4'}`} />
        <p className={`text-${isMobile ? 'sm' : 'base'} text-gray-600`}>
          Loading reviews...
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-${isMobile ? '4' : '6'} border-b border-gray-200`}>
      <div className="flex items-center gap-4">
        <div className="flex">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              className={`w-${isMobile ? '5 h-5 sm:w-6 sm:h-6' : '6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10'} ${
                idx < Math.floor(avgRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="text-center">
          <span className={`text-${isMobile ? 'xl' : '2xl'} font-bold text-gray-900`}>
            {avgRating}
          </span>
          <p className={`text-${isMobile ? 'xs' : 'sm'} text-gray-600`}>out of 5</p>
          <p className={`text-${isMobile ? 'xs' : 'sm'} text-gray-500`}>
            ({totalReviews} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}