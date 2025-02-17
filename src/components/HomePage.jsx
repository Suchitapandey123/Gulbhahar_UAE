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
  const img1 = "/1.svg";
  const img2 = "/2.svg";
  const img3 = "/3.svg";

  return (
    <main className="pt-16 md:pt-20 w-full">
      <div className="lg:max-w-full container mx-auto px-3 py-6 md:py-12 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-24 gap-8 2xl:gap-12 sm:gap-8 lg:ml-16 2xl:ml-1 ">
          <div className="space-y-12">
            <div className="relative w-full lg:ml-6 aspect-[4/3] mx-auto">
              <div className="absolute inset-0 flex items-center justify-center w-full lg:ml-2">
                {img1 && img1 !== "" ? (
                  <Image
                    src={img1}
                    alt="GulBhahar"
                    width={410}
                    height={349}
                    className="object-cover"
                  />
                ) : (
                  <p>Image not available</p>
                )}
              </div>
            </div>
            <p className="uppercase tracking-widest lg:text-2xl sm:text-left font-extralight text-center lg:ml-8 xl:ml-16">
              Gulbhahar combines
              <span className="block xl:mt-2 mb-4">craftsmanship</span>
            </p>
          </div>
          <div className="md:col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[3/4] ">
              <div className="absolute inset-0 flex items-center justify-center w-full lg:m-auto lg:mt-6 xl:mt-1">
                <Image
                  src={img2 || null}
                  alt="GulBhahar"
                  // objectFit="cover"
                  width={410}
                  height={649}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end items-center">
            <p className="text-lg m uppercase mb-8 mt-5 tracking-widest xl:mb-16 lg:mb-12 xl:mr-36 lg:mr-40 text-center sm:text-left lg:text-[22px] ">
              GULBHAHAR COMBINES
              <span className="block xl:mt-2">CRAFTMANSHIP</span>
            </p>
            <div className="relative w-full aspect-[4/3] lg:mr-40">
              <div className="absolute inset-0 flex items-center justify-center w-full lg:ml-12 xl:mt-1 lg:mt-12">
                <Image
                  src={img3 || null}
                  alt="Gulbhahar"
                  // objectFit="cover"
                  width={410}
                  height={349}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <Link href={"/about"}>
            <div className="flex items-center lg:gap-5 lg:mx-8 justify-end cursor-pointer -mb-20 lg:mb-0 gap-2">
              <span className="lg:text-2xl font-raleway uppercase tracking-wider lg:w-[186] lg:h-[33px]">
                Learn more
              </span>
              <ArrowVector className="lg:w-[20px] lg:h-[20px] lg:mb-3 mb-1 w-3 h-3" />
            </div>
          </Link>

          <div className="relative text-center">
            <h1
              className={`${oldStandardTT.variable}  sm:text-4xl md:text-6xl lg:text-[150px] xl:text-[210px] tracking-[auto] sm:tracking-[auto] md:tracking-[auto] lg:tracking-[auto] xl:tracking-[auto] font-extralight stroke-black text-5xl -mb-24 lg:mb-0`}
            >
              <span className="relative z-10 text-customRed leading-[247.2px]">
                G
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                U
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                L
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                B
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                H
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                A
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                H
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                A
              </span>
              <span className="relative z-10 text-customRed leading-[247.2px]">
                R
              </span>
            </h1>
            <div className="flex justify-between items-center text-lg sm:text-base lg:ml-6 tracking-wider ">
              <span className="font-extralight lg:text-2xl font-raleway text-customRed lg:-mt-20 tracking-wider text-sm lg:ml-12">
                Handcrafted
              </span>
              <span
                className="text-center lg:text-2xl text-customRed tracking-wider
               font-raleway font-extralight lg:-mt-20 text-sm"
              >
                Tailored with love
              </span>
              <span className="text-right lg:text-2xl text-customRed font-raleway mr-[2%] tracking-wider lg:-mt-20 text-sm lg:mr-14">
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
