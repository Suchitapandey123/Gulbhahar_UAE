"use client";

import { useEffect, useRef, useState } from "react";

export interface ReelData {
  id: number;
  videoUrl: string;
  posterUrl: string;
  title: string;
  description?: string;
}

interface ReelItemProps {
  reel: ReelData;
}

const ReelItem = ({ reel }: ReelItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.src) {
              video.src = reel.videoUrl;
              video.load();
            }
            video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
            // Release decoded video memory once it's off-screen — iOS Safari
            // crashes the tab if too many <video> elements stay loaded.
            if (video.src) {
              video.removeAttribute("src");
              video.load();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reel.videoUrl]);

  return (
    <div
      className="relative flex-none w-[280px] sm:w-[300px] md:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden snap-center group shadow-lg"
      style={{
        backgroundImage: `url(${reel.posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <video
  ref={videoRef}
  poster={reel.posterUrl}
  className="absolute inset-0 w-full h-full object-cover"  // opacity-0 removed
  muted
  loop
  playsInline
  preload="none"
/>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Title overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-white font-medium text-sm md:text-base line-clamp-2">
          {reel.title}
        </h3>
        {reel.description && (
          <p className="text-white/70 text-xs md:text-sm mt-1 line-clamp-2">
            {reel.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReelItem;
