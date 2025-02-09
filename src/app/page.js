"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Old_Standard_TT } from "next/font/google";
import Collections from "@/components/Collections";
import About from "@/components/About";
import NewCollection from "@/components/NewCollection";
import Culture from "@/components/Culture";
import OurShowCase from "@/components/OurShowCase";
import Link from "next/link";
import { motion } from "framer-motion";
import Popular from "@/components/Popular";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

export default function HomePage() {
  return (
    <main className="pt-12 md:pt-20 w-full max-w[100vw] overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="space-y-4"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center rounded-lg shadow-lg">
                <Image
                  src="/1.svg"
                  alt="GulBhahar"
                  width={431}
                  height={349}
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            <p className="text-sm uppercase tracking-wide mt-10 text-center sm:text-left ">
              Gulbhahar combines
              <span className="block mt-2">craftsmanship</span>
            </p>
          </motion.div>
          <motion.div
            className="md:col-span-2 lg:col-span-1 relative flex flex-col items-center justify-center"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/2.svg"
                  alt="GulBhahar"
                  objectFit="cover"
                  width={420}
                  height={649}
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-end items-center"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm uppercase tracking-wide mb-8 text-center sm:text-left">
              GULBHAHAR COMBINES
              <span className="block mt-2">CRAFTMANSHIP</span>
            </p>
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center mt-8">
                <Image
                  src="/3.svg"
                  alt="Gulbhahar"
                  objectFit="cover"
                  width={431}
                  height={349}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        
        <div className="mt-10 md:mt-20">
          <Link href={"/about"}>
            <div className="flex items-center gap-2 mx-5 justify-end cursor-pointer ">
              <span className="text-sm uppercase tracking-wide">Learn more</span>
              <ArrowUpRight className="w-6 h-6 cursor-pointer" />
            </div>
          </Link>

          
          <motion.div
            className="relative text-center"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1
              className={`${oldStandardTT.variable} text-5xl sm:text-6xl md:text-7xl lg:text-[180px] xl:text-[220px] font-serif tracking-[auto] sm:tracking-[auto] md:tracking-[auto] lg:tracking-[auto] xl:tracking-[auto] font-extralight stroke-black`}
            >
              <span className="relative z-10 text-customRed">G</span>
              <span className="relative z-10 text-customRed">U</span>
              <span className="relative z-10 text-customRed">L</span>
              <span className="relative z-10 text-customRed">B</span>
              <span className="relative z-10 text-customRed">H</span>
              <span className="relative z-10 text-customRed">A</span>
              <span className="relative z-10 text-customRed">H</span>
              <span className="relative z-10 text-customRed">A</span>
              <span className="relative z-10 text-customRed">R</span>
            </h1>
            <div className="flex justify-between items-center text-sm sm:text-base ">
              <span className="font-bold text-left lg:ml-12 ml-12 lg:text-[20px] text-customRed">
                Handcrafted
              </span>
              <span className="font-bold text-center lg:text-[20px] text-customRed">
                Tailored with love
              </span>
              <span className="font-bold text-right lg:text-[20px] text-customRed">
                Piece by piece
              </span>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NewCollection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Collections />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Culture />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <OurShowCase />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Popular/>
        </motion.div>
      </div>
    </main>
  );
}
