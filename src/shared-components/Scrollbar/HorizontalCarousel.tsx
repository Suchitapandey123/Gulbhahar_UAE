"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface HorizontalCarouselProps {
  children: React.ReactNode;
  className?: string; // Classes for the scrollable container
  wrapperClassName?: string; // Classes for the outer wrapper
}

export default function HorizontalCarousel({
  children,
  className = "",
  wrapperClassName = "",
}: HorizontalCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true); // Assume true initially if content loads

  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Use a small threshold to avoid float rounding issues
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    // ResizeObserver for content changes (e.g. images loading)
    const resizeObserver = new ResizeObserver(() => checkScroll());
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of view width
    const currentScroll = container.scrollLeft;
    const targetScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* Scrollable Container */}
      {/* Ensure no-scrollbar is applied to hide native bars */}
      <div ref={scrollContainerRef} className={`no-scrollbar ${className}`}>
        {children}
      </div>

      {/* Navigation Controls - Below content, Right aligned */}
      <div className="hidden md:flex justify-end gap-3 mt-8 mr-2">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`
            w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300
            ${
              canScrollLeft
                ? "bg-white text-[#800000] hover:bg-[#800000] hover:text-white shadow-sm hover:shadow-md cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
            }
          `}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`
            w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300
            ${
              canScrollRight
                ? "bg-white text-[#800000] hover:bg-[#800000] hover:text-white shadow-sm hover:shadow-md cursor-pointer"
                : "bg-gray-50 text-gray-300 cursor-not-allowed opacity-50"
            }
          `}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
