'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchPopup = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement your search logic here
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
      onClose();
    }
  };

  // Animation variants for the popup
  const popupVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.5,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      },
    },
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black z-50 md:z-40"
            onClick={onClose}
          />

          {/* Search Popup */}
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              bg-white rounded-2xl shadow-2xl z-50
              w-[90vw] max-w-[500px] sm:w-[70vw] md:w-[50vw] lg:w-[40vw]
              p-4 sm:p-6 md:p-8
            "
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="
                  absolute top-0 right-0 p-2 text-gray-600 
                  hover:text-[#800000] transition-all duration-300
                  rounded-full hover:bg-gray-100
                "
                aria-label="Close search"
              >
                <X size={20} className="transform hover:scale-110 transition-transform duration-300" />
              </button>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <motion.input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="
                      w-full p-3 pr-10 text-sm sm:text-base 
                      border-b-2 border-gray-200 
                      focus:border-[#800000] outline-none
                      transition-all duration-300
                      placeholder:text-gray-400
                    "
                    initial={{ width: '80%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                  <Search
                    size={20}
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      text-gray-400 group-hover:text-[#800000]
                      transition-colors duration-300
                    "
                  />
                </div>
                <motion.button
                  type="submit"
                  className="
                    bg-[#800000] text-white px-4 py-2 sm:px-6 sm:py-3 
                    rounded-lg font-semibold text-sm sm:text-base
                    uppercase tracking-wide
                    hover:bg-[#600000] transition-all duration-300
                    transform hover:scale-105 active:scale-95
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </form>

              {/* Search Suggestions (Optional) */}
              <div className="mt-4 sm:mt-6 space-y-2">
                <p className="text-xs sm:text-sm text-gray-500">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Bridal Jutti', 'Casual Jutti', 'Festive Collection'].map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setSearchQuery(item);
                        handleSearch({ preventDefault: () => {} });
                      }}
                      className="
                        px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm
                        bg-gray-100 text-gray-700 rounded-full
                        hover:bg-[#800000] hover:text-white
                        transition-all duration-300
                      "
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;