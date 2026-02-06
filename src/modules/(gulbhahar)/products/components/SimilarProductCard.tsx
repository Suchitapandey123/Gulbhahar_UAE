import Image from "next/image";
import Link from "next/link";
import { Product } from "../types";
import { ImageSlider } from "./ImageSlider";

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

  const sizes = item.availableSizes?.map((s) => s.name) || [];
  const colors = item.availableColors || [];

  const imagesToShow: string[] = Array.isArray(item.images?.[0])
    ? (item.images[0] as string[])
    : item.images?.[0]
      ? [item.images[0] as string]
      : [];

  const productName = item.name || "Product";

  return (
    <article className="group w-full" itemScope itemType="https://schema.org/Product">
      <Link
        href={`/products/${item.productId}`}
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
                src={imagesToShow[0] || "/about/lal-ishq-1.jpg"}
                alt={productName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
              <div className="flex flex-col items-end flex-shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="INR" />
                <meta itemProp="price" content={String(item.price)} />
                <meta itemProp="availability" content="https://schema.org/InStock" />
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
                  <div className="flex items-center gap-1.5" aria-label="Available colors">
                    {colors.slice(0, 5).map((color) => (
                      <span
                        key={color.name}
                        title={color.name}
                        aria-label={color.name}
                        className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full ring-1 ring-gray-200 ring-offset-1"
                        style={{ backgroundColor: color.hexcode }}
                      />
                    ))}
                    {colors.length > 5 && (
                      <span className="text-[10px] text-gray-400 font-medium ml-0.5">
                        +{colors.length - 5}
                      </span>
                    )}
                  </div>
                ) : <div />}

                {/* Sizes - Right */}
                {sizes.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap justify-end" aria-label="Available sizes">
                    <span className="text-gray-600 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded">
                      Size :
                    </span>
                    {sizes.slice(0, 3).map((size) => (
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
            <meta itemProp="image" content={imagesToShow[0]} />
          )}
        </div>
      </Link>
    </article>
  );
};
