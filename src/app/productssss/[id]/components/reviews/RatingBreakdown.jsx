"use client";

export function RatingBreakdown({ breakdown, totalReviews, variant = "desktop" }) {
  const isMobile = variant === "mobile";

  if (!breakdown.length) return null;

  return (
    <div className={`space-y-${isMobile ? '2' : '3'} my-${isMobile ? '6' : '8'}`}>
      {breakdown.map(({ stars, count }) => (
        <div key={stars} className={`flex items-center gap-${isMobile ? '2' : '3'}`}>
          <span className={`w-3 text-${isMobile ? 'xs' : 'sm'} font-medium`}>
            {stars}
          </span>
          <div className={`flex-1 h-${isMobile ? '2' : '3'} bg-gray-200 rounded-full overflow-hidden`}>
            <div
              className="h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-500 rounded-full"
              style={{ 
                width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%` 
              }}
            />
          </div>
          <span className={`w-${isMobile ? '6' : '8'} text-${isMobile ? 'xs' : 'sm'} text-gray-600 font-medium`}>
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}