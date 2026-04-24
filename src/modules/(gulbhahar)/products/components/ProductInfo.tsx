import { Product } from "../types";

interface ProductInfoProps {
  product: Product;
  customRed: string;
  avgRating?: number;
  reviewCount?: number;
}

export const ProductInfo = ({ product, customRed, avgRating = 0, reviewCount = 0 }: ProductInfoProps) => {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Get category for display
  const category = Array.isArray(product.parentCategory)
    ? product.parentCategory[0]
    : product.parentCategory;

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Category badge */}
      <div className="flex items-center gap-2 md:gap-3">
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.25em] uppercase text-[#800000]/70">
          {category || "Gulbhahar"}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-[#800000]/20 to-transparent" />
      </div>

      {/* Product name & price - flex layout */}
      <div className="flex flex-row items-start justify-between gap-3 md:gap-6">
        {/* Left: Product name with classic typography */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-serif text-gray-900 leading-tight">
            {product.name}
          </h1>
          <div className="mt-2 md:mt-3 flex items-center gap-1.5 md:gap-2">
            {reviewCount > 0 ? (
              <>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="text-xs md:text-sm"
                      style={{ color: star <= Math.round(avgRating) ? "#f59e0b" : "#d1d5db" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-[11px] md:text-xs font-semibold text-gray-700">{avgRating}</span>
                <span className="text-[10px] md:text-xs text-gray-400">({reviewCount} reviews)</span>
              </>
            ) : (
              <span className="text-[10px] md:text-xs text-gray-400 tracking-wide">Handcrafted with care</span>
            )}
          </div>
        </div>

        {/* Right: Elegant price display */}
        <div className="text-right flex-shrink-0">
          <div className="flex flex-col items-end gap-0.5 md:gap-1">
            <div className="flex items-baseline">
              <span className="text-xs md:text-sm font-light text-gray-400 mr-0.5 md:mr-1">₹</span>
              <span className="text-2xl sm:text-3xl md:text-3xl font-light text-gray-900 tracking-tight">
                {product.price?.toLocaleString("en-IN")}
              </span>
            </div>

            {product.originalPrice > product.price && (
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-sm md:text-base text-gray-400 line-through font-light">
                  ₹{product.originalPrice?.toLocaleString("en-IN")}
                </span>
                <span
                  className="px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs font-bold tracking-wider uppercase border"
                  style={{
                    borderColor: customRed,
                    color: customRed,
                  }}
                >
                  {discountPercentage}% off
                </span>
              </div>
            )}
          </div>

          <p className="mt-1.5 md:mt-2 text-[10px] md:text-xs text-gray-400 tracking-wide">
            Incl. taxes
          </p>
        </div>
      </div>

      {/* Social proof badge */}
      {reviewCount > 0 && (
        <div className="flex items-center gap-1.5">
          <span className="text-sm">❤️</span>
          <span className="text-[11px] md:text-xs text-gray-500 font-medium">
            Loved by <span className="text-[#800000] font-semibold">{reviewCount} customers</span>
          </span>
        </div>
      )}

      {/* Decorative separator */}
      <div className="flex items-center gap-3 md:gap-4 py-1 md:py-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <span className="text-[#800000]/40 text-[10px] md:text-xs">✦</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </div>
  );
};
