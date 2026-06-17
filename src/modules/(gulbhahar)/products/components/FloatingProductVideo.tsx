"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

interface FloatingProductVideoProps {
  videoUrl: string;
  posterUrl?: string;
  productId: string;
}

const STORAGE_KEY = "floatingVideoHidden";

export default function FloatingProductVideo({
  videoUrl,
  posterUrl,
  productId,
}: FloatingProductVideoProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbVideoRef = useRef<HTMLVideoElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const hidden = sessionStorage.getItem(`${STORAGE_KEY}_${productId}`);
      if (!hidden) setTimeout(() => setVisible(true), 1200);
    } catch {}
  }, [productId]);

  useEffect(() => {
    if (!visible || !thumbVideoRef.current) return;
    thumbVideoRef.current.play().catch(() => {});
  }, [visible]);

  useEffect(() => {
    if (!fullscreen || !fullVideoRef.current) return;
    fullVideoRef.current.play().catch(() => {});
  }, [fullscreen]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    try { sessionStorage.setItem(`${STORAGE_KEY}_${productId}`, "1"); } catch {}
  };

  if (!mounted || !visible) return null;

  return (
    <>
      {/* Floating Widget */}
      <div
        className={`
          fixed bottom-36 right-3
          sm:bottom-20 sm:right-5
          z-40
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div
          onClick={() => setFullscreen(true)}
          className="relative cursor-pointer w-[88px] sm:w-[120px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.28)] ring-1 ring-white/20 group hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out"
          style={{ aspectRatio: "9/16" }}
        >
          <video
            ref={thumbVideoRef}
            src={videoUrl}
            poster={posterUrl}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5">
            <p className="text-white text-[9px] sm:text-[10px] font-semibold tracking-wide text-center leading-tight drop-shadow">
              Watch Video
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close video"
          className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-gray-900 transition-colors duration-200 z-10"
        >
          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
        </button>
      </div>

      {/* Fullscreen Video Modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <video
            ref={fullVideoRef}
            src={videoUrl}
            poster={posterUrl}
            controls
            playsInline
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>
      )}
    </>
  );
}
