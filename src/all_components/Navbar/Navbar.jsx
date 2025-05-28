'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, ShoppingBag, User, LogOut, Settings, Package } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import SearchPopup from './SearchPopup';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [cartCount, setCartCount] = useState(3); // Dynamic cart count (replace with context/store)

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Optimized scroll handler with debouncing
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      setIsScrolled(lastScrollY > 10);
    };

    const debouncedScroll = () => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => handleScroll(), 50);
      };
    };

    window.addEventListener('scroll', debouncedScroll(), { passive: true });
    return () => window.removeEventListener('scroll', debouncedScroll());
  }, []);

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCollectionDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      setIsCollectionDropdownOpen(false);
      setIsSearchOpen(false);
      setIsUserDropdownOpen(false);
    }
  };

  const toggleCollectionDropdown = () => {
    setIsCollectionDropdownOpen((prev) => !prev);
  };

  const toggleSearchPopup = () => {
    setIsSearchOpen((prev) => !prev);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUser({ name: '', email: '' });
    setIsUserDropdownOpen(false);
    router.push('/');
  };

  const handleCollectionClick = (e) => {
    e.preventDefault();
    toggleCollectionDropdown();
  };

  const handleCategoryClick = (category) => {
    router.push(`/Collections?category=${encodeURIComponent(category)}`);
    setIsCollectionDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const NavLink = ({ href, children, hasDropdown = false, className = '' }) => {
    const isActive = pathname === href || (hasDropdown && pathname.startsWith('/Collections'));

    return (
      <div className={`relative group ${className}`} ref={hasDropdown ? dropdownRef : null}>
        <Link
          href={href}
          className={`
            relative flex items-center px-3 lg:px-4 py-2 font-semibold text-xs sm:text-sm 
            uppercase tracking-wide transition-all duration-300 ease-out
            ${isActive
              ? 'text-[#800000] scale-105'
              : 'text-gray-800 hover:text-[#800000] hover:scale-105'
            }
          `}
          onClick={hasDropdown ? handleCollectionClick : undefined}
          aria-expanded={hasDropdown ? isCollectionDropdownOpen : undefined}
          aria-label={hasDropdown ? 'Collections menu' : children}
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
          <div
            className={`
              absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#800000] 
              transition-all duration-300 ease-out
              ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
            `}
          />
        </Link>
      </div>
    );
  };

  const collectionCategories = [
    {
      title: 'Bridal Jutti',
      subtitle: 'Wedding Elegance',
      items: ['Heavy Embroidered Gold Work', 'Pearl Embellished', 'Mirror Work', 'Wedding Special Sets'],
    },
    {
      title: 'Casual Juttis',
      subtitle: 'Everyday Comfort',
      items: ['Minimalist Designs', 'Comfortable Daily Wear', 'Light Embroidery', 'Versatile Styles'],
    },
    {
      title: 'Festive Collection',
      subtitle: 'Celebration Ready',
      items: ['Vibrant Festival Colors', 'Traditional Patterns', 'Statement Pieces', 'Cultural Designs'],
    },
    {
      title: 'Designer Collection',
      subtitle: 'Luxury Edition',
      items: ['Limited Edition', 'Premium Materials', 'Artistic Designs', 'Exclusive Craftsmanship'],
    },
  ];

  const userMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Package, label: 'My Orders', href: '/orders' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      <SearchPopup isOpen={isSearchOpen} onClose={toggleSearchPopup} />

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out opacity-100 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md
          transition-all duration-500 ease-out border-b border-gray-100/50
          ${isScrolled ? 'shadow-lg py-2 lg:py-3' : 'shadow-sm py-3 lg:py-4'}
          supports-[padding-top:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]
        `}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-800 hover:text-[#800000] transition-colors duration-200 
                         focus:outline-none focus:ring-2 focus:ring-[#800000] rounded"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              <NavLink href="/Collections" hasDropdown={true}>
                Collections
              </NavLink>
              <NavLink href="/about">About</NavLink>
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
                aria-label="Search"
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
                aria-label={`Cart with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag size={16} className="group-hover:scale-110 transition-transform duration-300" />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 w-4 h-4 bg-[#800000] text-white 
                                 text-xs rounded-full flex items-center justify-center font-bold
                                 animate-pulse"
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline">Cart</span>
              </Link>

              {isLoggedIn ? (
                <div className="relative" ref={userDropdownRef}>
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
                    aria-label="User menu"
                    aria-expanded={isUserDropdownOpen}
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

                  <div
                    className={`
                      absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md shadow-2xl 
                      rounded-lg border border-gray-100 z-50 transition-all duration-300 ease-out
                      ${isUserDropdownOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }
                    `}
                    role="menu"
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>

                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-800 
                                   hover:text-[#800000] hover:bg-[#800000]/5 transition-all duration-200"
                          onClick={() => setIsUserDropdownOpen(false)}
                          role="menuitem"
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
                        role="menuitem"
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
                  aria-label="Login"
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
                         transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {isLoggedIn ? (
                <button
                  onClick={toggleUserDropdown}
                  className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                           transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  aria-label="User menu"
                  aria-expanded={isUserDropdownOpen}
                >
                  <User size={20} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                           transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  aria-label="Login"
                >
                  <User size={20} />
                </button>
              )}

              <Link
                href="/cart"
                className="p-2 text-gray-800 hover:text-[#800000] transition-all duration-300 
                         relative transform hover:scale-110 active:scale-95"
                aria-label={`Cart with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 bg-[#800000] text-white text-xs 
                               rounded-full flex items-center justify-center font-bold animate-pulse"
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
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
              md:mt-2
            `}
            role="menu"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 overflow-y-auto max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)]">
              <div className="mb-6">
                <Link
                  href="/Collections"
                  onClick={() => {
                    setIsCollectionDropdownOpen(false);
                    setIsMenuOpen(false);
                  }}
                  className="inline-block px-6 py-3 bg-[#800000] text-white font-semibold rounded-lg
                             hover:bg-[#600000] transition-colors duration-300 text-sm lg:text-base"
                  role="menuitem"
                >
                  View All Collections
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {collectionCategories.map((category, index) => (
                  <div
                    key={index}
                    className="group space-y-3 lg:space-y-4 cursor-pointer 
                             transform transition-all duration-400 ease-out
                             hover:scale-105 hover:-translate-y-1 p-4 rounded-lg
                             hover:bg-gray-50/50"
                    onClick={() => handleCategoryClick(category.title)}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCategoryClick(category.title);
                      }
                    }}
                  >
                    <div className="space-y-2">
                      <h3
                        className="font-bold text-gray-900 text-base lg:text-lg 
                                   group-hover:text-[#800000] transition-colors duration-300"
                      >
                        {category.title}
                      </h3>
                      <p
                        className="text-xs lg:text-sm text-gray-500 group-hover:text-[#800000]/70 
                                  transition-colors duration-300"
                      >
                        {category.subtitle}
                      </p>
                    </div>

                    <div
                      className="h-px bg-gradient-to-r from-gray-200 to-transparent 
                                  group-hover:from-[#800000] group-hover:to-[#800000]/20 
                                  transition-all duration-300"
                    />

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
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleCategoryClick(`${category.title} ${item}`);
                              }
                            }}
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
          supports-[padding-top:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]
          supports-[padding-bottom:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
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
                       rounded-full hover:bg-gray-100 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#800000]"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {isLoggedIn && (
                <div className="pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
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
                                 hover:text-[#800000] hover:bg-[#800000]/5 rounded-lg transition-all duration-200
                                 focus:outline-none focus:ring-2 focus:ring-[#800000]"
                        role="menuitem"
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
                  onClick={toggleCollectionDropdown}
                  className={`
                    flex items-center justify-between w-full p-3 text-left font-semibold 
                    text-base sm:text-lg transition-all duration-300 rounded-lg
                    hover:bg-gray-50 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#800000]
                    ${pathname.startsWith('/Collections')
                      ? 'text-[#800000] bg-[#800000]/5'
                      : 'text-gray-800 hover:text-[#800000]'
                    }
                  `}
                  aria-label="Collections menu"
                  aria-expanded={isCollectionDropdownOpen}
                >
                  <span>Collections</span>
                  <ChevronDown
                    size={18}
                    className={`transition-all duration-400 ease-out ${
                      isCollectionDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`
                    w-full bg-white/95 backdrop-blur-md shadow-xl z-50 
                    transition-all duration-500 ease-out
                    ${isCollectionDropdownOpen
                      ? 'opacity-100 visible translate-y-0 max-h-[calc(100vh-4rem)] overflow-y-auto'
                      : 'opacity-0 invisible -translate-y-4 max-h-0 pointer-events-none'
                    }
                  `}
                  role="menu"
                >
                  <div className="px-4 sm:px-6 py-6">
                    <div className="mb-6">
                      <Link
                        href="/Collections"
                        onClick={() => {
                          setIsCollectionDropdownOpen(false);
                          toggleMenu();
                        }}
                        className="inline-block px-6 py-3 bg-[#800000] text-white font-semibold rounded-lg
                                   hover:bg-[#600000] transition-colors duration-300 text-sm"
                        role="menuitem"
                      >
                        View All Collections
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {collectionCategories.map((category, index) => (
                        <div
                          key={index}
                          className="group space-y-3 cursor-pointer 
                                   transform transition-all duration-400 ease-out
                                   hover:scale-105 hover:-translate-y-1 p-4 rounded-lg
                                   hover:bg-gray-50/50"
                          onClick={() => {
                            handleCategoryClick(category.title);
                            toggleMenu();
                          }}
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleCategoryClick(category.title);
                              toggleMenu();
                            }
                          }}
                        >
                          <div className="space-y-2">
                            <h3
                              className="font-bold text-gray-900 text-base 
                                       group-hover:text-[#800000] transition-colors duration-300"
                            >
                              {category.title}
                            </h3>
                            <p
                              className="text-xs text-gray-500 group-hover:text-[#800000]/70 
                                        transition-colors duration-300"
                            >
                              {category.subtitle}
                            </p>
                          </div>

                          <div
                            className="h-px bg-gradient-to-r from-gray-200 to-transparent 
                                      group-hover:from-[#800000] group-hover:to-[#800000]/20 
                                      transition-all duration-300"
                          />

                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryClick(`${category.title} ${item}`);
                                    toggleMenu();
                                  }}
                                  className="text-gray-600 hover:text-[#800000] transition-all duration-300 
                                           cursor-pointer text-xs font-medium 
                                           transform hover:translate-x-2 hover:font-semibold
                                           py-1 px-2 rounded hover:bg-[#800000]/5"
                                  role="menuitem"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      handleCategoryClick(`${category.title} ${item}`);
                                      toggleMenu();
                                    }
                                  }}
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
                        focus:outline-none focus:ring-2 focus:ring-[#800000]
                        ${isActive || (item === 'Search' && isSearchOpen)
                          ? 'text-[#800000] bg-[#800000]/5'
                          : 'text-gray-800 hover:text-[#800000]'
                        }
                      `}
                      aria-label={item}
                    >
                      {item}
                    </button>
                  );
                })}

                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-3 w-full p-3 text-left font-semibold 
                             text-base sm:text-lg text-red-600 hover:text-red-700 
                             hover:bg-red-50 rounded-lg transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    aria-label="Logout"
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
                             hover:bg-[#800000]/5 rounded-lg transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    aria-label="Login"
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