import { ProductImages } from "@/types";

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
  images?: ProductImages[];
  updatedAt?: string;
  createdAt?: string;
  inventory?: InventoryItem[];
  season?: string;
  availableColors?: ColorOption[];
  availableCollections?: SizeOption[];
  availableSizes?: SizeOption[];
  availableSeasons?: SizeOption[];
  availableFabrics?: SizeOption[];
  seo?: Seo;
  videos?: VideosOption[][]
  totalSizes : string[]
};

export type Seo = {
  keywords: string[];
  metaTitle: string;
  metaDescription: number;
};
export type InventoryItem = {
  color: string;
  size: string;
  quantity: number;
  keywords?: string[];
};

export type ColorOption = {
  name: string;
  hexcode: string;
  productName?: string;
  _id?: string;
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
 success : boolean
 count : number
 products : Product[]
};
