"use client";
import { Eye, Play, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ReelData {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  slug: string;
  product: {
    name: string;
    price: string;
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
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reel.videoUrl]);

  return (
    <div
      className="relative flex-none w-[300px] sm:w-[380px] aspect-[9/16] overflow-hidden group"
      style={{
        backgroundImage: `url(${reel.thumbnailUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Thumbnail — visible until video plays */}
      {reel.thumbnailUrl && (
        <img
          src={reel.thumbnailUrl}
          alt={reel.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video — opacity-0 until playing so thumbnail shows through */}
      <video
        ref={videoRef}
        poster={reel.thumbnailUrl}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
        muted={isMuted}
        loop
        playsInline
        preload="none"
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Play Indicator — shown when not yet playing */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-5 rounded-full bg-white/20 backdrop-blur-md">
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
