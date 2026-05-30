// @ts-nocheck
// Server Component
import { getFirstProductImage, getProductImagesForColor, FALLBACK_LQIP } from "@/utils/productImageUtils";
import Link from "next/link";
import { Product } from "../types";
import SimilarProductCardInteractive from "./SimilarProductCardInteractive";

interface SimilarProductCardProps {
  item: Product;
  customRed: string;
}

export const SimilarProductCard = ({
  item,
  customRed,
}: SimilarProductCardProps) => {
  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100,
        )
      : 0;

  const sizes: string[] =
    (item as any).sizes || item.availableSizes?.map((s: any) => s.name) || [];
  
  // Convert colors to string array - handle both string[] and object[] formats
  const colors: any[] = (() => {
    const ac = item.availableColors;
    const c = (item as any).colors;
    // availableColors has hexcodes needed for swatches; colors may be string-only names
    if (Array.isArray(ac) && ac.length > 0) return ac;
    if (Array.isArray(c) && c.length > 0) return c;
    return [];
  })();

  const primaryImage = getFirstProductImage(item.productId, item.images);
  const colorImages = getProductImagesForColor(item.productId, item.images, 0);
  // Primary image always first, remaining images follow
  const imagesToShow = [
    { url: primaryImage.url, lqip: primaryImage.lqip || FALLBACK_LQIP },
    ...colorImages.slice(1).map((img) => ({ url: img.url, lqip: img.lqip || FALLBACK_LQIP })),
  ];

  const productName = item.name || "Product";
  const productId = item.productId || (item as any).id;

  return (
    <article
      className="group w-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      <Link
        href={`/products/${productId}`}
        className="block"
        title={productName}
      >
        <div className="cursor-pointer relative">
          {/* Client Component - Interactive Image Section */}
          <SimilarProductCardInteractive
            productId={productId}
            productName={productName}
            images={imagesToShow}
            colors={colors}
            sizes={sizes}
            item={item}
          />

          {/* Server-Rendered Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded z-10">
              {discount}% OFF
            </span>
          )}

          {/* Server-Rendered Product Info */}
          <div className="pt-3 pb-1 px-1 space-y-2">
            {/* Name & Price */}
            <div className="flex items-start justify-between gap-2">
              <h3
                className="text-[11px] sm:text-sm font-semibold text-gray-900 line-clamp-1 leading-tight uppercase tracking-wide flex-1 min-w-0"
                itemProp="name"
              >
                {productName}
              </h3>
              <div
                className="flex flex-col items-end flex-shrink-0"
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content="INR" />
                <meta itemProp="price" content={String(item.price)} />
                <meta
                  itemProp="availability"
                  content="https://schema.org/InStock"
                />
                <span
                  className="text-sm sm:text-base font-bold"
                  style={{ color: customRed }}
                >
                  ₹{item.price.toLocaleString()}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Stock Status */}
            {(() => {
              const totalStock = Array.isArray(item.inventory)
                ? item.inventory.reduce((sum: number, v: { quantity: number }) => sum + (v.quantity ?? 0), 0)
                : 0;
              return (
                <div className="flex items-center gap-1 text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${totalStock === 0 ? "bg-red-500" : "bg-green-500"}`} />
                  <span className={totalStock === 0 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                    {totalStock === 0 ? "Out of Stock" : "In Stock"}
                  </span>
                </div>
              );
            })()}

            {/* Colors & Sizes */}
            {(colors.length > 0 || sizes.length > 0) && (
              <div className="flex items-center justify-between gap-2 pt-0.5">
                {/* Colors - Left */}
                {colors.length > 0 ? (
                  <div
                    className="flex items-center gap-1.5"
                    aria-label="Available colors"
                  >
                    {colors.slice(0, 5).map((color: any, index: number) => (
                      <span
                        key={typeof color === "string" ? color : color.name}
                        title={typeof color === "string" ? color : color.name}
                        aria-label={
                          typeof color === "string" ? color : color.name
                        }
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-1 ring-gray-200 ring-offset-1"
                        style={{
                          backgroundColor:
                            typeof color === "string" ? color : color.hexcode,
                        }}
                      />
                    ))}
                    {colors.length > 5 && (
                      <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                        +{colors.length - 5}
                      </span>
                    )}
                  </div>
                ) : (
                  <div />
                )}

                {/* Sizes - Right */}
                {sizes.length > 0 && (
                  <div
                    className="flex items-center gap-1 flex-wrap justify-end"
                    aria-label="Available sizes"
                  >
                    <span className="text-gray-600 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded">
                      Size :
                    </span>
                    {sizes.slice(0, 3).map((size: string) => (
                      <span
                        key={size}
                        className="bg-gray-100 text-gray-600 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded"
                      >
                        {size}
                      </span>
                    ))}
                    {sizes.length > 3 && (
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                        +{sizes.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hidden image URL for schema */}
          {imagesToShow[0] && (
            <meta itemProp="image" content={imagesToShow[0].url} />
          )}
        </div>
      </Link>
    </article>
  );
};
