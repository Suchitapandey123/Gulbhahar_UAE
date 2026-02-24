// src/app/signup/components/Carousel.jsx
"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
      title: "Exclusive Collections",
      subtitle: "Discover curated bags for every occasion",
    },
    {
      image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
      title: "Elegant Designs",
      subtitle: "Traditional lehengas crafted with care",
    },
    {
      image: "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
      title: "Premium Quality",
      subtitle: "Suits that define your style",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <div className="relative h-full w-full overflow-hidden md:rounded-l-3xl group">
        {/* ONLY IMAGES - NO BACKGROUND COLORS */}
        <div className="h-full w-full relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-110 z-0'
              }`}
            >
              {/* Pure Image - Full Screen with object-position: top */}
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  style={{ objectPosition: 'top' }} // This makes image stick to top, cropping from bottom
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Subtle gradient overlay to reduce image dominance */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-black/10" />
            </div>
          ))}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 z-20">
          {/* Top */}
          {/* <div className="flex justify-between items-start">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Join 10,000+ members
              </span>
            </div>
          </div> */}

          {/* Bottom */}
          <div className="space-y-6">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                {index === currentSlide && (
                  <div className="space-y-2.5 max-w-md">
                    <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-white/75 text-base font-light tracking-wide drop-shadow">
                      {slide.subtitle}
                    </p>
                    <button className="mt-1 bg-white/90 backdrop-blur-sm text-gray-900 px-5 py-2 rounded-lg font-medium hover:bg-white transition-all duration-300 text-xs tracking-wide uppercase">
                      Shop Collection →
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? 'w-8 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;