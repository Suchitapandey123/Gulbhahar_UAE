'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Import your images - update these paths to match your project structure
import Product1Main from '../../../public/assets/Image/C2.png';
import Product1Thumb1 from '../../../public/assets/Image/C2.png';
import Product2Main from '../../../public/assets/Image/C2.png';
import Product2Thumb1 from '../../../public/assets/Image/C2.png';
import Product3Main from '../../../public/assets/Image/C2.png';
import Product3Thumb1 from '../../../public/assets/Image/C2.png';

const NewCollection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Product data with imported images
  const products = [
    {
      id: 1,
      name: 'Noorani (Jutti)',
      price: '₹ 5,000',
      mainImage: Product1Main,
      thumbnail: Product1Thumb1,
      thumbnailPosition: 'topRight',
      href: '/collection/noorani-jutti'
    },
    {
      id: 2,
      name: 'Noorani (Jutti)',
      price: '₹ 5,000',
      mainImage: Product2Main,
      thumbnail: Product2Thumb1,
      thumbnailPosition: 'bottomRight',
      href: '/collection/noorani-jutti-2'
    },
    {
      id: 3,
      name: 'Noorani (Jutti)',
      price: '₹ 5,000',
      mainImage: Product3Main,
      thumbnail: Product3Thumb1,
      thumbnailPosition: 'topRight',
      href: '/collection/noorani-jutti-3'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const backgroundNumberVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Different animation variants for each card position
  const getCardVariants = (index) => {
    if (index === 0) {
      // First card - slide from left
      return {
        hidden: { opacity: 0, x: -100, scale: 0.9 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2
          }
        }
      };
    } else if (index === 1) {
      // Middle card - fade in
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.4
          }
        }
      };
    } else {
      // Last card - slide from right
      return {
        hidden: { opacity: 0, x: 100, scale: 0.9 },
        visible: { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.6
          }
        }
      };
    }
  };

  const thumbnailVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0.8,
      rotate: -5
    },
    hover: { 
      scale: 1.05, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const mainImageVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative py-6 md:py-16 px-4 md:px-8 overflow-hidden"
    >
      {/* Animated Background "25" */}
      <motion.div 
        variants={backgroundNumberVariants}
        className="absolute right-64 -top-28 z-0 opacity-1 pointer-events-none select-none pr-8 hidden lg:block"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 2, -2, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(245,223,164,0.75)]"
        >
          25
        </motion.div>
      </motion.div>

      {/* Animated Background "20" */}
      <motion.div 
        variants={backgroundNumberVariants}
        className="absolute left-64 -bottom-40 z-0 opacity-1 pointer-events-none select-none hidden lg:block"
      >
        <motion.div 
          animate={{ 
            rotate: [0, -2, 2, 0],
            scale: [1, 1.01, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="text-[20rem] font-raleway font-bold text-[rgba(162,144,49,0.2)]"
        >
          20
        </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Animated Section heading with "SEE MORE" button */}
        <motion.div 
        variants={headerVariants}
        className="flex justify-between items-center mb-12"
      >
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway"
          >
            NEW COLLECTION
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/Collections" 
              className="flex items-center hover:text-[#8B0000] transition-colors group"
            >
              <span className='flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase  group' >
                SEE MORE
              </span>
              <motion.div
                animate={{ 
                  x: [0, 5, 0],
                  y: [0, -2, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              >
                <ArrowUpRight className="size-6 md:size-8 lg:size-10 xl:size-12 ml-2 md:ml-4" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Product cards */}
        <div className="flex overflow-x-auto scrollbar-hide py-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-16 gap-6 snap-x snap-mandatory md:snap-none">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              variants={getCardVariants(index)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="product-card relative bg-white pb-6 shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[85vw] sm:w-2/3 md:w-auto snap-center rounded-lg overflow-hidden"
            >
              {/* Main product image container */}
              <div className="relative overflow-hidden">
                {/* Main product image */}
                <motion.div 
                  variants={mainImageVariants}
                  initial="initial"
                  animate={hoveredCard === product.id ? "hover" : "initial"}
                  className="relative overflow-hidden rounded-t-lg"
                >
                  <Image 
                    src={product.mainImage} 
                    alt={product.name}
                    width={400}
                    height={533}
                    className="w-full h-auto object-cover"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Overlay effect on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === product.id ? 0.1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black"
                  />
                </motion.div>
              </div>
              
              {/* Animated product details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                className="pt-4 px-4"
              >
                <motion.div 
                  animate={{ 
                    color: hoveredCard === product.id ? '#8B0000' : '#000000'
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl font-oldstandardtt font-[400] mb-1"
                >
                  {product.price}
                </motion.div>
                <motion.div 
                  animate={{ 
                    x: hoveredCard === product.id ? 5 : 0,
                    color: hoveredCard === product.id ? '#8B0000' : '#000000'
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-base md:text-lg font-oldstandardtt font-[400]"
                >
                  {product.name}
                </motion.div>
              </motion.div>
              
              {/* Clickable link overlay */}
              <Link href={product.href} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.name}</span>
              </Link>

              {/* Hover indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredCard === product.id ? 1 : 0,
                  scale: hoveredCard === product.id ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg z-20"
              >
                <ArrowUpRight className="size-4 text-[#8B0000]" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default NewCollection;