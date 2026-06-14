"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ReelData } from "./ProductReels";

interface ReelItemProps {
  reel: ReelData;
  index: number;
  onClick?: () => void;
  onAddToCart?: () => void;
  addingToCart?: boolean;
  isOutOfStock?: boolean;
  selectedSize?: string;
  customRed?: string;
}

const ReelItem = ({
  reel,
  index,
  onClick,
  onAddToCart,
  addingToCart,
  isOutOfStock,
  selectedSize,
  customRed,
}: ReelItemProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameReady, setFrameReady] = useState(false); // first frame decoded — hide poster image, reveal video
  const inViewRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Stagger the src/metadata load so videos don't all hit the network at once,
    // but load every reel up front (not just in-view ones) so its first frame
    // is ready to show as soon as it scrolls into view.
    const loadTimer = setTimeout(() => {
      if (video.src !== reel.videoUrl) {
        video.src = reel.videoUrl;
        video.load();
      }
    }, index * 300);

    const onLoadedData = () => setFrameReady(true);
    video.addEventListener("loadeddata", onLoadedData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 150px 0px 150px" }
    );
    observer.observe(container);

    return () => {
      clearTimeout(loadTimer);
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [reel.videoUrl, index]);

  return (
    <div
      ref={containerRef}
      className="relative flex-none w-[240px] sm:w-[260px] md:w-[300px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden snap-center group shadow-lg cursor-pointer bg-stone-200"
      onClick={onClick}
    >
      {/* Poster — hidden once the video's own first frame has decoded */}
      {reel.posterUrl && (
        <img
          src={reel.posterUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${frameReady ? "opacity-0" : "opacity-100"}`}
          loading={index === 0 ? "eager" : "lazy"}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}

      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${frameReady ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {reel.title && !/^video[\s\-_]?\d+$/i.test(reel.title.trim()) && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10 pointer-events-none">
          <h3 className="text-white font-medium text-sm line-clamp-2 drop-shadow">
            {reel.title}
          </h3>
        </div>
      )}

      
    </div>
  );
};

export default ReelItem;
