// @ts-nocheck
"use client";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { ProductImageItem } from "@/utils/productImageUtils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ProductCardInteractiveProps {
  productId: string;
  productName: string;
  images: ProductImageItem[];
  colors: string[];
  sizes: string[];
  priority?: boolean;
  price?: number;
  originalPrice?: number;
  isOutOfStock?: boolean;
}

export default function ProductCardInteractive({
  productId,
  productName,
  images,
  colors,
  sizes,
  priority = false,
  price,
  originalPrice,
  isOutOfStock = false,
}: ProductCardInteractiveProps) {
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, addingToCart } = useCart();

  const handleMouseEnter = () => {
    if (images.length <= 1) return;

    clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    slideIntervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
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
    if (images.length <= 1) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 30;

    if (Math.abs(diff) < minSwipeDistance) return;

    if (diff > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
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

    if (isOutOfStock) return;

    try {
      const selectedColor = colors.length > 0 ? colors[0] : "default";
      const selectedSize = sizes.length > 0 ? sizes[0] : "default";

      // Ensure colors and sizes are string arrays for cart
      const colorStrings = colors.map(c => typeof c === 'string' ? c : c.name || c);
      const sizeStrings = sizes.map(s => typeof s === 'string' ? s : s.name || s);

      const cartItemWithVariants = {
        id: productId,
        productId,
        name: productName,
        price,
        originalPrice,
        image: images?.[0]?.url,
        selectedColor,
        selectedSize,
        colors: colorStrings,
        sizes: sizeStrings,
      };

      const result = await addToCart(cartItemWithVariants);

      if (result.success) {
        toast.success(
          `${productName} (${selectedSize}, ${selectedColor}) added to cart!`,
        );
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  const isAddingThis = addingToCart === productId;

  return (
    <>
      {/* Image Section with Interactions */}
      <div
        className="relative overflow-hidden w-full aspect-[3/4]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full bg-gray-100">
          {images.map((image, idx) => {
            const isVisible = idx === currentImageIndex;
            const isNext = idx === (currentImageIndex + 1) % images.length;
            // Only render current + next image to reduce DOM/network requests
            if (!isVisible && !isNext && idx !== 0) return null;
            return (
              <Image
                key={idx}
                src={image.url}
                alt={`${productName} - ${idx + 1}`}
                fill
                priority={priority && idx === 0}
                loading={priority && idx === 0 ? undefined : "lazy"}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
                placeholder="blur"
                blurDataURL={image.lqip}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            );
          })}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, idx) => (
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

        {/* Add to Cart Button - Desktop Hover Only */}
        {!isOutOfStock && (
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
        )}
      </div>
    </>
  );
}
