// @ts-nocheck
"use client";

import { useCart } from "@/providers/ContextProviders/CartContext";
import { getProductImagesForColor } from "@/utils/productImageUtils";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Product } from "../types";
import { DeliveryChecker } from "./DeliveryChecker";
import { ImageModal } from "./ImageModal";
import { ProductImageGrid } from "./ProductImageGrid";
import { ProductInfo } from "./ProductInfo";
import { ProductPurchaseSection } from "./ProductPurchaseSection";
import ProductReels from "./ProductReels";
import { ProductVariants } from "./ProductVariants";
import { SizeGuideModal } from "./SizeGuideModal";
import { SizeChartData } from "@/services/sizeChart/sizeChartTypes";

const generateSizeRange = (
  inventory: any[],
  totalSizes: string[],
  availableSizes: string[] = [],
) => {

  // If we have inventory data, use it for quantity tracking
  if (inventory && inventory.length > 0) {
    const availableSizeQuantities: any = {};
    inventory.forEach((item) => {
      if (item.size && item.quantity > 0) {
        availableSizeQuantities[item.size] =
          (availableSizeQuantities[item.size] || 0) + item.quantity;
      }
    });

    return totalSizes.map((size: string) => ({
      size,
      available:
        !!availableSizeQuantities[size] && availableSizeQuantities[size] > 0,
      quantity: availableSizeQuantities[size] || 0,
    }));
  }

  // Show all config sizes, but only mark as available if in availableSizes
  return totalSizes.map((size: string) => ({
    size,
    available: availableSizes.includes(size),
    quantity: availableSizes.includes(size) ? 1 : 0,
  }));
};

interface ProductViewProps {
  product: Product;
  customRed: string;
  sizeChart : SizeChartData
}

export const ProductView = ({ sizeChart , product, customRed }: ProductViewProps) => {
  const { addToCart, addingToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);


  const sizeRange = useMemo(() => {
    const mappedSizes = product.availableSizes?.map((s) => s.name) || [];
    return generateSizeRange(product.inventory || [], product.totalSizes, mappedSizes);
  }, [product.totalSizes, , product.availableSizes]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [product.productId]);

  useEffect(() => {
    if (sizeRange.length > 0 && !selectedSize) {
      const firstAvailable = sizeRange.find((sr: any) => sr.available);
      if (firstAvailable) setSelectedSize(firstAvailable.size);
      else if (sizeRange.length > 0) setSelectedSize(sizeRange[0].size);
    }
  }, [sizeRange, selectedSize]);

  // Transform product.videos → VideosOption[][] (one array per color index)
  const videosByColor = useMemo(() => {
    const raw = product.videos as any[];
    if (!raw?.length) return [];

    // Case 1: Already 2D array
    if (Array.isArray(raw[0])) return raw;

    // Case 2: Nested like images → [{ colorName, files:[{videoUrl,posterUrl,title}] }]
    if (raw[0]?.files !== undefined) {
      return (product.availableColors ?? []).map((c) => {
        const name = typeof c === "string" ? c : c.name;
        const group = raw.find((v) => v.colorName?.toLowerCase() === name.toLowerCase());
        return group?.files ?? [];
      });
    }

    // Case 3: Flat with colorName tag → [{videoUrl, posterUrl, title, colorName}]
    if (raw[0]?.colorName !== undefined) {
      return (product.availableColors ?? []).map((c) => {
        const name = typeof c === "string" ? c : c.name;
        return raw.filter((v) => v.colorName?.toLowerCase() === name.toLowerCase());
      });
    }

    // Case 4: Flat no color info — same for all colors (cannot distinguish)
    const colorCount = Math.max(product.availableColors?.length ?? 1, 1);
    return Array.from({ length: colorCount }, () => raw);
  }, [product.videos, product.availableColors]);

  const currentColor = useMemo((): string => {
    if (
      product.availableColors &&
      product.availableColors[selectedColorIndex]
    ) {
      const color = product.availableColors[selectedColorIndex];
      return typeof color === "string" ? color : color.name;
    }
    return "";
  }, [product.availableColors, selectedColorIndex]);

  const currentImages = getProductImagesForColor(
    product.productId,
    product.images,
    selectedColorIndex,
    "display"
  );
  const zoomImages = getProductImagesForColor(
    product.productId,
    product.images,
    selectedColorIndex,
    "original"
  );
  

  const handleAddToCart = async () => {
    if (!product.productId && !product.id) {
      toast.error("Product ID not found");
      return;
    }

    // Check if selected size is available
    const selectedSizeData = sizeRange.find(
      (s: any) => s.size === selectedSize,
    );
    if (!selectedSizeData || !selectedSizeData.available) {
      toast.error("Selected size is not available");
      return;
    }

    try {
      const cartSelectedColor =
        currentColor || product.availableColors?.[0]?.name || "default";
      const cartSelectedSize =
        selectedSize || product.availableSizes?.[0]?.name || "default";

      const cartItem = {
        ...product,
        id: product.productId || product.id,
        productId: product.productId || product.id,
        selectedColor: cartSelectedColor,
        selectedSize: cartSelectedSize,
        selectedColorIndex: selectedColorIndex || 0,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      };

      const result = await addToCart(cartItem);

      if (result.success) {
        toast.success(
          `${product.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
        );
        setQuantity(1); // Reset quantity after adding
      } else {
        toast.error(result.message || "Failed to add item to cart");
      }
    } catch (error: any) {
      toast.error("Failed to add item to cart. Please try again.", error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-8 w-full max-w-[1600px] mx-auto pb-20 md:pb-0">
        <div className="md:col-span-6 lg:col-span-6">
          <ProductImageGrid
            product={product}
            currentImages={currentImages}
            onImageClick={(idx) => {
              setModalImageIndex(idx);
              setIsModalOpen(true);
            }}
          />
        </div>

        <div className="md:col-span-6 lg:col-span-6 md:sticky md:top-40 md:self-start w-full">
          {/* Classic card wrapper for right side content */}
          <div className="relative w-full bg-white md:bg-gradient-to-br md:from-white md:via-stone-50/30 md:to-gray-50/50 md:p-4 md:border md:border-gray-100">
            {/* Corner accents - only on md+ */}
            <div className="hidden md:block absolute top-0 left-0 w-10 lg:w-12 h-10 lg:h-12 border-t-2 border-l-2 border-[#800000]/20" />
            <div className="hidden md:block absolute top-0 right-0 w-10 lg:w-12 h-10 lg:h-12 border-t-2 border-r-2 border-[#800000]/20" />
            <div className="hidden md:block absolute bottom-0 left-0 w-10 lg:w-12 h-10 lg:h-12 border-b-2 border-l-2 border-[#800000]/20" />
            <div className="hidden md:block absolute bottom-0 right-0 w-10 lg:w-12 h-10 lg:h-12 border-b-2 border-r-2 border-[#800000]/20" />

            <div className="space-y-4 md:space-y-6">
              <ProductInfo product={product} customRed={customRed} />

              {/* Product Highlights Grid */}
              {product.details && product.details.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {product.details.slice(0, 6).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-stone-50 border border-gray-100 rounded-lg px-3 py-2.5">
                      <span className="text-[#800000]/50 mt-0.5 text-xs flex-shrink-0">✦</span>
                      <span className="text-[11px] md:text-xs text-gray-600 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              <ProductVariants
                product={product}
                selectedColorIndex={selectedColorIndex}
                setSelectedColorIndex={setSelectedColorIndex}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                customRed={customRed}
                setShowSizeGuide={setShowSizeGuide}
                sizeRange={sizeRange}
               shouldShowSizeGuide={sizeChart?.isActive ?? false}
              />

              <ProductPurchaseSection
                product={product}
                selectedSize={selectedSize}
                addingToCart={
                  addingToCart === (product.productId || product.id)
                }
                onAddToCart={handleAddToCart}
                customRed={customRed}
              />
              <div className="md:block hidden">
                <DeliveryChecker customRed={customRed} />
              </div>

              {/* Delivery Timeline */}
              <div className="py-3 px-3 bg-stone-50 rounded-lg border border-gray-100">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3">Delivery Timeline</p>
                <div className="flex items-center gap-1">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#800000]" />
                    <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">Order<br/>Placed</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#800000]/40 to-gray-300 mx-1" />
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#800000]/50" />
                    <span className="text-[10px] text-gray-500 text-center leading-tight">Ships in<br/>1–2 days</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-1" />
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="text-[10px] text-gray-400 text-center leading-tight">Delivered<br/>5–7 days</span>
                  </div>
                </div>
              </div>

              <div className="block md:hidden">
                <ProductReels videos={videosByColor} selectedColorIndex={selectedColorIndex} />
              </div>

              {/* Elegant note */}
              <div className="relative mt-4 md:mt-6 pt-4 md:pt-6 border-t border-dashed border-gray-200">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-[#800000]/60 text-xs md:text-sm mt-0.5 flex-shrink-0">
                    ✦
                  </span>
                  <p className="text-[11px] md:text-[13px] text-gray-500 leading-relaxed">
                    <span className="font-medium text-gray-600">Note:</span>{" "}
                    Colors may vary slightly due to screen settings. Each piece
                    is handcrafted with care.
                  </p>
                </div>
              </div>

              {/* Trust badges - responsive */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 pt-3 pb-3 md:pt-4">
                <div className="flex flex-col items-center gap-0.5 md:gap-1">
                  <span className="text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] uppercase text-gray-400">
                    Authentic
                  </span>
                  <div className="w-6 md:w-8 h-px bg-[#800000]/30" />
                </div>
                <div className="flex flex-col items-center gap-0.5 md:gap-1">
                  <span className="text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] uppercase text-gray-400">
                    Handcrafted
                  </span>
                  <div className="w-6 md:w-8 h-px bg-[#800000]/30" />
                </div>
                <div className="flex flex-col items-center gap-0.5 md:gap-1">
                  <span className="text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] uppercase text-gray-400">
                    Premium
                  </span>
                  <div className="w-6 md:w-8 h-px bg-[#800000]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          currentImages={zoomImages}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          product={product}
          currentColor={currentColor}
        />

        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          sizeChart ={sizeChart}
        />
      </div>

      {/* Desktop reels — outside grid to preserve sticky layout */}
      <div className="md:block hidden">
        <ProductReels videos={videosByColor} selectedColorIndex={selectedColorIndex} />
      </div>

      {/* Sticky Mobile CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
        style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
      >
        <div className="flex-shrink-0">
          <p className="text-[10px] text-gray-400 leading-none mb-0.5">Price</p>
          <p className="text-base font-bold text-gray-900">₹{product.price?.toLocaleString("en-IN")}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={addingToCart === (product.productId || product.id) || !selectedSize}
          className="flex-1 py-3 text-white font-semibold rounded-lg text-sm transition-all active:scale-[0.98] disabled:opacity-50"
          style={{ backgroundColor: customRed }}
        >
          {addingToCart === (product.productId || product.id)
            ? "Adding..."
            : !selectedSize
            ? "SELECT SIZE"
            : "ADD TO CART"}
        </button>
      </div>
    </>
  );
};
