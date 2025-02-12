"use client";
import Image from "next/image";
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
            className="bg-red-600 rounded-lg shadow-lg"
          />
        </div>
        <div className="absolute top-56 -translate-y-1/2 z-10">
          <Image
            src="/19.svg"
            alt="Background block 2"
            width={350}
            height={386}
            className="bg-blue-600 rounded-lg shadow-lg"
          />
        </div>
        <Image
          src="/culture.svg"
          width={1559}
          height={329}
          alt="culture_img"
          className="relative top-72 z-30 p-0 m-0"
        />
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
  );
}


// "use client"
// import Image from "next/image"

// export default function Home() {
//   return (
//     <main className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
//       <div className="relative w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
//         {/* First Block - Blue Background */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 top-32 sm:top-40 md:top-48 lg:top-52">
//           <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] aspect-square">
//             <Image
//               src="/18.svg"
//               alt="Background block 1"
//               fill
//               className="bg-red-600 rounded-lg shadow-lg object-cover"
//             />
//           </div>
//         </div>

//         {/* Second Block */}
//         <div className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-36 sm:top-44 md:top-52 lg:top-56 transform -translate-y-1/2 z-10">
//           <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] aspect-[1/1.1]">
//             <Image
//               src="/19.svg"
//               alt="Background block 2"
//               fill
//               className="bg-blue-600 rounded-lg shadow-lg object-cover"
//             />
//           </div>
//         </div>

//         {/* Center Culture Image */}
//         <div className="relative w-full aspect-[4.7/1] mt-64 sm:mt-72 md:mt-80 lg:mt-72 z-30">
//           <Image 
//             src="/culture.svg" 
//             alt="culture_img" 
//             fill
//             className="object-contain"
//           />
//         </div>

//         {/* Third Block */}
//         <div className="relative mt-8 sm:mt-12 md:mt-16 lg:mt-20 left-1/4 sm:left-[26%] transform -translate-y-1/2 z-20">
//           <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] aspect-[1/1.1]">
//             <Image
//               src="/20.svg"
//               alt="Foreground block 1"
//               fill
//               className="rounded-lg shadow-lg object-cover"
//             />
//           </div>
//         </div>

//         {/* Fourth Block */}
//         <div className="absolute right-4 sm:right-8 md:right-12 lg:right-[2%] top-40 sm:top-48 md:top-56 lg:top-64 transform -translate-y-2/3 z-0">
//           <div className="relative w-[280px] sm:w-[300px] md:w-[320px] lg:w-[350px] aspect-[1/1.1]">
//             <Image
//               src="/21.svg"
//               alt="Foreground block 2"
//               fill
//               className="bg-gray-200 rounded-lg shadow-lg object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }