import { LogOut, Package, Settings, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import MobileNavigationLinks from "./MobileNavigationLinks";
import MobileUserSection from "./MobileUserSection";

const MobileMenuSidebar = ({
  isMenuOpen,
  toggleMenu,
  isAuthenticated,
  userData,
  router,
  handleLogin,
  handleLogout,
  openCategoryIndex,
  setOpenCategoryIndex,
  ...props
}) => {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  const collectionCategoriesForMobile = [
    {
      title: "Collections",
      subtitle: "Luxury Edition",
      items: [
        {
          name: "Juttis",
          slug: "/collections/juttis",
        },
        {
          name: "Punjabi Juttis",
          slug: "/collections/punjabi-juttis",
        },
        {
          name: "Bridal Juttis",
          slug: "/collections/bridal-juttis",
        },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies",
        },
        {
          name: "Juttis For Women",
          slug: "/collections/juttis-for-women",
        },
      ],
    },
  ];

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

  const toggleCategory = (index) => {
    setOpenCategoryIndex((prev) => (prev === index ? null : index));
  };

  const handleCategoryClick = (category) => {
    router.push(`/collections/`);
    toggleMenu();
  };

  const handleViewAllCollections = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    router.push("/collections");
    toggleMenu();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          md:hidden fixed inset-y-0 left-0 z-[10001] 
          w-[280px] xs:w-[300px] sm:w-80 bg-white shadow-xl
          transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b border-gray-100">
            <div className="w-[70%] flex">
              <Image
                src="/ful-gulbhaharlogo.png"
                alt="Brand Logo"
                width={80}
                height={24}
                priority
                className="h-[38px] xs:h-[38px] w-full sm:h-8"
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
          <div className="flex-1 overflow-y-auto overscroll-contain p-3 xs:p-4 sm:p-6">
            <div className="space-y-3 xs:space-y-4 sm:space-y-6">
              {/* User Account Section */}
              {isAuthenticated && (
                <MobileUserSection
                  userData={userData}
                  userMenuItems={userMenuItems}
                  router={router}
                  toggleMenu={toggleMenu}
                  {...props}
                />
              )}

              {/* Navigation Links */}
              <MobileNavigationLinks
                collectionCategoriesForMobile={collectionCategoriesForMobile}
                openCategoryIndex={openCategoryIndex}
                toggleCategory={toggleCategory}
                handleCategoryClick={handleCategoryClick}
                handleViewAllCollections={handleViewAllCollections}
                toggleMenu={toggleMenu}
                router={router}
              />
            </div>
          </div>

          {/* Mobile Menu Footer */}
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

export default MobileMenuSidebar;
