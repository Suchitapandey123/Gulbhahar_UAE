"use client";

import { useState, useEffect, useCallback } from "react";

const CART_STORAGE_KEY = "footwear_cart";
const WISHLIST_STORAGE_KEY = "footwear_wishlist";

export interface CartUtilItem {
  id: string;
  productId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  selected: boolean;
  addedAt: string;
}

export interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

export interface CartTotals {
  totalItems: number;
  selectedItems: number;
  subtotal: number;
  totalQuantity: number;
  selectedQuantity: number;
}

interface ProductInput {
  productId: string;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  images?: unknown;
  [key: string]: unknown;
}

export const cartUtils = {
 getCartItems: (): CartUtilItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) return [];

    const items = JSON.parse(cartData);

    return items.map((item: any) => {
      // ✅ Fix color (main field)
      const fixedColor =
        typeof item.color === "object" && item.color !== null
          ? item.color.name || ""
          : item.color;

      // ✅ Fix selectedColor (if कहीं use ho raha ho)
      const fixedSelectedColor =
        typeof item.selectedColor === "object" && item.selectedColor !== null
          ? item.selectedColor.name || ""
          : item.selectedColor;

      // ✅ Fix availableColors (IMPORTANT 🔥)
      const fixedAvailableColors = item.availableColors?.map((c: any) =>
        typeof c === "string" ? c : c.name
      );

      return {
        ...item,
        color: fixedColor,
        selectedColor: fixedSelectedColor,
        availableColors: fixedAvailableColors,
      };
    });
  } catch {
    return [];
  }
},

  saveCartItems: (items: CartUtilItem[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  },

  addToCart: (
    product: ProductInput,
    size: string,
    color: string,
    quantity = 1
  ): CartUtilItem[] => {
    const cartItems = cartUtils.getCartItems();
    const itemId = `${product.productId}_${size}_${color}`;
    const existingItemIndex = cartItems.findIndex((item) => item.id === itemId);

    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        id: itemId,
        productId: product.productId,
        name: (product.name || product.title || "Product") as string,
        color,
        size,
        price: (product.price as number) || 0,
        image: (() => {
          if (product.image) return product.image as string;
          const imgs = product.images as any;
          if (!imgs?.[0]) return "/default-product.jpg";
          // New format: ProductImages[]
          if (imgs[0]?.files?.[0]?.name && product.productId)
            return `https://cdn.gulbhahar.com/ProductImages/${product.productId}/cards/${imgs[0].files[0].name}.webp`;
          // Old format: string[]
          return typeof imgs[0] === "string" ? imgs[0] : "/default-product.jpg";
        })(),
        quantity,
        selected: false,
        addedAt: new Date().toISOString(),
      });
    }

    cartUtils.saveCartItems(cartItems);
    return cartItems;
  },

  removeFromCart: (itemId: string): CartUtilItem[] => {
    const updatedItems = cartUtils.getCartItems().filter(
      (item) => item.id !== itemId
    );
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  updateQuantity: (itemId: string, newQuantity: number): CartUtilItem[] => {
    const updatedItems = cartUtils.getCartItems().map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  clearCart: (): CartUtilItem[] => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    return [];
  },

  toggleItemSelection: (itemId: string): CartUtilItem[] => {
    const updatedItems = cartUtils.getCartItems().map((item) =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    );
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  toggleSelectAll: (selectAll: boolean): CartUtilItem[] => {
    const updatedItems = cartUtils.getCartItems().map((item) => ({
      ...item,
      selected: selectAll,
    }));
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  getCartTotals: (): CartTotals => {
    const cartItems = cartUtils.getCartItems();
    const selectedItems = cartItems.filter((item) => item.selected);
    return {
      totalItems: cartItems.length,
      selectedItems: selectedItems.length,
      subtotal: selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      selectedQuantity: selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    };
  },

  isInCart: (productId: string, size: string, color: string): boolean => {
    const itemId = `${productId}_${size}_${color}`;
    return cartUtils.getCartItems().some((item) => item.id === itemId);
  },

  getCartItem: (
    productId: string,
    size: string,
    color: string
  ): CartUtilItem | undefined => {
    const itemId = `${productId}_${size}_${color}`;
    return cartUtils.getCartItems().find((item) => item.id === itemId);
  },
};

export const wishlistUtils = {
  getWishlistItems: (): WishlistItem[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveWishlistItems: (items: WishlistItem[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  },

  addToWishlist: (product: ProductInput): WishlistItem[] => {
    const items = wishlistUtils.getWishlistItems();
    if (!items.some((item) => item.productId === product.productId)) {
      items.push({
        productId: product.productId,
        name: (product.name || product.title || "Product") as string,
        price: (product.price as number) || 0,
        image: (() => {
          if (product.image) return product.image as string;
          const imgs = product.images as any;
          if (!imgs?.[0]) return "/default-product.jpg";
          if (imgs[0]?.files?.[0]?.name && product.productId)
            return `https://cdn.gulbhahar.com/ProductImages/${product.productId}/cards/${imgs[0].files[0].name}.webp`;
          return typeof imgs[0] === "string" ? imgs[0] : "/default-product.jpg";
        })(),
        addedAt: new Date().toISOString(),
      });
      wishlistUtils.saveWishlistItems(items);
    }
    return items;
  },

  removeFromWishlist: (productId: string): WishlistItem[] => {
    const updatedItems = wishlistUtils
      .getWishlistItems()
      .filter((item) => item.productId !== productId);
    wishlistUtils.saveWishlistItems(updatedItems);
    return updatedItems;
  },

  toggleWishlist: (
    product: ProductInput
  ): { items: WishlistItem[]; action: "added" | "removed" } => {
    if (wishlistUtils.isInWishlist(product.productId)) {
      return {
        items: wishlistUtils.removeFromWishlist(product.productId),
        action: "removed",
      };
    }
    return { items: wishlistUtils.addToWishlist(product), action: "added" };
  },

  isInWishlist: (productId: string): boolean =>
    wishlistUtils.getWishlistItems().some((item) => item.productId === productId),

  clearWishlist: (): WishlistItem[] => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
    return [];
  },
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartUtilItem[]>([]);
  const [cartTotals, setCartTotals] = useState<CartTotals>({
    totalItems: 0,
    selectedItems: 0,
    subtotal: 0,
    totalQuantity: 0,
    selectedQuantity: 0,
  });

  useEffect(() => {
    setCartItems(cartUtils.getCartItems());
    setCartTotals(cartUtils.getCartTotals());
  }, []);

  useEffect(() => {
    setCartTotals(cartUtils.getCartTotals());
  }, [cartItems]);

  const addToCart = useCallback(
    (product: ProductInput, size: string, color: string, quantity = 1) => {
      const updatedItems = cartUtils.addToCart(product, size, color, quantity);
      setCartItems(updatedItems);
      return updatedItems;
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    const updatedItems = cartUtils.removeFromCart(itemId);
    setCartItems(updatedItems);
    return updatedItems;
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    const updatedItems = cartUtils.updateQuantity(itemId, newQuantity);
    setCartItems(updatedItems);
    return updatedItems;
  }, []);

  const clearCart = useCallback(() => {
    const updatedItems = cartUtils.clearCart();
    setCartItems(updatedItems);
    return updatedItems;
  }, []);

  const toggleItemSelection = useCallback((itemId: string) => {
    const updatedItems = cartUtils.toggleItemSelection(itemId);
    setCartItems(updatedItems);
    return updatedItems;
  }, []);

  const toggleSelectAll = useCallback(() => {
    const allSelected = cartItems.every((item) => item.selected);
    const updatedItems = cartUtils.toggleSelectAll(!allSelected);
    setCartItems(updatedItems);
    return updatedItems;
  }, [cartItems]);

  return {
    cartItems,
    cartTotals,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleItemSelection,
    toggleSelectAll,
    isInCart: cartUtils.isInCart,
    getCartItem: cartUtils.getCartItem,
  };
};

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlistItems(wishlistUtils.getWishlistItems());
  }, []);

  const addToWishlist = useCallback((product: ProductInput) => {
    const updatedItems = wishlistUtils.addToWishlist(product);
    setWishlistItems(updatedItems);
    return updatedItems;
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    const updatedItems = wishlistUtils.removeFromWishlist(productId);
    setWishlistItems(updatedItems);
    return updatedItems;
  }, []);

  const toggleWishlist = useCallback((product: ProductInput) => {
    const result = wishlistUtils.toggleWishlist(product);
    setWishlistItems(result.items);
    return result;
  }, []);

  const clearWishlist = useCallback(() => {
    const updatedItems = wishlistUtils.clearWishlist();
    setWishlistItems(updatedItems);
    return updatedItems;
  }, []);

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist: wishlistUtils.isInWishlist,
  };
};
