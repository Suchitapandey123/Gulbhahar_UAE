"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import FullscreenReelViewer from "../../common/FullscreenReelViewer";
import { VideosOption } from "../types";

export interface ReelData {
  videoUrl: string;
  posterUrl: string;
  title: string;
  description?: string;
}

interface ProductReelsProps {
  videos: VideosOption[][];
  selectedColorIndex?: number;
  onAddToCart?: () => void;
  addingToCart?: boolean;
  isOutOfStock?: boolean;
  selectedSize?: string;
  customRed?: string;
  availableColors?: { name: string; hexcode: string }[];
  setSelectedColorIndex?: (index: number) => void;
  sizeRange?: { size: string; available: boolean; quantity: number }[];
  setSelectedSize?: (size: string) => void;
}

const PRODUCT_REELS: ReelData[] = [
  {
    videoUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/11.mp4",
    posterUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
    title: "Handcrafted with Love",
  },
  {
    videoUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/14.mp4",
    posterUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
    title: "The Art of Embroidery",
  },
  {
    videoUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/13.mp4",
    posterUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
    title: "Colors of Heritage",
  },
  {
    videoUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/12.mp4",
    posterUrl: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/juttis.webp",
    title: "From Artisan to You",
  },
];

/* ─── Single video card ─────────────────────────────────────────────── */
function StackedCard({
  reel,
  isActive,
  preload,
  onClick,
}: {
  reel: ReelData;
  isActive: boolean;
  preload: boolean;
  onClick?: () => void;
}) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !preload) return;
    if (!v.src) { v.src = reel.videoUrl; v.load(); }
    const onData = () => setReady(true);
    v.addEventListener("loadeddata", onData);
    return () => v.removeEventListener("loadeddata", onData);
  }, [preload, reel.videoUrl]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else          v.pause();
  }, [isActive]);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl bg-stone-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Poster */}
      {reel.posterUrl && (
        <img
          src={reel.posterUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${ready ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
      )}

      {/* Video */}
      <video
        ref={videoRef}
        muted loop playsInline preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />

      {/* Bottom gradient + title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {reel.title && !/^video[\s\-_]?\d+$/i.test(reel.title.trim()) && (
        <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium drop-shadow z-10 pointer-events-none line-clamp-2">
          {reel.title}
        </p>
      )}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
export default function ProductReels({
  videos,
  selectedColorIndex = 0,
  onAddToCart,
  addingToCart,
  isOutOfStock,
  selectedSize,
  customRed,
  availableColors,
  setSelectedColorIndex,
  sizeRange,
  setSelectedSize,
}: ProductReelsProps) {
  const colorVideos    = (videos?.[selectedColorIndex] ?? []).filter(Boolean);
  const reels          = colorVideos.length > 0 ? colorVideos : PRODUCT_REELS;
  const isProductReels = colorVideos.length > 0;

  const [activeIndex,     setActiveIndex]     = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [animating,       setAnimating]       = useState(false);

  const nextIndex = (activeIndex + 1) % reels.length;
  const hasNext   = reels.length > 1;

  const goNext = useCallback(() => {
    if (animating || !hasNext) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % reels.length);
      setAnimating(false);
    }, 320);
  }, [animating, hasNext, reels.length]);

  return (
    <section className="mt-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[#800000]/40" />
        <span className="text-[#800000] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
          Watch More
        </span>
        <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[#800000]/40" />
      </div>

      {/*
        ┌───────────────────────────────────────────┐
        │  Active card (z-20)   │  Next peek (z-10) │
        │  60% width            │  ~40% peeking     │
        └───────────────────────────────────────────┘
        Both cards are the same height.
        The arrow sits centered vertically over the overlap.
      */}
      <div
        className="relative mx-auto select-none"
        style={{ maxWidth: 520, aspectRatio: "9/16", maxHeight: "72vh" }}
      >
        {/* ── Next card — sits BEHIND at same height, offset right ── */}
        {hasNext && (
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: "62%",       // starts where active card ends ~60%
              right: "-2%",      // bleeds slightly off container
              zIndex: 10,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "-8px 0 24px rgba(0,0,0,0.18)",
              transform: `scale(${animating ? 1.02 : 0.97})`,
              transition: "transform 0.32s ease",
            }}
          >
            <StackedCard
              reel={reels[nextIndex]}
              isActive={false}
              preload={true}
              onClick={goNext}
            />
            {/* dim overlay so active card stays in focus */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-2xl" />
          </div>
        )}

        {/* ── Active card — on top ── */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: 0,
            width: "65%",
            zIndex: 20,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "6px 0 32px rgba(0,0,0,0.28)",
            transform: `translateX(${animating ? "-4px" : "0px"})`,
            transition: "transform 0.32s ease",
          }}
        >
          <StackedCard
            reel={reels[activeIndex]}
            isActive={true}
            preload={true}
            onClick={() => setFullscreenIndex(activeIndex)}
          />
        </div>

        {/* ── Arrow — centered vertically over the overlap (at ~65% left) ── */}
        {hasNext && (
          <button
            onClick={goNext}
            aria-label="Next reel"
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
            style={{
              left: "calc(65% - 18px)",   // centred on the seam
              width: 36,
              height: 36,
              zIndex: 30,
            }}
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        )}

        {/* ── Dot indicators ── */}
        {reels.length > 1 && (
          <div
            className="absolute bottom-3 flex gap-1.5"
            style={{ left: "4%", zIndex: 30 }}
          >
            {reels.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width:  i === activeIndex ? 18 : 6,
                  height: 6,
                  background: i === activeIndex ? "#fff" : "rgba(255,255,255,0.45)",
                }}
                aria-label={`Go to reel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen viewer */}
      {fullscreenIndex !== null && (
        <FullscreenReelViewer
          reels={reels}
          initialIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
          showCart={isProductReels}
          onAddToCart={onAddToCart}
          addingToCart={addingToCart}
          isOutOfStock={isOutOfStock}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          customRed={customRed}
          availableColors={availableColors}
          selectedColorIndex={selectedColorIndex}
          setSelectedColorIndex={setSelectedColorIndex}
          sizeRange={sizeRange}
        />
      )}
    </section>
  );
}
