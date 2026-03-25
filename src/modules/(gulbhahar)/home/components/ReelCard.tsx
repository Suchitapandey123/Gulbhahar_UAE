"use client";
import { Eye, Play, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ReelData {
  id: number;
  videoUrl: string;
  title: string;
  slug: string;
  product: {
    name: string;
    price: string;
    image: string;
  };
}

const ReelCard = ({ reel }: { reel: ReelData }) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewCount, setViewCount] = useState<string | null>(null);

  useEffect(() => {
    setViewCount((Math.random() * (25 - 1.5) + 1.5).toFixed(1) + "k");
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current
              ?.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex-none w-[300px] sm:w-[380px] aspect-[9/16] overflow-hidden group bg-gradient-to-br from-neutral-900 to-black">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Play Indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-5 rounded-full bg-white/20 backdrop-blur-md animate-pulse">
            <Play className="text-white fill-white" size={32} />
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span className="text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            <Eye size={12} className="text-white" />
            {viewCount} Views
          </span>
        </div>
      </div>

      {/* Reel Info */}
      <div className="absolute bottom-4 left-4 right-4 space-y-4">
        <div>
          <h3 className="text-white font-serif text-2xl leading-tight mb-1 group-hover:translate-y-[-4px] transition-transform duration-500">
            {reel.title}
          </h3>
          <p className="text-white/60 text-xs font-medium tracking-wide">
            Featured Collection
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/${reel.slug}`);
          }}
          className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#800000] hover:text-white transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-xl active:scale-[0.98]"
        >
          <Store
            size={15}
            className="group-hover/btn:scale-110 transition-transform"
          />
          Visit Collection
        </button>
      </div>
    </div>
  );
};

export default ReelCard;
