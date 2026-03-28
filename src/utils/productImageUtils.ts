import { ProductImages } from "@/types";

export type ImageType = "cards" | "display" | "original";

export interface ProductImageItem {
  url: string;
  lqip: string;
}

export const FALLBACK_LQIP =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

export const FALLBACK_IMAGE: ProductImageItem = {
  url: "https://cdn.gulbhahar.com/ProductImages/P57288228896/cards/P57288228896-wer-2.webp",
  lqip: FALLBACK_LQIP,
};

function buildUrl(
  productId: string,
  fileName: string,
  type: ImageType,
  version: number | null
): string {
  const base = `https://cdn.gulbhahar.com/ProductImages/${productId}/${type}/${fileName}.webp`;
  return version != null ? `${base}?v=${version}` : base;
}

/** All images across all colors (flatMap) — for product card hover sliders */
export function getProductImages(
  productId: string | undefined,
  images: ProductImages[] | undefined,
  type: ImageType = "cards"
): ProductImageItem[] {
  try {
    if (!productId || !images?.length) return [FALLBACK_IMAGE];
    const items = images.flatMap((color) =>
      (color.files || []).map((file) => ({
        url: buildUrl(productId, file.name, type, file.version),
        lqip: file.lqip || FALLBACK_LQIP,
      }))
    );
    return items.length > 0 ? items : [FALLBACK_IMAGE];
  } catch {
    return [FALLBACK_IMAGE];
  }
}

/** Images for a specific color — for product detail / zoom views */
export function getProductImagesForColor(
  productId: string | undefined,
  images: ProductImages[] | undefined,
  colorIndex = 0,
  type: ImageType = "cards"
): ProductImageItem[] {
  try {
    if (!productId || !images?.length) return [FALLBACK_IMAGE];
    const colorImages = images[colorIndex] ?? images[0];
    if (!colorImages?.files?.length) return [FALLBACK_IMAGE];
    return colorImages.files.map((file) => ({
      url: buildUrl(productId, file.name, type, file.version),
      lqip: file.lqip || FALLBACK_LQIP,
    }));
  } catch {
    return [FALLBACK_IMAGE];
  }
}

/** First image only — for collection/home grid cards */
export function getFirstProductImage(
  productId: string | undefined,
  images: ProductImages[] | undefined,
  type: ImageType = "cards"
): ProductImageItem {
  try {
    if (!productId || !images?.length) return FALLBACK_IMAGE;
    const firstFile = images[0]?.files?.[0];
    if (!firstFile?.name) return FALLBACK_IMAGE;
    return {
      url: buildUrl(productId, firstFile.name, type, firstFile.version),
      lqip: firstFile.lqip || FALLBACK_LQIP,
    };
  } catch {
    return FALLBACK_IMAGE;
  }
}
