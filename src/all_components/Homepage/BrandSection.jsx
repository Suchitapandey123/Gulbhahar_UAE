'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const BrandSection = () => {
  // Container animation for orchestrating child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Learn More button animation - slides in from top right
  const learnMoreVariants = {
    hidden: { 
      opacity: 0, 
      x: 30,
      y: -20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Main brand name animation - scales up with elegant easing
  const brandNameVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 30
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Individual tagline animations - slide up with stagger
  const taglineVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Hover effect for Learn More button
  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Letter animation for brand name (optional enhancement)
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const brandName = "GULBHAHAR";

  return (
    <>
      {/* Font Import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap');
      `}</style>
      
      <motion.section 
        className="py-16 md:py-24 px-4 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative">
          {/* Learn More Button (Top Right) with enhanced animation */}
          <motion.div 
            className="absolute -top-6 md:-top-8 right-0"
            variants={learnMoreVariants}
          >
            <motion.div
              variants={buttonHoverVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/about"
                className="group flex items-center text-black hover:text-[#8B0000] transition-colors duration-300"
                style={{ fontFamily: "'Old Standard TT', serif" }}
              >
                <span className="mr-2 text-sm md:text-lg tracking-wide">
                  LEARN MORE
                </span>
                <motion.div
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                >
                  <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Main Brand Name with letter-by-letter animation */}
          <motion.div 
            className="text-center"
            variants={brandNameVariants}
          >
            <h1 className="text-[30px]  xs:text-4xl sm:text-7xl md:text-[112px] lg:text-[150px] xl:text-[11rem] text-nowrap tracking-wider text-[#8B0000] font-light leading-tight">
              <span  className='' style={{ fontFamily: "'Old Standard TT', serif" }}>
                {brandName.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    custom={index}
                    className="inline-block tracking-tighter px-2"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Three Taglines with enhanced responsive layout */}
          <motion.div 
            className="w-full   flex justify-between items-center text-[#8B0000]"
            variants={containerVariants}
          >
            {/* Tagline 1 */}
            <motion.div 
              className="text-center md:text-left"
              variants={taglineVariants}
            >
              <h3 
                className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                style={{ fontFamily: "'Old Standard TT', serif" }}
              >
                Handcrafted
              </h3>
            </motion.div>

            {/* Tagline 2 */}
            <motion.div 
              className="text-center"
              variants={taglineVariants}
            >
              <h3 
                className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                style={{ fontFamily: "'Old Standard TT', serif" }}
              >
                tailored with love
              </h3>
            </motion.div>

            {/* Tagline 3 */}
            <motion.div 
              className="text-center md:text-right"
              variants={taglineVariants}
            >
              <h3 
                className="text-[14px] sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide"
                style={{ fontFamily: "'Old Standard TT', serif" }}
              >
                piece by piece
              </h3>
            </motion.div>
          </motion.div>

          {/* Optional: Decorative elements */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
          >
            {/* Subtle background pattern or glow effect */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#8B0000]/5 via-transparent to-transparent opacity-30" />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default BrandSection;