// "use client";

// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
//     }`}>
//       <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20  md:h-20">
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-md"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>

//           <div className="hidden md:flex items-center space-x-8 ">
//             <Link
//               href="/collection"
//               className="text-gray-800  text-sm uppercase tracking-wider transition-colors font-raleway"
//             >
//               Collection
//             </Link>
//             <Link
//               href="/about"
//               className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors font-raleway"
//             >
//               About
//             </Link>
//           </div>
//           <div className="flex-1 flex items-center justify-center">
//             <Link
//               href="/"
//               className="text-2xl md:text-3xl  text-gray-900 hover:opacity-80 transition-opacity"
//             >
//               <Image
//                 src="/logo.svg"
//                 alt="Logo"
//                 width={413}
//                 height={89}
//                 priority
//               />
//             </Link>
//           </div>
//           <div className="hidden md:flex items-center space-x-8">
//             <Link
//               href="/search"
//               className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors font-raleway"
//             >
//               Search
//             </Link>
//             <Link
//               href="/cart"
//               className="text-gray-800 hover:text-gray-600 text-sm uppercase tracking-wider transition-colors font-raleway"
//             >
//               Cart
//             </Link>
//           </div>

//           <div className="flex md:hidden items-center space-x-4">
//             <Link
//               href="/search"
//               className="text-gray-800 font-raleway hover:text-gray-600 text-sm uppercase"
//               onClick={closeMenu}
//             >
//               SEARCH
//             </Link>
//             <Link
//               href="/cart"
//               className="text-gray-800 font-raleway hover:text-gray-600 text-sm uppercase"
//               onClick={closeMenu}
//             >
//               CART
//             </Link>
//           </div>
//         </div>

//         <div
//           className={`md:hidden transition-all duration-300 ease-in-out ${
//             isMenuOpen
//               ? 'max-h-48 opacity-100'
//               : 'max-h-0 opacity-0 pointer-events-none'
//           }`}
//         >
//           <div className="py-2 space-y-1 bg-white">
//           <Link
//               href="/"
//               className="block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
//               onClick={closeMenu}
//             >
//               home
//             </Link>
//             <Link
//               href="/collection"
//               className="block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
//               onClick={closeMenu}
//             >
//               Collection
//             </Link>
//             <Link
//               href="/about"
//               className="block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
//               onClick={closeMenu}
//             >
//               About
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-20">
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
              className="relative text-gray-800 text-sm uppercase tracking-wider transition-colors font-raleway"
            >
              Collection
              {pathname === '/collection' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/about"
              className="relative text-gray-800 text-sm uppercase tracking-wider transition-colors font-raleway"
            >
              About
              {pathname === '/about' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl text-gray-900 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={413}
                height={89}
                priority
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="relative text-gray-800 text-sm uppercase tracking-wider transition-colors font-raleway"
            >
              Search
              {pathname === '/search' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-800 text-sm uppercase tracking-wider transition-colors font-raleway"
            >
              Cart
              {pathname === '/cart' && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-customRed transition-all duration-300" />
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
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
              onClick={closeMenu}
            >
              home
              {pathname === '/' && (
                <span className="absolute left-4 bottom-1 w-16 h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/collection"
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
              onClick={closeMenu}
            >
              Collection
              {pathname === '/collection' && (
                <span className="absolute left-4 bottom-1 w-16 h-0.5 bg-customRed transition-all duration-300" />
              )}
            </Link>
            <Link
              href="/about"
              className="relative block px-4 py-2 text-gray-800 hover:bg-gray-50 text-sm uppercase tracking-wider transition-colors"
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