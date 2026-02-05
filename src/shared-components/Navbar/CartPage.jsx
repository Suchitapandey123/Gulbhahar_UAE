"use client";

import analyticsAPI from "@/app/api/analytics/analytics";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import { ChevronDown, ChevronUp, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  } = useCart();
  const router = useRouter();

  const handleNavigateToProduct = (itemId) => {
    // Close the cart first
    toggleCart();
    // Small delay to allow cart closing animation, then navigate
    setTimeout(() => {
      router.push(`/collections/${itemId}`);
    }, 200); // Adjust delay as needed for your animation
  };

  const itemsCount = getCartItemsCount();
  const total = getCartTotal();

  // State for managing expanded variant selectors
  const [expandedItems, setExpandedItems] = useState(new Set());
  // State for managing loading items during variant changes
  const [loadingItems, setLoadingItems] = useState(new Set());

  // Toggle variant selector for an item
  const toggleVariantSelector = (itemId) => {
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

  // Handle color change with loading state
  const handleColorChange = async (item, newColor, newColorIndex) => {

    try {
      // Set loading state
      setLoadingItems((prev) => new Set(prev).add(item.id));

      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Remove the current item
      removeFromCart(item.id, item.selectedColor, item.selectedSize);

      // Add the same item with new color
      const updatedItem = {
        ...item,
        selectedColor: newColor,
        selectedColorIndex: newColorIndex,
        // Update the main image to the new color's first image
        currentMainImage:
          item.images?.[newColorIndex]?.[0] || item.image?.[newColorIndex]?.[0],
      };

      // Add back with new color
      await addToCart(updatedItem);
      updateItemVariant(item, updatedItem);
    } catch (error) {
      console.error("❌ Error updating color:", error);
    } finally {
      // Remove loading state
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  // Handle size change with loading state
  const handleSizeChange = async (item, newSize) => {


    try {
      setLoadingItems((prev) => new Set(prev).add(item.id));

      await new Promise((resolve) => setTimeout(resolve, 300));

      // ✅ remove old variant using color + size
      removeFromCart(item.id, item.selectedColor, item.selectedSize);

      // ✅ then add updated one
      const updatedItem = {
        ...item,
        selectedSize: newSize,
      };

      await addToCart(updatedItem);

    } catch (error) {
      console.error("❌ Error updating size:", error);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  // Get the current image for display with cache-busting
  const getCurrentImage = (item) => {
    let imageUrl = null;

    // Check if it's images (plural) - array of arrays
    if (item.images && Array.isArray(item.images)) {
      if (item.images.length > 0 && Array.isArray(item.images[0])) {
        imageUrl = item.images[0][0]; // First image from first array
      }
    }

    // Check if it's image (singular) - single array
    if (!imageUrl && item.image && Array.isArray(item.image)) {
      imageUrl = item.image[0][0]; // First image from array
    }

    // Add cache-busting parameter if we have an image and updatedAt
    if (imageUrl && item.updatedAt) {
      return `${imageUrl}?v=${new Date(item.updatedAt).getTime()}`;
    }

    return imageUrl;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[10001]"
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className="fixed mt-[88px] right-0 top-0 h-[calc(100%-88px)] w-full max-w-md bg-white shadow-xl z-[10002] transform transition-transform duration-300 ease-in-out">
        <div className="flex  flex-col h-full">
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
          <div className="flex-1 overflow-y-auto p-4">
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
                {/* Show loading placeholders for items being updated */}
                {Array.from(loadingItems).map((loadingId) => (
                  <div
                    key={`loading-${loadingId}`}
                    className="border border-gray-200 rounded-lg"
                  >
                    <div className="flex gap-3 p-3 animate-pulse">
                      {/* Loading Image */}
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>

                      {/* Loading Content */}
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

                      {/* Loading Price */}
                      <div className="text-right">
                        <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>

                    {/* Loading indicator */}
                    <div className="px-3 pb-3 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-4 h-4 border-2 border-red-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating item...</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show actual cart items (excluding those being updated) */}
                {cart
                  .filter((item) => !loadingItems.has(item.id))
                  .map((item) => (
                    <div
                      key={
                        item.cartId ||
                        `${item.id}-${item.selectedColor}-${item.selectedSize}`
                      } // ✅ unique key
                      className="border border-red-200 rounded-lg"
                    >
                      {/* Main Item Row */}
                      <div className="flex gap-3 p-3">
                        {/* Product Image - Clickable */}
                        <div
                          onClick={() => handleNavigateToProduct(item.id)}
                          className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          <Image
                            src={getCurrentImage(item)}
                            alt={item.name}
                            width={64}
                            height={64}
                            quality={60}
                            sizes="64px"
                            loading="lazy"
                            unoptimized={false}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          {/* Product Name - Clickable */}
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

                          {/* Current Variants Display */}
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
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize,
                                )
                              }
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

                          {/* Toggle Variant Selector Button */}
                          {((item.colors && item.colors.length > 1) ||
                            (item.sizes && item.sizes.length > 1)) && (
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
                          {item.colors && item.colors.length > 1 && (
                            <div className="mb-3">
                              <h5 className="text-xs font-semibold text-gray-700 mb-2 mt-2">
                                Color: {item.selectedColor}
                              </h5>
                              <div className="flex gap-2 flex-wrap">
                                {item.colors.map((color, colorIndex) => (
                                  <div
                                    key={color}
                                    className="flex flex-col items-center gap-1"
                                  >
                                    <button
                                      onClick={() =>
                                        handleColorChange(
                                          item,
                                          color,
                                          colorIndex,
                                        )
                                      }
                                      disabled={loadingItems.has(item.id)}
                                      className={`w-8 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                                        item.selectedColor === color
                                          ? "border-red-900 scale-105"
                                          : "border-gray-200 hover:border-gray-400"
                                      } ${
                                        loadingItems.has(item.id)
                                          ? "opacity-50 cursor-not-allowed"
                                          : ""
                                      }`}
                                      title={color}
                                    >
                                      {item.images &&
                                      item.images[colorIndex] ? (
                                        <Image
                                          src={
                                            item.images[colorIndex][0] ||
                                            "/about/lal-ishq-1.jpg"
                                          }
                                          alt={color}
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
                                              color.toLowerCase() === "white"
                                                ? "#f3f4f6"
                                                : color.toLowerCase(),
                                          }}
                                        >
                                          {color.charAt(0)}
                                        </div>
                                      )}
                                    </button>
                                    {/* Color Name */}
                                    <span
                                      className={`text-xs font-medium px-1 text-center min-w-0 max-w-[60px] truncate ${
                                        item.selectedColor === color
                                          ? "text-red-900"
                                          : "text-gray-600"
                                      }`}
                                      title={color}
                                    >
                                      {color}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Size Selection */}
                          {item.sizes && item.sizes.length > 1 && (
                            <div>
                              <h5 className="text-xs font-semibold text-gray-700 mb-2">
                                Size: {item.selectedSize}
                              </h5>
                              <div className="flex gap-2 flex-wrap">
                                {item.sizes.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => handleSizeChange(item, size)}
                                    disabled={loadingItems.has(item.id)}
                                    className={`px-3 py-1 text-xs border rounded transition-all duration-200 ${
                                      item.selectedSize === size
                                        ? "border-red-900 bg-red-900 text-white"
                                        : "border-gray-200 hover:border-gray-400 hover:bg-gray-100"
                                    } ${
                                      loadingItems.has(item.id)
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                  >
                                    {size}
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
                    className={`w-full py-2 text-sm text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors ${
                      loadingItems.size > 0
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
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-red-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2">
                <button
                  onClick={async () => {
                    gaEvent({
                      action: "redirected To checkout page ",
                      params: {
                        First_Product_Name: cart[0].name,
                        Product_Ids: cart.map((item) => item.productId),
                      },
                    });
                    fbEvent({
                      action: "InitiateCheckout",
                      params: {
                        First_Product_Name: cart[0].name,
                        content_ids: cart.map((item) => item.productId),
                      },
                    });

                    try {
                      const res = await analyticsAPI.trackProceedToCheckout();
          
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
