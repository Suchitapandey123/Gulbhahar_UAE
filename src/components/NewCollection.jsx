
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import ArrowVector from "./ui/ArrowVector";
import { ArrowRight } from "lucide-react";
import ArrowLeft from "./ui/ArrowLeft";

export default function NewCollection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  const collections = [
    {
      id: 1,
      image: "/4.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 2,
      image: "/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 3,
      image: "/6.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 4,
      image: "/4.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 5,
      image: "/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 6,
      image: "/6.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 7,
      image: "/4.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 8,
      image: "/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
  ];

  // const firstTwoDigitsOfYear = new Date().getFullYear().toString().slice(0, 2);
  const firstTwoDigitsOfYear = 20

  
  // const lastTwoDigitsOfYear = new Date().getFullYear().toString().slice(-2);
  const lastTwoDigitsOfYear = 25;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden mt-6 lg:mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center lg:mb-20 mb-6">
          <h1 className="lg:text-[60px] font-bold tracking-tight text-gray-900 font-raleway text-md">
            NEW COLLECTION
          </h1>
          <Link href="/collection">
          <button className="flex items-center lg:gap-5 gap-2 text-gray-900 hover:text-gray-600 lg:text-2xl transition-colors font-raleway -mt-6 tracking-wider w-[186] h-[33px] text-sm">
            SEE MORE
           <ArrowVector className="lg:w-[20px] lg:h-[20px] lg:mb-3 w-3 h-3 mb-2"/>
          </button>
          </Link>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 sm:gap-8">
            <div className="absolute top-[90%] left-80 transform -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold z-20 font-raleway text-customYellow opacity-60 ">
                {firstTwoDigitsOfYear}
              </div>
              <div className="absolute  right-16 top-[10%] transform -translate-x-1/2 -translate-y-1/2 text-[200px] font-bold z-10 font-raleway text-customYellow opacity-55">
                {lastTwoDigitsOfYear}
              </div>
              {collections.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 group relative"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={360}
                      height={468}
                      objectFit="cover"
                      className=" mx-auto overflow-x-hidden w-lg:[360px] lg:h-[468px]"
                    />
                  </div>
                  <div className="mt-3 flex justify-between">
                    <div className="bg-white border-black w-[360px] h-[106px] mx-auto m-3">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {item.price}
                      </p>
                      <h3 className="text-sm  text-gray-700">{item.name}</h3>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-gray-500 hover:text-gray-700"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-opacity ${
              prevBtnEnabled ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
            aria-label="Previous slide"
          >
            
            <ArrowLeft className="w-6 h-6"/>
          </button>

          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-opacity ${
              nextBtnEnabled ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
            aria-label="Next slide"
          >
            <ArrowRight className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </div>
  );
}
