"use client";

import { useState } from "react";
import HorizontalCarousel from "@/shared-components/Scrollbar/HorizontalCarousel";
import FullscreenReelViewer from "../common/FullscreenReelViewer";
import ReelCard from "./components/ReelCard";
import { WatchAndShopItem } from "@/types/home.types";


interface WatchAndShopDataProps {
  WatchAndShopData : WatchAndShopItem[]
}

const Home_WatchAndShop = ({WatchAndShopData} : WatchAndShopDataProps) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);



  const fullscreenReels = WatchAndShopData.map((r) => ({
    videoUrl: r.videoUrl,
    title: r.title,
  }));
  return (
    <section className="overflow-hidden mt-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 justify-center mb-6">
        <div className="flex justify-center items-center gap-3">
          <span className="w-16 h-px bg-[#800000]" />
          <span className="text-[#800000] text-[11px] font-bold tracking-[0.4em] uppercase">
            Gulbhahar Studio
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl text-center font-serif text-[#1a1a1a] leading-[1.1]">
          Watch <span className="italic text-[#800000] serif-italics">&</span>{" "}
          Shop
        </h2>

        <p className="text-gray-500 text-center text-base md:text-lg leading-relaxed font-light">
          Experience our latest silhouettes in motion. Every thread tells a
          story of heritage, now just a tap away.
        </p>
      </div>

      {/* Reels carousel */}
      <HorizontalCarousel className="flex overflow-x-auto gap-4 snap-x snap-proximity md:snap-mandatory cursor-grab active:cursor-grabbing pb-8">
        {WatchAndShopData.map((reel, idx) => (
          <div key={reel.id} className="snap-center" onClick={() => setFullscreenIndex(idx)}>
            <ReelCard reel={reel} />
          </div>
        ))}
        <div className="flex-none w-12" />
      </HorizontalCarousel>

      {/* Fullscreen viewer */}
      {fullscreenIndex !== null && (
        <FullscreenReelViewer
          reels={fullscreenReels}
          initialIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </section>
  );
};

export default Home_WatchAndShop;
