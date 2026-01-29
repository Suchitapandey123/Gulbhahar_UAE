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
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/1.mp4",
    title: "The Art of Zardozi",
  },
  {
    id: 2,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/2.mp4",
    title: "Handloom Heritage",
  },
  {
    id: 3,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/3.mp4",
    title: "Mastering Silk",
  },
  {
    id: 4,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/4.mp4",
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
      <div className="absolute inset-0 opacity-0  transition-opacity duration-300" />

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

    </div>
  );
};

export default function Home_OurShowcase() {
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

      <div className="flex justify-start md:justify-center overflow-x-auto gap-6  no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
        {CULTURAL_REELS.map((reel) => (
          <ReelItem key={reel.id} reel={reel} />
        ))}
        {/* Placeholder for spacing at the end */}
        <div className="flex-none w-1" />
      </div>
    </section>
  );
}
