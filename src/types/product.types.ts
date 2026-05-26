
export interface Product {
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
  inventory?: { color: string; size: string; quantity: number; keywords?: string[] }[];
  season?: string;
  availableColors?: { name: string; hexcode: string }[];
  availableCollections?: { name: string }[];
  availableSizes?: { name: string }[];
  availableSeasons?: { name: string }[];
  availableFabrics?: { name: string }[];
  seo?: { keywords: string[]; metaTitle: string; metaDescription: number };
  videos?: { posterUrl: string; videoUrl: string; title: string }[][];
  totalSizes: string[];
  slug?: string;
}

export interface ProductImages {
  colorName: string;
  files: [{
    name: string;
    lqip: string;
    version: number | null;
  }];
}

export interface ProductApiResponse {
  success?: boolean;
  products?: Product[];
  data?: Product[] | Product;
  message?: string;
}

export interface DeliveryInfo {
  city: string;
  district: string;
  state: string;
  cod: boolean;
  prepaid: boolean;
  pickup: boolean;
  covidZone?: string;
  isODA: boolean;
}

export interface PostalCodeValidationResult {
  isValidating: boolean;
  isValid: boolean;
  error: string | null;
  deliveryInfo: DeliveryInfo | null;
}
