"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import ArrowVector from "./ui/ArrowVector";

export default function About() {
  const [imageError1, setImageError1] = useState(false);
  const [imageError2, setImageError2] = useState(false);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mt-20 mb-16">
          <h1 className="text-3xl lg:text-5xl lg:-mt-16 md:text-4xl font-bold tracking-tight sm:mt-2 font-raleway text-customRed lg:-ml-10  ">
            ABOUT US
          </h1>
          <Link href="/collection">
            <button className="flex items-center gap-5 text-gray-900 hover:text-gray-600 lg:text-2xl transition-colors font-raleway -mt-6 tracking-wider w-[215] h-[33px] uppercase">
              discover
              <ArrowVector className="w-[20px] h-[20px] mb-3" />
            </button>
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative aspect-[4/3] mt-24">
            <div className="absolute inset-0 -z-20 mt-12">
              <Image
                src="/22.svg"
                alt="Background design"
                className="lg:ml-32 relative -top-20 sm:-top-40 "
                width={500}
                height={400}
              />
            </div>
            {!imageError1 ? (
              <Image
                src="/7.svg"
                alt="Craftsmanship showcase"
                width={500}
                height={600}
                // className="object-cover transition-opacity rounded-lg shadow-lg stroke-black"
                className="-ml-20"
                priority
                onError={() => setImageError1(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                GulBhahar 1
              </div>
            )}
          </div>
          <div className="flex items-center">
            <p className="text-lg md:text-xl leading-relaxed lg:mb-80 lg:ml-12">
              GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT TO
              SUSTAINABILITY AND MODERN DESIGN
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="lg:mb-56 lg:mr-20">
              <p className="text-lg md:text-xl leading-relaxed">
                GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT TO
                SUSTAINABILITY AND MODERN DESIGN
              </p>
              <h2 className="font-old-standard relative md:text-8xl tracking-wider lg:top-40 text-traditionColor z-10  lg:-ml-16 font-bold lg:text-[190px]">
                TRADITIONS
              </h2>
            </div>
          </div>
          <div className="relative aspect-square  order-1 md:order-2 lg:-mt-96 lg:ml-52">
            {!imageError2 ? (
              <Image
                src="/8.svg"
                alt="Traditional craftsmanship"
                width={500}
                height={600}
                onError={() => setImageError2(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                GulBhahar 2
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
