// @ts-nocheck
"use client";

import { useCart } from "@/providers/ContextProviders/CartContext";
import { getProductImagesForColor } from "@/utils/productImageUtils";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Product } from "../types";
import { DeliveryChecker } from "./DeliveryChecker";
import { ImageModal } from "./ImageModal";
import { ProductDetailsAccordion } from "./ProductDetailsAccordion";
import { ProductImageGrid } from "./ProductImageGrid";
import { ProductInfo } from "./ProductInfo";
import { ProductPurchaseSection } from "./ProductPurchaseSection";
import ProductReels from "./ProductReels";
import { ProductVariants } from "./ProductVariants";
import { SizeGuideModal } from "./SizeGuideModal";
import { SizeChartData } from "@/services/sizeChart/sizeChartTypes";
import FloatingProductVideo from "./FloatingProductVideo";

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
  sizeChart: SizeChartData;
  avgRating?: number;
  reviewCount?: number;
}

export const ProductView = ({ sizeChart, product, customRed, avgRating = 0, reviewCount = 0 }: ProductViewProps) => {
  const { addToCart, addingToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── Initialise color from ?color= param ──────────────────────────────────
  const getInitialColorIndex = () => {
    const hex = searchParams.get("color");
    if (!hex || !product.availableColors?.length) return 0;
    const idx = product.availableColors.findIndex(
      (c) => (typeof c === "string" ? "" : c.hexcode ?? "").replace("#", "").toLowerCase() === hex.toLowerCase()
    );
    return idx >= 0 ? idx : 0;
  };

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(getInitialColorIndex);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // ── Sync URL when color changes ───────────────────────────────────────────
  const handleColorChange = (idx: number) => {
    setSelectedColorIndex(idx);
    const color = product.availableColors?.[idx];
    const hex = typeof color === "string" ? "" : (color?.hexcode ?? "").replace("#", "");
    const params = new URLSearchParams(window.location.search);
    if (hex) params.set("color", hex);
    else params.delete("color");
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };


  const availableColorsMapped = useMemo(() => {
    if (!product.availableColors || product.availableColors.length === 0) return [];
    return product.availableColors.map((color) => ({
      name: typeof color === "string" ? color : color.name,
      hexcode: typeof color === "string" ? "#e5ab0b" : color.hexcode || "#e5ab0b",
    }));
  }, [product.availableColors]);

  const currentColor = useMemo((): string => {
    if (product.availableColors && product.availableColors[selectedColorIndex]) {
      const color = product.availableColors[selectedColorIndex];
      return typeof color === "string" ? color : color.name;
    }
    return "";
  }, [product.availableColors, selectedColorIndex]);

  const displayName = useMemo((): string => {
    if (product.availableColors && product.availableColors[selectedColorIndex]) {
      const color = product.availableColors[selectedColorIndex];
      if (typeof color !== "string" && color.productName) return color.productName;
    }
    return product.name;
  }, [product.availableColors, product.name, selectedColorIndex]);

  const sizeRange = useMemo(() => {
    const mappedSizes = product.availableSizes?.map((s) => s.name) || [];
    const colorInventory = product.inventory?.filter(
      (inv) => inv.color?.toLowerCase() === currentColor?.toLowerCase()
    ) ?? [];
    return generateSizeRange(
      colorInventory.length > 0 ? colorInventory : (product.inventory || []),
      product.totalSizes,
      mappedSizes,
    );
  }, [product.totalSizes, product.availableSizes, product.inventory, currentColor]);

  const isOutOfStock = sizeRange.length > 0 && sizeRange.every((s) => !s.available);

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
    if (isOutOfStock) return;

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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-x-16 w-full max-w-[1440px] mx-auto pb-20 md:pb-0">
        {/* Image column — NOT sticky on lg so image stack scrolls with page */}
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

        {/* Details column — sticky, no internal scroll */}
        <div className="md:col-span-6 lg:col-span-6 md:sticky lg:sticky md:top-40 lg:top-16 md:self-start lg:self-start w-full">
          {/* Classic card wrapper for right side content */}
          <div className="relative w-full bg-white md:bg-gradient-to-br md:from-white md:via-stone-50/30 md:to-gray-50/50 md:p-4 md:border md:border-gray-100">
            {/* Corner accents - only on md+ */}
            <div className="hidden md:block absolute top-0 left-0 w-10 lg:w-12 h-10 lg:h-12 border-t-2 border-l-2 border-[#800000]/20" />
            <div className="hidden md:block absolute top-0 right-0 w-10 lg:w-12 h-10 lg:h-12 border-t-2 border-r-2 border-[#800000]/20" />
            <div className="hidden md:block absolute bottom-0 left-0 w-10 lg:w-12 h-10 lg:h-12 border-b-2 border-l-2 border-[#800000]/20" />
            <div className="hidden md:block absolute bottom-0 right-0 w-10 lg:w-12 h-10 lg:h-12 border-b-2 border-r-2 border-[#800000]/20" />

            <div className="flex flex-col gap-4 md:gap-6">
              <div className="order-1 md:order-1">
                <ProductInfo product={product} displayName={displayName} customRed={customRed} avgRating={avgRating} reviewCount={reviewCount} />
              </div>

              {/* Product Highlights — skip color/size entries, already shown below */}
              {product.details && product.details.length > 0 && (() => {
                const filtered = product.details.filter(
                  (d) => !/color|colour|size|rang/i.test(d)
                ).slice(0, 4);
                return filtered.length > 0 ? (
                  <div className="order-6 md:order-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filtered.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 bg-stone-50 border border-gray-100 rounded-lg px-3 py-2.5 min-h-[48px]">
                        <span className="text-[#800000] mt-0.5 text-[10px] flex-shrink-0">✦</span>
                        <span className="text-[11px] md:text-xs text-gray-700 leading-snug line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : null;
              })()}

              <div className="order-2 md:order-3">
                <ProductVariants
                  product={product}
                  selectedColorIndex={selectedColorIndex}
                  setSelectedColorIndex={handleColorChange}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  customRed={customRed}
                  setShowSizeGuide={setShowSizeGuide}
                  sizeRange={sizeRange}
                  inventory={product.inventory ?? []}
                  shouldShowSizeGuide={sizeChart?.isActive ?? false}
                />
              </div>

              <div className="order-3 md:order-4">
                <ProductPurchaseSection
                  product={product}
                  selectedSize={selectedSize}
                  addingToCart={
                    addingToCart === (product.productId || product.id)
                  }
                  onAddToCart={handleAddToCart}
                  customRed={customRed}
                  isOutOfStock={isOutOfStock}
                />
              </div>
              <div className="order-4 md:order-5 block">
                <DeliveryChecker customRed={customRed} />
              </div>

              {/* Delivery Timeline */}
              {/* <div className="order-6 md:order-6 py-3 px-3 bg-stone-50 rounded-lg border border-gray-100">
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
              </div> */}

              <div className="order-5 md:order-7 block md:hidden">
                <ProductReels
                  videos={videosByColor}
                  selectedColorIndex={selectedColorIndex}
                  onAddToCart={handleAddToCart}
                  addingToCart={addingToCart === (product.productId || product.id)}
                  isOutOfStock={isOutOfStock}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  customRed={customRed}
                  availableColors={availableColorsMapped}
                  setSelectedColorIndex={handleColorChange}
                  sizeRange={sizeRange}
                />
              </div>

              {/* Elegant note */}
              <div className="order-7 md:order-8 relative mt-4 md:mt-6 pt-4 md:pt-6 border-t border-dashed border-gray-200">
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
              <div className="order-8 md:order-9 flex items-center justify-center gap-4 sm:gap-6 pt-3 pb-3 md:pt-4">
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
          sizeChart={sizeChart}
        />

        {/* Floating video widget — only if product has a video */}
        {(() => {
          const allVideos = (videosByColor?.flat?.() ?? []).filter((v: any) => v?.videoUrl);
          if (!allVideos.length) return null;
          const firstImg = (product.images?.[0] as any);
          const productImage = firstImg?.files?.[0]?.name
            ? `https://cdn.gulbhahar.com/ProductImages/${product.productId}/cards/${firstImg.files[0].name}.webp`
            : "";
          return (
            <FloatingProductVideo
              videos={allVideos}
              videoUrl={allVideos[0].videoUrl}
              posterUrl={allVideos[0].posterUrl}
              productId={product.productId || product.id || ""}
              productName={product.name || ""}
              productPrice={product.price ?? 0}
              productImage={productImage}
              availableColors={availableColorsMapped}
              selectedColorIndex={selectedColorIndex}
            />
          );
        })()}
      </div>

      {/* Desktop reels — outside grid to preserve sticky layout */}
      <div className="md:block hidden">
        <ProductReels
          videos={videosByColor}
          selectedColorIndex={selectedColorIndex}
          onAddToCart={handleAddToCart}
          addingToCart={addingToCart === (product.productId || product.id)}
          isOutOfStock={isOutOfStock}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          customRed={customRed}
          availableColors={availableColorsMapped}
          setSelectedColorIndex={handleColorChange}
          sizeRange={sizeRange}
        />
      </div>

      {/* Sticky Mobile CTA */}
    
    </>
  );
};
