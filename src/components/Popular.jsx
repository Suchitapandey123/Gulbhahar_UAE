"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Popular() {
  return (
    <footer className="max-w-7xl mx-auto px-4 py-8 md:py-12">

      <motion.div
        className="mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg md:text-xl font-serif mb-4 ">
          Traditional & modern handcrafted india's finest footwear - GULBHAHAR
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        Welcome to Needledust, where handcrafted excellence meets India's finest footwear. Discover a captivating array of women's ethnic juttis, heels, mules, Kolhapur, and purses, meticulously crafted with premium materials and traditional craftsmanship. Embrace ethnic elegance with our exquisite designs, featuring intricate embroidery, luxurious fabrics, and timeless motifs celebrating India's rich heritage. Indulge in the allure of premium handcrafted footwear and accessories that celebrate tradition while embracing modern style. Whether it's a timeless pair of kolhapuris or an intricately embroidered purse, our collection promises to elevate your wardrobe and evoke a sense of pride in India's artisanal heritage. Explore our range of men's and kids' juttis, each reflecting the same level of craftsmanship and attention to detail. At Needledust, we take pride in creating more than just shoes; we create pieces of art that tell a story of tradition and passion. Step into a world where every step is a celebration of craftsmanship and culture. Welcome to Needledust, your destination for India's finest handcrafted footwear.
        </p>
      </motion.div>
      <motion.div className="mb-8" initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <h3 className="text-base md:text-lg font-serif uppercase mb-4 md:mb-6 italic underline cursor-pointer">POPULAR SEARCHES</h3>
        <div className="flex flex-wrap gap-y-2 md:gap-y-3 opacity-45 cursor-pointer">
          {[
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
          ].map((item, index) => (
            <motion.div key={index} variants={item}>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 italic text-sm md:text-base border-r border-gray-300 last:border-0 px-2 md:px-4 first:pl-0 transition-colors duration-200"
              >
                {item} |
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
        <h3 className="text-base md:text-lg font-serif uppercase mb-4 md:mb-6 italic underline cursor-pointer">QUICK LINKS</h3>
        <div className="flex flex-wrap gap-y-2 md:gap-y-3 opacity-45 cursor-pointer">
          {[
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
            "Indian Footware",
          ].map((item, index) => (
            <motion.div key={index} variants={item}>
              <Link
                href="#"
                className="text-gray-600 hover:text-gray-900 italic text-sm md:text-base border-r border-gray-300 last:border-0 px-2 md:px-4 first:pl-0 transition-colors duration-200"
              >
                {item} | 
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </footer>
  )
}

