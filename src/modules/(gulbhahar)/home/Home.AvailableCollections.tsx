"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Sarees",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/saree.webp",
    slug: "sarees",
  },
  {
    name: "Bags",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/bags.webp",
    slug: "bags",
  },
  {
    name: "Suits",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/suits.webp",
    slug: "suits",
  },
  {
    name: "Lehengas",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/lehenga.webp",
    slug: "lehenga",
  },
  {
    name: "Juttis",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/juttis.webp",
    slug: "juttis",
  },
  
  
  // {
  //   name: "Gowns",
  //   image:
  //     "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/suits.webp",
  //   slug: "gowns",
  // },
  {
    name: "Jewellery",
    image:
      "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/static/home/available-collections/jewellery.webp",
    slug: "jewellery",
  },
];

const Home_AvailableCollections = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="flex flex-col  space-y-4 justify-center mb-6">
        {/* <div className=""> */}
        <div className="flex justify-center items-center gap-3">
          <span className="w-16 h-px bg-[#800000]" />
          <span className="text-[#800000] text-[11px] font-bold tracking-[0.4em] uppercase">
            Gulbhahar Collections
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl text-center font-serif text-[#1a1a1a] leading-[1.1]">
          Our{" "}
          <span className="italic text-[#800000] serif-italics">Available</span>{" "}
          Collections
        </h2>

        <p className="text-gray-500  text-center text-base md:text-lg leading-relaxed font-light">
          Experience our latest silhouettes in motion. Every thread tells a
          story of heritage, now just a tap away.
        </p>
      </div>

      <div className="relative">
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              className="flex-none w-[80vw] sm:w-[85vw] md:w-[400px] snap-start relative border-r border-[#1a1a1a]"
              whileHover="hover"
            >
              <Link
                href={`#`}
                // href={`/${category.slug}`}
                className="block relative h-[500px] md:h-[600px] group overflow-hidden"
              >
                {/* Background Image - Sharp Edges */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full  transition-transform duration-700 group-hover:scale-105"
                />

               

                {/* Vertical Label - Shows Category Name instead of EST. 1994 */}
                <div className="absolute top-0 left-0 h-full w-12 md:w-16 bg-[#1a1a1a] flex items-center justify-center transform translate-x-0 md:-translate-x-full md:group-hover:translate-x-0 transition-transform duration-500 z-20">
                  <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase rotate-90 whitespace-nowrap">
                    {category.name}
                  </span>
                </div>

                {/* Bottom Content - Shifted to avoid overlap with side label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pl-16 md:pl-12 md:group-hover:pl-24 transition-all duration-500 z-10 bg-gradient-to-t from-black via-black/20 to-transparent">
                  <div className="space-y-2 md:space-y-4">
                    <span className="text-white/60 text-[8px] md:text-[10px] font-bold tracking-[0.6em] uppercase block">
                      Collection {index + 1}
                    </span>
                    <h3 className="text-white text-3xl md:text-6xl font-serif tracking-tight leading-none">
                      {category.name}
                    </h3>

                    <div className="flex items-center gap-4 pt-2 md:pt-4 overflow-hidden">
                      <div className="h-px w-16 md:w-0 md:group-hover:w-16 bg-[#800000] transition-all duration-500" />
                      <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-nowrap duration-500 flex items-center gap-2">
                        View Collection{" "}
                        <ArrowRight size={14} className="text-[#800000]" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Border Hover Effect - Hidden on mobile as it interferes with view */}
                <div className="absolute inset-0 border-[0px] md:group-hover:border-[16px] border-[#800000]/10 transition-all duration-500 pointer-events-none" />
              </Link>
            </motion.div>
          ))}

          {/* Last trailing space with a bold end block */}
          <div className="flex-none w-[60vw] md:w-[20vw] bg-[#1a1a1a] flex flex-col justify-center px-8 md:px-12 text-white snap-start">
            <p className="text-[10px] font-bold tracking-[1em] uppercase opacity-40 mb-4">
              Fin.
            </p>
            <h4 className="text-2xl md:text-3xl font-serif leading-tight">
              Explore
              <br />
              Complete
              <br />
              Series
            </h4>
            <Link
              href="/collections"
              className="mt-8 w-12 h-12 rounded-full bg-[#800000] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home_AvailableCollections;
