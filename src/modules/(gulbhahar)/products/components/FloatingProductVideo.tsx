"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────── */
interface ColorOption { name: string; hexcode?: string; hexCode?: string; }

interface FloatingProductVideoProps {
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
  videoUrl, posterUrl, productId,
  productName, productPrice, productImage,
  availableColors = [], selectedColorIndex = 0,
}: FloatingProductVideoProps) {
  const [mounted,    setMounted]    = useState(false);
  const [visible,    setVisible]    = useState(false);
  const [open,       setOpen]       = useState(false);
  const [playing,    setPlaying]    = useState(false);
  const [muted,      setMuted]      = useState(true);
  const [progress,   setProgress]   = useState(0);

  const thumbRef = useRef<HTMLVideoElement>(null);
  const fullRef  = useRef<HTMLVideoElement>(null);
  const rafRef   = useRef<number>(0);

  /* ── mount + session check ── */
  useEffect(() => {
    setMounted(true);
    try {
      if (!sessionStorage.getItem(`${STORAGE_KEY}_${productId}`))
        setTimeout(() => setVisible(true), 1200);
    } catch {}
  }, [productId]);

  /* ── thumb autoplay ── */
  useEffect(() => {
    if (visible) thumbRef.current?.play().catch(() => {});
  }, [visible]);

  /* ── full video play/pause ── */
  useEffect(() => {
    const v = fullRef.current;
    if (!v) return;
    if (open) { v.play().catch(() => {}); setPlaying(true); }
    else { v.pause(); setPlaying(false); setProgress(0); }
  }, [open]);

  /* ── progress bar rAF ── */
  const updateProgress = useCallback(() => {
    const v = fullRef.current;
    if (v && v.duration)
      setProgress((v.currentTime / v.duration) * 100);
    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  useEffect(() => {
    if (open) { rafRef.current = requestAnimationFrame(updateProgress); }
    else { cancelAnimationFrame(rafRef.current); }
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, updateProgress]);

  /* ── helpers ── */
  const togglePlay = () => {
    const v = fullRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = fullRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    try { sessionStorage.setItem(`${STORAGE_KEY}_${productId}`, "1"); } catch {}
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  const currentColor = availableColors[selectedColorIndex];

  if (!mounted || !visible) return null;

  return (
    <>
      {/* ── Floating Thumb (desktop only) ── */}
      <div className="hidden sm:block fixed top-1/2 -translate-y-1/2 right-5 z-40">
        <div
          onClick={() => setOpen(true)}
          className="relative cursor-pointer w-[120px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/20 group hover:scale-105 transition-all duration-300"
          style={{ aspectRatio: "9/16" }}
        >
          <video ref={thumbRef} src={videoUrl} poster={posterUrl}
            muted loop playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
          <p className="absolute bottom-2 left-0 right-0 text-white text-[10px] font-semibold text-center drop-shadow">
            Watch Video
          </p>
        </div>
        <button onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-900/80 border border-white/20 flex items-center justify-center hover:bg-gray-900 transition-colors z-10">
          <X className="w-3 h-3 text-white" />
        </button>
      </div>

      {/* ── Reels Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative flex flex-col bg-black overflow-hidden shadow-2xl"
            style={{
              width: "min(400px, 96vw)",
              height: "min(820px, 96vh)",
              borderRadius: "20px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Video ── */}
            <div className="relative flex-1 bg-black cursor-pointer" onClick={togglePlay}>
              <video
                ref={fullRef}
                src={videoUrl}
                poster={posterUrl}
                muted={muted}
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              {/* ── Top bar ── */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 z-10">
                {/* Progress bar */}
                <div
                  className="flex-1 h-1 bg-white/25 rounded-full mr-3 cursor-pointer overflow-hidden"
                  onClick={(e) => { e.stopPropagation(); seek(e); }}
                >
                  <div
                    className="h-full bg-white rounded-full transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {/* Mute */}
                <button
                  onClick={(e) => { e.stopPropagation(); setMuted((m) => !m); }}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center mr-2 hover:bg-black/60 transition-colors"
                >
                  {muted
                    ? <VolumeX className="w-4 h-4 text-white" />
                    : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* ── Centre play/pause indicator ── */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              )}

              {/* ── Right action rail ── */}

            </div>

            {/* ── Bottom product card ── */}
            <div className="flex-shrink-0 bg-white px-4 pt-3 pb-4 rounded-b-[20px]">
              {/* Product info row */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={productImage} alt={productName}
                    className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-semibold line-clamp-1">{productName}</p>
                  <p className="text-red-700 text-base font-bold">₹{(productPrice ?? 0).toLocaleString()}</p>
                  {currentColor && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <div
                        className="w-3 h-3 rounded-full ring-1 ring-gray-300"
                        style={{ backgroundColor: currentColor.hexcode || currentColor.hexCode || "#ccc" }}
                      />
                      <span className="text-gray-500 text-[11px]">{currentColor.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
