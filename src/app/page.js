import Image from 'next/image';
import { ArrowUpRight } from "lucide-react";
import Collections from '@/components/Collections';
import About from '@/components/About';
import NewCollection from '@/components/NewCollection';
import Culture from '@/components/Culture';

export default function HomePage() {
  return (
    <main className="pt-18 md:pt-20">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/img2.svg" 
                  alt="GulBhahar" 
                  layout="fill" 
                  objectFit="cover" 
                  className="w-full h-full"
                />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wide mt-10 text-center sm:text-left">
              Gulbhahar combines
              <span className="block mt-4">craftsmanship</span>
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src="/img3.svg" 
                  alt="GulBhahar" 
                  layout="fill" 
                  objectFit="cover" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <p className="text-sm uppercase tracking-wide mb-10 text-center sm:text-left">
              Gulbhahar combines
              <span className="block mt-4">craftsmanship</span>
            </p>
            <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center mt-8">
                <Image 
                  src="/img4.svg" 
                  alt="Gulbhahar" 
                  layout="fill" 
                  objectFit="cover" 
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="mt-12 flex items-center gap-2">
              <span className="text-sm uppercase tracking-wide">Learn more</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="mt-16 md:mt-24">
          <div className="relative text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-48xl font-serif tracking-tighter sm:tracking-wide md:tracking-[10px] lg:tracking-[60px]">
              <span className="relative z-10">G</span>
              <span className="relative z-10">U</span>
              <span className="relative z-10">L</span>
              <span className="relative z-10">B</span>
              <span className="relative z-10">H</span>
              <span className="relative z-10">A</span>
              <span className="relative z-10">H</span>
              <span className="relative z-10">A</span>
              <span className="relative z-10">R</span>
            </h1>
            <div className="mt-6 flex justify-start items-center text-sm sm:text-base">
              <span className="font-bold text-left  w-1/3">Handcrafted</span>
              <span className="font-bold text-center w-1/3">Tailored with love</span>
              <span className="font-bold text-right w-1/3">Piece by piece</span>
            </div>
          </div>
        </div>
        <NewCollection />
        <About />
        <Collections />
        <Culture />
      </div>
    </main>
  );
}
