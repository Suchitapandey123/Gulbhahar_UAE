"use client";

import { useState, useEffect, useRef } from "react";
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

// ─── Broken-image placeholder ─────────────────────────────────────────────────
const BrokenImage = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-2 select-none">
    <ImageOff className="w-8 h-8 text-gray-300" />
    <span className="text-xs text-gray-400">Image unavailable</span>
  </div>
);

// ─── Per-image component ──────────────────────────────────────────────────────
interface ProductImageProps {
  src: string;
  lqip?: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  objectFit?: "cover" | "contain";
}

const ProductImage = ({
  src,
  lqip,
  alt,
  priority = false,
  sizes,
  objectFit = "cover",
}: ProductImageProps) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => { setIsError(false); }, [src]);

  if (!src || isError) return <BrokenImage />;

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      className={objectFit === "contain" ? "object-contain" : "object-cover"}
      sizes={sizes}
      unoptimized
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

  // ── Shared (mobile uses selectedIndex, desktop uses activeIndex) ─────────────
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Desktop refs ─────────────────────────────────────────────────────────────
  const imageStackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailListRef = useRef<HTMLDivElement>(null);

  // ── Mobile touch swipe ───────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const handleImageChange = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isSwiping.current = false;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    if (Math.abs(touchStartX.current - touchEndX.current) > 10) isSwiping.current = true;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;
    if (diff > 0 && selectedIndex < currentImages.length - 1) handleImageChange(selectedIndex + 1);
    else if (diff < 0 && selectedIndex > 0) handleImageChange(selectedIndex - 1);
  };

  // ── Reset on colour / image-set change ───────────────────────────────────────
  useEffect(() => {
    setSelectedIndex(0);
    setActiveIndex(0);
    // NOTE: do NOT clear imageStackRefs here — ref callbacks handle that
  }, [currentImages]);

  // ── Desktop: scroll-based active image tracking (rAF throttled) ─────────────
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const refs = imageStackRefs.current;
        if (refs.length) {
          let activeIdx = 0;
          for (let i = 0; i < refs.length; i++) {
            const el = refs[i];
            if (!el) continue;
            if (el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
              activeIdx = i;
            } else {
              break;
            }
          }
          setActiveIndex(prev => (prev === activeIdx ? prev : activeIdx));
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Desktop: keep active thumbnail visible in strip (container only, never window) ─────
  useEffect(() => {
    const container = thumbnailListRef.current;
    if (!container) return;
    const activeThumbnail = container.children[activeIndex] as HTMLElement | undefined;
    if (!activeThumbnail) return;
    const top = activeThumbnail.offsetTop;
    const bottom = top + (activeThumbnail as HTMLElement).offsetHeight;
    if (top < container.scrollTop) {
      container.scrollTop = top;
    } else if (bottom > container.scrollTop + container.clientHeight) {
      container.scrollTop = bottom - container.clientHeight;
    }
  }, [activeIndex]);

  // ── Desktop: thumbnail click → highlight immediately + smooth scroll ─────────
  const scrollToImage = (idx: number) => {
    setActiveIndex(idx);
    const el = imageStackRefs.current[idx];
    if (!el) return;
    const HEADER_OFFSET = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="w-full">

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE  (< md) — unchanged
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 md:hidden">
        <div
          className="relative w-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer"
          style={{ aspectRatio: "3 / 4" }}
          onClick={() => { if (!isSwiping.current) onImageClick(selectedIndex); }}
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
          />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-70 z-10">
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </div>
          {currentImages.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
              {currentImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); handleImageChange(idx); }}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    selectedIndex === idx ? "bg-white w-3" : "bg-white/50"
                  )}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="overflow-x-auto overflow-y-hidden py-2">
          <div className="flex gap-2 justify-start w-max px-1">
            {currentImages.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={cn(
                  "relative flex-shrink-0 w-14 h-[70px] rounded-md overflow-hidden bg-gray-100 transition-all duration-300 ease-out",
                  "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-1",
                  selectedIndex === index ? "ring-2 ring-red-900 opacity-100" : "opacity-60 hover:opacity-80"
                )}
                aria-label={`View image ${index + 1}`}
              >
                <ProductImage src={img.url} lqip={img.lqip} alt={`${product.name} thumbnail ${index + 1}`} sizes="56px" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TABLET  (md → lg) — 2×2 grid, unchanged
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          {currentImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer"
              style={{ aspectRatio: "3 / 4" }}
              onClick={() => onImageClick(idx)}
            >
              <ProductImage src={img.url} lqip={img.lqip} alt={`${product.name} - Image ${idx + 1}`} priority={idx < 2} sizes="40vw" />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP  (lg+) — Needledust layout
          ┌────────────┐   ┌──────────────────────────────┐
          │  Sticky    │   │  Vertical image stack        │
          │  thumbnail │   │  (scrolls with the page)     │
          │  rail      │   │                              │
          │  88px      │   │  Image 1                     │
          │            │   │  Image 2                     │
          │  Tracks    │   │  Image 3  …                  │
          │  scroll    │   │                              │
          └────────────┘   └──────────────────────────────┘
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-start" style={{ gap: "24px" }}>

        {/* ── Sticky thumbnail rail ── */}
        <div className="sticky top-20 self-start flex-shrink-0" style={{ width: "88px" }}>
          <div
            ref={thumbnailListRef}
            className="flex flex-col gap-2 overflow-y-auto"
            style={{
              maxHeight: "calc(100vh - 100px)",
              scrollbarWidth: "none",       // Firefox
              msOverflowStyle: "none",      // IE/Edge
            }}
          >
            {currentImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => scrollToImage(idx)}
                className={cn(
                  "relative flex-shrink-0 w-full overflow-hidden bg-gray-50 focus:outline-none",
                  "transition-all duration-300 cursor-pointer",
                  activeIndex === idx
                    ? "opacity-100 ring-[1.5px] ring-gray-800 scale-100"
                    : "opacity-30 blur-[0.6px] hover:opacity-60 hover:blur-none"
                )}
                style={{ aspectRatio: "3 / 4" }}
                aria-label={`Jump to image ${idx + 1}`}
              >
                <ProductImage
                  src={img.url}
                  lqip={img.lqip}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  sizes="88px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ── Vertical image stack (scrolls with page) ── */}
        <div className="flex-1 flex flex-col gap-3">
          {currentImages.map((img, idx) => (
            <div
              key={idx}
              ref={(el) => { imageStackRefs.current[idx] = el; }}
              className="relative w-full overflow-hidden bg-white cursor-zoom-in"
              style={{ aspectRatio: "3 / 4" }}
              onClick={() => onImageClick(idx)}
            >
              <ProductImage
                src={img.url}
                lqip={img.lqip}
                alt={`${product.name} — View ${idx + 1}`}
                priority={idx === 0}
                sizes="(max-width: 1400px) 50vw, 720px"
                objectFit="contain"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
