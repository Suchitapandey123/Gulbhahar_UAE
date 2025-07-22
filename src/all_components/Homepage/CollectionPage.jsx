"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Updated seasons array with your custom names
const seasons = [
  "all",
  "designed by monica",
  "casual juttis",        // Changed from "summer"
  "festive collection",   // Changed from "winter"
  "designer collection",  // Changed from "fall"
  // "spring",
];


export default function CollectionsPage({collections}) {
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Simple intersection observer without framer motion
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Updated filtering logic to handle the mapping
  const filteredCollections = selectedSeason === "all"
    ? collections
    : collections.filter(collection => {
        const mappedSeason = seasons[selectedSeason] || selectedSeason;
        return collection.season === mappedSeason;
      });

  // Minimal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Helper function to get safe image URL
  const getSafeImageUrl = (collection) => {
    try {
      return collection?.images?.[0]?.[0] || '/assets/Image/fallback.jpg';
    } catch {
      return '/assets/Image/fallback.jpg';
    }
  };

  return (
    <div
      ref={ref}
      className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8 py-8"
    >
      {/* Header Section - No animations */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway">
          COLLECTIONS
        </h1>
        
        <Link href="/collections">
          <button className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase group">
            Show More
            <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
              <ArrowUpRight size={32} />
            </div>
          </button>
        </Link>
      </div>

      {/* Filter Buttons - Simplified */}
      <div className="overflow-x-auto scrollbar-hide lg:mb-10 mb-5">
        <div className="flex gap-2 lg:gap-3 font-raleway min-w-max px-1">
          {seasons.map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`
                relative px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 
                text-xs sm:text-sm lg:text-base font-medium
                rounded-md border-2 transition-all duration-200 ease-out
                hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
                whitespace-nowrap flex-shrink-0
                ${selectedSeason === season
                  ? "bg-black text-white border-black shadow-md" 
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {season !== "all" ? `${season.toUpperCase()}` : season.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Collections Grid - Only animate on filter change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSeason}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredCollections.slice(0,8).map((collection, index) => (
            <motion.div
              key={`${collection.productId}-${selectedSeason}`}
              variants={itemVariants}
              className="group w-full"
            >
              <Link href={`/collections/${collection.productId}`}>
                <div className="space-y-3 cursor-pointer">
                  {/* Image Container - Pure CSS animations */}
                  <div className="relative overflow-hidden w-full aspect-[3/4] rounded-lg">
                    <Image
                      src={getSafeImageUrl(collection)}
                      alt={`${collection.name} - collection image`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Hover Indicator */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform scale-90 group-hover:scale-100">
                      <ArrowUpRight size={16} className="text-black" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1 text-center px-1">
                    <p className="text-sm sm:text-base lg:text-lg font-sans text-black line-clamp-2">
                      {collection.name?.toUpperCase() || "PRODUCT NAME"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium">
                      ₹ {collection.price?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State - Static */}
      {filteredCollections.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-24 px-6">
          <div className="mx-auto mb-8 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 font-raleway">
              No Collections Found
            </h3>
            
            <p className="text-lg text-gray-600 font-raleway max-w-md mx-auto">
              We couldn't find any collections for{" "}
              <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                {selectedSeason}
              </span>{" "}
              right now.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setSelectedSeason("all")}
              className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 font-raleway"
            >
              Browse All Collections
            </button>
          </div>
        </div>
      )}
    </div>
  );
}