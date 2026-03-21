// @ts-nocheck
"use client";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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
  images?: string | string[] | string[][];
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
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const { addToCart, addingToCart } = useCart();

  const rawImages = item.images || item.image;
  const imagesArr = Array.isArray(rawImages) ? rawImages : [rawImages];
  const imagesToShow: string[] = Array.isArray(imagesArr[0])
    ? (imagesArr[0] as string[])
    : (imagesArr as string[]);

  // Support both old format (sizes: string[]) and new format (availableSizes: {name: string}[])
  const sizes: string[] =
    item.sizes || item.availableSizes?.map((s) => s.name) || [];
  const colors: string[] =
    item.colors || item.availableColors?.map((c) => c.name) || [];

  const handleMouseEnter = () => {
    if (imagesToShow.length <= 1) return;

    clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    slideIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imagesToShow.length);
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    setCurrentImageIndex(0);
  };

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    if (Math.abs(touchStartX.current - touchEndX.current) > 10) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    if (imagesToShow.length <= 1) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 30;

    if (Math.abs(diff) < minSwipeDistance) return;

    if (diff > 0) {
      // Swipe left → next image
      setCurrentImageIndex((prev) => (prev + 1) % imagesToShow.length);
    } else {
      // Swipe right → previous image
      setCurrentImageIndex(
        (prev) => (prev - 1 + imagesToShow.length) % imagesToShow.length,
      );
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (isSwiping.current) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    };
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Auto-select first available options (same as old Collection.jsx)
      const selectedColor = colors.length > 0 ? colors[0] : "default";
      const selectedSize = sizes.length > 0 ? sizes[0] : "default";

      const cartItemWithVariants = {
        ...item,
        id: item.productId || item.id,
        productId: item.productId || item.id,
        selectedColor,
        selectedSize,
        colors,
        sizes,
      };

      const result = await addToCart(cartItemWithVariants);

      if (result.success) {
        toast.success(
          `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`,
        );
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  const isAddingThis = addingToCart === (item.productId || item.id);

  return (
    <div className="group w-full">
      <Link
        href={`/products/${item.productId || item.id}`}
        onClick={handleLinkClick}
      >
        <div
          className="cursor-pointer relative space-y-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image Section */}
          <div
            className="relative overflow-hidden w-full aspect-[3/4]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative w-full h-full bg-gray-100">
              {/* Skeleton pulse — shows until current image is loaded */}
              {!loadedImages.has(currentImageIndex) && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-[1]" />
              )}

              {imagesToShow.map((image, idx) => (
                <Image
                  key={idx}
                  src={image || "/about/lal-ishq-1.jpg"}
                  alt={`${item.name || item.title || "Product"} - ${idx + 1}`}
                  fill
                  priority={priority && idx === 0}
                  loading={priority && idx === 0 ? undefined : "lazy"}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={95}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onLoad={() =>
                    setLoadedImages((prev) => {
                      const next = new Set(prev);
                      next.add(idx);
                      return next;
                    })
                  }
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out md:group-hover:scale-110 transition-transform ${
                    currentImageIndex === idx && loadedImages.has(idx)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
              ))}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-10 transition-opacity duration-300" />
            </div>

            {/* Indicators */}
            {imagesToShow.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
                {imagesToShow.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === idx
                        ? "bg-red-900 w-3"
                        : "bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* New Arrival Badge */}
            {index < 2 && (
              <div className="absolute top-0 right-0 z-10">
                <span className="relative bg-gradient-to-r from-[#7b1e28] via-[#8b2632] to-[#4a0f14] text-white text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                  NEW ARRIVAL
                </span>
              </div>
            )}

            {/* Discount Badge */}
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                {Math.round(
                  ((item.originalPrice - item.price) / item.originalPrice) *
                    100,
                )}
                % OFF
              </span>
            )}

            {/* Add to Cart Button - Desktop Hover Only */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-10">
              <button
                onClick={handleAddToCart}
                disabled={isAddingThis}
                className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isAddingThis ? (
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
          </div>

          {/* Product Info */}
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

          {/* Stock Status */}
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

          {/* Sizes */}
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
