"use client";

import OptimizedImage from "@/shared-components/cloudfront/OptmizedImage";
import Link from "next/link";

export default function MatchSuitSection() {
  const suitMatchData = [
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/lavender-suit/lavender-suit_2.jpg",
      link: "/collections/plain-suit",
      label: "Lavender Suit Set",
      jutti: "Pink Thread Jutti",
      isNew: true,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/indo-western-suit/indo-western-suit_3.jpg",
      link: "/collections/designer-suits",
      label: "Designer Suit Set",
      jutti: "Golden Bead Jutti",
      isNew: false,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/indo-western-suit/indo-western-suit_2.jpg",
      link: "/collections/anarkali-suits",
      label: "Anarkali Suit Set",
      jutti: "Maroon Zari Jutti",
      isNew: false,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/cotton-suit/cotton-suit_1.jpg",
      link: "/collections/cotton-suits",
      label: "Cotton Suit Set",
      jutti: "Beige Handwork Jutti",
      isNew: true,
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-1 sm:px-4 py-16">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-3">
          Matching Suit Sets
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
          Discover suits paired with matching handcrafted juttis for a complete festive look.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suitMatchData.map((item, i) => (
          <Link key={i} href={item.link}>
            <div className="relative group cursor-pointer aspect-[3/4] rounded-lg overflow-hidden">
              <OptimizedImage
                src={item.img}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* NEW Badge */}
              {item.isNew && (
                <div className="absolute top-3 right-3 bg-[#7f0001] text-white px-3 py-1 rounded-full text-xs font-bold">
                  NEW
                </div>
              )}

              {/* Text */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h3 className="text-xl font-bold">{item.label}</h3>
                <p className="text-sm opacity-90">{item.jutti}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
