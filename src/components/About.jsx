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
          <h1 className="text-3xl mt-6 md:text-4xl font-bold tracking-tight sm:mt-2">ABOUT US</h1>
          <Link 
            href="/collection" 
            className="group flex justify-center items-center gap-2 hover:opacity-80 transition-opacity mt-14 "
          >
            <span className="text-lg ">DISCOVER</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative aspect-[4/3] bg-gray-100">
            {!imageError1 ? (
              <Image
                src="/img1.svg"
                alt="Craftsmanship showcase"
                fill
                className="object-cover transition-opacity"
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
            <p className="text-lg md:text-xl leading-relaxed">
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
              <h2 className="text-6xl md:text-8xl font-serif tracking-tight">TRADITIONS</h2>
            </div>
          </div>
          <div className="relative aspect-square bg-gray-100 order-1 md:order-2">
            {!imageError2 ? (
              <Image
                src="/images/about-2.jpg"
                alt="Traditional craftsmanship"
                fill
                className="object-cover transition-opacity"
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