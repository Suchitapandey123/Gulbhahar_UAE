// @ts-nocheck
// Server Component - No "use client" directive
import { ProductImages } from "@/types";
import { getProductImages, FALLBACK_LQIP } from "@/utils/productImageUtils";
import Link from "next/link";
import ProductCardInteractive from "./ProductCardInteractive";

interface AvailableSize {
  name: string;
}

interface AvailableColor {
  name: string;
  hexcode: string;
}

interface Product {
  id?: string;
  productId?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice?: number;
  image?: string | string[] | string[][];
  images?: ProductImages[];
  availableSizes?: AvailableSize[];
  availableColors?: AvailableColor[];
  colors?: string[];
  sizes?: string[];
  stock?: number;
  inventory?: { color: string; size: string; quantity: number }[];
  category?: string[];
}

interface ProductCardProps {
  item: Product;
  index?: number;
  priority?: boolean;
}

export default function ProductCard({
  item,
  index = 0,
  priority = false,
}: ProductCardProps) {

  // Strip lqip to reduce RSC payload — all card images use shared FALLBACK_LQIP
  const imagesToShow = getProductImages(item.productId, item.images as ProductImages[])
    .slice(0, 4)
    .map((img) => ({ url: img.url, lqip: FALLBACK_LQIP }));

  // Support both old format (sizes: string[]) and new format (availableSizes: {name: string}[])
  const sizes: string[] =
    item.sizes || item.availableSizes?.map((s) => s.name) || [];
  
  // Convert colors to string array - handle both string[] and object[] formats
  const colors: string[] = (() => {
    if (item.colors && Array.isArray(item.colors)) {
      return item.colors;
    }
    if (item.availableColors && Array.isArray(item.availableColors)) {
      return item.availableColors.map((c) =>
        typeof c === 'string' ? c : c.name
      );
    }
    return [];
  })();

  // Keep full color objects (with hexcode) for rendering swatches
  const colorSwatches: AvailableColor[] = (() => {
    if (item.availableColors && Array.isArray(item.availableColors)) {
      return item.availableColors.filter((c) => typeof c === 'object' && c.hexcode);
    }
    return [];
  })();

  const productId = item.productId || item.id || "";
  const productName = item.name?.toUpperCase() || "PRODUCT NAME";

  const totalStock = Array.isArray(item.inventory)
    ? item.inventory.reduce((sum: number, v: { quantity: number }) => sum + (v.quantity ?? 0), 0)
    : (item.stock ?? 0);
   

  return (
    <div className="group w-full">
      <Link href={`/products/${productId}`}>
        <div className="cursor-pointer relative space-y-3">
          {/* Client Component - Interactive Image Section */}
          <div className="relative w-full aspect-[3/4] overflow-hidden">
            <ProductCardInteractive
              productId={productId}
              productName={productName}
              images={imagesToShow}
              colors={colors}
              sizes={sizes}
              priority={priority}
              price={item.price}
              originalPrice={item.originalPrice}
              isOutOfStock={totalStock === 0}
            />
            {/* Out of Stock Overlay */}
            {totalStock === 0 && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                {/* <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" /> */}
                {/* <img
                  src="/out-of-stock.png"
                  alt="Out of Stock"
                  className="relative z-10 w-full max-w-[280px] object-contain opacity-90"
                /> */}
              </div>
            )}
          </div>

          {/* Server-Rendered Badges */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
            {/* New Arrival Badge */}
            {/* {index < 2 && (
              <div className="absolute top-0 right-0">
                <span className="relative bg-gradient-to-r from-[#7b1e28] via-[#8b2632] to-[#4a0f14] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                  NEW ARRIVAL
                </span>
              </div>
            )} */}

            {/* Discount Badge */}
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                {Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) *
                    100,
                )}
                % OFF
              </span>
            )}
          </div>

          {/* Server-Rendered Product Info */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                {productName}
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

          {/* Server-Rendered Stock Status */}
          <div className="flex items-center gap-1 text-xs">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${totalStock === 0 ? "bg-red-500" : "bg-green-500"}`} />
            <span className={totalStock === 0 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
              {totalStock === 0 ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          {/* Server-Rendered Colors & Sizes */}
          {(colorSwatches.length > 0 || sizes.length > 0) && (
            <div className="flex items-center justify-between gap-2 pt-0.5">
              {/* Colors - Left */}
              {colorSwatches.length > 0 ? (
                <div className="flex items-center gap-1" aria-label="Available colors">
                  {colorSwatches.slice(0, 5).map((color) => (
                    <span
                      key={color.name}
                      title={color.name}
                      aria-label={color.name}
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-1 ring-gray-200 ring-offset-1 flex-shrink-0"
                      style={{ backgroundColor: color.hexcode }}
                    />
                  ))}
                  {colorSwatches.length > 5 && (
                    <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                      +{colorSwatches.length - 5}
                    </span>
                  )}
                </div>
              ) : (
                <div />
              )}

              {/* Sizes - Right */}
              {sizes.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap justify-end" aria-label="Available sizes">
                  <span className="text-gray-600 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded">
                    Size :
                  </span>
                  {sizes.slice(0, 2).map((size, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-medium"
                    >
                      {size}
                    </span>
                  ))}
                  {sizes.length > 2 && (
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                      +{sizes.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
