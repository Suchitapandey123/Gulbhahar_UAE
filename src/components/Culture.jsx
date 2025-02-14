"use client";
import Image from "next/image";
export default function Culture() {
  return (
    <main className="min-h-screen  flex items-center  justify-center bg-white relative overflow-hidden lg:mt-20 mb-6">
      <div className="relative">
        <div className="absolute lg:left-[50%]  -translate-y-1/2 z-0 top-56 ">
          <Image
            src="/18.svg"
            alt="Background block 1"
            width={350}
            height={350}
            className=" rounded-lg shadow-lg"
          />
        </div>
        <div className="absolute lg:top-56 -translate-y-1/2 z-10">
          <Image
            src="/19.svg"
            alt="Background block 2"
            width={350}
            height={386}
            className="rounded-lg shadow-lg w-full h-full"
          />
        </div>
        <Image
          src="/culture.svg"
          width={1600}
          height={300}
          alt="culture_img"
          className="relative lg:top-56 z-50"
        />
        <div className="relative lg:top-60 left-[24%]  -translate-y-1/2 z-0">
          <Image
            src="/20.svg"
            alt="Foreground block 1"
            width={350}
            height={386}
          />
        </div>
        <div className="absolute right-1 z-0 lg:top-[74%] -translate-y-1/2  ">
          <Image
            src="/21.svg"
            alt="Foreground block 2"
            width={350}
            height={386}
            className="bg-gray-200 top-10 shadow-lg rounded-lg"
          />
        </div>
      </div>
    </main>
  );
}
