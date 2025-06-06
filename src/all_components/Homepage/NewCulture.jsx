'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import culture from "../../../public/assets/Svg/culture.svg";

const LuxuryCulture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [activeCard, setActiveCard] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Heritage craft elements inspired by traditional Indian artistry
  const heritageElements = [
    {
      id: 1,
      title: "Royal Embroidery",
      subtitle: "Zardozi & Gold Thread Work",
      description: "Intricate hand-embroidered patterns passed down through generations of master artisans, featuring gold and silver threads that tell stories of royal courts.",
      image: "/gulbhahar-1.png",
      color: "from-amber-700 via-yellow-600 to-orange-500",
      accent: "border-amber-400",
      pattern: "✨",
      craft: "🧵",
      heritage: "1000+ Years",
      region: "Lucknow"
    },
    {
      id: 2,
      title: "Handwoven Textiles",
      subtitle: "Banarasi & Silk Weaving",
      description: "Luxurious silk fabrics woven on traditional looms, creating timeless patterns that have adorned Indian royalty for centuries.",
      image: "/gulbhahar2.png",
      color: "from-purple-700 via-indigo-600 to-blue-500",
      accent: "border-purple-400",
      pattern: "🕸️",
      craft: "🧶",
      heritage: "800+ Years",
      region: "Varanasi"
    },
    {
      id: 3,
      title: "Leather Artistry",
      subtitle: "Traditional Juttiwork",
      description: "Master craftsmen shape premium leather into exquisite footwear, each pair telling a story of skill, tradition, and timeless elegance.",
      image: "/gulbhahar-3.png",
      color: "from-emerald-700 via-teal-600 to-cyan-500",
      accent: "border-emerald-400",
      pattern: "👞",
      craft: "🛠️",
      heritage: "500+ Years",
      region: "Punjab"
    },
    {
      id: 4,
      title: "Gemstone Craft",
      subtitle: "Jadau & Kundan Work",
      description: "Precious stones and pearls meticulously set by hand, creating jewelry pieces that capture light and tradition in perfect harmony.",
      image: "/gulbhahar-4.png",
      color: "from-rose-700 via-pink-600 to-red-500",
      accent: "border-rose-400",
      pattern: "💎",
      craft: "⚜️",
      heritage: "600+ Years",
      region: "Rajasthan"
    },
    {
      id: 5,
      title: "Metal Artistry",
      subtitle: "Bidriware & Damascening",
      description: "Ancient techniques of inlaying precious metals create stunning decorative pieces that showcase the pinnacle of Indian metalwork mastery.",
      image: "/gulbhahar-1.png",
      color: "from-gray-700 via-slate-600 to-zinc-500",
      accent: "border-gray-400",
      pattern: "🔱",
      craft: "🔨",
      heritage: "700+ Years",
      region: "Bidar"
    }
  ];

  const FloatingMotif = ({ pattern, delay, size, color }) => (
    <motion.div
      className={`absolute text-${size} ${color} opacity-20`}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-30, 30, -30],
        rotate: [0, 360],
        scale: [0.8, 1.2, 0.8],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{
        duration: 12 + Math.random() * 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {pattern}
    </motion.div>
  );

  return (
    <motion.section
      ref={ref}
      style={{ y }}
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50"
    >
      {/* Luxury pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-orange-50/20" />
        
        {/* Traditional motifs floating */}
        {['🕉️', '🌸', '🦚', '🔱', '⚜️', '🌺', '✨', '🧿'].map((motif, i) => (
          <FloatingMotif
            key={i}
            pattern={motif}
            delay={i * 0.8}
            size={i % 3 === 0 ? "4xl" : "2xl"}
            color="text-amber-600"
          />
        ))}

        {/* Premium texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
      </div>

      {/* Luxury cursor follower */}
      <motion.div
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-30 backdrop-blur-sm"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        {/* Luxury header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Brand motif */}
          <motion.div
            className="inline-flex items-center justify-center gap-4 mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-full border border-amber-200/50 shadow-lg"
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 10px 30px rgba(251, 191, 36, 0.1)",
                "0 20px 60px rgba(251, 191, 36, 0.2)",
                "0 10px 30px rgba(251, 191, 36, 0.1)"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-4xl">🏛️</span>
            <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-orange-500" />
            <span className="text-4xl">🎨</span>
            <div className="w-px h-8 bg-gradient-to-b from-amber-400 to-orange-500" />
            <span className="text-4xl">✨</span>
          </motion.div>
          
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-light bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-8 tracking-wide"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Image
                src={culture}
                alt="Cultural Heritage"
                width={600}
                height={200}
                className="w-full max-w-4xl h-auto drop-shadow-2xl"
              />
            </div>
          </motion.h1>
          
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-amber-900 leading-relaxed font-light mb-8">
              Celebrating centuries of masterful craftsmanship where each creation tells a story 
              of tradition, luxury, and timeless artistry passed down through generations.
            </p>
            
            {/* Heritage stats */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-amber-800 mb-1">1000+</div>
                <div className="text-sm text-amber-700 uppercase tracking-wider">Years of Tradition</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-amber-800 mb-1">50+</div>
                <div className="text-sm text-amber-700 uppercase tracking-wider">Master Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-light text-amber-800 mb-1">25+</div>
                <div className="text-sm text-amber-700 uppercase tracking-wider">Craft Techniques</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Heritage showcase */}
        <div className="max-w-8xl mx-auto">
          {/* Desktop - Premium grid layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[900px]">
              {/* Featured Royal Embroidery */}
              <motion.div
                className="col-span-6 row-span-5 relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                onHoverStart={() => setActiveCard(1)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[0].color} rounded-3xl overflow-hidden shadow-2xl ${heritageElements[0].accent} border-2`}>
                  <div className="absolute inset-0">
                    <Image
                      src={heritageElements[0].image}
                      alt={heritageElements[0].title}
                      fill
                      className="object-cover opacity-20"
                    />
                  </div>
                  
                  {/* Luxury texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="flex items-center gap-4"
                        animate={{
                          scale: activeCard === 1 ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-6xl">{heritageElements[0].pattern}</span>
                        <span className="text-5xl">{heritageElements[0].craft}</span>
                      </motion.div>
                      <div className="text-right">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
                          <span className="text-white/90 text-sm font-medium">{heritageElements[0].region}</span>
                        </div>
                        <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-white text-xs">{heritageElements[0].heritage}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                      animate={{
                        y: activeCard === 1 ? -10 : 0,
                        opacity: activeCard === 1 ? 1 : 0.9
                      }}
                    >
                      <h3 className="text-4xl font-light text-white mb-3">{heritageElements[0].title}</h3>
                      <p className="text-white/90 text-lg mb-4 font-light">{heritageElements[0].subtitle}</p>
                      <p className="text-white/80 text-sm leading-relaxed">{heritageElements[0].description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Handwoven Textiles */}
              <motion.div
                className="col-span-3 row-span-4 relative group cursor-pointer"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                onHoverStart={() => setActiveCard(2)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[1].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[1].accent} border-2`}>
                  <div className="absolute inset-0">
                    <Image
                      src={heritageElements[1].image}
                      alt={heritageElements[1].title}
                      fill
                      className="object-cover opacity-30"
                    />
                  </div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{heritageElements[1].pattern}</span>
                        <span className="text-3xl">{heritageElements[1].craft}</span>
                      </div>
                      <span className="text-purple-200 text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                        {heritageElements[1].heritage}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-2xl font-light text-white mb-2">{heritageElements[1].title}</h3>
                      <p className="text-white/80 text-sm">{heritageElements[1].subtitle}</p>
                      <p className="text-white/70 text-xs mt-2">{heritageElements[1].region}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Leather Artistry */}
              <motion.div
                className="col-span-3 row-span-4 relative group cursor-pointer"
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                onHoverStart={() => setActiveCard(3)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[2].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[2].accent} border-2`}>
                  <div className="absolute inset-0">
                    <Image
                      src={heritageElements[2].image}
                      alt={heritageElements[2].title}
                      fill
                      className="object-cover opacity-25"
                    />
                  </div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-4xl">{heritageElements[2].pattern}</span>
                        <span className="text-3xl">{heritageElements[2].craft}</span>
                      </div>
                      <span className="text-emerald-200 text-xs bg-emerald-500/20 px-2 py-1 rounded-full">
                        {heritageElements[2].heritage}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-2xl font-light text-white mb-2">{heritageElements[2].title}</h3>
                      <p className="text-white/80 text-sm">{heritageElements[2].subtitle}</p>
                      <p className="text-white/70 text-xs mt-2">{heritageElements[2].region}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Gemstone Craft */}
              <motion.div
                className="col-span-4 row-span-4 relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                onHoverStart={() => setActiveCard(4)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[3].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[3].accent} border-2`}>
                  <div className="absolute inset-0">
                    <Image
                      src={heritageElements[3].image}
                      alt={heritageElements[3].title}
                      fill
                      className="object-cover opacity-30"
                    />
                  </div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl">{heritageElements[3].pattern}</span>
                        <span className="text-4xl">{heritageElements[3].craft}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-rose-200 text-sm bg-rose-500/20 px-3 py-1 rounded-full">
                          {heritageElements[3].heritage}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <h3 className="text-3xl font-light text-white mb-3">{heritageElements[3].title}</h3>
                      <p className="text-white/80 text-lg mb-3">{heritageElements[3].subtitle}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{heritageElements[3].description}</p>
                      <p className="text-white/60 text-xs mt-2">{heritageElements[3].region}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Metal Artistry */}
              <motion.div
                className="col-span-5 row-span-3 relative group cursor-pointer"
                initial={{ opacity: 0, x: -100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.0 }}
                onHoverStart={() => setActiveCard(5)}
                onHoverEnd={() => setActiveCard(null)}
              >
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[4].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[4].accent} border-2`}>
                  <div className="absolute inset-0">
                    <Image
                      src={heritageElements[4].image}
                      alt={heritageElements[4].title}
                      fill
                      className="object-cover opacity-40"
                    />
                  </div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl">{heritageElements[4].pattern}</span>
                        <span className="text-4xl">{heritageElements[4].craft}</span>
                      </div>
                      <span className="text-gray-200 text-sm bg-gray-500/20 px-3 py-1 rounded-full">
                        {heritageElements[4].heritage}
                      </span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                      <h3 className="text-2xl font-light text-white mb-2">{heritageElements[4].title}</h3>
                      <p className="text-white/80 text-lg mb-3">{heritageElements[4].subtitle}</p>
                      <p className="text-white/70 text-sm">{heritageElements[4].description}</p>
                      <p className="text-white/60 text-xs mt-2">{heritageElements[4].region}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tablet layout */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="col-span-2 aspect-[4/3]">
                <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[0].color} rounded-2xl overflow-hidden border-2 ${heritageElements[0].accent}`}>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{heritageElements[0].pattern}</span>
                        <span className="text-3xl">{heritageElements[0].craft}</span>
                      </div>
                      <h3 className="text-2xl font-light text-white">{heritageElements[0].title}</h3>
                      <p className="text-white/80 text-sm">{heritageElements[0].subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 grid grid-rows-2 gap-6">
                {heritageElements.slice(1, 3).map((element, index) => (
                  <div key={element.id} className={`relative bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden border-2 ${element.accent}`}>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">{element.pattern}</span>
                        <span className="text-2xl">{element.craft}</span>
                      </div>
                      <h3 className="text-lg font-light text-white">{element.title}</h3>
                      <p className="text-white/70 text-xs">{element.region}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-span-4 grid grid-cols-2 gap-6">
                {heritageElements.slice(3, 5).map((element, index) => (
                  <div key={element.id} className={`relative aspect-[3/2] bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden border-2 ${element.accent}`}>
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl">{element.pattern}</span>
                          <span className="text-2xl">{element.craft}</span>
                        </div>
                        <h3 className="text-xl font-light text-white">{element.title}</h3>
                        <p className="text-white/80 text-sm">{element.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-8">
            {heritageElements.map((element, index) => (
              <motion.div
                key={element.id}
                className={`relative h-80 bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden mx-4 shadow-xl border-2 ${element.accent}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={element.image}
                    alt={element.title}
                    fill
                    className="object-cover opacity-20"
                  />
                </div>
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{element.pattern}</span>
                      <span className="text-3xl">{element.craft}</span>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 mb-1">
                        <span className="text-white/90 text-xs">{element.region}</span>
                      </div>
                      <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
                        <span className="text-white text-xs">{element.heritage}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <h3 className="text-2xl font-light text-white mb-2">{element.title}</h3>
                    <p className="text-white/90 text-lg mb-3">{element.subtitle}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{element.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-light text-lg shadow-2xl border border-amber-400/30"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(251, 191, 36, 0.4)",
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Heritage Collection
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LuxuryCulture;