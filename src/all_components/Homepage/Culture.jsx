"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Culture() {
  const [isVisible, setIsVisible] = useState(false);

  const contentToggler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Showcase Section */}
      <section className=" max-w-[1600px] mx-auto px-1 sm:px-4 py-16">
        <h1 className="text-3xl lg:text-5xl font-bold mb-12 text-customRed">
          OUR SHOWCASE
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["/home-page/showcase-001-optimized.webp", "/home-page/showcase-002-optimized.webp", "/home-page/showcase-003-optimized.webp", "/home-page/showcase-003-optimized.webp"].map((img, i) => (
            <motion.div
              key={i}
              className="relative aspect-[3/4] group cursor-pointer"
            >
              <div className="relative overflow-hidden h-full">
                <Image
                  src={img}
                  priority
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
      <section className="max-w-[1600px] mx-auto px-4 py-16">
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
