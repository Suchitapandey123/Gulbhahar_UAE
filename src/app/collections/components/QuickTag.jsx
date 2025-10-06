"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Old_Standard_TT } from "next/font/google";
import { useRef } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const tagVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -2, transition: { duration: 0.2, ease: "easeOut" } },
  tap: { scale: 0.98 },
};

export default function QuickTag({ popularTags = [] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="max-w-[1600px] mx-auto py-16 px-4"
    >
      {/* Full Width Popular Tags */}
      <motion.div className="w-full" variants={sectionVariants}>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-red-700 animate-bounce" />
          <h3
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold relative`}
          >
            <span className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 bg-clip-text text-transparent">
              Popular Tags
            </span>
          </h3>
        </div>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
        >
          {popularTags.map((tag, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <Link href="#">
                <motion.div
                  variants={tagVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 -z-10"
                  />
                  <span
                    className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700 group-hover:text-red-700 transition-colors duration-200 relative z-10`}
                  >
                    {tag}
                  </span>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1 right-1"
                  >
                    <ArrowUpRight className="w-3 h-3 text-red-500" />
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
