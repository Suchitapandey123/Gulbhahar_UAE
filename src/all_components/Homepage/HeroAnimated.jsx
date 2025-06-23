"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import MB1 from "../../../public/assets/Image/Mb-1.png";
import MB2 from "../../../public/assets/Image/mb-2.png";
import Mb3 from "../../../public/assets/Image/mb3.png";
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
      image: MB2,
      mobileImage: MB2,
      title: "GULBHAHAR",
      subtitle: "Heritage Reimagined",
      description: "Where traditional craftsmanship meets contemporary design",
      accent: "Spring '25",
      color: "#8B4513",
    },
    {
      id: 2,
      image: Mb3,
      mobileImage: Mb3,
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
      {/* Modern glassmorphism hero section - FULL WIDTH */}
      <motion.section
        ref={containerRef}
        className="relative min-h-screen w-screen  overflow-hidden"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
        initial="hidden"
        animate="visible"
        variants={textContainerVariants}
      >
        {/* Animated background - should not show with proper overlap */}
        <motion.div
          className="absolute top-0 left-0 w-screen h-screen bg-red-900 -z-10"
          style={{ y: backgroundY }}
        >
          <AnimatePresence mode="sync" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-screen h-screen"
              style={{ 
                backgroundColor: '#000000',
                zIndex: 1,
              }}
            >
              {/* Desktop Image */}
              <div className="hidden md:block relative w-full h-full">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Mobile Image */}
              <div className="md:hidden relative w-full h-full">
                <Image
                  src={currentSlide.mobileImage}
                  alt={currentSlide.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Modern gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40  via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Modern content layout - MOBILE OPTIMIZED */}
        <div className="relative z-40 min-h-screen mt-8 sm:mt-12 md:mt-16 w-full  flex flex-col px-4 sm:px-0 md:px-12 lg:px-20 justify-center">
          <motion.div
            style={{ y: textY }}
            className="max-w-[1500px]  mx-auto w-full"
          >
            {/* Main content grid - RESPONSIVE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center lg:items-end">
              {/* Left side - Main text - MOBILE RESPONSIVE */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
                {/* Accent badge */}
                <motion.div
                  variants={textVariants}
                  className="inline-flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
                >
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentSlide.color }}
                  />
                  <span className="text-white/90 text-xs sm:text-sm tracking-wider uppercase font-light">
                    {currentSlide.accent}
                  </span>
                </motion.div>

                {/* Main title - MOBILE RESPONSIVE */}
                <motion.div
                  variants={textVariants}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  <h1 style={{ fontFamily: "oldstandard" }} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-light tracking-tighter text-white leading-tight">
                    {currentSlide.title}
                  </h1>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-white/80">
                    {currentSlide.subtitle}
                  </h2>
                </motion.div>

                {/* Description - MOBILE RESPONSIVE */}
                <motion.p
                  variants={textVariants}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  {currentSlide.description}
                </motion.p>

                {/* CTA Button - MOBILE RESPONSIVE */}
                <motion.div
                  variants={textVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 cursor-pointer group"
                  onClick={()=>window.location.href="/collections"}
                >
                  <span className="font-medium tracking-wider text-sm sm:text-base">
                    EXPLORE COLLECTION
                  </span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.div>
              </div>

              {/* Right side - Navigation & Info - MOBILE RESPONSIVE */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6 md:space-y-8 mt-6 lg:mt-0">
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

                  {/* Custom slide indicators - MOBILE RESPONSIVE */}
                  <div className="space-y-2 sm:space-y-3">
                    {heroData.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleSlideChange(index)}
                        className={`w-full text-left p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl backdrop-blur-2xl border transition-all duration-300 ${
                          index === currentIndex
                            ? "bg-white/20 border-white/30 text-white"
                            : "bg-white/10 border-white/30 text-white/90 hover:bg-white/50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div
                              className="font-medium tracking-wider text-xs sm:text-sm uppercase"
                              style={{ fontFamily: "oldstandard" }}
                            >
                              {item.title}
                            </div>
                            <div className="text-xs mt-0.5 sm:mt-1 opacity-70">
                              {item.subtitle}
                            </div>
                          </div>
                          {index === currentIndex && (
                            <motion.div
                              layoutId="active-indicator"
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Progress bar - MOBILE RESPONSIVE */}
                <motion.div
                  variants={textVariants}
                  className="space-y-1.5 sm:space-y-2"
                >
                  <div className="flex justify-between text-white/60 text-xs">
                    <span>NEXT IN</span>
                    <span>6S</span>
                  </div>
                  <div className="h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
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

        {/* Bottom scroll indicator - MOBILE RESPONSIVE */}
        <motion.div
          variants={textVariants}
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/60"
        >
          <div className="space-y-2 sm:space-y-3">
            <div className="text-xs tracking-widest uppercase">
              Scroll to explore
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 sm:w-6 sm:h-10 border border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </>
  );
}