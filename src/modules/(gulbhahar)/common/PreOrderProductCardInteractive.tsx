// @ts-nocheck
"use client";
import { ProductImageItem } from "@/utils/productImageUtils";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageSlider } from "../products/components/ImageSlider";

interface PreOrderProductCardInteractiveProps {
  productId: string;
  productName: string;
  images: ProductImageItem[];
  item: any;
}

export default function PreOrderProductCardInteractive({
  productId,
  productName,
  images,
  item,
}: PreOrderProductCardInteractiveProps) {
  const router = useRouter();

  const handlePreOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sessionStorage.setItem(`preorder_${productId}`, JSON.stringify(item));
    router.push(`/pre-order/${productId}`);
  };

  return (
    <div className="relative overflow-hidden w-full aspect-[3/4] bg-gray-50">
      {images.length > 1 ? (
        <ImageSlider images={images} alt={productName} useNativeImg={true} />
      ) : images[0]?.url ? (
        <img
          loading="lazy"
          src={images[0].url}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
        />
      ) : null}

      {/* Hover Overlay (static images only) */}
      {images.length <= 1 && (
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      )}
       
      {/* Pre Order Button - Desktop Hover Only */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-10">
        <button
          onClick={handlePreOrder}
          className="w-full text-sm font-semibold flex items-center justify-center gap-2 "
        >
          <ShoppingBag size={16} />
          <span>Pre Order</span>
        </button>
      </div>

      {/* Pre Order Button - Mobile Always Visible (bottom of image) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 bg-red-900/90 text-white text-center py-1.5 z-10">
        <button
          onClick={handlePreOrder}
          className="w-full text-[10px] font-bold flex items-center justify-center gap-1"
        >
          <ShoppingBag size={12} />
          <span>PRE ORDER</span>
        </button>
      </div>

      
    </div>
  );
}
