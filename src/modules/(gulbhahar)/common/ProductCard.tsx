// @ts-nocheck
// Server Component - No "use client" directive
import { ProductImages } from "@/types";
import { getProductImages } from "@/utils/productImageUtils";
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
  const imagesToShow = getProductImages(item.productId, item.images as ProductImages[]);

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

  const productId = item.productId || item.id || "";
  const productName = item.name?.toUpperCase() || "PRODUCT NAME";

  return (
    <div className="group w-full">
      <Link href={`/products/${productId}`}>
        <div className="cursor-pointer relative space-y-3">
          {/* Client Component - Interactive Image Section */}
          <ProductCardInteractive
            productId={productId}
            productName={productName}
            images={imagesToShow}
            colors={colors}
            sizes={sizes}
            priority={priority}
            item={item}
          />

          {/* Server-Rendered Badges */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
            {/* New Arrival Badge */}
            {index < 2 && (
              <div className="absolute top-0 right-0">
                <span className="relative bg-gradient-to-r from-[#7b1e28] via-[#8b2632] to-[#4a0f14] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                  NEW ARRIVAL
                </span>
              </div>
            )}

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

          {/* Server-Rendered Sizes */}
          {sizes.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span className="text-gray-500">Size:</span>
              <div className="flex gap-1">
                {sizes.slice(0, 2).map((size, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium"
                  >
                    {size}
                  </span>
                ))}
                {sizes.length > 2 && (
                  <span className="text-gray-500">+{sizes.length - 2}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
