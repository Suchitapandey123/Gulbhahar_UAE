// @ts-nocheck
// src\modules\(gulbhahar)\cart\CartPage.tsx
"use client";

import analyticsAPI from "@/services/analytics/analyticsService";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import { ChevronDown, ChevronUp, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { ColorOption, SizeOption } from "../products/types";
import { getProductImagesForColor } from "@/utils/productImageUtils";


interface CartItem {
  id: string;
  productId: string;
  cartId: string;
  name: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  selectedColorIndex?: number;
  availableColors?: ColorOption[];
  availableSizes?: SizeOption[];
  images?: string[][];
  image?: string[][];
  currentMainImage?: string;
  updatedAt?: string;
}
const MAX_QUANTITY = 10;

const CartPage = () => {
  const {
    cart,
    getCartItemsCount,
    getCartTotal,
    toggleCart,
    removeFromCart,
    updateQuantity,
    updateItemVariant,
    clearCart,
    addToCart,
    isCartOpen,
  } = useCart();
  const router = useRouter();

  const handleNavigateToProduct = (itemId: string) => {
    toggleCart();
    setTimeout(() => {
      router.push(`/collections/${itemId}`);
    }, 200);
  };

  const itemsCount = getCartItemsCount();
  const total = getCartTotal();

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

 useEffect(() => {
  if (isCartOpen) {
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  } else {
    const scrollY = document.body.style.top;

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
  };
}, [isCartOpen]);
  const toggleVariantSelector = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleColorChange = async (
    item: CartItem,
    newColor: string,
    newColorIndex: number,
  ) => {
    try {
      setLoadingItems((prev) => new Set(prev).add(item.id));

      await new Promise((resolve) => setTimeout(resolve, 300));

      removeFromCart(item.id, item.selectedColor, item.selectedSize);

      const updatedItem = {
        ...item,
        selectedColor: newColor,
        selectedColorIndex: newColorIndex,
        currentMainImage:
          item.images?.[newColorIndex]?.[0] ||
          item.image?.[newColorIndex]?.[0],
      };

      await addToCart(updatedItem);
      updateItemVariant(item, updatedItem);
    } catch (error) {
      console.error("Error updating color:", error);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const handleSizeChange = async (item: CartItem, newSize: string) => {
    try {
      setLoadingItems((prev) => new Set(prev).add(item.id));

      await new Promise((resolve) => setTimeout(resolve, 300));

      removeFromCart(item.id, item.selectedColor, item.selectedSize);

      const updatedItem = {
        ...item,
        selectedSize: newSize,
      };

      await addToCart(updatedItem);
    } catch (error) {
      console.error("Error updating size:", error);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const getCurrentImage = (item: CartItem): string | null => {
    let imageUrl: string | null = null;
    // console.log(item)

    if (item.images && Array.isArray(item.images)) {
      if (item.images.length > 0 && Array.isArray(item.images[0])) {
        imageUrl = item.images[0][0];
      }
    }

    if (!imageUrl && item.image && Array.isArray(item.image)) {
      imageUrl = item.image[0][0];
    }

    if (imageUrl && item.updatedAt) {
      return `${imageUrl}?v=${new Date(item.updatedAt).getTime()}`;
    }

    return imageUrl || "/about/lal-ishq-1.jpg";
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[10001]"
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-[100dvh] w-full max-w-md bg-white shadow-xl z-[10002] transform transition-transform duration-300 ease-in-out" style={{ marginRight: 'env(safe-area-inset-right, 0px)' }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Shopping Cart ({itemsCount})
            </h2>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div
          // onWheel={(e)=>e.stopPropagation()}
  className="flex-1 h-full overflow-y-auto p-4 overscroll-contain">
            {cart.length === 0 && loadingItems.size === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Add some products to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Loading placeholders for items being updated */}
                {Array.from(loadingItems).map((loadingId) => (
                  <div
                    key={`loading-${loadingId}`}
                    className="border border-gray-200 rounded-lg"
                  >
                    <div className="flex gap-3 p-3 animate-pulse">
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="flex gap-2 mb-2">
                          <div className="h-6 bg-gray-200 rounded w-16"></div>
                          <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-6 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="px-3 pb-3 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-4 h-4 border-2 border-red-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating item...</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cart items */}
                {cart
                  .filter((item: CartItem) => !loadingItems.has(item.id))
                  .map((item: CartItem) => (
                    <div
                      key={
                        item.cartId ||
                        `${item.id}-${item.selectedColor}-${item.selectedSize}`
                      }
                      className="border border-red-200 rounded-lg"
                    >
                      {/* Main Item Row */}
                      <div className="flex gap-3 p-3">
                        {/* Product Image */}
                        <div
                          onClick={() => handleNavigateToProduct(item.id)}
                          className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          <Image
                            src={item.image || getProductImagesForColor(item.productId, item.images, 0, "cards")[0]?.url || "/about/lal-ishq-1.jpg"}
                            alt={item.name}
                            width={64} 
                            height={64}
                            sizes="64px"
                            loading="lazy"
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div
                            onClick={() => handleNavigateToProduct(item.id)}
                            className="block cursor-pointer"
                          >
                            <h4 className="text-sm font-semibold text-gray-900 truncate hover:text-red-600 transition-colors">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            ₹{item.price.toLocaleString()}
                          </p>

                          {/* Current Variants */}
                          <div className="flex items-center gap-2 mt-1">
                            {item.selectedColor && (
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                Size: {item.selectedSize}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                              
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.selectedColor,
                                  item.selectedSize,
                                )
                              }
                               

                            >
                              -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={() =>{
                                if (item.quantity<MAX_QUANTITY){}
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize,
                                )
                              }}
                               disabled={item.quantity >= MAX_QUANTITY}
                            >
                              +
                            </button>

                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.id,
                                  item.selectedColor,
                                  item.selectedSize,
                                )
                              }
                              className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors ml-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Price and Expand Button */}
                        <div className="text-right flex flex-col justify-between">
                          <p className="text-sm font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>

                          {((item.availableColors && item.availableColors.length > 1) ||
                            (item.availableSizes && item.availableSizes.length > 1)) && (
                              <button
                                onClick={() => toggleVariantSelector(item.id)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-700"
                                title="Change color/size"
                              >
                                {expandedItems.has(item.id) ? (
                                  <ChevronUp size={16} />
                                ) : (
                                  <ChevronDown size={16} />
                                )}
                              </button>
                            )}
                        </div>
                      </div>

                      {/* Expanded Variant Selector */}
                      {expandedItems.has(item.id) && (
                        <div className="px-3 pb-3 border-t border-gray-100 bg-gray-50">
                          {/* Color Selection */}
                          {item.availableColors && item.availableColors.length > 1 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-semibold text-gray-700 mb-2 mt-2">
                                Color: {item.selectedColor}
                              </h5>
                              <div className="flex gap-2 flex-wrap">
                                {item.availableColors.map((color, colorIndex) => {
                                  const colorName =
                                    typeof color === "string"
                                      ? color
                                      : color.name;
                                  return (
                                    <div
                                      key={colorName}
                                      className="flex flex-col items-center gap-1"
                                    >
                                      <button
                                        onClick={() =>
                                          handleColorChange(
                                            item,
                                            colorName,
                                            colorIndex,
                                          )
                                        }
                                        disabled={loadingItems.has(item.id)}
                                        className={`w-8 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${item.selectedColor === colorName
                                            ? "border-red-900 scale-105"
                                            : "border-gray-200 hover:border-gray-400"
                                          } ${loadingItems.has(item.id)
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                          }`}
                                        title={colorName}
                                      >
                                        {item.images &&
                                          item.images[colorIndex] ? (
                                          <Image
                                            src={
                                              item.images[colorIndex][0] ||
                                              "/about/lal-ishq-1.jpg"
                                            }
                                            alt={colorName}
                                            priority
                                            width={32}
                                            height={40}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div
                                            className="w-full h-full flex items-center justify-center text-xs font-medium text-gray-600"
                                            style={{
                                              backgroundColor:
                                                colorName.toLowerCase() ===
                                                  "white"
                                                  ? "#f3f4f6"
                                                  : typeof color === "string"
                                                    ? colorName.toLowerCase()
                                                    : color.hexcode ||
                                                    colorName.toLowerCase(),
                                            }}
                                          >
                                            {colorName.charAt(0)}
                                          </div>
                                        )}
                                      </button>
                                      <span
                                        className={`text-xs font-medium px-1 text-center min-w-0 max-w-[60px] truncate ${item.selectedColor === colorName
                                            ? "text-red-900"
                                            : "text-gray-600"
                                          }`}
                                        title={colorName}
                                      >
                                        {colorName}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Size Selection */}
                          {item.availableSizes && item.availableSizes.length > 1 && (
                            <div>
                              <h5 className="text-xs font-semibold text-gray-700 mb-2">
                                Size: {item.selectedSize}
                              </h5>
                              <div className="flex gap-2 flex-wrap">
                                {item.availableSizes.map((size , idx) => (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      handleSizeChange(item, size.name)
                                    }
                                    disabled={loadingItems.has(item.id)}
                                    className={`px-3 py-1 text-xs border rounded transition-all duration-200 ${item.selectedSize === size.name
                                        ? "border-red-900 bg-red-900 text-white"
                                        : "border-gray-200 hover:border-gray-400 hover:bg-gray-100"
                                      } ${loadingItems.has(item.id)
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                      }`}
                                  >
                                    {size.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                {/* Clear Cart Button */}
                {(cart.length > 0 || loadingItems.size > 0) && (
                  <button
                    onClick={clearCart}
                    disabled={loadingItems.size > 0}
                    className={`w-full py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors ${loadingItems.size > 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                      }`}
                  >
                    Clear All Items
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-red-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={async () => {
                    gaEvent({
                      action: "redirected To checkout page ",
                      params: {
                        First_Product_Name: cart[0].name,
                        Product_Ids: cart.map(
                          (item: CartItem) => item.productId,
                        ),
                      },
                    });
                    fbEvent({
                      action: "InitiateCheckout",
                      params: {
                        First_Product_Name: cart[0].name,
                        content_ids: cart.map(
                          (item: CartItem) => item.productId,
                        ),
                      },
                    });
                    try {
                      await analyticsAPI.trackProceedToCheckout();
                    } catch (error) {
                      console.error(error);
                    }

                    window.location.href = "/cart/checkout";
                  }}
                  className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={toggleCart}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
