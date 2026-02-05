"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export interface FullscreenReel {
  videoUrl: string;
  title: string;
  description?: string;
}

interface FullscreenReelViewerProps {
  reels: FullscreenReel[];
  initialIndex: number;
  onClose: () => void;
}

export default function FullscreenReelViewer({
  reels,
  initialIndex,
  onClose,
}: FullscreenReelViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(true);
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

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
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
      className="fixed inset-0 z-[101] bg-black/60 backdrop-blur-md flex items-center justify-center"
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
          className="absolute inset-0 w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          autoPlay
          onClick={() => setIsMuted((m) => !m)}
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-semibold text-base">
            {currentReel.title}
          </h3>
          {currentReel.description && (
            <p className="text-white/70 text-sm mt-1">
              {currentReel.description}
            </p>
          )}
        </div>
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
    </div>
  );
}
