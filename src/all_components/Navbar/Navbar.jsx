"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ShoppingBag,
  User,
  LogOut,
  Settings,
  Package,
  Eye,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import SearchPopup from "./SearchPopup"; // Import the new SearchPopup component

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] =
    useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
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
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      }
    };

    checkAuthStatus();
  }, []);

  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategoryIndex((prev) => (prev === index ? null : index));
  };

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCollectionDropdownOpen(false);
        setIsHoverMode(true); // Reset to hover mode when clicking outside
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    router.push("/login");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUser({ name: "", email: "" });
    setIsUserDropdownOpen(false);
    router.push("/");
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
    console.log("handleViewAllCollections called"); // Debug log
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      console.log("Attempting to navigate to /collections");
      router.push("/collections");
      console.log("Router.push called successfully");
    } catch (error) {
      console.error("Router.push failed:", error);
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
      // Hide immediately instead of using timeout
      setIsCollectionDropdownOpen(false);
      
      // Clear any existing timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
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
    const isActive =
      pathname === href || (hasDropdown && pathname.startsWith("/collections"));

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
            ${
              isActive
                ? `${
                    isScrolled || pathname !== "/"
                      ? "text-[#800000]"
                      : "text-white"
                  } scale-105`
                : `${
                    isScrolled || pathname !== "/"
                      ? "text-gray-800 hover:text-[#800000]"
                      : "text-white/90 hover:text-white"
                  } hover:scale-105`
            }
          `}
          onClick={
            hasDropdown ? handleCollectionClick : () => router.push(href)
          }
        >
          <span className="relative z-10 flex items-center">
            {children}
            {hasDropdown && (
              <ChevronDown
                size={14}
                className={`ml-1 lg:ml-2 transition-all duration-300 ease-out ${
                  isCollectionDropdownOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </span>

          <div
            className={`
            absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ease-out
            ${isScrolled || pathname !== "/" ? "bg-[#800000]" : "bg-white"}
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
          ></div>
        </button>
      </div>
    );
  };

  // Collection categories
  const collectionCategories = [
    {
      title: "Designed By Monica",
      subtitle: "Exclusive Collection",
      items: ["Juttis", "Heels", "Purses"],
    },
    {
      title: "Casual Juttis",
      subtitle: "Everyday Comfort",
      items: [
        "Minimalist Designs",
        "Comfortable Daily Wear",
        "Light Embroidery",
        "Versatile Styles",
      ],
    },
    {
      title: "Festive Collection",
      subtitle: "Celebration Ready",
      items: [
        "Vibrant Festival Colors",
        "Traditional Patterns",
        "Statement Pieces",
        "Cultural Designs",
      ],
    },
    {
      title: "Designer Collection",
      subtitle: "Luxury Edition",
      items: [
        "Limited Edition",
        "Premium Materials",
        "Artistic Designs",
        "Exclusive Craftsmanship",
      ],
    },
  ];

  const collectionCategoriesForMobile = [
    {
      title: "Designed By Monica",
      subtitle: "Exclusive Collection",
      items: ["Juttis", "Heels", "Purses"],
    },
    {
      title: "Women",
      subtitle: "Everyday Comfort",
      items: ["Juttis", "Heels", "Purses"],
    },
  ];

  // User menu items for logged-in users
  const userMenuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Package, label: "My Orders", href: "/orders" },
    { icon: Settings, label: "Settings", href: "/settings" },
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
          fixed top-0 left-0 right-0 z-50 backdrop-blur-md
          transition-all duration-500 ease-out
          ${
            isScrolled || pathname !== "/"
              ? "bg-white/95 shadow-lg py-2.5 lg:py-3 border-b border-gray-100/50"
              : "bg-transparent shadow-none py-3 lg:py-4 border-b border-white/10"
          }
        `}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 transition-colors duration-200 focus:outline-none ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              <NavLink href="/collections" hasDropdown={true}>
                Collections
              </NavLink>
              <NavLink href="/about">About</NavLink>
            </div>

            <div className="flex-1 flex justify-center md:flex-initial">
              <Link href="/" className=" relative overflow-hidden group">
                {/* Static Logo for Non-Home Pages with Hover Magic */}
                {pathname !== "/" && (
                  <div className="relative">
                    <Image
                      src="/combined.png"
                      alt="Brand Logo"
                      width={240}
                      height={60}
                      priority
                      className={`
                        transition-all duration-500 ease-out object-contain
                        filter group-hover:brightness-105 group-active:scale-95 relative z-10
                        ${
                          isScrolled
                            ? "h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
                            : "h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
                        }
                      `}
                    />

                    {/* Golden Dust Particles - Flying Above */}
                    <div className="absolute  inset-0 overflow-visible pointer-events-none z-20">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`dust-${i}`}
                          className="absolute w-1.5 h-1.5 bg-gradient-to-r from-red-800 to-red-900 rounded-full 
                                   opacity-0 group-hover:opacity-80 transition-all duration-1000 ease-out shadow-lg z-20"
                          style={{
                            left: `${15 + i * 7}%`,
                            top: `${-30 + (i % 4) * 20}%`,
                            transitionDelay: `${i * 80}ms`,
                          }}
                        >
                          <div
                            className="w-full h-full bg-gradient-to-r from-red-800 to-red-900 rounded-full
                                     group-hover:animate-pulse shadow-red-900/50"
                            style={{
                              animationDelay: `${i * 150}ms`,
                              animationDuration: "2s",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Floating Crown Above Logo */}
                    <div
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-30
                               opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out
                               group-hover:animate-bounce"
                      style={{
                        transitionDelay: "200ms",
                        fontSize: "28px",
                        filter: "drop-shadow(0 4px 8px rgba(127, 29, 29, 0.3))",
                      }}
                    >
                      👑
                    </div>

                    {/* Luxury Brand Sparkles - Floating Around */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`luxury-sparkle-${i}`}
                          className="absolute opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out z-20"
                          style={{
                            left: `${10 + i * 12}%`,
                            top: `${-25 + (i % 3) * 25}%`,
                            transitionDelay: `${150 + i * 75}ms`,
                          }}
                        >
                          <div
                            className="w-2 h-2 bg-gradient-to-r from-red-800 to-red-900 rounded-full
                                     group-hover:animate-ping shadow-lg shadow-red-900/50"
                            style={{
                              animationDelay: `${i * 200}ms`,
                              animationDuration: "1.5s",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Floating Brand Message - Above Everything */}
                    <div
                      className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-40
                               opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out
                               text-xs font-semibold text-red-900 whitespace-nowrap
                               bg-gradient-to-r from-red-50 to-red-100 px-3 py-1.5 rounded-full 
                               shadow-lg border border-red-200/50 backdrop-blur-sm
                               group-hover:animate-bounce"
                      style={{ transitionDelay: "400ms" }}
                    >
                      ✨ Crafted with Excellence ✨
                    </div>

                    {/* Floating Luxury Hearts - Above Logo */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-25">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={`heart-${i}`}
                          className="absolute opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out z-25
                                   text-red-900 group-hover:animate-bounce"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${-20 + (i % 2) * 40}%`,
                            transitionDelay: `${250 + i * 100}ms`,
                            fontSize: "14px",
                            animationDelay: `${i * 300}ms`,
                            animationDuration: "2s",
                            filter:
                              "drop-shadow(0 2px 4px rgba(127, 29, 29, 0.4))",
                          }}
                        >
                          ❤️
                        </div>
                      ))}
                    </div>

                    {/* Floating Side Elements */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
                      {/* Left side sparkle */}
                      <div
                        className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-20
                                 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out
                                 text-red-600 group-hover:animate-pulse"
                        style={{
                          transitionDelay: "300ms",
                          fontSize: "20px",
                          filter:
                            "drop-shadow(0 2px 4px rgba(127, 29, 29, 0.3))",
                        }}
                      >
                        ✨
                      </div>

                      {/* Right side sparkle */}
                      <div
                        className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20
                                 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out
                                 text-red-600 group-hover:animate-pulse"
                        style={{
                          transitionDelay: "500ms",
                          fontSize: "20px",
                          filter:
                            "drop-shadow(0 2px 4px rgba(127, 29, 29, 0.3))",
                        }}
                      >
                        ✨
                      </div>
                    </div>

                    {/* Floating Excellence Indicators */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
                      <div
                        className="absolute -top-6 -left-4 z-20
                                 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out
                                 text-red-700 group-hover:animate-bounce"
                        style={{
                          transitionDelay: "600ms",
                          fontSize: "14px",
                          animationDelay: "0.5s",
                        }}
                      >
                        💎
                      </div>

                      <div
                        className="absolute -top-6 -right-4 z-20
                                 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out
                                 text-red-700 group-hover:animate-bounce"
                        style={{
                          transitionDelay: "700ms",
                          fontSize: "14px",
                          animationDelay: "0.7s",
                        }}
                      >
                        💎
                      </div>
                    </div>

                    {/* Morphing Geometric Shapes */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-15">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={`morph-${i}`}
                          className="absolute opacity-0 group-hover:opacity-70 transition-all duration-1000 ease-out z-15"
                          style={{
                            left: `${10 + i * 15}%`,
                            top: `${-30 + (i % 3) * 20}%`,
                            transitionDelay: `${800 + i * 100}ms`,
                          }}
                        >
                          <div
                            className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-800 
                                     group-hover:animate-pulse transform transition-all duration-1000
                                     group-hover:rotate-45 group-hover:scale-150"
                            style={{
                              animationDelay: `${i * 200}ms`,
                              animationDuration: "2s",
                              borderRadius:
                                i % 3 === 0
                                  ? "50%"
                                  : i % 3 === 1
                                  ? "0%"
                                  : "20%",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Ripple Effect Circles */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={`ripple-${i}`}
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                                   opacity-0 group-hover:opacity-30 transition-all duration-1500 ease-out
                                   border-2 border-red-300 rounded-full group-hover:animate-ping"
                          style={{
                            width: `${50 + i * 30}px`,
                            height: `${50 + i * 30}px`,
                            transitionDelay: `${900 + i * 200}ms`,
                            animationDelay: `${i * 300}ms`,
                            animationDuration: "3s",
                          }}
                        />
                      ))}
                    </div>

                    {/* Floating Energy Orbs */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-20">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`orb-${i}`}
                          className="absolute opacity-0 group-hover:opacity-80 transition-all duration-800 ease-out z-20"
                          style={{
                            left: `${15 + i * 10}%`,
                            top: `${-25 + (i % 2) * 50}%`,
                            transitionDelay: `${1000 + i * 100}ms`,
                          }}
                        >
                          <div
                            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1200 ease-out"
                            style={{
                              animationDelay: `${i * 250}ms`,
                              animationDuration: "2.5s",
                            }}
                          >
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                                         transform -skew-x-12 group-hover:animate-pulse"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* DNA Helix Effect */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-10">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={`helix-${i}`}
                          className="absolute w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1200 ease-out"
                          style={{
                            left: `${50 + 30 * Math.cos((i * Math.PI) / 8)}%`,
                            top: `${50 + 30 * Math.sin((i * Math.PI) / 8)}%`,
                            animationDelay: `${i * 100}ms`,
                            transform: `rotate(${
                              i * 22.5
                            }deg) translateX(20px)`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Prismatic Light Beams */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-8">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`beam-${i}`}
                          className="absolute opacity-0 group-hover:opacity-40 transition-all duration-1000 ease-out"
                          style={{
                            width: "200%",
                            height: "2px",
                            left: "-50%",
                            top: "50%",
                            background: `linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent)`,
                            transform: `rotate(${i * 45}deg)`,
                            transformOrigin: "center",
                            transitionDelay: `${1400 + i * 75}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Magnetic Field Lines */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-7">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={`field-${i}`}
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                                   opacity-0 group-hover:opacity-25 transition-all duration-1500 ease-out
                                   border border-red-300 rounded-full group-hover:animate-pulse"
                          style={{
                            width: `${80 + i * 60}px`,
                            height: `${40 + i * 30}px`,
                            transitionDelay: `${1500 + i * 200}ms`,
                            animationDelay: `${i * 500}ms`,
                            animationDuration: "4s",
                          }}
                        />
                      ))}
                    </div>

                    {/* Quantum Particles */}
                    <div className="absolute inset-0 overflow-visible pointer-events-none z-25">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`quantum-${i}`}
                          className="absolute opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out z-25"
                          style={{
                            left: `${20 + ((i * 7) % 60)}%`,
                            top: `${-20 + ((i * 11) % 40)}%`,
                            transitionDelay: `${1600 + i * 80}ms`,
                          }}
                        >
                          <div
                            className="w-1 h-1 bg-red-600 rounded-full relative group-hover:animate-ping"
                            style={{
                              animationDelay: `${i * 150}ms`,
                              animationDuration: "2s",
                            }}
                          >
                            <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse" />
                            <div
                              className="absolute -inset-1 bg-red-400/30 rounded-full animate-ping"
                              style={{ animationDelay: `${i * 200}ms` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Magical Logo Effect - Only on Home Page */}
                {pathname === "/" && (
                  <>
                    {/* Original Logo - Only appears when scrolled */}
                    <Image
                      src="/combined.png"
                      alt="Brand Logo"
                      width={240}
                      height={60}
                      priority
                      className={`
                        transition-all duration-700 ease-out object-contain
                        group-hover:scale-110 filter group-hover:brightness-110
                        group-active:scale-95 relative z-10
                        ${
                          isScrolled
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-90"
                        }
                        ${
                          isScrolled
                            ? "h-6 sm:h-7 md:h-8 lg:h-9 w-auto max-w-[100px] sm:max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
                            : "h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]"
                        }
                      `}
                    />

                    {/* Magical Transition Overlay - Only when scrolling */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                        transform -skew-x-12 transition-all duration-1000 ease-out pointer-events-none
                        ${
                          isScrolled
                            ? "translate-x-full opacity-30"
                            : "-translate-x-full opacity-0"
                        }
                      `}
                      style={{
                        width: "200%",
                        left: "-50%",
                      }}
                    />

                    {/* Shimmer Effect - Only when scrolling */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent
                        transform transition-all duration-1200 ease-out pointer-events-none
                        ${
                          isScrolled
                            ? "translate-x-full opacity-100"
                            : "-translate-x-full opacity-0"
                        }
                      `}
                      style={{
                        width: "150%",
                        left: "-25%",
                        animationDelay: "0.2s",
                      }}
                    />

                    {/* Scale Effect Behind Logo */}
                    <div
                      className={`
                        absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm
                        transition-all duration-800 ease-out pointer-events-none
                        ${
                          isScrolled
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-110"
                        }
                      `}
                    />

                    {/* Burst Effect on Reveal */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`
                            absolute w-1 h-1 bg-red-400/60 rounded-full
                            transition-all duration-1000 ease-out
                            ${
                              isScrolled
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0"
                            }
                          `}
                          style={{
                            left: `${15 + i * 10}%`,
                            top: `${20 + (i % 3) * 30}%`,
                            transitionDelay: `${200 + i * 50}ms`,
                            transform: isScrolled
                              ? `translate(${Math.cos(i * 45) * 10}px, ${
                                  Math.sin(i * 45) * 10
                                }px)`
                              : "translate(0, 0)",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              <button
                onClick={toggleSearchPopup}
                className={`
                  flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                  uppercase tracking-wide transition-all duration-300 ease-out group
                  ${
                    isSearchOpen || pathname === "/search"
                      ? `${
                          isScrolled || pathname !== "/"
                            ? "text-[#800000]"
                            : "text-white"
                        } scale-105`
                      : `${
                          isScrolled || pathname !== "/"
                            ? "text-gray-800 hover:text-[#800000]"
                            : "text-white/90 hover:text-white"
                        } hover:scale-105`
                  }
                `}
              >
                <Search
                  size={16}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <span className="hidden lg:inline">Search</span>
              </button>

              <Link
                href="/cart"
                className={`
                  flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
                  uppercase tracking-wide transition-all duration-300 ease-out group relative
                  ${
                    pathname === "/cart"
                      ? `${
                          isScrolled || pathname !== "/"
                            ? "text-[#800000]"
                            : "text-white"
                        } scale-105`
                      : `${
                          isScrolled || pathname !== "/"
                            ? "text-gray-800 hover:text-[#800000]"
                            : "text-white/90 hover:text-white"
                        } hover:scale-105`
                  }
                `}
              >
                <div className="relative">
                  <ShoppingBag
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
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
                      ${
                        isUserDropdownOpen ||
                        pathname.startsWith("/profile") ||
                        pathname.startsWith("/orders") ||
                        pathname.startsWith("/settings")
                          ? `${
                              isScrolled || pathname !== "/"
                                ? "text-[#800000]"
                                : "text-white"
                            } scale-105`
                          : `${
                              isScrolled || pathname !== "/"
                                ? "text-gray-800 hover:text-[#800000]"
                                : "text-white/90 hover:text-white"
                            } hover:scale-105`
                      }
                    `}
                  >
                    <User
                      size={16}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="hidden lg:inline">
                      {user.name || "Account"}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`ml-1 transition-all duration-300 ease-out ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  <div
                    className={`
                      absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md shadow-2xl 
                      rounded-lg border border-gray-100 z-50 transition-all duration-300 ease-out
                      ${
                        isUserDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    <div className="p-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm">
                        {user.name}
                      </p>
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
                    ${
                      isScrolled || pathname !== "/"
                        ? "text-gray-800 hover:text-[#800000]"
                        : "text-white/90 hover:text-white"
                    } hover:scale-105
                  `}
                >
                  <User
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="hidden lg:inline">Login</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={toggleSearchPopup}
                className={`p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isScrolled
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <Search size={18} />
              </button>

              {/* Mobile User Account */}
              {isLoggedIn ? (
                <button
                  onClick={toggleUserDropdown}
                  className={`p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isScrolled || pathname !== "/"
                      ? "text-gray-800 hover:text-[#800000]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  <User size={18} />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className={`p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isScrolled || pathname !== "/"
                      ? "text-gray-800 hover:text-[#800000]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  <User size={18} />
                </button>
              )}

              <Link
                href="/cart"
                className={`p-2 transition-all duration-300 relative transform hover:scale-110 active:scale-95 ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <ShoppingBag size={18} />
              </Link>
            </div>
          </div>

          {/* Collections Dropdown */}
          <div
            className={`
              absolute left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl z-50 
              transition-all duration- ease-out border-b border-gray-100
              ${
                isCollectionDropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-4 pointer-events-none"
              }
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="max-w-[1600px] mx-auto p-6 lg:p-8"
              style={{ pointerEvents: "auto" }}
            >
              {/* View All Collections Button - Desktop */}
              <div
                className="flex justify-center mb-6"
                style={{ pointerEvents: "auto" }}
              >
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Button clicked!");
                    router.push("/collections");
                    setIsCollectionDropdownOpen(false);
                    setIsHoverMode(true);
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#800000] text-white 
                           font-semibold text-sm uppercase tracking-wide rounded-lg
                           hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                           shadow-lg hover:shadow-xl cursor-pointer relative z-10"
                  style={{ pointerEvents: "auto" }}
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
                      <h3
                        className="font-bold text-gray-900 text-base lg:text-lg 
                                    transition-colors duration-300"
                      >
                        {category.title}
                      </h3>
                      <p
                        className="text-xs lg:text-sm text-gray-500  
                                  transition-colors duration-300"
                      >
                        {category.subtitle}
                      </p>
                    </div>

                    <div
                      className="h-px bg-gradient-to-r from-gray-200 to-transparent 
                                  group-hover:from-[#800000] group-hover:to-[#800000]/20 
                                  transition-all duration-300"
                    ></div>

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
          md:hidden h-full overflow-x-hidden  fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-white shadow-xl
          transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full  ">
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

              <div className="space-y-1">
                {/* new section */}
                <div
                  onClick={() => {
                    handleCategoryClick("All Products"); // Or any custom logic
                    toggleMenu(); // Optional: close menu
                  }}
                  className="font-medium text-gray-700 hover:text-[#800000] 
               transition-all  duration-300 cursor-pointer p-2 rounded-lg
               hover:bg-[#800000]/5 transform hover:translate-x-1"
                >
                  New
                </div>
                {/* maspping designed by monica */}
                {collectionCategoriesForMobile.map((category, index) => (
                  <div key={index} className=" sm:ml-4 space-y-2">
                    <div
                      onClick={() => toggleCategory(index)}
                      className="font-medium text-gray-700 hover:text-[#800000] 
                 transition-all duration-300 cursor-pointer p-2 rounded-lg
                 hover:bg-[#800000]/5 transform hover:translate-x-1 flex justify-between items-center"
                    >
                      <span>{category.title}</span>
                      <span>{openCategoryIndex === index ? "-" : "+"}</span>
                    </div>

                    {openCategoryIndex === index && (
                      <ul className="ml-0 sm:ml-4 space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div
                              onClick={() => {
                                handleCategoryClick(
                                  `${category.title} ${item}`
                                );
                                toggleMenu(); // close the menu
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
                    )}
                  </div>
                ))}
                {/* view all collections */}
                <button
                  type="button"
                  onClick={handleViewAllCollections}
                  className="inline-flex items-center truncate ml-1 space-x-4 px-8 py-2 mt-3 bg-[#800000] text-white 
                               font-semibold text-[12px] uppercase tracking-wide rounded-md
                               hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                               shadow-md hover:shadow-lg w-[70%] justify-center cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                >
                  {/* <Eye size={16} /> */}
                  <span>View All Collections</span>
                </button>
              </div>

              <div className="space-y-0 sm:space-y-1  border-gray-100">
                {["About", "Cart"].map((item, index) => {
                  const href = `/${item.toLowerCase()}`;
                  const isActive = pathname === href;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (item === "Search") {
                          toggleSearchPopup();
                        } else {
                          router.push(href);
                          toggleMenu();
                        }
                      }}
                      className={`
                        block p-1 font-medium text-base sm:text-lg transition-all duration-300
                        transform hover:translate-x-2 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#800000]
                      `}
                    >
                      {item}
                    </button>
                  );
                })}

                {/* Mobile Login/Logout */}
              </div>
            </div>
          </div>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center space-x-3 w-full p-3 text-left font-medium 
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
              className="flex mb-4 w- items-center justify-center    py-2 mx-2 text-left font-medium 
                             text-base sm:text-lg text-[#800000] text-[18px]
                             bg-[#800000]/10 rounded-lg transition-all duration-300"
            >
              {/* <User size={18} /> */}
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
