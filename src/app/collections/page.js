"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Grid, List, SlidersHorizontal, X, Star, Heart, ShoppingBag } from 'lucide-react';
import img11 from "../../../public/Image/About3.png"
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const collections = [
  {
    id: 1,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "../../../../public/Image/Culture.png",
    season: "FALL 2024",
    stock: 12,
    size: "S",
  },
  {
    id: 2,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 2200,
    image: "../../../../public/Image/Culture.png",
    season: "WINTER 2024",
    stock: 15,
    size: "XXS",
  },
  {
    id: 3,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 1500,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "M",
  },
  {
    id: 4,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "L",
  },
  {
    id: 5,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XL",
  },
  {
    id: 6,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 1800,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 7,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 8,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 1200,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 9,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 10,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS", 
  },
  {
    id: 11,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 12,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 13,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 14,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 15,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 16,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "SPRING 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 17,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "SPRING SUMMER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 18,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 19,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 20,
    title: "Casual Juttis",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 21,
    title: "Festive Collection",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 22,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: "/api/placeholder/260/340",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
];

const seasons = [
  "ALL",
  "FALL 2024",
  "WINTER 2024",
  "SPRING 2024",
  "SPRING SUMMER 2024",
];

const sortOptions= [
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Newest", value: "newest" },
  { label: "Relevance", value: "relevance" },
];

const ITEMS_PER_PAGE = 9;

export default function Collection() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSeason, setSelectedSeason] = useState("ALL");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: false,
    size: false,
  });
  const [priceRange, setPriceRange] = useState([2000, 12000]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDragging, setIsDragging] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  
  const sliderRef = useRef(null);
  
  const histogramData = [
    { range: '2k-3k', count: 3 },
    { range: '3k-4k', count: 5 },
    { range: '4k-5k', count: 8 },
    { range: '5k-6k', count: 12 },
    { range: '6k-7k', count: 10 },
    { range: '7k-8k', count: 7 },
    { range: '8k-9k', count: 5 },
    { range: '9k-10k', count: 4 },
    { range: '10k-11k', count: 3 },
    { range: '11k-12k', count: 2 }
  ];
  
  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const MIN_PRICE = 2000;
  const MAX_PRICE = 12000;
  const PRICE_RANGE = MAX_PRICE - MIN_PRICE;
  
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };
  
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    
    if (index === 0 && value > newRange[1]) {
      newRange[0] = newRange[1];
    } else if (index === 1 && value < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    setPriceRange(newRange);
  };
  
  const handleMouseDown = (handle) => (e) => {
    e.preventDefault();
    setIsDragging(handle);
  };
  
  const handleMouseUp = () => {
    setIsDragging(null);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max(0, offsetX / rect.width), 1);
    const newValue = Math.round(MIN_PRICE + percentage * PRICE_RANGE);
    
    const newRange = [...priceRange];
    if (isDragging === 'min') {
      newRange[0] = Math.min(newValue, priceRange[1]);
    } else {
      newRange[1] = Math.max(newValue, priceRange[0]);
    }
    
    setPriceRange(newRange);
  };
  
  const handleTouchStart = (handle) => () => {
    setIsDragging(handle);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;
    const percentage = Math.min(Math.max(0, offsetX / rect.width), 1);
    const newValue = Math.round(MIN_PRICE + percentage * PRICE_RANGE);
    
    const newRange = [...priceRange];
    if (isDragging === 'min') {
      newRange[0] = Math.min(newValue, priceRange[1]);
    } else {
      newRange[1] = Math.max(newValue, priceRange[0]);
    }
    
    setPriceRange(newRange);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(null);
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, priceRange]);

  const minPosition = ((priceRange[0] - MIN_PRICE) / PRICE_RANGE) * 100;
  const maxPosition = ((priceRange[1] - MIN_PRICE) / PRICE_RANGE) * 100;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filteredCollections = collections
    .filter((item) => {
      const matchesSeason =
        selectedSeason === "ALL" || item.season === selectedSeason;
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.includes(item.size);
      return matchesSeason && matchesPrice && matchesSize;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE);
  const paginatedCollections = filteredCollections.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSelectedSeason("ALL");
    setPriceRange([2000, 12000]);
    setSelectedSizes([]);
    setSelectedSize(null);
  };

  const FilterContent = () => (
    <div className="font-sans">
      <div className="flex justify-between items-center  p-6 border-b border-red-100">
        <span className="text-xl font-bold  text-red-900">Filters</span>
        <button 
          onClick={clearFilters}
          className="text-red-900 hover:text-red-700 font-semibold transition-colors"
        >
          Clear All
        </button>
      </div>

   <motion.div 
      className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg m-4 shadow-sm"
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="p-2">
        <div
          className="flex justify-between items-center cursor-pointer group"
          onClick={() => toggleSection("price")}
        >
          <motion.h3 
            className="text-lg font-bold text-red-900"
            whileHover={{ color: "#b91c1c" }}
            transition={{ duration: 0.2 }}
          >
            Price Range
          </motion.h3>
          {openSections.price ? 
            <ChevronUp size={20} className="text-red-900" /> : 
            <ChevronDown size={20} className="text-red-900" />
          }
        </div>

        <AnimatePresence>
          {openSections.price && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4">
                {/* Histogram with staggered animations */}
                <motion.div 
                  className="relative h-20 flex items-end space-x-1 mb-6 bg-white rounded-lg p-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {histogramData.map((bar, index) => (
                    <motion.div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-red-900 to-red-600 rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.count * 3}px` }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.05,
                        type: "spring"
                      }}
                      whileHover={{
                        background: "linear-gradient(to top, #991b1b, #dc2626)",
                        scaleY: 1.1,
                        originY: 1
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Range slider */}
                <motion.div 
                  className="relative h-2 bg-red-100 rounded-full mb-6 shadow-inner"
                  ref={sliderRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="absolute h-full bg-gradient-to-r from-red-900 to-red-700 rounded-full shadow-sm"
                    style={{
                      left: `${minPosition}%`,
                      width: `${maxPosition - minPosition}%`
                    }}
                  />
                  
                  {/* Min thumb */}
                  <motion.div
                    className="absolute w-5 h-5 bg-white border-3 border-red-900 rounded-full shadow-lg -top-1.5 -ml-2.5 cursor-pointer"
                    style={{ left: `${minPosition}%` }}
                    onMouseDown={handleMouseDown('min')}
                    onTouchStart={handleTouchStart('min')}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    drag="x"
                    dragConstraints={sliderRef}
                    dragElastic={0}
                  />
                  
                  {/* Max thumb */}
                  <motion.div
                    className="absolute w-4 h-4 bg-white border-3 border-red-900 rounded-full shadow-lg -top-1.5 -ml-2.5 cursor-pointer"
                    style={{ left: `${maxPosition}%` }}
                    onMouseDown={handleMouseDown('max')}
                    onTouchStart={handleTouchStart('max')}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    drag="x"
                    dragConstraints={sliderRef}
                    dragElastic={0}
                  />
                </motion.div>
                
                {/* Price display */}
                <motion.div 
                  className="flex justify-between text-sm font-bold text-red-900 mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.span 
                    className="bg-white px-2 py-1 rounded-full shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    ₹{priceRange[0].toLocaleString()}
                  </motion.span>
                  <motion.span 
                    className="bg-white px-2 py-1 rounded-full shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    ₹{priceRange[1].toLocaleString()}
                  </motion.span>
                </motion.div>
                
                {/* Input fields */}
                <motion.div 
                  className="flex justify-between space-x-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                    className="w-full border-2 border-red-200 rounded-lg px-2 py-1 focus:border-red-900 focus:ring-2 focus:ring-red-100"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.span 
                    className="flex items-center text-red-900 font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    —
                  </motion.span>
                  <motion.input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                    className="w-full border-2 border-red-200 rounded-lg px-2 py-1 focus:border-red-900 focus:ring-2 focus:ring-red-100"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>

      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg m-4 shadow-sm">
        <div className="p-2">
          <div 
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => toggleSection('size')}
          >
            <h3 className="text-lg font-bold  text-red-900 group-hover:text-red-700 transition-colors">Size</h3>
            {openSections.size ? 
              <ChevronUp size={20} className="text-red-900" /> : 
              <ChevronDown size={20} className="text-red-900" />
            }
          </div>

          {openSections.size && (
            <div className="mt-6 grid grid-cols-4 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter(s => s !== size));
                    } else {
                      setSelectedSizes([...selectedSizes, size]);
                    }
                  }}
                  className={`
                    py-1 px-[-8] border-2 rounded-lg font-bold transition-all duration-200 transform hover:scale-105
                    ${selectedSizes.includes(size) 
                      ? 'bg-red-900 text-white border-red-900 shadow-lg' 
                      : 'bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-900'}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-gradient-to-br from-red-50 to-rose-50">
      {/* Hero Section */}
      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-rose-900/20"></div>
        <div className="relative flex flex-col sm:flex-row justify-between mb-6 w-full">
          <div className="flex justify-center items-center w-full">
            <div className="border flex    justify-center items-center w-full min-w-full py-20 bg-gradient-to-r from-red-100 to-rose-100">
              <h1 className="text-left mt-14 xs:my-0 font-serif mx-auto max-w-7xl md:text-8xl text-3xl font-bold text-red-900 leading-tight px-4">
                Try our
                <br />
                <span className="md:ml-32 md:text-8xl  text-3xl bg-gradient-to-r from-red-900 to-rose-700 bg-clip-text text-transparent">
                  Latest Collections
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4">
        <nav className="py-4">
          <span className="text-red-700 hover:text-red-900 transition-colors cursor-pointer">Home</span>
          <span className="mx-2 text-red-400">/</span>
          <span className="text-red-900 font-semibold">Collections</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row mt-8 px-2">
  {/* Sidebar - Visible only on lg screens and larger */}
  <div className="hidden xl:flex xl:flex-row max-w-[360px] mb-8">
    <p className="font-bold text-2xl text-red-900 pl-5 mb-6">
      {/* {filteredCollections.length} Results */}
    </p>
    
    <div className="bg-white border-2 border-red-200 h-[890px] w-[280px] rounded-xl shadow-lg">
      <FilterContent />
    </div>
  </div>

  {/* Mobile Filter Modal - Shown on mobile/tablet when toggled */}
  {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm lg:hidden">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center px-6 py-8 border-b border-red-100">
          <h2 className="text-xl font-bold  text-red-900">Filters</h2>
          <button 
            onClick={closeModal}
            className="p-2 hover:bg-red-50 rounded-full transition-colors"
          >
            <X size={20} className="text-red-900" />
          </button>
        </div>
        <div className="p-2">
          <FilterContent />
        </div>
        <div className="px-6 py-4 xs:px-6 xs:py-4  border-t border-red-100 flex justify-end">
          <button 
            onClick={closeModal}
            className="px-4 py-2 xs:px-8 xs:py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors font-bold shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Main Content */}
  <div className="w-full lg:px-6">
    {/* Controls - Modified for responsive behavior */}
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between border-b-2 border-red-200 pb-4 mb-6 gap-4">
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
        {/* Results count - shown on mobile but hidden on lg (shown in sidebar instead) */}
        <p className="font-bold text-xl text-red-900 lg:hidden">
          {filteredCollections.length} Results
        </p>
        
        {/* View toggle buttons */}
        <div className="flex bg-white border-2 border-red-200 rounded-lg p-1 shadow-sm">
          <button 
            className={`p-3 rounded-md transition-all ${viewMode === 'grid' ? 'bg-red-900 text-white shadow-md' : 'text-red-900 hover:bg-red-50'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={18} />
          </button>
          <button 
            className={`p-3 rounded-md transition-all ${viewMode === 'list' ? 'bg-red-900 text-white shadow-md' : 'text-red-900 hover:bg-red-50'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3  w-full sm:w-auto justify-between sm:justify-start">
        {/* Filter button - shown on mobile/tablet, hidden on lg */}
        <button 
          className="flex lg:hidden items-center justify-center p-[6.5px] border-2 border-red-300 rounded-lg bg-white hover:bg-red-50 transition-colors"
          onClick={toggleModal}
        >
          <SlidersHorizontal size={18} className="text-red-900 mr-2" />
          <span className="text-red-900 font-medium">Filters</span>
        </button>
        
        {/* Sort dropdown */}
        <div className="flex items-center   gap-2 ">
          <span className="text-red-900 font-semibold hidden sm:inline">Sort by:</span>
          {/* <div className="mr-20 xs:mr-0"> */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2  py-2 border-2 border-red-300 rounded-lg bg-white text-red-900 font-medium focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-all"
          >
           
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}

          </select>
          {/* </div> */}
        </div>
      </div>
    </div>

    {/* Season Filters */}
    <div className="flex flex-nowrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
      {seasons.map((season) => (
        <button
          key={season}
          onClick={() => setSelectedSeason(season)}
          className={`px-4 sm:px-6 py-2 sm:py-3 border-2 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${
            selectedSeason === season 
              ? "bg-red-900 text-white border-red-900 shadow-lg" 
              : "bg-white text-red-900 border-red-300 hover:bg-red-50 hover:border-red-900"
          }`}
        >
          {season}
        </button>
      ))}
    </div>

    {/* Product Grid - Responsive columns */}
    <div className={`grid gap-2 sm:gap-4 ${
      viewMode === 'grid' 
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-3' 
        : 'grid-cols-1'
    }`}>
      {paginatedCollections.map((item) => (
        <div key={item.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100">
          <div className="relative overflow-hidden h-36 sm:h-52 lg:h-58">
            <Image
              priority
              height={100}
              width={100}
              src="/Image/About3.png"
              alt={item.name}
              className="w-full h-full -ml-3 object-cover scale-150 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2">
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                  favorites.has(item.id)
                    ? 'bg-red-900 text-white'
                    : 'bg-white/80 text-red-900 hover:bg-red-50'
                }`}
              >
                <Heart size={16} fill={favorites.has(item.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
            {item.stock <= 5 && (
              <div className="absolute top-4 left-4 bg-red-900 text-white px-3 py-1 rounded-full text-xs font-bold">
                Only {item.stock} left!
              </div>
            )}
          </div>
          
          <div className="p-2 sm:p-2">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-sm sm:text-lg text-red-900 group-hover:text-red-700 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-current sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm text-gray-600">4.8</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 text-xs sm:text-base">{item.name}</p>
            
            <div className="flex justify-between items-center sm:flex-row gap-2">
              <span className="xs:text-sm sm:text-lg font-bold text-red-900">₹{item.price.toLocaleString()}</span>
              <button className="bg-red-900 max-w-[60%] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:py-2 rounded-lg hover:bg-red-800 transition-colors font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto justify-center">
                <ShoppingBag size={14} className="sm:w-4 w-2 h-2 sm:h-4" />
                <span className="hidden text-sm md:text-sm sm:inline text-nowrap">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination */}
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3 py-8 border-t-2 border-red-200">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 font-semibold transition-all"
      >
        First
      </button>
      
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 font-semibold transition-all"
      >
        Previous
      </button>

      <span className="px-4 py-2 bg-red-900 text-white rounded-lg font-bold">
        {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 font-semibold transition-all"
      >
        Next
      </button>
      
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 font-semibold transition-all"
      >
        Last
      </button>
    </div>
  </div>
</div>

      {/* Top Trends Section */}
      <div className="bg-gradient-to-r from-red-100 to-rose-100 py-16 mt-16">
        <section className="container mx-auto lg:max-w-7xl px-4">
          <h2 className="text-5xl font-bold mb-12 text-red-900 text-center">
            Top Trends
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-200 group"
              >
                <div className="relative">
                  <img
                    src="/api/placeholder/300/400"
                    alt="Trend item"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-red-900 mb-2">Trending Style {i + 1}</h3>
                  <p className="text-gray-600">Discover the latest fashion trends</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-red-200">
          <h2 className="text-3xl font-bold text-red-900 mb-6">
            Women's Casual Shoes You Need To Own
          </h2>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              Casual shoes for women come in an endless number of styles, which
              are constantly updated according to various fashion trends and pop
              culture influences. Any woman who loves shoes knows that they can
              make or break an outfit. If there is a shoe for every foot, then
              there is also a pair of women's casual shoes for every occasion.
            </p>

            <p className="text-lg leading-relaxed">
              This is the best time to buy women casual shoes because brands
              thrive on creating as many imaginative variations as possible. There
              is always a good reason to pick up a pair of women casual shoes,
              whether for an event or just to give your mood a lift. Further,
              shopping for casual shoes for women online now gives you the freedom
              of browsing through several brands at once. Retail therapy on
              Gulbhahr.
            </p>

            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-900">
              <h3 className="text-xl font-bold text-red-900 mb-3">
                Featured Collections
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-red-800">Flat n Heels, Black Solid Synthetic High-Top Flat Boots</h4>
                  <p>Gold hardware on the front of these boots makes them the perfect dressy boot. These women casual shoes will look great with fitted denim or A-line skirts worn with tights.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">Carlton London, Blue Printed Textured Ballerinas</h4>
                  <p>Every woman should own a ballerina along with other women casual shoes. They are simple, comfortable and always in style.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">DressBerry, Metallic Brown Sneakers</h4>
                  <p>The trend of velvety-metallic finish sneakers is all the rage right now in women casual shoes. This pair would couple well with dark skinny jeans and an off-shoulder Bardot top.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">Nike, Pink AIR FORCE 1 '07 Sneakers</h4>
                  <p>Shades of millennial pink are still making waves in fashion. This pair of women casual shoes will complement shades of grey, black or white very well.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900 to-rose-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Shop by Types of Women's Footwear</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                {[
                  'Sandals For Women', 'Heels For Women', 'Sneakers For Women', 'Boots For Women',
                  'Flats For Women', 'Flip Flops For Women', 'Sports Shoes For Women', 'Wedges For Women',
                  'Formal Shoes For Women', 'Loafers For Women', 'Jutti For Women', 'Slippers For Women',
                  'Clogs For Women', 'Trekking Shoes For Women', 'Slides For Women', 'Slip On Shoes For Women'
                ].map((category, index) => (
                  <button 
                    key={index}
                    className="text-left hover:text-red-200 transition-colors underline decoration-dotted"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-red-900 to-rose-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Pair?</h2>
          <p className="text-xl mb-8 text-red-100">Explore our complete collection and discover your new favorite shoes</p>
          <button className="bg-white text-red-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors shadow-lg transform hover:scale-105">
            Shop All Collections
          </button>
        </div>
      </div>
    </div>
  );
}
