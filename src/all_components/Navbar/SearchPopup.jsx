'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { debouncedSearch } from '../../utils/debounce'; 
import Link from 'next/link';

const SearchPopup = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCollections, setFilteredCollections] = useState([]); 
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  // Helper function to format slug to title
  const formatSlugToTitle = (slug) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Popular searches
  const popularSearches = [
    { id: 'saree-1', title: 'Saree', slug: '/collections/saree' },
    { id: 'juttis-1', title: 'Juttis', slug: '/collections/juttis' },
    { id: 'lehenga-1', title: 'Lehenga', slug: '/collections/lehenga' },
    { id: 'salwar-1', title: 'Salwar Suit', slug: '/collections/salwar-suit' },
    { id: 'banarasi-1', title: 'Banarasi Saree', slug: '/collections/banarasi-saree' },
    { id: 'silk-1', title: 'Silk Saree', slug: '/collections/silk-saree' },
  ];

  // Recent searches
  const [recentSearches, setRecentSearches] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save recent search
  const saveRecentSearch = (searchText) => {
    if (!searchText.trim()) return;
    
    const updated = [
      { id: Date.now(), title: searchText, type: 'recent' },
      ...recentSearches.filter(s => s.title !== searchText)
    ].slice(0, 5);
    
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

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
    
    if (value.trim().length === 0) {
      setFilteredCollections([]);
      setSuggestions([]);
      setShowSuggestions(true);
      return;
    }
    
    // Show instant suggestions
    generateInstantSuggestions(value);
    
    // Still do debounced search for actual results
    performSearch(value);
  };

  // Generate instant suggestions
  const generateInstantSuggestions = (query) => {
    const queryLower = query.toLowerCase();
    
    // Filter popular searches that match
    const popularMatches = popularSearches.filter(item =>
      item.title.toLowerCase().includes(queryLower)
    ).slice(0, 3);
    
    // Filter recent searches that match
    const recentMatches = recentSearches.filter(item =>
      item.title.toLowerCase().includes(queryLower)
    ).slice(0, 3);
    
    // Generate predictive suggestions
    const predictiveSuggestions = [];
    
    if (queryLower === 's') {
      predictiveSuggestions.push(
        { id: 'pred-saree', title: 'Saree', type: 'prediction', icon: '🔍' },
        { id: 'pred-silk', title: 'Silk Saree', type: 'prediction', icon: '🔍' },
        { id: 'pred-salwar', title: 'Salwar', type: 'prediction', icon: '🔍' }
      );
    } else if (queryLower === 'j') {
      predictiveSuggestions.push(
        { id: 'pred-juttis', title: 'Juttis', type: 'prediction', icon: '🔍' },
        { id: 'pred-jewelry', title: 'Jewelry', type: 'prediction', icon: '🔍' },
        { id: 'pred-jute', title: 'Jute Saree', type: 'prediction', icon: '🔍' }
      );
    }
    
    // Combine all suggestions
    const allSuggestions = [
      ...recentMatches.map(item => ({ ...item, type: 'recent', icon: '🕒' })),
      ...popularMatches.map(item => ({ ...item, type: 'popular', icon: '📈' })),
      ...predictiveSuggestions
    ];
    
    setSuggestions(allSuggestions.slice(0, 6));
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredCollections([]);
    setSuggestions([]);
    setShowSuggestions(true);
  };

  // Handle clicking on a suggestion
  const handleSuggestionClick = (suggestion) => {
    // console.log('Suggestion clicked:', suggestion);
    setSearchTerm(suggestion.title);
    saveRecentSearch(suggestion.title);
    
    if (suggestion.slug) {
      window.location.href = suggestion.slug;
      onClose();
    } else {
      performSearch(suggestion.title);
      setShowSuggestions(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm);
      setShowSuggestions(false);
      performSearch(searchTerm);
    }
  };

  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length === 0) {
      setFilteredCollections([]);
      return;
    }

    setLoading(true);
    try {
      const response = await debouncedSearch(query);
      
      let collections = [];
      
      if (response.success && Array.isArray(response.data)) {
        collections = response.data;
      } else if (Array.isArray(response)) {
        collections = response;
      }
      
      // Transform for display with proper URLs
      const transformedCollections = collections.map((item, index) => {
        let slugValue = '';
        
        if (item.slug) {
          if (item.slug.startsWith('http') || item.slug.startsWith('/')) {
            slugValue = item.slug;
          } else {
            slugValue = `/collections/${item.slug}`;
          }
        } else if (item.fullSlug) {
          slugValue = item.fullSlug;
        } else if (item.value) {
          slugValue = `/collections/${item.value}`;
        }
        
        return {
          id: item.slug || item.id || `item-${Date.now()}-${index}`,
          title: item.title || 
                 (item.slug && formatSlugToTitle(item.slug)) || 
                 item.label || 
                 'Untitled',
          slug: slugValue,
          original: item
        };
      });
      
      setFilteredCollections(transformedCollections);
      setShowSuggestions(false);
      
    } catch (error) {
      console.error('❌ Search error:', error);
      setFilteredCollections([]);
    } finally {
      setLoading(false);
    }
  }, [formatSlugToTitle]);

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

  // Animation variants
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.7, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.7, y: -50 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 z-[1000] min-h-[100dvh] flex items-center justify-center"
            onClick={onClose}
          >
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
                <motion.button
                  onClick={onClose}
                  className="
                    absolute top-[-8] right-0 text-gray-600 z-10
                    hover:text-[#800000] transition-all duration-300
                    rounded-full hover:bg-gray-100
                  "
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} className="transform transition-transform duration-300" />
                </motion.button>

                {/* Search Input with Form */}
                <form onSubmit={handleSubmit}>
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
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#800000]"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </form>

                {/* INSTANT SUGGESTIONS */}
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    className="px-4 sm:px-6 pb-4"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <h4 className="text-xs font-medium text-gray-500 mb-2">Suggestions</h4>
                    <div className="space-y-1">
                      {suggestions.map((suggestion) => (
                        <motion.div
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="
                            w-full flex items-center gap-3 px-3 py-2 
                            text-left text-gray-700 hover:bg-gray-100 
                            rounded-lg transition-colors duration-200
                            cursor-pointer
                          "
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSuggestionClick(suggestion);
                            }
                          }}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-gray-400">
                            {suggestion.icon === '🕒' && <Clock size={14} />}
                            {suggestion.icon === '📈' && <TrendingUp size={14} />}
                            {suggestion.icon === '🔍' && <Search size={14} />}
                          </span>
                          <span className="flex-1 text-sm">{suggestion.title}</span>
                          <span className="text-xs text-gray-400">
                            {suggestion.type === 'recent' && 'Recent'}
                            {suggestion.type === 'popular' && 'Popular'}
                            {suggestion.type === 'prediction' && 'Try'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* POPULAR SEARCHES */}
                {showSuggestions && searchTerm.length === 0 && (
                  <motion.div 
                    className="px-4 sm:px-6 pb-4"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={16} className="text-gray-500" />
                      <h4 className="text-sm font-semibold text-gray-700">Popular Searches</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((item) => (
                        <Link
                          key={item.id}
                          href={item.slug}
                          onClick={onClose}
                          className="inline-block no-underline"
                        >
                          <motion.div
                            className="
                              px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700
                              hover:bg-[#800000] hover:text-white transition-all duration-300
                              cursor-pointer
                            "
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.title}
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* RECENT SEARCHES - FIXED SECTION */}
                {showSuggestions && recentSearches.length > 0 && searchTerm.length === 0 && (
                  <motion.div 
                    className="px-4 sm:px-6 pb-4"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={16} className="text-gray-500" />
                      <h4 className="text-sm font-semibold text-gray-700">Recent Searches</h4>
                      <button 
                        onClick={() => {
                          setRecentSearches([]);
                          localStorage.removeItem('recentSearches');
                        }}
                        className="ml-auto text-xs text-gray-500 hover:text-[#800000]"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search) => (
                        <div
                          key={search.id}
                          onClick={() => {
                            setSearchTerm(search.title);
                            performSearch(search.title);
                            setShowSuggestions(false);
                          }}
                          className="
                            w-full flex items-center gap-3 px-3 py-2 
                            text-left text-gray-700 hover:bg-gray-100 
                            rounded-lg transition-colors duration-200
                            cursor-pointer group
                          "
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSearchTerm(search.title);
                              performSearch(search.title);
                              setShowSuggestions(false);
                            }
                          }}
                        >
                          <Clock size={14} className="text-gray-400" />
                          <span className="flex-1 text-sm">{search.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = recentSearches.filter(s => s.id !== search.id);
                              setRecentSearches(updated);
                              localStorage.setItem('recentSearches', JSON.stringify(updated));
                            }}
                            className="
                              opacity-0 group-hover:opacity-100 
                              text-gray-400 hover:text-red-500
                              p-1 rounded-full hover:bg-gray-200
                              transition-opacity duration-200
                            "
                            aria-label={`Remove ${search.title} from recent searches`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ACTUAL SEARCH RESULTS */}
                {!showSuggestions && (
                  <motion.div 
                    className="px-4 sm:px-6 pb-4 sm:pb-6"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {searchTerm ? `Search Results for "${searchTerm}"` : 'Browse Our Collections'}
                      </h3>
                      <button
                        onClick={() => setShowSuggestions(true)}
                        className="text-xs text-gray-500 hover:text-[#800000]"
                      >
                        Back to suggestions
                      </button>
                    </div>
                    
                    {loading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000]"></div>
                      </div>
                    ) : filteredCollections.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {filteredCollections.map((collection, index) => (
                          <Link
                            key={collection.id || collection.slug || index}
                            href={collection.slug}
                            onClick={onClose}
                            className="inline-block no-underline"
                          >
                            <motion.div
                              className="
                                px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700
                                hover:bg-[#800000] hover:text-white transition-all duration-300
                                cursor-pointer
                              "
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {collection.title}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    ) : searchTerm && !loading ? (
                      <div className="text-center py-6">
                        <p className="text-gray-500 text-sm mb-2">
                          No collections found for "{searchTerm}"
                        </p>
                        <p className="text-gray-400 text-xs">
                          Try a different search term
                        </p>
                      </div>
                    ) : null}
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