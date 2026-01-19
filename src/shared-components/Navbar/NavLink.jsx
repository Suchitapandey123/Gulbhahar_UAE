
import { ChevronDown } from "lucide-react";

const NavLink = ({
  href,
  children,
  hasDropdown = false,
  className = "",
  isScrolled,
  pathname,
  router,
  isActive,
  dropdownRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const handleClick = (e) => {
    if (hasDropdown && onClick) {
      onClick(e);
    } else {
      router.push(href);
    }
  };

  return (
    <div
      className={`relative group ${className}`}
      ref={hasDropdown ? dropdownRef : null}
      onMouseEnter={hasDropdown ? onMouseEnter : undefined}
      onMouseLeave={hasDropdown ? onMouseLeave : undefined}
    >
      <button
        className={`
          relative flex items-center px-3 lg:px-4 py-2 font-semibold text-xs sm:text-sm 
          uppercase tracking-wide transition-all duration-300 ease-out
          ${
            isActive
              ? `${isScrolled || pathname !== "/" ? "text-[#800000]" : "text-white"} scale-105`
              : `${
                  isScrolled || pathname !== "/"
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white/90 hover:text-white"
                } hover:scale-105`
          }
        `}
        onClick={handleClick}
      >
        <span className="relative z-10 flex items-center">
          {children}
          {hasDropdown && (
            <ChevronDown
              size={14}
              className={`ml-1 lg:ml-2 transition-all duration-300 ease-out ${
                isActive ? "rotate-180" : ""
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
        />
      </button>
    </div>
  );
};

export default NavLink;