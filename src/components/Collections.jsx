"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collections } from "../data/collections";
import ArrowVector from "./ui/ArrowVector";

const seasons = [
  "ALL",
  "FALL 2024",
  "WINTER 2024",
  "SPRING 2024",
  "SPRING SUMMER 2024",
];

export default function CollectionsPage() {
  const [selectedSeason, setSelectedSeason] = useState("ALL");

  const filteredCollections =
    selectedSeason === "ALL"
      ? collections
      : collections.filter(
          (collection) => collection.season === selectedSeason
        );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl lg:text-5xl sm:text-4xl lg:mt-16 font-bold text-customRed font-raleway">
          COLLECTIONS
        </h1>
        <Link href="/collection">
          <button className="flex items-center lg:gap-5  text-gray-900 hover:text-gray-600 lg:text-2xl transition-colors font-raleway  tracking-wider lg:w-[215] lg:h-[33px] uppercase text-lg">
            Visit shop
            <ArrowVector className="lg:w-[20px] lg:h-[20px mb-4" />
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap lg:space-x-5 gap-2 font-raleway lg:mb-10 mb-5">
        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => setSelectedSeason(season)}
            className={`px-4 py-2 lg:w-[210px] text-sm rounded-md shadow-md border  lg:h-[44px] border-black break-words font-raleway lg:text-[14px] transition-colors text-[12px] outline outline-black 
              ${
                selectedSeason === season
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
          >
            {season}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="space-y-3">
            <div className="relative overflow-hidden">
              <Image
                src={collection.image || null}
                // alt={collection.title}
                alt="collection image"
                width={307.54}
                height={446.13}
                className="object-cover"
              />
            </div>
            <div className="space-y-1 px-2">
              <p className="font-old-standard font-[28px]">
                ₹ {collection.price.toLocaleString()}
              </p>
              <p className="text-[28px] text-black font-bold font-old-standard">
                {collection.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
