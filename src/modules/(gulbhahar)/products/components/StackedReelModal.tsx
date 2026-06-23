"use client";

import { ChevronLeft, ChevronRight, Loader2, Ruler, ShoppingCart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface ReelItem {
  videoUrl: string;
  posterUrl?: string;
  title?: string;
}

interface ColorOption { name: string; hexcode?: string; hexCode?: string; }
interface SizeRangeItem { size: string; available: boolean; quantity: number; }

interface StackedReelModalProps {
  reels: ReelItem[];
  initialIndex?: number;
  onClose: () => void;
  // Product info overlay
  productName?: string;
  productPrice?: number;
  productImage?: string;
  availableColors?: ColorOption[];
  selectedColorIndex?: number;
  setSelectedColorIndex?: (i: number) => void;
  // Cart
  onAddToCart?: () => void;
  addingToCart?: boolean;
  isOutOfStock?: boolean;
  selectedSize?: string;
  setSelectedSize?: (s: string) => void;
  sizeRange?: SizeRangeItem[];
  customRed?: string;
}

const ANIM_MS = 420;

export default function StackedReelModal({
  reels,
  initialIndex = 0,
  onClose,
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
}: StackedReelModalProps) {
  const [activeIndex,    setActiveIndex]    = useState(initialIndex);
  const [outgoingIndex,  setOutgoingIndex]  = useState<number | null>(null);
  const [isAnimating,    setIsAnimating]    = useState(false);
  const [direction,      setDirection]      = useState<"next" | "prev">("next");
  const [prevSlidePhase, setPrevSlidePhase] = useState<"snap" | "slide" | null>(null);
  const [frameReady,     setFrameReady]     = useState<Record<number, boolean>>({});
  const [viewportH,      setViewportH]      = useState(0);
  const [viewportW,      setViewportW]      = useState(0);
  const [showVariantPicker, setShowVariantPicker] = useState(false);

  const videoRefs  = useRef<(HTMLVideoElement | null)[]>([]);
  const animTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);

  useEffect(() => {
    const update = () => { setViewportH(window.innerHeight); setViewportW(window.innerWidth); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) { v.muted = true; v.play().catch(() => {}); }
      else { v.pause(); v.currentTime = 0; }
    });
  }, [activeIndex]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [activeIndex, reels.length]);

  const goTo = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= reels.length || isAnimating) return;
    const dir = newIndex > activeIndex ? "next" : "prev";
    setDirection(dir);
    setOutgoingIndex(activeIndex);
    setActiveIndex(newIndex);
    setIsAnimating(true);

    if (dir === "prev") {
      setPrevSlidePhase("snap");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPrevSlidePhase("slide");
        });
      });
    }

    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      setOutgoingIndex(null);
      setIsAnimating(false);
      setPrevSlidePhase(null);
    }, ANIM_MS + 40);
  }, [activeIndex, isAnimating, reels.length]);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => { touchEndX.current   = e.touches[0].clientX; };
  const onTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
  };

  // ── Layout ──────────────────────────────────────────────────────────────
  const isMobile = viewportW > 0 && viewportW < 640;
  const reelH    = viewportH > 0 ? Math.min(viewportH * 0.94, 820) : 700;
  const reelW    = Math.round(reelH * 9 / 16);

  const peekTop      = Math.round(reelH * 0.14);
  const peekH        = reelH - 2 * peekTop;
  const peekW        = Math.round(peekH * 9 / 16);
  const sc           = peekH / reelH;
  const visiblePeekW = Math.round(reelW * 0.48);
  const stackW       = visiblePeekW + reelW + visiblePeekW;
  const activeLeft   = visiblePeekW;
  const prevLeft     = visiblePeekW - peekW + 6;
  const nextLeft     = visiblePeekW + reelW - 6;

  const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const dur  = `${ANIM_MS}ms`;

  // Adjusted prevLeft for top-right origin (same visual position, no jump)
  const prevLeftTR = prevLeft - reelW * (1 - sc);

  const getCardStyle = (i: number): React.CSSProperties & { transformOrigin?: string } => {
    const isActive   = i === activeIndex;
    const isOutgoing = i === outgoingIndex;
    const isNext     = i === activeIndex + 1;
    const isPrev     = i === activeIndex - 1;

    // ── NEXT: incoming from right, outgoing shrinks to left (unchanged) ──
    // ── PREV: snap origin to top-right, then animate from peek→active ──

    if (isActive) {
      if (direction === "prev" && prevSlidePhase === "snap") return {
        zIndex: 12,
        transformOrigin: "top right",
        transform: `translateX(${prevLeftTR}px) translateY(${peekTop}px) scale(${sc})`,
        opacity: 1,
        boxShadow: "none",
        transition: "none",
      };
      if (direction === "prev" && prevSlidePhase === "slide") return {
        zIndex: 12,
        transformOrigin: "top right",
        transform: `translateX(${activeLeft}px) translateY(0px) scale(1)`,
        opacity: 1,
        boxShadow: "-6px 0 20px rgba(0,0,0,0.35), 10px 0 48px rgba(0,0,0,0.65)",
        transition: `transform ${dur} ${ease}, opacity ${ANIM_MS * 0.8}ms ease-out`,
      };
      return {
        zIndex: 12,
        transformOrigin: "top left",
        transform: `translateX(${activeLeft}px) translateY(0px) scale(1)`,
        opacity: 1,
        boxShadow: "-6px 0 20px rgba(0,0,0,0.35), 10px 0 48px rgba(0,0,0,0.65)",
        transition: `transform ${dur} ${ease}, opacity ${ANIM_MS * 0.8}ms ease-out`,
      };
    }

    if (isOutgoing) {
      if (direction === "next") return {
        zIndex: 5,
        transformOrigin: "top left",
        transform: `translateX(${prevLeft}px) translateY(${peekTop}px) scale(${sc})`,
        opacity: 0.75,
        boxShadow: "none",
        transition: `transform ${dur} ${ease}, opacity ${ANIM_MS * 0.7}ms ease-out`,
      };
      return {
        zIndex: 5,
        transformOrigin: "top left",
        transform: `translateX(${nextLeft}px) translateY(${peekTop}px) scale(${sc})`,
        opacity: 0.75,
        boxShadow: "none",
        transition: `transform ${dur} ${ease}, opacity ${ANIM_MS * 0.7}ms ease-out`,
      };
    }

    if (isNext) return {
      zIndex: 9,
      transformOrigin: "top left",
      transform: `translateX(${nextLeft}px) translateY(${peekTop}px) scale(${sc})`,
      opacity: 1,
      transition: `transform ${dur} ${ease}, opacity 280ms ease-in`,
    };

    if (isPrev) return {
      zIndex: 9,
      transformOrigin: "top left",
      transform: `translateX(${prevLeft}px) translateY(${peekTop}px) scale(${sc})`,
      opacity: 1,
      transition: `transform ${dur} ${ease}, opacity 280ms ease-in`,
    };

    if (i < activeIndex - 1) return {
      zIndex: 1,
      transformOrigin: "top left",
      transform: `translateX(${prevLeft - peekW - 30}px) translateY(${peekTop}px) scale(${sc})`,
      opacity: 0, transition: "none",
    };

    return {
      zIndex: 1,
      transformOrigin: "top left",
      transform: `translateX(${stackW + 60}px) translateY(${peekTop}px) scale(${sc})`,
      opacity: 0, transition: "none",
    };
  };

  const visibleIndices = Array.from(new Set([
    ...(outgoingIndex !== null ? [outgoingIndex] : []),
    activeIndex - 2, activeIndex - 1, activeIndex, activeIndex + 1, activeIndex + 2,
  ])).filter(i => i >= 0 && i < reels.length);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < reels.length - 1;
  const color   = availableColors[selectedColorIndex];

  const containerClip = `inset(0px -${visiblePeekW + 10}px 0px -${visiblePeekW + 10}px)`;

  const showProductInfo = !!(productName || productPrice !== undefined);
  const hasCart         = !!onAddToCart;

  if (viewportH === 0) return null;

  const variantSheet = showVariantPicker && (
    <div
      className="absolute inset-0 z-[110] flex items-end justify-center"
      onClick={() => setShowVariantPicker(false)}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-full max-w-md bg-white rounded-t-2xl p-4 pb-8 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Select Options</h3>
          <button onClick={() => setShowVariantPicker(false)} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {availableColors.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Color:</h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((c, idx) => (
                <button key={idx} onClick={() => setSelectedColorIndex?.(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md capitalize border transition-all ${
                    selectedColorIndex === idx ? "text-white font-semibold border-transparent shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
                  }`}
                  style={selectedColorIndex === idx ? { backgroundColor: customRed } : {}}>
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: c.hexcode || c.hexCode || "#ccc" }} />
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {sizeRange.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 flex items-center gap-1">
              <Ruler className="w-4 h-4" /> Size:
            </h4>
            <div className="flex flex-wrap gap-2">
              {sizeRange.map(({ size, available }) => (
                <button key={size} onClick={() => available && setSelectedSize?.(size)} disabled={!available}
                  className={`px-3.5 py-2 text-sm border rounded font-medium transition-all ${
                    selectedSize === size && available ? "text-white border-transparent" :
                    available ? "border-gray-300 hover:border-gray-400 bg-white text-gray-900" :
                    "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                  }`}
                  style={selectedSize === size && available ? { backgroundColor: customRed, borderColor: customRed } : {}}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => { onAddToCart?.(); setShowVariantPicker(false); }}
          disabled={addingToCart || !selectedSize || isOutOfStock}
          className={`w-full py-3 text-white rounded-lg font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
            addingToCart || !selectedSize || isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
          }`}
          style={{ backgroundColor: customRed }}
        >
          {isOutOfStock ? "OUT OF STOCK" : addingToCart ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Adding...</>
          ) : !selectedSize ? "SELECT SIZE" : (
            <><ShoppingCart className="w-5 h-5" /> ADD TO CART</>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {isMobile ? (
        /* ── Mobile: full-screen single card ──────────────────────────── */
        <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
          {visibleIndices.map((i) => {
            const reel  = reels[i];
            const isAct = i === activeIndex;
            const isOut = i === outgoingIndex;
            return (
              <div key={i} className="absolute inset-0 bg-black transition-opacity duration-300"
                style={{ opacity: isAct ? 1 : isOut ? 0 : 0, zIndex: isAct ? 2 : 1 }}>
                {reel.posterUrl && !frameReady[i] && (
                  <img src={reel.posterUrl} alt="" className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                )}
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={reel.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted loop playsInline
                  preload={Math.abs(i - activeIndex) <= 1 ? "auto" : "metadata"}
                  onCanPlay={() => {
                    if (i === activeIndex) {
                      const v = videoRefs.current[i];
                      if (v) { v.muted = true; v.play().catch(() => {}); }
                    }
                  }}
                  onLoadedData={() => setFrameReady((p) => ({ ...p, [i]: true }))}
                />
              </div>
            );
          })}

          {/* Top controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          {reels.length > 1 && (
            <span className="absolute top-4 left-4 z-20 text-white/70 text-xs tabular-nums bg-black/30 px-2 py-0.5 rounded-full">
              {activeIndex + 1} / {reels.length}
            </span>
          )}

          {/* Cart button — standalone small pill, bottom-right */}
          {hasCart && !showProductInfo && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowVariantPicker(true); }}
              className="absolute bottom-4 right-4 z-30 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-white text-[11px] font-medium shadow-lg active:scale-95 transition-all"
              style={{ backgroundColor: customRed }}
            >
              <ShoppingCart className="w-3 h-3" />
              Add to Cart
            </button>
          )}

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pt-20 pb-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
            {showProductInfo && (
              <div className="flex items-center gap-3 mb-3">
                {productImage && (
                  <div className="w-10 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/20 bg-white/10">
                    <img src={productImage} alt={productName} className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {productName && <p className="text-white text-sm font-semibold line-clamp-1 drop-shadow-md">{productName}</p>}
                  {productPrice !== undefined && <p className="text-white font-bold text-base drop-shadow-md">₹{productPrice.toLocaleString()}</p>}
                  {color && (
                    <span className="text-white/75 text-[11px] flex items-center gap-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full ring-1 ring-white/40"
                        style={{ backgroundColor: color.hexcode || color.hexCode || "#ccc" }} />
                      {color.name}
                    </span>
                  )}
                </div>
                {hasCart && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowVariantPicker(true); }}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-white text-xs font-semibold shadow-lg active:scale-95 transition-all"
                    style={{ backgroundColor: customRed }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                )}
              </div>
            )}
            {reels.length > 1 && (
              <div className="flex justify-center gap-1.5 pb-5">
                {reels.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/35"}`} />
                ))}
              </div>
            )}
          </div>

          {variantSheet}
        </div>
      ) : (
        /* ── Desktop: stacked peek layout ─────────────────────────────── */
        <>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* Left arrow */}
            <button onClick={() => goTo(activeIndex - 1)}
              className="relative z-10 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center flex-shrink-0 active:scale-90 transition-all duration-200"
              style={{
                background:    hasPrev ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
                boxShadow:     "0 4px 20px rgba(0,0,0,0.45)",
                pointerEvents: hasPrev ? "auto" : "none",
                opacity:       hasPrev ? 1 : 0,
              }}>
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Stack container */}
            <div className="relative flex-shrink-0" style={{
              width: stackW, height: reelH,
              overflow: "visible", clipPath: containerClip,
            }}>
              {visibleIndices.map((i) => {
                const reel   = reels[i];
                const isAct  = i === activeIndex;
                const isNxt  = i === activeIndex + 1;
                const isPrv  = i === activeIndex - 1;
                const isPeek = isNxt || isPrv;
                return (
                  <div key={i}
                    className="absolute top-0 left-0 rounded-[20px] overflow-hidden bg-stone-950"
                    style={{
                      width: reelW, height: reelH,
                      willChange: "transform, opacity",
                      cursor: isPeek ? "pointer" : "default",
                      ...getCardStyle(i),
                    }}
                    onClick={isPeek ? () => goTo(i) : undefined}
                  >
                    {reel.posterUrl && (
                      <img src={reel.posterUrl} alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${frameReady[i] ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    )}
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={reel.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted loop playsInline
                      preload={isAct || isNxt || isPrv ? "auto" : "metadata"}
                      onCanPlay={() => {
                        if (i === activeIndex) {
                          const v = videoRefs.current[i];
                          if (v) { v.muted = true; v.play().catch(() => {}); }
                        }
                      }}
                      onLoadedData={() => setFrameReady((p) => ({ ...p, [i]: true }))}
                    />
                    {!isAct && <div className="absolute inset-0 bg-black/42 pointer-events-none" />}

                    {isAct && (
                      <>
                        {/* Bottom overlay: product info + cart */}
                        {(showProductInfo || hasCart) && (
                          <div className="absolute bottom-0 left-0 right-0 px-4 pt-20 pb-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                            {showProductInfo && (
                              <div className="flex items-end gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                  {productImage && (
                                    <div className="w-11 h-[52px] rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-white/20 bg-white/10 mb-2">
                                      <img src={productImage} alt={productName} className="w-full h-full object-cover"
                                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                                    </div>
                                  )}
                                  {productName && <p className="text-white text-sm font-semibold line-clamp-1 drop-shadow-md">{productName}</p>}
                                  {productPrice !== undefined && <p className="text-white font-bold text-base drop-shadow-md">₹{productPrice.toLocaleString()}</p>}
                                  {color && (
                                    <span className="text-white/75 text-[11px] flex items-center gap-1">
                                      <span className="inline-block w-2.5 h-2.5 rounded-full ring-1 ring-white/40"
                                        style={{ backgroundColor: color.hexcode || color.hexCode || "#ccc" }} />
                                      {color.name}
                                    </span>
                                  )}
                                </div>
                                {hasCart && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setShowVariantPicker(true); }}
                                    className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg active:scale-95 transition-all mb-1"
                                    style={{ backgroundColor: customRed }}
                                  >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Cart button standalone — icon-only pill, bottom-right */}
                        {hasCart && !showProductInfo && (
                          <button
                            onClick={(e) => { e.stopPropagation(); setShowVariantPicker(true); }}
                            className="absolute bottom-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-white text-[11px] font-medium shadow-lg active:scale-95 transition-all"
                            style={{ backgroundColor: customRed }}
                          >
                            <ShoppingCart className="w-3 h-3" />
                            Add to Cart
                          </button>
                        )}

                        {/* Top controls */}
                        <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                          <button onClick={onClose}
                            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        {reels.length > 1 && (
                          <span className="absolute top-3 left-3 z-20 text-white/70 text-xs tabular-nums bg-black/30 px-2 py-0.5 rounded-full">
                            {activeIndex + 1} / {reels.length}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right arrow */}
            <button onClick={() => goTo(activeIndex + 1)}
              className="relative z-10 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center flex-shrink-0 active:scale-90 transition-all duration-200"
              style={{
                background:    hasNext ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
                boxShadow:     "0 4px 20px rgba(0,0,0,0.45)",
                pointerEvents: hasNext ? "auto" : "none",
                opacity:       hasNext ? 1 : 0,
              }}>
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Desktop dots */}
          {reels.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
              {reels.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/35"}`} />
              ))}
            </div>
          )}

          <div onClick={(e) => e.stopPropagation()}>{variantSheet}</div>
        </>
      )}
    </div>
  );
}
