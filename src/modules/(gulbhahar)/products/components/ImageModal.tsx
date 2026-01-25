"use client";

import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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

const withVersion = (url: string, version: string | number) => {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${version}`;
};

export const ImageModal = ({
  isModalOpen,
  closeModal,
  currentImages = [],
  modalImageIndex = 0,
  setModalImageIndex,
  product,
  currentColor = "",
}: ImageModalProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState<Set<number>>(
    new Set(),
  );
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set(),
  );
  const modalRef = useRef<HTMLDivElement>(null);

  const images = currentImages || [];
  const safeModalIndex = Math.min(
    modalImageIndex,
    Math.max(0, images.length - 1),
  );

  useEffect(() => {
    if (isModalOpen && images.length > 0) {
      const currentImageUrl = images[safeModalIndex];
      if (!preloadedImages.has(currentImageUrl)) {
        setImageLoading(true);
      } else {
        setImageLoading(false);
      }
    }
  }, [safeModalIndex, images, preloadedImages, isModalOpen]);

  const imageVersion = product?.updatedAt || Date.now();

  const handleThumbnailLoad = useCallback((index: number) => {
    setThumbnailsLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  }, []);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    const newIndex =
      safeModalIndex > 0 ? safeModalIndex - 1 : images.length - 1;
    setModalImageIndex(newIndex);
  }, [safeModalIndex, images.length, setModalImageIndex]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    const newIndex =
      safeModalIndex < images.length - 1 ? safeModalIndex + 1 : 0;
    setModalImageIndex(newIndex);
  }, [safeModalIndex, images.length, setModalImageIndex]);

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

  if (!isModalOpen || images.length === 0) return null;

  const currentImageUrl = images[safeModalIndex] || "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative w-full h-full flex items-start sm:items-center justify-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        <div className="relative max-w-xl sm:mt-0 mt-20 max-h-screen p-4">
          <div className="relative min-h-[400px] min-w-[300px] flex">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <span className="text-white text-sm">Loading image...</span>
                </div>
              </div>
            )}

            <div
              className={`transition-opacity h-full w-full duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
            >
              <NextImage
                src={
                  currentImageUrl
                    ? withVersion(currentImageUrl, imageVersion)
                    : "/about/lal-ishq-1.jpg"
                }
                alt={`${product?.name || "Product"} - ${currentColor || ""} - Image ${safeModalIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none mx-auto"
                width={1200}
                height={800}
                quality={75}
                loading="eager"
                onLoad={() => {
                  setImageLoading(false);
                  if (currentImageUrl) {
                    setPreloadedImages(
                      (prev) => new Set([...prev, currentImageUrl]),
                    );
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {safeModalIndex + 1} / {images.length}
          </span>
        </div>

        <div className="absolute bottom-16 left-1/2 py-1 transform -translate-x-1/2 flex gap-2 max-w-screen-sm overflow-x-auto px-4 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setModalImageIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                safeModalIndex === idx
                  ? "border-white shadow-lg scale-110"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {thumbnailsLoading.has(idx) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
              )}
              <NextImage
                src={
                  img ? withVersion(img, imageVersion) : "/about/lal-ishq-1.jpg"
                }
                alt={`Thumbnail ${idx + 1}`}
                className={`object-cover w-full h-full transition-opacity duration-200 ${thumbnailsLoading.has(idx) ? "opacity-0" : "opacity-100"}`}
                width={64}
                height={64}
                quality={60}
                onLoad={() => handleThumbnailLoad(idx)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
