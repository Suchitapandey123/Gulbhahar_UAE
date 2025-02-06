
"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

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
      image: "../../public/1.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 2,
      image: "../../public/2.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 3,
      image: "../../public/3.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 4,
      image: "../../public/4.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 5,
      image: "../../public/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 6,
      image: "../../public/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 7,
      image: "../../public/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
    {
      id: 8,
      image: "../../public/5.svg",
      name: "Noorani (Jutti)",
      price: "₹ 5,000",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            NEW COLLECTION
          </h1>
          <button className="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
            SEE MORE
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-8">
              {collections.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 group relative"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={800}
                      height={1000}
                      layout="responsive"
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">{item.name}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {item.price}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-opacity ${
              nextBtnEnabled ? "opacity-75 hover:opacity-100" : "opacity-0"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
