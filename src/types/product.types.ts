export interface Product {
  productId: string;
  id?: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  category?: string;
  parentCategory?: string;
  slug?: string;
  description?: string;
  [key: string]: unknown;
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
