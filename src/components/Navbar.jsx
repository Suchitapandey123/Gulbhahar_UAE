"use client";

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const logo='/logo.svg'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const pathname = usePathname();


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
    <nav className={`fixed  w-full z-50 transition-all duration-200  ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="lg:max-w-[1449px] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12 md:h-20 overflow-hidden">
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

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/collection"
              className="relative text-gray-800 text-lg uppercase tracking-wider transition-colors font-raleway"
            >
              Collection
              {pathname === '/collection' && (
                <span className="absolute left-[30%] bottom-0 text-center w-[30px] h-0.5 bg-customRed transition-all duration-200" />
              )}
            </Link>
            <Link
              href="/about"
              className="relative text-gray-800  uppercase tracking-wider transition-colors font-raleway text-lg"
            >
              About
              {pathname === '/about' && (
               <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300 lg:w-[30px] lg:ml-4" />
              )}
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl text-gray-900 hover:opacity-80 transition-opacity"
            >
              <Image
                src={logo || null}
                alt="Logo"
                width={413}
                height={89}
                priority
                className='w-full h-full'
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="relative text-gray-800 text-lg uppercase tracking-wider transition-colors font-raleway"
            >
              Search
              {pathname === '/search' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300 lg:w-[30px] lg:ml-6" />
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-800 text-lg uppercase tracking-wider transition-colors font-raleway"
            >
              Cart
              {pathname === '/cart'  && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300 lg:w-[30px] lg:ml-3" />
              )}
              {pathname === '/cart/checkout'  && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300 lg:w-[30px] lg:ml-3" />
              )}
              {pathname === '/cart/checkout/payment'  && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300 lg:w-[30px] lg:ml-3" />
              )}
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Link
              href="/search"
              className="relative text-gray-800 font-raleway text-sm uppercase"
              onClick={closeMenu}
            >
              SEARCH
              {pathname === '/search' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-800 font-raleway text-sm uppercase"
              onClick={closeMenu}
            >
              CART
              {pathname === '/cart' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-48 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-2 space-y-1 bg-white">
            <Link
              href="/"
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors font-raleway"
              onClick={closeMenu}
            >
              home
              {pathname === '/' && (
                <span className="absolute left-4 bottom-1 w-16 h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/collection"
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors font-raleway"
              onClick={closeMenu}
            >
              Collection
              {pathname === '/collection' && (
                <span className="absolute left-4 bottom-1 w-16 h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/about"
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors font-raleway
              "
              onClick={closeMenu}
            >
              About
              {pathname === '/about' && (
                <span className="absolute left-4 bottom-1 w-16 h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}