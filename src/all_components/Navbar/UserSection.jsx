
import { User, LogOut, Settings, Package, ChevronDown } from "lucide-react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";

const UserSection = ({
  isAuthenticated,
  userData,
  isScrolled,
  pathname,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  userDropdownRef,
  userHoverTimeoutRef,
  handleLogin,
  handleLogout,
  ...props
}) => {
  const userMenuItems = [
    { icon: User, label: "My Profile", href: "/account/account-centre/profile" },
    { icon: Package, label: "My Orders", href: "/account/account-centre/my-order" },
    { icon: Settings, label: "Settings", href: "/account/account-centre/settings" },
  ];

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

  if (isAuthenticated) {
    return (
      <div
        className="relative"
        ref={userDropdownRef}
        onMouseEnter={handleUserMouseEnter}
        onMouseLeave={handleUserMouseLeave}
      >
        <button
          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          className={`
            flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold 
            uppercase tracking-wide transition-all duration-300 ease-out group
            ${
              isUserDropdownOpen ||
              pathname.startsWith("/profile") ||
              pathname.startsWith("/orders") ||
              pathname.startsWith("/settings")
                ? `${isScrolled || pathname !== "/" ? "text-[#800000]" : "text-white"} scale-105`
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
            userData={userData}
            {...props}
          />
          <span className="hidden lg:inline">
            {userData?.firstName || userData.name.split(" ")[0] || "Acc"}
          </span>
          <ChevronDown
            size={12}
            className={`ml-1 transition-all duration-300 ease-out ${
              isUserDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <UserDropdown
          isUserDropdownOpen={isUserDropdownOpen}
          userData={userData}
          userMenuItems={userMenuItems}
          setIsUserDropdownOpen={setIsUserDropdownOpen}
          handleLogout={handleLogout}
          {...props}
        />
      </div>
    );
  }

  return (
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
  );
};

const UserDropdown = ({
  isUserDropdownOpen,
  userData,
  userMenuItems,
  setIsUserDropdownOpen,
  handleLogout,
  ...props
}) => (
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
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <ProfileImage
          size="w-10 h-10"
          className="border-2 border-gray-200"
          userData={userData}
          {...props}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {userData?.name || `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim()}
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
);

export default UserSection;
