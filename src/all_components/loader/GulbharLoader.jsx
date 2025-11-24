export function GulbharLoader() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 mt-28">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          {/* Image Box */}
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg"></div>

          {/* Title */}
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>

          {/* Price */}
          <div className="mt-2 h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}
