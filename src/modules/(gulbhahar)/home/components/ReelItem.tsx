"use client";

import { Play } from "lucide-react";
import Image from "next/image";
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
  const [isMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set src only when first visible — zero network cost until scrolled here
            if (!video.src) {
              video.src = reel.videoUrl;
              video.load();
            }
            video.play().catch(() => setHasError(true));
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reel.videoUrl]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => setHasError(true));
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="relative flex-none w-[280px] sm:w-[300px] md:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden snap-center group shadow-lg"
      style={{
        background: `url(${reel.posterUrl}) center/cover no-repeat, linear-gradient(135deg, #7a4a2a 0%, #5c3018 100%)`,
      }}
    >
      {/* Poster fallback */}
      <Image
        src={reel.posterUrl}
        alt={reel.title}
        fill
        unoptimized
        className={`object-cover transition-opacity duration-500 ${
          isLoaded && !hasError ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 340px"
        priority={reel.id <= 2}
        loading={reel.id <= 2 ? undefined : "lazy"}
      />

      {/* Video */}
      <video
        ref={videoRef}
        poster={`${reel.videoUrl}#t=0.1`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

      {/* Play button overlay (when paused or error) */}
      {(!isPlaying || hasError) && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 flex items-center justify-center z-10"
          aria-label="Play video"
        >
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/20 transition-transform hover:scale-110">
            <Play className="text-white fill-white" size={28} />
          </div>
        </button>
      )}

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