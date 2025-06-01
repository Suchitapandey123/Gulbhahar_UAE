"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const NewCollection = ({ newCollection }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Helper function to get safe image URL
  const getSafeImageUrl = (product) => {
    try {
      return product?.images?.[0]?.[0] || '/assets/Image/fallback.jpg';
    } catch {
      return '/assets/Image/fallback.jpg';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const backgroundNumberVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Premium fashion-inspired animations
  const getCardVariants = (index) => {
    return {
      hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.8,
        filter: "blur(10px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom bezier curve
          delay: index * 0.15,
          scale: {
            type: "spring",
            damping: 20,
            stiffness: 100
          }
        },
      },
    };
  };

  const mainImageVariants = {
    initial: { 
      scale: 1,
      filter: "brightness(1)"
    },
    hover: {
      scale: 1.05,
      filter: "brightness(1.05)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative py-6 md:py-16 px-4 md:px-8 overflow-hidden"
    >
      {/* Animated Background "25" */}
      <motion.div
        variants={backgroundNumberVariants}
        className="absolute right-64 -top-28 z-0 opacity-1 pointer-events-none select-none pr-8 hidden lg:block"
      >
        <motion.div
          animate={{
            rotate: [0, 2, -2, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(245,223,164,0.75)]"
        >
          25
        </motion.div>
      </motion.div>

      {/* Animated Background "20" */}
      <motion.div
        variants={backgroundNumberVariants}
        className="absolute left-64 -bottom-40 z-0 opacity-1 pointer-events-none select-none hidden lg:block"
      >
        <motion.div
          animate={{
            rotate: [0, -2, 2, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(162,144,49,0.2)]"
        >
          20
        </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Animated Section heading with "SEE MORE" button */}
        <motion.div
          variants={headerVariants}
          className="flex justify-between items-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway"
          >
            NEW COLLECTION
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/Collections"
              className="flex items-center hover:text-[#8B0000] transition-colors group"
            >
              <span className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase  group">
                SEE MORE
              </span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <ArrowUpRight className="size-6 md:size-8 lg:size-10 xl:size-12 ml-2 md:ml-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grid with Entry Animations Only */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {newCollection
            ?.filter((product) => product?.images && product.images.length > 0)
            .slice(0, 6)
            .map((product, index) => (
              <motion.div
                key={product.productId}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                  filter: "blur(10px)"
                }}
                animate={isInView ? { 
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)"
                } : {
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                  filter: "blur(10px)"
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.15,
                  scale: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                  }
                }}
                className="product-card relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 w-full overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden w-full aspect-[3/4]">
                  <Image
                    src={getSafeImageUrl(product)}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                    priority={index < 4}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Simple overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300" />
                </div>

                {/* Product details */}
                <div className="p-2 sm:p-4 text-center">
                  <div className="text-sm sm:text-lg md:text-xl font-oldstandardtt font-[400] mb-1">
                    ₹ {product.price?.toLocaleString() || "0"}
                  </div>
                  <div className="text-xs sm:text-base md:text-lg font-oldstandardtt font-[400] line-clamp-2">
                    {product.name?.toUpperCase() || "PRODUCT NAME"}
                  </div>
                </div>

                {/* Clickable link overlay */}
                <Link href={`/collections/${product.productId}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {product.name}</span>
                </Link>

                {/* Simple hover indicator */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 rounded-full p-1 sm:p-2 shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="size-3 sm:size-4 text-[#8B0000]" />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default NewCollection;