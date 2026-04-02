"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Category {
  name: string;
  image: string;
  slug: string;
}

interface CollectionCardProps {
  category: Category;
  index: number;
}

const CollectionCard = ({ category, index }: CollectionCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex-none w-[80vw] sm:w-[400px] md:w-[400px] snap-start relative border-r border-[#1a1a1a]"
    >
      <Link
        href={`/${category.slug}`}
        className="block relative h-[500px] md:h-[600px] group overflow-hidden"
      >
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          unoptimized={category.image.includes('d21ojmskh8ksuv.cloudfront.net')}
          sizes="(max-width: 640px) 80vw, 400px"
          quality={60}
          priority={index < 2}
          loading={index < 2 ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className={`object-cover transition-transform duration-700 ${
            isInView ? "scale-105" : "scale-100"
          } md:scale-100 md:group-hover:scale-105`}
        />

        {/* Vertical Label */}
        <div
          className={`absolute top-0 left-0 h-full w-12 md:w-16 bg-[#1a1a1a] flex items-center justify-center transform transition-transform duration-500 z-20 ${
            isInView ? "translate-x-0" : "-translate-x-full"
          } md:-translate-x-full md:group-hover:translate-x-0`}
        >
          <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.5em] uppercase rotate-90 whitespace-nowrap">
            {category.name}
          </span>
        </div>

        {/* Bottom Content */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-6 md:p-12 transition-all duration-500 z-10 bg-gradient-to-t from-black via-black/20 to-transparent ${
            isInView ? "pl-16" : "pl-6"
          } md:pl-12 md:group-hover:pl-24`}
        >
          <div className="space-y-2 md:space-y-4">
            <span className="text-white/60 text-[8px] md:text-[10px] font-bold tracking-[0.6em] uppercase block">
              Collection {index + 1}
            </span>
            <h3 className="text-white text-3xl md:text-6xl font-serif tracking-tight leading-none">
              {category.name}
            </h3>

            <div className="flex items-center gap-4 pt-2 md:pt-4 overflow-hidden">
              <div
                className={`h-px bg-[#800000] transition-all duration-500 ${
                  isInView ? "w-16" : "w-0"
                } md:w-0 md:group-hover:w-16`}
              />
              <span
                className={`text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-opacity text-nowrap duration-500 flex items-center gap-2 ${
                  isInView ? "opacity-100" : "opacity-0"
                } md:opacity-0 md:group-hover:opacity-100`}
              >
                View Collection{" "}
                <ArrowRight size={14} className="text-[#800000]" />
              </span>
            </div>
          </div>
        </div>

        {/* Border Effect */}
        <div
          className={`absolute inset-0 border-[#800000]/10 transition-all duration-500 pointer-events-none ${
            isInView ? "border-[16px]" : "border-[0px]"
          } md:border-[0px] md:group-hover:border-[16px]`}
        />
      </Link>
    </div>
  );
};

export default CollectionCard;
