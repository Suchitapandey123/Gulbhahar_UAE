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

  const [mounted,     setMounted]     = useState(false);
  const [visible,     setVisible]     = useState(false);
  const [open,        setOpen]        = useState(false);
  const [muted,       setMuted]       = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [frameReady,  setFrameReady]  = useState<Record<number, boolean>>({});
  const [viewportH,   setViewportH]   = useState(0);

  const thumbRef  = useRef<HTMLVideoElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  /* Play active / pause others whenever activeIndex or open changes */
  useEffect(() => {
    if (!open) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) {
        v.muted = muted;
        // play() may fail if video isn't ready yet — onCanPlay handles that case
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [activeIndex, open]);

  /* Sync mute state to current video */
  useEffect(() => {
    const v = videoRefs.current[activeIndex];
    if (v) v.muted = muted;
  }, [muted, activeIndex]);

  /* Reset on close */
  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
      setFrameReady({});
      videoRefs.current.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });
    }
  }, [open]);

  const goTo = useCallback((i: number) => {
    if (i >= 0 && i < reels.length) setActiveIndex(i);
  }, [reels.length]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    try { sessionStorage.setItem(`${STORAGE_KEY}_${productId}`, "1"); } catch {}
  };

  // Layout dimensions
  const reelH        = viewportH > 0 ? Math.min(viewportH * 0.94, 820) : 700;
  const reelW        = Math.round(reelH * 9 / 16);
  const visibleNextW = Math.round(reelW * 0.48);
  const stackW       = reelW + visibleNextW;
  const nextTop      = Math.round(reelH * 0.14);   // gap from top
  const nextH        = reelH - 2 * nextTop;        // same gap at bottom (symmetric)
  const nextW        = Math.round(nextH * 9 / 16);
  const nextLeft     = reelW - 6;

  const nextReel = reels[activeIndex + 1];
  const color    = availableColors[selectedColorIndex];

  if (!mounted) return null;

  return (
    <>
      {/* ── Floating thumb — desktop only ── */}
      {visible && (
        <div className="hidden sm:block fixed top-1/2 -translate-y-1/2 right-5 z-40">
          <div
            onClick={() => setOpen(true)}
            className="relative cursor-pointer w-[110px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-white/20 group hover:scale-105 transition-all duration-300"
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

      {/* ── Reels viewer — desktop only, no outer frame ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] hidden sm:flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>

            {/* Video stack */}
            <div
              className="relative"
              style={{ width: stackW, height: reelH, overflow: "hidden" }}
            >
              {/* Active card */}
              {reels.map((reel, i) => {
                if (Math.abs(i - activeIndex) > 1) return null;
                const isActive = i === activeIndex;
                return (
                  <div
                    key={i}
                    className="absolute top-0 left-0 rounded-[20px] overflow-hidden bg-stone-950"
                    style={{
                      width:      reelW,
                      height:     reelH,
                      zIndex:     isActive ? 10 : 5,
                      opacity:    isActive ? 1 : 0,
                      transition: "opacity 0.35s ease",
                      boxShadow:  isActive ? "10px 0 48px rgba(0,0,0,0.65)" : "none",
                    }}
                  >
                    {/* Poster — shown until video frame is ready */}
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

                    {/*
                     * Video — src set directly in JSX so the browser starts loading
                     * immediately on render (no delayed effect race condition).
                     * onCanPlay fires as soon as there's enough data to play, which
                     * triggers play() reliably even on first open.
                     */}
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={reel.videoUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted={muted}
                      loop
                      playsInline
                      preload={isActive ? "auto" : "metadata"}
                      onCanPlay={() => {
                        if (i === activeIndex) {
                          const v = videoRefs.current[i];
                          if (v) { v.muted = muted; v.play().catch(() => {}); }
                        }
                      }}
                      onLoadedData={() => setFrameReady((prev) => ({ ...prev, [i]: true }))}
                    />

                    {/* Bottom gradient + product info overlaid on video */}
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

                    {/* Mute + Close — top right inside card */}
                    {isActive && (
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
                    )}

                    {/* Counter */}
                    {isActive && reels.length > 1 && (
                      <span className="absolute top-3 left-3 z-20 text-white/70 text-xs tabular-nums bg-black/30 px-2 py-0.5 rounded-full">
                        {activeIndex + 1} / {reels.length}
                      </span>
                    )}

                    {/* Back arrow */}
                    {isActive && activeIndex > 0 && (
                      <button
                        onClick={() => goTo(activeIndex - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Next card — thumbnail teaser */}
              {nextReel && (
                <div
                  className="absolute rounded-[18px] overflow-hidden cursor-pointer bg-stone-900"
                  style={{
                    left:      nextLeft,
                    top:       nextTop,
                    width:     nextW,
                    height:    nextH,
                    zIndex:    9,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
                  }}
                  onClick={() => goTo(activeIndex + 1)}
                >
                  {/* Poster image — hide broken icon on error */}
                  {nextReel.posterUrl && (
                    <img
                      src={nextReel.posterUrl}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  {/* Video underneath as fallback frame */}
                  <video
                    src={nextReel.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {/* Light dim */}
                  <div className="absolute inset-0 bg-black/38" />
                </div>
              )}
            </div>

            {/* Arrow — right of peek, on dark background */}
            {nextReel && (
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.45)" }}
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            )}
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
