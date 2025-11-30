"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Old_Standard_TT } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Zap } from "lucide-react";
import { pageService } from "../../app/api/pageService/pageService";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const tagVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: { scale: 0.98 },
};

export default function QuickSearch() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // State for API data
  const [quickLinksData, setQuickLinksData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    async function getQuickLinksFun() {
      try {
        setLoading(true);
        const parentCategory = "saree";
        const currentSlug = "kanjivaram-lehenga";
        const data = await pageService.getQuickLinks(
          parentCategory,
          currentSlug
        );
        console.log("QuickLinks API Response:", data);
        setQuickLinksData(data);
      } catch (error) {
        console.error("Error fetching quick links:", error);
      } finally {
        setLoading(false);
      }
    }
    getQuickLinksFun();
  }, []); // Empty dependency array means run once on mount

  // Function to format slug to readable text
  const formatSlugToText = (slug) => {
    if (!slug) return "";
    return slug
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(" "); // Join with space
  };

  // Get 5 items from each category for Popular Searches
  const getPopularSearches = () => {
    if (!quickLinksData?.data) {
      return [
        "Designer Juttis",
        "Wedding Footwear",
        "Punjabi Juttis",
        "Festive Collection",
        "Traditional Mojaris",
      ];
    }

    const items = [];
    const { saree = [], suit = [], lehenga = [] } = quickLinksData.data;

    // Take 5 from saree, 5 from suit, 5 from lehenga
    items.push(...saree.slice(0, 5));
    items.push(...suit.slice(0, 5));
    items.push(...lehenga.slice(0, 5));

    return items;
  };

  // Get 4 items from each category for Quick Links
  const getQuickLinks = () => {
    if (!quickLinksData?.data) {
      return [
        "New Arrivals",
        "Best Sellers",
        "Sale Items",
        "Gift Cards",
        "Care Instructions",
        "Custom Orders",
        "Track Order",
      ];
    }

    const items = [];
    const { saree = [], suit = [], lehenga = [] } = quickLinksData.data;

    // Take 4 from saree, 4 from suit, 4 from lehenga
    items.push(...saree.slice(0, 4));
    items.push(...suit.slice(0, 4));
    items.push(...lehenga.slice(0, 4));

    return items;
  };

  const popularSearches = getPopularSearches();
  const quickLinks = getQuickLinks();

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-[1600px] mx-auto py-16 px-4 "
    >
      {/* Popular Searches Section */}
      <motion.div variants={sectionVariants} className="mb-12 relative">
        {/* Background decoration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-900 via-red-600 to-red-900 rounded-full blur-xl"
        />

        <motion.div
          className="flex items-center gap-3 mb-6"
          variants={itemVariants}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TrendingUp className="w-6 h-6 text-red-700" />
          </motion.div>
          <h3
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold text-gray-800 relative`}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 bg-[length:200%_100%] bg-clip-text text-transparent"
            >
              Popular Searches
            </motion.span>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-red-900 via-red-600 to-red-900 transform origin-left"
            />
          </h3>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-1"
          variants={containerVariants}
        >
          {popularSearches.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Link href={`/collections/${item}`}>
                <motion.div
                  variants={tagVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative
                            transition-all duration-300 cursor-pointer
                           group-hover:border-red-300 overflow-hidden"
                >
                  {/* Hover background gradient */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 -z-10"
                  />

                  <span
                    className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700
                              group-hover:text-red-700 transition-colors duration-200 relative z-10`}
                  >
                    {formatSlugToText(item)}
                  </span>

                  {index !== popularSearches.length - 1 && (
                    <span className=" text-black -900 font-"> | </span>
                  )}

                  {/* Hover icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 right-1"
                  >
                    <ArrowUpRight className="w-3 h-3 text-red-500" />
                  </motion.div>

                  {/* Shimmer effect */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Quick Links Section */}
      <motion.div variants={sectionVariants} className="relative">
        {/* Background decoration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-900 via-red-600 to-red-900 rounded-full blur-xl"
        />

        <motion.div
          className="flex items-center gap-3 mb-6"
          variants={itemVariants}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Zap className="w-6 h-6 text-red-700" />
          </motion.div>
          <h3
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold text-gray-800 relative`}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5,
              }}
              className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 bg-[length:200%_100%] bg-clip-text text-transparent"
            >
              Quick Links
            </motion.span>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-red-900 via-red-600 to-red-900 transform origin-left"
            />
          </h3>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {quickLinks.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Link href={`/collections/${item}`}>
                <motion.div
                  variants={tagVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative p-2 px-4 bg-white border border-gray-200 rounded-xl
                           shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer
                           group-hover:border-red-300 overflow-hidden"
                >
                  {/* Hover background gradient */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-xl"
                  />

                  <motion.div className="relative z-10 flex items-center justify-between">
                    <span
                      className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700
              group-hover:text-red-700 truncate transition-colors duration-200 font-medium
              relative cursor-pointer`}
                      title={formatSlugToText(item)}
                    >
                      {formatSlugToText(item)}
                    </span>

                    <motion.div
                      initial={{ x: 0, opacity: 0.5 }}
                      whileHover={{ x: 3, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                    </motion.div>
                  </motion.div>

                  {/* Floating particles */}
                  <motion.div className="absolute top-2 right-2">
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="w-1 h-1 bg-red-400 rounded-full"
                    />
                  </motion.div>

                  {/* Border glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-xl border-2 border-red-300/50 pointer-events-none"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block w-16 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"
        />
      </motion.div>
    </motion.footer>
  );
}
