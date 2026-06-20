"use client";

import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../types";
import { ProductImageItem, FALLBACK_LQIP } from "@/utils/productImageUtils";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;
const DESKTOP_INITIAL_ZOOM = 2; // desktop opens at 2x; mobile stays at 1x

interface ImageModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  currentImages: ProductImageItem[];
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
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [animatePan, setAnimatePan] = useState(true);

  // Drag tracking refs — refs avoid re-renders during drag
  const isDragging = useRef(false);
  const hasMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtDragStart = useRef({ x: 0, y: 0 });
  // desktop opens at 2x; mobile stays at 1x — set on modal open, read everywhere
  const baseZoomRef = useRef(MIN_ZOOM);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = currentImages || [];
  const safeIndex = Math.min(modalImageIndex, Math.max(0, images.length - 1));

  // Clamp pan so the image never fully leaves the viewport
  const clampPan = useCallback(
    (x: number, y: number, currentZoom: number) => {
      if (!containerRef.current) return { x, y };
      const maxX = (containerRef.current.offsetWidth * (currentZoom - 1)) / 2;
      const maxY = (containerRef.current.offsetHeight * (currentZoom - 1)) / 2;
      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    []
  );

  const resetView = useCallback(() => {
    setZoom(baseZoomRef.current);
    setPan({ x: 0, y: 0 });
    setAnimatePan(true);
  }, []);

  const zoomIn = useCallback(() => {
    setAnimatePan(true);
    setZoom((prev) => Math.min(+(prev + ZOOM_STEP).toFixed(1), MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setAnimatePan(true);
    setZoom((prev) => {
      const floor = baseZoomRef.current;
      const next = Math.max(+(prev - ZOOM_STEP).toFixed(1), floor);
      if (next <= floor) setPan({ x: 0, y: 0 });
      else setPan((p) => clampPan(p.x, p.y, next));
      return next;
    });
  }, [clampPan]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setModalImageIndex(safeIndex > 0 ? safeIndex - 1 : images.length - 1);
  }, [safeIndex, images.length, setModalImageIndex]);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setModalImageIndex(safeIndex < images.length - 1 ? safeIndex + 1 : 0);
  }, [safeIndex, images.length, setModalImageIndex]);

  // ─── Mouse pan handlers ────────────────────────────────────────────────────

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= MIN_ZOOM) return;
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = { ...pan };
    setAnimatePan(false); // instant pan during drag
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setPan(clampPan(panAtDragStart.current.x + dx, panAtDragStart.current.y + dy, zoom));
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setAnimatePan(true);
    // If no movement → treat as click → reset zoom
    if (!hasMoved.current && zoom > baseZoomRef.current) resetView();
  };

  // ─── Touch pan handlers ────────────────────────────────────────────────────

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom <= MIN_ZOOM || e.touches.length !== 1) return;
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    panAtDragStart.current = { ...pan };
    setAnimatePan(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
    setPan(clampPan(panAtDragStart.current.x + dx, panAtDragStart.current.y + dy, zoom));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setAnimatePan(true);
  };

  // Cancel drag if mouse leaves the container
  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setAnimatePan(true);
    }
  };

  // ─── Reset on image/modal change ──────────────────────────────────────────

  useEffect(() => {
    setAnimatePan(false);
    setZoom(baseZoomRef.current);
    setPan({ x: 0, y: 0 });
    setIsLoading(true);
  }, [safeIndex]);

  useEffect(() => {
    if (isModalOpen) {
      // set base zoom for this session (desktop=2x, mobile=1x)
      baseZoomRef.current = window.innerWidth >= 1024 ? DESKTOP_INITIAL_ZOOM : MIN_ZOOM;
      setZoom(baseZoomRef.current);
      setPan({ x: 0, y: 0 });
    } else {
      baseZoomRef.current = MIN_ZOOM;
      resetView();
    }
  }, [isModalOpen, resetView]);

  // ─── Restore scroll position on modal close (no body lock needed) ─────────

  const savedScrollY = useRef<number | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      savedScrollY.current = window.scrollY;
    } else if (savedScrollY.current !== null) {
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
      savedScrollY.current = null;
    }
  }, [isModalOpen]);

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowLeft" && zoom <= baseZoomRef.current) prevImage();
      if (e.key === "ArrowRight" && zoom <= baseZoomRef.current) nextImage();
      if (e.key === "Escape") { zoom > baseZoomRef.current ? resetView() : closeModal(); }
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, zoom, prevImage, nextImage, closeModal, zoomIn, zoomOut, resetView]);


  if (!isModalOpen || images.length === 0) return null;

  const isZoomed = zoom > baseZoomRef.current;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-3 md:p-4">
        <span className="text-white text-sm md:text-base font-medium">
          {safeIndex + 1} / {images.length}
        </span>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            disabled={zoom <= baseZoomRef.current}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>

          <span className="text-white text-sm font-medium w-10 text-center tabular-nums">
            {(() => {
              const d = baseZoomRef.current > MIN_ZOOM
                ? (zoom - baseZoomRef.current) / ZOOM_STEP + 1
                : zoom;
              return (d % 1 === 0 ? d.toFixed(0) : d.toFixed(1)) + "x";
            })()}
          </span>

          <button
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="w-9 h-9 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

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
        {/* Navigation arrows — hidden when zoomed */}
        {images.length > 1 && !isZoomed && (
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

        {/* Dot indicators — hidden when zoomed */}
        {images.length > 1 && !isZoomed && (
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

        {/* Hint: tap to reset when zoomed */}
        {isZoomed && (
          <div className="absolute top-2 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <span className="text-white/50 text-xs">Tap image to reset</span>
          </div>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Image container — overflow clips the panned/zoomed image */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-hidden select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: animatePan ? "transform 0.25s ease" : "none",
              transformOrigin: "center center",
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: isZoomed ? "grab" : "zoom-in",
              willChange: "transform",
            }}
          >
            <NextImage
              src={images[safeIndex]?.url ?? ""}
              alt={`${product?.name || "Product"} - Image ${safeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
              priority
              draggable={false}
              onLoad={() => setIsLoading(false)}
            />
            {/* LQIP inside transform — same zoom as main image, no size jump */}
            {isLoading && (
              <img
                src={images[safeIndex]?.lqip || FALLBACK_LQIP}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </div>

      {/* Thumbnails — desktop only, hidden when zoomed */}
      {images.length > 1 && !isZoomed && (
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
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  unoptimized
                  placeholder="blur"
                  blurDataURL={img.lqip || FALLBACK_LQIP}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
