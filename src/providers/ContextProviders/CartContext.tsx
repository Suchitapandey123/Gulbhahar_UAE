"use client";

import analyticsService from "@/services/analytics/analyticsService";
import { trackVisitorEvent } from "@/services/analytics/journeyService";
import { fbEvent } from "@/utils/fb/metaPixels";
import { gaEvent } from "@/utils/gtm/gtag";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, CartProduct, CartContextValue, AddToCartResult } from "@/types";

const CartContext = createContext<CartContextValue | null>(null);

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const getCartId = (item: {
  productId?: string;
  id?: string;
  selectedColor?: string;
  colors?: string[];
  selectedSize?: string;
  sizes?: string[];
}) =>
  `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || "default"}-${item.selectedSize || item.sizes?.[0] || "default"}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shopping-cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("shopping-cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = async (product: CartProduct): Promise<AddToCartResult> => {
    try {
      const standardizedCartId = getCartId(product as CartItem);
      setAddingToCart(product.productId || product.id || null);

      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => getCartId(item) === standardizedCartId
        );

        if (existingItem) {
          return prevCart.map((item) =>
            getCartId(item) === standardizedCartId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          const newCartItem: CartItem = {
            ...product,
            quantity: 1,
            cartId: standardizedCartId,
            id: product.productId || product.id || "",
            productId: product.productId || product.id || "",
            name: product.name,
            price: product.price,
            selectedColor:
              product.selectedColor || product.colors?.[0] || "default",
            selectedSize:
              product.selectedSize || product.sizes?.[0] || "default",
            addedAt: new Date().toISOString(),
          };
          return [...prevCart, newCartItem];
        }
      });

      gaEvent({
        action: "Added to Cart",
        params: {
          Product_Name: product.name,
          Product_Id: product.productId,
        },
      });

      fbEvent({
        action: "AddToCart",
        params: {
          content_name: product.name,
          content_ids: [product.productId],
          content_type: "juttis",
        },
      });

      try {
        await analyticsService.trackAddToCart(
          (product.productId || product.id) as string
        );
      } catch {
        // Analytics errors should not affect cart functionality
      }

      trackVisitorEvent("ADD_TO_CART", {
        productId: product.productId || product.id,
        productName: product.name,
        color: product.selectedColor || product.colors?.[0],
        size: product.selectedSize || product.sizes?.[0],
        quantity: 1,
      });

      return {
        success: true,
        message: `${product.name}${product.selectedSize ? ` (${product.selectedSize})` : ""}${product.selectedColor ? ` (${product.selectedColor})` : ""} added to cart!`,
      };
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false, message: "Failed to add item to cart" };
    } finally {
      setAddingToCart(null);
    }
  };

  const removeFromCart = (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    const targetCartId = `${productId}-${selectedColor || "default"}-${selectedSize || "default"}`;
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => getCartId(item) === targetCartId);
      if (removedItem) {
        trackVisitorEvent("REMOVE_FROM_CART", {
          productId: removedItem.productId || removedItem.id,
          productName: removedItem.name,
          color: removedItem.selectedColor,
          size: removedItem.selectedSize,
          quantity: removedItem.quantity,
        });
      }
      return prevCart.filter((item) => getCartId(item) !== targetCartId);
    });
  };

  const updateQuantity = (
    productId: string,
    newQuantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    const targetCartId = `${productId}-${selectedColor || "default"}-${selectedSize || "default"}`;
    setCart((prevCart) =>
      prevCart.map((item) =>
        getCartId(item) === targetCartId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const updateItemVariant = (
    oldItem: CartItem,
    newVariant: Partial<CartItem>
  ) => {
    setCart((prevCart) => {
      const oldCartId = getCartId(oldItem);
      const newVariantFull = { ...oldItem, ...newVariant };
      const newCartId = getCartId(newVariantFull);

      const existingIndex = prevCart.findIndex(
        (item) => getCartId(item) === newCartId
      );

      let updatedCart: CartItem[];

      if (existingIndex !== -1) {
        updatedCart = prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + oldItem.quantity }
            : item
        );
      } else {
        updatedCart = prevCart.map((item) =>
          getCartId(item) === oldCartId
            ? { ...item, ...newVariant }
            : item
        );
      }

      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => setCart([]);

  const cleanupDuplicates = () => {
    setCart((prevCart) => {
      const uniqueItems: CartItem[] = [];
      const seenIds = new Set<string>();

      prevCart.forEach((item) => {
        const standardId = getCartId(item);
        if (!seenIds.has(standardId)) {
          seenIds.add(standardId);
          uniqueItems.push({
            ...item,
            cartId: standardId,
            id: item.productId || item.id || "",
            productId: item.productId || item.id || "",
          });
        } else {
          const existingIndex = uniqueItems.findIndex(
            (existing) => getCartId(existing) === standardId
          );
          if (existingIndex !== -1) {
            uniqueItems[existingIndex].quantity += item.quantity;
          }
        }
      });

      return uniqueItems;
    });
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getCartItemsCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const value: CartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemVariant,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    addingToCart,
    isCartOpen,
    setIsCartOpen,
    cleanupDuplicates,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
