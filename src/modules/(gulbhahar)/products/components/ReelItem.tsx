"use client";

import { useEffect, useRef, useState } from "react";
import { ReelData } from "./ProductReels";

interface ReelItemProps {
  reel: ReelData;
  index: number;
  onClick?: () => void;
}

const ReelItem = ({ reel, index, onClick }: ReelItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Preload first 4 videos immediately; rest lazy
  const isPriority = index <= 3;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    setIsLoaded(false);

    if (isPriority) {
      video.src = reel.videoUrl;
      video.load();
      video.play().catch(() => {});
      return;
    }

    // Non-priority: start loading src when nearby (rootMargin pre-fetches before visible)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (video.src !== reel.videoUrl) {
              video.src = reel.videoUrl;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 400px 0px 400px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reel.videoUrl, isPriority]);

  return (
    <div
      ref={containerRef}
      className="relative flex-none w-[240px] sm:w-[260px] md:w-[300px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden snap-center group shadow-lg cursor-pointer"
      style={{ backgroundImage: `url(${reel.posterUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setIsLoaded(true)}
      />

      {/* Poster visible until video ready */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white/60 border-t-white animate-spin" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {reel.title && !/^video[\s\-_]?\d+$/i.test(reel.title.trim()) && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
          <h3 className="text-white font-medium text-sm line-clamp-2">
            {reel.title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ReelItem;
