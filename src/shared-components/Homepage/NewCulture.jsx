// 'use client'

// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import Image from 'next/image';
// import culture from "../../../public/home-page/culture.svg";
// import Link from 'next/link';

// const LuxuryCulture = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.1 });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   const motifVariants = {
//     hidden: { opacity: 0, scale: 0.5, rotate: -180 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       rotate: 0,
//       transition: { duration: 1, ease: "easeOut", delay: 0.3 }
//     }
//   };

//   const titleVariants = {
//     hidden: { opacity: 0, y: 100 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 1.2, ease: "easeOut", delay: 0.5 }
//     }
//   };

//   const statsVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut", delay: 1 }
//     }
//   };

//   const gridVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 1.2
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 80, scale: 0.8 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { duration: 0.8, ease: "easeOut" }
//     }
//   };

//   const ctaVariants = {
//     hidden: { opacity: 0, y: 50, scale: 0.8 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { duration: 0.8, ease: "easeOut", delay: 2 }
//     }
//   };

//   // Heritage craft elements inspired by traditional Indian artistry
//   const heritageElements = [
//     {
//       id: 1,
//       title: "Royal Embroidery",
//       subtitle: "Zardozi & Gold Thread Work",
//       description: "Royal embroidery is a classic form with beautiful detailing and a rich finish. It is associated with India's royal heritage, often using zardozi. It is a traditional embroidery technique using gold and silver threads to form frequently elaborate patterns. It is most popularly used on lush and opulent fabrics, like silk and velvet.",
//       image: "/home-page/royal-embroidery-optimized.webp",
//       // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-1.png",
//       color: "from-amber-700 via-yellow-600 to-orange-500",
//       accent: "border-amber-400",
//       heritage: "1000+ Years",
//       region: "Lucknow"
//     },
//     {
//       id: 2,
//       title: "Handwoven Textiles",
//       subtitle: "Banarasi & Silk Weaving",
//       description: "Handwoven textiles embody the essence of true Indian craftsmanship. They are a confluence of tradition and artistic expression. Banarasi textiles are among the finest celebrated in India. They are well known for their opulent silk weaving and intricate motifs reflecting the splendour of Indo-Persian art.",
//       image: "/home-page/handwoven-optimized.webp",
//       // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-6.png",
//       color: "from-purple-700 via-indigo-600 to-blue-500",
//       accent: "border-purple-400",
//       heritage: "800+ Years",
//       region: "Varanasi"
//     },
//     {
//       id: 3,
//       title: "Leather Artistry",
//       subtitle: "Traditional Juttiwork",
//       description: "Master craftsmen shape premium leather into exquisite footwear, each pair telling a story of skill, tradition, and timeless elegance.",
//       image: "/home-page/leather-artistry-2-optimized.webp",
//       // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-7.png",
//       color: "from-emerald-700 via-teal-600 to-cyan-500",
//       accent: "border-emerald-400",
//       heritage: "500+ Years",
//       region: "Punjab"
//     },
//     {
//       id: 4,
//       title: "Gemstone Craft",
//       subtitle: "Crystal Embellishment & Kundan Work ",
//       description: "Gemstone Craft is a sparkling display of India’s ornamental legacy, highlighting the encrustation of stones through various intricate techniques such as crystal embellishment and Kundan work. Crystal embellishment is when sparkling stones are added to give an effect of twinkle or shine.",
//       image: "/home-page/gemstone-craft2-optimized.webp",
//       // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-8.png",
//       color: "from-rose-700 via-pink-600 to-red-500",
//       accent: "border-rose-400",
//       heritage: "600+ Years",
//       region: "Rajasthan"
//     },
//     {
//       id: 5,
//       title: "Ornate Metals",
//       subtitle: "Gota Patti, Sequins & Foil Work",
//       description: "Ornate Metals offers juttis bathed in timeless glimmer with a unique Gota Patti, sequins and foil work that pair traditional metallic artistry with a contemporary design approach. Juttis are a unique pair of footwear to enjoy the festive spirit. Wear them to any occasion and can feel the glam! Ornate metals + juttis = elegance and pride in heritage. We bring culture straight to your feet and a moment of traditional Indian luxury to the everyday!",
//       image: "/home-page/ornate-metals-optimized.webp",
//       // image: "https://gulbahar-backend.s3.ap-south-1.amazonaws.com/gulbhahar-4.png",
//       color: "from-gray-700 via-slate-600 to-zinc-500",
//       accent: "border-gray-400",
//       heritage: "700+ Years",
//       region: "Bidar"
//     }
//   ];

//   return (
//     <motion.section
//       ref={ref}
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={containerVariants}
//       className=" w-full relative overflow-hidden bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50"
//     >
//       {/* Background overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-orange-50/20" />

//       {/* Main content */}
//       <div className="relative z-10 max-w-[1600px]  mx-auto px-1 sm:px-6 lg:px-8 py-8 md:py-16">
//         {/* Header */}
//         <motion.div 
//           variants={headerVariants}
//           className="text-center mb-12 md:mb-20"
//         >

//           <motion.h2 
//             variants={titleVariants}
//             className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-6 md:mb-8 tracking-wide"
//           >
//             <div className="flex items-center justify-center mb-4 md:mb-6">
//               <OptimizedImage
//                 src={culture}
//                 alt="Cultural Heritage"
//                 width={600}
//                 height={200}
//                 loading="lazy"
//                 className="w-full max-w-7xl h-auto drop-shadow-2xl"
//               />
//             </div>
//           </motion.h2>
          
//           <motion.div 
//             variants={statsVariants}
//             className="max-w-4xl mx-auto"
//           >
//             <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-900 leading-relaxed font-light mb-6 md:mb-8">
//               Celebrating centuries of masterful craftsmanship where each creation tells a story 
//               of tradition, luxury, and timeless artistry passed down through generations.
//             </p>
            
//             {/* Heritage stats */}
//             <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">1000+</div>
//                 <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Years of Tradition</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">50+</div>
//                 <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Master Artisans</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">25+</div>
//                 <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Craft Techniques</div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* Heritage showcase */}
//         <motion.div 
//           variants={gridVariants}
//           className="max-w-8xl mx-auto"
//         >
//           {/* Desktop - Premium grid layout */}
//           <div className="hidden lg:block "   >
//              <Link href="/heritage-culture">
//             <div className="grid grid-cols-12  grid-rows-8 gap-6 h-[900px]">
             
//               {/* Featured Royal Embroidery */}
              
//               <motion.div 
//                 variants={cardVariants}
//                 className="col-span-6 row-span-5 relative group cursor-pointer"
//               >
//                 <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[0].color} rounded-3xl overflow-hidden shadow-2xl ${heritageElements[0].accent} border-2`}>
//                   <div className="absolute inset-0">
//                     <OptimizedImage
//                       src={heritageElements[0].image}
//                       alt={heritageElements[0].title}
//                       fill
//                       loading="lazy"
//                       sizes="(max-width: 1024px) 100vw, 50vw"
//                       quality={70}
//                       className="object-cover opacity-50"
//                     />
//                   </div>
                  
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
//                   <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-between">
//                     <div className="flex items-start justify-between">
//                       <div className="text-right">
//                         <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
//                           <span className="text-white/90 text-sm font-medium">{heritageElements[0].region}</span>
//                         </div>
//                         <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-3 py-1">
//                           <span className="text-white text-xs">{heritageElements[0].heritage}</span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
//                       <h3 className="text-2xl md:text-4xl font-light text-white mb-2 md:mb-3">{heritageElements[0].title}</h3>
//                       <p className="text-white/90 text-base md:text-lg mb-3 md:mb-4 font-light">{heritageElements[0].subtitle}</p>
//                       <p className="text-white/80 text-sm leading-relaxed">{heritageElements[0].description}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Handwoven Textiles */}
//               <motion.div 
//                 variants={cardVariants}
//                 className="col-span-3 row-span-4 relative group cursor-pointer"
//               >
//                 <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[1].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[1].accent} border-2`}>
//                   <div className="absolute inset-0">
//                     <OptimizedImage
//                       src={heritageElements[1].image}
//                       alt={heritageElements[1].title}
//                       fill
//                       loading="lazy"
//                       sizes="(max-width: 1024px) 100vw, 25vw"
//                       quality={70}
//                       className="object-cover opacity-50"
//                     />
//                   </div>
//                   <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
//                     <div className="flex items-center justify-between">
        
//                       <span className="text-purple-200 text-xs bg-purple-500/20 px-2 py-1 rounded-full">
//                         {heritageElements[1].heritage}
//                       </span>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
//                       <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">{heritageElements[1].title}</h3>
//                       <p className="text-white/80 text-sm">{heritageElements[1].subtitle}</p>
//                       <p className="text-white/80 my-1 text-sm leading-relaxed line-clamp-3">{heritageElements[1].description}</p>
//                       <p className="text-white/70 text-xs mt-2">{heritageElements[1].region}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Leather Artistry */}
//               <motion.div 
//                 variants={cardVariants}
//                 className="col-span-3 row-span-4 relative group cursor-pointer"
//               >
//                 <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[2].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[2].accent} border-2`}>
//                   <div className="absolute inset-0">
//                     <OptimizedImage
//                       src={heritageElements[2].image}
//                       alt={heritageElements[2].title}
//                       fill
//                       loading="lazy"
//                       sizes="(max-width: 1024px) 100vw, 25vw"
//                       quality={70}
//                       className="object-cover opacity-50"
//                     />
//                   </div>
//                   <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
//                     <div className="flex items-center justify-between">
//                       <span className="text-emerald-200 text-xs bg-emerald-500/20 px-2 py-1 rounded-full">
//                         {heritageElements[2].heritage}
//                       </span>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
//                       <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">{heritageElements[2].title}</h3>
//                       <p className="text-white/80 text-sm">{heritageElements[2].subtitle}</p>
//                       <p className="text-white/80 my-1 text-sm leading-relaxed line-clamp-3">{heritageElements[1].description}</p>
//                       <p className="text-white/70 text-xs mt-2">{heritageElements[2].region}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Gemstone Craft */}
//               <motion.div 
//                 variants={cardVariants}
//                 className="col-span-6 row-span-4 relative group cursor-pointer"
//               >
//                 <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[3].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[3].accent} border-2`}>
//                   <div className="absolute inset-0">
//                     <OptimizedImage
//                       src={heritageElements[3].image}
//                       alt={heritageElements[3].title}
//                       fill
//                       loading="lazy"
//                       sizes="(max-width: 1024px) 100vw, 50vw"
//                       quality={70}
//                       className="object-cover opacity-50"
//                     />
//                   </div>
//                   <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
//                     <div className="flex items-start justify-between">
//                       <div className="text-right">
//                         <span className="text-rose-200 text-sm bg-rose-500/20 px-3 py-1 rounded-full">
//                           {heritageElements[3].heritage}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
//                       <h3 className="text-2xl md:text-3xl font-light text-white mb-2 md:mb-3">{heritageElements[3].title}</h3>
//                       <p className="text-white/80 text-base md:text-lg mb-2 md:mb-3">{heritageElements[3].subtitle}</p>
//                       <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{heritageElements[3].description}</p>
//                       <p className="text-white/60 text-xs mt-2">{heritageElements[3].region}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Metal Artistry */}
//               <motion.div 
//                 variants={cardVariants}
//                 className="col-span-6 row-span-3 relative group cursor-pointer"
//               >
//                 <div className={`relative w-full h-full bg-gradient-to-br ${heritageElements[4].color} rounded-2xl overflow-hidden shadow-xl ${heritageElements[4].accent} border-2`}>
//                   <div className="absolute inset-0">
//                     <OptimizedImage
//                       src={heritageElements[4].image}
//                       alt={heritageElements[4].title}
//                       fill
//                       loading="lazy"
//                       sizes="(max-width: 1024px) 100vw, 50vw"
//                       quality={70}
//                       className="object-cover opacity-50"
//                     />
//                   </div>
//                   <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-between">
//                     <div className="flex items-center justify-between">
//                       <span className="text-gray-200 text-sm bg-gray-500/20 px-3 py-1 rounded-full">
//                         {heritageElements[4].heritage}
//                       </span>
//                     </div>
//                     <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
//                       <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">{heritageElements[4].title}</h3>
//                       <p className="text-white/80 text-base md:text-lg mb-2 md:mb-3">{heritageElements[4].subtitle}</p>
//                       <p className="text-white/70 text-sm line-clamp-3">{heritageElements[4].description}</p>
//                       <p className="text-white/60 text-xs mt-2">{heritageElements[4].region}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//             </Link>
//           </div>

//           {/* Tablet layout */}
//           <div className="hidden md:block lg:hidden">
//   <Link href="/heritage-culture">
//     <div className="grid grid-cols-1 sm:grid-cols-2 my-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {heritageElements.map((element, index) => (
//         <motion.div 
//           key={element.id} 
//           variants={cardVariants}
//           className={`relative aspect-[4/3] bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden border-2 ${element.accent}`}
//         >
//           <div className="absolute inset-0">
//             <OptimizedImage
//               src={element.image}
//               alt={element.title}
//               fill
//               loading="lazy"
//               sizes="(max-width: 768px) 100vw, 33vw"
//               quality={70}
//               className="object-cover mt-2 opacity-50"
//             />
//           </div>
//           <div className="relative z-10 p-4 md:p-6 h-full flex flex-col justify-end">
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
//               <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">{element.title}</h3>
//               <p className="text-white/80 text-sm">{element.subtitle}</p>
//               <p className="text-white/70 text-xs mt-2">{element.region}</p>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </Link>
// </div>

//           {/* Mobile layout */}
//           <div className="md:hidden">
//   <Link href="/heritage-culture">
//     <div className="space-y-8">
//       {heritageElements.map((element, index) => (
//         <motion.div
//           key={element.id}
//           variants={cardVariants}
//           className={`relative aspect-[3/4] bg-gradient-to-br ${element.color} rounded-2xl overflow-hidden shadow-xl border-2 ${element.accent}`}
//         >
//           <div className="absolute inset-0">
//             <OptimizedImage
//               src={element.image}
//               alt={element.title}
//               fill
//               loading="lazy"
//               sizes="100vw"
//               quality={70}
//               className="object-cover opacity-50"
//             />
//           </div>
//           <div className="relative z-10 sm:p-4 md:p-6 h-full flex flex-col justify-between">
//             <div className="flex items-start justify-between">
//               <div className="text-right">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-lg px-1 py-1 mb-1">
//                   <span className="text-white/90 text-xs">{element.region}</span>
//                 </div>
//                 <div className="bg-amber-500/30 backdrop-blur-sm rounded-lg px-2 py-1">
//                   <span className="text-white text-xs">{element.heritage}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
//               <h3 className="text-xl md:text-2xl font-light text-white mb-1 md:mb-2">{element.title}</h3>
//               <p className="text-white/90 text-base md:text-lg mb-2 md:mb-3">{element.subtitle}</p>
//               <p className="text-white/80 text-sm leading-relaxed">{element.description}</p>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </Link>
// </div>
//         </motion.div>

//         {/* CTA */}
//         <motion.div 
//           variants={ctaVariants}
//           className="text-center mt-16 md:mt-24"
//           onClick={() => window.location.href = "/collections"}
//         >
          
//           <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-light text-base md:text-lg shadow-2xl border border-amber-400/30 hover:bg-gradient-to-r hover:from-amber-700 hover:to-orange-700 transition-colors duration-300">
//             Explore Our Heritage Collection
//           </button>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default LuxuryCulture;




'use client'

import React from 'react';
import OptimizedImage from '@/shared-components/cloudfront/OptmizedImage';
import culture from "../../../public/home-page/culture.svg";
import Link from 'next/link';

const LuxuryCulture = () => {

  const heritageElements = [
    {
      id: 1,
      title: "Royal Embroidery",
      subtitle: "Zardozi & Gold Thread Work",
      description:
        "Royal embroidery is a classic form with beautiful detailing and a rich finish. It is associated with India's royal heritage, often using zardozi. It is a traditional embroidery technique using gold and silver threads to form frequently elaborate patterns. It is most popularly used on lush and opulent fabrics, like silk and velvet.",
      image: "/home-page/royal-embroidery-optimized.webp",
      color: "from-amber-700 via-yellow-600 to-orange-500",
      accent: "border-amber-400",
      heritage: "1000+ Years",
      region: "Lucknow"
    },
    {
      id: 2,
      title: "Handwoven Textiles",
      subtitle: "Banarasi & Silk Weaving",
      description:
        "Handwoven textiles embody the essence of true Indian craftsmanship. They are a confluence of tradition and artistic expression. Banarasi textiles are among the finest celebrated in India. They are well known for their opulent silk weaving and intricate motifs reflecting the splendour of Indo-Persian art.",
      image: "/home-page/handwoven-optimized.webp",
      color: "from-purple-700 via-indigo-600 to-blue-500",
      accent: "border-purple-400",
      heritage: "800+ Years",
      region: "Varanasi"
    },
    {
      id: 3,
      title: "Leather Artistry",
      subtitle: "Traditional Juttiwork",
      description:
        "Master craftsmen shape premium leather into exquisite footwear, each pair telling a story of skill, tradition, and timeless elegance.",
      image: "/home-page/leather-artistry-2-optimized.webp",
      color: "from-emerald-700 via-teal-600 to-cyan-500",
      accent: "border-emerald-400",
      heritage: "500+ Years",
      region: "Punjab"
    },
    {
      id: 4,
      title: "Gemstone Craft",
      subtitle: "Crystal Embellishment & Kundan Work ",
      description:
        "Gemstone Craft is a sparkling display of India’s ornamental legacy, highlighting the encrustation of stones through various intricate techniques such as crystal embellishment and Kundan work.",
      image: "/home-page/gemstone-craft2-optimized.webp",
      color: "from-rose-700 via-pink-600 to-red-500",
      accent: "border-rose-400",
      heritage: "600+ Years",
      region: "Rajasthan"
    },
    {
      id: 5,
      title: "Ornate Metals",
      subtitle: "Gota Patti, Sequins & Foil Work",
      description:
        "Ornate Metals offers juttis bathed in timeless glimmer with a unique Gota Patti, sequins and foil work that pair traditional metallic artistry with a contemporary design approach.",
      image: "/home-page/ornate-metals-optimized.webp",
      color: "from-gray-700 via-slate-600 to-zinc-500",
      accent: "border-gray-400",
      heritage: "700+ Years",
      region: "Bidar"
    }
  ];

  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-br from-cream-50 via-stone-50 to-amber-50">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-50/30 to-orange-50/20" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-1 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light bg-gradient-to-r from-amber-800 via-orange-700 to-red-700 bg-clip-text text-transparent mb-6 md:mb-8 tracking-wide">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <OptimizedImage
                src={culture}
                alt="Cultural Heritage"
                width={600}
                height={200}
                loading="lazy"
                className="w-full max-w-7xl h-auto drop-shadow-2xl"
              />
            </div>
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-900 leading-relaxed font-light mb-6 md:mb-8">
              Celebrating centuries of masterful craftsmanship where each creation tells a story
              of tradition, luxury, and timeless artistry passed down through generations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">1000+</div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Years of Tradition</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">50+</div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Master Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-light text-amber-800 mb-1">25+</div>
                <div className="text-xs md:text-sm text-amber-700 uppercase tracking-wider">Craft Techniques</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <Link href="/heritage-culture">
            <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[900px]">
              {/* Cards unchanged – animation removed only */}
              {heritageElements.map((el, i) => (
                <div
                  key={el.id}
                  className={`col-span-${i === 0 || i === 3 || i === 4 ? 6 : 3} row-span-4 relative bg-gradient-to-br ${el.color} rounded-2xl overflow-hidden border-2 ${el.accent}`}
                >
                  <OptimizedImage
                    src={el.image}
                    alt={el.title}
                    fill
                    loading="lazy"
                    quality={70}
                    className="object-cover opacity-50"
                  />
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* Tablet */}
        <div className="hidden md:block lg:hidden">
          <Link href="/heritage-culture">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {heritageElements.map(el => (
                <div
                  key={el.id}
                  className={`relative aspect-[4/3] bg-gradient-to-br ${el.color} rounded-2xl overflow-hidden border-2 ${el.accent}`}
                >
                  <OptimizedImage
                    src={el.image}
                    alt={el.title}
                    fill
                    loading="lazy"
                    quality={70}
                    className="object-cover opacity-50"
                  />
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Link href="/heritage-culture">
            <div className="space-y-8">
              {heritageElements.map(el => (
                <div
                  key={el.id}
                  className={`relative aspect-[3/4] bg-gradient-to-br ${el.color} rounded-2xl overflow-hidden border-2 ${el.accent}`}
                >
                  <OptimizedImage
                    src={el.image}
                    alt={el.title}
                    fill
                    loading="lazy"
                    quality={70}
                    className="object-cover opacity-50"
                  />
                </div>
              ))}
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-16 md:mt-24"
          onClick={() => (window.location.href = "/collections")}
        >
          <button className="px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-light text-base md:text-lg shadow-2xl border border-amber-400/30">
            Explore Our Heritage Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default LuxuryCulture;
