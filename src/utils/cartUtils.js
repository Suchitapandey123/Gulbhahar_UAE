
"use client"
const CART_STORAGE_KEY = 'footwear_cart';
const WISHLIST_STORAGE_KEY = 'footwear_wishlist';

export const cartUtils = {
  // Get all cart items from localStorage
  getCartItems: () => {
    if (typeof window === 'undefined') return [];
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  // Save cart items to localStorage
  saveCartItems: (items) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  // Add item to cart
  addToCart: (product, size, color, quantity = 1) => {
    const cartItems = cartUtils.getCartItems();
    
    // Create unique item ID based on product, size, and color
    const itemId = `${product.productId}_${size}_${color}`;
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem = {
        id: itemId,
        productId: product.productId,
        name: product.name || product.title || 'Product',
        color: color,
        size: size,
        price: product.price || 0,
        image: product.image || product.images?.[0] || '/default-product.jpg',
        quantity: quantity,
        selected: false,
        addedAt: new Date().toISOString()
      };
      cartItems.push(newItem);
    }
    
    cartUtils.saveCartItems(cartItems);
    return cartItems;
  },

  // Remove item from cart
  removeFromCart: (itemId) => {
    const cartItems = cartUtils.getCartItems();
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  // Update item quantity
  updateQuantity: (itemId, newQuantity) => {
    const cartItems = cartUtils.getCartItems();
    const updatedItems = cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  // Clear entire cart
  clearCart: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    return [];
  },

  // Toggle item selection
  toggleItemSelection: (itemId) => {
    const cartItems = cartUtils.getCartItems();
    const updatedItems = cartItems.map(item =>
      item.id === itemId 
        ? { ...item, selected: !item.selected }
        : item
    );
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  // Select/deselect all items
  toggleSelectAll: (selectAll) => {
    const cartItems = cartUtils.getCartItems();
    const updatedItems = cartItems.map(item => ({
      ...item,
      selected: selectAll
    }));
    cartUtils.saveCartItems(updatedItems);
    return updatedItems;
  },

  // Get cart totals
  getCartTotals: () => {
    const cartItems = cartUtils.getCartItems();
    const selectedItems = cartItems.filter(item => item.selected);
    
    return {
      totalItems: cartItems.length,
      selectedItems: selectedItems.length,
      subtotal: selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      totalQuantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      selectedQuantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  // Check if product is in cart
  isInCart: (productId, size, color) => {
    const cartItems = cartUtils.getCartItems();
    const itemId = `${productId}_${size}_${color}`;
    return cartItems.some(item => item.id === itemId);
  },

  // Get specific cart item
  getCartItem: (productId, size, color) => {
    const cartItems = cartUtils.getCartItems();
    const itemId = `${productId}_${size}_${color}`;
    return cartItems.find(item => item.id === itemId);
  }
};

// Wishlist utilities (similar structure)
export const wishlistUtils = {
  // Get wishlist items from localStorage
  getWishlistItems: () => {
    if (typeof window === 'undefined') return [];
    try {
      const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return wishlistData ? JSON.parse(wishlistData) : [];
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
      return [];
    }
  },

  // Save wishlist items to localStorage
  saveWishlistItems: (items) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  },

  // Add item to wishlist
  addToWishlist: (product) => {
    const wishlistItems = wishlistUtils.getWishlistItems();
    
    // Check if item already exists
    const existingItemIndex = wishlistItems.findIndex(item => item.productId === product.productId);
    
    if (existingItemIndex === -1) {
      // Add new item
      const newItem = {
        productId: product.productId,
        name: product.name || product.title || 'Product',
        price: product.price || 0,
        image: product.image || product.images?.[0] || '/default-product.jpg',
        addedAt: new Date().toISOString()
      };
      wishlistItems.push(newItem);
      wishlistUtils.saveWishlistItems(wishlistItems);
    }
    
    return wishlistItems;
  },

  // Remove item from wishlist
  removeFromWishlist: (productId) => {
    const wishlistItems = wishlistUtils.getWishlistItems();
    const updatedItems = wishlistItems.filter(item => item.productId !== productId);
    wishlistUtils.saveWishlistItems(updatedItems);
    return updatedItems;
  },

  // Toggle wishlist status
  toggleWishlist: (product) => {
    const isInWishlist = wishlistUtils.isInWishlist(product.productId);
    
    if (isInWishlist) {
      return {
        items: wishlistUtils.removeFromWishlist(product.productId),
        action: 'removed'
      };
    } else {
      return {
        items: wishlistUtils.addToWishlist(product),
        action: 'added'
      };
    }
  },

  // Check if product is in wishlist
  isInWishlist: (productId) => {
    const wishlistItems = wishlistUtils.getWishlistItems();
    return wishlistItems.some(item => item.productId === productId);
  },

  // Clear entire wishlist
  clearWishlist: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }
    return [];
  }
};

// React hook for cart management
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotals, setCartTotals] = useState({
    totalItems: 0,
    selectedItems: 0,
    subtotal: 0,
    totalQuantity: 0,
    selectedQuantity: 0
  });

  // Load cart items on component mount
  useEffect(() => {
    const items = cartUtils.getCartItems();
    setCartItems(items);
    setCartTotals(cartUtils.getCartTotals());
  }, []);

  // Update totals when cart items change
  useEffect(() => {
    setCartTotals(cartUtils.getCartTotals());
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    const updatedItems = cartUtils.addToCart(product, size, color, quantity);
    setCartItems(updatedItems);
    return updatedItems;
  };

  const removeFromCart = (itemId) => {
    const updatedItems = cartUtils.removeFromCart(itemId);
    setCartItems(updatedItems);
    return updatedItems;
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedItems = cartUtils.updateQuantity(itemId, newQuantity);
    setCartItems(updatedItems);
    return updatedItems;
  };

  const clearCart = () => {
    const updatedItems = cartUtils.clearCart();
    setCartItems(updatedItems);
    return updatedItems;
  };

  const toggleItemSelection = (itemId) => {
    const updatedItems = cartUtils.toggleItemSelection(itemId);
    setCartItems(updatedItems);
    return updatedItems;
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    const updatedItems = cartUtils.toggleSelectAll(!allSelected);
    setCartItems(updatedItems);
    return updatedItems;
  };

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
    getCartItem: cartUtils.getCartItem
  };
};

// React hook for wishlist management
export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist items on component mount
  useEffect(() => {
    const items = wishlistUtils.getWishlistItems();
    setWishlistItems(items);
  }, []);

  const addToWishlist = (product) => {
    const updatedItems = wishlistUtils.addToWishlist(product);
    setWishlistItems(updatedItems);
    return updatedItems;
  };

  const removeFromWishlist = (productId) => {
    const updatedItems = wishlistUtils.removeFromWishlist(productId);
    setWishlistItems(updatedItems);
    return updatedItems;
  };

  const toggleWishlist = (product) => {
    const result = wishlistUtils.toggleWishlist(product);
    setWishlistItems(result.items);
    return result;
  };

  const clearWishlist = () => {
    const updatedItems = wishlistUtils.clearWishlist();
    setWishlistItems(updatedItems);
    return updatedItems;
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist: wishlistUtils.isInWishlist
  };
};