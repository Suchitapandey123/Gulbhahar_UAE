"use client";

import { useState } from "react";
import HorizontalCarousel from "../../../../shared-components/Scrollbar/HorizontalCarousel";
import FullscreenReelViewer from "../../common/FullscreenReelViewer";
import { VideosOption } from "../types";
import ReelItem from "./ReelItem";

export interface ReelData {
  videoUrl: string;
  posterUrl: string;
  title: string;
  description?: string;
}
interface ProductReelsProps {
  videos: VideosOption[];
}

// Reels data - can be fetched from API/CMS in production
const PRODUCT_REELS: ReelData[] = [
  {
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/11.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
    title: "Handcrafted with Love",
    description: "Every stitch tells a story",
  },
  {
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/14.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
    title: "The Art of Embroidery",
    description: "Traditional techniques, modern elegance",
  },
  {
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/13.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
    title: "Colors of Heritage",
    description: "Inspired by India's rich culture",
  },
  {
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/stories-in-motion/12.mp4",
    posterUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/juttis.webp",
    title: "From Artisan to You",
    description: "A journey of craftsmanship",
  },
];

export default function ProductReels({ videos }: ProductReelsProps) {
  const flatVideos = videos?.flat() ?? [];
  const reels = flatVideos.length > 0 ? flatVideos : PRODUCT_REELS;
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <section className="mt-8  overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-[#800000]/40" />
        <span className="text-[#800000] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
          Watch More
        </span>
        <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-[#800000]/40" />
      </div>

      {/* Reels scroll container */}
      <div className=" mt-8 relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-12 w-6 md:w-12 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-12 w-6 md:w-12  z-10 pointer-events-none" />

        <HorizontalCarousel className="flex 2xl:pl-10 justify-start 2xl:justify-center overflow-x-auto gap-3 md:gap-5 pb-4 snap-x snap-mandatory">
          {reels.map((reel, idx) => (
            <ReelItem
              key={idx}
              reel={reel}
              index={idx}
              onClick={() => setFullscreenIndex(idx)}
            />
          ))}
          {/* End spacing */}
          <div className="flex-none w-4 md:w-8" />
        </HorizontalCarousel>
      </div>

      {/* Fullscreen viewer */}
      {fullscreenIndex !== null && (
        <FullscreenReelViewer
          reels={reels}
          initialIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </section>
  );
}
