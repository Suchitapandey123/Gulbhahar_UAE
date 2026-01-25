"use client";
import { useAuth } from "@/providers/ContextProviders/AuthContext";
import { useCart } from "@/providers/ContextProviders/CartContext";
import {
  AlertCircle,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Heart,
  Home,
  Loader2,
  Ruler,
  ShoppingBag,
  ShoppingCart,
  X,
  ZoomIn
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useToast } from "../../../hooks/useToast";
import { checkDeliveryAPI } from "../../api/delivery/deliveryApi";
import ImageModal from "./components/ImageModal";
import Reviews from "./components/Reviews";
import SizeGuideModal from "./components/SizeGuide";

// Define the custom red color
const CUSTOM_RED = "hsl(359.39deg 63.87% 30.39%)";

// Size configurations for different categories
const SIZE_CONFIGS = {
  juttis: {
    label: "Footwear Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
    guideTitle: "Footwear Size Guide"
  },
  heels: {
    label: "Heel Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
    guideTitle: "Footwear Size Guide"
  },
  footwear: {
    label: "Footwear Sizes",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    type: "footwear",
    guideTitle: "Footwear Size Guide"
  },
  bags: {
    label: "Bag Dimensions",
    sizes: [], // Will use product.sizes
    type: "dimensions",
    guideTitle: "Bag Dimensions Guide"
  },
  sarees: {
    label: "Saree Sizes",
    sizes: ["Free Size"],
    type: "clothing",
    guideTitle: "Saree Size Guide"
  },
  suits: {
    label: "Suit Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
    guideTitle: "Clothing Size Guide"
  },
  clothing: {
    label: "Clothing Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
    guideTitle: "Clothing Size Guide"
  },
  default: {
    label: "Sizes",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    type: "clothing",
    guideTitle: "Size Guide"
  }
};

// Dynamic size range generator based on category and inventory
const generateSizeRange = (inventory, category, availableSizes = []) => {
  if (!inventory || inventory.length === 0) return [];
  
  const categoryKey = category[0]
  const config = SIZE_CONFIGS[categoryKey] || SIZE_CONFIGS.default;
  
  // For bags, use product.sizes directly
  if (config.type === 'dimensions') {
    return availableSizes.map((size) => ({
      size,
      available: true,
      quantity: 1 // Bags typically have 1 quantity
    }));
  }
  
  // For other categories, check inventory
  const availableSizeQuantities = {};
  
  // Calculate total quantity for each size
  inventory.forEach(item => {
    if (item.size && item.quantity > 0) {
      availableSizeQuantities[item.size] = (availableSizeQuantities[item.size] || 0) + item.quantity;
    }
  });
  
  // Return sizes with availability and quantity
  return config.sizes.map((size) => ({
    size,
    available: availableSizeQuantities[size] > 0,
    quantity: availableSizeQuantities[size] || 0
  }));
};

export function ProductClient({ product, similarProducts }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showToast, ToastContainer } = useToast();
  const { addToCart, addingToCart } = useCart();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [pincode, setPincode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Page loading state - hide page until images are loaded
  const [pageReady, setPageReady] = useState(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPageReady(false);
  }, [product.productId]);

  // Preload critical images before showing page
  useEffect(() => {
    const firstColorImages = product.images?.[0] || [];

    if (firstColorImages.length === 0) {
      setPageReady(true);
      return;
    }

    const cacheVersion = product.updatedAt ? `?v=${product.updatedAt}` : '';

    // Build Next.js optimized image URLs for faster loading
    const imagesToPreload = firstColorImages.slice(0, 4).map((src, idx) => {
      const imageSrc = src.startsWith('/') ? src : `${src}${cacheVersion}`;

      // Use Next.js image optimization URL with lower quality for faster processing
      if (!src.startsWith('/')) {
        // Determine appropriate width based on viewport
        const width = idx < 2 ? 828 : 640; // Smaller sizes = faster optimization
        const quality = 60; // Lower quality = faster processing
        return `/_next/image?url=${encodeURIComponent(imageSrc)}&w=${width}&q=${quality}`;
      }
      return imageSrc;
    });

    let loadedCount = 0;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new window.Image();

        img.onload = () => {
          loadedCount++;
          resolve(src);
        };

        img.onerror = () => {
          loadedCount++;
          resolve(src); // Resolve even on error to not block page
        };

        // Set critical attributes for faster loading
        img.fetchPriority = loadedCount < 2 ? 'high' : 'low';
        img.decoding = 'async';
        img.src = src;
      });
    };

    // Set a timeout to show page even if images take too long
    const timeout = setTimeout(() => {
      if (!pageReady) {
        console.warn('Image preload timeout - showing page anyway');
        setPageReady(true);
      }
    }, 3000); // 3 second max wait

    // Preload all critical images
    Promise.all(imagesToPreload.map(preloadImage))
      .then(() => {
        clearTimeout(timeout);
        setPageReady(true);
      })
      .catch(() => {
        clearTimeout(timeout);
        setPageReady(true); // Show page even if preload fails
      });

    return () => clearTimeout(timeout);
  }, [product.productId, product.images, product.updatedAt]);

  // Delivery states
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [hasCheckedDelivery, setHasCheckedDelivery] = useState(false);

  // Image Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef(null);

  // Get category configuration
  const categoryKey = product.category[0];
  
  const categoryConfig = SIZE_CONFIGS[categoryKey] || SIZE_CONFIGS.default;

  // Process available colors with hexcodes
  const availableColors = useMemo(() => {
    if (product.availableColors && product.availableColors.length > 0) {
      return product.availableColors.map(color => ({
        name: color.name || color,
        hexcode: color.hexcode || "#e5ab0b" // Default hexcode if not provided
      }));
    }
    // Fallback to colors array if availableColors is not provided
    return product.colors?.map(color => ({
      name: color,
      hexcode: "#e5ab0b" // Default hexcode
    })) || [];
  }, [product.availableColors, product.colors]);

  // Get current color and its images
  const currentColor = availableColors[selectedColorIndex]?.name || "";
  const currentColorHex = availableColors[selectedColorIndex]?.hexcode || "#e5ab0b";
  
  // Get images for current color
  const currentImages = product.images?.[selectedColorIndex] || product.images?.[0] || [];

  // Generate size range based on inventory and category
  let sizeRange = useMemo(() => {
    return generateSizeRange(product.inventory, product.category, product.sizes);
  }, [product.inventory, product.category, product.sizes]);

  // Initialize selected size
  useEffect(() => {
    if (sizeRange.length > 0 && !selectedSize) {
      const firstAvailable = sizeRange.find(size => size.available);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.size);
      } else if (sizeRange.length > 0) {
        setSelectedSize(sizeRange[0].size);
      }
    }
  }, [sizeRange, selectedSize]);

  // Check if selected size has enough quantity for current quantity
  const currentSizeInventory = useMemo(() => {
    if (!product.inventory || !selectedSize || !currentColor) return null;
    
    return product.inventory.find(item => 
      item.size === selectedSize && 
      item.color?.toLowerCase() === currentColor.toLowerCase()
    );
  }, [product.inventory, selectedSize, currentColor]);

  // Get available quantity for selected size and color
  const availableQuantity = currentSizeInventory?.quantity || 0;

  // Add cache-busting to main image
  const cacheVersion = product.updatedAt ? `?v=${product.updatedAt}` : '';

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Delivery API function
  const checkDelivery = async (pincodeValue = pincode) => {
    if (!pincodeValue || pincodeValue.length !== 6) {
      setDeliveryError("Please enter a valid 6-digit pincode");
      return;
    }

    setIsCheckingDelivery(true);
    setDeliveryError("");
    setDeliveryInfo(null);

    try {
      const data = await checkDeliveryAPI(pincodeValue);
      
      if (data.msg.delivery_codes && data.msg.delivery_codes.length > 0) {
        const postalCode = data.msg.delivery_codes[0].postal_code;
        setDeliveryInfo(postalCode);
        setHasCheckedDelivery(true);

        toast.success(
          `Delivery available to ${postalCode.city}, ${postalCode.district}`,
          "success"
        );
      } else {
        setDeliveryError("Delivery not available to this pincode");
        toast.error("Delivery not available to this pincode", "error");
      }
    } catch (error) {
      console.error("Delivery check error:", error);
      setDeliveryError("Failed to check delivery. Please try again.");
      toast.error("Failed to check delivery availability", "error");
    } finally {
      setIsCheckingDelivery(false);
    }
  };

  // Clear delivery info when pincode changes
  useEffect(() => {
    if (pincode.length < 6) {
      setDeliveryInfo(null);
      setDeliveryError("");
      setHasCheckedDelivery(false);
    }
  }, [pincode]);

  // Image Modal Functions
  const handleStart = (clientX) => {
    setStartX(clientX);
    setCurrentX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (diff > threshold) {
      nextImage();
    } else if (diff < -threshold) {
      prevImage();
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse Events
  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  // Touch Events
  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setModalImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );
  };

  const openModal = (imageIndex = mainImageIndex) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleAddToCart = async () => {
    if (!product.productId && !product.id) {
      toast.error("Product ID not found", "error");
      return;
    }

    // Check if selected size is available
    const selectedSizeData = sizeRange.find(s => s.size === selectedSize);
    if (!selectedSizeData || !selectedSizeData.available) {
      toast.error("Selected size is not available", "error");
      return;
    }

    // Check if enough quantity is available
    if (availableQuantity < quantity) {
      toast.error(`Only ${availableQuantity} items available in this size/color`, "error");
      return;
    }

    try {
      const cartSelectedColor = currentColor || product.colors?.[0] || "default";
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
      } else {
        toast.error(result.message || "Failed to add item to cart");
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", error);
    }
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setMainImageIndex(0);
    
    // Reset selected size when color changes
    const availableSizes = product.inventory
      ?.filter(item => item.color?.toLowerCase() === availableColors[colorIndex]?.name?.toLowerCase() && item.quantity > 0)
      .map(item => item.size);
    
    if (availableSizes && availableSizes.length > 0) {
      if (!availableSizes.includes(selectedSize)) {
        setSelectedSize(availableSizes[0]);
      }
    }
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const increaseQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity(prev => prev + 1);
    } else {
      toast.error(`Only ${availableQuantity} items available`);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <ToastContainer />

      {isModalOpen && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          currentImages={currentImages}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          product={product}
          currentColor={currentColor}
          currentMainImage={currentImages[modalImageIndex]}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
        />
      )}

      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        category={product.category}
        productSizes={product.sizes}
      />

      <div className="min-h-screen bg-white py-4 mt-10 sm:mt-0 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 font-raleway">
        <div className="max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">
          {/* Breadcrumb */}
          <div className="mb-4 lg:mb-6">
            <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto pb-1">
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hover:text-gray-800 cursor-pointer whitespace-nowrap" style={{ color: CUSTOM_RED }}>
                  Shop
                </span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span
                  className="hover:text-gray-800 cursor-pointer whitespace-nowrap max-w-[80px] sm:max-w-none truncate"
                  style={{ color: CUSTOM_RED }}
                  title={product.category}
                >
                  {product.category}
                </span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span
                  className="text-gray-900 font-medium whitespace-nowrap max-w-[100px] sm:max-w-[200px] lg:max-w-none truncate"
                  title={product.name}
                >
                  {product.name}
                </span>
              </div>
            </nav>
          </div>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 lg:gap-8">
            {/* Left Column - Images Grid */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="grid grid-cols-2 gap-3">
                {currentImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full overflow-hidden bg-gray-100 rounded cursor-pointer"
                    style={{ aspectRatio: "3 / 4" }}
                    onClick={() => openModal(idx)}
                  >
                    <Image
                      src={img.startsWith('/') ? img : `${img}${cacheVersion}`}
                      alt={`${product.name} - Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 30vw"
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

              {/* DESCRIPTION SECTION - MOVED HERE (Below Images) */}
              <div className="mt-8 lg:mt-10">
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">DESCRIPTION</h2>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description || product.title || "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-4 max-w-[420px]">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* SKU */}
              {/* <div className="text-sm text-gray-600">
                <span className="font-medium">Sku:</span> {product.productId || product.id || "N/A"}
              </div> */}

              {/* Pricing Section */}
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
                      <span className="px-2 py-1 rounded text-sm font-semibold" style={{ backgroundColor: `${CUSTOM_RED}20`, color: CUSTOM_RED }}>
                        {discountPercentage}% Off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive Of All Taxes</p>
              </div>

              {/* Color Selection */}
              {availableColors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-medium text-gray-900">Color:</h3>
                  
                  {/* Color Swatches with hexcodes */}
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorChange(idx)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-all duration-200 capitalize ${
                          selectedColorIndex === idx
                            ? "text-white font-semibold shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                        style={selectedColorIndex === idx ? { backgroundColor: CUSTOM_RED } : {}}
                      >
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hexcode }}
                          title={color.name}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Selected:</span>{" "}
                    <span className="capitalize font-semibold" style={{ color: CUSTOM_RED }}>
                      {currentColor}
                    </span>
                  </div>
                </div>
              )}

              {/* Size Selection - FIXED: Removed red bullet */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-gray-900">{categoryConfig.label}:</h3>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm hover:underline flex items-center gap-1"
                    style={{ color: CUSTOM_RED }}
                  >
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizeRange.map(({ size, available, quantity }) => {
                    // Show sizes based on category
                    const shouldShowSize = categoryConfig.sizes.includes(size) || 
                                          categoryConfig.type === 'dimensions' ||
                                          (categoryKey === 'sarees' && size === 'Free Size');
                    
                    if (!shouldShowSize) return null;
                    
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`px-4 py-2.5 text-sm border rounded transition-all font-medium ${
                          selectedSize === size && available
                            ? "text-white"
                            : available
                            ? "border-gray-300 hover:border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                        }`}
                        style={selectedSize === size && available ? { 
                          backgroundColor: CUSTOM_RED,
                          borderColor: CUSTOM_RED 
                        } : {}}
                        title={available ? `${quantity} available` : 'Out of stock'}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {/* Stock information */}
                {selectedSize && availableQuantity > 0 && (
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Available Stock:</span>{" "}
                    <span className={availableQuantity <= 5 ? "font-semibold" : "text-green-600"} style={availableQuantity <= 5 ? { color: CUSTOM_RED } : {}}>
                      {availableQuantity} {availableQuantity === 1 ? 'item' : 'items'} available
                    </span>
                    {availableQuantity <= 5 && (
                      <span className="ml-2 text-xs px-2 py-1 rounded" style={{ backgroundColor: `${CUSTOM_RED}20`, color: CUSTOM_RED }}>
                        Low stock!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              {/* <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className={`px-3 py-2 ${quantity <= 1 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= availableQuantity}
                    className={`px-3 py-2 ${quantity >= availableQuantity ? 'text-gray-400' : 'hover:bg-gray-100'}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {availableQuantity > 0 && (
                  <div className="text-sm text-gray-600">
                    Max: {availableQuantity} {availableQuantity === 1 ? 'item' : 'items'}
                  </div>
                )}
              </div> */}

              {/* Add to Cart Button */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart === (product.productId || product.id) || !selectedSize || availableQuantity === 0}
                  className={`w-full py-3.5 text-white rounded-lg font-medium text-lg transition-colors flex items-center justify-center gap-3 ${
                    addingToCart === (product.productId || product.id) || !selectedSize || availableQuantity === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  style={{ backgroundColor: CUSTOM_RED }}
                >
                  {addingToCart === (product.productId || product.id) ? (
                    <div className="flex items-center justify-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding...
                    </div>
                  ) : !selectedSize ? (
                    "SELECT SIZE"
                  ) : availableQuantity === 0 ? (
                    "OUT OF STOCK"
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      ADD TO CART
                    </>
                  )}
                </button>
              </div>

              {/* Wishlist Button */}
              <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700">
                <Heart className="w-5 h-5" />
                Add to Wishlist
              </button>

              {/* Delivery Section */}
              <div className="border-t border-b border-gray-200 py-6 space-y-4">
                <h3 className="text-base font-medium text-gray-900">Delivery For</h3>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPincode(value);
                    }}
                    placeholder="Enter your Pincode"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
                    maxLength={6}
                    inputMode="numeric"
                  />
                  <button
                    onClick={() => checkDelivery()}
                    disabled={isCheckingDelivery || pincode.length !== 6}
                    className="px-6 py-3 text-white rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    style={{ backgroundColor: CUSTOM_RED }}
                  >
                    {isCheckingDelivery ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "CHECK"
                    )}
                  </button>
                </div>

                {/* Delivery Options */}
                

                {/* Delivery Info */}
                {deliveryError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-center gap-2 text-sm text-red-800">
                      <AlertCircle className="w-4 h-4" />
                      <span>{deliveryError}</span>
                    </div>
                  </div>
                )}

                {deliveryInfo && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle className="w-4 h-4" />
                      <span>Delivery available to {deliveryInfo.city}, {deliveryInfo.district}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details Accordion - REMOVED DESCRIPTION FROM HERE */}
              <div className="space-y-0">
                {/* OVERVIEW */}
                {product.overview && product.overview.length > 0 && (
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleAccordion('overview')}
                      className="w-full py-4 flex justify-between items-center text-left"
                    >
                      <span className="font-medium text-gray-900">OVERVIEW</span>
                      {openAccordion === 'overview' ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openAccordion === 'overview' && (
                      <div className="pb-4 text-sm text-gray-600">
                        <ul className="space-y-2">
                          {product.overview.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* DETAILS */}
                {product.details && product.details.length > 0 && (
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => toggleAccordion('details')}
                      className="w-full py-4 flex justify-between items-center text-left"
                    >
                      <span className="font-medium text-gray-900">DETAILS</span>
                      {openAccordion === 'details' ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openAccordion === 'details' && (
                      <div className="pb-4 text-sm text-gray-600">
                        <ul className="space-y-2">
                          {product.details.map((detail, idx) => (
                            <li key={idx}>• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* MATERIAL */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('material')}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <span className="font-medium text-gray-900">MATERIAL</span>
                    {openAccordion === 'material' ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                    {openAccordion === 'material' && (
                      <div className="pb-4 text-sm text-gray-600">
                        {product.material || "Cotton Blend"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

         

          {/* Reviews Section */}
          <div className="mt-12">
            <Reviews productId={product.productId} />
          </div>

          {/* Interested Products Section */}
          <div className="mt-16 lg:mt-24">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-grow h-px bg-gray-300"></div>
              <h3 className="text-xl sm:text-2xl font-medium mx-4 text-gray-900">
                Similar Products
              </h3>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
              {similarProducts.map((item, index) => (
                <div key={item.productId} className="group w-full">
                  <Link href={`/products/${item.productId}`}>
                    <div className="cursor-pointer relative space-y-3">
                      {/* Image Container */}
                      <div className="relative overflow-hidden w-full aspect-[3/4]">
                        <div className="relative w-full h-full bg-gray-100">
                          <Image
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            quality={60}
                            src={item.images?.[0]?.[0] || "/about/lal-ishq-1.jpg"}
                            alt={item.name || "Product Image"}
                            className="absolute inset-0 w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = "/about/lal-ishq-1.jpg";
                            }}
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </div>

                        {/* Stock Tag - FIXED: Show without red bullet */}
                        {item.stock && item.stock <= 5 && item.stock > 0 && (
                          <span className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded z-10" style={{ backgroundColor: CUSTOM_RED }}>
                            Only {item.stock} left!
                          </span>
                        )}

                        {/* Discount Badge */}
                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                              {Math.round(
                                ((item.originalPrice - item.price) /
                                  item.originalPrice) *
                                100
                              )}
                              % OFF
                            </span>
                          )}

                        {/* Hover Add to Cart Button */}
                        <div className="absolute bottom-0 left-0 right-0 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0" style={{ backgroundColor: CUSTOM_RED }}>
                          <button
                            onClick={async (e) => {
                              e.preventDefault(); // Prevent navigation to product page
                              e.stopPropagation(); // Stop event bubbling

                              if (!item.productId && !item.id) {
                                toast.error("Product ID not found for similar product");
                                return;
                              }

                              try {
                                const cartSelectedColor = item.colors?.[0] || "default";
                                const cartSelectedSize = item.sizes?.[0] || "default";

                                const cartItem = {
                                  ...item,
                                  id: item.productId || item.id,
                                  productId: item.productId || item.id,
                                  selectedColor: cartSelectedColor,
                                  selectedSize: cartSelectedSize,
                                  selectedColorIndex: 0,
                                  addedAt: new Date().toISOString(),
                                };

                                const result = await addToCart(cartItem);

                                if (result.success) { 
                                  toast.success(
                                    `${item.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
                                    "success"
                                  )
                                } else {
                                  toast.error(result.message || "Failed to add item to cart");
                                }
                              } catch (error) {
                                console.log(error)
                                toast.error(error);
                              }
                            }}
                            disabled={addingToCart === (item.productId || item.id)}
                            className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
                          >
                            {addingToCart === (item.productId || item.id) ? (
                              <>
                                {/* Spinner */}
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Adding...</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={14} />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Product Info - Grid Layout */}
                      <div className="flex flex-col justify-between h-full px-2 py-2 space-y-1">
                        {/* Top Row - Product Name & Price */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                              {item.name?.toUpperCase() || "PRODUCT NAME"}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="flex flex-col items-end gap-0.5">
                              <span className="text-sm font-bold" style={{ color: CUSTOM_RED }}>
                                ₹{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice &&
                                item.originalPrice > item.price && (
                                  <span className="text-xs text-gray-400 line-through">
                                    ₹{item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Second Row - Stock Status - FIXED: Show without red bullet */}
                        <div className="flex items-center justify-start text-xs">
                          <div className="flex-1">
                            {item.stock && item.stock <= 5 && item.stock > 0 ? (
                              <span className="font-medium" style={{ color: CUSTOM_RED }}>
                                {item.stock} left
                              </span>
                            ) : (
                              <span className="text-green-600 font-medium">
                                In Stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Row - Metadata */}
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          {/* Sizes */}
                          <div className="flex items-center gap-1">
                            {item.sizes && item.sizes.length > 0 && (
                              <>
                                <span className="text-gray-500">Size:</span>
                                <div className="flex gap-1">
                                  {item.sizes.slice(0, 2).map((size, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                  {item.sizes.length > 2 && (
                                    <span className="text-gray-500">
                                      +{item.sizes.length - 2}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>

                          {/* Colors */}
                          <div className="flex items-center gap-1">
                            {item.colors && item.colors.length > 0 && (
                              <div className="flex items-center gap-1">
                                {item.colors.slice(0, 3).map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{
                                      backgroundColor: color.toLowerCase(),
                                    }}
                                    title={color}
                                  />
                                ))}
                                {item.colors.length > 3 && (
                                  <span className="text-gray-500 text-xs">
                                    +{item.colors.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}