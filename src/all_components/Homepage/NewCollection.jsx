"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const NewCollection = ({ newCollection }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const {data : session} = useSession();
  // // console.log("Session Data Token:", session);
  // // console.log("Backend Token:", session)

  // Helper function to get safe image URL
  const getSafeImageUrl = (product) => {
    try {
      return product?.images?.[0]?.[0] || '/assets/Image/fallback.jpg';
    } catch {
      return '/assets/Image/fallback.jpg';
    }
  };

  // Enhanced animation variants with cinematic timing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };

  const backgroundNumberVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: -15,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 1.5 },
        scale: { 
          type: "spring", 
          damping: 25, 
          stiffness: 80,
          duration: 2.2
        },
        filter: { duration: 1.8 }
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
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
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative py-6 md:py-16 overflow-visible "
    >
      {/* Enhanced Animated Background "25" */}
      <motion.div
        variants={backgroundNumberVariants}
        className="absolute right-64 -top-28 z-0 opacity-1 pointer-events-none select-none pr-8 hidden lg:block"
      >
        <motion.div
          animate={{
            rotate: [0, 2, -2, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(245,223,164,0.75)]"
        >
          25
        </motion.div>
      </motion.div>

      {/* Enhanced Animated Background "20" */}
      <motion.div
        variants={backgroundNumberVariants}
        className="absolute left-64 -bottom-[130px] z-0 opacity-1 pointer-events-none select-none hidden lg:block"
      >
        <motion.div
          animate={{
            rotate: [0, -2, 2, 0],
            scale: [1, 1.005, 1],
            filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(162,144,49,0.2)]"
        >
          20
        </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto overflow-x-hidden px-2 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Collections Style */}
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
            NEW COLLECTION
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
                SEE MORE
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

        {/* Collections Grid - Using Collections UI Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key="new-collection"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {newCollection
              .slice(0,8)
              .map((product, index) => (
                <motion.div
                  key={`${product.productId}-new-collection`}
                  variants={cardVariants}
                  layout
                  className="group w-full"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Link href={`/products/${product.productId}`}>
                    <motion.div 
                      className="space-y-3 cursor-pointer relative"
                      whileHover={{ 
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Image Container - Collections Style */}
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
                            src={getSafeImageUrl(product)}
                            alt={`${product.name} - collection image`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            priority={index < 2}
                            loading={index < 2 ? undefined : "lazy"}
                            quality={70}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />


                          // New Arrival Badge 
                          {(index === 0) && (
                        <div className="absolute top-0 right-0 z-10">
                          <div className="relative">
                            {/* Animated glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#7b1e28] to-[#4a0f14] rounded-lg blur-sm animate-pulse opacity-75"></div>

                            {/* Main badge */}
                            <span className="relative flex items-center gap-1 bg-gradient-to-r from-[#7b1e28] via-[#8b2632] to-[#4a0f14] text-white text-xs sm:text-sm font-semibold px-2 sm:px-2 py-1 sm:py-1 rounded-g shadow-lg border border-white/20">
                              {/* Sparkle icon */}
                              <span className="text-yellow-300 animate-pulse">
                                ✨
                              </span>
                              <span className="tracking-wide">NEW ARRIVAL</span>
                              <span className="text-yellow-300 animate-pulse">
                                ✨
                              </span>
                            </span>

                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg animate-shine"></div>
                          </div>
                        </div>
                      )}
                          
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
                          animate={hoveredCard === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                        >
                          <ArrowUpRight size={16} className="text-black" />
                        </motion.div>
                      </motion.div>

                      {/* Product Info - Collections Style */}
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
                          {product.name?.toUpperCase() || "PRODUCT NAME"}
                        </motion.p>
                        <motion.p 
                          className="text-xs sm:text-sm text-gray-700 font-medium"
                          transition={{ duration: 0.2 }}
                        >
                          ₹ {product.price?.toLocaleString() || "0"}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State - Collections Style */}
        {(!newCollection || newCollection.length === 0) && (
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
                  className="w-16 h-16  text-gray-400"
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
                No New Collections Found
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 font-raleway max-w-md mx-auto leading-relaxed"
              >
                Check back soon for exciting new arrivals and collections.
              </motion.p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <Link href="/collections">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-raleway"
                >
                  Browse All Collections
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default NewCollection;