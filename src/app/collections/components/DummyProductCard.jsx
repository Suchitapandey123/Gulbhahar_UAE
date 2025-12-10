"use client";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

const FALLBACK_IMAGES = [
  "/login/001.webp",
  "/login/002.webp",
  "/login/003.webp",
];

// Dummy product data
const dummyProducts = [
  {
    id: "dummy-1",
    name: "Elegant Designer Saree",
    price: 2499,
    originalPrice: 3499,
    num: 1,
    stock: 5,
  },
  {
    id: "dummy-2",
    name: "Traditional Silk Saree",
    price: 1999,
    originalPrice: 2999,
    num: 2,
    stock: 3,
  },
  {
    id: "dummy-3",
    name: "Premium Wedding Saree",
    price: 3999,
    num: 3,
    stock: 12,
  },
  {
    id: "dummy-4",
    name: "Classic Party Wear Saree",
    price: 2799,
    num: 4,
    originalPrice: 3299,
    stock: 8,
  },
  {
    id: "dummy-5",
    name: "Royal Silk Saree",
    price: 3499,
    num: 5,
    originalPrice: 4299,
    stock: 6,
  },
  {
    id: "dummy-6",
    name: "Festive Collection Saree",
    price: 2199,
    num: 6,
    stock: 10,
  },
  {
    id: "dummy-7",
    name: "Bridal Special Saree",
    price: 5999,
    num: 7,
    originalPrice: 7999,
    stock: 4,
  },
  {
    id: "dummy-8",
    name: "Designer Cotton Saree",
    price: 1799,
    num: 8,
    stock: 15,
  },
];

export default function DummyProductCard({
  parentCategory = null,
  slug = null,
  viewMode = "grid",
  index = 0,
}) {
  // Get the product data based on index
  const item = dummyProducts[index % dummyProducts.length];
  
  // State to track if image failed to load
  const [imageError, setImageError] = useState(false);

  // Determine which image to show
  // If error, use fallback image based on index (cycles through 3 fallback images)
  const imageSrc = imageError
    ? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
    : `https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/${slug}/${slug}_${item.num}.jpg`;

  return (
    <div
      className={`group w-full opacity-75 ${
        viewMode === "list"
          ? "bg-white rounded-lg shadow-sm border border-gray-200"
          : ""
      }`}
    >
      <div
        className={`cursor-not-allowed relative ${
          viewMode === "grid" ? "space-y-3" : "flex gap-4 p-4"
        }`}
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
            <Image
              width={200}
              unoptimized
              height={450}
              priority
              src={imageSrc}
              alt={item.name}
              className={`w-full h-full object-cover ${
                viewMode === "list" ? "rounded-lg" : ""
              }`}
              onError={(e) => {
                console.log(`Image ${index} failed to load (403 or other error), using fallback: ${FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}`);
                setImageError(true);
              }}
            />

            {/* "Coming Soon" Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                {/* <p className="text-white font-bold  text-4xl mb-1">SOLD OUT</p> */}
                {/* <p className="text-white/90 text-xs">Stay Tuned!</p> */}
              </div>
            </div>
          </div>


          {/* Add to Cart Button - Disabled */}
          {viewMode === "grid" && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-500 text-white text-center py-2 z-10">
              <button
                disabled
                className="w-full text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed opacity-75"
              >
                <ShoppingBag size={16} />
                <span>Coming Soon</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Info */}
        {viewMode === "grid" ? (
          <div className="flex flex-col justify-between h-full px-2 py-2 space-y-1">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-600 line-clamp-2">
              {item.name.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-500">
                ₹{item.price.toLocaleString()}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{item.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {item.name.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-500">
                ₹{item.price.toLocaleString()}
              </span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{item.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}