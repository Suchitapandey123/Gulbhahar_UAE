export interface CartItem {
  productId: string;
  id?: string;
  name: string;
  price: number;
  quantity: number;
  cartId: string;
  selectedColor?: string;
  selectedSize?: string;
  colors?: string[];
  sizes?: string[];
  image?: string;
  addedAt?: string;
  [key: string]: unknown;
}

export interface CartProduct {
  productId?: string;
  id?: string;
  name: string;
  price: number;
  selectedColor?: string;
  selectedSize?: string;
  colors?: string[];
  sizes?: string[];
  image?: string;
  [key: string]: unknown;
}

export interface AddToCartResult {
  success: boolean;
  message: string;
}

export interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: CartProduct) => Promise<AddToCartResult>;
  removeFromCart: (
    productId: string,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateQuantity: (
    productId: string,
    newQuantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => void;
  updateItemVariant: (oldItem: CartItem, newVariant: Partial<CartItem>) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  addingToCart: string | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cleanupDuplicates: () => void;
  toggleCart: () => void;
}
