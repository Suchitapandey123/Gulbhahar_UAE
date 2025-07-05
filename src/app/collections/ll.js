import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

<div className="py-8">
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Similar Products</h2>
    <p className="text-gray-600">Discover more products you might like</p>
  </div>
  
  <div className="px-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
    {similarProducts.map((item, index) => (
      <div
        key={item.productId}
        className="group w-full"
      >
        <Link href={`/product/${item.productId}`}>
          <div className="cursor-pointer relative space-y-3">
            {/* Image Container */}
            <div className="relative overflow-hidden w-full aspect-[3/4]">
              <div className="relative w-full h-full bg-gray-100">
                <Image
                  width={200}
                  height={450}
                  priority
                  src={item.images && item.images.length > 0 ? item.images[0] : "/Image/About1.png"}
                  alt={item.name || "Product Image"}
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "/Image/About1.png";
                  }}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>

              {/* Stock Tag */}
              {item.stock && item.stock <= 5 && item.stock > 0 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                  Only {item.stock} left!
                </span>
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

              {/* Hover Add to Cart Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0">
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  disabled={addingToCart === item.productId}
                  className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  <ShoppingBag size={14} />
                  <span>
                    {addingToCart === item.productId ? "Adding..." : "Add to Cart"}
                  </span>
                </button>
              </div>
            </div>

            {/* Product Info - Grid Layout */}
            <div className="flex flex-col justify-between h-full px-2 py-2 space-y-1">
              {/* Top Row - Product Name & Price */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                    {item.name?.toUpperCase() || "PRODUCT NAME"}
                  </h3>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-sm font-bold text-red-600">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Second Row - Stock Status */}
              <div className="flex items-center justify-start text-xs">
                <div className="flex-1">
                  {item.stock && item.stock <= 5 && item.stock > 0 ? (
                    <span className="text-red-600 font-medium">
                      {item.stock} left
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">In Stock</span>
                  )}
                </div>
              </div>

              {/* Bottom Row - Metadata */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                {/* Sizes */}
                <div className="flex items-center gap-1">
                  {item.sizes && item.sizes.length > 0 && (
                    <>
                      <span className="text-gray-500">Size:</span>
                      <div className="flex gap-1">
                        {item.sizes.slice(0, 2).map((size, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium"
                          >
                            {size}
                          </span>
                        ))}
                        {item.sizes.length > 2 && (
                          <span className="text-gray-500">
                            +{item.sizes.length - 2}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Colors */}
                <div className="flex items-center gap-1">
                  {item.colors && item.colors.length > 0 && (
                    <div className="flex items-center gap-1">
                      {item.colors.slice(0, 3).map((color, idx) => (
                        <div
                          key={idx}
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: color.toLowerCase(),
                          }}
                          title={color}
                        />
                      ))}
                      {item.colors.length > 3 && (
                        <span className="text-gray-500 text-xs">
                          +{item.colors.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>