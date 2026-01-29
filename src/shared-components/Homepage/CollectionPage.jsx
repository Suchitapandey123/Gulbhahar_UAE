"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Category tabs for filtering products - Match these IDs with parentCategory values
const categories = [
  { id: "all", label: "All" },
  { id: "juttis", label: "Juttis" },
  { id: "saree", label: "Sarees" },
  { id: "suit", label: "Suits" },
  { id: "lehenga", label: "Lehenga" },
];

export default function CollectionsPage({ collections = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const ref = useRef(null);

  // Debug: Log collections to see actual data
  useEffect(() => {
    console.log("Collections data:", collections);
    console.log("Unique parentCategories:", 
      Array.from(new Set(collections.flatMap(c => c.parentCategory || [])))
    );
  }, [collections]);

  // Fixed filter logic - Check both parentCategory AND category field
  const filteredCollections = selectedCategory === "all"
    ? collections
    : collections.filter(collection => {
        const parentCategories = collection.parentCategory || [];
        const categoryField = collection.category || "";
console.log(categoryField)
        // Check parentCategory array first
        const matchesParentCategory = parentCategories.some(
          cat => cat?.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
        );

        
        // Fallback: Check category field (for old products without parentCategory)
        const matchesCategoryField = categoryField.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesParentCategory || matchesCategoryField;
      });
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // Helper function to get safe image URL (without cache busting for Next.js optimization)
  const getSafeImageUrl = (collection) => {
    try {
      return collection?.images?.[0]?.[0] || '/assets/Image/fallback.jpg';
    } catch {
      return '/assets/Image/fallback.jpg';
    }
  };

  // Get count for each category - Check both parentCategory AND category field
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return collections.length;

    return collections.filter(collection => {
      const parentCategories = collection.parentCategory || [];
      const categoryField = collection.category[0] || "";
      // Check parentCategory array
      const matchesParentCategory = parentCategories.some(
        cat => cat?.toLowerCase().trim() === categoryId.toLowerCase().trim()
      );

      // Fallback: Check category field (for old products)
      const matchesCategoryField = categoryField.toLowerCase().includes(categoryId.toLowerCase());

      return matchesParentCategory || matchesCategoryField;
    }).length;
  };

  return (
    <div
      ref={ref}
      className=""
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway">
          COLLECTIONS
        </h2>
        
        <Link href="/collections">
          <button className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] lg:h-[33px] uppercase group">
            Show More
            <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
              <ArrowUpRight size={32} />
            </div>
          </button>
        </Link>
      </div>

      {/* Category Filter Tabs - Same design as Collection.jsx */}
      <div className="flex flex-nowrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 sm:px-6 py-2 sm:py-3 border-2 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${
              selectedCategory === category.id
                ? "bg-red-900 text-white border-red-900 shadow-lg"
                : "bg-white text-red-900 border-red-300 hover:bg-red-50 hover:border-red-900"
            }`}
          >
            {category.label.toUpperCase()}
            <span className="ml-1 text-xs opacity-75">
              ({getCategoryCount(category.id)})
            </span>
          </button>
        ))}
      </div>

      

      {/* Collections Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredCollections.slice(0, 8).map((collection , index) => (
            <motion.div
              key={`${collection.productId}-${selectedCategory}`}
              variants={itemVariants}
              className="group w-full"
            >
              <Link href={`/collections/${collection.productId}`}>
                <div className="space-y-3 cursor-pointer">
                  {/* Image Container */}
                  <div className="relative overflow-hidden w-full aspect-[3/4] rounded-lg">
                    <Image
                      src={getSafeImageUrl(collection)}
                      alt={`${collection.name} - collection image`}
                      fill
                      priority={index < 2}
                      loading={index < 2 ? undefined : "lazy"}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={70}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Hover Indicator */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform scale-90 group-hover:scale-100">
                      <ArrowUpRight size={16} className="text-black" />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1 text-center px-1">
                    <p className="text-sm sm:text-base lg:text-lg font-sans text-black line-clamp-2">
                      {collection.name?.toUpperCase() || "PRODUCT NAME"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium">
                      ₹ {collection.price?.toLocaleString() || "0"}
                    </p>
                    
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center py-24 px-6">
          <div className="mx-auto mb-8 w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800 font-raleway">
              No Collections Found
            </h3>
            
            <p className="text-lg text-gray-600 font-raleway max-w-md mx-auto">
              We couldn't find any collections for{" "}
              <span className="font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                {selectedCategory}
              </span>{" "}
              right now.
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className="px-6 py-3 bg-customRed text-white rounded-full font-semibold hover:bg-red-800 transition-colors duration-200 font-raleway"
            >
              Browse All Collections
            </button>
          </div>
        </div>
      )}
    </div>
  );
}