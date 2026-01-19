"use client";

import OptimizedImage from "@/shared-components/cloudfront/OptmizedImage";
import Link from "next/link";

export default function MatchSareeSection() {
  const sareeMatchData = [
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/engagement-saree-collection/engagement-saree-collection_2.jpg",
      link: "/collections/engagement-saree",
      label: "Engagement Saree",
      jutti: "Ivory Pearl Jutti",
      isNew: true,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/bridal-look-in-saree/bridal-look-in-saree_5.jpg",
      link: "/collections/bridal-saree",
      label: "Bridal Saree",
      jutti: "Red Zardozi Jutti",
      isNew: false,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/cotton-bandhani-saree/cotton-bandhani-saree_5.jpg",
      link: "/collections/bandhani-saree",
      label: "Bandhani Saree",
      jutti: "Yellow Thread Jutti",
      isNew: false,
    },
    {
      img: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/sold_out/chiffon-banarasi-saree/chiffon-banarasi-saree_1.jpg",
      link: "/collections/banarasi-saree",
      label: "Banarasi Saree",
      jutti: "Gold Beaded Jutti",
      isNew: true,
    },
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-1 sm:px-4 py-16">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-3xl lg:text-5xl font-bold text-black mb-3">
          Sarees Perfectly Paired
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
          Handpicked sarees matched with handcrafted juttis for an effortless ethnic look.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sareeMatchData.map((item, i) => (
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
