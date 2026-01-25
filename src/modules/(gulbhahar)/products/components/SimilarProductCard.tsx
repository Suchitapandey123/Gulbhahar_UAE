import NextImage from "next/image";
import Link from "next/link";
import { SimilarProduct } from "../types";

interface SimilarProductCardProps {
  item: SimilarProduct;
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

  return (
    <div className="group w-full">
      <Link href={`/products/${item.productId}`} className="block">
        <div className="cursor-pointer relative space-y-3">
          {/* Image Container */}
          <div className="relative overflow-hidden w-full aspect-[3/4] bg-gray-100 rounded-lg">
            <NextImage
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={60}
              src={item.images?.[0]?.[0] || "/about/lal-ishq-1.jpg"}
              alt={item.name || "Product Image"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

            {/* Stock Tag */}
            {item.stock && item.stock <= 5 && item.stock > 0 && (
              <span
                className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded z-10 font-bold"
                style={{ backgroundColor: customRed }}
              >
                Only {item.stock} left!
              </span>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10 font-bold">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col px-2 py-2 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight uppercase">
                {item.name || "PRODUCT NAME"}
              </h3>
              <div className="text-right">
                <span
                  className="text-sm font-bold"
                  style={{ color: customRed }}
                >
                  ₹{item.price.toLocaleString()}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="text-xs text-gray-400 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <div className="text-xs">
              {item.stock && item.stock <= 5 && item.stock > 0 ? (
                <span className="font-medium" style={{ color: customRed }}>
                  {item.stock} left
                </span>
              ) : (
                <span className="text-green-600 font-medium">In Stock</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
