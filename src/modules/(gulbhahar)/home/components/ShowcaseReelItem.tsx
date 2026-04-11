"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ReelData {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

const ShowcaseReelItem = ({ reel, onClick }: { reel: ReelData; onClick?: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted] = useState(true);

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
      className="relative flex-none w-[300px] md:w-[380px] aspect-[9/16] rounded-2xl overflow-hidden snap-center group cursor-pointer"
      style={{
        backgroundImage: `url(${reel.thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        poster={reel.thumbnailUrl}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="none"
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
            <Play className="text-white fill-white" size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowcaseReelItem;
