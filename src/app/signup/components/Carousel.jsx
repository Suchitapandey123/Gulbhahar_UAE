// src/app/signup/components/Carousel.jsx
"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/Signup/001.webp",
    "/Signup/002.webp", 
    "/Signup/003.webp",
    "/Signup/004.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-full w-full max-h-[85vh] overflow-hidden bg-gradient-to-br from-red-100 to-rose-200 rounded-2xl shadow-2xl">
      <div className="h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute h-full w-full transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide}
              alt={`Carousel slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-red-900/20"></div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="text-white">
          <h3 className="text-3xl font-bold mb-3">Join Our Community</h3>
          <p className="text-red-100 text-lg">Create your account and start your journey with us</p>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide 
                ? 'w-8 bg-white shadow-lg' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;