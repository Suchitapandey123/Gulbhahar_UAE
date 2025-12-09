"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";


export default function AlternatingAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stories = [
    {
      id: 1,
      image: "/home-page/Crafted-Through-Generations-optimized.webp",
      category: "HERITAGE",
      title: "Crafted Through Generations",
      description:
        "Our artisans carry forward a legacy spanning centuries, where each stitch tells a story of cultural richness and unmatched skill. Every piece is meticulously handcrafted using techniques passed down through generations.",
    },
    {
      id: 2,
      image: "/home-page/Where-Tradition-Meets-Tomorrow-optimized.webp",
      category: "INNOVATION",
      title: "Where Tradition Meets Tomorrow",
      description:
        "We blend time-honored techniques with cutting-edge design, creating pieces that honor the past while embracing the future. Our innovative approach ensures that traditional craftsmanship evolves with modern sensibilities.",
    },
    {
      id: 3,
      image: "/home-page/Conscious-Luxury-optimized.webp",
      category: "SUSTAINABILITY",
      title: "Conscious Luxury",
      description:
        "Every creation reflects our commitment to sustainable practices, ensuring beauty that doesn't compromise our planet's future. We source responsibly and create with environmental consciousness at the forefront.",
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-8 px-2 xs:px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24 lg:px-10 xl:py-28 xl:px-12 2xl:py-32 2xl:px-16 bg-white"
    >
      <div className="max-w-[1600px] mx-auto overflow-x-hidden">
        {/* Header */}
        <motion.h3
          variants={itemVariants}
          className="text-center mb-8 xs:mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28 2xl:mb-32"
        >
          <span className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-gray-900">
            ABOUT
          </span>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-red-900 tracking-widest font-light uppercase">
            Our Story
          </p>
        </motion.h3>

        {/* Story Sections - Alternating Layout */}
        <div className="space-y-8 xs:space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28 2xl:space-y-32">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-24 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                variants={imageVariants}
                className={`relative ${
                  index % 2 === 1 ? "lg:col-start-2" : "lg:col-start-1"
                } order-1 lg:order-none`}
              >
                <div className="relative aspect-[3/4] w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-2xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 xs:top-4 sm:top-6 md:top-7 lg:top-8 left-3 xs:left-4 sm:left-6 md:left-7 lg:left-8 px-2 py-1 xs:px-3 xs:py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 lg:px-6 lg:py-3 bg-red-900 text-white text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-full shadow-lg backdrop-blur-sm">
                    {story.category}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-7 lg:bottom-8 right-3 xs:right-4 sm:right-6 md:right-7 lg:right-8 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-black text-red-900">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1" : "lg:col-start-2"
                } order-2 lg:order-none space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-10`}
              >
                <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  <div className="inline-block px-2 py-1 xs:px-3 xs:py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 lg:px-6 lg:py-3 bg-red-900/10 text-red-900 text-xs xs:text-xs sm:text-sm md:text-base lg:text-lg font-bold rounded-full border border-red-900/20">
                    {story.category}
                  </div>

                  <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight">
                    {story.title}
                  </h2>
                </div>

                <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-600 leading-relaxed max-w-none lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
                  {story.description}
                </p>

                {/* Progress Indicator */}
                <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 pt-2 xs:pt-3 sm:pt-4 md:pt-5 lg:pt-6">
                  <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 font-medium">
                    {index + 1} of {stories.length}
                  </span>
                  <div className="flex gap-1 xs:gap-2 sm:gap-3">
                    {stories.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 xs:h-1 sm:h-1.5 md:h-2 lg:h-2.5 rounded-full transition-all duration-300 ${
                          i <= index 
                            ? "bg-red-900 w-4 xs:w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14" 
                            : "bg-gray-300 w-1.5 xs:w-2 sm:w-2.5 md:w-3 lg:w-3.5 xl:w-4"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center hidden mt-8 xs:mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-28 2xl:mt-32 pt-8 xs:pt-12 sm:pt-16 md:pt-20 lg:pt-24 border-t border-gray-200"
        >
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 xl:space-y-9 2xl:space-y-10">
            <div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8">
                Ready to Experience Our Craftsmanship?
              </h3>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
                Discover our complete collection and find the perfect piece that
                tells your story.
              </p>
            </div>

            <Link href="/collections">
              <motion.button
                className="group px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 lg:px-12 lg:py-4 xl:px-14 xl:py-5 2xl:px-16 2xl:py-6 bg-red-900 text-white rounded-full text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold hover:bg-red-800 transition-colors inline-flex items-center gap-2 xs:gap-3 sm:gap-4 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DISCOVER COLLECTIONS
                <ArrowUpRight
                  className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}