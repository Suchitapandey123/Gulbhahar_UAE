"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ZoomIn } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Product } from "../types";

interface ProductImageGridProps {
  product: Product;
  currentImages: string[];
  cacheVersion: string;
  onImageClick: (index: number) => void;
}

export const ProductImageGrid = ({
  product,
  currentImages,
  cacheVersion,
  onImageClick,
}: ProductImageGridProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  const getImageSrc = (img: string) =>
    img.startsWith("/") ? img : `${img}${cacheVersion}`;

  // Reset loading/opacity state when image loads or errors
  const handleImageLoad = () => {
    setIsLoading(false);
    setImageOpacity(1);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageOpacity(1);
  };

  // Auto-slide for mobile big image
  const autoSlideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    if (currentImages.length <= 1) return;

    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (selectedIndexRef.current + 1) % currentImages.length;
      setImageOpacity(0);
      setIsLoading(true);
      setTimeout(() => {
        setSelectedIndex(nextIndex);
      }, 150);
    }, 3000);
  }, [currentImages.length]);

  const handleImageChange = (index: number) => {
    if (index === selectedIndex) return;

    // Start transition - fade out
    setImageOpacity(0);
    setIsLoading(true);

    // Change image after fade out
    setTimeout(() => {
      setSelectedIndex(index);
    }, 150);

    // Reset auto-slide timer on manual interaction
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    };
  }, [startAutoSlide]);

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
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    if (diff > 10) isSwiping.current = true;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) < minSwipeDistance) return;

    if (diff > 0 && selectedIndex < currentImages.length - 1) {
      // Swipe left → next image
      handleImageChange(selectedIndex + 1);
    } else if (diff < 0 && selectedIndex > 0) {
      // Swipe right → previous image
      handleImageChange(selectedIndex - 1);
    }
  };

  // Reset selectedIndex when images change (e.g., color change)
  useEffect(() => {
    setSelectedIndex(0);
  }, [currentImages]);

  return (
    <div className="w-full">
      {/* Mobile Layout: Single image + thumbnails (below md) */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Main large image */}
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
          {/* Shimmer loading effect */}
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-gray-100">
              <div
                className="absolute inset-0 animate-shimmer"
                style={{
                  background:
                    "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
          )}

          {currentImages[selectedIndex] && (
            <NextImage
              src={getImageSrc(currentImages[selectedIndex])}
              alt={`${product.name} - View ${selectedIndex + 1}`}
              fill
              className="object-cover transition-opacity duration-300 ease-out"
              style={{ opacity: imageOpacity }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={75}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {/* Zoom Indicator */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-1.5 opacity-70">
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </div>
        </div>

        {/* Thumbnail gallery - horizontal scroll */}
        <div className="overflow-x-auto overflow-y-hidden py-2">
          <div className="flex gap-2 justify-start w-max px-1">
            {currentImages.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={cn(
                  "flex-shrink-0 w-14 h-[70px] rounded-md overflow-hidden transition-all duration-300 ease-out",
                  "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-1",
                  selectedIndex === index
                    ? "ring-2 ring-red-900 opacity-100"
                    : "opacity-60 hover:opacity-80"
                )}
                aria-label={`View image ${index + 1}`}
              >
                <NextImage
                  src={getImageSrc(img)}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={56}
                  height={70}
                  className="w-full h-full object-cover"
                  quality={60}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout: 2x2 Grid (md and above) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-3 lg:gap-4">
          {currentImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer group"
              style={{ aspectRatio: "3 / 4" }}
              onClick={() => onImageClick(idx)}
            >
              <NextImage
                src={getImageSrc(img)}
                alt={`${product.name} - Image ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 40vw, 30vw"
                priority={idx === 0}
                quality={75}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
