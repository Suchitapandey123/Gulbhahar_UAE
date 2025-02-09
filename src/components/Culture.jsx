"use client"
import Image from "next/image"
export default function Home() {
  
  return (
    <main className="min-h-screen  flex items-center  justify-center bg-white relative overflow-hidden lg:mt-16 mb-8">
      <div className="relative">
        <div className="absolute left-[50%]  -translate-y-1/2 z-0 top-52 ">
          <Image
            src="/18.svg"
            alt="Background block 1"
            width={350}
            height={350}
            className="bg-gray-200 rounded-lg shadow-lg"
          />
        </div>
        <div className="absolute top-52 -translate-y-1/2 z-0]">
          <Image
            src="/19.svg"
            alt="Background block 2"
            width={350}
            height={386}
            className="bg-gray-200 rounded-lg shadow-lg"
          />
        </div>
        <Image src="/culture.svg" width={1559} height={329} alt="culture_img" className="relative top-72 z-30 p-0 m-0" />
        <div className="relative top-80 left-[26%]  -translate-y-1/2 z-0">
          <Image
            src="/20.svg"
            alt="Foreground block 1"
            width={350}
            height={386}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="absolute right-[2%] z-0 -translate-y-2/3">
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
  )
}




