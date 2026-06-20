"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StackedReelModal, { ReelItem } from "./StackedReelModal";

interface ColorOption { name: string; hexcode?: string; hexCode?: string; }
interface SizeRangeItem { size: string; available: boolean; quantity: number; }

interface FloatingProductVideoProps {
  videos?: ReelItem[];
  videoUrl: string;
  posterUrl?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  availableColors?: ColorOption[];
  selectedColorIndex?: number;
  setSelectedColorIndex?: (i: number) => void;
  onAddToCart?: () => void;
  addingToCart?: boolean;
  isOutOfStock?: boolean;
  selectedSize?: string;
  setSelectedSize?: (s: string) => void;
  sizeRange?: SizeRangeItem[];
  customRed?: string;
}

const STORAGE_KEY = "floatingVideoHidden";

export default function FloatingProductVideo({
  videos,
  videoUrl,
  posterUrl,
  productId,
  productName,
  productPrice,
  productImage,
  availableColors = [],
  selectedColorIndex = 0,
  setSelectedColorIndex,
  onAddToCart,
  addingToCart,
  isOutOfStock,
  selectedSize,
  setSelectedSize,
  sizeRange = [],
  customRed = "#800000",
}: FloatingProductVideoProps) {
  const reels: ReelItem[] = videos?.length ? videos : [{ videoUrl, posterUrl }];

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open,    setOpen]    = useState(false);

  const thumbRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      if (!sessionStorage.getItem(`${STORAGE_KEY}_${productId}`))
        setTimeout(() => setVisible(true), 800);
    } catch { setTimeout(() => setVisible(true), 800); }
  }, [productId]);

  useEffect(() => {
    if (visible) thumbRef.current?.play().catch(() => {});
  }, [visible]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    try { sessionStorage.setItem(`${STORAGE_KEY}_${productId}`, "1"); } catch {}
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating thumb ───────────────────────────────────────────── */}
      {visible && (
        <div className="fixed bottom-20 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 right-4 sm:right-5 z-40">
          <div
            onClick={() => setOpen(true)}
            className="relative cursor-pointer w-[80px] sm:w-[110px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/20 hover:scale-105 transition-all duration-300"
            style={{ aspectRatio: "9/16" }}
          >
            <video ref={thumbRef} src={videoUrl} poster={posterUrl}
              muted loop playsInline preload="none"
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-2 left-0 right-0 text-white text-[9px] sm:text-[10px] font-semibold text-center drop-shadow">
              Watch Video
            </div>
          </div>
          <button onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900/80 border border-white/20 flex items-center justify-center z-10">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}

      {/* ── Stacked viewer modal ─────────────────────────────────────── */}
      {open && (
        <StackedReelModal
          reels={reels}
          initialIndex={0}
          onClose={() => setOpen(false)}
          productName={productName}
          productPrice={productPrice}
          productImage={productImage}
          availableColors={availableColors}
          selectedColorIndex={selectedColorIndex}
          setSelectedColorIndex={setSelectedColorIndex}
          onAddToCart={onAddToCart}
          addingToCart={addingToCart}
          isOutOfStock={isOutOfStock}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sizeRange={sizeRange}
          customRed={customRed}
        />
      )}
    </>
  );
}
