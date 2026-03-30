"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ImageOff, ZoomIn } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "../types";
import { ProductImageItem, FALLBACK_LQIP } from "@/utils/productImageUtils";

interface ProductImageGridProps {
  product: Product;
  currentImages: ProductImageItem[];
  onImageClick: (index: number) => void;
}

// ─── Clean broken-image placeholder ──────────────────────────────────────────
const BrokenImage = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-2 select-none">
    <ImageOff className="w-8 h-8 text-gray-300" />
    <span className="text-xs text-gray-400">Image unavailable</span>
  </div>
);

// ─── Per-image component that handles loading / error / fade-in ───────────────
interface ProductImageProps {
  src: string;
  lqip?: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  quality: number;
  hoverScale?: boolean;
}

const ProductImage = ({
  src,
  lqip,
  alt,
  priority = false,
  sizes,
  quality,
  hoverScale = false,
}: ProductImageProps) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  if (!src || isError) return <BrokenImage />;

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      className={cn(
        "object-cover",
        hoverScale && "group-hover:scale-105 transition-transform duration-300"
      )}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={lqip || FALLBACK_LQIP}
      onError={() => setIsError(true)}
    />
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const ProductImageGrid = ({
  product,
  currentImages,
  onImageClick,
}: ProductImageGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-slide for mobile
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    if (currentImages.length <= 1) return;
    autoSlideTimer.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % currentImages.length);
    }, 3000);
  }, [currentImages.length]);

  const handleImageChange = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [startAutoSlide]);

  // Touch swipe
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
    if (Math.abs(touchStartX.current - touchEndX.current) > 10)
      isSwiping.current = true;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;
    if (diff > 0 && selectedIndex < currentImages.length - 1)
      handleImageChange(selectedIndex + 1);
    else if (diff < 0 && selectedIndex > 0)
      handleImageChange(selectedIndex - 1);
  };

  // Reset index on image set change (colour switch)
  useEffect(() => {
    setSelectedIndex(0);
  }, [currentImages]);

  return (
    <div className="w-full">
      {/* ── Mobile: single image + thumbnail strip ── */}
      <div className="flex flex-col gap-4 md:hidden">
        <div
          className="relative w-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer"
          style={{ aspectRatio: "3 / 4" }}
          onClick={() => {
            if (!isSwiping.current) onImageClick(selectedIndex);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ProductImage
            src={currentImages[selectedIndex]?.url ?? ""}
            lqip={currentImages[selectedIndex]?.lqip}
            alt={`${product.name} - View ${selectedIndex + 1}`}
            priority
            sizes="100vw"
            quality={75}
          />

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 z-10">
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </div>

          {/* Dot indicators */}
          {currentImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {currentImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageChange(idx);
                  }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    selectedIndex === idx
                      ? "bg-white w-3"
                      : "bg-white/50"
                  )}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="overflow-x-auto overflow-y-hidden py-2">
          <div className="flex gap-2 justify-start w-max px-1">
            {currentImages.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={cn(
                  "relative flex-shrink-0 w-14 h-[70px] rounded-md overflow-hidden bg-gray-100 transition-all duration-300 ease-out",
                  "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-1",
                  selectedIndex === index
                    ? "ring-2 ring-red-900 opacity-100"
                    : "opacity-60 hover:opacity-80"
                )}
                aria-label={`View image ${index + 1}`}
              >
                <ProductImage
                  src={img.url}
                  lqip={img.lqip}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  sizes="56px"
                  quality={60}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: 2×2 grid ── */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {currentImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer"
              style={{ aspectRatio: "3 / 4" }}
              onClick={() => onImageClick(idx)}
            >
              <ProductImage
                src={img.url}
                lqip={img.lqip}
                alt={`${product.name} - Image ${idx + 1}`}
                priority={idx === 0}
                sizes="(max-width: 1024px) 40vw, 30vw"
                quality={75}
                hoverScale
              />

              {/* Zoom hint on hover */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
