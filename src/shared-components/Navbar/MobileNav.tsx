// @ts-nocheck
import { Menu, X, Search, User, LogOut, Settings } from "lucide-react";
import ProfileImage from "./ProfileImage";
import CartButton from "./CartButton";

const MobileNav = ({
  isMenuOpen,
  toggleMenu,
  isScrolled,
  isNavSolid,
  pathname,
  isAuthenticated,
  userData,
  handleLogin,
  toggleSearchPopup,
  toggleCart,
  itemsCount,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  router,
  handleLogout,
  ...props
}) => {
  const userMenuItems = [
    { icon: User, label: "My Profile", href: "/account/account-centre/profile" },
    { icon: User, label: "My Orders", href: "/account/account-centre/my-order" },
    { icon: Settings, label: "Settings", href: "/account/account-centre/settings" },
  ];

  return (
    <>
    {/* Mobile Menu Toggle */}
    

      
      {/* Mobile Right Side Icons */}
      <div className="flex items-center space-x-1 sm:space-x-2 md:hidden">
        {/* <button
          onClick={toggleSearchPopup}
          className={`p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isNavSolid
              ? "text-gray-800 hover:text-[#800000]"
              : "text-white hover:text-white/80"
          }`}
        >
          <Search size={16} className="sm:hidden" />
          <Search size={18} className="hidden sm:block" />
        </button> */}

        {isAuthenticated ? (
          <MobileUserButton
            {...props}
            isScrolled={isScrolled}
            isNavSolid={isNavSolid}
            pathname={pathname}
            userData={userData}
            isUserDropdownOpen={isUserDropdownOpen}
            setIsUserDropdownOpen={setIsUserDropdownOpen}
            router={router}
            userMenuItems={userMenuItems}
            handleLogout={handleLogout}
            toggleMenu={toggleMenu}
          />
        ) : (
          <button
            onClick={handleLogin}
            className={`p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isNavSolid
                ? "text-gray-800 hover:text-[#800000]"
                : "text-white hover:text-white/80"
            }`}
          >
            <User size={16} className="sm:hidden" />
            <User size={18} className="hidden sm:block" />
          </button>
        )}

        <CartButton
          {...props}
          isScrolled={isScrolled}
          isNavSolid={isNavSolid}
          pathname={pathname}
          itemsCount={itemsCount}
          toggleCart={toggleCart}
          isMobile={true}
        />
      </div>
    </>
  );
};

// Mobile User Button Component
const MobileUserButton = ({
  isScrolled,
  isNavSolid,
  pathname,
  userData,
  isUserDropdownOpen,
  setIsUserDropdownOpen,
  router,
  userMenuItems,
  handleLogout,
  toggleMenu,
  ...props
}) => (
  <div className="relative">
    <button
      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
      className={`p-1 sm:p-1.5 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
        isNavSolid
          ? "text-gray-800 hover:text-[#800000]"
          : "text-white hover:text-white/80"
      }`}
    >
      <ProfileImage
        size="w-6 h-6 sm:w-7 sm:h-7"
        className="border border-current/20"
        userData={userData}
        {...props}
      />
    </button>

    {/* Mobile User Dropdown */}
    <div
  className={`absolute right-0 z-[9999] top-full mt-2 w-64 sm:w-72 
              bg-white/95 backdrop-blur-md shadow-2xl rounded-lg border border-gray-100 
              transition-all duration-300 ease-out
              ${isUserDropdownOpen 
                ? "opacity-100 visible translate-y-0 "
                : "opacity-0 invisible -translate-y-2"
              }`}
>
      <div className="p-3 sm:p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <ProfileImage
            size="w-10 h-10 sm:w-12 sm:h-12"
            className="border-2 border-gray-200"
            userData={userData}
            {...props}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
              {userData?.name || `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim()}
            </p>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {userData?.email}
            </p>
            {userData?.userId && (
              <p className="text-xs text-gray-500 truncate">
                {/* ID: {userData.userId} */}
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
  className="flex items-center space-x-3 px-3 sm:px-4 py-2.5 
             text-sm sm:text-base text-red-600 
             hover:text-red-700 hover:bg-red-50 
             transition-all duration-200 cursor-pointer"
>
  <LogOut size={16} className="sm:w-5 sm:h-5" />
  <span>Logout</span>
</div>

      </div>
    </div>
  </div>
);

export default MobileNav;
