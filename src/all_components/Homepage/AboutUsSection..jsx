"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Import your images - update these paths to match your project structure
import img1 from '../../../public/assets/Image/mb3.png';
import img2 from '../../../public/assets/Image/mb3.png';
import img3 from '../../../public/assets/Image/mb3.png';
import A1 from '../../../public/assets/Image/About1.png';
import A2 from '../../../public/assets/Image/About2.png';
import A3 from '../../../public/assets/Image/About3.png';

export default function AboutUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const carouselImages = [
    { 
      src: img2, 
      alt: "Craftsmanship showcase",
      title: "THE WEDDING SEASON RETURNS",
      description: "with our iconic NEEDLEDUST X ABHINAV MISHRA collection. Discover bespoke juttis, heels and purses for the most extraordinary unions."
    },
    { 
      src: img3, 
      alt: "Traditional craftsmanship",
      title: "TRADITIONS REIMAGINED",
      description: "GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT TO SUSTAINABILITY AND MODERN DESIGN"
    },
    { 
      src: img1, 
      alt: "Background design",
      title: "ARTISANAL HERITAGE",
      description: "Discover the legacy of handcrafted excellence from our skilled artisans passed down through generations."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const backgroundTextVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  // One-time slide animation for active item
  const slideVariants = {
    enter: {
      x: 50,
      opacity: 0,
      scale: 0.95
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      x: -50,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.main 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-7xl p-4 md:p-8 lg:p-4 mx-auto"
    >
      {/* Animated Header */}
      <motion.div 
        variants={headerVariants}
        className="flex justify-between items-center mb-12 "
      >
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway text-[#9f0715]"
        >
          ABOUT US
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/Collections">
            <button className="font-raleway flex items-center gap-2 lg:gap-5 text-gray-900 hover:text-[#9f0715] text-base sm:text-lg lg:text-2xl transition-colors tracking-wider uppercase group">
              discover
              <motion.div
                initial={{ x: 0, y: 0 }}
                animate={hasAnimated ? { 
                  x: 3,
                  y: -1,
                  rotate: 15
                } : { x: 0, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 1
                }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <ArrowUpRight size={20} className="sm:size-6 md:size-8 lg:size-10" />
              </motion.div>
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile Column Layout with Advanced Animations */}
      <motion.div 
        variants={containerVariants}
        className="md:hidden mb-8"
      >
        {/* Mobile Images Column */}
        <motion.div 
          variants={imageVariants}
          className="flex flex-col gap-6 overflow-y-auto scrollbar-hide py-4"
        >
          {carouselImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                y: index === 0 ? -150 : index === 1 ? 0 : 150,
                scale: 0.8,
                rotateX: index === 0 ? -30 : index === 2 ? 30 : 0
              }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateX: 0
              } : { 
                opacity: 0, 
                y: index === 0 ? -150 : index === 1 ? 0 : 150,
                scale: 0.8,
                rotateX: index === 0 ? -30 : index === 2 ? 30 : 0
              }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.03,
                rotateY: index % 2 === 0 ? 3 : -3,
                z: 50,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                index === currentIndex 
                  ? 'shadow-2xl ring-4 ring-[#9f0715] ring-opacity-60' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Main image container */}
              <motion.div
                animate={{
                  scale: index === currentIndex ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={288}
                  className="w-full h-full object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Animated overlay patterns */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { 
                    opacity: index === currentIndex ? 0.4 : 0.2
                  } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent"
                />

                {/* One-time floating effect when first visible */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isInView && index === currentIndex && hasAnimated ? 1 : 0
                  }}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.8 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, opacity: 0, scale: 0 }}
                      animate={isInView && index === currentIndex && hasAnimated ? {
                        y: -30,
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0.5]
                      } : { y: 0, opacity: 0, scale: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.2,
                        ease: "easeOut"
                      }}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 12}%`,
                        bottom: '25%'
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Content overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: index === currentIndex ? 1 : 0.8,
                  y: 0 
                }}
                transition={{ delay: index * 0.3 + 0.5, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6"
              >
                <motion.div
                  animate={{
                    scale: index === currentIndex ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p 
                    className="text-white font-bold text-lg mb-2 font-raleway tracking-wide"
                    style={{
                      color: index === currentIndex ? "#F5DFA4" : "#ffffff"
                    }}
                  >
                    {image.title}
                  </motion.p>
                  <motion.p 
                    className="text-white/90 text-sm font-oldstandardtt leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 + 0.7 }}
                  >
                    {image.description.length > 80 
                      ? `${image.description.substring(0, 80)}...` 
                      : image.description
                    }
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Active indicator */}
              <AnimatePresence>
                {index === currentIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 180 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="absolute top-4 right-4 w-8 h-8 bg-[#9f0715] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Number indicator */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -90 }}
                animate={{ opacity: 0.9, x: 0, rotate: 0 }}
                transition={{ 
                  delay: index * 0.3 + 0.8, 
                  duration: 0.8,
                  ease: "backOut"
                }}
                className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-sm font-raleway">
                  0{index + 1}
                </span>
              </motion.div>

              {/* Hover interaction icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease: "backOut" }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl"
                >
                  <ArrowUpRight className="w-8 h-8 text-[#9f0715]" />
                </motion.div>
              </motion.div>

              {/* One-time selection ripple */}
              <AnimatePresence>
                {index === currentIndex && hasAnimated && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ 
                      scale: 1.5, 
                      opacity: 0 
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 border-4 border-[#9f0715] rounded-2xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Visual Separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-[#9f0715] to-transparent my-8"
        />

        {/* Mobile Content */}
        <motion.div 
          variants={textVariants}
          className="px-2"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: 10 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-3xl shadow-2xl border border-gray-200"
            >
              {/* Background decoration */}
              <motion.div
                initial={{ rotate: 0, scale: 1, opacity: 0 }}
                animate={isInView ? {
                  rotate: 45,
                  scale: 1.1,
                  opacity: 0.6
                } : { rotate: 0, scale: 1, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.8
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gray-100 rounded-full blur-xl"
              />

              <motion.h3
                className="text-xl font-bold text-[#9f0715] mb-4 font-raleway tracking-wide"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {carouselImages[currentIndex].title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-700 font-oldstandardtt leading-relaxed text-base mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {carouselImages[currentIndex].description}
              </motion.p>
              
              {/* Progress indicators */}
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <span className="text-sm text-gray-500 font-raleway">Progress</span>
                <div className="flex gap-2 flex-1">
                  {carouselImages.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full overflow-hidden ${
                        index === currentIndex ? 'bg-[#9f0715]' : 'bg-gray-200'
                      }`}
                      initial={{ width: 8 }}
                      animate={{ 
                        width: index === currentIndex ? 40 : 8 
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {index === currentIndex && (
                        <motion.div
                          className="h-full bg-[#9f0715]"
                          initial={{ x: "-100%" }}
                          animate={{ x: "0%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-raleway">
                  {currentIndex + 1}/{carouselImages.length}
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* First Section */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-[60%_40%] lg:gap-8 lg:mb-16 mb-8"
        >
          <motion.div 
            variants={imageVariants}
            className="relative mt-16 md:mt-24"
          >
            {/* Background Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30, rotate: -3 }}
              animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -30, rotate: -3 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute inset-0 -z-20 lg:mt-12 mt-10 hidden lg:block"
            >
              <Image
                src={A1}
                alt="Background design"
                width={500}
                height={400}
                priority
                className="lg:ml-36 relative -top-20 sm:-top-40 ml-3 object-cover opacity-80"
              />
            </motion.div>
            
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src={A2}
                alt="Craftsmanship showcase"
                width={500}
                height={600}
                className="lg:mt-9 lg:p-1 object-cover rounded-lg shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={textVariants}
            className="flex items-center mt-8 md:mt-0"
          >
            <motion.p 
              className="text-base md:text-lg lg:text-xl leading-relaxed lg:mb-80 lg:pr-4 font-oldstandardtt font-[400] px-4"
              initial={{ x: 0 }}
              animate={hasAnimated ? { x: 10 } : { x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT TO
              SUSTAINABILITY AND MODERN DESIGN
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Second Section */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <motion.div 
            variants={textVariants}
            className="order-2 md:order-1 relative"
          >
            <div className="lg:mb-56 lg:mr-20 px-4">
              <motion.p 
                className="text-base md:text-lg lg:text-xl leading-relaxed font-oldstandardtt font-[400] mb-8"
                initial={{ x: 0 }}
                animate={hasAnimated ? { x: 10 } : { x: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT TO
                SUSTAINABILITY AND MODERN DESIGN
              </motion.p>
              
              {/* Animated Background Text */}
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                animate={isInView ? { 
                  rotate: 1,
                  scale: 1.05
                } : { rotate: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.8 }}
                className="font-oldstandardtt font-bold relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[175px] tracking-wider lg:top-40 text-[#F5DFA4BF] -z-10 -mb-10 m-auto select-none pointer-events-none"
              >
                TRADITIONS
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={imageVariants}
            className="relative order-1 md:order-2 lg:-mt-96 lg:ml-28"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                rotate: -2,
                transition: { duration: 0.3 }
              }}
              className="relative"
            >
              <Image
                src={A3}
                alt="Traditional craftsmanship"
                width={500}
                height={600}
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Hover overlay effect */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black rounded-lg"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}