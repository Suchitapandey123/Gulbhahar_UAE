"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

// Season mapping for filtering (maps display names to your data structure)
const seasonMapping = {
  "casual juttis": "summer",
  "festive collection": "winter", 
  "designer collection": "fall",
  "designed by monica": "designed by monica",
  "spring": "spring",
  "all": "all"
};

export default function CollectionsPage({collections}) {
  const [selectedSeason, setSelectedSeason] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Updated filtering logic to handle the mapping
  const filteredCollections = selectedSeason === "all"
    ? collections
    : collections.filter(collection => {
        const mappedSeason = seasonMapping[selectedSeason] || selectedSeason;
        return collection.season === mappedSeason;
      });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: { scale: 0.95 }
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
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8 py-8"
    >
      {/* Header Section */}
      <motion.div 
        variants={headerVariants}
        className="flex justify-between items-center mb-12"
      >
        <motion.h1 
          className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          COLLECTIONS
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Link href="/collections">
            <motion.button 
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase group"
            >
              Show More
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={isInView ? { x: 2, y: -1 } : { x: 0, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <ArrowUpRight size={32} />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        variants={filterVariants}
        className="overflow-x-auto scrollbar-hide lg:mb-10 mb-5"
      >
        <div className="flex gap-2 lg:gap-3 font-raleway min-w-max px-1">
          {seasons.map((season, index) => (
            <motion.button
              key={season}
              onClick={() => setSelectedSeason(season)}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.05 + 0.2 }
              } : { opacity: 0, y: 10 }}
              className={`
                relative px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 
                text-xs sm:text-sm lg:text-base font-medium
                rounded-md border-2 transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                whitespace-nowrap flex-shrink-0
                ${selectedSeason === season
                  ? "bg-black text-white border-black shadow-md" 
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              <motion.span
                className="relative z-10"
                animate={{
                  scale: selectedSeason === season ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {season !== "all" ? `${season.toUpperCase()}` : season.toUpperCase()}
              </motion.span>
              
              {/* Selection indicator */}
              {selectedSeason === season && (
                <motion.div
                  layoutId="activeButton"
                  className="absolute inset-0 bg-black rounded-md -z-10"
                  initial={false}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Collections Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedSeason}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredCollections.slice(0,8).map((collection, index) => (
            <motion.div
              key={`${collection.productId}-${selectedSeason}`}
              variants={cardVariants}
              layout
              className="group w-full"
            >
              <Link href={`/collections/${collection.productId}`}>
                <motion.div 
                  className="space-y-3 cursor-pointer relative"
                  whileHover={{ 
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image Container - Optimized for above sm */}
                  <motion.div 
                    className="relative overflow-hidden w-full aspect-[3/4]"
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="relative w-full h-full"
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut" 
                      }}
                    >
                      <Image
                        src={getSafeImageUrl(collection)}
                        alt={`${collection.name} - collection image`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black"
                      />
                    </motion.div>

                    {/* Hover Indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ArrowUpRight size={16} className="text-black" />
                    </motion.div>
                  </motion.div>

                  {/* Product Info */}
                  <motion.div 
                    className="space-y-1 text-center px-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.25, 
                      delay: index * 0.05 + 0.15 
                    }}
                  >
                    <motion.p 
                      className="text-sm sm:text-base lg:text-lg font-sans text-black duration-300 line-clamp-2"
                      transition={{ duration: 0.2 }}
                    >
                      {collection.name?.toUpperCase() || "PRODUCT NAME"}
                    </motion.p>
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-700 font-medium"
                      transition={{ duration: 0.2 }}
                    >
                      ₹ {collection.price?.toLocaleString() || "0"}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center py-24 px-6 relative"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="mx-auto mb-8 w-32 h-32 relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg"
            >
              <motion.svg
                animate={{ 
                  scale: [1, 1.1, 1],
                  transition: { duration: 3, repeat: Infinity }
                }}
                className="w-16 h-16 text-gray-400"
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
              </motion.svg>
            </motion.div>
            
            {/* Floating particles */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                x: [5, -5, 5],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-2 -right-2 w-3 h-3 bg-red-200 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                x: [-3, 3, -3],
                transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-1 -left-3 w-2 h-2 bg-blue-200 rounded-full opacity-40"
            />
            <motion.div
              animate={{
                y: [-5, 15, -5],
                x: [8, -8, 8],
                transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-8 -right-4 w-2 h-2 bg-yellow-200 rounded-full opacity-50"
            />
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <motion.h3
              animate={{ 
                opacity: [0.8, 1, 0.8],
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-3xl font-bold text-gray-800 font-raleway tracking-wide"
            >
              No Collections Found
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 font-raleway max-w-md mx-auto leading-relaxed"
            >
              We couldn't find any collections for{" "}
              <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                {selectedSeason}
              </span>{" "}
              right now.
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              onClick={() => setSelectedSeason("all")}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-raleway"
            >
              Browse All Collections
            </motion.button>
          </motion.div>

          {/* Suggestion Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 pt-8 border-t border-gray-100"
          >
            <p className="text-sm text-gray-500 font-raleway">
              Try browsing other collections or{" "}
              <span className="text-red-500 hover:text-red-600 cursor-pointer underline">
                contact us
              </span>{" "}
              for special requests
            </p>
          </motion.div>

          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute -top-10 -left-10 w-20 h-20 border border-gray-100 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                transition: { duration: 25, repeat: Infinity, ease: "linear" }
              }}
              className="absolute -bottom-5 -right-5 w-16 h-16 border border-gray-100 rounded-full opacity-20"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}