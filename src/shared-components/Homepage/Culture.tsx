"use client";

import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ReelData {
  id: number;
  videoUrl: string;
  title: string;
}

const CULTURAL_REELS: ReelData[] = [
  {
    id: 1,
    videoUrl:
      "https://cdn.shopify.com/s/files/1/0571/3061/4946/files/whatmore_tn_a3e7a6cc-df61-480e-b38b-500c13fd5987.mp4?v=1767002247",
    title: "The Art of Zardozi",
  },
  {
    id: 2,
    videoUrl:
      "https://cdn.shopify.com/s/files/1/0571/3061/4946/files/whatmore_tn_6b784aa5-feee-41a7-a41e-77213673b62d.mp4?v=1767001186",
    title: "Handloom Heritage",
  },
  {
    id: 3,
    videoUrl:
      "https://cdn.shopify.com/s/files/1/0571/3061/4946/files/whatmore_tn_757946df-bf0f-46da-b80a-17496534636f.mp4?v=1767001181",
    title: "Mastering Silk",
  },
  {
    id: 4,
    videoUrl:
      "https://cdn.shopify.com/s/files/1/0571/3061/4946/files/whatmore_tn_562cda96-7ef4-4f70-a5bd-826a40570211.mp4?v=1767001185",
    title: "The Craftsmanship Story",
  },
];

const ReelItem = ({ reel }: { reel: ReelData }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex-none w-[260px] md:w-[320px] aspect-[9/16] bg-neutral-100 rounded-2xl overflow-hidden snap-center group">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
            <Play className="text-white fill-white" size={24} />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsMuted(!isMuted);
          }}
          className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-white font-serif text-xl leading-tight translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 uppercase tracking-wider">
          {reel.title}
        </h3>
      </div>
    </div>
  );
};

export default function Culture() {
  return (
    <section className="bg-white py-5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto mb-4">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-customRed text-xs font-bold tracking-[0.4em] uppercase">
              Gulbhahar Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl text-center font-serif text-[#1a1a1a] leading-tight">
            Stories{" "}
            <span className="italic text-customRed serif-italics">
              in Motion
            </span>
          </h2>
        </div>
        <p className="text-center text-gray-500 max-w-2xl mx-auto font-light text-base md:text-lg">
          Experience our artisanal journey in motion. From the first stitch to
          the final embellishment, witness the soul of Gulbhahar.
        </p>
      </div>

      <div className="flex overflow-x-auto gap-6  no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
        {CULTURAL_REELS.map((reel) => (
          <ReelItem key={reel.id} reel={reel} />
        ))}
        {/* Placeholder for spacing at the end */}
        <div className="flex-none w-1" />
      </div>
    </section>
  );
}
