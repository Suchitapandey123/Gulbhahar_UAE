"use client"
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

// Immersive Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 100], [1, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ scale, opacity }}
      className="relative  mt-16 flex  justify-center overflow- px-2"
    >
      <div className="max-w-[1600px] mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <motion.div 
            style={{ y: textY }}
            className="text-center lg:text-left flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10
+            min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <motion.div className="mt-6 sm:mt-10 md:mt-14 lg:mt-20">

                <motion.span
                  className=" text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl 2xl:text-9xl  font-black leading-[0.85] block bg-gradient-to-r from-[#7f0001] via-[#7f0001] to-[#7f0001] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  CRAFTING
                </motion.span>
                <motion.span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl  font-black leading-[0.85] block bg-gradient-to-r from-[#7f0001] via-[#9a1313] to-[#bc1414] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  STORIES
                </motion.span>
                <motion.span
                  className="block text-gray-400 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl mt-2 sm:mt-4 font-light"
                  initial={{ opacity: 0, y: 50, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  of heritage
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-2xl leading-relaxed font-light">
                Where centuries-old craftsmanship meets contemporary design, 
                creating footwear that tells your unique story, one step at a time.
              </p>
              
              <motion.div 
                className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
              >
                {['Handcrafted', 'Heritage', 'Premium'].map((tag, i) => (
                  <motion.span 
                    key={tag}
                    className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-transparent border-2 border-[#7f0001] text-[#7f0001] rounded-full text-xs sm:text-sm font-semibold tracking-wide"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#7f0001', color: 'white' }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, scale: 0.7, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
                transition: { duration: 0.6 }
              }}
            >
              <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg sm:rounded-xl lg:rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                <Image
                  src="/about/crafting-stories-optimized.webp"
                  alt="Heritage Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-3 sm:top-4 lg:top-8 right-3 sm:right-4 lg:right-8 bg-transparent border-2 border-white backdrop-blur-md px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl z-20"
                  initial={{ opacity: 0, x: 50, y: -50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">HANDCRAFTED</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-3 sm:bottom-4 lg:bottom-8 left-3 sm:left-4 lg:left-8 bg-transparent border-2 border-[#7f0001] backdrop-blur-md px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl z-20"
                  initial={{ opacity: 0, x: -50, y: 50 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 2.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#7f0001] tracking-wide">AUTHENTIC</span>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 sm:-top-6 lg:-top-8 -left-4 sm:-left-6 lg:-left-8 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-[#7f0001]/20 to-[#7f0001]/30 rounded-full opacity-50 blur-xl"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <motion.div 
                className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-12 -right-6 sm:-right-8 lg:-right-12 w-20 sm:w-28 lg:w-40 h-20 sm:h-28 lg:h-40 bg-gradient-to-tl from-[#7f0001]/30 to-[#7f0001]/40 rounded-full opacity-30 blur-2xl"
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Social & Story Section
const StorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/share/1GN5HZC6dS/',
      // followers: '12K'
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/gulbhahar_official?igsh=MzRlODBiNWFlZA==',
      // followers: '28K'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/yourhandle',
      // followers: '8K'
    },
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-12 lg:gap-16 items-start lg:items-center">
          {/* Social Links */}
          <motion.div 
            className="lg:col-span-3 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-[#7f0001]">Connect With Us</h3>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {socialLinks.map((platform, i) => (
                <motion.div 
                  key={platform.name}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a 
                    href={platform.url} 
                    className="flex items-center justify-between p-3 sm:p-4 bg-transparent border border-[#7f0001]/20 rounded-lg sm:rounded-xl hover:border-[#7f0001] transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div>
                      <span className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-[#7f0001]">
                        {platform.name}
                      </span>
                      {/* <p className="text-xs sm:text-sm text-gray-500">{platform.followers} followers</p> */}
                    </div>
                    <motion.div
                      className="w-2 h-2 bg-[#7f0001]/40 rounded-full group-hover:bg-[#7f0001]"
                      whileHover={{ scale: 1.5 }}
                    />
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-9 order-1 lg:order-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.span 
                className="absolute -top-8 sm:-top-12 lg:-top-16 -left-2 sm:-left-4 lg:-left-8 text-6xl sm:text-8xl lg:text-[12rem] font-black text-[#7f0001]/10 leading-none select-none"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              >
                "
              </motion.span>
              
              <div className="pl-4 sm:pl-8 lg:pl-16 space-y-4 sm:space-y-6 lg:space-y-8">
                <motion.h2 
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Born from the Rich Heritage of 
                  <span className="text-[#7f0001]"> Indian Craftsmanship</span>
                </motion.h2>
                
                <motion.p 
                  className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-4xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Our journey began with a vision to preserve and celebrate the timeless art of jutti-making. 
                  Our master artisans, many of whom represent the third and fourth generations of their craft, 
                  bring decades of expertise to every piece they create.
                </motion.p>

                <motion.blockquote 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl italic text-gray-600 border-l-4 border-[#7f0001] pl-4 sm:pl-6 lg:pl-8 my-6 sm:my-8 lg:my-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  "We bring centuries of Indian craftsmanship to your feet through our exquisitely 
                  handcrafted juttis. Each pair tells a story of tradition, artistry, and cultural 
                  excellence that has been passed down through generations."
                </motion.blockquote>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Immersive Tradition Section
const TraditionSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ scale }}
      className="py-8 sm:py-16 lg:py-20 px-2 xs:px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block bg-gradient-to-r from-[#7f0001] to-[#a50003] bg-clip-text text-transparent"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              BLENDING
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-[#7f0001] to-[#a50003] bg-clip-text text-transparent"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              TRADITION
            </motion.span>
            <motion.span
              className="block text-gray-400 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mt-2 sm:mt-4"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              with contemporary style
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
          >
            Every piece tells a story of heritage, craftsmanship, and timeless elegance
          </motion.p>
        </motion.div>

        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24 lg:mb-32 items-center">
          <motion.div 
            style={{ rotate: rotate1 }}
            className="relative group order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl border border-[#7f0001]/20">
              <Image
                src="/about/adda-master-optimized.webp"
                alt="Traditional Craftsmanship"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001]/50 via-transparent to-transparent" />
              
              <motion.div
                className="absolute bottom-3 sm:bottom-4 lg:bottom-8 left-3 sm:left-4 lg:left-8 text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Traditional Methods</h3>
                <p className="text-sm sm:text-base lg:text-lg opacity-90">Our juttis celebrate India's rich handcrafted legacy, and our soulful design in juttis is woven with traditional expertise.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic text-gray-700 leading-relaxed">
            Each jutti we craft carries the soul of Indian heritage. Gulbhahar juttis are woven by hands that have passed down their artistry for generations. We bring centuries of tradition right to you.
            </blockquote>
            
            <motion.div 
              className="flex items-center space-x-4 pt-4 sm:pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-12 sm:w-16 h-0.5 bg-[#7f0001]" />
              <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#7f0001]">Master Artisan</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-24 lg:mb-32 items-center">
          <motion.div 
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic text-gray-700 leading-relaxed">
            Each pair of juttis shares a story; our juttis weave together the past and present. Gulbhahar gives you an unbroken thread of Indian craftsmanship passed down through time.
            </blockquote>
            
            <motion.div 
              className="flex items-center space-x-4 pt-4 sm:pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-12 sm:w-16 h-0.5 bg-[#7f0001]" />
              <span className="text-sm sm:text-base lg:text-lg font-semibold text-[#7f0001]">Heritage Keeper</span>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ rotate: rotate2 }}
            className="relative group order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl border border-[#7f0001]/20">
              <Image
                src="/about/modern-innovation-optimized.webp"
                alt="Contemporary Design"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001]/50 via-transparent to-transparent" />
              
              <motion.div
                className="absolute bottom-3 sm:bottom-4 lg:bottom-8 right-3 sm:right-4 lg:right-8 text-white text-right"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Modern Innovation</h3>
                <p className="text-sm sm:text-base lg:text-lg opacity-90">Innovation breathes new life into heritage; our juttis fuse artisanal craft with modern flair and function.                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Closing Statement */}
        <motion.div 
          className="text-center py-12 sm:py-16 lg:py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 font-light max-w-4xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Each step you take in our juttis carries forward a legacy of Indian craftsmanship.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Artisan Spotlight Section
const ArtisanSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const artisans = [
    {
      name: "Adda Master",
      experience: "35 Years",
      specialty: "Traditional Embroidery",
      quote: "Each hand-stitched creativity generates amazing textile creations through the weaving together of cultural identities and stories.",
      image: "/about/traditional-methods-optimized.webp"
    },
    {
      name: "Hastkalaakar",
      experience: "28 Years", 
      specialty: "Pattern Design",
      quote: "The artistic process of composing elements in symmetry and harmony, to create a totality for each jutti.",
      image: "/about/pattern-design-optimized.webp"
    },
    {
      name: "Shilpkar",
      experience: "42 Years",
      specialty: "Leather Crafting",
      quote: "The intricate process of working with leather in an artistic craft that has tooling, cutting, moulding, and stitching leather to create bespoke pieces of lasting quality.",
      image: "/about/leatherwork-optimized.webp"
    }
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-8 sm:py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block text-[#7f0001]"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              MASTER
            </motion.span>
            <motion.span
              className="block text-gray-700"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              ARTISANS
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            Meet the skilled craftspeople who bring our heritage footwear to life
          </motion.p>
        </motion.div>

        {/* Artisan Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {artisans.map((artisan, index) => (
            <motion.div
              key={artisan.name}
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -20 }}
            >
              <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#7f0001]/20">
                {/* Background Image */}
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  priority
                  className=" transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001] via-[#7f0001]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-2 sm:mb-4">
                      <span className="text-xs sm:text-sm font-semibold text-gray-200 tracking-wide">
                        {artisan.experience} • {artisan.specialty}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">{artisan.name}</h3>
                    <blockquote className="text-sm sm:text-base lg:text-lg italic text-gray-100 leading-relaxed">
                      {artisan.quote}
                    </blockquote>
                  </motion.div>
                </div>

                {/* Decorative Corner */}
                <motion.div
                  className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 border-2 border-white/30 rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, rotate: 180 }}
                >
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Process Timeline Section
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Design & Inspiration",
      description: "Our journey begins with traditional motifs and contemporary influences merging into unique designs",
      detail: "Sketching, pattern creation, and cultural research form the foundation of every collection",
      img:"/about/craft-1-optimized.webp"
    },
    {
      number: "02", 
      title: "Material Selection",
      description: "Only the finest leathers and fabrics are chosen, sourced from trusted suppliers across India",
      detail: "Quality control ensures every material meets our exacting standards for durability and beauty",
      img:"/about/craft-2-optimized.webp"
    },
    {
      number: "03",
      title: "Master Craftsmanship",
      description: "Skilled artisans hand-cut, stitch, and embellish each piece using time-honored techniques",
      detail: "15-20 hours of dedicated work goes into creating each pair of premium juttis",
      img:"/about/craft-3-optimized.webp"
    },
    {
      number: "04",
      title: "Quality Assurance",
      description: "Every finished piece undergoes rigorous inspection to ensure it meets our heritage standards",
      detail: "Multiple quality checkpoints guarantee that only perfect pieces reach our customers",
      img:"/about/craft-4-optimized.webp"
    },
    {
      number: "05",
      title: "Final Finishing",
      description: "The final touches bring each piece to life, ready to carry forward our legacy",
      detail: "Hand-polishing, packaging, and certification complete the artisanal journey",
      img:"/about/craft-5-optimized.webp"
    }
  ];

  return (
    <motion.div className="py-8 sm:py-16 lg:py-20 px-2 xs:px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block bg-gradient-to-r from-[#7f0001] to-[#a50003] bg-clip-text text-transparent"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              THE CRAFT
            </motion.span>
            <motion.span
              className="block text-gray-400 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mt-2 sm:mt-4"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              behind every pair
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={`space-y-4 sm:space-y-6 lg:space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                whileHover={{ x: index % 2 === 1 ? -10 : 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                  <motion.div
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#7f0001]/20"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-[#7f0001] to-transparent" />
                </div>
                
                <motion.h3 
                  className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                  initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                
                <motion.p 
                  className="text-sm xs:text-base sm:text-lg text-gray-500 italic"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  {step.detail}
                </motion.p>
              </motion.div>

              <motion.div 
                className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: index % 2 === 1 ? -5 : 5 }}
              >
                <div className="relative h-[250px] xs:h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#7f0001]/20">
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001]/30 via-transparent to-transparent" />
                  
                  <motion.div
                    className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 bg-transparent border border-[#7f0001] backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#7f0001]">Step {step.number}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Collections Showcase
const CollectionsSection = () => {
  const [activeCollection, setActiveCollection] = useState(0);
  
  const collections = [
    {
      name: "Ada (Jutti)",
      description: "Timeless designs rooted in traditional Indian aesthetics",
      price: "₹5799",
      features: ["Hand-embroidered", "Premium leather", "Traditional motifs"],
      image: "/about/noorani-1.jpg",
      link : "/collections/P04172723114"
    },
    {
      name: "Lal Ishq (Jutti)",
      description: "Modern silhouettes with traditional craftsmanship",
      price: "₹5490", 
      features: ["Contemporary design", "Comfort padding", "Versatile styling"],
      image: "/about/lal-ishq-1.jpg",
      link : "/collections/P45482609607"
    },
  ];

  return (
    <motion.div className="py-8 sm:py-16 lg:py-20 px-2 xs:px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block bg-gradient-to-r from-[#7f0001] to-[#a50003] bg-clip-text text-transparent"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              OUR COLLECTIONS
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          {/* Collection Navigation */}
          <motion.div 
            className="lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                className={`p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300 border ${
                  activeCollection === index 
                    ? 'bg-[#7f0001] text-white shadow-2xl border-[#7f0001]' 
                    : 'bg-transparent text-gray-900 shadow-lg hover:shadow-xl border-[#7f0001]/20 hover:border-[#7f0001]'
                }`}
                onClick={() => setActiveCollection(index)}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-4">{collection.name}</h3>
                <p className={`mb-2 sm:mb-4 text-sm sm:text-base ${activeCollection === index ? 'text-gray-200' : 'text-gray-600'}`}>
                  {collection.description}
                </p>
                <div className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-4">{collection.price}</div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {collection.features.map((feature, i) => (
                    <span 
                      key={i}
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border ${
                        activeCollection === index 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'bg-transparent text-[#7f0001] border-[#7f0001]/30'
                      }`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Collection Display */}
          <motion.div 
          onClick={() => window.open(collections[activeCollection].link, "_blank")}
            className="lg:col-span-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              key={activeCollection}
              className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg sm:rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl group border border-[#7f0001]/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={collections[activeCollection].image}
                alt={collections[activeCollection].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001]/60 via-transparent to-transparent" />
              
              <motion.div
                className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">{collections[activeCollection].name}</h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-md">
                  {collections[activeCollection].description}
                </p>
              </motion.div>

              <motion.button
                className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 bg-transparent border-2 border-white backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-semibold text-white hover:bg-white hover:text-[#7f0001] transition-all duration-300 text-xs sm:text-sm lg:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Prachi Arora",
      location: "Delhi",
      review: "The craftsmanship is absolutely incredible. Each detail shows the love and skill that went into making these beautiful juttis.",
      rating: 5,
      image: "/C3.png"
    },
    {
      name: "Khushi Soni", 
      location: "Delhi",
      review: "I've never owned footwear that combines traditional beauty with such comfort. These juttis are truly special.",
      rating: 5,
      image: "/C3.png"
    },
    {
      name: "Madhurima Khanduja",
      location: "Delhi", 
      review: "Perfect for my wedding! The quality exceeded my expectations and the designs are absolutely stunning.",
      rating: 5,
      image: "/C3.png"
    }
  ];

  return (
    <motion.div className="py-8 sm:py-16 lg:py-20 px-2 xs:px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 lg:mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block text-[#7f0001]"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              WHAT OUR
            </motion.span>
            <motion.span
              className="block text-gray-700"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              CUSTOMERS SAY
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="bg-transparent border border-[#7f0001]/20 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl h-full hover:border-[#7f0001] transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <svg className="w-4 sm:w-5 h-4 sm:h-5 text-[#7f0001] fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    </motion.div>
                  ))}
                </div>
                
                <blockquote className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.review}"
                </blockquote>
                
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r from-[#7f0001]/30 to-[#7f0001]/50 overflow-hidden"> 
                    <Image 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                      width={48}
                      height={48}
                      priority
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base text-gray-900">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Call to Action Section
const CtaSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-8 sm:py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 lg:mb-12 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="block text-[#7f0001]"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              EVERY STEP
            </motion.span>
            <motion.span
              className="block text-gray-700"
              initial={{ opacity: 0, rotateX: 90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              TELLS A STORY
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            Each step you take in our juttis carries forward a legacy of Indian craftsmanship, 
            connecting you to centuries of artisanal excellence and cultural heritage.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.button 
            onClick={() => window.open("/heritage-culture", "_blank")}
              className="group relative px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 bg-[#7f0001] text-white rounded-full font-bold text-sm sm:text-base lg:text-xl hover:bg-[#a50003] transition-all duration-300 shadow-2xl overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Discover Our Heritage Culture</span>
            </motion.button>
            
            <motion.button 
              className="group px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 border-2 border-[#7f0001] text-[#7f0001] bg-transparent rounded-full font-bold text-sm sm:text-base lg:text-xl hover:bg-[#7f0001] hover:text-white transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn Our Story
            </motion.button>
          </motion.div>

          {/* Stats - Hidden on mobile, shown on larger screens */}
          <motion.div 
            className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mt-12 sm:mt-16 lg:mt-24 pt-8 sm:pt-12 lg:pt-16 border-t border-[#7f0001]/20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "25+", label: "Years of Craftsmanship" },
              { number: "100+", label: "Unique Designs" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#7f0001] mb-2 sm:mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-light">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Brand Story Section Component
const BrandStorySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-8 sm:py-16 lg:py-20 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Brand Story */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Story Content */}
          <motion.div 
            className="lg:col-span-7 mt-4 order-2 lg:order-1"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="absolute -top-8 sm:-top-12 lg:-top-16 -left-2 mt-4 sm:-left-4 lg:-left-8 text-6xl sm:text-8xl lg:text-[12rem] font-black text-[#7f0001]/10 leading-none select-none"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              >
                "
              </motion.span>
              
              <div className="pl-4 sm:pl-8 lg:pl-16 space-y-6 sm:space-y-8 lg:space-y-10">
                <motion.h2 
                  className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-3xl flex gap-3 xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="block bg-gradient-to-r from-[#7f0001] to-[#a50003] bg-clip-text text-transparent"
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    BRAND
                  </motion.span>
                  <motion.span
                    className="block text-gray-700"
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    STORY
                  </motion.span>
                </motion.h2>
                
                <motion.div 
                  className="space-y-4 sm:space-y-6 text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <p>
                    It started with an inclination towards the art of <span className="text-[#7f0001] font-semibold">hand embroidery and its artisans</span>. 
                    With a passion for promoting handicrafts intertwined with comfortable footwear, visionary couple 
                    <span className="font-bold text-gray-900"> Monica Bhardwaj Gulati</span> launched 
                    Gulbhahar in <span className="text-[#7f0001] font-bold">January 2025</span>.
                  </p>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-[#7f0001]/10 to-transparent p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl lg:rounded-2xl border-l-4 border-[#7f0001]"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <p className="italic">
                      The brand's name itself is an amalgamation of their last names.Together, Pulkit and Monica Gulati, partners in life and partners in business,, 
                      '<span className="text-[#7f0001] font-bold">Gul</span>' is taken from 'Gulati', and 
                      '<span className="text-[#7f0001] font-bold">Bhahar</span>' is derived from 'Bhardwaj'.
                    </p>
                  </motion.div>
                  
                  <p>
                    They were drawn to innovative handiwork, hard work, and the art of the artisans. 
                    <span className="font-semibold text-gray-900"> Each pair takes several hours to create with dedication.</span> 
                    They are handmade, and the utmost importance is given to the craft itself. 
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Founders Image */}
          <motion.div 
            className="lg:col-span-5 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative group"
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
                transition: { duration: 0.6 }
              }}
            >
              <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg sm:rounded-xl lg:rounded-[2rem] overflow-hidden shadow-2xl border border-[#7f0001]/20">
                <div className="absolute inset-0 bg-gradient-to-t from-[#7f0001]/30 via-transparent to-transparent z-10" />
                {/* Placeholder for founders image - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7f0001]/20 to-[#a50003]/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl sm:text-6xl font-bold mb-2">P & M</div>
                    <div className="text-lg sm:text-xl">Founders</div>
                    <div className="text-sm sm:text-base opacity-80 mt-2">Pulkit & Monica Gulati</div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute top-3 sm:top-4 lg:top-8 right-3 sm:right-4 lg:right-8 bg-transparent border-2 border-white backdrop-blur-md px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl z-20"
                  initial={{ opacity: 0, x: 50, y: -50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">JAN 2025</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-3 sm:bottom-4 lg:bottom-8 left-3 sm:left-4 lg:left-8 bg-transparent border-2 border-[#7f0001] backdrop-blur-md px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-xl z-20"
                  initial={{ opacity: 0, x: -50, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.7 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-xs sm:text-sm font-bold text-[#7f0001] tracking-wide">EST.</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* About Us Section */}
        <motion.div 
          className="mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <motion.div 
              className="space-y-6 sm:space-y-8 lg:space-y-10"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h1 
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#7f0001] mb-4 sm:mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                About Us
              </motion.h1>
              
              <div className="space-y-4 sm:space-y-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                <p>
                  <span className="font-semibold text-gray-900">Handcrafted by artisans honing the shoemaking trade for generations</span>, 
                  each pair of juttis is unique. Gulbhahar ensures everything about each jutti is flawless.
                </p>
                
                <p>
                  We make our juttis in beautiful fabrics, and they have <span className="text-[#7f0001] font-semibold">meticulous threadwork</span>. 
                  We take every detail seriously. Everything from Gulbhahar is carefully crafted.
                </p>
                
                <motion.div 
                  className="bg-gradient-to-r from-[#7f0001]/5 to-transparent p-4 sm:p-6 rounded-lg sm:rounded-xl border border-[#7f0001]/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="font-medium text-gray-800 italic">
                    The intention was to reevaluate the traditional jutti craft form but add more of a 
                    <span className="text-[#7f0001] font-bold"> modern and stylish feel</span>.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-4 sm:space-y-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.blockquote 
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl italic text-gray-600 border-l-4 border-[#7f0001] pl-4 sm:pl-6 lg:pl-8 mb-6 sm:mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                "Our handcrafted shoes are more than a pair of shoes. They are a representation of 
                <span className="text-[#7f0001] font-bold"> comfort, style and integrity</span>."
              </motion.blockquote>
              
              <p>
                Wearing our juttis connects you to a <span className="font-semibold text-gray-900">rich history of elegance, tradition, and custom</span>. 
                Whether it's weddings, festive holiday parties, or just everyday glamour.
              </p>
              
              <p>
                The handmade designer juttis and accessories for women celebrate rich diversity. 
                Each piece is made with <span className="text-[#7f0001] font-semibold">craftsmanship and creativity</span>. 
                Gulbhahar wants to be a part of every special occasion that you celebrate.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black mb-8 sm:mb-12 lg:mb-16 text-[#7f0001]"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            OUR MISSION
          </motion.h3>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            We are dedicated to:
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto">
            {[
              { title: "Preserving Heritage", icon: "🏛️", description: "Keeping traditional craftsmanship alive through modern innovation" },
              { title: "Responsible Fashion", icon: "🌱", description: "Creating sustainable, ethically-made products with care for our environment" },
              { title: "Unparalleled Comfort", icon: "✨", description: "Ensuring every step is as comfortable as it is beautiful" }
            ].map((mission, index) => (
              <motion.div
                key={mission.title}
                className="group p-6 sm:p-8 lg:p-10 bg-transparent border border-[#7f0001]/20 rounded-lg sm:rounded-xl lg:rounded-2xl hover:border-[#7f0001] hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">{mission.icon}</div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#7f0001] mb-3 sm:mb-4">{mission.title}</h4>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">{mission.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stay Connected & Closing */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 text-[#7f0001]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Stay Connected
          </motion.h3>
          
          <motion.div 
            className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p>
              Follow us on <motion.a 
                href="https://www.instagram.com/gulbhahar_official?igsh=MzRlODBiNWFlZA==" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7f0001] font-bold hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Gulbhahar Official
              </motion.a> on social media and be a part of the Gulbhahar family!
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4 sm:space-y-6 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-600 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="italic"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-[#7f0001] font-semibold">This is Gulbhahar.</span>{" "}
              <span className="text-gray-700 font-semibold">This is our story.</span>{" "}
              <span className="text-[#7f0001] font-bold">And now, it becomes yours.</span>
            </motion.p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="flex justify-center items-center space-x-4 sm:space-x-8 mt-12 sm:mt-16 lg:mt-20"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <div className="w-12 sm:w-16 lg:w-24 h-0.5 bg-gradient-to-r from-transparent to-[#7f0001]" />
            <motion.div 
              className="w-2 sm:w-3 h-2 sm:h-3 bg-[#7f0001] rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <div className="w-12 sm:w-16 lg:w-24 h-0.5 bg-gradient-to-l from-transparent to-[#7f0001]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-gradient-to-br from-[#7f0001]/10 to-[#7f0001]/20 rounded-full opacity-30 blur-3xl"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      {/* this is the comment only for doing project redeployment */}
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-40 sm:w-56 lg:w-72 h-40 sm:h-56 lg:h-72 bg-gradient-to-tl from-[#7f0001]/15 to-[#7f0001]/25 rounded-full opacity-25 blur-3xl"
        animate={{ 
          rotate: -360,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    </motion.div>
  );
};

// Main Component
const UltimateHomePage = () => {
  return (
    <motion.div 
      className="overflow-hidden space-y-2 sm:space-y-4 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroSection />
      <BrandStorySection  />
      <StorySection />
      <TraditionSection />
      <ArtisanSection />
      <ProcessSection />
      <CollectionsSection />
      <TestimonialsSection />
      <CtaSection />
    </motion.div>
  );
};

export default UltimateHomePage;