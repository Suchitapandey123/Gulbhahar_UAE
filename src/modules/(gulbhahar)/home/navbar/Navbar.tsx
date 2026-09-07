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

// UAE announcement bar — rotating, AED-focused, consistent with site-wide shipping copy
const UAE_ANNOUNCEMENTS = [
  { mobile: "Handmade in India • Free UAE delivery", full: "Handmade in India — free UAE-wide delivery over AED 219" },
  { mobile: "Delivered UAE-wide in 3–5 days", full: "Fast UAE delivery — Dubai, Abu Dhabi & all Emirates" },
  { mobile: "All prices in AED", full: "All prices in AED — no hidden charges" },
  { mobile: "COD across the UAE", full: "Cash on Delivery across all Emirates" },
];

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
  const [mounted, setMounted] = useState(false);
  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null,
  );
  const [iimageUrl, setiImageUrl] = useState<any>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

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
    setMounted(true);
  }, []);

  // Rotate UAE announcement messages
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % UAE_ANNOUNCEMENTS.length);
    }, 4200);
    return () => clearInterval(timer);
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

  // Before mount, both SSR and client first-render agree on transparent.
  // After mount, real scroll + route logic takes over — no hydration mismatch.
  const isNavSolid =
    mounted &&
    (isScrolled || !transparentNavRoutes.includes(pathname ?? "/"));

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
    ${isScrolled ? "py-1 lg:py-1" : "pt-0 pb-1 lg:pb-1"}
    ${
      isNavSolid
        ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-gray-200/30"
        : "bg-transparent border-b border-white/5"
    }
  `}
      >
        {/* UAE Announcement Bar */}
        <div
          className={`relative z-[60] overflow-hidden bg-[#4a0000] text-white transition-all duration-500 ease-in-out shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-10 sm:max-h-11 opacity-100"
          }`}
          aria-hidden={isScrolled}
        >
          {/* Rich burgundy gradient base */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#260000] via-[#800000] to-[#260000]" />

          {/* Gold hairline edges — premium highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />

          {/* Sweeping gold light streak */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ left: "-5rem", animation: "announce-sweep 7s ease-in-out 1.5s infinite" }}
          />

          {/* Gold diamond ornaments (desktop) */}
          <div className="absolute inset-y-0 left-4 hidden items-center text-amber-300/80 text-xs lg:flex" aria-hidden="true">
            ◆
          </div>
          <div className="absolute inset-y-0 right-4 hidden items-center text-amber-300/80 text-xs lg:flex" aria-hidden="true">
            ◆
          </div>

          <div className="relative h-8 sm:h-9 flex items-center justify-center px-4">
            {UAE_ANNOUNCEMENTS.map((announcement, idx) => (
              <span
                key={announcement.full}
                aria-hidden={idx !== announcementIndex}
                className={`absolute inset-0 flex items-center justify-center gap-2 text-center px-4 transition-all duration-500 ease-out ${
                  idx === announcementIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1.5 pointer-events-none"
                }`}
              >
                <span className="text-[11px] sm:text-[13px] leading-none" aria-hidden="true">
                  🇦🇪
                </span>
                <span className="whitespace-nowrap md:hidden text-[9.5px] sm:text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-white/95">
                  {announcement.mobile}
                </span>
                <span className="hidden md:inline whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-[0.18em] uppercase text-white/95">
                  {announcement.full}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="2xl:max-w-[1600px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-10">
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
            "w-full opacity-100"
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
