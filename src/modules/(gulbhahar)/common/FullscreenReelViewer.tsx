"use client";

import { ChevronLeft, ChevronRight, Loader2, Ruler, ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface FullscreenReel {
  videoUrl: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
}

interface ColorOption {
  name: string;
  hexcode: string;
}

interface SizeRangeItem {
  size: string;
  available: boolean;
  quantity: number;
}

interface FullscreenReelViewerProps {
  reels: FullscreenReel[];
  initialIndex: number;
  onClose: () => void;
  // Shopping props — only provided when these reels belong to a product
  showCart?: boolean;
  availableColors?: ColorOption[];
  selectedColorIndex?: number;
  setSelectedColorIndex?: (index: number) => void;
  sizeRange?: SizeRangeItem[];
  selectedSize?: string;
  setSelectedSize?: (size: string) => void;
  customRed?: string;
  onAddToCart?: () => void;
  addingToCart?: boolean;
  isOutOfStock?: boolean;
}

export default function FullscreenReelViewer({
  reels,
  initialIndex,
  onClose,
  showCart,
  availableColors = [],
  selectedColorIndex = 0,
  setSelectedColorIndex,
  sizeRange = [],
  selectedSize,
  setSelectedSize,
  customRed = "#800000",
  onAddToCart,
  addingToCart,
  isOutOfStock,
}: FullscreenReelViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
  const [showVariantPicker, setShowVariantPicker] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const currentReel = reels[currentIndex];

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < reels.length) {
        setCurrentIndex(index);
      }
    },
    [reels.length],
  );

  // Auto-play video when reel changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
  }, [currentIndex]);

  // Restore scroll position on close — avoid body overflow lock, which toggles
  // the scrollbar and shifts viewport width across md/lg breakpoints, breaking
  // the page grid layout when the viewer closes.
  useEffect(() => {
    const savedScrollY = window.scrollY;
    return () => {
      window.scrollTo({ top: savedScrollY, behavior: "instant" });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(currentIndex - 1);
      if (e.key === "ArrowRight") goTo(currentIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, onClose, goTo]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      goTo(currentIndex + 1);
    } else {
      goTo(currentIndex - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[101] bg-black/90 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-md rounded-full p-2.5 text-white border border-white/30"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Desktop arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {currentIndex < reels.length - 1 && (
        <button
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Video container - 9:16 fitted to screen */}
      <div
        className="relative mx-auto rounded-xl overflow-hidden"
        style={{
          aspectRatio: "9 / 16",
          height: "calc(100dvh - 80px)",
          maxHeight: "calc(100dvh - 80px)",
          maxWidth: "calc((100dvh - 80px) * 9 / 16)",
          width: "100%",
        }}
      >
        <video
          ref={videoRef}
          src={currentReel.videoUrl}
          poster={currentReel.thumbnailUrl}
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
          preload="auto"
          onClick={() => setIsMuted((m) => !m)}
        />

        {/* Bottom info — hide generic "Video N" titles */}
        {currentReel.title && !/^video[\s\-_]?\d+$/i.test(currentReel.title.trim()) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
            <h3 className="text-white font-semibold text-base">
              {currentReel.title}
            </h3>
            {currentReel.description && (
              <p className="text-white/70 text-sm mt-1">
                {currentReel.description}
              </p>
            )}
          </div>
        )}

        {/* Quick add to cart — pinned to the video's own corner */}
        {showCart && onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowVariantPicker(true);
            }}
            className="absolute bottom-4 right-4 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-medium shadow-lg transition-all active:scale-95"
            style={{ backgroundColor: customRed }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        )}
      </div>

      {/* Progress dots */}
      {reels.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
          {reels.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Variant picker sheet */}
      {showVariantPicker && (
        <div
          className="absolute inset-0 z-[110] flex items-end justify-center"
          onClick={() => setShowVariantPicker(false)}
        >
          <div className="absolute inset-0 bg-black/50 animate-in fade-in" />
          <div
            className="relative w-full max-w-md bg-white rounded-t-2xl p-4 pb-6 space-y-5 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Select Options</h3>
              <button
                onClick={() => setShowVariantPicker(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Color selection */}
            {availableColors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Color:</h4>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIndex?.(idx)}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-all capitalize border ${
                        selectedColorIndex === idx
                          ? "text-white font-semibold shadow-md border-transparent"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                      }`}
                      style={selectedColorIndex === idx ? { backgroundColor: customRed } : {}}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hexcode }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {sizeRange.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Ruler className="w-4 h-4" /> Size:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sizeRange.map(({ size, available }) => (
                    <button
                      key={size}
                      onClick={() => available && setSelectedSize?.(size)}
                      disabled={!available}
                      className={`px-3.5 py-2 text-sm border rounded transition-all font-medium ${
                        selectedSize === size && available
                          ? "text-white border-transparent"
                          : available
                            ? "border-gray-300 hover:border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                      }`}
                      style={selectedSize === size && available ? { backgroundColor: customRed, borderColor: customRed } : {}}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                onAddToCart?.();
                setShowVariantPicker(false);
              }}
              disabled={addingToCart || !selectedSize || isOutOfStock}
              className={`w-full py-3 text-white rounded-lg font-medium text-base transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                addingToCart || !selectedSize || isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
              style={{ backgroundColor: customRed }}
            >
              {isOutOfStock ? (
                "OUT OF STOCK"
              ) : addingToCart ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding...
                </>
              ) : !selectedSize ? (
                "SELECT SIZE"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
