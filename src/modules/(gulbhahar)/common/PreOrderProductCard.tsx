"use client";
import { PreOrderProductData } from "@/services/preOrder/preOrderTypes";
import { ProductImageItem } from "@/utils/productImageUtils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FALLBACK_LQIP } from "@/utils/productImageUtils";
import { ImageSlider } from "../products/components/ImageSlider";

interface PreOrderProductCardProps {
  item: PreOrderProductData;
  customRed: string;
}

export const PreOrderProductCard = ({
  item,
  customRed,
}: PreOrderProductCardProps) => {
  const router = useRouter();

  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100,
        )
      : 0;

  const sizes: string[] =
    (item as any).sizes || item.availableSizes?.map((s: any) => s.name) || [];
  const colors: any[] = (item as any).colors || item.availableColors || [];
  
  // Handle nested array structure from API: [["url1"], ["url2"]] or ["url1", "url2"]
  const imagesToShow: ProductImageItem[] = (() => {
    if (!item.images || !Array.isArray(item.images)) return [];
    const flatImages = item.images.flat().filter(Boolean);
    return flatImages.map((url) => ({ url: url as string, lqip: FALLBACK_LQIP }));
  })();
  
  const productName = item.name || "Product";

  const handlePreOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Save product data so pre-order page can use it without a separate API call
    sessionStorage.setItem(`preorder_${item.productId}`, JSON.stringify(item));
    router.push(`/pre-order/${item.productId}`);
  };

  return (
    <article
      className="group w-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div
        className="block"
        title={productName}
      >
        <div className="cursor-pointer relative">
          {/* Image Container */}
          <div className="relative overflow-hidden w-full aspect-[3/4] bg-gray-50">
            {imagesToShow.length > 1 ? (
              <ImageSlider images={imagesToShow} alt={productName} />
            ) : (
              <Image
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={60}
                src={imagesToShow[0]?.url || ""}
                alt={productName}
                placeholder="blur"
                blurDataURL={imagesToShow[0]?.lqip || FALLBACK_LQIP}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
              />
            )}

            {/* Hover Overlay (static images only) */}
            {imagesToShow.length <= 1 && (
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded z-10">
                {discount}% OFF
              </span>
            )}

            {/* Pre Order Button - Desktop Hover Only */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-10">
              <button
                onClick={handlePreOrder}
                className="w-full text-sm font-semibold flex items-center justify-center gap-2 "
              >
                <ShoppingBag size={16} />
                <span>Pre Order</span>
              </button>
            </div>
            {/* Pre Order Button - Mobile Always Visible (bottom of image) */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-red-900/90 text-white text-center py-1.5 z-10">
              <button
                onClick={handlePreOrder}
                className="w-full text-[10px] font-bold flex items-center justify-center gap-1"
              >
                <ShoppingBag size={12} />
                <span>PRE ORDER</span>
              </button>
            </div>
          </div>

          {/* Product Info — server-rendered for SEO */}
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

            {/* Colors & Sizes */}
            {(colors.length > 0 || sizes.length > 0) && (
              <div className="flex items-center justify-between gap-2 pt-0.5">
                {/* Colors - Left */}
                {colors.length > 0 ? (
                  <div
                    className="flex items-center gap-1.5"
                    aria-label="Available colors"
                  >
                    {colors.slice(0, 5).map((color: any) => (
                      <span
                        key={typeof color === "string" ? color : color.name}
                        title={typeof color === "string" ? color : color.name}
                        aria-label={
                          typeof color === "string" ? color : color.name
                        }
                        className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full ring-1 ring-gray-200 ring-offset-1"
                        style={{
                          backgroundColor:
                            typeof color === "string" ? color : (color.hexcode || color.hexCode),
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
      </div>
    </article>
  );
};
