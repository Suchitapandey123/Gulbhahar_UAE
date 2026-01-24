import { ChevronDown, LogOut, Package, Settings, User } from "lucide-react";
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
            {userData?.firstName || userData?.name?.split(" ")[0] || "Account"}
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
      absolute right-0 top-[calc(100%+0.5rem)] w-64 bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] 
      rounded-2xl border border-gray-100/50 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
      ${
        isUserDropdownOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-4 pointer-events-none"
      }
    `}
  >
    <div className="p-5 border-b border-gray-100/50">
      <div className="flex items-center space-x-4">
        <ProfileImage
          size="w-12 h-12"
          className="border-2 border-[#800000/10] ring-4 ring-[#800000/5]"
          userData={userData}
          {...props}
        />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-base truncate">
            {userData?.name ||
              `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim()}
          </p>
          <p className="text-xs text-gray-500 truncate font-medium">
            {userData?.email}
          </p>
        </div>
      </div>
    </div>

    <div className="p-2">
      {userMenuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center space-x-3.5 px-4 py-3 text-sm font-medium text-gray-700 
                   hover:text-[#800000] hover:bg-[#800000]/5 rounded-xl transition-all duration-300 group"
          onClick={() => setIsUserDropdownOpen(false)}
        >
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-[#800000]/10">
            <item.icon size={18} />
          </div>
          <span>{item.label}</span>
        </Link>
      ))}

      <div className="my-2 border-t border-gray-100/50 mx-2" />

      <button
        onClick={handleLogout}
        className="flex items-center space-x-3.5 px-4 py-3 text-sm font-semibold text-red-500 
                 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 w-full text-left group"
      >
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center transition-colors group-hover:bg-red-100">
          <LogOut size={18} />
        </div>
        <span>Logout</span>
      </button>
    </div>
  </div>
);

export default UserSection;
