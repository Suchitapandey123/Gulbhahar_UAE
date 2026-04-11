export interface ZoomConfig {
  startScale: number;
  endScale: number;
  startY: string;
  startX: string;
  endY: string;
  endX: string;
  duration: number;
}

export interface HeroSectionItem {
  id: number;
  image: string;
  mobileImage: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  color: string;
  zoomConfig: ZoomConfig;
}

export interface AvailableCollectionItem {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CultureItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  accent: string;
  heritage: string;
  region: string;
}

export interface StoryInMotionItem {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

export interface WatchAndShopProduct {
  name: string;
  price: string;
}

export interface WatchAndShopItem {
  id: number;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  product: WatchAndShopProduct;
  slug: string;
}

export interface SoulOfGulbhaharItem {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  highlight: string;
}

export interface HomePageData {
  "hero-section": HeroSectionItem[];
  "available-collections": AvailableCollectionItem[];
  culture: CultureItem[];
  "stories-in-motion": StoryInMotionItem[];
  "watch-and-shop": WatchAndShopItem[];
  "soul-of-gulbhahar": SoulOfGulbhaharItem[];
}

export interface HomePageResponse {
  success: boolean;
  data?: HomePageData;
}
