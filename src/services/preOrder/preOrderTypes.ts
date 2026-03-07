export interface GetPreOrderProductsResponse {
  success: boolean;
  count: number;
  products: PreOrderProductData[];
}

export interface PreOrderProductData {
  productId: string;
  isActive: boolean;
  name: string;
  category: string[];
  price: number;
  originalPrice: number;
  images: string[];
  parentCategory: string[];
  availableColors: {
    name: string;
    hexCode: string;
  }[];
  availableSizes: {
    name: string;
  }[];
  preOrder: boolean;
}
