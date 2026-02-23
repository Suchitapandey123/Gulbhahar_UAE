import { ShoppingBag } from "lucide-react";

const CartButton = ({
  toggleCart,
  isCartOpen,
  pathname,
  isScrolled,
  isNavSolid,
  itemsCount,
  isMobile = false,
}) => (
  <button
    onClick={toggleCart}
    className={`
      ${isMobile ? "p-1.5 mr-1" : ""} flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm font-semibold
      uppercase tracking-wide transition-all duration-300 ease-out group relative
      transform hover:scale-110 active:scale-95
      ${
        isCartOpen || pathname === "/cart"
          ? `${isNavSolid ? "text-[#800000]" : "text-white"} scale-105`
          : `${
              isNavSolid
                ? "text-gray-800 hover:text-[#800000]"
                : "text-white/90 hover:text-white"
            } hover:scale-105`
      }
    `}
  >
    <div className="relative">
      <ShoppingBag 
        size={isMobile ? 16 : 16} 
        className={`${isMobile ? "sm:hidden" : ""} group-hover:scale-110 transition-transform duration-300`} 
      />
      {isMobile && <ShoppingBag size={18} className="hidden sm:block" />}
      {itemsCount > 0 && (
        <span className={`absolute ${isMobile ? "-top-1 -right-1" : "-top-2 -right-2"} bg-red-900 text-white text-xs rounded-full ${isMobile ? "h-4 w-4" : "h-5 w-5"} flex items-center justify-center font-bold animate-pulse text-[10px]`}>
          {itemsCount > (isMobile ? 9 : 99) ? `${isMobile ? 9 : 99}+` : itemsCount}
        </span>
      )}
    </div>
    {!isMobile && <span className="hidden lg:inline">Cart</span>}
  </button>
);

export default CartButton;