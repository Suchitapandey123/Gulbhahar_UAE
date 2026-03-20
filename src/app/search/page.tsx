// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
     
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12"
        >
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Search Products
            </h1>
            <p className="text-gray-600">Find your perfect Jutti</p>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, categories..."
                className="w-full p-4 pr-12 text-base border-2 border-gray-200 rounded-lg focus:border-[#800000] outline-none transition-all duration-300 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#800000] text-white p-2 rounded-lg hover:bg-[#600000] transition-all duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <div className="space-y-3">
            <p className="text-sm text-gray-500 font-medium">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['Bridal Jutti', 'Casual Jutti', 'Festive Collection', 'Wedding Shoes', 'Punjabi Jutti'].map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSearchQuery(item)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-[#800000] hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <p className="text-gray-500 text-center">
              Enter a search term to find products
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
