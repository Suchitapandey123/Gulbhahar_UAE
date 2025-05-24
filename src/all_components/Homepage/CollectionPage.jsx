"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image1 from "../../../public/assets/Image/C2.png";
import { ArrowUpRight } from "lucide-react";

const seasons = [
  "ALL",
  "FALL 2024",
  "WINTER 2024",
  "SPRING 2024",
  "SPRING SUMMER 2024",
];

export const collections = [
  {
    id: 1,
    title: 'Noorani (Jutti)',
    price: 2000,
    season: 'FALL 2024',
    image: Image1
  },
  {
    id: 2,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'WINTER 2024',
    image: Image1
  },
  {
    id: 3,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'SPRING 2024',
    image: Image1
  },
  {
    id: 4,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'SPRING SUMMER 2024',
    image: Image1
  },
  {
    id: 5,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'FALL 2024',
    image: Image1
  },
  {
    id: 6,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'WINTER 2024',
    image: Image1
  },
  {
    id: 7,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'SPRING 2024',
    image: Image1
  },
  {
    id: 8,
    title: 'Noorani (Jutti)',
    price: 5000,
    season: 'SPRING SUMMER 2024',
    image: Image1
  },
];

export default function CollectionsPage() {
  const [selectedSeason, setSelectedSeason] = useState("ALL");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredCollections = selectedSeason === "ALL"
    ? collections
    : collections.filter(collection => collection.season === selectedSeason);

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

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
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
          <Link href="/Collections">
            <motion.button 
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase  group"
            >
              Visit shop
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
                text-xs sm:text-sm lg:text-base font-raleway font-medium
                rounded-md border-2 transition-all duration-300 ease-out
                hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0
                whitespace-nowrap flex-shrink-0
                ${selectedSeason === season
                  ? "bg-black text-white border-black shadow-md" 
                  : "bg-white text-black border-gray-300  hover:bg-gray-50"
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
                {season}
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
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2"
        >
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={`${collection.id}-${selectedSeason}`}
              variants={cardVariants}
              layout
              className="group"
            >
              <Link href={`/Collections/${collection.id}`}>
                <motion.div 
                  className="space-y-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Image Container */}
                  <motion.div 
                    className="relative overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="relative"
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut" 
                      }}
                    >
                      <Image
                        src={collection.image}
                        alt="collection image"
                        width={307.54}
                        priority
                        height={446.13}
                        className="object-cover w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Product Info */}
                  <motion.div 
                    className="space-y-1 px-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.25, 
                      delay: index * 0.05 + 0.15 
                    }}
                  >
                    <motion.p 
                      className="font-oldstandardtt font-[400] text-[20px] text-gray-700"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      ₹ {collection.price.toLocaleString()}
                    </motion.p>
                    
                    <motion.p 
                      className="text-[16px] md:text-[22px] text-black font-oldstandardtt font-[700] group-hover:text-customRed transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {collection.title}
                    </motion.p>
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
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Loading State for Empty Results */}
      {filteredCollections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.p 
            className="text-xl text-gray-500 font-raleway"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            No collections found for {selectedSeason}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}