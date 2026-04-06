import { CultureItem } from "@/types/home.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HeritageElement {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  accent: string;
  heritage: string;
  region: string;
}

interface  CultureProps {
  Culture : CultureItem[]
}


const Home_NewCulture: React.FC<CultureProps> = ({Culture}) => {
  const cultureList = Array.isArray(Culture) ? Culture : [];

  // ✅ ADD THIS HERE
  if (!cultureList || cultureList.length < 5) {
    return null;   // prevents crashes while data loads
  }

  // Heritage craft elements inspired by traditional Indian artistry
  // const Culture: HeritageElement[] = [
  //   {
  //     id: 1,
  //     title: "Royal Embroidery",
  //     subtitle: "Zardozi & Gold Thread Work",
  //     description:
  //       "At Gulbhahar, royal embroidery is part of our daily work and tradition, and each piece is made slowly, with focus on small details, just like in earlier times. Zardozi and gold thread work are old techniques that people in Indian culture have been using for many years. People usually use them for weddings and special occasions. We like to keep our designs simple and true to where they come from",
  //     image: "/home-page/royal-embroidery-optimized.webp",
  //     color: "from-amber-700 via-yellow-600 to-orange-500",
  //     accent: "border-amber-400",
  //     heritage: "1000+ Years",
  //     region: "Lucknow",
  //   },
  //   {
  //     id: 2,
  //     title: "Handwoven Textiles",
  //     subtitle: "Banarasi & Silk Weaving",
  //     description:
  //       "The handloom fabrics have been a tradition in India, and Gulbhahar is carrying forward this tradition with love and care. Banarasi and Silk Weaving are traditional ways of weaving that have been passed down from generation to generation. These Beautiful Fabrics are famous for their beauty and strength.",
  //     image: "/home-page/handwoven-optimized.webp",
  //     color: "from-purple-700 via-indigo-600 to-blue-500",
  //     accent: "border-purple-400",
  //     heritage: "800+ Years",
  //     region: "Varanasi",
  //   },
  //   {
  //     id: 3,
  //     title: "Leather Artistry",
  //     subtitle: "Traditional Juttiwork",
  //     description:
  //       "Traditional juttiwork is an old indian craft; it takes time, skill and patience. The leather is prepared by hand, so it feels soft and easy to wear. Small embroidery details are added, giving each piece a traditional look without making it heavy. This craft blends well with suits that carry light embroidery, adding a complete look.",
  //     image: "/home-page/leather-artistry-2-optimized.webp",
  //     color: "from-emerald-700 via-teal-600 to-cyan-500",
  //     accent: "border-emerald-400",
  //     heritage: "500+ Years",
  //     region: "Punjab",
  //   },
  //   {
  //     id: 4,
  //     title: "Gemstone Craft",
  //     subtitle: "Crystal Embellishment & Kundan Work ",
  //     description:
  //       "Gemstone work is a craft where small details matter. Crystal and Kundan work have been used in indian dressing, mainly for celebrations and important events. This craft is done with a light hand, keeping the look clean and wearable.",
  //     image: "/home-page/gemstone-craft2-optimized.webp",
  //     color: "from-rose-700 via-pink-600 to-red-500",
  //     accent: "border-rose-400",
  //     heritage: "600+ Years",
  //     region: "Rajasthan",
  //   },
  //   {
  //     id: 5,
  //     title: "Ornate Metals",
  //     subtitle: "Gota Patti, Sequins & Foil Work",
  //     description:
  //       "Ornate Metals (Gota Patti, Sequins & Foil Work) Gota patti, sequins, and foil work have been a part of Indian clothing for a very long time. This type of work is generally seen in weddings, festivals, and family functions. At Gulbhahar, this type of work is done in a calm and simple way, without making the clothes feel heavy and uncomfortable.",
  //     image: "/home-page/ornate-metals-optimized.webp",
  //     color: "from-gray-700 via-slate-600 to-zinc-500",
  //     accent: "border-gray-400",
  //     heritage: "700+ Years",
  //     region: "Bidar",
  //   },
  // ];

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-orange-50/20" />

      {/* Main content */}
      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-6 md:mb-8 tracking-wide uppercase">
            <div className="flex items-center justify-center mb-4 md:mb-6 mt-4">
              <Image
                src="/home-page/culture.svg"
                alt="Cultural Heritage"
                width={600}
                height={200}
                priority
                className="w-full max-w-7xl h-auto drop-shadow-2xl"
              />
            </div>
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-900 leading-relaxed font-light mb-6 md:mb-8">
              Celebrating centuries of masterful craftsmanship where each
              creation tells a story of tradition, luxury, and timeless artistry
              passed down through generations.
            </p>

            {/* Heritage stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">
                  1000+
                </div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">
                  Years of Tradition
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">
                  50+
                </div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">
                  Master Artisans
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">
                  25+
                </div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">
                  Craft Techniques
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage showcase */}
        <div className="max-w-8xl mx-auto">
          {/* Desktop - Premium grid layout */}
          <div className="hidden lg:block">
            <Link href="/heritage-culture">
              <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[900px]">
                {/* Featured Royal Embroidery */}
                <div className="col-span-6 row-span-5 relative group cursor-pointer">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${Culture?.[0]?.color
} rounded-3xl overflow-hidden shadow-2xl ${Culture?.[0]?.accent}
 border-2`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={cultureList[0]?.image || ""}
                       alt={cultureList[0]?.title || ""}

                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="object-cover opacity-50"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="text-right">
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
                            <span className="text-white/90 text-sm font-medium">
                              {cultureList[0].region}
                            </span>
                          </div>
                          <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="text-white text-xs">
                              {cultureList[0].heritage}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
                        <h3 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-3">
                          {cultureList[0].title}
                        </h3>
                        <p className="text-white/90 text-base md:text-lg mb-3 md:mb-4 font-light">
                          {cultureList[0].subtitle}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {cultureList[0].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Handwoven Textiles */}
                <div className="col-span-3 row-span-4 relative group cursor-pointer">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${cultureList[1].color} rounded-2xl overflow-hidden shadow-xl ${cultureList[1].accent} border-2`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={cultureList[1].image}
                        alt={cultureList[1].title}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="object-cover opacity-50"
                      />
                    </div>
                    <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200 text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                          {cultureList[1].heritage}
                        </span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">
                          {cultureList[1].title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {cultureList[1].subtitle}
                        </p>
                        <p className="text-white/80 my-1 text-sm leading-relaxed line-clamp-3">
                          {cultureList[1].description}
                        </p>
                        <p className="text-white/70 text-xs mt-2">
                          {cultureList[1].region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leather Artistry */}
                <div className="col-span-3 row-span-4 relative group cursor-pointer">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${cultureList[2].color} rounded-2xl overflow-hidden shadow-xl ${cultureList[2].accent} border-2`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={cultureList[2].image}
                        alt={cultureList[2].title}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="object-cover opacity-50"
                      />
                    </div>
                    <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-200 text-xs bg-emerald-500/20 px-2 py-1 rounded-full">
                          {cultureList[2].heritage}
                        </span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">
                          {cultureList[2].title}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {cultureList[2].subtitle}
                        </p>
                        <p className="text-white/80 my-1 text-sm leading-relaxed line-clamp-3">
                          {cultureList[1].description}
                        </p>
                        <p className="text-white/70 text-xs mt-2">
                          {cultureList[2].region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gemstone Craft */}
                <div className="col-span-6 row-span-4 relative group cursor-pointer">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${cultureList[3].color} rounded-2xl overflow-hidden shadow-xl ${cultureList[3].accent} border-2`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={cultureList[3].image}
                        alt={cultureList[3].title}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="object-cover opacity-50"
                      />
                    </div>
                    <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="text-right">
                          <span className="text-rose-200 text-sm bg-rose-500/20 px-3 py-1 rounded-full">
                            {cultureList[3].heritage}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                        <h3 className="text-2xl md:text-3xl font-light text-white mb-2 md:mb-3">
                          {cultureList[3].title}
                        </h3>
                        <p className="text-white/80 text-base md:text-lg mb-2 md:mb-3">
                          {cultureList[3].subtitle}
                        </p>
                        <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                          {cultureList[3].description}
                        </p>
                        <p className="text-white/60 text-xs mt-2">
                          {cultureList[3].region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metal Artistry */}
                <div className="col-span-6 row-span-3 relative group cursor-pointer">
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${cultureList[4].color} rounded-2xl overflow-hidden shadow-xl ${cultureList[4].accent} border-2`}
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={cultureList[4].image}
                        alt={cultureList[4].title}
                        fill
                        unoptimized
                        loading="lazy"
                        sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="object-cover opacity-50"
                      />
                    </div>
                    <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-200 text-sm bg-gray-500/20 px-3 py-1 rounded-full">
                          {cultureList[4].heritage}
                        </span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                        <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">
                          {cultureList[4].title}
                        </h3>
                        <p className="text-white/80 text-base md:text-lg mb-2 md:mb-3">
                          {cultureList[4].subtitle}
                        </p>
                        <p className="text-white/70 text-sm line-clamp-3">
                          {cultureList[4].description}
                        </p>
                        <p className="text-white/60 text-xs mt-2">
                          {cultureList[4].region}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Small Screen Screen - Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 no-scrollbar">
              {cultureList.map((element) => (
                <div
                  key={element.id}
                  className="flex-none w-[85vw] sm:w-[500px] md:w-[600px] snap-center"
                >
                  <Link href="/heritage-culture">
                    <div
                      className={`relative aspect-[3/4] bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden shadow-xl border-2 ${element.accent}`}
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={element.image}
                          alt={element.title}
                          fill
                          unoptimized
                          loading="lazy"
                          sizes="(max-width: 640px) 85vw, 500px"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          className="object-cover opacity-50"
                        />
                      </div>
                      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div className="text-right">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 mb-2 inline-block">
                              <span className="text-white/90 text-xs sm:text-sm">
                                {element.region}
                              </span>
                            </div>
                            <div className="block">
                              <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-2 py-1 inline-block">
                                <span className="text-white text-xs sm:text-sm font-medium">
                                  {element.heritage}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 md:p-6 border border-white/20">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-2">
                            {element.title}
                          </h3>
                          <p className="text-white/90 text-sm sm:text-base md:text-lg mb-3">
                            {element.subtitle}
                          </p>
                          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-4">
                            {element.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/heritage-culture">
            <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-light text-base md:text-lg shadow-2xl border border-amber-400/30 hover:bg-gradient-to-r hover:from-amber-700 hover:to-orange-700 transition-colors duration-300 pointer-events-auto">
              Explore Our Heritage Collection
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home_NewCulture;
