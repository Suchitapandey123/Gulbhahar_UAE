"use client";
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
         
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/collection"
                className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
              >
                Collection
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
              >
                About
              </Link>
            </motion.div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="text-2xl md:text-3xl font-serif text-gray-900 hover:text-red-500 hover:opacity-80 transition-opacity"
              >
                GULBHAHAR
              </Link>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="/search"
                className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
              >
                <span className="flex items-center gap-1">Search</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/cart"
                className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
              >
                <span className="flex items-center gap-1">Cart</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex md:hidden items-center space-x-4">
            <Link
              href="/search"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Search"
              onClick={closeMenu}
            >
              Search
            </Link>
            <Link
              href="/cart"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Cart"
              onClick={closeMenu}
            >
              Cart
            </Link>
          </div>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4 space-y-2 bg-white">
            <Link
              href="/collection"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
              onClick={closeMenu}
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
              onClick={closeMenu}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
