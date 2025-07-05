"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import MB9 from "../../../public/assets/Image/009.jpg";
import MB7 from "../../../public/assets/Image/007.jpg";
import MB8 from "../../../public/assets/Image/008.jpg";
import MB2 from "../../../public/assets/Image/002.jpg";

export default function Culture() {
  const [isVisible, setIsVisible] = useState(false);

  const contentToggler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Hero Section */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen w-full hidden bg-gradient-to-br from-slate-50 to-amber-50/30 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent mb-6">
              Cultural Heritage
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the timeless beauty and rich traditions that define our
              cultural identity
            </p>
          </motion.div>

          {/* Main Image */}
          <motion.div
            className="relative w-full max-w-md mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600" />
              <div className="absolute inset-3 bg-white shadow-2xl overflow-hidden">
                <Image
                  src={
                    "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-6.png"
                  }
                  alt="Cultural Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { src: "/Image/0007.jpg", label: "Heritage" },
              {
                src: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-2.png",
                label: "Tradition",
              },
              {
                src: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-3.png",
                label: "Artistry",
              },
              {
                src: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-4.png",
                label: "Legacy",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative aspect-square group cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600" />
                <div className="absolute inset-1 bg-white shadow-lg overflow-hidden">
                  <Image
                    src={`https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-1.png`}
                    alt={item.label}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-2 left-2 bg-amber-600 text-white px-2 py-1 text-xs font-semibold">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>

      {/* Showcase Section */}
      <section className="container mx-auto px-1 sm:px-4 py-16">
        <h1 className="text-3xl lg:text-5xl font-bold mb-12 text-customRed">
          OUR SHOWCASE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[MB7, MB8, MB9, MB2].map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-[3/4] group cursor-pointer"
            >
              <div className="relative overflow-hidden h-full">
                <Image
                  src={img}
                  alt={`showcase image ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl lg:text-3xl font-medium mb-8">
          Meticulously Handmade Footwear - Gulbhahar
        </h2>

        <div className="text-gray-700 leading-relaxed text-lg space-y-4">
          <p>
            Welcome to Gulbhahar, where handcrafted excellence meets India's
            finest footwear. Discover a range of spellbinding women's ethnic
            juttis. Each pair is meticulously made with luxury materials and
            expert craftsmanship. Indulge in innovative craftsmanship, where
            designs feature intricate embroidery, luxurious fabrics, and
            timeless motifs celebrating India's rich heritage.
          </p>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden space-y-4"
              >
                <p>
                  Explore our range of juttis, each reflecting the same level of
                  classic artisanal craftsmanship and impeccable designs. At
                  Gulbhahar, we weave a tale of tradition and passion.
                </p>

                <h4 className="text-black font-semibold">
                  What sets Gulbhahar apart is its unwavering commitment to
                  quality and craftsmanship.
                </h4>

                <p>
                  Each piece is specially created to meet the brand's
                  established policy of high-quality goods. Starting with the
                  selection of materials and ending up with minute embroidery
                  and final details, every step is scrutinised.
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-black font-semibold">Why Choose Us?</h4>
                    <p>
                      The Ultimate Combination of Comfort, Style, and Artistry.
                      We believe in crafting experiences that combine the
                      highest workmanship traditions with modern flair.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={contentToggler}
            className="text-customRed hover:underline mt-4 transition-colors duration-300 focus:outline-none"
          >
            {isVisible ? "see less..." : "see more..."}
          </button>
        </div>
      </section>
    </>
  );
}
