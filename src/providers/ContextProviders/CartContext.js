
"use client";
import analyticsAPI from '@/app/api/analytics/analytics';
import { fbEvent } from '@/utils/fb/metaPixels';
import { gaEvent } from '@/utils/gtm/gtag';
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
    

      // 🔥 STANDARDIZED CART ID GENERATION
      const standardizedCartId = `${product.productId || product.id}-${product.selectedColor || product.colors?.[0] || 'default'}-${product.selectedSize || product.sizes?.[0] || 'default'}`;

  

      setAddingToCart(product.productId || product.id);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setCart(prevCart => {

        const existingItem = prevCart.find(item => {
          const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
          return itemCartId === standardizedCartId;
        });

        if (existingItem) {
         
          return prevCart.map(item => {
            const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
            return itemCartId === standardizedCartId
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          });
        } else {
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

      
          return [...prevCart, newCartItem];
        }
      });

       gaEvent({
          action: "Added to Cart ",
          params: {
            "Product_Name" : product.name ,
            "Product_Id" : product.productId
          },
        })
      fbEvent({
        action: "AddToCart",
        params: {
          "content_name": product.name,
          "content_ids": [product.productId],
          "content_type" : "juttis"
        },
      })

      try {
        const res = await analyticsAPI.trackAddToCart(product.productId)
 
      } catch (error) {
        
      }

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

  const removeFromCart = (productId, selectedColor, selectedSize) => {
   
    setCart((prevCart) =>
      prevCart.filter((item) => {
        const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
        if (!selectedColor || !selectedSize) {
          console.warn("removeFromCart called without proper color/size:", productId, selectedColor, selectedSize);
        }
        const targetCartId = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;

        return itemCartId !== targetCartId;
      })
    );
  };

  const updateQuantity = (productId, newQuantity, selectedColor, selectedSize) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCart(prevCart =>
      prevCart.map((item) => {
        const itemCartId = `${item.productId || item.id}-${item.selectedColor || item.colors?.[0] || 'default'}-${item.selectedSize || item.sizes?.[0] || 'default'}`;
        const targetCartId = `${productId}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
        return itemCartId === targetCartId
          ? { ...item, quantity: newQuantity }
          : item;
      })
    );
  };


  // 🧩 Update color/size variant instead of adding new item
  const updateItemVariant = (oldItem, newVariant) => {
    setCart((prevCart) => {
      const oldCartId = `${oldItem.productId || oldItem.id}-${oldItem.selectedColor || 'default'}-${oldItem.selectedSize || 'default'}`;
      const newCartId = `${newVariant.productId || newVariant.id}-${newVariant.selectedColor || 'default'}-${newVariant.selectedSize || 'default'}`;

      // If variant already exists → merge quantities
      const existingIndex = prevCart.findIndex(item => {
        const itemCartId = `${item.productId || item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
        return itemCartId === newCartId;
      });

      let updatedCart;

      if (existingIndex !== -1) {
        // 🧩 Merge with existing variant
        updatedCart = prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + oldItem.quantity }
            : item
        );
      } else {
        // 🧩 Replace old variant with new one
        updatedCart = prevCart.map((item) => {
          const itemCartId = `${item.productId || item.id}-${item.selectedColor || 'default'}-${item.selectedSize || 'default'}`;
          return itemCartId === oldCartId ? { ...item, ...newVariant } : item;
        });
      }

      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
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