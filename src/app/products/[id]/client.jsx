"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  Package,
  Truck,
  ChevronRight,
  Home,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ZoomIn,
  ShoppingBag,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Ruler,
  Loader2,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Check,
  HelpCircle,
  Info,
} from "lucide-react";
import { useAuth } from "@/providers/ContextProviders/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useCart } from "@/providers/ContextProviders/CartContext";
import Link from "next/link";
import ImageModal from "./components/ImageModal";
import Reviews from "./components/Reviews";
import { checkDeliveryAPI } from "../../api/delivery/deliveryApi";
import { toast } from "sonner";
import { gaEvent } from "@/utils/gtm/gtag";
import { fbEvent } from "@/utils/fb/metaPixels";

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
  
  const categoryKey = category?.toLowerCase();
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
  const categoryKey = product.category?.toLowerCase();
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
  const sizeRange = useMemo(() => {
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

  // Size Guide Modal
  const SizeGuideModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const isFootwear = ["juttis", "heels", "footwear"].includes(product.category?.toLowerCase());
    const isBag = product.category?.toLowerCase() === "bags";
    const isSaree = product.category?.toLowerCase() === "sarees";
    const isClothing = ["suits", "clothing", "clothes"].includes(product.category?.toLowerCase());

    const footwearSizeChart = [
      { eu: '35', uk: '2.5', us: '5', cm: '22.5', inches: '8.9' },
      { eu: '36', uk: '3.5', us: '6', cm: '23.0', inches: '9.1' },
      { eu: '37', uk: '4', us: '6.5', cm: '23.5', inches: '9.3' },
      { eu: '38', uk: '5', us: '7.5', cm: '24.0', inches: '9.4' },
      { eu: '39', uk: '6', us: '8.5', cm: '24.5', inches: '9.6' },
      { eu: '40', uk: '6.5', us: '9', cm: '25.0', inches: '9.8' },
      { eu: '41', uk: '7.5', us: '10', cm: '25.5', inches: '10.0' },
    ];

    const clothingSizeChart = [
      { size: "XS", chest: "34-36", waist: "28-30", length: "26" },
      { size: "S", chest: "36-38", waist: "30-32", length: "27" },
      { size: "M", chest: "38-40", waist: "32-34", length: "28" },
      { size: "L", chest: "40-42", waist: "34-36", length: "29" },
      { size: "XL", chest: "42-44", waist: "36-38", length: "30" },
      { size: "XXL", chest: "44-46", waist: "38-40", length: "31" },
      { size: "3XL", chest: "46-48", waist: "40-42", length: "32" },
    ];

    const sareeSizeChart = [
      { type: "Standard Saree", length: "5.5 - 6 yards", blouse: "Separate blouse piece included" },
      { type: "Designer Saree", length: "5.5 - 6 yards", blouse: "Blouse included or available separately" },
      { type: "Wedding Saree", length: "6 - 9 yards", blouse: "Heavy blouse piece included" },
    ];

    const measurementSteps = [
      { number: "1", title: "Prepare", description: "Place a piece of paper on a hard floor against a wall. Wear the socks you plan to wear with the shoes." },
      { number: "2", title: "Position", description: "Stand on the paper with your heel against the wall. Keep your full weight on the foot you're measuring." },
      { number: "3", title: "Mark", description: "Mark the end of your longest toe on the paper. This might not be your big toe!" },
      { number: "4", title: "Measure", description: "Use a ruler to measure the distance from the wall to the mark. This is your foot length." },
      { number: "5", title: "Repeat", description: "Repeat for the other foot and use the larger measurement to find your size in our chart." },
    ];

    const fitTips = [
      { 
        icon: <Check className="w-5 h-5 text-green-600" />,
        title: "What to Look For in a Good Fit",
        points: [
          "There should be about a thumb's width (1/2 inch) between your longest toe and the front of the shoe",
          "The shoe should feel snug but not tight around the widest part of your foot",
          "Your heel should not slip when walking",
          "You should be able to wiggle your toes freely",
          "If you're between sizes, consider the shoe style - go larger for thick socks or athletic shoes"
        ]
      }
    ];

    const clothingFitTips = [
      { 
        icon: <Check className="w-5 h-5 text-green-600" />,
        title: "What to Look For in a Good Fit",
        points: [
          "Shoulders should align with the garment's shoulder seams",
          "Sleeves should end at your wrist bone",
          "There should be enough room to move comfortably",
          "The waist should sit comfortably without digging in",
          "Length should be appropriate for the garment style"
        ]
      }
    ];

    const sareeFitTips = [
      { 
        icon: <Check className="w-5 h-5 text-green-600" />,
        title: "What to Look For in a Good Fit",
        points: [
          "Ensure the saree length is appropriate for your height",
          "The blouse should fit snugly but comfortably",
          "Pallu length should drape elegantly",
          "Consider the fabric weight for comfort",
          "Check for ease of movement when draped"
        ]
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center" style={{ backgroundColor: `${CUSTOM_RED}20` }}>
                  <Ruler className="w-5 h-5" style={{ color: CUSTOM_RED }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Size Guide</h2>
                  <p className="text-gray-600">Find your perfect fit</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mt-6">
              <button
                onClick={() => setActiveTab("chart")}
                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "chart" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
                style={activeTab === "chart" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
              >
                <span className="text-lg">📏</span> Size Chart
              </button>
              
              {isFootwear && (
                <button
                  onClick={() => setActiveTab("measure")}
                  className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "measure" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
                  style={activeTab === "measure" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
                >
                  <span className="text-lg">📐</span> How to Measure
                </button>
              )}
              
              <button
                onClick={() => setActiveTab("tips")}
                className={`px-4 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === "tips" ? "border-b-2" : "text-gray-500 hover:text-gray-700"}`}
                style={activeTab === "tips" ? { borderColor: CUSTOM_RED, color: CUSTOM_RED } : {}}
              >
                <span className="text-lg">💡</span> Fit Tips
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Size Chart Tab */}
            {activeTab === "chart" && (
              <div className="space-y-6">
                {isBag ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Bag Dimensions</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {product.sizes && product.sizes.length > 0 ? (
                        <div className="space-y-2">
                          {product.sizes[0].split(/[x\s]+/).map((dim, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="font-medium text-gray-700">
                                {["Height", "Width", "Depth"][idx] || `Dimension ${idx + 1}`}:
                              </span>
                              <span className="font-medium" style={{ color: CUSTOM_RED }}>{dim.trim()} cm</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">No size information available</p>
                      )}
                    </div>
                  </div>
                ) : isSaree ? (
                  <div className="overflow-x-auto">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Saree Size Guide</h3>
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Saree Type</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Length</th>
                          <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Blouse</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sareeSizeChart.map((size, index) => (
                          <tr key={size.type} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                            <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.type}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.length}</td>
                            <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.blouse}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : isFootwear ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Footwear Size Chart</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">EU Size</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">UK Size</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">US Size</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Foot Length (cm)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {footwearSizeChart.map((size, index) => (
                            <tr key={size.eu} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                              <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.eu}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.uk}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.us}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{size.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : isClothing ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Clothing Size Chart</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Size</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Chest (inches)</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Waist (inches)</th>
                            <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Length (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clothingSizeChart.map((size, index) => (
                            <tr key={size.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                              <td className="border border-gray-200 px-4 py-3 font-semibold" style={{ color: CUSTOM_RED }}>{size.size}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.chest}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.waist}</td>
                              <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.length}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No size chart available for this product category.</p>
                  </div>
                )}
              </div>
            )}

            {/* How to Measure Tab */}
            {activeTab === "measure" && isFootwear && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">How to Measure Your Feet</h3>
                <p className="text-gray-600">Follow these simple steps for the most accurate measurement</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {measurementSteps.map((step, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: CUSTOM_RED }}>
                            {step.number}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Tip:</strong> Always measure both feet and use the larger measurement. If your measurements fall between sizes, we recommend choosing the larger size.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fit Tips Tab */}
            {activeTab === "tips" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Perfect Fit Tips</h3>
                <p className="text-gray-600">Expert advice for finding your ideal fit</p>
                
                {isFootwear ? (
                  <div className="space-y-4">
                    {fitTips.map((tip, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                            <ul className="space-y-2">
                              {tip.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isSaree ? (
                  <div className="space-y-4">
                    {sareeFitTips.map((tip, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                            <ul className="space-y-2">
                              {tip.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isClothing ? (
                  <div className="space-y-4">
                    {clothingFitTips.map((tip, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                            <ul className="space-y-2">
                              {tip.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-2">
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-gray-700">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Fit tips are specific to each product category.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-3 sm:p-6 rounded-b-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p>Need more help? <a href="/contact" className="hover:underline" style={{ color: CUSTOM_RED }}>Contact Us</a></p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="text-gray-700 bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Back to Product
                </button>
                <button
                  onClick={onClose}
                  className="text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors font-medium"
                  style={{ backgroundColor: CUSTOM_RED }}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const sizeRange = generateSizeRange(product.sizes || [], product.category);

  // Show loading screen while images are preloading
  // if (!pageReady) {
  //   return (
  //     <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
  //       <div className="text-center space-y-4">
  //         <div className="relative">
  //           <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto" />
  //         </div>
  //         <p className="text-gray-600 font-medium">Loading images...</p>
  //         <p className="text-gray-400 text-sm">This may take a moment on first visit</p>
  //       </div>
  //     </div>
  //   );
  // }

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
            <div className="px-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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