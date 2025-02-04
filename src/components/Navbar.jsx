'use client';

import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/collection"
              className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Link 
              href="/" 
              className="text-2xl md:text-3xl font-serif text-gray-900 hover:opacity-80 transition-opacity"
            >
              GULBHAHAR
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
            >
              <span className="flex items-center gap-1">
                Search
              </span>
            </Link>
            <Link
              href="/cart"
              className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors"
            >
              <span className="flex items-center gap-1">
                Cart
              </span>
            </Link>
          </div>
          <div className="flex md:hidden items-center space-x-4">
            <Link
              href="/search"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="text-gray-800 hover:text-gray-600"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4 space-y-2 bg-white">
            <Link
              href="/collection"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}