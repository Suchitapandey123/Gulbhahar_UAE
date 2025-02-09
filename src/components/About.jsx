"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function About() {
  const [imageError1, setImageError1] = useState(false);
  const [imageError2, setImageError2] = useState(false);

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl mt-6 md:text-4xl font-bold tracking-tight sm:mt-2 font-raleway text-customRed">ABOUT US</h1>
          <Link 
            href="/collection" 
            className="group flex justify-center items-center gap-2 hover:opacity-80 transition-opacity mt-14 "
          >
            <span className="text-lg ">DISCOVER</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          <div className="relative aspect-[4/3] mt-16">
          <div className="absolute inset-0 -z-10 mt-12 rounded-lg shadow-lg">
              <Image
                src="/22.svg"
                alt="Background design"
                className="object-cover transition-opacity lg:ml-24 xl:ml-48 relative -top-20 sm:-top-40 rounded-lg shadow-lg"
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
                className="object-cover transition-opacity rounded-lg shadow-lg stroke-black"
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
            <p className="text-lg md:text-xl leading-relaxed lg:ml-16">
              GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT 
              TO SUSTAINABILITY AND MODERN DESIGN
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="mb-8">
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                GULBHAHAR COMBINES EXPERT CRAFTSMANSHIP WITH A COMMITMENT 
                TO SUSTAINABILITY AND MODERN DESIGN
              </p>
              <h2 className=" relative text-5xl md:text-8xl font-serif tracking-wider lg:text-[140px] lg:mt-96 text-customYellow z-20">TRADITIONS</h2>
            </div>
          </div>
          <div className="relative aspect-square  order-1 md:order-2">
            {!imageError2 ? (
              <Image
                src="/8.svg"
                alt="Traditional craftsmanship"
                width={500}
                height={600}
                className="priority object-cover transition-opacity rounded-md shadow-lg"
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