'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, ShoppingBag, User, LogOut, Settings, Package, Eye } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchPopup from './SearchPopup'; // Import the new SearchPopup component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [isHoverMode, setIsHoverMode] = useState(true); // Track if we're in hover mode or click mode
  
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const userHoverTimeoutRef = useRef(null);

  // Simulate user authentication check on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    };

    checkAuthStatus();
  }, []);

  // Smooth scroll detection with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCollectionDropdownOpen(false);
        setIsHoverMode(true); // Reset to hover mode when clicking outside
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsCollectionDropdownOpen(false);
      setIsMobileCollectionOpen(false);
      setIsSearchOpen(false);
      setIsUserDropdownOpen(false);
      setIsHoverMode(true); // Reset to hover mode when opening mobile menu
    }
  };

  const toggleMobileCollection = () => {
    setIsMobileCollectionOpen(!isMobileCollectionOpen);
  };

  const toggleSearchPopup = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Handle login
  const handleLogin = () => {
    router.push('/login');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setIsUserDropdownOpen(false);
    router.push('/');
  };

  // Enhanced Collections click handler
  const handleCollectionClick = (e) => {
    e.preventDefault();
    if (window.innerWidth >= 768) {
      // Toggle between hover mode and click mode
      if (isHoverMode) {
        // Switch to click mode and show dropdown
        setIsHoverMode(false);
        setIsCollectionDropdownOpen(true);
      } else {
        // Toggle dropdown in click mode
        setIsCollectionDropdownOpen(!isCollectionDropdownOpen);
      }
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/collections/`);
    setIsCollectionDropdownOpen(false);
    setIsMobileCollectionOpen(false);
    setIsMenuOpen(false);
    setIsHoverMode(true); // Reset to hover mode after navigation
  };

  // View All Collections handler
  const handleViewAllCollections = (e) => {
    console.log('handleViewAllCollections called'); // Debug log
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      console.log('Attempting to navigate to /collections');
      router.push('/collections');
      console.log('Router.push called successfully');
    } catch (error) {
      console.error('Router.push failed:', error);
    }
    
    setIsCollectionDropdownOpen(false);
    setIsMobileCollectionOpen(false);
    setIsMenuOpen(false);
    setIsHoverMode(true);
  };

  // Enhanced hover handlers for collections dropdown
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && isHoverMode) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      setIsCollectionDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && isHoverMode) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsCollectionDropdownOpen(false);
      }, 150);
    }
  };

  // Hover handlers for user dropdown
  const handleUserMouseEnter = () => {
    if (window.innerWidth >= 768 && isLoggedIn) {
      if (userHoverTimeoutRef.current) {
        clearTimeout(userHoverTimeoutRef.current);
      }
      setIsUserDropdownOpen(true);
    }
  };

  const handleUserMouseLeave = () => {
    if (window.innerWidth >= 768 && isLoggedIn) {
      userHoverTimeoutRef.current = setTimeout(() => {
        setIsUserDropdownOpen(false);
      }, 150);
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (userHoverTimeoutRef.current) {
        clearTimeout(userHoverTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced NavLink component
  const NavLink = ({ href, children, hasDropdown = false, className = "" }) => {
    const isActive = pathname === href || (hasDropdown && pathname.startsWith('/collections'));
    
    return (
      <div 
        className={`relative group ${className}`} 
        ref={hasDropdown ? dropdownRef : null}
        onMouseEnter={hasDropdown ? handleMouseEnter : undefined}
        onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
      >
        <button 
          className={`
            relative flex items-center px-3 lg:px-4 py-2 font-semibold text-xs sm:text-sm 
            uppercase tracking-wide transition-all duration-300 ease-out
            ${isActive 
              ? 'text-[#800000] scale-105' 
              : 'text-gray-800 hover:text-[#800000] hover:scale-105'
            }
          `}
          onClick={hasDropdown ? handleCollectionClick : () => router.push(href)}
        >
          <span className="relative z-10 flex items-center">
            {children}
            {hasDropdown && (
              <ChevronDown 
                size={14} 
                className={`ml-1 lg:ml-2 transition-all duration-300 ease-out ${
                  isCollectionDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            )}
          </span>
          
          <div className={`
            absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#800000] 
            transition-all duration-300 ease-out
            ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
          `}></div>
        </button>
      </div>
    );
  };

  // Collection categories
  const collectionCategories = [
    {
      title: "Bridal Jutti",
      subtitle: "Wedding Elegance",
      items: [
        "Heavy Embroidered Gold Work",
        "Pearl Embellished",
        "Mirror Work",
        "Wedding Special Sets"
      ]
    },
    {
      title: "Casual Juttis",
      subtitle: "Everyday Comfort",
      items: [
        "Minimalist Designs",
        "Comfortable Daily Wear",
        "Light Embroidery",
        "Versatile Styles"
      ]
    },
    {
      title: "Festive Collection",
      subtitle: "Celebration Ready",
      items: [
        "Vibrant Festival Colors",
        "Traditional Patterns",
        "Statement Pieces",
        "Cultural Designs"
      ]
    },
    {
      title: "Designer Collection",
      subtitle: "Luxury Edition",
      items: [
        "Limited Edition",
        "Premium Materials",
        "Artistic Designs",
        "Exclusive Craftsmanship"
      ]
    }
  ];

  // User menu items for logged-in users
  const userMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Package, label: 'My Orders', href: '/orders' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      {/* Search Popup */}
      <SearchPopup isOpen={isSearchOpen} onClose={toggleSearchPopup} />

      {/* Mobile backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out opacity-100 md:hidden"
          onClick={toggleMenu}
        />
      )}

      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md
          transition-all duration-500 ease-out border-b border-gray-100/50
          ${isScrolled 
            ? 'shadow-lg py-2 lg:py-3' 
            : 'shadow-sm py-3 lg:py-4'
          }
        `}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-800 hover:text-[#800000] transition-colors duration-200 
                         focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              <NavLink href="/collections" hasDropdown={true}>
                Collections
              </NavLink>
              <NavLink href="/about">
                About
              </NavLink>
            </div>

            <div className="flex-1 flex justify-center md:flex-initial">
              <Link href="/" className="group">
                <Image
                  src="/combined.png"
                  alt="Brand Logo"
                  width={240}
                  height={60}
                  priority
                  className={`
                    transition-all duration-500 ease-out object-contain
                    group-hover:scale-110 filter group-hover:brightness-110
                    group-active:scale-95
                    ${isScrolled 
                      ? 'h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]' 
                      : 'h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]'
                    }
                  `}
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              <button 
                onClick={toggleSearchPopup}
                className={`
                  flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                  uppercase tracking-wide transition-all duration-300 ease-out group
                  ${isSearchOpen || pathname === '/search'
                    ? 'text-[#800000] scale-105'
                    : 'text-gray-800 hover:text-[#800000] hover:scale-105'
                  }
                `}
              >
                <Search size={16} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="hidden lg:inline">Search</span>
              </button>

              <Link 
                href="/cart"
                className={`
                  flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                  uppercase tracking-wide transition-all duration-300 ease-out group relative
                  ${pathname === '/cart'
                    ? 'text-[#800000] scale-105'
                    : 'text-gray-800 hover:text-[#800000] hover:scale-105'
                  }
                `}
              >
                <div className="relative">
                  <ShoppingBag size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-[#800000] text-white 
                                 text-xs rounded-full flex items-center justify-center font-bold
                                 animate-pulse">
                    3
                  </span>
                </div>
                <span className="hidden lg:inline">Cart</span>
              </Link>

              {/* User Account Section */}
              {isLoggedIn ? (
                <div 
                  className="relative"
                  ref={userDropdownRef}
                  onMouseEnter={handleUserMouseEnter}
                  onMouseLeave={handleUserMouseLeave}
                >
                  <button
                    onClick={toggleUserDropdown}
                    className={`
                      flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                      uppercase tracking-wide transition-all duration-300 ease-out group
                      ${isUserDropdownOpen || pathname.startsWith('/profile') || pathname.startsWith('/orders') || pathname.startsWith('/settings')
                        ? 'text-[#800000] scale-105'
                        : 'text-gray-800 hover:text-[#800000] hover:scale-105'
                      }
                    `}
                  >
                    <User size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden lg:inline">{user.name || 'Account'}</span>
                    <ChevronDown 
                      size={12} 
                      className={`ml-1 transition-all duration-300 ease-out ${
                        isUserDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  <div 
                    className={`
                      absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md shadow-2xl 
                      rounded-lg border border-gray-100 z-50 transition-all duration-300 ease-out
                      ${isUserDropdownOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }
                    `}
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-800 
                                   hover:text-[#800000] hover:bg-[#800000]/5 transition-all duration-200"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      
                      <hr className="my-2 border-gray-100" />
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 
                                 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className={`
                    flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                    uppercase tracking-wide transition-all duration-300 ease-out group
                    text-gray-800 hover:text-[#800000] hover:scale-105
                  `}
                >
                  <User size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="hidden lg:inline">Login</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <button 
                onClick={toggleSearchPopup}
                className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                         transform hover:scale-110 active:scale-95"
              >
                <Search size={18} />
              </button>
              
              {/* Mobile User Account */}
              {isLoggedIn ? (
                <button
                  onClick={toggleUserDropdown}
                  className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                           transform hover:scale-110 active:scale-95"
                >
                  <User size={18} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                           transform hover:scale-110 active:scale-95"
                >
                  <User size={18} />
                </button>
              )}
              
              <Link 
                href="/cart"
                className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                         relative transform hover:scale-110 active:scale-95"
              >
                <ShoppingBag size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#800000] text-white text-xs 
                               rounded-full flex items-center justify-center font-bold animate-pulse">
                  3
                </span>
              </Link>
            </div>
          </div>

          {/* Collections Dropdown */}
          <div 
            className={`
              absolute left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl z-50 
              transition-all duration-500 ease-out border-b border-gray-100
              ${isCollectionDropdownOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-4 pointer-events-none'
              }
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8" style={{ pointerEvents: 'auto' }}>
              {/* View All Collections Button - Desktop */}
              <div className="flex justify-center mb-6" style={{ pointerEvents: 'auto' }}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Button clicked!');
                    router.push('/collections');
                    setIsCollectionDropdownOpen(false);
                    setIsHoverMode(true);
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#800000] text-white 
                           font-semibold text-sm uppercase tracking-wide rounded-lg
                           hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                           shadow-lg hover:shadow-xl cursor-pointer relative z-10"
                  style={{ pointerEvents: 'auto' }}
                >
                  <Eye size={16} />
                  <span>View All Collections</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {collectionCategories.map((category, index) => (
                  <div 
                    key={index} 
                    className={`group space-y-3 lg:space-y-4 cursor-pointer 
                             transform transition-all duration-400 ease-out
                             hover:scale-105 hover:-translate-y-1 p-4 rounded-lg
                             hover:bg-gray-50/50`}
                    onClick={() => handleCategoryClick(category.title)}
                  >
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900 text-base lg:text-lg 
                                   group-hover:text-[#800000] transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-500 group-hover:text-[#800000]/70 
                                  transition-colors duration-300">
                        {category.subtitle}
                      </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-gray-200 to-transparent 
                                  group-hover:from-[#800000] group-hover:to-[#800000]/20 
                                  transition-all duration-300"></div>

                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(`${category.title} ${item}`);
                            }}
                            className="text-gray-600 hover:text-[#800000] transition-all duration-300 
                                     cursor-pointer text-xs lg:text-sm font-medium 
                                     transform hover:translate-x-2 hover:font-semibold
                                     py-1 px-2 rounded hover:bg-[#800000]/5"
                          >
                            {item}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white shadow-xl
          transition-transform duration-300 ease-out
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
            <Image
              src="/combined.png"
              alt="Brand Logo"
              width={80}
              height={24}
              className="h-5 sm:h-6 w-auto object-contain"
            />
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-[#800000] transition-colors duration-200 
                       rounded-full hover:bg-gray-100 flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {/* User Account Section in Mobile */}
              {isLoggedIn && (
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {userMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          router.push(item.href);
                          toggleMenu();
                        }}
                        className="flex items-center space-x-3 w-full p-2 text-left text-gray-800 
                                 hover:text-[#800000] hover:bg-[#800000]/5 rounded-lg transition-all duration-200"
                      >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={toggleMobileCollection}
                  className={`
                    flex items-center justify-between w-full p-3 text-left font-semibold 
                    text-base sm:text-lg transition-all duration-300 rounded-lg
                    hover:bg-gray-50 active:scale-95
                    ${pathname.startsWith('/collections')
                      ? 'text-[#800000] bg-[#800000]/5'
                      : 'text-gray-800 hover:text-[#800000]'
                    }
                  `}
                >
                  <span>Collections</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-all duration-400 ease-out ${
                      isMobileCollectionOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div className={`
                  space-y-3 sm:space-y-4 transition-all duration-400 ease-out overflow-hidden
                  ${isMobileCollectionOpen 
                    ? 'max-h-[500px] opacity-100 translate-y-0' 
                    : 'max-h-0 opacity-0 -translate-y-2'
                  }
                `}>
                  {/* View All Collections Button - Mobile */}
                  <div className="ml-3 sm:ml-4 mb-4">
                    <button
                      type="button"
                      onClick={handleViewAllCollections}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-[#800000] text-white 
                               font-semibold text-sm uppercase tracking-wide rounded-lg
                               hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                               shadow-md hover:shadow-lg w-full justify-center cursor-pointer"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Eye size={16} />
                      <span>View All Collections</span>
                    </button>
                  </div>

                  {collectionCategories.map((category, index) => (
                    <div key={index} className="ml-3 sm:ml-4 space-y-2">
                      <div 
                        onClick={() => {
                          handleCategoryClick(category.title);
                          toggleMenu();
                        }}
                        className="font-semibold text-gray-800 hover:text-[#800000] 
                                 transition-all duration-300 cursor-pointer p-2 rounded-lg
                                 hover:bg-[#800000]/5 transform hover:translate-x-1"
                      >
                        {category.title}
                      </div>
                      <ul className="ml-3 d sm:ml-4 space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div 
                              onClick={() => {
                                handleCategoryClick(`${category.title} ${item}`);
                                toggleMenu();
                              }}
                              className="text-sm text-gray-600 hover:text-[#800000] 
                                       transition-all duration-300 cursor-pointer 
                                       transform hover:translate-x-2 p-2 rounded
                                       hover:bg-[#800000]/5"
                            >
                              • {item}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-4 border-t border-gray-100">
                {['About', 'Search', 'Cart'].map((item, index) => {
                  const href = `/${item.toLowerCase()}`;
                  const isActive = pathname === href;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (item === 'Search') {
                          toggleSearchPopup();
                        } else {
                          router.push(href);
                          toggleMenu();
                        }
                      }}
                      className={`
                        block p-3 font-semibold text-base sm:text-lg transition-all duration-300
                        transform hover:translate-x-2 rounded-lg hover:bg-gray-50 active:scale-95
                        ${isActive || (item === 'Search' && isSearchOpen)
                          ? 'text-[#800000] bg-[#800000]/5'
                          : 'text-gray-800 hover:text-[#800000]'
                        }
                      `}
                    >
                      {item}
                    </button>
                  );
                })}

                {/* Mobile Login/Logout */}
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-3 w-full p-3 text-left font-semibold 
                             text-base sm:text-lg text-red-600 hover:text-red-700 
                             hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleLogin();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-3 w-full p-3 text-left font-semibold 
                             text-base sm:text-lg text-gray-800 hover:text-[#800000] 
                             hover:bg-[#800000]/5 rounded-lg transition-all duration-300"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;