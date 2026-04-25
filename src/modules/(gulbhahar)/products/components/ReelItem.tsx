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
  const [hasStarted, setHasStarted] = useState(false); // once true, never false — keeps last frame visible during buffer
  const inViewRef = useRef(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const isMobile = window.innerWidth < 768;

    // Attempt play only when BOTH in-view AND enough data buffered
    const tryPlay = () => {
      if (inViewRef.current && readyRef.current) {
        video.play().catch(() => {});
      }
    };

    const onCanPlay = () => {
      readyRef.current = true;
      tryPlay();
    };

    video.addEventListener("canplay", onCanPlay);

    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            inViewRef.current = entry.isIntersecting;
            if (entry.isIntersecting) {
              if (video.src !== reel.videoUrl) {
                video.src = reel.videoUrl;
                video.load();
              }
              tryPlay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5, rootMargin: "0px 150px 0px 150px" }
      );
      observer.observe(container);
      return () => {
        observer.disconnect();
        video.removeEventListener("canplay", onCanPlay);
      };
    }

    // Desktop: stagger the src load so all 5-6 videos don't hit network simultaneously
    const loadTimer = setTimeout(() => {
      if (video.src !== reel.videoUrl) {
        video.src = reel.videoUrl;
        video.load();
      }
    }, index * 500);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    return () => {
      clearTimeout(loadTimer);
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [reel.videoUrl, index]);

  return (
    <div
      ref={containerRef}
      className="relative flex-none w-[240px] sm:w-[260px] md:w-[300px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden snap-center group shadow-lg cursor-pointer bg-stone-200"
      onClick={onClick}
    >
      {/* Poster — hidden once video has started (video's last frame shows during buffering) */}
      {reel.posterUrl && (
        <img
          src={reel.posterUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hasStarted ? "opacity-0" : "opacity-100"}`}
          loading={index === 0 ? "eager" : "lazy"}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hasStarted ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setHasStarted(true)}
        // Do NOT hide on pause — keeps last frame visible during buffer waits
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
