"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import NextImage from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../types";

interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  currentImages: string[];
  modalImageIndex: number;
  setModalImageIndex: (index: number) => void;
  product: Product;
  currentColor?: string;
}

export const ImageModal = ({
  isModalOpen,
  closeModal,
  currentImages = [],
  modalImageIndex = 0,
  setModalImageIndex,
  product,
}: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const images = currentImages || [];
  const safeIndex = Math.min(modalImageIndex, Math.max(0, images.length - 1));
  const currentImageUrl = images[safeIndex] || "";
  const cacheVersion = product?.updatedAt ? `?v=${product.updatedAt}` : "";

  const getImageSrc = (img: string) =>
    img.startsWith("/") ? img : `${img}${cacheVersion}`;

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setModalImageIndex(safeIndex > 0 ? safeIndex - 1 : images.length - 1);
  }, [safeIndex, images.length, setModalImageIndex]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setModalImageIndex(safeIndex < images.length - 1 ? safeIndex + 1 : 0);
  }, [safeIndex, images.length, setModalImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prevImage, nextImage, closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
  }, [safeIndex]);

  if (!isModalOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-3 md:p-4">
        <span className="text-white text-sm md:text-base font-medium">
          {safeIndex + 1} / {images.length}
        </span>
        <button
          onClick={closeModal}
          className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center active:bg-gray-200"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center min-h-0">
        {/* Navigation arrows - visible on all screens */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg active:bg-gray-200 hover:bg-gray-100"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg active:bg-gray-200 hover:bg-gray-100"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setModalImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  safeIndex === idx ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Image */}
        <div className="relative w-full h-full">
          <NextImage
            src={getImageSrc(currentImageUrl)}
            alt={`${product?.name || "Product"} - Image ${safeIndex + 1}`}
            fill
            className={`object-contain transition-opacity duration-200 ${isLoading ? "opacity-0" : "opacity-100"}`}
            sizes="100vw"
            unoptimized
            priority
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Thumbnails - only on desktop */}
      {images.length > 1 && (
        <div className="flex-shrink-0 hidden md:block py-4 px-4 bg-black/80">
          <div className="flex gap-2 justify-center overflow-x-auto max-w-2xl mx-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setModalImageIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  safeIndex === idx
                    ? "border-white opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <NextImage
                  src={getImageSrc(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  quality={60}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
