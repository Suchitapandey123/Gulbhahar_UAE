"use client";
import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { useAuth } from "../../../Providers/ContextProviders/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useCart } from "../../../Providers/ContextProviders/CartContext";
import Link from "next/link";
import ImageModal from "./components/ImageModal";
import Reviews from "./components/Reviews";
import { checkDeliveryAPI } from "../../api/deliveryApi/deliveryApi";
import { toast } from "sonner";

const generateSizeRange = (availableSizes) => {
  const allSizes = ["35", "36", "37", "38", "39", "40", "41"];
  return allSizes.map((size) => ({
    size,
    available: availableSizes.includes(size),
  }));
};

export function ProductClient({ product, similarProducts }) {

  useEffect(() => {
  if (!product || !window.fbq) return;


  fbq("track", "ProductView", {
    content_ids: [product.productId || product.id],
    content_name: product.name,
    content_type: "product",
    value: parseFloat(product.price) || 0,
    currency: "INR",
  });
}, [product?.id]);
  // console.log(product)
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showToast, ToastContainer } = useToast();
  const { addToCart, addingToCart } = useCart();
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [pincode, setPincode] = useState("");

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

  // Get current color and its images
  const currentColor = product.colors[selectedColorIndex];
  const currentImages = product.images[selectedColorIndex] || [];
  const currentMainImage =
    currentImages[mainImageIndex] || "/assets/Image/About1.png";

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
      // const response = await fetch(
      //   `https://api.gulbhahar.com/delhiveryRoutes/v0/checkAvalibility?pincode=${pincodeValue}`,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "User-Agent": "www.gulbhahar.com"
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("Failed to fetch delivery information");
      // }

      // const data = await response.json();
      // console.log("Delivery check response:", data.msg);
       
      
      if (data.msg.delivery_codes && data.msg.delivery_codes.length > 0) {
        const postalCode = data.msg.delivery_codes[0].postal_code;
        setDeliveryInfo(postalCode);
        setHasCheckedDelivery(true);

        // Calculate estimated delivery date (assuming 2-3 days for prepaid)
        const deliveryDate = new Date();
        deliveryDate.setDate(
          deliveryDate.getDate() + (postalCode.pre_paid === "Y" ? 2 : 3)
        );

        toast.success(
            `Delivery available to ${postalCode.city}, ${postalCode.district}`,
          "success"
        )

        // showToast(
        //   `Delivery available to ${postalCode.city}, ${postalCode.district}`,
        //   "success"
        // );
      } else {
        setDeliveryError("Delivery not available to this pincode");
        // showToast("Delivery not available to this pincode", "error");
        toast.error("Delivery not available to this pincode", "error");
      }
    } catch (error) {
      console.error("Delivery check error:", error);
      setDeliveryError("Failed to check delivery. Please try again.");
      // showToast("Failed to check delivery availability", "error");
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

  // Format delivery date
  const formatDeliveryDate = () => {
    if (!deliveryInfo) return null;

    const deliveryDate = new Date();
    deliveryDate.setDate(
      deliveryDate.getDate() + (deliveryInfo.pre_paid === "Y" ? 7 : 10)
    );

    return deliveryDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  // Image Modal Functions
  const openModal = (imageIndex = mainImageIndex) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setModalImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length
    );
  };

  // Touch/Mouse Events for Modal
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
    console.log("🛒 Product Detail - Adding to cart:", product);

    if (!product.productId && !product.id) {
      // showToast("Product ID not found", "error");
      toast.error("Product ID not found", "error");
      return;
    }

    try {
      const cartSelectedColor =
        currentColor || product.colors?.[0] || "default";
      const cartSelectedSize = selectedSize || product.sizes?.[0] || "default";

      console.log("🎨 Selected variants:", {
        color: cartSelectedColor,
        size: cartSelectedSize,
      });

      const cartItem = {
        ...product,
        id: product.productId || product.id,
        productId: product.productId || product.id,
        selectedColor: cartSelectedColor,
        selectedSize: cartSelectedSize,
        selectedColorIndex: selectedColorIndex || 0,
        addedAt: new Date().toISOString(),
      };

      console.log("🔍 Standardized cart item:", cartItem);

      const result = await addToCart(cartItem);

      if (result.success) {
        console.log("✅ Item added successfully to cart");

            if (window.fbq) {
              fbq("track", "AddToCart", {
                content_ids: [product.productId || product.id],
                content_name: product.name,
                content_type: "product",
                value: parseFloat(product.price) || 0,
                currency: "INR",
              });
            }
        // showToast(
        //   `${product.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
        //   "success"
        // );
        toast.success(
           `${product.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
          "success"
        )
      } else {
        toast.error(
          result.message || "Failed to add item to cart"
        )

        // console.log("❌ Failed to add item to cart");
        // showToast(result.message || "Failed to add item to cart", "error");
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", "error");
      // console.error("❌ Error adding to cart:", error);
      // showToast("Failed to add item to cart. Please try again.", "error");
    }
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setMainImageIndex(0);
  };

  // Size Guide Modal Component (add this before your return statement)
const SizeGuideModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('sizing');

  // Size chart data for footwear
  const footwearSizeChart = [
    { eu: '35', uk: '2.5', us: '5', cm: '22.5', inches: '8.9' },
    { eu: '36', uk: '3.5', us: '6', cm: '23.0', inches: '9.1' },
    { eu: '37', uk: '4', us: '6.5', cm: '23.5', inches: '9.3' },
    { eu: '38', uk: '5', us: '7.5', cm: '24.0', inches: '9.4' },
    { eu: '39', uk: '6', us: '8.5', cm: '24.5', inches: '9.6' },
    { eu: '40', uk: '6.5', us: '9', cm: '25.0', inches: '9.8' },
    { eu: '41', uk: '7.5', us: '10', cm: '25.5', inches: '10.0' },
  ];

  const howToMeasure = [
    {
      step: 1,
      title: "Prepare",
      description: "Place a piece of paper on a hard floor against a wall. Wear the socks you plan to wear with the shoes."
    },
    {
      step: 2,
      title: "Position", 
      description: "Stand on the paper with your heel against the wall. Keep your full weight on the foot you're measuring."
    },
    {
      step: 3,
      title: "Mark",
      description: "Mark the end of your longest toe on the paper. This might not be your big toe!"
    },
    {
      step: 4,
      title: "Measure",
      description: "Use a ruler to measure the distance from the wall to the mark. This is your foot length."
    },
    {
      step: 5,
      title: "Repeat",
      description: "Repeat for the other foot and use the larger measurement to find your size in our chart."
    }
  ];

  const fitTips = [
    "There should be about a thumb's width (1/2 inch) between your longest toe and the front of the shoe",
    "The shoe should feel snug but not tight around the widest part of your foot",
    "Your heel should not slip when walking",
    "You should be able to wiggle your toes freely",
    "If you're between sizes, consider the shoe style - go larger for thick socks or athletic shoes"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Ruler className="w-5 h-5 text-red-600" />
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
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            {[
              { id: 'sizing', label: 'Size Chart', icon: '📏' },
              { id: 'measure', label: 'How to Measure', icon: '📐' },
              { id: 'tips', label: 'Fit Tips', icon: '💡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Size Chart Tab */}
          {activeTab === 'sizing' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Important Note</h3>
                    <p className="text-blue-800 text-sm">
                      Our sizes are in EU format. Use the chart below to convert to your preferred sizing system.
                      When in doubt, measure your foot length in centimeters for the most accurate fit.
                    </p>
                  </div>
                </div>
              </div>

              {/* Size Chart Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">EU Size</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">UK Size</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">US Size</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Foot Length (cm)</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Foot Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {footwearSizeChart.map((size, index) => (
                      <tr key={size.eu} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                        <td className="border border-gray-200 px-4 py-3 font-semibold text-red-600">{size.eu}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.uk}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.us}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">{size.cm}</td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">{size.inches}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How to Measure Tab */}
          {activeTab === 'measure' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">How to Measure Your Feet</h3>
                <p className="text-gray-600">Follow these simple steps for the most accurate measurement</p>
              </div>

              <div className="space-y-4">
                {howToMeasure.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fit Tips Tab */}
          {activeTab === 'tips' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perfect Fit Tips</h3>
                <p className="text-gray-600">Expert advice for finding your ideal shoe fit</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <span>✅</span>
                  What to Look For in a Good Fit
                </h4>
                <ul className="space-y-3">
                  {fitTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 text-green-800">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-3 sm:p-6 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>Need more help? <a href="/contact" className="text-red-600 hover:underline">Contact Us</a></p>
            </div>
            <button
              onClick={onClose}
              className="bg-red-600 w-32 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      {isModalOpen && (
        <ImageModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          images={currentImages}
          modalImageIndex={modalImageIndex}
          setModalImageIndex={setModalImageIndex}
          product={product}
          currentMainImage={currentMainImage}
          handleMouseDown={handleMouseDown}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          currentImages={currentImages}
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
                <span className="hover:text-red-900 cursor-pointer whitespace-nowrap">
                  Shop
                </span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                <span
                  className="hover:text-red-900 cursor-pointer whitespace-nowrap max-w-[80px] sm:max-w-none truncate"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[3/4] sm:aspect-auto relative rounded-lg overflow-hidden border md:h-[500px] lg:h-[625px] bg-gray-100 flex items-center justify-center group cursor-pointer">
                <Image
                  src={currentMainImage}
                  alt={`${product.name} - ${currentColor}`}
                  priority
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
                  width={1000}
                  height={700}
                  onClick={() => openModal(mainImageIndex)}
                />
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    className={`aspect-square relative rounded border transition-all duration-200 bg-gray-100 flex items-center justify-center ${
                      mainImageIndex === idx
                        ? "border-red-900 ring-2 ring-red-900 ring-opacity-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      priority
                      className="object-cover w-full h-full"
                      width={1000}
                      height={700}
                    />
                  </button>
                ))}
              </div>

              {/* Product Info below than large // mobile , tab */}
              <div className="lg:pl-16 lg:hidden block py-2">
                {/* Product Title */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600">
                    {product.title || product.category}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8">
                  <span className="text-2xl sm:text-3xl lg:text-4xl text-red-900 font-light">
                    ₹{product.price}
                  </span>
                  <span className="text-gray-500 flex items-center text-lg sm:text-xl">
                    MRP
                    <span className="line-through pl-2">
                      ₹{product.originalPrice}
                    </span>
                  </span>
                  <span className="font-medium text-red-900 text-lg sm:text-xl">
                    ({discountPercentage}% off)
                  </span>
                </div>

                {/* Color Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3 flex flex-wrap items-center gap-2">
                    Color:
                    <span className="text-gray-500 text-sm">
                      {currentColor}
                    </span>
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`w-16 h-20 sm:w-20 sm:h-24 lg:w-[88px] lg:h-[109px] rounded-lg overflow-hidden shadow-md transition-all duration-200 ${
                          selectedColorIndex === idx
                            ? "border-4 border-red-900 shadow-lg"
                            : "shadow-md hover:shadow-lg"
                        }`}
                        onClick={() => handleColorChange(idx)}
                      >
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <Image
                            src={
                              product.images[idx]?.[0] ||
                              "/assets/Image/About1.png"
                            }
                            alt={color}
                            className="object-cover w-full h-full"
                            width={1000}
                            priority
                            height={700}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">
                      {["juttis", "heels"].includes(product.category?.toLowerCase())
        ? "Size"
        : "Details"}
                      </h3>
                       {["juttis", "heels"].includes(product.category?.toLowerCase()) && (
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-red-900 text-xs cursor-pointer hover:underline font-medium flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>Size Guide</span>
                    </button>
                       )}
                  </div>
                  {["juttis", "heels"].includes(product.category?.toLowerCase()) ? (
    <>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-md">
                    {generateSizeRange(product.sizes).map(
                      ({ size, available }, idx) => (
                        <button
                          key={idx}
                          onClick={() => available && setSelectedSize(size)}
                          disabled={!available}
                          className={`py-2 px-1 text-sm border rounded transition-all duration-200 relative ${
                            selectedSize === size && available
                              ? "border-red-900 bg-red-900 text-white shadow-md"
                              : available
                              ? "border-gray-200 hover:border-red-300 bg-white text-gray-900"
                              : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <span
                            // className={`${
                            //   !available
                            //     ? "  decoration-2 decoration-red-900"
                            //     : ""
                            // }`}
                          >
                            {size}
                          </span>
                          {!available && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-0.5 bg-red-900 transform -rotate-45"></div>
                            </div>
                          )}
                        </button>
                      )
                    )}
                  </div>

                  {/* Size availability info */}
                  <div className="mt-3 text-xs text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-900 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-900 transform -rotate-45"></div>
                          </div>
                        </div>
                        <span>Out of stock</span>
                      </div>
                    </div>
                  </div>
                  </>

                  ) : product.category?.toLowerCase() === "bags" ? (
  /* BAG CATEGORY — Handle space-separated or x-separated sizes */
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md">
    {product.sizes && product.sizes.length > 0 ? (
      (
        product.sizes.length === 1
          ? product.sizes[0].split(/[x\s]+/) // split by 'x' or space
          : product.sizes
      ).map((dim, idx) => (
        <div
          key={idx}
          className="py-2 px-3 text-sm text-red-900 font-medium bg-red-50 border border-red-200 rounded text-center capitalize"
        >
          {["Height", "Width", "Depth"][idx] || `Dim ${idx + 1}`}:{" "}
          <span className="font-semibold">{dim.trim()}</span>
        </div>
      ))
    ) : (
      <span className="text-sm text-gray-500">No size info available</span>
    )}
  </div>

  ) : (
    /* Other categories for mobile - Show only selected details */
    <div className="flex items-center gap-2">
      <span className="text-sm text-red-900 font-medium bg-red-50 px-2 py-1 rounded">
        {product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"}
      </span>
    </div>
  )}
                </div>
                {/* Delivery Section - Mobile */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Delivery to</h3>
                  <div className="flex gap-2 max-w-md mb-3">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setPincode(value);
                      }}
                      placeholder="Enter pincode"
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <button
                      onClick={() => checkDelivery()}
                      disabled={isCheckingDelivery || pincode.length !== 6}
                      className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[80px]"
                    >
                      {isCheckingDelivery ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="hidden sm:inline">Checking...</span>
                        </>
                      ) : (
                        "Check"
                      )}
                    </button>
                  </div>

                  {/* Delivery Results */}
                  <div className="space-y-2">
                    {deliveryError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{deliveryError}</span>
                      </div>
                    )}

                    {deliveryInfo && (
                      <div className="space-y-2">
                        {/* Location Info */}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-800">
                            {deliveryInfo.city}, {deliveryInfo.district}
                          </span>
                        </div>

                        {/* Delivery Date */}
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-red-900 text-sm font-medium">
                            Delivery by {formatDeliveryDate()}
                          </p>
                        </div>

                        {/* Delivery Options */}
                        <div className="space-y-1">
                          {deliveryInfo.cod === "Y" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-600">
                                Cash on Delivery Available
                              </span>
                            </div>
                          )}

                          {deliveryInfo.pre_paid === "Y" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-600">
                                Prepaid Orders Accepted
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-gray-600">
                              Delivery within 5-7 business days (Monday-Friday,
                              excluding holidays)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Default message when no pincode entered */}
                    {!hasCheckedDelivery && !deliveryError && !deliveryInfo && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-gray-600 text-sm">
                          {pincode.length === 6
                            ? "Click 'Check' to verify delivery"
                            : "Enter 6-digit pincode to check delivery"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                  {/* Add to Cart + Wishlist */}
                  <div className="flex gap-3 sm:gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={
                        addingToCart === (product.productId || product.id)
                      }
                      className={`flex-1 bg-black text-white rounded-[15px] h-16 sm:h-20 shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center ${
                        addingToCart === (product.productId || product.id)
                          ? "opacity-75 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {addingToCart === (product.productId || product.id) ? (
                        <>
                          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          <span className="text-base sm:text-lg">
                            Adding...
                          </span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                          <span className="text-base sm:text-lg ml-2">
                            Add To Cart
                          </span>
                        </>
                      )}
                    </button>

                    <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[15px] hover:bg-gray-50 transition-colors duration-200">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                    </button>
                  </div>
                </div>

                {/* Reviews Section */}
                <Reviews variant="mobile" productId={product.productId} />
              </div>

              {/* Product Details - Desktop */}
              <div className="hidden lg:block">
                <div className="mt-14">
                  {/* Overview Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-red-900 rounded-full"></div>
                      <h3 className="font-bold text-xl text-gray-900">
                        Overview
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900">
                      <ul className="space-y-3">
                        {product.overview.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                          >
                            <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-red-900 rounded-full"></div>
                      <h3 className="font-bold text-xl text-gray-900">
                        Product Details
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900">
                      <ul className="space-y-3">
                        {product.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                          >
                            <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details - Mobile/Tablet (Single Clean Version) */}
              <div className="lg:hidden mt-8">
                {/* Overview Section */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-red-900 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Overview
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-900">
                    <ul className="space-y-3">
                      {product.overview.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                        >
                          <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Product Details Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-5 bg-red-900 rounded-full"></div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Product Details
                    </h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-900">
                    <ul className="space-y-3">
                      {product.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"
                        >
                          <div className="w-2 h-2 bg-red-900 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info - Desktop (Right Column) */}
            <div className="lg:pl-16 hidden lg:block py-2">
              {/* Product Title */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">
                  {product.title || product.category}
                </p>
              </div>

              {/* Pricing */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8">
                <span className="text-2xl sm:text-3xl lg:text-4xl text-red-900 font-light">
                  ₹{product.price}
                </span>
                <span className="text-gray-500 flex items-center text-lg sm:text-xl">
                  MRP
                  <span className="line-through pl-2">
                    ₹{product.originalPrice}
                  </span>
                </span>
                <span className="font-medium text-red-900 text-lg sm:text-xl">
                  ({discountPercentage}% off)
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-red-900 rounded-full"></div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Color Selection
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-red-900">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Selected:
                    </span>
                    <span className="text-sm text-red-900 font-medium bg-red-50 px-2 py-1 rounded">
                      {currentColor}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        className={`w-16 h-20 sm:w-20 sm:h-24 lg:w-[88px] lg:h-[109px] rounded-lg overflow-hidden shadow-md transition-all duration-200 ${
                          selectedColorIndex === idx
                            ? "border-4 border-red-900 shadow-lg scale-105"
                            : "shadow-md hover:shadow-lg hover:scale-102"
                        }`}
                        onClick={() => handleColorChange(idx)}
                      >
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <Image
                            src={
                              product.images[idx]?.[0] ||
                              "/assets/Image/About1.png"
                            }
                            alt={color}
                            className="object-cover w-full h-full"
                            width={1000}
                            priority
                            height={700}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-red-900 rounded-full"></div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {/* Size Selection */}
                     {["juttis", "heels"].includes(product.category?.toLowerCase())
        ? "Size Selection"
        : "Details"}
                  </h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-red-900">
                    {["juttis", "heels"].includes(product.category?.toLowerCase()) ? (
      <>
        {/* Jutti / sandal logic */}
                  {/* Selected size display */}
                  {selectedSize &&
                    generateSizeRange(product.sizes).find(
                      (s) => s.size === selectedSize
                    )?.available && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Selected:
                        </span>
                        <span className="text-sm text-red-900 font-medium bg-red-50 px-2 py-1 rounded">
                          Size {selectedSize}
                        </span>
                      </div>
                    )}

                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-w-md mb-4">
                    {generateSizeRange(product.sizes).map(
                      ({ size, available }, idx) => (
                        <button
                          key={idx}
                          onClick={() => available && setSelectedSize(size)}
                          disabled={!available}
                          className={`py-3 px-1 text-sm border rounded-lg transition-all duration-200 font-medium relative ${
                            selectedSize === size && available
                              ? "border-red-900 bg-red-900 text-white shadow-md transform scale-105"
                              : available
                              ? "border-gray-300 hover:border-red-300 hover:bg-red-50 bg-white text-gray-900"
                              : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          <span
                            // className={`${
                            //   !available
                            //     ? " decoration-2 decoration-red-900"
                            //     : ""
                            // }`}
                          >
                            {size}
                          </span>
                          {!available && (
                            <>
                              {/* Diagonal strike line */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-0.5 bg-gray-400 transform -rotate-45"></div>
                              </div>
                              {/* Small "X" indicator */}
                              {/* <div className="absolute -top-2 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                  ×
                                </span>
                              </div> */}
                            </>
                          )}
                        </button>
                      )
                    )}
                  </div>

                  {/* Size availability legend */}
                  {/* Size guide link and legend */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-red-900 text-sm cursor-pointer hover:underline font-medium flex items-center gap-1 transition-colors hover:text-red-700"
                    >
                      <Ruler className="w-4 h-4" />
                      <span>Size Guide</span>
                    </button>
                    

                    {/* Size availability legend */}
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-red-900 rounded"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-gray-300 rounded relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-500 transform rotate-12"></div>
                          </div>
                        </div>
                        <span>Out of stock</span>
                      </div>
                    </div>
                  </div>

                  </>
                   ) : product.category?.toLowerCase() === "bags" ? (
  // Bag size split logic (supports both "x" and space-separated formats)
  <div className="flex flex-col gap-2">
    {product.sizes && product.sizes.length > 0 ? (
      // Split by "x" or space, trim, and filter empty
      product.sizes[0]
        .split(/x|\s+/)
        .map(size => size.trim())
        .filter(size => size)
        .map((dim, idx) => (
          <div
            key={idx}
            className="text-sm text-red-900 font-medium bg-red-50 px-2 py-1 rounded"
          >
            {["Height", "Width", "Depth"][idx] || `Dim ${idx + 1}`}: {dim}
          </div>
        ))
    ) : (
      <span className="text-sm text-gray-500">No size info</span>
    )}
  </div>

    ) : (
      /* Other categories: show single selected detail */
      <div className="flex items-center gap-2">
        {/* <span className="text-sm font-medium text-gray-700">Selected:</span> */}
        <span className="text-sm text-red-900 font-medium bg-red-50 px-2 py-1 rounded">
          {product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"}
        </span>
      </div>
    )}
                </div>
              </div>

              {/* Delivery Section - Desktop */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-red-900 rounded-full"></div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Delivery Information
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                  <div className="flex gap-2 max-w-md mb-3">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setPincode(value);
                      }}
                      placeholder="Enter pincode"
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    <button
                      onClick={() => checkDelivery()}
                      disabled={isCheckingDelivery || pincode.length !== 6}
                      className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[80px]"
                    >
                      {isCheckingDelivery ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        "Check"
                      )}
                    </button>
                  </div>

                  {/* Delivery Results */}
                  <div className="space-y-2">
                    {deliveryError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{deliveryError}</span>
                      </div>
                    )}

                    {deliveryInfo && (
                      <div className="space-y-2">
                        {/* Location Info */}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-800">
                            {deliveryInfo.city}, {deliveryInfo.district}
                          </span>
                        </div>

                        {/* Delivery Date */}
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-red-900 text-sm font-medium">
                            Delivery by {formatDeliveryDate()}
                          </p>
                        </div>

                        {/* Delivery Options */}
                        <div className="space-y-1">
                          {deliveryInfo.cod === "Y" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-600">
                                Cash on Delivery Available
                              </span>
                            </div>
                          )}

                          {deliveryInfo.pre_paid === "Y" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-gray-600">
                                Prepaid Orders Accepted
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-gray-600">
                              Expected Delivery within 5-7 business days (Monday-Friday,
                              excluding holidays)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Default message when no pincode entered */}
                    {!hasCheckedDelivery && !deliveryError && !deliveryInfo && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-gray-600 text-sm">
                          {pincode.length === 6
                            ? "Click 'Check' to verify delivery"
                            : "Enter 6-digit pincode to check delivery"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                {/* Add to Cart + Wishlist */}
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={
                      addingToCart === (product.productId || product.id)
                    }
                    className={`flex-1 bg-black text-white rounded-[15px] h-16 sm:h-20 shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center transform hover:scale-105 ${
                      addingToCart === (product.productId || product.id)
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {addingToCart === (product.productId || product.id) ? (
                      <>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span className="text-base sm:text-lg font-medium">
                          Adding...
                        </span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="text-base sm:text-lg ml-2 font-medium">
                          Add To Cart
                        </span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[15px] hover:bg-red-50 transition-all duration-200 border-2 border-gray-200 hover:border-red-300 transform hover:scale-105">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                  </button>
                </div>
              </div>

              {/* Reviews Section desktop */}
              <Reviews variant="desktop" productId={product.productId} />
            </div>
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
                            width={200}
                            height={450}
                            priority
                            src={
                              item.images && item.images.length > 0
                                ? item.images[0][0]
                                : "/Image/About1.png"
                            }
                            alt={item.name || "Product Image"}
                            className="absolute inset-0 w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = "/Image/About1.png";
                            }}
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </div>

                        {/* Stock Tag */}
                        {item.stock && item.stock <= 5 && item.stock > 0 && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
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
                       <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0">
                        <button
                          onClick={async (e) => {
                            e.preventDefault(); // Prevent navigation to product page
                            e.stopPropagation(); // Stop event bubbling
                            
                            // console.log("🛒 Similar Product - Adding to cart:", item);

                            if (!item.productId && !item.id) {
                              // showToast("Product ID not found", "error");
                              toast.error("Product ID not found for similar product");
                              return;
                            }

                            try {
                              const cartSelectedColor = item.colors?.[0] || "default";
                              const cartSelectedSize = item.sizes?.[0] || "default";

                              console.log("🎨 Selected variants for similar product:", {
                                color: cartSelectedColor,
                                size: cartSelectedSize,
                              });

                              const cartItem = {
                                ...item,
                                id: item.productId || item.id,
                                productId: item.productId || item.id,
                                selectedColor: cartSelectedColor,
                                selectedSize: cartSelectedSize,
                                selectedColorIndex: 0,
                                addedAt: new Date().toISOString(),
                              };

                              console.log("🔍 Standardized similar product cart item:", cartItem);

                              const result = await addToCart(cartItem);

                              if (result.success) {
                                console.log("✅ Similar product added successfully to cart");
                                if (window.fbq) {
                                  fbq("track", "AddToCart", {
                                    content_ids: [item.productId || item.id],
                                    content_name: item.name,
                                    content_type: "product",
                                    value: parseFloat(item.price) || 0,
                                    currency: "INR",
                                  });
                                }

                                toast.success(
                                  `${item.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
                                  "success"
                                )

                                // showToast(
                                //   `${item.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`,
                                //   "success"
                                // );
                              } else {
                                toast.error(result.message || "Failed to add item to cart");
                                // console.log("❌ Failed to add similar product to cart");
                                // showToast(result.message || "Failed to add item to cart", "error");
                              }
                            } catch (error) {
                              toast.error("Failed to add item to cart. Please try again.");
                              // console.error("❌ Error adding similar product to cart:", error);
                              // showToast("Failed to add item to cart. Please try again.", "error");
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
                              <span className="text-sm font-bold text-red-600">
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

                        {/* Second Row - Stock Status */}
                        <div className="flex items-center justify-start text-xs">
                          <div className="flex-1">
                            {item.stock && item.stock <= 5 && item.stock > 0 ? (
                              <span className="text-red-600 font-medium">
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
