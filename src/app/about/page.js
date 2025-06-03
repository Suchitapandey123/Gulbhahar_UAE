"use client"
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const Logo = () => (
  <motion.svg 
    width="100" 
    height="100" 
    viewBox="0 0 100 100"
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{ 
      duration: 1.2, 
      delay: 0.4,
      type: "spring",
      stiffness: 200
    }}
    whileHover={{ 
      scale: 1.1, 
      rotate: 360,
      transition: { duration: 0.8 }
    }}
    className="cursor-pointer"
  >
    <motion.path 
      d="M50 0L100 50L50 100L0 50L50 0Z" 
      fill="black"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
    />
  </motion.svg>
);

const CraftingStoriesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });







  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col  mt-16 lg:flex-row min-h-[70vh] max-w-[1600px] mx-auto my-8 lg:my-16 px-4 lg:px-8 gap-12 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        style={{ y: textY }}
        className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 lg:mb-16 leading-tight font-bold tracking-tight"
          initial={{ opacity: 0, x: -100, rotateX: 90 }}
          whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          style={{ fontFamily: 'serif' }}
        >
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            Crafting Stories
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="block"
          >
            of Heritage,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="block text-gray-600"
          >
            One Step at a Time
          </motion.span>
        </motion.h2>

        <motion.div 
          className="flex justify-center lg:justify-start mt-8"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
        >
          <Logo />
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ y: imageY, rotate: imageRotate }}
        className="flex-1 flex items-center justify-center w-full"
      >
        <motion.div 
          className="relative w-full h-[250px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[420px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-lg rounded-2xl bg-transparent shadow-2xl group overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.08, 
            rotateY: 8,
            rotateZ: 2,
            boxShadow: "0 8px 40px 0 rgba(0,0,0,0.25)",
            transition: { duration: 0.4, type: "spring", bounce: 0.4 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-black/10 via-white/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />

          <motion.div
            className="absolute bottom-4 right-4 z-20"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1.1 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill="#fff" fillOpacity="0.7" />
              <path d="M12 18h12M18 12v12" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          <Image
            src="/C3.png"
            alt="Crafting Story"
            fill
            sizes="100vw"
            className="object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:blur-[1px]"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const HeroSection1 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);



    const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1GN5HZC6dS/',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/gulbhahar_official?igsh=MzRlODBiNWFlZA==',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourhandle',
  },
];



  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      className="max-w-[1600px]  mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Social Links */}
        <div className="flex flex-row lg:flex-col justify-center items-center lg:justify-center space-x-8 lg:space-x-0 lg:space-y-6">
  {socialLinks.map((platform, i) => (
    <motion.div 
      key={platform.name}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
    >
      <a 
        href={platform.url} 
        className="block  text-base sm:text-lg lg:text-xl font-semibold tracking-wide text-black hover:text-gray-600 transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: 'sans-serif' }}
      >
        {platform.name}
      </a>
      <motion.div 
        className="absolute left-0 right-0 bottom-[-4px] h-0.5 bg-black origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
        viewport={{ once: true }}
      />
    </motion.div>
  ))}
</div>


        {/* Main Content */}
        <motion.div 
          className="lg:col-span-5 order-1 lg:order-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <motion.span 
              className="absolute text-6xl  sm:text-7xl lg:text-8xl font-bold -mt-4 lg:-mt-6 leading-none text-gray-800"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              style={{ fontFamily: 'serif' }}
            >
              B
            </motion.span>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-justify pl-12 sm:pl-14 lg:pl-16"
              style={{ fontFamily: 'serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              orn from the rich heritage of Indian footwear craftsmanship, our journey began with a vision to preserve and celebrate the timeless art of jutti-making. Our master artisans, many of whom represent the third and fourth generations of their craft, bring decades of expertise to every piece they create.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Quote */}
        <motion.div 
          className="lg:col-span-4 order-2 lg:order-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.blockquote 
            className="italic text-lg sm:text-xl lg:text-2xl text-center lg:text-left px-4 lg:px-0 leading-relaxed"
            style={{ fontFamily: 'serif' }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            "We bring centuries of Indian craftsmanship to your feet through our exquisitely handcrafted juttis. Each pair tells a story of tradition, artistry, and cultural excellence that has been passed down through generations."
          </motion.blockquote>
        </motion.div>
      </div>
    </motion.div>
  );
};

const TraditionContemporarySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <motion.div 
      ref={containerRef}
      className="max-w-[1600px] mx-auto mb-20 lg:mb-40 px-4 lg:px-8"
    >
      {/* Title Section */}
      <motion.div 
        className="text-center py-12 lg:py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight"
          style={{ fontFamily: 'serif' }}
        >
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            Blending Tradition with
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.4 }}
            className="block text-gray-600"
          >
            Contemporary Style
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] mb-12 lg:mb-20 gap-8 lg:gap-0">
        <motion.div 
          className="flex items-center justify-center order-2 lg:order-1"
          style={{ rotate }}
        >
          <motion.div 
            className="w-full max-w-md h-64 sm:h-80 lg:h-96 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              transition: { duration: 0.3 }
            }}
          >
             <Image
            src={"/C3.png"}
            alt='dsfe'
            height={100}
            width={100}
            className='h-full w-full object-cover rounded-xl shadow-xl'
            priority
            />
        </motion.div>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center p-8 lg:p-16 order-1 lg:order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.blockquote 
            className="text-lg sm:text-xl lg:text-2xl italic text-center text-gray-700 leading-relaxed"
            style={{ fontFamily: 'serif' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            "We bring centuries of Indian craftsmanship to your feet through our exquisitely handcrafted juttis. Each pair tells a story of tradition, artistry, and cultural excellence that has been passed down through generations."
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] mb-12 lg:mb-20 gap-8 lg:gap-0">
        <motion.div 
          className="flex items-center justify-center p-8 lg:p-16 order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.blockquote 
            className="text-lg sm:text-xl lg:text-2xl italic text-center text-gray-700 leading-relaxed"
            style={{ fontFamily: 'serif' }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            "Each step you take in our juttis carries forward a legacy of Indian craftsmanship, connecting you to centuries of artisanal excellence and cultural heritage."
          </motion.blockquote>
        </motion.div>

        <motion.div 
          className="flex items-center justify-center order-2"
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
        >
          <motion.div 
            className="w-full max-w-md h-64 sm:h-80 lg:h-96 s rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateY: -10,
              transition: { duration: 0.3 }
            }}
          >
               <Image
            src={"/C3.png"}
            alt='dsfe'
            height={100}
            width={100}
            className='h-full w-full object-cover rounded-xl shadow-xl'
            priority
            />
        </motion.div>
        </motion.div>
      </div>

      {/* Closing Statement */}
      <motion.div 
        className="text-center py-8 lg:py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p 
          className="text-xl lg:text-2xl text-gray-700 font-medium"
          style={{ fontFamily: 'serif' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Each step you take in our juttis carries forward a legacy of Indian craftsmanship.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const JuttisSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const imageX = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-h-[70vh] max-w-[1600px] mx-auto my-12 lg:my-20 px-4 lg:px-8 gap-8 lg:gap-0"
    >
      <motion.div 
        style={{ x: imageX }}
        className="flex items-center justify-center order-2 lg:order-1"
      >
        <motion.div 
          className="w-full max-w-lg h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: -5,
            transition: { duration: 0.3 }
          }}
        >
               <Image
            src={"/C3.png"}
            alt='dsfe'
            height={100}
            width={100}
            className='h-full w-full object-cover rounded-xl shadow-xl'
            priority
            />
      </motion.div>
      </motion.div>

      <motion.div 
        style={{ x: textX }}
        className="flex flex-col justify-center order-1 lg:order-2 px-4 lg:px-16 text-center lg:text-left"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-8 lg:mb-16 leading-tight font-light"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            The Art of
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.4 }}
            className="block"
          >
            Traditional Indian
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.6 }}
            className="block text-gray-600"
          >
            Juttis
          </motion.span>
        </motion.h2>

        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed text-justify"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our juttis are more than just footwear – they are wearable pieces of art that showcase India's rich cultural heritage. Each pair is meticulously handcrafted using traditional techniques that have been refined over centuries.
        </motion.p>
        
      </motion.div>
      
    </motion.div>
  );
};

const GridSection2 = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const imageX = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div 
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-[70vh] max-w-[1600px] mx-auto my-12 lg:my-20 px-4 lg:px-8 gap-8 lg:gap-0"
    >
      {/* Text Section - now appears first on mobile */}
      <motion.div 
        style={{ x: textX }}
        className="flex flex-col justify-center px-4 lg:px-16 text-center lg:text-left order-1 lg:order-1"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-8 lg:mb-16 leading-tight font-light"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            Our Commitment
          </motion.span>
          <motion.span
            initial={{ opacity: 0, rotateX: 90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.4 }}
            className="block text-gray-600"
          >
            to Craftsmanship
          </motion.span>
        </motion.h2>

        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed text-justify"
          style={{ fontFamily: 'serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Every stitch, every detail, every curve is crafted with precision and passion. We honor the legacy of our artisans while embracing innovation to create footwear that transcends time and trends.
        </motion.p>
      </motion.div>

      {/* Image Section - now appears second on mobile */}
      <motion.div 
        style={{ x: imageX }}
        className="flex items-center justify-center order-2 lg:order-2"
      >
        <motion.div 
          className="w-full max-w-lg h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src="/C3.png"
            alt="Craftsmanship Image"
            height={100}
            width={100}
            className="h-full w-full object-cover rounded-xl shadow-xl"
            priority
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


const HomePage = () => {
  return (
    <motion.div 
      className="overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <CraftingStoriesSection />
      <HeroSection1 />
      <TraditionContemporarySection />
      <JuttisSection />
      <GridSection2 />
    </motion.div>
  );
};

export default HomePage;