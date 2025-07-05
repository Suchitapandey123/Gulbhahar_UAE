"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Import your images
import A1 from "../../../public/assets/Image/001.jpg";
import A2 from "../../../public/assets/Image/002.jpg";
import A3 from "../../../public/assets/Image/003.jpg";

export default function AlternatingAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stories = [
    {
      id: 1,
      image: A1,
      category: "HERITAGE",
      title: "Crafted Through Generations",
      description:
        "Our artisans carry forward a legacy spanning centuries, where each stitch tells a story of cultural richness and unmatched skill. Every piece is meticulously handcrafted using techniques passed down through generations.",
    },
    {
      id: 2,
      image: A2,
      category: "INNOVATION",
      title: "Where Tradition Meets Tomorrow",
      description:
        "We blend time-honored techniques with cutting-edge design, creating pieces that honor the past while embracing the future. Our innovative approach ensures that traditional craftsmanship evolves with modern sensibilities.",
    },
    {
      id: 3,
      image: A3,
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
      className="py-16 px-4 sm:py-20 sm:px-6 lg:py-24 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto overflow-x-hidden">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 sm:mb-20 lg:mb-24"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 text-gray-900">
            ABOUT
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-red-900 tracking-widest font-light uppercase">
            Our Story
          </p>
        </motion.div>

        {/* Story Sections - Alternating Layout */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${
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
                <div className="relative aspect-[3/4] sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300" // Subtle zoom on hover
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 py-1 sm:px-4 sm:py-2 bg-red-900 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg">
                    {story.category}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl font-black text-red-900">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? "lg:col-start-1" : "lg:col-start-2"
                } order-2 lg:order-none space-y-4 sm:space-y-6 lg:space-y-8`}
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-red-900/10 text-red-900 text-xs sm:text-sm font-bold rounded-full border border-red-900/20">
                    {story.category}
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                    {story.title}
                  </h2>
                </div>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  {story.description}
                </p>

                {/* Progress Indicator */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {index + 1} of {stories.length}
                  </span>
                  <div className="flex gap-2">
                    {stories.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i <= index ? "bg-red-900 w-8" : "bg-gray-300 w-2"
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
          className="text-center hidden mt-16 sm:mt-20 lg:mt-32 pt-16 sm:pt-20 border-t border-gray-200"
        >
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Ready to Experience Our Craftsmanship?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our complete collection and find the perfect piece that
                tells your story.
              </p>
            </div>

            <Link href="/Collections">
              <motion.button
                className="group px-8 py-3 sm:px-12 sm:py-4 bg-red-900 text-white rounded-full text-base sm:text-lg font-bold hover:bg-red-800 transition-colors inline-flex items-center gap-3 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DISCOVER COLLECTIONS
                <ArrowUpRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
