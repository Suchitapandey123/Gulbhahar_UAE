"use client";
import GulbhaharSidebar from "@/modules/(gulbhahar)/sidebar/Sidebar";
import { useAuth } from "@/providers/ContextProviders/AuthContext";
import { useCart } from "@/providers/ContextProviders/CartContext";
import CartPage from "@/modules/(gulbhahar)/cart/CartPage";
import DesktopNav from "@/shared-components/Navbar/DesktopNav";
import MobileNav from "@/shared-components/Navbar/MobileNav";
import SearchPopup from "@/shared-components/Navbar/SearchPopup";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CollectionsDropdown from "./Navbar.CollectionDropdown";

// Routes where navbar should have transparent background when not scrolled
const transparentNavRoutes = ["/"];
// const transparentNavRoutes = ["/" , "/juttis" ,  "/sarees", "/lehenga", "/bags", "/suits" , "/jewellery"];

const Navbar = () => {
  const {
    isAuthenticated,
    userData,
    authToken,
    logout,
    updateUserData,
    isLoading: authLoading,
  } = useAuth();
  const { getCartItemsCount, isCartOpen, toggleCart } = useCart();
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
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null,
  );
  const [iimageUrl, setiImageUrl] = useState<any>(null);

  const itemsCount = getCartItemsCount();

  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load user image from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          const parsedData = JSON.parse(storedUserData);
          setiImageUrl(parsedData);
        } catch {
          setiImageUrl({ profilePicture: storedUserData });
        }
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
          setIsScrolled(window.scrollY > 850);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCollectionDropdownOpen(false);
        setIsHoverMode(true);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
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

  // Determine if navbar should show solid background
  const isNavSolid = isScrolled || !transparentNavRoutes.includes(pathname);

  // Shared props for child components
  const sharedProps = {
    isScrolled,
    isNavSolid,
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
      <SearchPopup isOpen={isSearchOpen} onClose={toggleSearchPopup} />
      {isCartOpen && <CartPage />}

      <nav
        className={`fixed top-0 left-0 right-0 z-[100]
    transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
    py-1 lg:py-1
    ${
      isNavSolid
        ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-gray-200/30 opacity-100 translate-y-0 pointer-events-auto"
        : "bg-transparent border-b border-white/5 opacity-0 -translate-y-3 pointer-events-none"
    }
  `}
      >
        <div className="2xl:max-w-[1600px] max-w-7xl mx-auto px-4 sm:px-2 lg:px-2">
          <div className="flex items-center justify-between relative">
            {/* Mobile Menu Toggle - Refined */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className={`group p-2.5 rounded-full transition-all duration-300 ${
                  isScrolled || !transparentNavRoutes.includes(pathname)
                    ? "text-gray-900 hover:bg-[#800000]/5 hover:text-[#800000]"
                    : "text-white hover:bg-white/10 hover:text-white/80"
                }`}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  {isMenuOpen ? (
                    <X
                      size={24}
                      className="transition-transform duration-300 rotate-0 group-hover:rotate-90"
                    />
                  ) : (
                    <Menu
                      size={24}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav {...sharedProps} />

            {/* Mobile Navigation */}
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

        {/* Subtle Decorative Line for Scrolled State */}
        <div
          className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#800000]/20 to-transparent transition-all duration-1000 ${
            isScrolled ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        />
      </nav>

      {/* Gulbhahar Sidebar */}
      <GulbhaharSidebar
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        userData={userData}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
