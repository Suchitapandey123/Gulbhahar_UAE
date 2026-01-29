'use client';

import { memo, useMemo } from 'react';

// Brand name constant - could be moved to config if needed elsewhere
const BRAND_NAME = 'GULBHAHAR';

// Taglines as a constant array for easy updates
const TAGLINES = ['Handcrafted', 'Tailored with Love', 'Piece by Piece'] as const;

// Font family style object - reused across elements
const serifFont = { fontFamily: "'Old Standard TT', serif" } as const;

const BrandSection = memo(() => {
  // Memoize the brand letters to prevent re-computation on each render
  const brandLetters = useMemo(
    () =>
      BRAND_NAME.split('').map((letter, index) => (
        <span key={index} className="inline-block tracking-tighter px-1 sm:px-2">
          {letter}
        </span>
      )),
    []
  );

  return (
    <section
      className="py-12 sm:py-16 md:py-24 px-4 max-w-[1600px] mx-auto"
      aria-label="Brand introduction"
    >
      <div className="relative">
        {/* Main Brand Name */}
        <div className="text-center">
          <h2
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider text-[#8B0000] font-light leading-tight"
            style={serifFont}
          >
            {brandLetters}
          </h2>
        </div>

        {/* Taglines - responsive flexbox */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 mt-4 sm:mt-6 text-[#8B0000]">
          {TAGLINES.map((tagline, index) => (
            <h3
              key={tagline}
              className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light tracking-wide ${
                index === 0
                  ? 'text-center sm:text-left'
                  : index === 2
                    ? 'text-center sm:text-right'
                    : 'text-center'
              }`}
              style={serifFont}
            >
              {tagline}
            </h3>
          ))}
        </div>

        {/* Subtle decorative background */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#8B0000]/5 via-transparent to-transparent opacity-30" />
        </div>
      </div>
    </section>
  );
});

BrandSection.displayName = 'BrandSection';

export default BrandSection;
