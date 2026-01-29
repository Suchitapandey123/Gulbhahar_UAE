"use client";

import { motion } from "framer-motion";
import { Eye, Play, Store, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Sample Reel Data
const REELS_DATA = [
  {
    id: 1,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/saree.mp4",
    title: "The Ethereal Saree",
    product: {
      name: "Handcrafted Silk Saree",
      price: "₹14,999",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/saree.webp",
    },
  },
  {
    id: 2,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/suits.mp4",
    title: "Royal Suit Edit",
    product: {
      name: "Embroidered Velvet Suit",
      price: "₹12,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
    },
  },
  {
    id: 3,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/lehenga.mp4",
    title: "The Grand Lehenga",
    product: {
      name: "Bridal Heritage Lehenga",
      price: "₹45,999",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
    },
  },
  {
    id: 4,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/jewellery.mp4",
    title: "Timeless Jewels",
    product: {
      name: "Kundan Statement Set",
      price: "₹8,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/jewellery.webp",
    },
  },
  {
    id: 5,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/bags.mp4",
    title: "Artisan Bags",
    product: {
      name: "Hand-Embroidered Potli",
      price: "₹3,299",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
    },
  },
  {
    id: 6,
    videoUrl:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/watch-and-shop/juttis.mp4",
    title: "The Soulful Juttis",
    product: {
      name: "Traditional Leather Juttis",
      price: "₹2,499",
      image:
        "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/juttis.webp",
    },
  },
];

const ReelCard = ({ reel }: { reel: (typeof REELS_DATA)[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewCount] = useState(
    () => (Math.random() * (25 - 1.5) + 1.5).toFixed(1) + "k",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current
              ?.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      className="relative flex-none w-[280px] md:w-[320px] aspect-[9/16] overflow-hidden group bg-gradient-to-br from-neutral-900 to-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute  inset-0 w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Play Indicator for non-autoplay scenarios or feedback */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-full bg-white/20 backdrop-blur-md"
          >
            <Play className="text-white fill-white" size={32} />
          </motion.div>
        </div>
      )}

      {/* Header Info */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span className="text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-2">
            <Eye size={12} className="text-white" />
            {viewCount} Views
          </span>
        </div>
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Reel Info */}
      <div className="absolute bottom-4 left-4 right-4 space-y-4">
        <div>
          <h3 className="text-white font-serif text-2xl leading-tight mb-1 group-hover:translate-y-[-4px] transition-transform duration-500">
            {reel.title}
          </h3>
          <p className="text-white/60 text-xs font-medium tracking-wide">
            Featured Collection
          </p>
        </div>
        <button className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#800000] hover:text-white transition-all duration-500 flex items-center justify-center gap-3 group/btn shadow-xl active:scale-[0.98]">
          <Store
            size={15}
            className="group-hover/btn:scale-110 transition-transform"
          />
          Visit Collection
        </button>
      </div>
    </motion.div>
  );
};

const Home_WatchAndShop = () => {
  return (
    <section className="overflow-hidden mt-8">
      <div className="flex flex-col  space-y-4 justify-center mb-6">
        {/* <div className=""> */}
        <div className="flex justify-center items-center gap-3">
          <span className="w-16 h-px bg-[#800000]" />
          <span className="text-[#800000] text-[11px] font-bold tracking-[0.4em] uppercase">
            Gulbhahar Studio
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl text-center font-serif text-[#1a1a1a] leading-[1.1]">
          Watch <span className="italic text-[#800000] serif-italics">&</span>{" "}
          Shop
        </h2>

        <p className="text-gray-500  text-center text-base md:text-lg leading-relaxed font-light">
          Experience our latest silhouettes in motion. Every thread tells a
          story of heritage, now just a tap away.
        </p>
      </div>
      {/* </div> */}

      {/* Horizontal Reels Container */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-proximity md:snap-mandatory cursor-grab active:cursor-grabbing">
          {REELS_DATA.map((reel, index) => (
            <div key={reel.id} className="snap-center">
              <ReelCard reel={reel} />
            </div>
          ))}

          {/* Trailer space */}
          <div className="flex-none w-12" />
        </div>
      </div>
    </section>
  );
};

export default Home_WatchAndShop;
