"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HorizontalCarousel from "@/shared-components/Scrollbar/HorizontalCarousel";
import ShowcaseReelItem from "./components/ShowcaseReelItem";

const FullscreenReelViewer = dynamic(() => import("../common/FullscreenReelViewer"), { ssr: false });
import { StoryInMotionItem } from "@/types/home.types";


interface OurShowcaseProps {
  StoriesInMotion : StoryInMotionItem[]
}



export default function Home_OurShowcase({StoriesInMotion} :  OurShowcaseProps) {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const fullscreenReels = StoriesInMotion.map((r) => ({
    videoUrl: r.videoUrl,
    title: r.title,
  }));

  return (
    <section className="bg-white py-5 overflow-hidden">
      {/* Header */}
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
         Experience our handcrafted ethnic wear looks on every occasion get inspired by real looks &, real style!
        </p>
      </div>

      {/* Reels carousel */}
      <HorizontalCarousel className="flex 2xl:pl-10 justify-start 2xl:justify-center overflow-x-auto gap-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-8">
        {StoriesInMotion.map((reel, idx) => (
          <ShowcaseReelItem
            key={reel.id}
            reel={reel}
            onClick={() => setFullscreenIndex(idx)}
          />
        ))}
        <div className="flex-none w-1" />
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
}
