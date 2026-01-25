export type Product = {
  productId: string;
  id?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice: number;
  description?: string;
  category: string | string[];
  details?: string[];
  overview?: string[];
  material?: string;
  images?: string[][];
  updatedAt?: string;
  inventory?: InventoryItem[];
  availableColors?: ColorOption[];
  colors?: string[];
  sizes?: string[];
};

export type InventoryItem = {
  size: string;
  color: string;
  quantity: number;
};

export type ColorOption = {
  name: string;
  hexcode: string;
};

export type SimilarProduct = {
  productId: string;
  id?: string;
  name?: string;
  price: number;
  originalPrice?: number;
  images?: string[][];
  stock?: number;
  sizes?: string[];
  colors?: string[];
};
