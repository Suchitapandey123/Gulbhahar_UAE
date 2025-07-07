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
  Plus, // ADD THIS
  Minus, // ADD THIS
  Trash2,
  Eye,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import SearchPopup from "./SearchPopup";
import { useAuth } from "../../Providers/ContextProviders/AuthContext"; // 🔥 ADD THIS IMPORT
import { useCart } from "@/Providers/ContextProviders/CartContext";
import CartPage from "./CartPage";

const Navbar = () => {
  // 🔥 REPLACE ALL MANUAL AUTH STATE WITH CONTEXT
  const {
    isAuthenticated,
    userData,
    authToken,
    logout,
    updateUserData,
    isLoading: authLoading,
  } = useAuth();
  const {
    cart,
    getCartItemsCount,
    getCartTotal,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollectionDropdownOpen, setIsCollectionDropdownOpen] =
    useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(true);
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const itemsCount = getCartItemsCount();
  const total = getCartTotal();

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const userHoverTimeoutRef = useRef(null);

  // 🔥 SIMPLIFIED FUNCTION - NOW USES CONTEXT TOKEN
  const fetchUserProfile = async () => {
    if (!authToken || !isAuthenticated) return;

    try {
      setProfileImageLoading(true);
      console.log(
        "🔄 Fetching user profile with token:",
        authToken.substring(0, 20) + "..."
      );

      const response = await fetch(
        "https://api.gulbhahar.com/api/users/user-by-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authToken}`
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Profile data fetched successfully:", data);

        if (data.user) {
          const updatedUserData = {
            name: `${data.user.firstName || ""} ${
              data.user.lastName || ""
            }`.trim(),
            email: data.user.email || "",
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            imageUrl: data.user.imageUrl || "",
            userId: data.user.userId || data.user._id || "",
          };

          // 🔥 USE CONTEXT TO UPDATE USER DATA
          updateUserData(updatedUserData);
          console.log("👤 User profile updated:", updatedUserData);
        }
      } else {
        console.error("❌ Failed to fetch profile:", response.status);
        // If token is invalid, logout through context
        if (response.status === 401 || response.status === 403) {
          // logout();
        }
      }
    } catch (error) {
      console.error("🚨 Error fetching user profile:", error);
    } finally {
      setProfileImageLoading(false);
    }
  };

  // 🔥 SIMPLIFIED EFFECT - CONTEXT HANDLES AUTH STATE
  useEffect(() => {
    if (isAuthenticated && authToken && !authLoading) {
      // Fetch fresh profile data when authenticated
      fetchUserProfile();
    }
  }, [isAuthenticated, authToken, authLoading]);

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
        setIsHoverMode(true);
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
      setIsHoverMode(true);
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

  // 🔥 SIMPLIFIED LOGOUT - CONTEXT HANDLES EVERYTHING
  const handleLogout = () => {
    logout(); // Context handles all cleanup and redirect
    setIsUserDropdownOpen(false);
    setProfileImageError(false);
    console.log("🚪 User logged out successfully");
  };

  // Enhanced Collections click handler
  const handleCollectionClick = (e) => {
    e.preventDefault();
    if (window.innerWidth >= 768) {
      if (isHoverMode) {
        setIsHoverMode(false);
        setIsCollectionDropdownOpen(true);
      } else {
        setIsCollectionDropdownOpen(!isCollectionDropdownOpen);
      }
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/collections/`);
    setIsCollectionDropdownOpen(false);
    setIsMobileCollectionOpen(false);
    setIsMenuOpen(false);
    setIsHoverMode(true);
  };

  // View All Collections handler
  const handleViewAllCollections = (e) => {
    console.log("handleViewAllCollections called");
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
      setIsCollectionDropdownOpen(false);

      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    }
  };

  // Hover handlers for user dropdown
  const handleUserMouseEnter = () => {
    if (window.innerWidth >= 768 && isAuthenticated) {
      if (userHoverTimeoutRef.current) {
        clearTimeout(userHoverTimeoutRef.current);
      }
      setIsUserDropdownOpen(true);
    }
  };

  const handleUserMouseLeave = () => {
    if (window.innerWidth >= 768 && isAuthenticated) {
      userHoverTimeoutRef.current = setTimeout(() => {
        setIsUserDropdownOpen(false);
      }, 150);
    }
  };

  // 🔥 UPDATED PROFILE IMAGE COMPONENT - USES CONTEXT DATA
  const ProfileImage = ({ size = "w-8 h-8", className = "" }) => {
    const handleImageError = () => {
      setProfileImageError(true);
    };

    const handleImageLoad = () => {
      setProfileImageError(false);
    };

    // Extract size for determining text size
    const isSmall = size.includes("w-6") || size.includes("w-7");
    const isMedium = size.includes("w-8") || size.includes("w-10");
    const isLarge = size.includes("w-12");

    if (profileImageLoading || authLoading) {
      return (
        <div
          className={`${size} ${className} bg-gray-200 rounded-full flex items-center justify-center animate-pulse`}
        >
          <User
            size={isSmall ? 12 : isMedium ? 16 : 20}
            className="text-gray-400"
          />
        </div>
      );
    }

    if (userData?.imageUrl && !profileImageError) {
      return (
        <div
          className={`${size} ${className} relative overflow-hidden rounded-full bg-gray-100 flex-shrink-0`}
        >
          <Image
            src={userData.imageUrl}
            alt={`${userData.firstName || "User"}'s profile`}
            fill
            className="object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
          />
        </div>
      );
    }

    // Fallback to initials or user icon
    const initials =
      userData?.firstName && userData?.lastName
        ? `${userData.firstName.charAt(0)}${userData.lastName.charAt(
            0
          )}`.toUpperCase()
        : userData?.name
        ? userData.name
            .split(" ")
            .map((n) => n.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "";

    if (initials) {
      return (
        <div
          className={`${size} ${className} bg-[#800000] rounded-full flex items-center justify-center flex-shrink-0`}
        >
          <span
            className={`text-white font-semibold ${
              isSmall ? "text-xs" : isMedium ? "text-sm" : "text-base"
            }`}
          >
            {initials}
          </span>
        </div>
      );
    }

    return (
      <div
        className={`${size} ${className} bg-[#800000] rounded-full flex items-center justify-center flex-shrink-0`}
      >
        <User size={isSmall ? 12 : isMedium ? 16 : 20} className="text-white" />
      </div>
    );
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
    {
      icon: User,
      label: "My Profile",
      href: "/account/account-centre/profile",
    },
    {
      icon: Package,
      label: "My Orders",
      href: "/account/account-centre/my-order",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/account/account-centre/settings",
    },
  ];

  return (
    <>
      {/* Search Popup */}
      <SearchPopup isOpen={isSearchOpen} onClose={toggleSearchPopup} />
      {isCartOpen && (
        <CartPage />
      )}

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
            <div className="hidden md:flex items-center space-x-2 lg:space-x-12">
              <NavLink href="/collections" hasDropdown={true}>
                Collections
              </NavLink>
              <NavLink href="/about">About</NavLink>
            </div>

            <div className="flex-1 flex items-center justify-center md:flex-initial">
              <Link href="/" className="relative group">
                {/* Logo Container - Image + Text */}
                <div className="relative flex items-center justify-center px-1 sm:px-6 md:px-8 sm:py-1">
                  {/* Logo Image - Left Side */}
                  <div
                    className={`
                    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14  sm:mr-2 md:mr-3 flex items-center justify-center
                    transition-all duration-700 ease-out transform relative z-10
                    ${pathname === "/" ? "group-hover:scale-105" : ""}
                    ${
                      pathname !== "/"
                        ? "opacity-100 translate-y-0" // Other pages: always visible
                        : isScrolled
                        ? "opacity-100 translate-y-0" // Home scrolled: visible
                        : "opacity-0 translate-y-4" // Home not scrolled: hidden with slide up
                    }
                  `}
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      sizes="(max-width: 600px) 28px, (max-width: 708px) 36px, (max-width: 980px) 42px, 50px"
                      className="object-contain w"
                      priority
                    />
                  </div>

                  {/* GULBHAHAR Text Logo */}
                  <h1
                    className={`
                      text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal sm:tracking-[0.2em]
                      transition-all duration-700 ease-out transform relative z-10
                      ${
                        pathname === "/"
                          ? "group-hover:scale-105 group-hover:tracking-[0.2em]"
                          : ""
                      }
                      ${
                        pathname !== "/"
                          ? "text-[#800000] opacity-100 translate-y-0" // Other pages: always visible and red
                          : isScrolled
                          ? "text-[#800000] opacity-100 translate-y-0" // Home scrolled: visible and red
                          : "text-white opacity-0 translate-y-4" // Home not scrolled: hidden with slide up
                      }
                    `}
                    style={{ fontFamily: "Old Standard TT, serif" }}
                  >
                    GULBHAHAR
                  </h1>

                  {/* Magical Particles - Fixed positioning */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      pathname !== "/" || isScrolled
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-red-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                        style={{
                          left: `${20 + i * 8}%`,
                          top: `${30 + (i % 3) * 15}%`,
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Golden Dust Effect - Fixed positioning */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                      pathname !== "/" || isScrolled
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`dust-${i}`}
                        className="absolute w-0.5 h-0.5 bg-yellow-400/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out animate-pulse"
                        style={{
                          left: `${25 + i * 10}%`,
                          top: `${20 + (i % 4) * 12}%`,
                          transitionDelay: `${200 + i * 150}ms`,
                          animationDelay: `${i * 300}ms`,
                          animationDuration: "3s",
                        }}
                      />
                    ))}
                  </div>

                  {/* Pulsing Glow - Contained */}
                  <div
                    className={`absolute left-2 right-2 top-1/2 transform -translate-y-1/2 h-12 pointer-events-none transition-opacity duration-500 ${
                      pathname !== "/" || isScrolled
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-800 ease-out">
                      <div className="w-full h-full bg-gradient-to-r from-red-400/10 via-red-600/20 to-red-400/10 blur-md animate-pulse"></div>
                    </div>
                  </div>

                  {/* Floating Sparkles - Better positioning */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      pathname !== "/" || isScrolled
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={`sparkle-${i}`}
                        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out"
                        style={{
                          left: `${30 + i * 15}%`,
                          top: `${15 + (i % 2) * 8}%`,
                          transitionDelay: `${500 + i * 200}ms`,
                        }}
                      >
                        <div
                          className="w-1 h-1 bg-yellow-300 rounded-full relative animate-ping"
                          style={{
                            animationDelay: `${i * 400}ms`,
                            animationDuration: "2s",
                          }}
                        >
                          <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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

              {/* <Link
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
              </Link> */}

              <button
                onClick={toggleCart}
                className={`
        flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
        uppercase tracking-wide transition-all duration-300 ease-out group relative
        ${
          isCartOpen || pathname === "/cart"
            ? `${
                isScrolled || pathname !== "/" ? "text-[#800000]" : "text-white"
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
                  {itemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse text-[10px]">
                      {itemsCount > 99 ? "99+" : itemsCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline">Cart</span>
              </button>

              {/* 🔥 UPDATED USER ACCOUNT SECTION - USES CONTEXT */}
              {isAuthenticated ? (
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
                    <ProfileImage
                      size="w-6 h-6 lg:w-7 lg:h-7"
                      className="group-hover:scale-110 transition-transform duration-300 border border-current/20"
                    />
                    <span className="hidden lg:inline">
                      {userData?.firstName || "Account"}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`ml-1 transition-all duration-300 ease-out ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Enhanced User Dropdown Menu */}
                  <div
                    className={`
                      absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md shadow-2xl 
                      rounded-lg border border-gray-100 z-50 transition-all duration-300 ease-out
                      ${
                        isUserDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {/* User Info Section with Profile Image */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <ProfileImage
                          size="w-10 h-10"
                          className="border-2 border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm truncate">
                            {userData?.name ||
                              `${userData?.firstName || ""} ${
                                userData?.lastName || ""
                              }`.trim()}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {userData?.email}
                          </p>
                        </div>
                      </div>
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

            <div className="flex items-center space-x-1 sm:space-x-2 md:hidden">
              <button
                onClick={toggleSearchPopup}
                className={`p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isScrolled
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <Search size={16} className="sm:hidden" />
                <Search size={18} className="hidden sm:block" />
              </button>

              {/* 🔥 UPDATED MOBILE USER ACCOUNT - USES CONTEXT */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className={`p-1 sm:p-1.5 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                      isScrolled || pathname !== "/"
                        ? "text-gray-800 hover:text-[#800000]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    <ProfileImage
                      size="w-6 h-6 sm:w-7 sm:h-7"
                      className="border border-current/20"
                    />
                  </button>

                  {/* Mobile User Dropdown */}
                  <div
                    className={`
                      absolute right-0 top-full mt-2 w-64 sm:w-72 bg-white/95 backdrop-blur-md shadow-2xl 
                      rounded-lg border border-gray-100 z-50 transition-all duration-300 ease-out
                      ${
                        isUserDropdownOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {/* Mobile User Info Section with Profile Image */}
                    <div className="p-3 sm:p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <ProfileImage
                          size="w-10 h-10 sm:w-12 sm:h-12"
                          className="border-2 border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                            {userData?.name ||
                              `${userData?.firstName || ""} ${
                                userData?.lastName || ""
                              }`.trim()}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {userData?.email}
                          </p>
                          {userData?.userId && (
                            <p className="text-xs text-gray-500 truncate">
                              ID: {userData.userId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <div
                          key={item.label}
                          onClick={() => {
                            router.push(item.href);
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center space-x-3 px-3 sm:px-4 py-2.5 text-sm sm:text-base text-gray-800 
                                   hover:text-[#800000] hover:bg-[#800000]/5 transition-all duration-200 cursor-pointer"
                        >
                          <item.icon size={16} className="sm:w-5 sm:h-5" />
                          <span>{item.label}</span>
                        </div>
                      ))}

                      <hr className="my-2 border-gray-100" />

                      <div
                        onClick={() => {
                          handleLogout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="flex items-center space-x-3 px-3 sm:px-4 py-2.5 text-sm sm:text-base text-red-600 
                                 hover:text-red-700 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                      >
                        <LogOut size={16} className="sm:w-5 sm:h-5" />
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className={`p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isScrolled || pathname !== "/"
                      ? "text-gray-800 hover:text-[#800000]"
                      : "text-white hover:text-white/80"
                  }`}
                >
                  <User size={16} className="sm:hidden" />
                  <User size={18} className="hidden sm:block" />
                </button>
              )}

              {/* <Link
                href="/cart"
                className={`p-1.5 sm:p-2 transition-all duration-300 relative transform hover:scale-110 active:scale-95 ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <ShoppingBag size={16} className="sm:hidden" />
                <ShoppingBag size={18} className="hidden sm:block" />
              </Link> */}

              <button
                onClick={toggleCart}
                className={`p-1.5 sm:p-2 transition-all duration-300 relative transform hover:scale-110 active:scale-95 ${
                  isScrolled || pathname !== "/"
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white hover:text-white/80"
                }`}
              >
                <div className="relative">
                  <ShoppingBag size={16} className="sm:hidden" />
                  <ShoppingBag size={18} className="hidden sm:block" />
                  {itemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse text-[10px]">
                      {itemsCount > 9 ? "9+" : itemsCount}
                    </span>
                  )}
                </div>
              </button>
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

      {/* 🔥 UPDATED MOBILE MENU - USES CONTEXT */}
      <div
        className={`
          md:hidden h-full overflow-x-hidden fixed inset-y-0 left-0 z-50 
          w-[280px] xs:w-[300px] sm:w-80 bg-white shadow-xl
          transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-100">
            <div className=" w-[70%] flex ">
            <Image
              src="/Image/ful-gulbhaharlogo.png"
              alt="Brand Logo"
              width={80}
              height={24}
              className="h-[38px] xs:h-[38px] w-full sm:h-8 "
            />

            </div>
            
            <button
              onClick={toggleMenu}
              className="p-1.5 xs:p-2 text-gray-600 hover:text-[#800000] transition-colors duration-200 
                       rounded-full hover:bg-gray-100 flex-shrink-0"
            >
              <X size={16} className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-6">
            <div className="space-y-3 xs:space-y-4 sm:space-y-6">
              {/* 🔥 UPDATED USER ACCOUNT SECTION IN MOBILE - USES CONTEXT */}
              {isAuthenticated && (
                <div className="pb-3 xs:pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2 xs:space-x-3 mb-3 xs:mb-4">
                    <ProfileImage
                      size="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12"
                      className="border-2 border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm xs:text-base truncate">
                        {userData?.name ||
                          `${userData?.firstName || ""} ${
                            userData?.lastName || ""
                          }`.trim()}
                      </p>
                      <p className="text-xs xs:text-sm text-gray-600 truncate">
                        {userData?.email}
                      </p>
                      {userData?.userId && (
                        <p className="text-xs text-gray-500 truncate">
                          ID: {userData.userId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 xs:space-y-2">
                    {userMenuItems.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          router.push(item.href);
                          toggleMenu();
                        }}
                        className="flex items-center space-x-2 xs:space-x-3 w-full p-2 xs:p-2.5 text-left 
                                 text-gray-800 hover:text-[#800000] hover:bg-[#800000]/5 rounded-lg 
                                 transition-all duration-200 text-sm xs:text-base cursor-pointer"
                      >
                        <item.icon
                          size={14}
                          className="xs:w-4 xs:h-4 sm:w-5 sm:h-5"
                        />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                {/* New section */}
                <div
                  onClick={() => {
                    handleCategoryClick("All Products");
                    toggleMenu();
                  }}
                  className="font-medium text-gray-700 hover:text-[#800000] 
               transition-all duration-300 cursor-pointer p-2 xs:p-2.5 rounded-lg
               hover:bg-[#800000]/5 transform hover:translate-x-1 text-sm xs:text-base"
                >
                  New
                </div>

                {/* Collection categories for mobile */}
                {collectionCategoriesForMobile.map((category, index) => (
                  <div key={index} className="space-y-1 xs:space-y-2">
                    <div
                      onClick={() => toggleCategory(index)}
                      className="font-medium text-gray-700 hover:text-[#800000] 
                 transition-all duration-300 cursor-pointer p-2 xs:p-2.5 rounded-lg
                 hover:bg-[#800000]/5 transform hover:translate-x-1 flex justify-between items-center
                 text-sm xs:text-base"
                    >
                      <span>{category.title}</span>
                      <span className="text-lg xs:text-xl">
                        {openCategoryIndex === index ? "-" : "+"}
                      </span>
                    </div>

                    {openCategoryIndex === index && (
                      <ul className="ml-2 xs:ml-3 sm:ml-4 space-y-1">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div
                              onClick={() => {
                                handleCategoryClick(
                                  `${category.title} ${item}`
                                );
                                toggleMenu();
                              }}
                              className="text-xs xs:text-sm text-gray-600 hover:text-[#800000] 
                         transition-all duration-300 cursor-pointer 
                         transform hover:translate-x-2 p-1.5 xs:p-2 rounded
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

                {/* View all collections button */}
                <button
                  type="button"
                  onClick={handleViewAllCollections}
                  className="inline-flex items-center justify-center space-x-2 xs:space-x-3 
                           px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 mt-2 xs:mt-3 
                           bg-[#800000] text-white font-semibold 
                           text-xs xs:text-sm uppercase tracking-wide rounded-md
                           hover:bg-[#600000] transform hover:scale-105 transition-all duration-300
                           shadow-md hover:shadow-lg w-[90%] xs:w-[80%] sm:w-[70%] cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                >
                  <span className="text-nowrap">View All Collections</span>
                </button>
              </div>

              {/* Other navigation items */}
              <div className="space-y-0 xs:space-y-1 border-gray-100">
                {["About", "Cart"].map((item, index) => {
                  const href = `/${item.toLowerCase()}`;

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
                      className="block p-1.5 xs:p-2 font-medium text-sm xs:text-base sm:text-lg 
                               transition-all duration-300 transform hover:translate-x-2 rounded-lg 
                               hover:bg-gray-50 text-gray-700 hover:text-[#800000]"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🔥 UPDATED MOBILE MENU FOOTER - USES CONTEXT */}
          <div className="border-t border-gray-100 p-3 xs:p-4">
            {isAuthenticated ? (
              <div
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center space-x-2 xs:space-x-3 w-full p-2 xs:p-3 text-left 
                         font-medium text-sm xs:text-base sm:text-lg text-red-600 hover:text-red-700 
                         hover:bg-red-50 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <LogOut size={16} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span>Logout</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  handleLogin();
                  toggleMenu();
                }}
                className="flex items-center justify-center w-full py-2 xs:py-2.5 sm:py-3 
                         font-medium text-sm xs:text-base sm:text-lg text-[#800000]
                         bg-[#800000]/10 rounded-lg transition-all duration-300 hover:bg-[#800000]/20 cursor-pointer"
              >
                <span>Login</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
