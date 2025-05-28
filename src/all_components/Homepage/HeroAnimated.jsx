'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Hero1 from '../../../public/assets/Image/Hero1.png';
import Hero2 from '../../../public/assets/Image/Hero2.png';
import Hero3 from '../../../public/assets/Image/Hero3.png';
import MB1 from '../../../public/assets/Image/Mb-1.png';
import MB2 from '../../../public/assets/Image/mb-2.png';
import Mb3 from '../../../public/assets/Image/mb3.png';
import { useEffect, useState, useRef } from 'react';

export default function HeroAnimated() {
  // Enhanced Mobile Image Carousel with proper timing
  const MobileImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef(null);
    
    // Fixed timing with proper cleanup
    useEffect(() => {
      if (!isAutoPlaying) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); 
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }, [images.length, isAutoPlaying]);

    // Simplified slide animations for faster transitions
    const slideVariants = {
      enter: {
        x: '100%',
        opacity: 0,
      },
      center: {
        x: '0%',
        opacity: 1,
      },
      exit: {
        x: '-100%',
        opacity: 0,
      },
    };

    // Faster text animations
    const textVariants = {
      hidden: { 
        opacity: 0, 
        y: 20,
      },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4, // Reduced from 0.8s
          delay: 0.1,    // Reduced from 0.3s
          ease: "easeOut"
        }
      }
    };

    const handleDotClick = (index) => {
      setCurrentIndex(index);
      setIsAutoPlaying(false);
      // Resume autoplay after user interaction
      setTimeout(() => setIsAutoPlaying(true), 3000);
    };
    
    return (
      <div 
        className="md:hidden relative w-full h-[39rem] overflow-hidden bg-gray-50"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.5, // Faster transition
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Simplified text overlay */}
              <motion.div 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-0 flex flex-col justify-end items-center pb-20 text-center px-6"
              >
                <h2 className="text-white text-3xl font-oldstandardtt font-light tracking-wider mb-3">
                  {images[currentIndex].title}
                </h2>
                <p className="text-white/90 text-sm tracking-widest uppercase">
                  {images[currentIndex].subtitle}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Dots indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Progress indicator with correct timing */}
        <div className="absolute bottom-3 left-4 right-4 h-0.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2, 
              ease: "linear",
            }}
            key={`progress-${currentIndex}`} // Unique key to restart animation
          />
        </div>
      </div>
    );
  };

  // Fixed desktop animations with proper directional entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Increased stagger for clearer effect
        delayChildren: 0.2
      }
    }
  };

  // Slide from LEFT
  const slideFromLeft = {
    hidden: { 
      opacity: 0, 
      x: -100, // Increased distance for more dramatic effect
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        type: "ease-in-out",
        stiffness: 100
      }
    }
  };

  // FADE from center
  const fadeIn = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Slide from RIGHT
  const slideFromRight = {
    hidden: { 
      opacity: 0, 
      x: 100, // Increased distance for more dramatic effect
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        type: "ease-in-out",
        stiffness: 100
      }
    }
  };

  const carouselImages = [
    {
      src: MB2,
      alt: "Luxury jutti box with ornate accessories",
      title: "Gardens of Blooms",
      subtitle: "Spring Summer '25"
    },
    {
      src: Mb3,
      alt: "Red embroidered jutti with gold work",
      title: "Artisan Craftsmanship",
      subtitle: "Handcrafted Excellence"
    },
    {
      src: MB1,
      alt: "Brown traditional jutti with embellishments",
      title: "Gulbhahar Collection",
      subtitle: "Traditional Elegance"
    }
  ];

  return (
    <>
      {/* Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap');
      `}</style>
      
      <motion.section 
        className="md:py-12 md:px-4 max-w-[1600px] mx-auto md:mt-20 mt-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Mobile-only carousel */}
        <MobileImageCarousel images={carouselImages} />
        
        {/* Desktop Grid with fixed directional animations */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* First Item - Slides from LEFT */}
          <motion.div 
            className="relative p-3 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            variants={slideFromLeft}
          >
            <div className="relative w-full h-80 md:h-80 overflow-hidden rounded-md">
              <Image
                src={Hero1} 
                alt="Luxury jutti box with ornate accessories"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-xl tracking-wider uppercase" style={{ fontFamily: "'Old Standard TT', serif", fontWeight: "300" }}>
                Gulbhahar Combines Craftmanship
              </h2>
            </div>
          </motion.div>

          {/* Second Item - FADES in from center */}
          <motion.div 
            className="relative p-3 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 lg:col-span-1"
            variants={fadeIn}
          >
            <div className="relative w-full h-96 md:h-[560px] overflow-hidden rounded-md">
              <Image
                src={Hero2}
                alt="Red embroidered jutti with gold work"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Third Item - Slides from RIGHT */}
          <motion.div 
            className="flex flex-col lg:col-span-1 gap-4"
            variants={slideFromRight}
          >
            {/* Text Box */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl tracking-wider uppercase" style={{ fontFamily: "'Old Standard TT', serif", fontWeight: "300" }}>
                Gulbhahar Combines Craftmanship
              </h2>
            </div>
            
            {/* Image Box */}
            <div className="relative flex-grow p-3 bg-white rounded-lg shadow-sm">
              <div className="relative w-full h-80 overflow-hidden rounded-md">
                <Image
                  src={Hero3}
                  alt="Brown traditional jutti with embellishments"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}