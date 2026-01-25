"use client";

import { ZoomIn } from "lucide-react";
import NextImage from "next/image";
import { Product } from "../types";

interface ProductImageGridProps {
  product: Product;
  currentImages: string[];
  cacheVersion: string;
  onImageClick: (index: number) => void;
}

export const ProductImageGrid = ({
  product,
  currentImages,
  cacheVersion,
  onImageClick,
}: ProductImageGridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:gap-4">
        {currentImages.map((img, idx) => (
          <div
            key={idx}
            className="relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer"
            style={{ aspectRatio: "3 / 4" }}
            onClick={() => onImageClick(idx)}
          >
            <NextImage
              src={img.startsWith("/") ? img : `${img}${cacheVersion}`}
              alt={`${product.name} - Image ${idx + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 30vw"
              priority={idx < 4}
              loading="eager"
              quality={60}
              unoptimized={false}
            />
            {/* Zoom Indicator */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
