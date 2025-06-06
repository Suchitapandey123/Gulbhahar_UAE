"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import culture from "../../../public/assets/Svg/culture.svg";
import img1 from "../../../public/assets/Image/C2.png";



export default function Culture() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const contentToggler = () => {
    setIsVisible(!isVisible);
  };

  // Array of all images to cycle through on mobile
  const mobileImages = [
    { src: img1, alt: "Background block 1" },
    { src: img1, alt: "Background block 2" },
    { src: img1, alt: "Foreground block 1" },
    { src: img1, alt: "Foreground block 2" },
  ];

  useEffect(() => {
    // Only run the carousel on mobile screens
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
    if (mediaQuery.matches) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [mobileImages.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const mobileCarouselVariants = {
    enter: {
      x: 100,
      opacity: 0,
      scale: 0.95
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const showcaseCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.main 
  ref={ref}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  variants={containerVariants}
  className="min-h-screen hidden w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative"
>
  {/* Floating orbs background */}
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-r from-amber-400/10 to-orange-300/10 blur-sm"
        style={{
          width: `${Math.random() * 200 + 50}px`,
          height: `${Math.random() * 200 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, Math.random() > 0.5 ? 30 : -30, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>

  {/* Main container */}
  <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    {/* Section header */}
    <motion.div 
      className="text-center mb-12 sm:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Cultural Heritage
      </motion.h2>
      <motion.p 
        className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Discover the timeless beauty and rich traditions that define our cultural identity
      </motion.p>
    </motion.div>

    {/* Hexagonal grid layout */}
    <div className="relative max-w-7xl mx-auto">
      {/* Central focal image */}
      <motion.div 
        className="relative z-20 mx-auto mb-8 sm:mb-12 lg:mb-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* Hexagonal container */}
          <div className="relative aspect-square">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <div className="absolute inset-2 sm:inset-3 bg-white rounded-full shadow-2xl overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={culture}
                  alt="Cultural Heritage"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Surrounding images in orbit pattern */}
      <div className="relative">
        {/* Desktop orbit layout */}
        <div className="hidden lg:block">
          {[
            { src: "/gulbhahar-1.png", angle: 0, distance: "300px", label: "Heritage", delay: 0.5 },
            { src: "/gulbhahar2.png", angle: 72, distance: "280px", label: "Tradition", delay: 0.7 },
            { src: "/gulbhahar-3.png", angle: 144, distance: "320px", label: "Artistry", delay: 0.9 },
            { src: "/gulbhahar-4.png", angle: 216, distance: "290px", label: "Legacy", delay: 1.1 },
            { src: "/gulbhahar-1.png", angle: 288, distance: "310px", label: "Culture", delay: 1.3 },
          ].map((item, index) => {
            const radian = (item.angle * Math.PI) / 180;
            const x = Math.cos(radian) * parseInt(item.distance);
            const y = Math.sin(radian) * parseInt(item.distance);
            
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 w-32 h-32 xl:w-40 xl:h-40"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: item.delay }}
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 30,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative w-full h-full group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400/80 to-orange-600/80 rounded-2xl"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-1 bg-white rounded-xl shadow-lg overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tablet layout */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {[
              { src: "/gulbhahar-1.png", label: "Heritage" },
              { src: "/gulbhahar2.png", label: "Tradition" },
              { src: "/gulbhahar-3.png", label: "Artistry" },
              { src: "/gulbhahar-4.png", label: "Legacy" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative aspect-square group"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl" />
                <div className="absolute inset-1 bg-white rounded-xl shadow-lg overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden">
          <div className="space-y-4">
            {[
              { src: "/gulbhahar-1.png", label: "Heritage" },
              { src: "/gulbhahar2.png", label: "Tradition" },
              { src: "/gulbhahar-3.png", label: "Artistry" },
              { src: "/gulbhahar-4.png", label: "Legacy" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative h-32 mx-4 group"
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-2xl" />
                <div className="absolute inset-1 bg-white rounded-xl shadow-lg overflow-hidden flex items-center">
                  <div className="w-28 h-full relative">
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover rounded-l-xl"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{item.label}</h3>
                    <p className="text-sm text-gray-600">Traditional cultural element</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Connecting lines animation */}
    <svg className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.4)" />
          <stop offset="100%" stopColor="rgba(249, 115, 22, 0.4)" />
        </linearGradient>
      </defs>
      {[0, 72, 144, 216, 288].map((angle, index) => {
        const nextAngle = (angle + 72) % 360;
        const r1 = (angle * Math.PI) / 180;
        const r2 = (nextAngle * Math.PI) / 180;
        const distance = 250;
        
        return (
          <motion.line
            key={index}
            x1={`${50 + Math.cos(r1) * (distance / 8)}%`}
            y1={`${50 + Math.sin(r1) * (distance / 8)}%`}
            x2={`${50 + Math.cos(r2) * (distance / 8)}%`}
            y2={`${50 + Math.sin(r2) * (distance / 8)}%`}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              delay: 1.5 + index * 0.2,
              ease: "easeInOut"
            }}
          />
        );
      })}
    </svg>
  </div>
</motion.main>

      {/* Showcase Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto lg:max-w-[1600px] "
      >
        <motion.h1 
          variants={headerVariants}
          className="lg:text-5xl text-3xl font-bold lg:mb-12 mb-10 text-left font-raleway text-customRed pl-4"
        >
          OUR SHOWCASE
        </motion.h1>

        <motion.div 
          variants={containerVariants}
          className="flex overflow-x-auto mx-auto pb-4 sm:pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-12 xl:gap-5 no-scrollbar"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              variants={showcaseCardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-auto aspect-[3/4] relative hover:bg-white mx-2 first:ml-4 last:mr-4 md:mx-auto group cursor-pointer"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={"/gulbhahar-20.png"}
                  alt="showcase image"
                  width={300}
                  height={450}
                  className="object-cover w-full h-[450px] rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black rounded-lg"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="mt-28 px-4"
      >
        <motion.div
          variants={textVariants}
          className="mb-8 md:mb-12"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-[22px] md:text-xl lg:text-[28px] lg:mb-8 font-[400] font-oldstandardtt"
          >
            Meticulously Handmade Footwear - Gulbhahar
          </motion.h2>

          <motion.div
            variants={textVariants}
            className="text-gray-700 leading-relaxed lg:text-[23px] md:text-base text-[19px] whitespace-wrap font-oldstandardtt"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Welcome to Gulbhahar, where handcrafted excellence meets India's
              finest footwear. Discover a range of spellbinding women's ethnic
              juttis. Each pair is meticulously made with luxury materials and
              expert craftsmanship. Indulge in innovative craftsmanship, where
              designs feature intricate embroidery, luxurious fabrics, and
              timeless motifs celebrating India's rich heritage. The artisans make
              the most refined footwear. They aim to celebrate generational
              tradition while embracing modern style. At Gulbhahar, we take pride
              in creating more than just juttis. Our collection promises to
              elevate your wardrobe and evoke a sense of pride in India's
              heritage. Each pair of enchanting juttis are intricately
              embroidered. They have an aura of ethnic elegance.
            </motion.p>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto",
                    transition: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeIn"
                    }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="space-y-4 mt-4"
                  >
                    <p>
                      Explore our range of juttis, each reflecting the same level of
                      classic artisanal craftsmanship and impeccable designs. At
                      Gulbhahar, we weave a tale of tradition and passion. Step into
                      a world where every pair of footwear is a tribute to
                      craftsmanship and culture. Experience the artistry of India's
                      finest handcrafted footwear. This is where heritage meets
                      elegance, one step at a time.
                    </p>

                    <motion.h4 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-black mt-2 mb-3 font-semibold"
                    >
                      What sets Gulbhahar apart is its unwavering commitment to
                      quality and craftsmanship.
                    </motion.h4>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      Each piece is specially created to meet the brand's
                      established policy of high-quality goods. Starting with the
                      selection of materials and ending up with minute embroidery
                      and final details, every step is scrutinised to make
                      accessories as equally beautiful as they are long-lasting.
                      However, Gulbhahar is not only a trademark. It is a
                      celebration of rich Indian culture and art legacy.
                    </motion.p>

                    {/* Additional content sections with staggered animations */}
                    {[
                      {
                        title: "Discover the Collection",
                        content: "Our products have intricate embroidery. The minimalist charm in our collection is exceptional. Explore juttis that define elegance and sophistication."
                      },
                      {
                        title: "Women's Juttis - Discover handcrafted ethnic elegance",
                        content: "Indulge in the exquisite artistry of handcrafted designer juttis at Gulbhahar. Our collection is a blend of traditional and modern designs. Premium materials are used to carefully manufacture each piece."
                      },
                      {
                        title: "Punjabi juttis - Celebrate Tradition with a Modern Twist",
                        content: "Gulbhahar Juttis will take you into Punjab's rich cultural past. Gulbhahar Punjabi juttis are the pinnacle of classic style and craftsmanship, with a classic foundation and a modern twist."
                      },
                      {
                        title: "Why Choose Us?",
                        content: "The Ultimate Combination of Comfort, Style, and Artistry. In addition to making exquisite juttis, we at Gulbhahar also believe in crafting experiences. Our juttis are made to combine the highest workmanship traditions, the most opulent materials, and a dash of modern flair."
                      }
                    ].map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <h4 className="text-black font-semibold">{section.title}</h4>
                        <p>{section.content}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={contentToggler}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-raleway text-customRed hover:underline text-[17px] mt-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-opacity-50 rounded px-2 py-1"
            >
              {isVisible ? "see less..." : "see more..."}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}