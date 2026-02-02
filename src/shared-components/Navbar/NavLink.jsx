import { ChevronDown } from "lucide-react";

const NavLink = ({
  href,
  children,
  hasDropdown = false,
  className = "",
  isScrolled,
  isNavSolid,
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
              ? `${isNavSolid ? "text-[#800000]" : "text-white"} scale-105`
              : `${
                  isNavSolid
                    ? "text-gray-800 hover:text-[#800000]"
                    : "text-white/90 hover:text-white"
                } hover:scale-105`
          }
        `}
        onClick={handleClick}
      >
        <span className="relative z-10 flex items-center group-hover:scale-105 transition-transform duration-500">
          {children}
          {hasDropdown && (
            <ChevronDown
              size={14}
              className={`ml-1.5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isActive
                  ? "rotate-180 text-[#800000]"
                  : "group-hover:text-[#800000]"
              }`}
            />
          )}
        </span>
      </button>
    </div>
  );
};

export default NavLink;
