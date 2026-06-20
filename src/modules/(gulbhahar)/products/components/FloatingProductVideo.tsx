"use client";

import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoItem { videoUrl: string; posterUrl?: string; title?: string; }
interface ColorOption { name: string; hexcode?: string; hexCode?: string; }

interface FloatingProductVideoProps {
  videos?: VideoItem[];
  videoUrl: string;
  posterUrl?: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  availableColors?: ColorOption[];
  selectedColorIndex?: number;
}

const STORAGE_KEY = "floatingVideoHidden";
const ANIM_MS     = 440;

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
}: FloatingProductVideoProps) {
  const reels: VideoItem[] = videos?.length ? videos : [{ videoUrl, posterUrl }];

  const [mounted,       setMounted]       = useState(false);
  const [visible,       setVisible]       = useState(false);
  const [open,          setOpen]          = useState(false);
  const [muted,         setMuted]         = useState(true);
  const [activeIndex,   setActiveIndex]   = useState(0);
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null);
  const [isAnimating,   setIsAnimating]   = useState(false);
  const [direction,     setDirection]     = useState<"next" | "prev">("next");
  const [frameReady,    setFrameReady]    = useState<Record<number, boolean>>({});
  const [viewportH,     setViewportH]     = useState(0);

  const thumbRef  = useRef<HTMLVideoElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    setViewportH(window.innerHeight);
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize);
    try {
      if (!sessionStorage.getItem(`${STORAGE_KEY}_${productId}`))
        setTimeout(() => setVisible(true), 800);
    } catch { setTimeout(() => setVisible(true), 800); }
    return () => window.removeEventListener("resize", onResize);
  }, [productId]);

  useEffect(() => {
    if (visible) thumbRef.current?.play().catch(() => {});
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) { v.muted = muted; v.play().catch(() => {}); }
      else { v.pause(); v.currentTime = 0; }
    });
  }, [activeIndex, open]);

  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (v) v.muted = muted;
  }, [muted, activeIndex]);

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
      setOutgoingIndex(null);
      setIsAnimating(false);
      setFrameReady({});
      if (animTimer.current) clearTimeout(animTimer.current);
      videoRefs.current.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });
    }
  }, [open]);

  const goTo = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= reels.length || isAnimating) return;
    setDirection(newIndex > activeIndex ? "next" : "prev");
    setOutgoingIndex(activeIndex);
    setActiveIndex(newIndex);
    setIsAnimating(true);
    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      setOutgoingIndex(null);
      setIsAnimating(false);
    }, ANIM_MS + 40);
  }, [activeIndex, isAnimating, reels.length]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    try { sessionStorage.setItem(`${STORAGE_KEY}_${productId}`, "1"); } catch {}
  };

  // ── Layout dimensions ──────────────────────────────────────────────────
  const reelH = viewportH > 0 ? Math.min(viewportH * 0.94, 820) : 700;
  const reelW = Math.round(reelH * 9 / 16);

  // Peek sizes — same for left and right (symmetric)
  const peekTop      = Math.round(reelH * 0.14);
  const peekH        = reelH - 2 * peekTop;
  const peekW        = Math.round(peekH * 9 / 16);
  const sc           = peekH / reelH;              // scale factor for peek cards
  const visiblePeekW = Math.round(reelW * 0.32);  // how many px of peek card are visible

  /*
   * Stack container layout (all measured from container left=0):
   *
   *   |<-- visiblePeekW -->|<-------- reelW ------->|<-- visiblePeekW -->|
   *   [  prev peek (clipped left)  ][    active     ][  next peek (clipped right)  ]
   *
   * Container width  = visiblePeekW + reelW + visiblePeekW
   * Active card left = visiblePeekW
   * Prev card left   = visiblePeekW - peekW + 6   (6px slides under active card)
   * Next card left   = visiblePeekW + reelW - 6   (6px slides under active card)
   */
  const stackW       = visiblePeekW + reelW + visiblePeekW;
  const activeLeft   = visiblePeekW;
  const prevCardLeft = visiblePeekW - peekW + 6;
  const nextCardLeft = visiblePeekW + reelW - 6;

  const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const dur  = `${ANIM_MS}ms`;

  /*
   * All cards are rendered at the SAME DOM size (reelW × reelH), anchored
   * at top:0 left:0 with transform-origin:top-left.
   * Visual position and size are controlled entirely by transform so CSS
   * can interpolate smoothly between states without layout reflows.
   *
   * Positions:
   *   active   → translateX(activeLeft)   translateY(0)       scale(1)
   *   prev     → translateX(prevCardLeft) translateY(peekTop) scale(sc)
   *   next     → translateX(nextCardLeft) translateY(peekTop) scale(sc)
   *   far-left → off-screen left (negative X)
   *   far-right→ off-screen right (> stackW)
   *
   * On NEXT click: outgoing slides to prev position, incoming slides from next → active.
   * On PREV click: outgoing slides to next position, incoming slides from prev → active.
   */
  const getCardStyle = (i: number): React.CSSProperties => {
    const isActive   = i === activeIndex;
    const isOutgoing = i === outgoingIndex;
    const isNext     = i === activeIndex + 1;
    const isPrev     = i === activeIndex - 1;

    if (isActive) {
      return {
        zIndex:     10,
        transform:  `translateX(${activeLeft}px) translateY(0px) scale(1)`,
        opacity:    1,
        boxShadow:  "-6px 0 20px rgba(0,0,0,0.35), 10px 0 48px rgba(0,0,0,0.65)",
        transition: isAnimating
          ? `transform ${dur} ${ease}, opacity ${ANIM_MS * 0.8}ms ease-out`
          : "none",
      };
    }

    if (isOutgoing) {
      // Goes to the opposite peek on the side it came from
      const exitTx = direction === "next" ? prevCardLeft : nextCardLeft;
      const exitTy = peekTop;
      return {
        zIndex:     8,
        transform:  `translateX(${exitTx}px) translateY(${exitTy}px) scale(${sc})`,
        opacity:    0.85,
        boxShadow:  "none",
        transition: `transform ${ANIM_MS * 0.95}ms ${ease}, opacity ${ANIM_MS * 0.7}ms ease-out`,
      };
    }

    if (isNext) {
      return {
        zIndex:     9,
        transform:  `translateX(${nextCardLeft}px) translateY(${peekTop}px) scale(${sc})`,
        opacity:    1,
        transition: isAnimating
          ? `transform ${dur} ${ease}`
          : "none",
      };
    }

    if (isPrev) {
      return {
        zIndex:     9,
        transform:  `translateX(${prevCardLeft}px) translateY(${peekTop}px) scale(${sc})`,
        opacity:    1,
        transition: isAnimating
          ? `transform ${dur} ${ease}`
          : "none",
      };
    }

    // Far past — off-screen left
    if (i < activeIndex - 1) {
      return {
        zIndex:     1,
        transform:  `translateX(${prevCardLeft - peekW - 30}px) translateY(${peekTop}px) scale(${sc})`,
        opacity:    0,
        transition: "none",
      };
    }

    // Far future — off-screen right
    return {
      zIndex:     1,
      transform:  `translateX(${stackW + 60}px) translateY(${peekTop}px) scale(${sc})`,
      opacity:    0,
      transition: "none",
    };
  };

  // Render only cards near active (+ outgoing)
  const visibleIndices = Array.from(new Set([
    ...(outgoingIndex !== null ? [outgoingIndex] : []),
    activeIndex - 2,
    activeIndex - 1,
    activeIndex,
    activeIndex + 1,
    activeIndex + 2,
  ])).filter(i => i >= 0 && i < reels.length);

  const hasPrev  = activeIndex > 0;
  const hasNext  = activeIndex < reels.length - 1;
  const color    = availableColors[selectedColorIndex];

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating thumb — desktop only ── */}
      {visible && (
        <div className="hidden sm:block fixed top-1/2 -translate-y-1/2 right-5 z-40">
          <div
            onClick={() => setOpen(true)}
            className="relative cursor-pointer w-[110px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/20 hover:scale-105 transition-all duration-300"
            style={{ aspectRatio: "9/16" }}
          >
            <video ref={thumbRef} src={videoUrl} poster={posterUrl}
              muted loop playsInline preload="none"
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-2 left-0 right-0 text-white text-[10px] font-semibold text-center drop-shadow">
              Watch Video
            </div>
          </div>
          <button onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900/80 border border-white/20 flex items-center justify-center z-10">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}

      {/* ── Reels viewer ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] hidden sm:flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setOpen(false)}
        >
          {/* ← arrow  |  stack  |  → arrow */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>

            {/* Left arrow */}
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center flex-shrink-0 active:scale-90 transition-all duration-200"
              style={{
                background:  hasPrev ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
                boxShadow:   "0 4px 20px rgba(0,0,0,0.45)",
                pointerEvents: hasPrev ? "auto" : "none",
                opacity:     hasPrev ? 1 : 0,
              }}
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/*
             * Stack container — overflow:hidden clips the peek cards so only
             * visiblePeekW pixels of each peek card show at each edge.
             */}
            <div
              className="relative flex-shrink-0"
              style={{ width: stackW, height: reelH, overflow: "hidden" }}
            >
              {visibleIndices.map((i) => {
                const reel     = reels[i];
                const isActive = i === activeIndex;
                const isNext   = i === activeIndex + 1;
                const isPrev   = i === activeIndex - 1;
                const isPeek   = isNext || isPrev;
                const cardSt   = getCardStyle(i);

                return (
                  <div
                    key={i}
                    className="absolute top-0 left-0 rounded-[20px] overflow-hidden bg-stone-950"
                    style={{
                      width:           reelW,
                      height:          reelH,
                      transformOrigin: "top left",
                      willChange:      "transform, opacity",
                      cursor:          isPeek ? "pointer" : "default",
                      ...cardSt,
                    }}
                    onClick={isPeek ? () => goTo(i) : undefined}
                  >
                    {/* Poster — instant visual before video decodes */}
                    {reel.posterUrl && (
                      <img
                        src={reel.posterUrl}
                        alt=""
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          frameReady[i] ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                        loading={i === 0 ? "eager" : "lazy"}
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}

                    {/* Video */}
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={reel.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted={muted}
                      loop
                      playsInline
                      preload={isActive || isNext || isPrev ? "auto" : "metadata"}
                      onCanPlay={() => {
                        if (i === activeIndex) {
                          const v = videoRefs.current[i];
                          if (v) { v.muted = muted; v.play().catch(() => {}); }
                        }
                      }}
                      onLoadedData={() => setFrameReady((prev) => ({ ...prev, [i]: true }))}
                    />

                    {/* Dim overlay for peek cards */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-black/42 pointer-events-none" />
                    )}

                    {/* Product info — only on active card */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 px-4 pt-20 pb-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-[52px] rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-white/20 bg-white/10">
                            <img src={productImage} alt={productName}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold line-clamp-1 drop-shadow-md">{productName}</p>
                            <p className="text-white font-bold text-base drop-shadow-md">₹{(productPrice ?? 0).toLocaleString()}</p>
                            {color && (
                              <span className="text-white/75 text-[11px] flex items-center gap-1">
                                <span className="inline-block w-2.5 h-2.5 rounded-full ring-1 ring-white/40"
                                  style={{ backgroundColor: color.hexcode || color.hexCode || "#ccc" }} />
                                {color.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Controls — only on active card */}
                    {isActive && (
                      <>
                        <div className="absolute top-3 right-3 flex gap-1.5 z-20">
                          <button
                            onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                          >
                            {muted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                          </button>
                          <button
                            onClick={() => setOpen(false)}
                            className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                          >
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
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center flex-shrink-0 active:scale-90 transition-all duration-200"
              style={{
                background:    hasNext ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
                boxShadow:     "0 4px 20px rgba(0,0,0,0.45)",
                pointerEvents: hasNext ? "auto" : "none",
                opacity:       hasNext ? 1 : 0,
              }}
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Dots */}
          {reels.length > 1 && (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {reels.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/35"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
