"use client";
import Image from "next/image";
import { Old_Standard_TT } from "next/font/google";
import Collections from "@/components/Collections";
import About from "@/components/About";
import NewCollection from "@/components/NewCollection";
import Culture from "@/components/Culture";
import OurShowCase from "@/components/OurShowCase";
import Link from "next/link";
import Popular from "@/components/Popular";
import ArrowVector from "./ui/ArrowVector";

const oldStandardTT = Old_Standard_TT({
  weight: "700",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <main className="pt-16 md:pt-20 w-full lg:max-w-8xl 2xl:w-full">
      <div className="container mx-auto px-3 py-6 md:py-12 overflow-hidden 2xl:w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 sm:gap-8">
          <div className="space-y-12">
            <div className="relative w-full ml-6 aspect-[4/3] ">
              <div className="absolute inset-0 flex items-center justify-center w-full">
                <Image
                  src="/1.svg"
                  alt="GulBhahar"
                  width={410}
                  height={349}
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="text-sm uppercase tracking-widest lg:text-[22px] sm:text-left font-extralight text-center ml-12">
              Gulbhahar combines
              <span className="block lg:mt-2">craftsmanship</span>
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[3/4] ">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/2.svg"
                  alt="GulBhahar"
                  objectFit="cover"
                  width={410}
                  height={649}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <p className="text-sm uppercase tracking-widest mb-16 lg:mr-36 text-center sm:text-left lg:text-[22px]">
              GULBHAHAR COMBINES
              <span className="block lg:mt-2">CRAFTMANSHIP</span>
            </p>
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center mr-7">
                <Image
                  src="/3.svg"
                  alt="Gulbhahar"
                  objectFit="cover"
                  width={410}
                  height={349}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <Link href={"/about"}>
            <div className="flex items-center gap-5 mx-7 justify-end cursor-pointer -mb-4">
              <span className="lg:text-2xl font-raleway uppercase tracking-wider w-[186] h-[33px]  ">Learn more</span>
             <ArrowVector className="w-[20px] h-[20px] mb-3"/>
            </div>
          </Link>

          <div className="relative text-center w-full h-full">
            <h1
              className={`${oldStandardTT.variable}  sm:text-6xl md:text-7xl lg:text-[220px]  tracking-[auto] sm:tracking-[auto] md:tracking-[auto] lg:tracking-[auto] xl:tracking-[auto] font-extralight stroke-black `}
            >
              <span className="relative z-10 text-customRed leading-[247.2px]">G</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">U</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">L</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">B</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">H</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">A</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">H</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">A</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">R</span>
            </h1>
            <div className="flex justify-between items-center text-lg sm:text-base ml-8 tracking-wider">
              <span className="font-extralight lg:text-2xl font-raleway text-customRed -mt-16 tracking-wider">
                Handcrafted
              </span>
              <span className="text-center lg:text-2xl text-customRed tracking-wider
               font-raleway font-extralight -mt-16">
                Tailored with love
              </span>
              <span className="text-right lg:text-2xl text-customRed font-raleway mr-[2%] tracking-wider -mt-16">
                piece by piece
              </span>
            </div>
          </div>
        </div>

        <NewCollection />
        <About />
        <Collections />
        <Culture />
        <OurShowCase />
        <Popular />
      </div>
    </main>
  );
}
