export default function CollectionLoading() {
  return (
    <div className="mt-24 px-2 max-w-7xl 2xl:max-w-[1600px] mx-auto animate-pulse">

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg" />
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Content section skeleton */}
      <div className="mt-16 flex flex-col gap-3">
        <div className="h-6 w-48 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
        <div className="h-3 w-4/6 bg-gray-100 rounded" />
      </div>

      {/* Quick links skeleton */}
      <div className="mt-10 flex flex-wrap gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-8 w-28 bg-gray-200 rounded-full" />
        ))}
      </div>

    </div>
  );
}
