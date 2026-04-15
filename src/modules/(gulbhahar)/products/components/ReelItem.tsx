"use client";

import { useEffect, useRef } from "react";
import { ReelData } from "./ProductReels";

interface ReelItemProps {
  reel: ReelData;
  index: number;
  onClick?: () => void;
}

const ReelItem = ({ reel, index, onClick }: ReelItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPriority = index <= 1;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // First 2 videos - load immediately
    if (isPriority) {
      video.src = reel.videoUrl;
      video.load();
      video.play().catch(() => {});
      return;
    }

    // Rest - lazy load via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = reel.videoUrl;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
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
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop
        playsInline
        preload={isPriority ? "auto" : "none"}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Title overlay at bottom */}
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
