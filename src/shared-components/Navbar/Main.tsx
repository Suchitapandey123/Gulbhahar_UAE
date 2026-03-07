// @ts-nocheck
"use client";
import { useAuth } from "@/providers/ContextProviders/AuthContext";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CollectionsDropdown from "@/modules/(gulbhahar)/home/navbar/Navbar.CollectionDropdown";
import { Menu, X } from "lucide-react";
import CartPage from "@/modules/(gulbhahar)/cart/CartPage";
import DesktopNav from "./DesktopNav";
import MobileBackdrop from "./MobileBackdrop";
import MobileMenuSidebar from "./MobileMenuSidebar";
import MobileNav from "./MobileNav";
import SearchPopup from "./SearchPopup";

const Navbar = () => {
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

  // State management
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
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
  const [iimageUrl, setiImageUrl] = useState(null);

  const itemsCount = getCartItemsCount();
  const total = getCartTotal();
  const pathname = usePathname();
  const router = useRouter();

  // Refs
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const userHoverTimeoutRef = useRef(null);

  // Load user image from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      try {
        const parsedData = JSON.parse(storedUserData);
        setiImageUrl(parsedData);
      } catch {
        setiImageUrl({ profilePicture: storedUserData });
      }
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!authToken || !isAuthenticated) return;

    try {
      setProfileImageLoading(true);
      const response = await fetch(
        "https://api.gulbhahar.com/api/users/user-by-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
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
          updateUserData(updatedUserData);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setProfileImageLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (isAuthenticated && authToken && !authLoading) {
      fetchUserProfile();
    }
  }, [isAuthenticated, authToken, authLoading]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (userHoverTimeoutRef.current)
        clearTimeout(userHoverTimeoutRef.current);
    };
  }, []);

  // Handlers
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

  const toggleSearchPopup = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logout();
    signOut();
    setIsUserDropdownOpen(false);
    setProfileImageError(false);
  };

  // Shared props for child components
  const sharedProps = {
    isScrolled,
    pathname,
    router,
    isAuthenticated,
    userData,
    authLoading,
    profileImageLoading,
    profileImageError,
    iimageUrl,
    itemsCount,
    isCartOpen,
    isSearchOpen,
    isUserDropdownOpen,
    isCollectionDropdownOpen,
    isHoverMode,
    toggleCart,
    toggleSearchPopup,
    handleLogin,
    handleLogout,
    setIsUserDropdownOpen,
    setIsCollectionDropdownOpen,
    setIsHoverMode,
    setProfileImageError,
    userDropdownRef,
    dropdownRef,
    hoverTimeoutRef,
    userHoverTimeoutRef,
  };

  return (
    <>
      {/* <SearchPopup isOpen={isSearchOpen} onClose={toggleSearchPopup} />
      {isCartOpen && <CartPage />} */}
      <MobileBackdrop isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ease-out ${
          isScrolled || pathname !== "/"
            ? "bg-white/95 shadow-lg py-2.5 lg:py-3 border-b border-gray-100/50"
            : "bg-transparent shadow-none py-3 lg:py-4 border-b border-white/10"
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* <Logo isScrolled={isScrolled} pathname={pathname} /> */}
            {/* Mobile Menu Toggle */}
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

            <DesktopNav {...sharedProps} />
            <MobileNav
              {...sharedProps}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              toggleMobileCollection={() =>
                setIsMobileCollectionOpen(!isMobileCollectionOpen)
              }
              isMobileCollectionOpen={isMobileCollectionOpen}
              openCategoryIndex={openCategoryIndex}
              setOpenCategoryIndex={setOpenCategoryIndex}
            />
          </div>

          <CollectionsDropdown {...sharedProps} />
        </div>
      </nav>
      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isAuthenticated={isAuthenticated}
        userData={userData}
        router={router}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        openCategoryIndex={openCategoryIndex}
        setOpenCategoryIndex={setOpenCategoryIndex}
        {...sharedProps}
      />
    </>
  );
};

export default Navbar;
