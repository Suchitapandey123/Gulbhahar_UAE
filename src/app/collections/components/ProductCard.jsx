"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({
  item,
  index,
  viewMode,
  category,
  currentImageIndices,
  setCurrentImageIndices,
  handleAddToCart,
  addingToCart,
}) {
  const slideIntervalRef = useRef(null);

  const handleMouseEnter = (productId) => {
    clearInterval(slideIntervalRef.current);

    slideIntervalRef.current = setInterval(() => {
      setCurrentImageIndices((prev) => {
        const currentIndex = prev[productId] || 0;
        const imagesArr = Array.isArray(item.image) ? item.image : [item.image];
        const imagesToShow = Array.isArray(imagesArr[0])
          ? imagesArr[0]
          : imagesArr;
        const nextIndex = (currentIndex + 1) % imagesToShow.length;
        return { ...prev, [productId]: nextIndex };
      });
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearInterval(slideIntervalRef.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(slideIntervalRef.current);
    };
  }, []);

  const imagesArr = Array.isArray(item.image) ? item.image : [item.image];
  const imagesToShow = Array.isArray(imagesArr[0]) ? imagesArr[0] : imagesArr;
  const currentImageIndex =
    currentImageIndices[item.id || item.productId || index] || 0;

  const cardContent = (
    <div
      className={`cursor-pointer relative ${
        viewMode === "grid" ? "space-y-3" : "flex gap-4 p-4"
      }`}
      onMouseEnter={() => handleMouseEnter(item.id || item.productId)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${
          viewMode === "grid"
            ? "w-full aspect-[3/4]"
            : "w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-lg"
        }`}
      >
        <div className="relative w-full h-full bg-white">
          {imagesToShow.map((image, idx) => (
            <Image
              width={200}
              height={450}
              priority
              key={idx}
              src={image || "/Image/About1.png"}
              alt={`${item.title || item.name || "Product"} - ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                currentImageIndex === idx ? "opacity-100" : "opacity-0"
              } ${viewMode === "list" ? "rounded-lg" : ""}`}
              onError={(e) => {
                e.currentTarget.src = "/Image/About1.png";
              }}
            />
          ))}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Indicators */}
        {viewMode === "grid" && imagesToShow.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {imagesToShow.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === idx ? "bg-red-900 w-3" : "bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* New Arrival Badge */}
        {(index === 0 || index === 1) && (
          <div className="absolute top-0 right-0 z-10">
            <span className="relative bg-gradient-to-r from-[#7b1e28] via-[#8b2632] to-[#4a0f14] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
              ✨ NEW ARRIVAL ✨
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {item.originalPrice && item.originalPrice > item.price && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
            {Math.round(
              ((item.originalPrice - item.price) / item.originalPrice) * 100
            )}
            % OFF
          </span>
        )}

        {/* Add to Cart Button */}
        {viewMode === "grid" && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0 z-10">
            <button
              onClick={(e) => handleAddToCart(e, item)}
              disabled={addingToCart === (item.productId || item.id)}
              className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {addingToCart === (item.productId || item.id) ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      {viewMode === "grid" ? (
        <div className="flex flex-col justify-between h-full px-2 py-2 space-y-1">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">
            {(item.name || item.title || "PRODUCT").toUpperCase()}
          </h3>
          <span className="text-sm font-bold text-red-600">
            ₹{item.price?.toLocaleString?.() || String(item.price)}
          </span>
        </div>
      ) : (
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {(item.name || item.title || "PRODUCT").toUpperCase()}
          </h3>
          <span className="text-lg font-bold text-red-600">
            ₹{item.price?.toLocaleString?.() || String(item.price)}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`group w-full ${
        viewMode === "list"
          ? "bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          : ""
      }`}
    >
      {category !== "sarees" ? (
        <Link href={`/products/${item.productId || item.id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}