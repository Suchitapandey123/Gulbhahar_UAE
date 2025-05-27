import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

// Mock usePathname hook for demo
const usePathname = () => '/account/account-centre/my-order';

const Breadcrumb = () => {
  const pathname = usePathname();

  // Paths where "Home" should be hidden
  const isExcludedFlow =
    pathname.includes("/cart") ||
    pathname.includes("/checkout") ||
    pathname.includes("/payment") ||
    pathname.includes("/transaction") ||
    pathname.includes("/account") ||
    pathname.includes("/profile") ||
    pathname.includes("/settings") ||
    pathname.includes("/Wishlist") ||
    pathname.includes("/Security") ||
    pathname.includes("/my-order");

  const generateBreadcrumbs = () => {
    const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
    return segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      path: `/${segments.slice(0, index + 1).join("/")}`,
    }));
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="bg-white px-2 xs:px-3 sm:px-4 py-2 xs:py-3 sm:py-4 border-b border-gray-200">
      <div className="flex items-center text-xs xs:text-sm overflow-x-auto whitespace-nowrap">
        {/* Home link */}
        {!isExcludedFlow && (
          <>
            <a 
              href="/" 
              className="flex items-center gap-1 xs:gap-2 text-gray-600 hover:text-red-900 transition-colors"
            >
              <Home size={14} className="xs:w-4 xs:h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Home</span>
            </a>
            {breadcrumbs.length > 0 && (
              <ChevronRight size={14} className="text-gray-400 mx-1 xs:mx-2 flex-shrink-0" />
            )}
          </>
        )}

        {breadcrumbs.map((item, index) => {
          const isLastItem = index === breadcrumbs.length - 1;

          return (
            <div key={item.path} className="flex items-center">
              {/* Arrow separator */}
              {index > 0 && (
                <ChevronRight size={14} className="text-gray-400 mx-1 xs:mx-2 flex-shrink-0" />
              )}
              
              <a
                href={item.path}
                className={`
                  px-1 xs:px-2 py-1 rounded transition-colors truncate
                  ${isLastItem 
                    ? "text-red-900 font-medium" 
                    : "text-gray-600 hover:text-red-900"
                  }
                `}
              >
                {item.label}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;