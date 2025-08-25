'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for recent searches and collections
const recentSearches = [
  "Bridal Juttis",
  "Punjabi Juttis",
  "Juttis",
  "Punjabi Juttis For Ladies",
  "Designed By Monica",
  " Juttis For Women"
];

const collectionCategories = [
  {
    title: "Designed By Monica",
    slug : "/collections"

  },
  {
    title: "Punjabi Juttis",
    slug : "/collections/punjabi-juttis"

  },
  {
    title: "Juttis",
    slug : "/collections/juttis"
  },
  {
    title: "Punjabi Juttis For Ladies",
    slug : "/collections/punjabi-juttis-for-ladies"
  }
];

const SearchPopup = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSearches, setFilteredSearches] = useState(recentSearches);
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter recent searches
    const filtered = recentSearches.filter(search => 
      search.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSearches(filtered);
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setFilteredSearches([]);
    setSearchTerm('');
  };

  // Close modal when escape key is pressed or clicking outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Utility function to create search/collection links
  const createLink = (basePath, item) => {
    return `/${"collections"}/${item.toLowerCase().replace(/\s+/g, '-')}`;
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
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: 'easeOut',
      },
    },
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
            className="fixed inset-0 bg-black/90 z-[1000] min-h-[100dvh] flex items-center justify-center"
            onClick={onClose}
          >
            {/* Search Popup */}
            <motion.div
              ref={popupRef}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                bg-white rounded-2xl shadow-2xl z-[1001]
                w-[90vw] max-w-[600px] max-h-[80vh] overflow-y-auto
                p-4 sm:p-6 box-sizing: border-box
                pt-[calc(4rem+env(safe-area-inset-top))]
                pb-[calc(1rem+env(safe-area-inset-bottom))]
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="
                    absolute top-[-8] right-0  text-gray-600 z-10
                    hover:text-[#800000] transition-all duration-300
                    rounded-full hover:bg-gray-100
                  "
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="transform transition-transform duration-300" />
                </motion.button>

                {/* Search Input */}
                <motion.div 
                  className="p-4 sm:p-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="relative">
                    <Search 
                      size={20} 
                      className="
                        absolute left-3 top-1/2 transform -translate-y-1/2 
                        text-gray-400 group-hover:text-[#800000] 
                        transition-colors duration-300
                      "
                    />
                    <motion.input
                      ref={inputRef}
                      type="text"
                      placeholder="Search for Juttis, Collections..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="
                        w-full pl-10 pr-4 py-3 text-sm sm:text-base 
                        border-b-2 border-gray-200 
                        focus:border-[#800000] outline-none
                        transition-all duration-300
                        placeholder:text-gray-400
                      "
                      initial={{ width: '80%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>

                {/*Browse Collections */}
                {filteredSearches.length > 0 && (
                  <motion.div 
                    className="px-4 sm:px-6 pb-4 sm:pb-6"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-sm font-semibold text-gray-700">Browse Our Collections</h3>
                      {/* <motion.button
                        onClick={handleClearAll}
                        className="text-sm text-[#800000] hover:underline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear All
                      </motion.button> */}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filteredSearches.map((search, index) => (
                        <motion.a
                          key={index}
                          href={createLink('collection', search)}
                          className="
                            px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700
                            hover:bg-[#800000] hover:text-white transition-all duration-300
                          "
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {search}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;