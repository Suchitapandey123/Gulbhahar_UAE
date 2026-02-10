import { Search } from "lucide-react";
import CartButton from "./CartButton";
import Logo from "./Logo";
import NavLink from "./NavLink";
import UserSection from "./UserSection";

const DesktopNav = ({
  isScrolled,
  isNavSolid,
  pathname,
  router,
  isCollectionDropdownOpen,
  isHoverMode,
  isSearchOpen,
  toggleSearchPopup,
  dropdownRef,
  hoverTimeoutRef,
  setIsCollectionDropdownOpen,
  setIsHoverMode,
  ...props
}) => {
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
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = setTimeout(() => {
        setIsCollectionDropdownOpen(false);
      }, 150);
    }
  };

  return (
    <>
      {/* Left Navigation */}
      <div className="hidden md:flex items-center space-x-2 lg:space-x-12">
        <NavLink
          href="/collections"
          hasDropdown={true}
          isScrolled={isScrolled}
          isNavSolid={isNavSolid}
          pathname={pathname}
          router={router}
          isActive={
            isCollectionDropdownOpen || pathname.startsWith("/collections")
          }
          dropdownRef={dropdownRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCollectionClick}
        >
          Collections
        </NavLink>
        <NavLink
          href="/about"
          isScrolled={isScrolled}
          isNavSolid={isNavSolid}
          pathname={pathname}
          router={router}
          isActive={pathname === "/about"}
        >
          About
        </NavLink>
      </div>
      <Logo
        isScrolled={isScrolled}
        isNavSolid={isNavSolid}
        pathname={pathname}
      />

      {/* Right Navigation */}
      <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
        <SearchButton
          isNavSolid={isNavSolid}
          isSearchOpen={isSearchOpen}
          toggleSearchPopup={toggleSearchPopup}
        />
        <CartButton
          {...props}
          isScrolled={isScrolled}
          isNavSolid={isNavSolid}
          pathname={pathname}
        />
        <UserSection
          {...props}
          isScrolled={isScrolled}
          isNavSolid={isNavSolid}
          pathname={pathname}
        />
      </div>
    </>
  );
};

const SearchButton = ({ isNavSolid, isSearchOpen, toggleSearchPopup }) => (
  <button
    onClick={toggleSearchPopup}
    className={`
      flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold
      uppercase tracking-wide transition-all duration-300 ease-out group
      ${
        isSearchOpen
          ? `${isNavSolid ? "text-[#800000]" : "text-white"} scale-105`
          : `${
              isNavSolid
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
);

export default DesktopNav;
