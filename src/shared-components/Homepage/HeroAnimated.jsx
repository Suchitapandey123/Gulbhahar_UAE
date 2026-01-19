"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import OptimizedImage from "@/shared-components/cloudfront/OptmizedImage";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Play, Pause } from "lucide-react";

export default function ModernHeroAnimated() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Add effect to prevent horizontal scroll on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';
    
    const timer = setTimeout(() => {
      document.body.style.overflowX = originalOverflow;
      setIsFirstLoad(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.body.style.overflowX = originalOverflow;
    };
  }, []);

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Reduced parallax intensity
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Spring animations for smoother parallax
  const smoothBgY = useSpring(backgroundY, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const smoothTextY = useSpring(textY, {
    stiffness: 120,
    damping: 20,
    mass: 0.5,
  });

  const heroData = [
    {
      id: 1,
      image: "/home-page/newimagehero1.png",
      mobileImage: "/home-page/new-hero1-phone.webp",
      title: "GULBHAHAR",
      subtitle: "Heritage Reimagined",
      description: "Where traditional craftsmanship meets contemporary design",
      accent: "Spring '25",
      color: "#8B4513",
      // REVERSE ZOOM CONFIG - 6 seconds
      zoomConfig: {
        startScale: 1.15,
        endScale: 1.0,
        startY: "-2%",
        startX: "1%",
        endY: "0%",
        endX: "0%",
        duration: 6.0
      }
    },
    {
      id: 2,
      image: "/home-page/newimagehero2.png",
      mobileImage: "/home-page/new-hero2-phone.webp",
      title: "ARTISAN",
      subtitle: "Handcrafted Excellence",
      description: "Each piece tells a story of generations of artistry",
      accent: "Limited Edition",
      color: "#DC143C",
      zoomConfig: {
        startScale: 1.18,
        endScale: 1.0,
        startY: "1%",
        startX: "-1%",
        endY: "0%",
        endX: "0%",
        duration: 6.0
      }
    },
    {
      id: 3,
      image: "/home-page/new-hero3.webp",
      mobileImage: "/home-page/new-hero3-phone.webp",
      title: "LEGACY",
      subtitle: "Timeless Elegance",
      description: "Preserving tradition while embracing innovation",
      accent: "Signature Collection",
      color: "#DAA520",
      zoomConfig: {
        startScale: 1.12,
        endScale: 1.0,
        startY: "-1%",
        startX: "-1%",
        endY: "0%",
        endX: "0%",
        duration: 6.0
      }
    },
  ];

  const currentSlide = heroData[currentIndex];
  const nextIndex = (currentIndex + 1) % heroData.length;

  // Auto-advance carousel with 6-second timing
  useEffect(() => {
    if (!isPlaying || isTransitioning) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % heroData.length;
          return next;
        });
        setIsTransitioning(false);
      }, 600); // Transition duration
    }, 6000); // Total time per slide = 6 seconds

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, isPlaying, heroData.length, isTransitioning]);

  // Text animation variants
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isFirstLoad ? 0.15 : 0.2,
        delayChildren: isFirstLoad ? 1.2 : 0.3,
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

  // Reverse zoom variants
  const zoomVariants = {
    initial: {
      scale: currentSlide.zoomConfig.startScale,
      y: currentSlide.zoomConfig.startY,
      x: currentSlide.zoomConfig.startX,
    },
    animate: {
      scale: currentSlide.zoomConfig.endScale,
      y: currentSlide.zoomConfig.endY,
      x: currentSlide.zoomConfig.endX,
      transition: {
        duration: currentSlide.zoomConfig.duration,
        ease: "linear"
      }
    }
  };

  // Handle manual slide change
  const handleSlideChange = (index) => {
    if (index === currentIndex || isTransitioning) return;
    
    setIsFirstLoad(false);
    setIsTransitioning(true);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 600);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        /* Smooth scrolling for better performance */
        html {
          scroll-behavior: smooth;
        }

        .image-container {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000;
          will-change: transform, opacity;
        }

        .hero-image {
          will-change: transform, opacity;
          transform: translateZ(0);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        .reverse-zoom-container {
          transform-origin: center center;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          will-change: transform;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div
        className="relative w-full no-scrollbar"
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
        }}
      >
        <motion.section
          ref={containerRef}
          className="relative min-h-screen overflow-hidden bg-black"
          style={{ perspective: '1000px' }}
          initial="hidden"
          animate="visible"
          variants={textContainerVariants}
        >
          {/* BACKGROUND WITH REVERSE ZOOM */}
          <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ 
              y: smoothBgY,
              backgroundColor: '#000000',
            }}
          >
            {/* ALL IMAGES STACKED WITH REVERSE ZOOM */}
            {heroData.map((slide, index) => {
              const isCurrent = index === currentIndex;
              const isNext = index === nextIndex;
              const isFirstImage = index === 0;

              // Only load first image with priority to speed up initial load
              const shouldUsePriority = isFirstImage;
              
              return (
                <motion.div
                  key={`image-${slide.id}`}
                  className="absolute inset-0 w-full h-full image-container"
                  initial={false}
                  animate={{
                    opacity: isCurrent ? 1 : 0,
                    zIndex: isCurrent ? 20 : (isNext ? 15 : 10),
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    pointerEvents: isCurrent ? 'auto' : 'none',
                  }}
                >
                  {/* REVERSE ZOOM CONTAINER */}
                  <motion.div
                    className="reverse-zoom-container"
                    initial={{
                      scale: slide.zoomConfig.startScale,
                      y: slide.zoomConfig.startY,
                      x: slide.zoomConfig.startX,
                    }}
                    animate={{
                      scale: isCurrent && isPlaying ? slide.zoomConfig.endScale : slide.zoomConfig.startScale,
                      y: isCurrent && isPlaying ? slide.zoomConfig.endY : slide.zoomConfig.startY,
                      x: isCurrent && isPlaying ? slide.zoomConfig.endX : slide.zoomConfig.startX,
                    }}
                    transition={{
                      duration: slide.zoomConfig.duration,
                      ease: "linear",
                      delay: isCurrent && isFirstLoad ? 0.3 : 0
                    }}
                  >
                    {/* Desktop Image */}
                    <div className="hidden md:block absolute inset-0 w-full h-full">
                      <OptimizedImage
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes="100vw"
                        className="object-cover hero-image"
                        priority={shouldUsePriority}
                        quality={75}
                        loading={shouldUsePriority ? undefined : "lazy"}
                      />
                    </div>

                    {/* Mobile Image */}
                    <div className="md:hidden absolute inset-0 w-full h-full">
                      <OptimizedImage
                        src={slide.mobileImage}
                        alt={slide.title}
                        fill
                        sizes="100vw"
                        className="object-cover hero-image"
                        priority={shouldUsePriority}
                        quality={75}
                        loading={shouldUsePriority ? undefined : "lazy"}
                      />
                    </div>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Play/Pause button */}
          {/* <motion.button
            onClick={togglePlay}
            className="absolute top-20 sm:top-24 right-6 z-40 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/50 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white/80 group-hover:text-white" />
            ) : (
              <Play className="w-5 h-5 text-white/80 group-hover:text-white" />
            )}
          </motion.button> */}

          {/* MODERN CONTENT LAYOUT (ORIGINAL STRUCTURE) */}
          <div className="relative z-40 min-h-screen flex flex-col justify-center">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-16 sm:mt-20 md:mt-16">
              <motion.div
                style={{ 
                  y: smoothTextY,
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
                className="max-w-[1500px] mx-auto w-full"
              >
                {/* Main content grid - ORIGINAL STRUCTURE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center lg:items-end">
                  {/* Left side - Main text */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
                    {/* Main title */}
                    <motion.div
                      variants={textVariants}
                      className="space-y-2 sm:space-y-3 md:space-y-4"
                    >
                      <h2 
                        style={{ fontFamily: "oldstandard" }} 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-tighter text-white leading-[0.9] sm:leading-tight"
                      >
                        {currentSlide.title}
                      </h2>
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-wide text-white/80">
                        {currentSlide.subtitle}
                      </h2>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      variants={textVariants}
                      className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed max-w-lg mx-auto lg:mx-0"
                    >
                      {currentSlide.description}
                    </motion.p>

                    {/* CTA Button */}
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

                  {/* Right side - Navigation & Info */}
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

                      {/* Custom slide indicators */}
                      <div className="space-y-2 sm:space-y-3">
                        {heroData.map((item, index) => (
                          <motion.button
                            key={item.id}
                            onClick={() => handleSlideChange(index)}
                            disabled={isTransitioning}
                            className={`w-full text-left p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl backdrop-blur-2xl border transition-all duration-300 ${
                              index === currentIndex
                                ? "bg-white/20 border-white/30 text-white"
                                : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:border-white/30 hover:text-white/90"
                            } ${isTransitioning ? "opacity-70 cursor-not-allowed" : ""}`}
                            whileHover={{ scale: index === currentIndex || isTransitioning ? 1 : 1.02 }}
                            whileTap={{ scale: index === currentIndex || isTransitioning ? 1 : 0.98 }}
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

                    {/* Progress bar */}
                    <motion.div
                      variants={textVariants}
                      className="space-y-2 sm:space-y-3"
                    >
                      <div className="flex justify-between text-white/60 text-xs sm:text-sm">
                        <span>{isPlaying ? "NEXT IN" : "PAUSED"}</span>
                        <span>{isPlaying ? "6S" : "—"}</span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: currentSlide.color }}
                          initial={{ width: "0%" }}
                          animate={{ 
                            width: isPlaying && !isTransitioning ? "100%" : "0%",
                          }}
                          transition={{
                            duration: 6, // 6 seconds
                            ease: "linear",
                            repeat: isPlaying && !isTransitioning ? Infinity : 0,
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

          {/* Bottom scroll indicator */}
          <motion.div
            variants={textVariants}
            className="absolute bottom-6 sm:bottom-8 md:bottom-10 text-white/60"
            style={{
              left: 'calc(50vw - 60px)',
              transform: 'translateX(-50%)',
              zIndex: 50,
            }}
          >
            <div className="flex flex-col items-center space-y-2 sm:space-y-3">
              <div className="text-xs sm:text-sm tracking-widest uppercase text-center whitespace-nowrap">
                Scroll to explore
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 sm:w-7 sm:h-12 border border-white/30 rounded-full flex justify-center items-start mx-auto"
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
      </div>
    </>
  );
}