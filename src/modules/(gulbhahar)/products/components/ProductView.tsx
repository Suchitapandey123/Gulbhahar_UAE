"use client";

import { useCart } from "@/providers/ContextProviders/CartContext";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Product } from "../types";
import { DeliveryChecker } from "./DeliveryChecker";
import { ImageModal } from "./ImageModal";
import { ProductImageGrid } from "./ProductImageGrid";
import { ProductPurchaseSection } from "./ProductPurchaseSection";
import { ProductVariants } from "./ProductVariants";
import Reviews from "./Reviews";
import { SizeGuideModal } from "./SizeGuideModal";

// Size configurations
const SIZE_CONFIGS: any = {
  juttis: {
    label: "Juttis Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
  },
  heels: {
    label: "Heel Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
  },
  footwear: {
    label: "Footwear Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
  },
  bags: { label: "Bag Dimensions", sizes: [], type: "dimensions" },
  sarees: { label: "Saree Sizes", sizes: ["Free Size"], type: "clothing" },
  suits: {
    label: "Suit Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
  },
  clothing: {
    label: "Clothing Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
  },
  default: {
    label: "Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
  },
};

const generateSizeRange = (
  inventory: any[],
  category: string[],
  availableSizes: string[] = [],
) => {
  if (!inventory || inventory.length === 0) return [];
  const categoryKey = category[0]?.toLowerCase();
  const config = SIZE_CONFIGS[categoryKey] || SIZE_CONFIGS.default;

  if (config.type === "dimensions") {
    return availableSizes.map((size) => ({
      size,
      available: true,
      quantity: 1,
    }));
  }

  const availableSizeQuantities: any = {};
  inventory.forEach((item) => {
    if (item.size && item.quantity > 0) {
      availableSizeQuantities[item.size] =
        (availableSizeQuantities[item.size] || 0) + item.quantity;
    }
  });

  return config.sizes.map((size: string) => ({
    size,
    available:
      !!availableSizeQuantities[size] && availableSizeQuantities[size] > 0,
    quantity: availableSizeQuantities[size] || 0,
  }));
};

interface ProductViewProps {
  product: Product;
  customRed: string;
}

export const ProductView = ({ product, customRed }: ProductViewProps) => {
  const { addToCart, addingToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const categoryName = Array.isArray(product.category)
    ? product.category[0]
    : product.category;
  const categoryConfig =
    SIZE_CONFIGS[categoryName?.toLowerCase()] || SIZE_CONFIGS.default;

  const sizeRange = useMemo(() => {
    return generateSizeRange(
      product.inventory || [],
      Array.isArray(product.category) ? product.category : [product.category],
      product.sizes,
    );
  }, [product.inventory, product.category, product.sizes]);

  useEffect(() => {
    window.scrollTo({ top: 0});
  }, [product.productId]);

  useEffect(() => {
    if (sizeRange.length > 0 && !selectedSize) {
      const firstAvailable = sizeRange.find((sr:any) => sr.available);
      if (firstAvailable) setSelectedSize(firstAvailable.size);
      else if (sizeRange.length > 0) setSelectedSize(sizeRange[0].size);
    }
  }, [sizeRange, selectedSize]);

  const currentColor = useMemo((): string => {
    if (
      product.availableColors &&
      product.availableColors[selectedColorIndex]
    ) {
      const color = product.availableColors[selectedColorIndex];
      return typeof color === "string" ? color : color.name;
    }
    return product.colors?.[selectedColorIndex] || "";
  }, [product.availableColors, product.colors, selectedColorIndex]);

  const currentImages =
    product.images?.[selectedColorIndex] || product.images?.[0] || [];
  const cacheVersion = product.updatedAt ? `?v=${product.updatedAt}` : "";

  const availableQuantity = useMemo(() => {
    if (!product.inventory || !selectedSize || !currentColor) return 0;
    const item = product.inventory.find(
      (i) =>
        i.size === selectedSize &&
        i.color?.toLowerCase() === currentColor.toLowerCase(),
    );
    return item?.quantity || 0;
  }, [product.inventory, selectedSize, currentColor]);

  const handleAddToCart = async () => {
    if (!product.productId && !product.id) {
      toast.error("Product ID not found");
      return;
    }

    // Check if selected size is available
    const selectedSizeData = sizeRange.find((s:any) => s.size === selectedSize);
    if (!selectedSizeData || !selectedSizeData.available) {
      toast.error("Selected size is not available");
      return;
    }

    // Check if enough quantity is available
    if (availableQuantity < quantity) {
      toast.error(
        `Only ${availableQuantity} items available in this size/color`,
      );
      return;
    }

    try {
      const cartSelectedColor =
        currentColor || product.colors?.[0] || "default";
      const cartSelectedSize = selectedSize || product.sizes?.[0] || "default";

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

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 w-full max-w-[1600px] mx-auto">
        <div className="md:col-span-7 lg:col-span-8">
          <ProductImageGrid
            product={product}
            currentImages={currentImages}
            cacheVersion={cacheVersion}
            onImageClick={(idx) => {
              setModalImageIndex(idx);
              setIsModalOpen(true);
            }}
          />
        </div>

        <div className="md:col-span-5 lg:col-span-4 space-y-6 md:sticky md:top-40 md:self-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg md:text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-sm font-semibold"
                    style={{
                      backgroundColor: `${customRed}20`,
                      color: customRed,
                    }}
                  >
                    {discountPercentage}% Off
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-500">Inclusive Of All Taxes</p>
          </div>
          <ProductVariants
            product={product}
            selectedColorIndex={selectedColorIndex}
            setSelectedColorIndex={setSelectedColorIndex}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            customRed={customRed}
            setShowSizeGuide={setShowSizeGuide}
            categoryConfig={categoryConfig}
            sizeRange={sizeRange}
          />

          <DeliveryChecker customRed={customRed} />

          <ProductPurchaseSection
            product={product}
            selectedSize={selectedSize}
            availableQuantity={availableQuantity}
            addingToCart={addingToCart === (product.productId || product.id)}
            onAddToCart={handleAddToCart}
            customRed={customRed}
          />
          <p className="text-[14px] md:text-[16px] text-gray-500 italic mt-4 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
            <span className="font-semibold not-italic text-gray-700">
              Note:
            </span>{" "}
            The color of the product may vary slightly, as screen resolution
            differs on devices used to view our website.
          </p>
        </div>

        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          currentImages={currentImages}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          product={product}
          currentColor={currentColor}
        />

        <SizeGuideModal
          isOpen={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          category={product.category}
          productSizes={product.sizes}
        />
      </div>
      <div className="pt-16 border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Side: Overview & Details */}
          <div className="space-y-10 lg:sticky lg:top-28 lg:self-start">
            {product.overview && product.overview.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-red-900 rounded-full" />
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                    Product Overview
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-600 leading-relaxed">
                  {product.overview.map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-red-900 font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {product.details && product.details.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-red-900 rounded-full" />
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                    Details & Features
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-x-8 gap-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-2 text-sm">
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </div>
                  ))}
                  {product.material && (
                    <div className="flex gap-2 text-sm col-span-full mt-2 pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">
                        Material:
                      </span>
                      <span className="text-gray-700">{product.material}</span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {!product.overview?.length && !product.details?.length && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-red-900 rounded-full" />
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                    Product Description
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description ||
                    "Elegant handcrafted creation from Gulbhahar."}
                </p>
              </section>
            )}
          </div>

          {/* Right Side: Reviews */}
          <div className="lg:border-l lg:pl-4 border-gray-100">
            <Reviews
              variant="mobile"
              productId={product.productId || product.id || ""}
            />
            <Reviews
              variant="desktop"
              productId={product.productId || product.id || ""}
            />
          </div>
        </div>
      </div>
    </>
  );
};
