"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export const ImageSlider = ({ images, alt }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleMouseEnter = () => {
    if (images.length <= 1) return;
    clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    slideIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
  };

  const handleMouseLeave = () => {
    clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    setCurrentIndex(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (images.length <= 1) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 30) return;

    if (diff > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(slideIntervalRef.current as NodeJS.Timeout);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((image, idx) => (
        <Image
          key={idx}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={60}
          src={image}
          alt={`${alt} - ${idx + 1}`}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 ${
            currentIndex === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10 pointer-events-none">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                currentIndex === idx ? "bg-red-900 w-2.5" : "bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
