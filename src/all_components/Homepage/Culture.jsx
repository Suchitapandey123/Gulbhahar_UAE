"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import culture from "../../../public/assets/Svg/culture.svg";
import img1 from "../../../public/assets/Image/C2.png";



export default function Culture() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const contentToggler = () => {
    setIsVisible(!isVisible);
  };

  // Array of all images to cycle through on mobile
  const mobileImages = [
    { src: img1, alt: "Background block 1" },
    { src: img1, alt: "Background block 2" },
    { src: img1, alt: "Foreground block 1" },
    { src: img1, alt: "Foreground block 2" },
  ];

  useEffect(() => {
    // Only run the carousel on mobile screens
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
    if (mediaQuery.matches) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mobileImages.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [mobileImages.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const mobileCarouselVariants = {
    enter: {
      x: 100,
      opacity: 0,
      scale: 0.95
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const showcaseCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <motion.main 
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="h-screen lg:max-w-full overflow-x-hidden w-[96%] mx-auto bg-white flex items-start"
      >
        {/* Mobile view - carousel */}
        <div className="md:hidden w-full h-full flex items-center justify-center">
          <motion.div 
            variants={imageVariants}
            className="relative z-20"
          >
            <Image
              src={culture}
              width={1600}
              height={400}
              alt="culture_img"
              className="relative z-10 w-full h-auto px-4"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {mobileImages.map((image, index) => (
              index === currentImageIndex && (
                <motion.div 
                  key={index}
                  variants={mobileCarouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={350}
                    height={350}
                    className="rounded-lg shadow-lg w-full h-auto object-cover max-h-[80vh]"
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        
          {/* Indicator dots */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20"
          >
            {mobileImages.map((_, index) => (
              <motion.div 
                key={index}
                animate={{
                  scale: index === currentImageIndex ? 1.2 : 1,
                  opacity: index === currentImageIndex ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </motion.div>
        </div>
      
        {/* Desktop view - original layout */}
        <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-stone-100 to-amber-50">
  {/* Animated floating particles */}
  <div className="absolute inset-0 z-0">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-amber-400/20"
        style={{
          width: `${Math.random() * 12 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          x: [0, Math.random() > 0.5 ? 40 : -40, 0],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>

  {/* Main grid layout */}
  <div className="relative z-10 h-full w-full grid grid-rows-3 grid-cols-1 gap-8 p-8">
    {/* Top row - 2 images */}
    <div className="row-start-1 flex justify-center gap-8 md:gap-16">
      <motion.div
        className="relative w-full max-w-[500px] h-[200px] md:h-[300px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        whileHover={{ scale: 1.05, zIndex: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/gulbhahar-1.png"
            alt="Cultural Artifact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <motion.div
          className="absolute -bottom-4 -left-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="font-bold">Heritage</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-[500px] h-[200px] md:h-[300px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.05, zIndex: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/gulbhahar2.png"
            alt="Cultural Artifact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <motion.div
          className="absolute -bottom-4 -left-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0 }}
        >
          <span className="font-bold">Tradition</span>
        </motion.div>
      </motion.div>
    </div>

    {/* Center culture SVG */}
    <motion.div 
      className="row-start-2 flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative mx-auto w-full max-w-[1600px] h-auto">
        <Image
          src={culture}
          alt="Cultural Heritage"
          width={1600}
          height={400}
          className="w-full h-auto drop-shadow-[0_25px_50px_rgba(180,83,9,0.3)]"
        />
        <motion.div
          className="absolute inset-0 bg-amber-400/10 rounded-lg"
          animate={{
            boxShadow: [
              '0 0 0 0px rgba(180, 83, 9, 0.1)',
              '0 0 0 10px rgba(180, 83, 9, 0)',
              '0 0 0 0px rgba(180, 83, 9, 0)'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>

    {/* Bottom row - 2 images */}
    <div className="row-start-3 flex mt-[-80px] justify-center gap-8 md:gap-16">
      <motion.div
        className="relative w-full max-w-[500px] h-[200px] md:h-[300px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ scale: 1.05, zIndex: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/gulbhahar-3.png"
            alt="Cultural Artifact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <motion.div
          className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="font-bold">Artistry</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-[500px] h-[200px] md:h-[300px]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        whileHover={{ scale: 1.05, zIndex: 20 }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
          <Image
            src="/gulbhahar-4.png"
            alt="Cultural Artifact"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        <motion.div
          className="absolute -top-4 -right-4 bg-amber-600 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 }}
        >
          <span className="font-bold">Legacy</span>
        </motion.div>
      </motion.div>
    </div>
  </div>

  {/* Animated connection lines */}
  <svg className="absolute inset-0 pointer-events-none z-0">
    <motion.path
      d="M 20% 30% L 50% 50% L 80% 30%"
      stroke="rgba(180, 83, 9, 0.3)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="0 1"
      animate={{
        strokeDasharray: ["0 1", "1 0", "0 1"],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <motion.path
      d="M 20% 70% L 50% 50% L 80% 70%"
      stroke="rgba(180, 83, 9, 0.3)"
      strokeWidth="2"
      fill="none"
      strokeDasharray="0 1"
      animate={{
        strokeDasharray: ["0 1", "1 0", "0 1"],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "linear",
        delay: 0.5
      }}
    />
  </svg>
</div> 
      </motion.main>

      {/* Showcase Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto lg:max-w-[1600px] "
      >
        <motion.h1 
          variants={headerVariants}
          className="lg:text-5xl text-3xl font-bold lg:mb-12 mb-10 text-left font-raleway text-customRed pl-4"
        >
          OUR SHOWCASE
        </motion.h1>

        <motion.div 
          variants={containerVariants}
          className="flex overflow-x-auto mx-auto pb-4 sm:pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-12 xl:gap-5 no-scrollbar"
        >
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              variants={showcaseCardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-auto aspect-[3/4] relative hover:bg-white mx-2 first:ml-4 last:mr-4 md:mx-auto group cursor-pointer"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={"/gulbhahar-20.png"}
                  alt="showcase image"
                  width={300}
                  height={450}
                  className="object-cover w-full h-[450px] rounded-lg transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black rounded-lg"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="mt-28 px-4"
      >
        <motion.div
          variants={textVariants}
          className="mb-8 md:mb-12"
        >
          <motion.h2 
            variants={headerVariants}
            className="text-[22px] md:text-xl lg:text-[28px] lg:mb-8 font-[400] font-oldstandardtt"
          >
            Meticulously Handmade Footwear - Gulbhahar
          </motion.h2>

          <motion.div
            variants={textVariants}
            className="text-gray-700 leading-relaxed lg:text-[23px] md:text-base text-[19px] whitespace-wrap font-oldstandardtt"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Welcome to Gulbhahar, where handcrafted excellence meets India's
              finest footwear. Discover a range of spellbinding women's ethnic
              juttis. Each pair is meticulously made with luxury materials and
              expert craftsmanship. Indulge in innovative craftsmanship, where
              designs feature intricate embroidery, luxurious fabrics, and
              timeless motifs celebrating India's rich heritage. The artisans make
              the most refined footwear. They aim to celebrate generational
              tradition while embracing modern style. At Gulbhahar, we take pride
              in creating more than just juttis. Our collection promises to
              elevate your wardrobe and evoke a sense of pride in India's
              heritage. Each pair of enchanting juttis are intricately
              embroidered. They have an aura of ethnic elegance.
            </motion.p>

            <AnimatePresence>
              {isVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: 1, 
                    height: "auto",
                    transition: {
                      duration: 0.5,
                      ease: "easeOut"
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: "easeIn"
                    }
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="space-y-4 mt-4"
                  >
                    <p>
                      Explore our range of juttis, each reflecting the same level of
                      classic artisanal craftsmanship and impeccable designs. At
                      Gulbhahar, we weave a tale of tradition and passion. Step into
                      a world where every pair of footwear is a tribute to
                      craftsmanship and culture. Experience the artistry of India's
                      finest handcrafted footwear. This is where heritage meets
                      elegance, one step at a time.
                    </p>

                    <motion.h4 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="text-black mt-2 mb-3 font-semibold"
                    >
                      What sets Gulbhahar apart is its unwavering commitment to
                      quality and craftsmanship.
                    </motion.h4>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      Each piece is specially created to meet the brand's
                      established policy of high-quality goods. Starting with the
                      selection of materials and ending up with minute embroidery
                      and final details, every step is scrutinised to make
                      accessories as equally beautiful as they are long-lasting.
                      However, Gulbhahar is not only a trademark. It is a
                      celebration of rich Indian culture and art legacy.
                    </motion.p>

                    {/* Additional content sections with staggered animations */}
                    {[
                      {
                        title: "Discover the Collection",
                        content: "Our products have intricate embroidery. The minimalist charm in our collection is exceptional. Explore juttis that define elegance and sophistication."
                      },
                      {
                        title: "Women's Juttis - Discover handcrafted ethnic elegance",
                        content: "Indulge in the exquisite artistry of handcrafted designer juttis at Gulbhahar. Our collection is a blend of traditional and modern designs. Premium materials are used to carefully manufacture each piece."
                      },
                      {
                        title: "Punjabi juttis - Celebrate Tradition with a Modern Twist",
                        content: "Gulbhahar Juttis will take you into Punjab's rich cultural past. Gulbhahar Punjabi juttis are the pinnacle of classic style and craftsmanship, with a classic foundation and a modern twist."
                      },
                      {
                        title: "Why Choose Us?",
                        content: "The Ultimate Combination of Comfort, Style, and Artistry. In addition to making exquisite juttis, we at Gulbhahar also believe in crafting experiences. Our juttis are made to combine the highest workmanship traditions, the most opulent materials, and a dash of modern flair."
                      }
                    ].map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        className="space-y-2"
                      >
                        <h4 className="text-black font-semibold">{section.title}</h4>
                        <p>{section.content}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={contentToggler}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-raleway text-customRed hover:underline text-[17px] mt-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-customRed focus:ring-opacity-50 rounded px-2 py-1"
            >
              {isVisible ? "see less..." : "see more..."}
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
}