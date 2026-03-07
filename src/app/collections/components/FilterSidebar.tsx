// @ts-nocheck
"use client";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterSidebar({
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  selectedSizes,
  setSelectedSizes,
  allSizes,
  clearFilters,
  isModal = false,
  closeModal = () => {},
}) {
  const [openSections, setOpenSections] = useState({
    price: false,
    size: false,
  });
  const [isDragging, setIsDragging] = useState(null);
  const sliderRef = useRef(null);

  const MIN_PRICE = minPrice;
  const MAX_PRICE = maxPrice;
  const PRICE_RANGE = MAX_PRICE - MIN_PRICE;

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

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-red-100">
        <span className="text-xl font-bold text-red-900">Filters</span>
        <div className="flex items-center gap-3">
          <button
            onClick={clearFilters}
            className="text-red-900 hover:text-red-700 font-semibold transition-colors"
          >
            Clear All
          </button>
          {isModal && (
            <button
              onClick={closeModal}
              className="p-2 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={20} className="text-red-900" />
            </button>
          )}
        </div>
      </div>

      {/* Price Range Filter */}
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
                <motion.div className="mx-3 mt-6 space-y-4" layout>
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

      {/* Size Filter */}
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

      {/* Apply Button (Modal Only) */}
      {isModal && (
        <div className="px-6 py-4 border-t border-red-100 flex justify-end">
          <button
            onClick={closeModal}
            className="px-8 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors font-bold shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}