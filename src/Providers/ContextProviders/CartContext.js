
"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopping-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);
  
  

const addToCart = async (product) => {
  try {
    // console.log('🛒 Adding to cart:', product);
    
    // 🔥 STANDARDIZED CART ID GENERATION
    const standardizedCartId = `${product.productId || product.id}-${product.selectedColor || product.colors?.[0] || 'default'}-${product.selectedSize || product.sizes?.[0] || 'default'}`;
    
    // console.log('🔑 Standardized Cart ID:', standardizedCartId);
    
    setAddingToCart(product.productId || product.id);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCart(prevCart => {
      // console.log('📦 Current cart before adding:', prevCart);
      
      // Find existing item using standardized matching
      const existingItem = prevCart.find(item => {
        const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
        return itemCartId === standardizedCartId;
      });
      
      if (existingItem) {
        // console.log('📈 Found existing item, updating quantity');
        return prevCart.map(item => {
          const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
          return itemCartId === standardizedCartId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        // console.log('➕ Adding new item to cart');
        const newCartItem = {
          ...product,
          quantity: 1,
          cartId: standardizedCartId,
          // Ensure we use productId consistently
          id: product.productId || product.id,
          productId: product.productId || product.id,
          // Ensure color and size are set
          selectedColor: product.selectedColor || product.colors?.[0] || 'default',
          selectedSize: product.selectedSize || product.sizes?.[0] || 'default',
          addedAt: new Date().toISOString()
        };
        
        // console.log('🆕 New cart item:', newCartItem);
        return [...prevCart, newCartItem];
      }
    });
    
    // console.log('✅ Item added to cart successfully');
    return { 
      success: true, 
      message: `${product.name}${product.selectedSize ? ` (${product.selectedSize})` : ''}${product.selectedColor ? ` (${product.selectedColor})` : ''} added to cart!` 
    };
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    return { success: false, message: 'Failed to add item to cart' };
  } finally {
    setAddingToCart(null);
  }
};

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };
  const cleanupDuplicates = () => {
    setCart(prevCart => {
      const uniqueItems = [];
      const seenIds = new Set();
      
      prevCart.forEach(item => {
        const standardId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
        
        if (!seenIds.has(standardId)) {
          seenIds.add(standardId);
          uniqueItems.push({
            ...item,
            cartId: standardId,
            id: item.productId || item.id,
            productId: item.productId || item.id
          });
        } else {
          // If duplicate found, merge quantities
          const existingIndex = uniqueItems.findIndex(existing => {
            const existingId = `${existing.productId || existing.id}-${existing.selectedColor || existing.colors?.[0] || 'default'}-${existing.selectedSize || existing.sizes?.[0] || 'default'}`;
            return existingId === standardId;
          });
          
          if (existingIndex !== -1) {
            uniqueItems[existingIndex].quantity += item.quantity;
          }
        }
      });
      
      // console.log('🧹 Cleaned up cart:', uniqueItems);
      return uniqueItems;
    });
  };
  

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    addingToCart,
    isCartOpen,
    setIsCartOpen,
    cleanupDuplicates,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};