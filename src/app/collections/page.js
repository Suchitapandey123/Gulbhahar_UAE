"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  SlidersHorizontal,
  X,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import productApi from "../api/v0/product-service";
import ContentSection from "./components/ContentSection";
import TopTrends from "./components/TopTrends";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import { useCart } from "../../Providers/ContextProviders/CartContext"; // 🔥 ADD THIS IMPORT

// Keep fallback data for when API is loading or fails
const fallbackCollections = [
  {
    id: 1,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: [
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
    ],
    season: "Winter",
    stock: 12,
    size: "S",
  },
];

const seasons = ["all", "spring", "summer", "monsoon", "autumn", "winter"];

const sortOptions = [
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Newest", value: "newest" },
  { label: "Relevance", value: "relevance" },
];

const ITEMS_PER_PAGE = 24;

export default function Collection() {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🔥 REMOVE THESE OLD CART STATES:
  // const [cart, setCart] = useState([]);
  // const [addingToCart, setAddingToCart] = useState(null);
  
  // 🔥 ADD CART CONTEXT HOOK INSTEAD:
  const { addToCart, addingToCart } = useCart();
  
  const [openSections, setOpenSections] = useState({
    price: false,
    size: false,
  });
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDragging, setIsDragging] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const slideIntervalRef = useRef(null);
  const sliderRef = useRef(null);
  const { showToast, ToastContainer } = useToast();

  // Data Fetching
  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getAllProduct"],
    queryFn: () => productApi.getAllProduct(),
  });

  // Transform API data to match component structure
  const transformApiData = (apiProducts) => {
    if (!apiProducts || !Array.isArray(apiProducts)) return [];

    return apiProducts.map((product, index) => ({
      id: product._id || `product-${index}`,
      productId: product.productId,
      title: product.title || "productTitle",
      name: product.name || "Product",
      price: product.price || 0,
      originalPrice: product.originalPrice,
      image:
        product.images && product.images.length > 0
          ? product.images
          : ["/Image/About1.png", "/Image/About1.png", "/Image/About1.png"],
      season: product.season?.toLowerCase() || "winter",
      stock: product.stock || Math.floor(Math.random() * 15) + 6,
      size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M",
      sizes: product.sizes || ["M"],
      colors: product.colors || [],
      overview: product.overview || [],
      details: product.details || [],
      isActive: product.isActive !== false,
      createdAt: product.createdAt,
    }));
  };

  // 🔥 REPLACE OLD handleAddToCart WITH THIS NEW ONE:
 


const handleAddToCart = async (e, item) => {
  console.log('🛒 Collections - Adding item to cart:', item);
  e.preventDefault();
  e.stopPropagation();

  try {
    // Auto-select first available options
    const selectedColor = item.colors && item.colors.length > 0 ? item.colors[0] : 'default';
    const selectedSize = item.sizes && item.sizes.length > 0 ? item.sizes[0] : 'default';
    
    console.log('🎨 Auto-selected variants:', { selectedColor, selectedSize });

    // 🔥 STANDARDIZED cart item structure
    const cartItemWithVariants = {
      ...item,
      // Use productId consistently
      id: item.productId || item.id,
      productId: item.productId || item.id,
      selectedColor,
      selectedSize,
      selectedColorIndex: 0,
      // Remove custom cartId - let context generate it
      addedAt: new Date().toISOString()
    };

    console.log('🛒 Standardized cart item:', cartItemWithVariants);

    const result = await addToCart(cartItemWithVariants);
    
    if (result.success) {
      console.log('✅ Item added successfully');
      showToast(
        `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`, 
        'success'
      );
    } else {
      console.log('❌ Failed to add item');
      showToast("Failed to add item to cart. Please try again.", "error");
    }
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    showToast("Failed to add item to cart. Please try again.", "error");
  }
};

  // Use API data if available, otherwise fallback
  const collections = apiData ? transformApiData(apiData) : fallbackCollections;

  // Update price range based on actual data - Fixed to prevent infinite re-renders
  useEffect(() => {
    if (collections.length > 0) {
      const prices = collections
        .map((item) => item.price)
        .filter((price) => price > 0);
      if (prices.length > 0) {
        const calculatedMin = Math.min(...prices);
        const calculatedMax = Math.max(...prices);
        const newMinPrice = Math.max(0, calculatedMin - 200);
        const newMaxPrice = calculatedMax + 200;
  
        // Only update if values are different to prevent infinite re-renders
        if (minPrice !== newMinPrice || maxPrice !== newMaxPrice) {
          setMinPrice(newMinPrice);
          setMaxPrice(newMaxPrice);
          setPriceRange([newMinPrice, newMaxPrice]);
        }
      }
    }
  }, [collections.length, minPrice, maxPrice]);

  // Reset pagination when filters change - debounced to prevent multiple rapid changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [selectedSeason, selectedSizes, sortBy]);

  const histogramData = [
    { range: "0-500", count: 3 },
    { range: "500-1k", count: 5 },
    { range: "1k-1.5k", count: 8 },
    { range: "1.5k-2k", count: 12 },
    { range: "2k-2.5k", count: 10 },
    { range: "2.5k-3k", count: 7 },
    { range: "3k-3.5k", count: 5 },
    { range: "3.5k-4k", count: 4 },
    { range: "4k-4.5k", count: 3 },
    { range: "4.5k-5k", count: 2 },
  ];

  // Extract unique sizes from API data
  const sizes = [
    ...new Set(collections.flatMap((item) => item.sizes || [])),
  ].filter(Boolean);
  const allSizes =
    sizes.length > 0 ? sizes : ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  const MIN_PRICE = minPrice;
  const MAX_PRICE = maxPrice;
  const PRICE_RANGE = MAX_PRICE - MIN_PRICE;

  useEffect(() => {
    const initialIndices = {};
    collections.forEach((item) => {
      initialIndices[item.id] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, [collections.length]);

  const handleMouseEnter = (productId) => {
    setHoveredProduct(productId);
    clearInterval(slideIntervalRef.current);

    slideIntervalRef.current = setInterval(() => {
      setCurrentImageIndices((prev) => {
        const currentIndex = prev[productId] || 0;
        const product = collections.find((item) => item.id === productId);
        if (!product) return prev;

        // Handle both data structures
        const isMultipleColors = Array.isArray(product.image[0]);
        const imagesToShow = isMultipleColors
          ? product.image[0]
          : product.image;

        const nextIndex = (currentIndex + 1) % imagesToShow.length;
        return { ...prev, [productId]: nextIndex };
      });
    }, 2000);
  };
  
  const handleMouseLeave = () => {
    setHoveredProduct(null);
    clearInterval(slideIntervalRef.current);
  };

  useEffect(() => {
    return () => {
      clearInterval(slideIntervalRef.current);
    };
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
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
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
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
    if (isDragging === "min") {
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
    if (isDragging === "min") {
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
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, priceRange, MIN_PRICE, PRICE_RANGE]);

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
      // Only show active products
      if (item.isActive === false) return false;

      const matchesSeason =
        selectedSeason === "all" ||
        item.season?.toLowerCase() === selectedSeason.toLowerCase();
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => item.sizes && item.sizes.includes(size));
      return matchesSeason && matchesPrice && matchesSize;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE);

  // Ensure currentPage doesn't exceed totalPages
  const safePage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedCollections = filteredCollections.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSelectedSeason("all");
    setPriceRange([minPrice, maxPrice]);
    setSelectedSizes([]);
    setSelectedSize(null);
    setCurrentPage(1);
  };

  // 🔥 REMOVE CartCounter COMPONENT - IT'S NOW IN HEADER
  // const CartCounter = () => { ... }

  const FilterContent = () => (
    <div className="font-sans">
      <div className="flex justify-between items-center p-6 border-b border-red-100">
        <span className="text-xl font-bold text-red-900">Filters</span>
        <button
          onClick={clearFilters}
          className="text-red-900 hover:text-red-700 font-semibold transition-colors"
        >
          Clear All
        </button>
      </div>

      <motion.div
        className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg m-4 shadow-lg"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        layout
      >
        <div className="p-2">
          <motion.div
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => toggleSection("price")}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.h3
              className="text-lg font-bold text-red-900"
              whileHover={{ color: "#b91c1c" }}
              transition={{ duration: 0.3 }}
              layout
            >
              Price Range
            </motion.h3>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: openSections.price ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {openSections.price ? (
                <ChevronUp size={20} className="text-red-900" />
              ) : (
                <ChevronDown size={20} className="text-red-900" />
              )}
            </motion.div>
          </motion.div>

          <AnimatePresence initial={false}>
            {openSections.price && (
              <motion.div
                key="price-range"
                initial={{ opacity: 0, scaleY: 0.9, height: 0 }}
                animate={{ opacity: 1, scaleY: 1, height: "auto" }}
                exit={{ opacity: 0, scaleY: 0.9, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden origin-top"
                layout
              >
                <motion.div className="mt-6 space-y-4" layout>
                  {/* Range Slider */}
                  <motion.div
                    className="relative h-2 bg-red-100 rounded-full mb-6 shadow-inner"
                    ref={sliderRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    layout
                  >
                    <motion.div
                      className="absolute h-full bg-gradient-to-r from-red-900 to-red-700 rounded-full shadow-sm"
                      style={{
                        left: `${minPosition}%`,
                        width: `${maxPosition - minPosition}%`,
                      }}
                    />

                    {/* Min Thumb */}
                    <motion.div
                      className="absolute w-5 h-5 bg-white border-3 border-red-900 rounded-full shadow-lg -top-1.5 -ml-2.5 cursor-pointer"
                      style={{ left: `${minPosition}%` }}
                      onMouseDown={handleMouseDown("min")}
                      onTouchStart={handleTouchStart("min")}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      drag="x"
                      dragConstraints={sliderRef}
                      dragElastic={0.05}
                    />

                    {/* Max Thumb */}
                    <motion.div
                      className="absolute w-4 h-4 bg-white border-3 border-red-900 rounded-full shadow-lg -top-1.5 -ml-2.5 cursor-pointer"
                      style={{ left: `${maxPosition}%` }}
                      onMouseDown={handleMouseDown("max")}
                      onTouchStart={handleTouchStart("max")}
                      whileHover={{
                        scale: 1.3,
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      drag="x"
                      dragConstraints={sliderRef}
                      dragElastic={0.05}
                    />
                  </motion.div>

                  {/* Price Display */}
                  <motion.div
                    className="flex justify-between text-sm font-bold text-red-900 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    layout
                  >
                    <motion.span
                      className="bg-white px-3 py-1 rounded-full shadow"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      ₹{priceRange[0].toLocaleString()}
                    </motion.span>
                    <motion.span
                      className="bg-white px-3 py-1 rounded-full shadow"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                      }}
                    >
                      ₹{priceRange[1].toLocaleString()}
                    </motion.span>
                  </motion.div>

                  {/* Input Fields */}
                  <motion.div
                    className="flex justify-between space-x-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    layout
                  >
                    <motion.input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        handlePriceChange(0, Number(e.target.value))
                      }
                      className="w-full border-2 border-red-200 rounded-lg px-2 py-1 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-shadow duration-300"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.2)",
                      }}
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
                      onChange={(e) =>
                        handlePriceChange(1, Number(e.target.value))
                      }
                      className="w-full border-2 border-red-200 rounded-lg px-2 py-1 focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-shadow duration-300"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      whileFocus={{
                        scale: 1.02,
                        boxShadow: "0 0 0 2px rgba(220, 38, 38, 0.2)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg m-4 shadow-sm">
        <div className="p-2">
          <div
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => toggleSection("size")}
          >
            <h3 className="text-lg font-bold text-red-900 group-hover:text-red-700 transition-colors">
              Size
            </h3>
            {openSections.size ? (
              <ChevronUp size={20} className="text-red-900" />
            ) : (
              <ChevronDown size={20} className="text-red-900" />
            )}
          </div>

          {openSections.size && (
            <div className="mt-6 grid grid-cols-4 gap-3">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    if (selectedSizes.includes(size)) {
                      setSelectedSizes(selectedSizes.filter((s) => s !== size));
                    } else {
                      setSelectedSizes([...selectedSizes, size]);
                    }
                  }}
                  className={`
                    py-1 px-[-8] border-2 rounded-lg font-bold transition-all duration-200 transform hover:scale-105
                    ${
                      selectedSizes.includes(size)
                        ? "bg-red-900 text-white border-red-900 shadow-lg"
                        : "bg-white text-red-900 border-red-200 hover:bg-red-50 hover:border-red-900"
                    }
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen mt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-red-900 font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen mt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-900 font-semibold">
            Error loading products: {error.message}
          </p>
          <p className="text-red-600 mt-2">Using fallback data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 lg:mt-24">
      <ToastContainer />
      
      {/* 🔥 REMOVE THIS LINE - CartCounter is now in header */}
      {/* <CartCounter /> */}
      
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-2 lg:px-6">
        <nav className="py-4">
          <span className="text-red-700 hover:text-red-900 transition-colors cursor-pointer">
            Home
          </span>
          <span className="mx-2 text-red-400">/</span>
          <span className="text-red-900 font-semibold">Collections</span>
        </nav>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
        {/* Sidebar - Visible only on lg screens and larger */}
        <div className="hidden xl:flex xl:flex-row max-w-[360px] mb-8">
          <p className="font-bold text-2xl text-red-900 pl-5 mb-6">
            {/* {filteredCollections.length} Results */}
          </p>

          <div className="bg-white border-2 border-red-200 h-[890px] w-[280px] rounded-xl shadow-lg">
            <FilterContent />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm lg:hidden">
            <div className="bg-white rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center px-2 xs:px-6 py-8 border-b border-red-100">
                <h2 className="text-xl font-bold text-red-900">Filters</h2>
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
              <div className="px-6 py-4 xs:px-6 xs:py-4 border-t border-red-100 flex justify-end">
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
        <div className="w-full px-2 lg:px-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between border-b-2 border-red-200 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <p className="font-bold text-xl text-red-900 hidden">
                {filteredCollections.length} Results
              </p>

              <div className="flex bg-white border-2 border-red-200 rounded-lg p-1 shadow-sm">
                <button
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-red-900 text-white shadow-md"
                      : "text-red-900 hover:bg-red-50"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={15} />
                </button>
                <button
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-red-900 text-white shadow-md"
                      : "text-red-900 hover:bg-red-50"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            <div className="flex items-center px-1 xs:px-0 gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                className="flex lg:hidden items-center justify-center p-[6.5px] border-2 border-red-300 rounded-lg bg-white hover:bg-red-50 transition-colors"
                onClick={toggleModal}
              >
                <SlidersHorizontal size={18} className="text-red-900 mr-2" />
                <span className="text-red-900 font-medium">Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-red-900 font-semibold hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-2 border-2 border-red-300 rounded-lg bg-white text-red-900 font-medium focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Season Filters */}
          <div className="flex flex-nowrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season);
                  setCurrentPage(1);
                }}
                className={`px-4 sm:px-6 py-2 sm:py-3 border-2 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                  selectedSeason === season
                    ? "bg-red-900 text-white border-red-900 shadow-lg"
                    : "bg-white text-red-900 border-red-300 hover:bg-red-50 hover:border-red-900"
                }`}
              >
                {season !== "all"
                  ? `${season.toUpperCase()} 2025`
                  : season.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Product Grid/List with ViewMode Support */}
          <div
            className={`px-1 ${
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                : "flex flex-col gap-4"
            }`}
          >
            {paginatedCollections.map((item, index) => (
              <div
                key={item.productId}
                className={`group w-full ${
                  viewMode === "list"
                    ? "bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    : ""
                }`}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={`/collections/${item.productId}`}>
                  <div
                    className={`cursor-pointer relative ${
                      viewMode === "grid" ? "space-y-3" : "flex gap-4 p-4"
                    }`}
                  >
                    {/* Image Container */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "grid"
                          ? "w-full aspect-[3/4]"
                          : "w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 rounded-lg"
                      }`}
                    >
                      {(() => {
                        const isMultipleColors = Array.isArray(item.image[0]);
                        const imagesToShow = isMultipleColors
                          ? item.image[0]
                          : item.image;
                        const currentImageIndex =
                          currentImageIndices[item.id] || 0;

                        return (
                          <div className="relative w-full h-full bg-gray-100">
                            {/* Stack all images and show current one with fade */}
                            {imagesToShow.map((image, idx) => (
                              <Image
                                width={200}
                                height={450}
                                key={idx}
                                src={image || "/Image/About1.png"}
                                alt={`${item.title} - ${idx + 1}`}
                                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
                                  currentImageIndex === idx
                                    ? "opacity-100"
                                    : "opacity-0"
                                } ${viewMode === "list" ? "rounded-lg" : ""}`}
                                onError={(e) => {
                                  e.target.src = "/Image/About1.png";
                                }}
                              />
                            ))}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                          </div>
                        );
                      })()}

                      {/* Image Indicators - Only show in grid view */}
                      {viewMode === "grid" &&
                        (() => {
                          const isMultipleColors = Array.isArray(item.image[0]);
                          const imagesToShow = isMultipleColors
                            ? item.image[0]
                            : item.image;

                          return (
                            imagesToShow.length > 1 && (
                              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                                {imagesToShow.map((_, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      (currentImageIndices[item.id] || 0) ===
                                      idx
                                        ? "bg-red-900 w-3"
                                        : "bg-white/80"
                                    }`}
                                  />
                                ))}
                              </div>
                            )
                          );
                        })()}

                      {/* Stock Tag */}
                      {item.stock && item.stock <= 5 && item.stock > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                          Only {item.stock} left!
                        </span>
                      )}

                      {/* Discount Badge */}
                      {item.originalPrice &&
                        item.originalPrice > item.price && (
                          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100
                            )}
                            % OFF
                          </span>
                        )}

                      {/* Hover Add to Cart Button - Only in grid view */}
                      {viewMode === "grid" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0">
                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            disabled={addingToCart === item.id}
                            className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
                          >
                            <ShoppingBag size={14} />
                            <span>
                              {addingToCart === item.id
                                ? "Adding..."
                                : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Product Info - Different layouts for grid vs list */}
                    {viewMode === "grid" ? (
                      /* Grid View - Compact Layout */
                      <div className="flex flex-col justify-between h-full px-2 py-2 space-y-1">
                        {/* Top Row - Product Name & Price */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                              {item.name?.toUpperCase() || "PRODUCT NAME"}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="flex flex-col items-end gap-0.5">
                              <span className="text-sm font-bold text-red-600">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice &&
                                item.originalPrice > item.price && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Second Row - Stock Status */}
                        <div className="flex items-center justify-start text-xs">
                          <div className="flex-1">
                            {item.stock && item.stock <= 5 && item.stock > 0 ? (
                              <span className="text-red-600 font-medium">
                                {item.stock} left
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">
                                In Stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row - Metadata */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          {/* Sizes */}
                          <div className="flex items-center gap-1">
                            {item.sizes && item.sizes.length > 0 && (
                              <>
                                <span className="text-gray-500">Size:</span>
                                <div className="flex gap-1">
                                  {item.sizes.slice(0, 2).map((size, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                  {item.sizes.length > 2 && (
                                    <span className="text-gray-500">
                                      +{item.sizes.length - 2}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Colors */}
                          <div className="flex items-center gap-1">
                            {item.colors && item.colors.length > 0 && (
                              <div className="flex items-center gap-1">
                                {item.colors.slice(0, 3).map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: color.toLowerCase(),
                                    }}
                                    title={color}
                                  />
                                ))}
                                {item.colors.length > 3 && (
                                  <span className="text-gray-500 text-xs">
                                    +{item.colors.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* List View - Horizontal Layout */
                      <div className="flex-1 flex flex-col justify-between py-1">
                        {/* Top Section */}
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 pr-4">
                              {item.name?.toUpperCase() || "PRODUCT NAME"}
                            </h3>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-lg font-bold text-red-600">
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice &&
                                item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Stock Status */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm">
                              {item.stock &&
                              item.stock <= 5 &&
                              item.stock > 0 ? (
                                <span className="text-red-600 font-medium">
                                  Only {item.stock} left
                                </span>
                              ) : (
                                <span className="text-green-600 font-medium">
                                  ✓ In Stock
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            {/* Sizes */}
                            {item.sizes && item.sizes.length > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Sizes:</span>
                                <div className="flex gap-1">
                                  {item.sizes.slice(0, 4).map((size, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                  {item.sizes.length > 4 && (
                                    <span className="text-gray-500">
                                      +{item.sizes.length - 4}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Colors */}
                            {item.colors && item.colors.length > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Colors:</span>
                                <div className="flex items-center gap-1">
                                  {item.colors.slice(0, 5).map((color, idx) => (
                                    <div
                                      key={idx}
                                      className="w-5 h-5 rounded-full border-2 border-gray-300"
                                      style={{
                                        backgroundColor: color.toLowerCase(),
                                      }}
                                      title={color}
                                    />
                                  ))}
                                  {item.colors.length > 5 && (
                                    <span className="text-gray-500 text-sm">
                                      +{item.colors.length - 5}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section - Add to Cart Button */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            {/* Image Indicators for List View */}
                            {(() => {
                              const isMultipleColors = Array.isArray(
                                item.image[0]
                              );
                              const imagesToShow = isMultipleColors
                                ? item.image[0]
                                : item.image;

                              return (
                                imagesToShow.length > 1 && (
                                  <div className="flex gap-1">
                                    {imagesToShow.map((_, idx) => (
                                      <div
                                        key={idx}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                          (currentImageIndices[item.id] ||
                                            0) === idx
                                            ? "bg-red-900"
                                            : "bg-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )
                              );
                            })()}
                          </div>

                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            disabled={addingToCart === item.id}
                            className="bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            <ShoppingBag size={16} />
                            <span>
                              {addingToCart === item.id
                                ? "Adding..."
                                : "Add to Cart"}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Enhanced No Products Found */}
          {filteredCollections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[400px]">
              {/* Animated Icon Container */}
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-full shadow-lg border border-gray-200">
                  <ShoppingBag
                    size={48}
                    className="text-red-800 transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="text-center max-w-md space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We couldn't find any products matching your current filters.
                  Try broadening your search or exploring different categories.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={clearFilters}
                  className="group relative hidden px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                  <span className="relative z-10">Clear All Filters</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </button>

                <button
                  onClick={() => setSelectedSeason("all")}
                  className="px-8 py-3 bg-white text-gray-700 font-semibold border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  Browse All Products
                </button>
              </div>

              {/* Helpful Suggestions */}
              <div className="mt-12 p-6 bg-gradient-to-r from-red-100 to-red-100 rounded-2xl border border-red-200 max-w-lg">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Search Tips
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Try using broader search terms</li>
                  <li>• Check your spelling and try different keywords</li>
                  <li>• Remove some filters to see more results</li>
                  <li>• Browse our popular categories instead</li>
                </ul>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 py-8 border-t-2 border-red-200">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safePage === 1}
                className="px-4 py-2 hidden sm:block rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                First
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
                className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {/* Show page numbers around current page */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (safePage <= 3) {
                    pageNum = i + 1;
                  } else if (safePage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = safePage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-bold transition-all ${
                        safePage === pageNum
                          ? "bg-red-900 text-white"
                          : "bg-white text-red-900 border-2 border-red-300 hover:bg-red-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={safePage === totalPages}
                className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Next
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safePage === totalPages}
                className="px-4 py-2 hidden sm:block rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>

      <TopTrends />

      {/* <ContentSection /> */}
    </div>
  );
}