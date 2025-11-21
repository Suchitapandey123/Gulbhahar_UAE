"use client";

export function ProductLoader() {
  return (
    <div className="min-h-screen bg-white py-4 mt-10 sm:mt-0 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 font-raleway animate-pulse">
      <div className="max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-2 h-2 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-2 h-2 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-2 h-2 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="aspect-[3/4] sm:aspect-auto md:h-[500px] lg:h-[625px] bg-gray-200 rounded-lg"></div>

            {/* Thumbnail Images Skeleton */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Mobile Product Info Skeleton */}
            <div className="lg:hidden block py-2 space-y-6">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Price Skeleton */}
              <div className="flex items-center gap-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>

              {/* Color Selection Skeleton */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-20 h-24 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>

              {/* Size Selection Skeleton */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-md">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Delivery Section Skeleton */}
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-28"></div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  <div className="w-20 h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-3">
                <div className="flex-1 h-16 sm:h-20 bg-gray-200 rounded-[15px]"></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-[15px]"></div>
              </div>

              {/* Reviews Skeleton - Mobile */}
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Product Details Skeleton - Desktop */}
            <div className="hidden lg:block mt-14 space-y-8">
              {/* Overview Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-200 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-40"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-200 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Skeleton - Mobile/Tablet */}
            <div className="lg:hidden mt-8 space-y-8">
              {/* Overview Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-gray-200 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-28"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-gray-200 space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-5 bg-gray-200 rounded-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-36"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-gray-200 space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                      <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info (Desktop Only) */}
          <div className="lg:pl-16 hidden lg:block py-2 space-y-8">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Price Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-12 bg-gray-200 rounded w-32"></div>
              <div className="h-7 bg-gray-200 rounded w-40"></div>
              <div className="h-7 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Color Selection Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-36"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-gray-200 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-[88px] h-[109px] bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Selection Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-gray-200 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="grid grid-cols-7 gap-2 max-w-md">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Section Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-44"></div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
                <div className="flex gap-2 max-w-md">
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  <div className="w-20 h-10 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 h-20 bg-gray-200 rounded-[15px]"></div>
              <div className="w-20 h-20 bg-gray-200 rounded-[15px]"></div>
            </div>

            {/* Reviews Skeleton - Desktop */}
            <div className="space-y-4">
              <div className="h-7 bg-gray-200 rounded w-40"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section Skeleton */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow h-px bg-gray-200"></div>
            <div className="h-8 bg-gray-200 rounded w-48 mx-4"></div>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-3">
                {/* Product Image */}
                <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                
                {/* Product Info */}
                <div className="space-y-2 px-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-5 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}