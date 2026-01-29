"use client";

import Image from "next/image";
import Link from "next/link";

export default function MatchCollection() {

  const data = [
    {
      img: "https://d21ojmskh8ksuv.cloudfront.net/sold_out/engagement-saree-collection/engagement-saree-collection_2.jpg",
      link: "/collections/bridal-saree-collection",
      label: "Sarees",
      isNew: true,
    },
    {
      img: "https://d21ojmskh8ksuv.cloudfront.net/sold_out/lavender-suit/lavender-suit_2.jpg",
      link: "collections/plain-suit",
      label: "Suits",
      isNew: true,
    },
    {
      img: "https://d21ojmskh8ksuv.cloudfront.net/sold_out/chiffon-banarasi-saree/chiffon-banarasi-saree_1.jpg",
      link: "/collections/chiffon-banarasi-saree",
      label: "Banarasi Saree",
      isNew: true,
    },
    {
      img: "/home-page/showcase-003-optimized.webp",
      link: "/collections/juttis",
      label: "Juttis",
      isNew: false,
    },
  ];

  return (
    <>
      <section className="max-w-[1600px] mx-auto px-1 sm:px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[rgb(0 0 0)] mb-3">
            Perfect Match
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
            Discover our latest additions! Explore exquisite <span className="font-semibold text-[#7f0001]">Suits</span>,
            elegant <span className="font-semibold text-[#7f0001]">Sarees</span>, and our signature handcrafted
            <span className="font-semibold text-[#7f0001]"> Juttis</span> – all designed to complement your unique style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] group cursor-pointer"
            >
              <Link href={item.link}>
                <div className="relative overflow-hidden h-full rounded-lg">
                  <Image
                    src={item.img}
                    priority
                    alt={`${item.label} collection`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* NEW Badge */}
                  {item.isNew && (
                    <div className="absolute top-3 right-3 bg-[#7f0001] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg z-10">
                      NEW
                    </div>
                  )}

                  {/* Category Label */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-white text-xl sm:text-2xl font-bold tracking-wide">
                      {item.label}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>


         
      </section>
      <section className="max-w-[1600px] mx-auto px-1 sm:px-4 py-16">
       
        <div className="col-span-full w-full my-4">
                          <Image
                            src="https://d21ojmskh8ksuv.cloudfront.net/public/banner-image.jpg"
                            height={656}
                            width={1000}
                            alt="Similar Products Below"
                            className="w-full h-auto sm:h-[220px] md:h-[656px] object-cover rounded-lg shadow-lg"
                          />
                        </div>
                         </section>
    </>
  );
}
