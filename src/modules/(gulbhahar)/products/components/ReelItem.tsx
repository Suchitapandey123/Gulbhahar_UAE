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
  const [isPlaying, setIsPlaying] = useState(false);
  const isPriority = index <= 1;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    setIsPlaying(false);

    const mobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (mobile) {
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
        { threshold: 0.4, rootMargin: "0px 200px 0px 200px" }
      );
      observer.observe(container);
      return () => observer.disconnect();
    }

    // Desktop priority — load and play immediately
    if (isPriority) {
      video.src = reel.videoUrl;
      video.load();
      video.play().catch(() => {});
      return;
    }

    // Desktop non-priority — lazy via IntersectionObserver
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
      { threshold: 0.3, rootMargin: "0px 100px 0px 100px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [reel.videoUrl, isPriority]);

  const mobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      ref={containerRef}
      className="relative flex-none w-[240px] sm:w-[260px] md:w-[300px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden snap-center group shadow-lg cursor-pointer bg-stone-200"
      onClick={onClick}
    >
      {/* Poster — shows immediately; bg-stone-200 is the fallback while it loads */}
      {reel.posterUrl && (
        <img
          src={reel.posterUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading={isPriority ? "eager" : "lazy"}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}

      {/* Video fades in once playing, covering the poster */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload={!mobile && isPriority ? "auto" : "metadata"}
        onPlaying={() => setIsPlaying(true)}
      />

      {reel.title && !/^video[\s\-_]?\d+$/i.test(reel.title.trim()) && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
          <h3 className="text-white font-medium text-sm line-clamp-2 drop-shadow">
            {reel.title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default ReelItem;
