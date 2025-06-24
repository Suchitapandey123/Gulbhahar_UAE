"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import MB1 from "../../../public/assets/Image/006.jpg";
import MB2 from "../../../public/assets/Image/005.jpg";
import Mb3 from "../../../public/assets/Image/S-002.jpg";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Play, Volume2 } from "lucide-react";

export default function ModernHeroAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [direction, setDirection] = useState(0); // Track slide direction
  const containerRef = useRef(null);

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const heroData = [
    {
      id: 1,
      image: Mb3,
      mobileImage: Mb3,
      title: "GULBHAHAR",
      subtitle: "Heritage Reimagined",
      description: "Where traditional craftsmanship meets contemporary design",
      accent: "Spring '25",
      color: "#8B4513",
    },
    {
      id: 2,
      image: MB2,
      mobileImage: MB2,
      title: "ARTISAN",
      subtitle: "Handcrafted Excellence",
      description: "Each piece tells a story of generations of artistry",
      accent: "Limited Edition",
      color: "#DC143C",
    },
    {
      id: 3,
      image: MB1,
      mobileImage: MB1,
      title: "LEGACY",
      subtitle: "Timeless Elegance",
      description: "Preserving tradition while embracing innovation",
      accent: "Signature Collection",
      color: "#DAA520",
    },
  ];

  // Auto-advance carousel with direction tracking
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % heroData.length;
        setDirection(1); // Always slide from right to left for auto-advance
        setIsFirstLoad(false);
        return nextIndex;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, heroData.length]);

  // Proper slide transition - current exits left, next enters from right
  const slideVariants = {
    enter: (direction) => {
      // First load: elegant center fade with subtle scale
      if (isFirstLoad) {
        return {
          x: "0%",
          y: "0%",
          opacity: 0,
          scale: 1.05,
          filter: "blur(4px) brightness(0.7)",
        };
      }
      // Next image: starts from right and slides to center
      return {
        x: "100%", // Start from right
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(1)",
      };
    },
    center: {
      x: "0%",
      y: "0%", 
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: isFirstLoad ? 1.8 : 1.0,
        ease: isFirstLoad ? [0.16, 1, 0.3, 1] : [0.25, 0.46, 0.45, 0.94],
        opacity: {
          duration: isFirstLoad ? 1.4 : 1.0,
          ease: "easeOut",
        },
        x: {
          duration: isFirstLoad ? 0 : 1.0, // Slide from right to center
          ease: [0.25, 0.46, 0.45, 0.94],
        },
        scale: {
          duration: isFirstLoad ? 2.0 : 1.0,
          ease: isFirstLoad ? [0.16, 1, 0.3, 1] : "easeOut",
        },
        filter: {
          duration: isFirstLoad ? 1.6 : 1.0,
          ease: "easeOut",
        },
      },
    },
    exit: (direction) => ({
      x: "-100%", // Current image slides to left
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      transition: {
        duration: 1.0, // Same timing as enter
        ease: [0.25, 0.46, 0.45, 0.94],
        opacity: { 
          duration: 1.0,
          ease: "easeOut" 
        },
        x: { 
          duration: 1.0, // Slide to left
          ease: [0.25, 0.46, 0.45, 0.94] 
        },
      },
    }),
  };

  // Text animation variants with refined first load experience
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isFirstLoad ? 0.15 : 0.2,
        delayChildren: isFirstLoad ? 1.2 : 0.3, // Wait for image to partially fade in
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: isFirstLoad ? 20 : 100,
      rotateX: isFirstLoad ? 0 : 90,
      filter: isFirstLoad ? "blur(2px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: isFirstLoad ? 1.2 : 0.8,
        ease: isFirstLoad ? [0.16, 1, 0.3, 1] : [0.23, 1, 0.32, 1],
        opacity: { duration: isFirstLoad ? 0.8 : 0.6 },
        filter: { duration: isFirstLoad ? 0.6 : 0.4 },
      },
    },
  };

  const currentSlide = heroData[currentIndex];

  // Handle manual slide change - always right to left for consistency
  const handleSlideChange = (index) => {
    setIsFirstLoad(false);
    setDirection(1); // Always slide from right to left
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Modern glassmorphism hero section - FIXED FULL WIDTH */}
      <motion.section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
        style={{
          // More reliable full-width approach
          width: '100vw',
          maxWidth: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          position: 'relative',
        }}
        initial="hidden"
        animate="visible"
        variants={textContainerVariants}
      >
        {/* Animated background - FIXED DIMENSIONS */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-red-900"
          style={{ 
            y: backgroundY,
            width: '100vw',
            height: '100vh',
            left: 0,
            top: 0,
          }}
        >
          <AnimatePresence mode="sync" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
              style={{ 
                backgroundColor: '#000000',
                zIndex: 1,
                width: '100vw',
                height: '100vh',
              }}
            >
              {/* Desktop Image - FIXED FILL */}
              <div className="hidden md:block absolute inset-0 w-full h-full">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-full"
                  priority
                  style={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Mobile Image - FIXED FILL */}
              <div className="md:hidden absolute inset-0 w-full h-full">
                <Image
                  src={currentSlide.mobileImage}
                  alt={currentSlide.title}
                  fill
                  sizes="100vw"
                  className="object-cover w-full h-full"
                  priority
                  style={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Modern gradient overlay - FULL COVERAGE */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/50 via-black/50 to-transparent" />
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Modern content layout - MOBILE OPTIMIZED WITH BETTER POSITIONING */}
        <div className="relative z-40 min-h-screen flex flex-col justify-center">
          {/* FIXED: Better responsive padding and positioning */}
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-16 sm:mt-20 md:mt-16">
            <motion.div
              style={{ y: textY }}
              className="max-w-[1500px] mx-auto w-full"
            >
              {/* Main content grid - IMPROVED RESPONSIVE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center lg:items-end">
                {/* Left side - Main text - BETTER MOBILE SPACING */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
                  {/* Accent badge */}
                  <motion.div
                    variants={textVariants}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                  >
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: currentSlide.color }}
                    />
                    <span className="text-white/90 text-xs sm:text-sm tracking-wider uppercase font-light">
                      {currentSlide.accent}
                    </span>
                  </motion.div>

                  {/* Main title - IMPROVED RESPONSIVE SIZING */}
                  <motion.div
                    variants={textVariants}
                    className="space-y-2 sm:space-y-3 md:space-y-4"
                  >
                    <h1 
                      style={{ fontFamily: "oldstandard" }} 
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-tighter text-white leading-[0.9] sm:leading-tight"
                    >
                      {currentSlide.title}
                    </h1>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-white/80">
                      {currentSlide.subtitle}
                    </h2>
                  </motion.div>

                  {/* Description - BETTER MOBILE TYPOGRAPHY */}
                  <motion.p
                    variants={textVariants}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
                  >
                    {currentSlide.description}
                  </motion.p>

                  {/* CTA Button - IMPROVED MOBILE TOUCH TARGET */}
                  <motion.div
                    variants={textVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer group"
                    onClick={()=>window.location.href="/collections"}
                  >
                    <span className="font-medium tracking-wider text-sm sm:text-base">
                      EXPLORE COLLECTION
                    </span>
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Right side - Navigation & Info - IMPROVED MOBILE LAYOUT */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-6 md:space-y-8 mt-8 lg:mt-0">
                  {/* Slide navigation */}
                  <motion.div
                    variants={textVariants}
                    className="space-y-3 sm:space-y-4 md:space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs sm:text-sm tracking-wider uppercase">
                        Collection
                      </span>
                      <span className="text-white/60 text-xs sm:text-sm">
                        {String(currentIndex + 1).padStart(2, "0")} /{" "}
                        {String(heroData.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Custom slide indicators - BETTER MOBILE TOUCH */}
                    <div className="space-y-2 sm:space-y-3">
                      {heroData.map((item, index) => (
                        <motion.button
                          key={item.id}
                          onClick={() => handleSlideChange(index)}
                          className={`w-full text-left p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl backdrop-blur-2xl border transition-all duration-300 ${
                            index === currentIndex
                              ? "bg-white/20 border-white/30 text-white"
                              : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:border-white/30 hover:text-white/90"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div
                                className="font-medium tracking-wider text-sm sm:text-base uppercase"
                                style={{ fontFamily: "oldstandard" }}
                              >
                                {item.title}
                              </div>
                              <div className="text-xs sm:text-sm mt-1 opacity-70">
                                {item.subtitle}
                              </div>
                            </div>
                            {index === currentIndex && (
                              <motion.div
                                layoutId="active-indicator"
                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Progress bar - BETTER MOBILE VISIBILITY */}
                  <motion.div
                    variants={textVariants}
                    className="space-y-2 sm:space-y-3"
                  >
                    <div className="flex justify-between text-white/60 text-xs sm:text-sm">
                      <span>NEXT IN</span>
                      <span>6S</span>
                    </div>
                    <div className="h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: currentSlide.color }}
                        initial={{ width: "0%" }}
                        animate={{ width: isPlaying ? "100%" : "0%" }}
                        transition={{
                          duration: 6,
                          ease: "linear",
                          repeat: isPlaying ? Infinity : 0,
                        }}
                        key={`progress-${currentIndex}-${isPlaying}`}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll indicator - IMPROVED MOBILE POSITIONING */}
        <motion.div
          variants={textVariants}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/60"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="text-xs sm:text-sm tracking-widest uppercase">
              Scroll to explore
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 sm:w-7 sm:h-12 border border-white/30 rounded-full flex justify-center mx-auto"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}