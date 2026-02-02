"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
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
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
  }, []);

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
    <div className="relative flex-none w-[280px] sm:w-[300px] md:w-[340px] aspect-[9/16] bg-neutral-900 rounded-2xl overflow-hidden snap-center group shadow-lg">
      {/* Poster fallback */}
      <Image
        src={reel.posterUrl}
        alt={reel.title}
        fill
        className={`object-cover transition-opacity duration-500 ${
          isLoaded && !hasError ? "opacity-0" : "opacity-100"
        }`}
        sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 340px"
        priority={reel.id <= 2}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        }`}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
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

      {/* Mute/Unmute button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 transition-colors hover:bg-black/50"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

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