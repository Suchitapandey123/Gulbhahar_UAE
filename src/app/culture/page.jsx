"use client";

import React from "react";
import { motion } from "framer-motion";

const heritageCards = [
  {
    id: 1,
    title: "Royal Zardozi Embroidery",
    subtitle: "Gold & Silver Threadwork Fit for Kings",
    description: `
      Zardozi is a luxurious Persian-origin embroidery introduced in India by the Mughals.
      Once used to decorate royal attire, tents, and thrones, Zardozi now thrives in Lucknow.
      Skilled artisans use metallic threads, sequins, and pearls on velvet and satin to create
      opulent masterpieces fit for modern royalty.
    `,
    region: "Lucknow, India",
    heritage: "Mughal Era Heritage (GI Tagged)",
    emojis: ["✨", "🧵"],
    color: "from-[#d1c4e9] to-[#f8bbd0]",
  },
  {
    id: 2,
    title: "Banarasi Silk Weaving",
    subtitle: "The Gold-Woven Dreams of Varanasi",
    description: `
      Banarasi silk saris are known worldwide for their shimmering zari work,
      intricate brocades, and Mughal-inspired designs. Weaving a single sari
      often takes over 15 days, reflecting deep cultural heritage and timeless grace.
    `,
    region: "Varanasi, India",
    heritage: "UNESCO Intangible Cultural Heritage",
    emojis: ["🕸️", "🧶"],
    color: "from-[#ffe082] to-[#ffccbc]",
  },
  {
    id: 3,
    title: "Kashmiri Leather Craft",
    subtitle: "Pashmina-Lined Masterpieces",
    description: `
      Known for its durability and beauty, Kashmiri leatherwork involves
      carving, dyeing, and pashmina lining. Artisans preserve ancient Persian
      and Central Asian techniques to create elegant utility items with a warm soul.
    `,
    region: "Srinagar, Kashmir",
    heritage: "Himalayan Protected Craft",
    emojis: ["👞", "🛠️"],
    color: "from-[#b2dfdb] to-[#80cbc4]",
  },
  {
    id: 4,
    title: "Jaipur Gemstone Art",
    subtitle: "The Jeweled Legacy of Maharajas",
    description: `
      Using the royal art of Kundan Meena, Jaipur artisans embed gems in gold foil
      and enamel inlays. Every piece tells a story of regal India, combining luxury,
      devotion, and ornamental mastery passed down for generations.
    `,
    region: "Jaipur, Rajasthan",
    heritage: "Royal Warranty Holders",
    emojis: ["💎", "⚜️"],
    color: "from-[#f8bbd0] to-[#f48fb1]",
  },
  {
    id: 5,
    title: "Bidri Metal Inlay",
    subtitle: "Black Gold of Deccan",
    description: `
      A rare blend of Persian technique and Deccan soil, Bidriware uses oxidized
      zinc with silver inlays. These artifacts shine through their black-silver contrast
      and represent the legacy of Hyderabad’s Indo-Islamic design.
    `,
    region: "Bidar, Karnataka",
    heritage: "Geographical Indication Protected",
    emojis: ["🔱", "🔨"],
    color: "from-[#cfd8dc] to-[#b0bec5]",
  },
];

const CultureScroll = () => {
  return (
    <div className="relative mt-16 w-full min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fdf0e3] to-[#fce8d9] text-gray-900 font-sans">
      {/* Floating decorative particles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-50px] left-[-40px] w-72 h-72 bg-purple-300 opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-[-30px] w-80 h-80 bg-pink-200 opacity-20 blur-2xl rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-300 opacity-10 blur-3xl rounded-full animate-bounce-slow" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-center py-20 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 drop-shadow-lg"
      >
        Eternal Indian Craftsmanship
      </motion.h1>

      {heritageCards.map((card, index) => (
        <motion.section
          key={card.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="relative min-h-screen w-full px-6 md:px-20 py-16 flex flex-col justify-center"
        >
          <div
            className={`bg-gradient-to-br ${card.color} rounded-3xl shadow-xl p-10 md:p-16 backdrop-blur-md bg-opacity-50 border border-white/20 transition-transform hover:scale-[1.015] hover:shadow-2xl duration-500`}
          >
            <div className="flex gap-4 text-4xl mb-4 animate-fade-in">{card.emojis.join(" ")}</div>
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold mb-2 tracking-tight text-gray-900">
              {card.title}
            </h2>
            <h3 className="text-lg md:text-xl italic text-gray-800 mb-6">
              {card.subtitle}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-4xl">
              {card.description}
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Region:</strong> {card.region}</p>
              <p><strong>Heritage Status:</strong> {card.heritage}</p>
              <p><strong>Design Index:</strong> {index + 1} / {heritageCards.length}</p>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default CultureScroll;
   