"use client";
import Image from "next/image";
export default function Culture() {
  const img1='/18.svg'
    const img2='/19.svg'
    const img3='/20.svg'
    const img4='/21.svg'
    const culture='/culture.svg'
  return (

    <main className="min-h-screen lg:w-[1559px] lg:-ml-4 flex items-center  justify-center bg-white relative overflow-hidden lg:mt-20 lg:mb-6 ">
      <div className="relative">
        <div className="absolute lg:left-[50%]  -translate-y-1/2 z-0 lg:top-56 ">
          <Image
            src={img1 || null}
            alt="Background block 1"
            width={350}
            height={350}
            className=" rounded-lg shadow-lg lg:w-[300px] lg:h-[300px] w-full h-full object-cover"
          />
        </div>
        <div className="absolute lg:top-56 -translate-y-1/2 z-10">
          <Image
            src={img2 || null}
            alt="Background block 2"
            width={350}
            height={386}
             className=" rounded-lg shadow-lg lg:w-[300px] lg:h-[300px] w-full h-full object-cover"
          />
        </div>
        <div className="">
        <Image
          src={culture || null}
          width={1600}
          height={400}
          alt="culture_img"
          className="relative lg:top-56 z-10"
        />
        </div>
        <div className="relative lg:top-56 left-[24%]  -translate-y-1/2 z-0">
          <Image
            src={img3 || null}
            alt="Foreground block 1"
            width={350}
            height={386}
            className=" rounded-lg shadow-lg lg:w-[300px] lg:h-[300px] w-full h-full object-cover"
          />
        </div>
        <div className="absolute right-1 z-0 lg:top-[87%] -translate-y-1/2  ">
          <Image
            src={img4 || null}
            alt="Foreground block 2"
            width={350}
            height={386}
             className=" rounded-lg shadow-lg lg:w-[300px] lg:h-[300px] w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
