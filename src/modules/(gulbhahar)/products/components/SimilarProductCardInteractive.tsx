// @ts-nocheck
"use client";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { ProductImageItem } from "@/utils/productImageUtils";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageSlider } from "./ImageSlider";

interface SimilarProductCardInteractiveProps {
  productId: string;
  productName: string;
  images: ProductImageItem[];
  colors: any[];
  sizes: string[];
  item: any;
}

export default function SimilarProductCardInteractive({
  productId,
  productName,
  images,
  colors,
  sizes,
  item,
}: SimilarProductCardInteractiveProps) {
  const { addToCart, addingToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const selectedColor = colors.length > 0
        ? (typeof colors[0] === "string" ? colors[0] : colors[0].name)
        : "default";
      const selectedSize = sizes.length > 0 ? sizes[0] : "default";

      // Convert colors and sizes to string arrays for cart
      const colorStrings = colors.map(c => typeof c === 'string' ? c : c.name || c);
      const sizeStrings = sizes.map(s => typeof s === 'string' ? s : s.name || s);

      const cartItemWithVariants = {
        ...item,
        id: productId,
        productId: productId,
        selectedColor,
        selectedSize,
        colors: colorStrings,
        sizes: sizeStrings,
      };

      const result = await addToCart(cartItemWithVariants);

      if (result.success) {
        toast.success(
          `${productName} (${selectedSize}, ${selectedColor}) added to cart!`,
        );
      } else {
        toast.error("Failed to add item to cart. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  const isAddingThis = addingToCart === productId;

  const totalStock = Array.isArray(item.inventory)
    ? item.inventory.reduce((sum: number, v: { quantity: number }) => sum + (v.quantity ?? 0), 0)
    : 0;
  const isOutOfStock = totalStock === 0;

  return (
    <div className="relative overflow-hidden w-full aspect-[3/4] bg-gray-50">
      {images.length > 1 ? (
        <ImageSlider images={images} alt={productName} />
      ) : (
        <Image
          fill
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
          src={images[0].url}
          alt={productName}
          placeholder="blur"
          blurDataURL={images[0].lqip}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      )}

      {/* Hover Overlay (static images only) */}
      {images.length <= 1 && (
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      )}

      {/* Add to Cart Button - Desktop Hover Only */}
      <div
        className={`hidden md:block absolute bottom-0 left-0 right-0 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-10 ${isOutOfStock ? "bg-gray-500" : "bg-red-900"}`}
      >
        <button
          onClick={isOutOfStock ? undefined : handleAddToCart}
          disabled={isAddingThis || isOutOfStock}
          className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? (
            <span>Out of Stock</span>
          ) : isAddingThis ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
