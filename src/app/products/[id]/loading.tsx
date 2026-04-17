export default function ProductLoading() {
  return (
    <div className="bg-white py-4 mt-10 sm:mt-0 px-2 sm:py-3 sm:px-3 lg:py-4 lg:px-4 font-raleway animate-pulse">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-3 w-2 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-2 bg-gray-200 rounded" />
          <div className="h-3 w-32 bg-gray-200 rounded" />
        </div>

        {/* Main: images + product info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: image gallery */}
          <div className="flex gap-3">
            <div className="hidden sm:flex flex-col gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-20 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] bg-gray-200 rounded-lg" />
          </div>

          {/* Right: product details */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-7 w-3/4 bg-gray-200 rounded" />
            <div className="h-7 w-1/2 bg-gray-200 rounded" />
            <div className="flex gap-3 items-center mt-2">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-100 rounded" />
            </div>
            <div className="flex gap-2 mt-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-9 w-14 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div className="h-12 w-full bg-gray-200 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded" />
            </div>
            <div className="h-12 w-full bg-gray-100 rounded mt-2" />
          </div>
        </div>

        {/* Details + reviews */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-3">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-3 bg-gray-100 rounded" style={{ width: `${90 - i * 15}%` }} />
            ))}
          </div>
          <div className="h-32 bg-gray-100 rounded" />
        </div>

        {/* Similar products */}
        <div className="mt-16">
          <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="aspect-[3/4] bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
