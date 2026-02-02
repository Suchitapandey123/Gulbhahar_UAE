"use client";

import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ReelData } from "./ProductReels";

interface ReelItemProps {
  reel: ReelData;
}

const ReelItem = ({ reel }: ReelItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex-none w-[240px] sm:w-[260px] md:w-[300px] aspect-[9/16] bg-neutral-900 rounded-xl md:rounded-2xl overflow-hidden snap-center group shadow-lg"
    >
      {/* Poster fallback - always visible until video loads */}
      <Image
        src={reel.posterUrl}
        alt={reel.title}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 300px"
        priority={reel.id <= 2}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsVideoLoaded(true)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Title overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10">
        <h3 className="text-white font-medium text-sm line-clamp-2">
          {reel.title}
        </h3>
        {reel.description && (
          <p className="text-white/70 text-xs mt-1 line-clamp-1">
            {reel.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReelItem;
