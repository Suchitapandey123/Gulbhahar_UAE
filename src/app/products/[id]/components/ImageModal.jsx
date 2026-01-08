import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';


const withVersion = (url, version) => {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}v=${version}`;
};


const ImageModal = ({
  isModalOpen,
  closeModal,
  currentImages,
  modalImageIndex,
  setModalImageIndex,
  currentMainImage,
  product,
  currentColor,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [thumbnailsLoading, setThumbnailsLoading] = useState(new Set());
  const [preloadedImages, setPreloadedImages] = useState(new Set());
  const modalRef = useRef(null);

  // Reset loading state when modal opens or image changes
  useEffect(() => {
    if (isModalOpen) {
      const currentImageUrl = currentImages[modalImageIndex] || currentMainImage;
      if (!preloadedImages.has(currentImageUrl)) {
        setImageLoading(true);
      } else {
        setImageLoading(false);
      }
    }
  }, [modalImageIndex, currentImages, currentMainImage, preloadedImages, isModalOpen]);


  const imageVersion =
    product?.updatedAt ||
    product?.modifiedAt ||
    product?.createdAt ||
    Date.now();

  // Handle thumbnail loading
  const handleThumbnailLoad = useCallback((index) => {
    setThumbnailsLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  }, []);

  const handleThumbnailLoadStart = useCallback((index) => {
    setThumbnailsLoading(prev => new Set([...prev, index]));
  }, []);

  // Navigation handlers
  const prevImage = useCallback(() => {
    const newIndex = modalImageIndex > 0 ? modalImageIndex - 1 : currentImages.length - 1;
    setModalImageIndex(newIndex);
  }, [modalImageIndex, currentImages.length, setModalImageIndex]);

  const nextImage = useCallback(() => {
    const newIndex = modalImageIndex < currentImages.length - 1 ? modalImageIndex + 1 : 0;
    setModalImageIndex(newIndex);
  }, [modalImageIndex, currentImages.length, setModalImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, prevImage, nextImage, closeModal]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative w-full h-full  flex items-start sm:items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation Buttons */}
        {currentImages.length > 1 && (
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

        {/* Main Modal Image Container */}
        <div className="relative max-w-xl sm:mt-0 mt-20   max-h-screen p-4">
          <div className="relative min-h-[400px] min-w-[300px] flex  ">
            {/* Loading Spinner */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
                <div className="flex flex-col items-center space-y-3">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <span className="text-white text-sm">Loading image...</span>
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className={`transition-opacity h-full w-full duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}>
              <Image
                src={withVersion(
                  currentImages[modalImageIndex] || currentMainImage,
                  imageVersion
                )}
                alt={`${product.name} - ${currentColor} - Image ${modalImageIndex + 1}`}
                className="max-w-full max-h-full object-contain select-none"
                width={1200}
                height={800}
                quality={75}
                loading="eager"
                onLoad={() => {
                  setImageLoading(false);
                  const currentUrl = currentImages[modalImageIndex] || currentMainImage;
                  setPreloadedImages(prev => new Set([...prev, currentUrl]));
                }}
                onLoadingComplete={() => {
                  setImageLoading(false);
                  const currentUrl = currentImages[modalImageIndex] || currentMainImage;
                  setPreloadedImages(prev => new Set([...prev, currentUrl]));
                }}
                onError={() => setImageLoading(false)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-white text-sm font-medium">
            {modalImageIndex + 1} / {currentImages.length}
          </span>
        </div>

        {/* Optimized Thumbnail Strip */}
        <div className="absolute bottom-16 left-1/2 py-1 transform -translate-x-1/2 flex gap-2 max-w-screen-sm overflow-x-auto px-4 scrollbar-hide">
          {currentImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setModalImageIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${modalImageIndex === idx
                ? "border-white shadow-lg scale-110"
                : "border-transparent opacity-70 hover:opacity-100"
                }`}
            >
              {/* Thumbnail Loading State */}
              {thumbnailsLoading.has(idx) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
              )}

              <Image
                 src={withVersion(img, imageVersion)}
                alt={`Thumbnail ${idx + 1}`}
                className={`object-cover w-full h-full transition-opacity duration-200 ${thumbnailsLoading.has(idx) ? 'opacity-0' : 'opacity-100'
                  }`}
                width={64}
                height={64}
                quality={60}
                priority
                onLoadingComplete={() => handleThumbnailLoad(idx)}
                onLoadStart={() => handleThumbnailLoadStart(idx)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </button>
          ))}
        </div>

        {/* Hidden preload images using Next.js Image for adjacent images */}
        {/* <div className="absolute -top-full opacity-0 pointer-events-none">
          {currentImages.map((img, idx) => {
            const isAdjacent = Math.abs(idx - modalImageIndex) <= 1 && idx !== modalImageIndex;
            return isAdjacent ? (
              <Image
                key={`preload-${idx}`}
                src={img}
                alt=""
                width={1200}
                height={800}
                quality={90}
                priority={true}
                onLoadingComplete={() => {
                  setPreloadedImages(prev => new Set([...prev, img]));
                }}
              />
            ) : null;
          })}
        </div> */}
      </div>
    </div>
  );
};

export default ImageModal;