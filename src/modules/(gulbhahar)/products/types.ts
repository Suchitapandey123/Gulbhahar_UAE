export type Product = {
  productId: string;
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice: number;
  description?: string;
  category: string[];
  parentCategory: string[];
  details?: string[];
  overview?: string[];
  material?: string;
  images?: string[][];
  updatedAt?: string;
  createdAt?: string;
  inventory?: InventoryItem[];
  season?: string;
  availableColors?: ColorOption[];
  availableCollections?: SizeOption[];
  availableSizes?: SizeOption[];
  availableFabrics?: SizeOption[];
  seo?: Seo;
  videos?: VideosOption[]
};

export type Seo = {
  keywords: string[];
  metaTitle: string;
  metaDescription: number;
};
export type InventoryItem = {
  keywords: string[];
  color: string;
  quantity: string;
};

export type ColorOption = {
  name: string;
  hexcode: string;
};

export type VideosOption = {
  posterUrl :string;
  videoUrl : string
  title : string
}
export type SizeOption = {
  name: string;
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
