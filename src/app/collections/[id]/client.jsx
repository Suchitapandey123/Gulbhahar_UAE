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
} from "lucide-react";
import { useAuth } from "../../../Providers/ContextProviders/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { useCart } from "../../../Providers/ContextProviders/CartContext";
import Link from "next/link";
import ImageModal from "./components/ImageModal";

const reviews = {
  rating: 4.8,
  reviews: [
    { stars: 5, count: 28 },
    { stars: 4, count: 9 },
    { stars: 3, count: 7 },
    { stars: 2, count: 4 },
    { stars: 1, count: 0 },
  ],
  reviewComments: [
    {
      user: "John Doe",
      rating: 5,
      comment: "Excellent running shoes. It was very sturdy on the foot",
      date: "yesterday",
    }
  ],
};

export function ProductClient({ product, similarProducts }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { showToast, ToastContainer } = useToast();
  const { addToCart, addingToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [pincode, setPincode] = useState("");
  const [userRating, setUserRating] = useState(4);
  const [sortOrder, setSortOrder] = useState("Newest");
  
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
  const currentMainImage = currentImages[mainImageIndex] || "/assets/Image/About1.png";

  // Calculate discount percentage
  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Image Modal Functions
  const openModal = (imageIndex = mainImageIndex) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
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
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleAddToCart = async () => {
    console.log('🛒 Product Detail - Adding to cart:', product);
    
    if (!product.productId && !product.id) {
      showToast("Product ID not found", "error");
      return;
    }
  
    try {
      const cartSelectedColor = currentColor || product.colors?.[0] || 'default';
      const cartSelectedSize = selectedSize || product.sizes?.[0] || 'default';
      
      console.log('🎨 Selected variants:', { 
        color: cartSelectedColor, 
        size: cartSelectedSize 
      });
  
      const cartItem = {
        ...product,
        id: product.productId || product.id,
        productId: product.productId || product.id,
        selectedColor: cartSelectedColor,
        selectedSize: cartSelectedSize,
        selectedColorIndex: selectedColorIndex || 0,
        addedAt: new Date().toISOString()
      };
  
      console.log("🔍 Standardized cart item:", cartItem);
  
      const result = await addToCart(cartItem);
      
      if (result.success) {
        console.log('✅ Item added successfully to cart');
        showToast(`${product.name} (${cartSelectedSize}, ${cartSelectedColor}) added to cart!`, 'success');
      } else {
        console.log('❌ Failed to add item to cart');
        showToast(result.message || "Failed to add item to cart", "error");
      }
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      showToast("Failed to add item to cart. Please try again.", "error");
    }
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColorIndex(colorIndex);
    setMainImageIndex(0);
  };

  const sortedReviews = [...reviews.reviewComments].sort((a, b) => {
    return sortOrder === "Newest"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />
      
      {isModalOpen && 
      
      (<ImageModal
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600">{product.title || product.category}</p>
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
                  <span className="text-gray-500 text-sm">{currentColor}</span>
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
                          src={product.images[idx]?.[0] || "/assets/Image/About1.png"}
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
                <h3 className="text-sm font-medium mb-3">Size</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-w-sm">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-1 text-sm border rounded transition-all duration-200 hover:bg-red-50 ${
                        selectedSize === size
                          ? "border-red-900 bg-red-900 text-white shadow-md"
                          : "border-gray-200 hover:border-red-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-red-900 text-sm mt-2 cursor-pointer hover:underline">
                  Size Guide
                </p>
              </div>

              {/* Delivery Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-3">Delivery to</h3>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter pincode"
                    className="px-3 py-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-red-900 text-sm">
                    Delivery by 31st January, Friday |
                    <span className="text-gray-400 line-through ml-2">
                      Free ₹60
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    If order before 9:30 P.M
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                {/* Add to Cart + Wishlist */}
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart === (product.productId || product.id)}
                    className={`flex-1 bg-black text-white rounded-[15px] h-16 sm:h-20 shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center ${
                      addingToCart === (product.productId || product.id) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {addingToCart === (product.productId || product.id) ? (
                      <>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span className="text-base sm:text-lg">Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="text-base sm:text-lg ml-2">Add To Cart</span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[15px] hover:bg-gray-50 transition-colors duration-200">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                  </button>
                </div>

                {/* Authentication Status Message */}
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    <button 
                      onClick={() => router.push('/login')}
                      className="text-red-900 hover:underline"
                    >
                      Login
                    </button> to add items to cart
                  </p>
                )}

                {/* Free Delivery Info */}
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <Truck className="w-6 h-6 text-red-900 flex-shrink-0" />
                  <span className="text-red-900 text-sm font-medium">
                    Free delivery on orders above ₹500.00
                  </span>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-12 lg:mt-16">
                <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-6">
                  Reviews
                </h3>

                {/* Rating Overview */}
                <div className="border-l-2 border-gray-200 pl-4 sm:pl-6 lg:pl-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            onClick={() => setUserRating(idx + 1)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 cursor-pointer ${
                              idx < userRating
                                ? "fill-red-900 text-red-900"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-medium ml-2 sm:ml-4">
                        {userRating || reviews.rating}
                      </span>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-3 my-8">
                    {reviews.reviews.map(({ stars, count }) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="w-3 text-sm font-medium">{stars}</span>
                        <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-900 transition-all duration-300"
                            style={{ width: `${(count / 48) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-gray-600 font-medium">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <select
                        className="appearance-none border border-gray-300 rounded-lg py-2 px-3 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-32 sm:w-40"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                      >
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {sortedReviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="border-b border-gray-100 pb-6 last:border-b-0"
                      >
                        {/* Review Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-gray-600" />
                            </div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                              {review.user}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 sm:ml-auto">
                            {review.date}
                          </span>
                        </div>

                        {/* Review Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-500">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  idx < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-300 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review Comment */}
                        <p className="text-sm text-gray-700 mb-4">
                          {review.comment}
                        </p>

                        {/* Review Actions */}
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-red-900 hover:text-red-700 transition-colors">
                            Reply
                          </button>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>10</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsDown className="w-4 h-4" />
                            <span>0</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details - Desktop */}
            <div className="hidden lg:block">
                <div className="mt-14">
                  {/* Overview Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-red-900 rounded-full"></div>
                      <h3 className="font-bold text-xl text-gray-900">Overview</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900">
                      <ul className="space-y-3">
                        {product.overview.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
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
                      <h3 className="font-bold text-xl text-gray-900">Product Details</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900">
                      <ul className="space-y-3">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
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
                    <h3 className="font-bold text-lg text-gray-900">Overview</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-900">
                    <ul className="space-y-3">
                      {product.overview.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
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
                    <h3 className="font-bold text-lg text-gray-900">Product Details</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-red-900">
                    <ul className="space-y-3">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
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
                <p className="text-gray-600">{product.title || product.category}</p>
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
                  <h3 className="text-base font-semibold text-gray-900">Color Selection</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-red-900">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">Selected:</span>
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
                            src={product.images[idx]?.[0] || "/assets/Image/About1.png"}
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
                  <h3 className="text-base font-semibold text-gray-900">Size Selection</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-red-900">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-w-sm mb-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-1 text-sm border rounded-lg transition-all duration-200 font-medium ${
                          selectedSize === size
                            ? "border-red-900 bg-red-900 text-white shadow-md transform scale-105"
                            : "border-gray-300 hover:border-red-300 hover:bg-red-50 bg-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-red-900 text-sm cursor-pointer hover:underline font-medium">
                    📏 Size Guide
                  </p>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-4 bg-red-900 rounded-full"></div>
                  <h3 className="text-base font-semibold text-gray-900">Delivery Information</h3>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                  <div className="flex gap-2 max-w-md mb-3">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter pincode"
                      className="px-3 py-2 border border-gray-300 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium">
                      Check
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-red-900 text-sm font-medium">
                        Delivery by 31st January, Friday |
                        <span className="text-gray-400 line-through ml-2">₹60</span>
                        <span className="text-green-600 ml-1">FREE</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-gray-600 text-sm">
                        If order before 9:30 P.M
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                {/* Add to Cart + Wishlist */}
                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart === (product.productId || product.id)}
                    className={`flex-1 bg-black text-white rounded-[15px] h-16 sm:h-20 shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center transform hover:scale-105 ${
                      addingToCart === (product.productId || product.id) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {addingToCart === (product.productId || product.id) ? (
                      <>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        <span className="text-base sm:text-lg font-medium">Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="text-base sm:text-lg ml-2 font-medium">Add To Cart</span>
                      </>
                    )}
                  </button>

                  <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[15px] hover:bg-red-50 transition-all duration-200 border-2 border-gray-200 hover:border-red-300 transform hover:scale-105">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                  </button>
                </div>

                {/* Authentication Status Message */}
                {!isAuthenticated && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700 text-center">
                      <button 
                        onClick={() => router.push('/login')}
                        className="text-red-900 hover:underline font-medium"
                      >
                        Login
                      </button> to add items to cart and track orders
                    </p>
                  </div>
                )}

                {/* Free Delivery Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                  <Truck className="w-6 h-6 text-red-900 flex-shrink-0" />
                  <div>
                    <span className="text-red-900 text-sm font-semibold block">
                      Free delivery on orders above ₹500.00
                    </span>
                    <span className="text-red-700 text-xs">
                      Save on shipping costs with minimum order value
                    </span>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-12 lg:mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-red-900 rounded-full"></div>
                  <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-900">
                    Customer Reviews
                  </h3>
                </div>

                {/* Rating Overview */}
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-900 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            onClick={() => setUserRating(idx + 1)}
                            className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 cursor-pointer transition-all duration-200 ${
                              idx < userRating
                                ? "fill-red-900 text-red-900 hover:scale-110"
                                : "fill-gray-300 text-gray-300 hover:scale-110 hover:fill-red-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {userRating || reviews.rating}
                        </span>
                        <p className="text-sm text-gray-600">out of 5</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-3 my-8">
                    {reviews.reviews.map(({ stars, count }) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="w-3 text-sm font-medium">{stars}</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-900 to-red-700 transition-all duration-500 rounded-full"
                            style={{ width: `${(count / 48) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-sm text-gray-600 font-medium">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <select
                        className="appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-40 font-medium"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                      >
                        <option value="Newest">Newest First</option>
                        <option value="Oldest">Oldest First</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {sortedReviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {/* Review Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-red-900 to-red-700 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">
                              {review.user}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 sm:ml-auto bg-gray-100 px-2 py-1 rounded">
                            {review.date}
                          </span>
                        </div>

                        {/* Review Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm text-gray-500 font-medium">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  idx < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-300 text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700 ml-2">
                            ({review.rating}/5)
                          </span>
                        </div>

                        {/* Review Comment */}
                        <p className="text-sm text-gray-700 mb-4 bg-gray-50 p-3 rounded italic">
                          "{review.comment}"
                        </p>

                        {/* Review Actions */}
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-red-900 hover:text-red-700 transition-colors font-medium hover:underline">
                            Reply
                          </button>
                          <div className="flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded transition-colors">
                            <ThumbsUp className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-medium">10</span>
                          </div>
                          <div className="flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded transition-colors">
                            <ThumbsDown className="w-3 h-3 text-red-500" />
                            <span className="text-red-500 font-medium text-xs">0</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
      <div
        key={item.productId}
        className="group w-full"
      >
        <Link href={`/collections/${item.productId}`}>
          <div className="cursor-pointer relative space-y-3">
            {/* Image Container */}
            <div className="relative overflow-hidden w-full aspect-[3/4]">
              <div className="relative w-full h-full bg-gray-100">
                <Image
                  width={200}
                  height={450}
                  priority
                  src={item.images && item.images.length > 0 ? item.images[0][0] : "/Image/About1.png"}
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
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded z-10">
                  {Math.round(
                    ((item.originalPrice - item.price) / item.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}

              {/* Hover Add to Cart Button */}
              <div className="absolute bottom-0 left-0 right-0 bg-red-900 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0">
                <button
                  onClick={(e) => handleAddToCart(e, item)}
                  disabled={addingToCart === item.productId}
                  className="w-full text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  <ShoppingBag size={14} />
                  <span>
                    {addingToCart === item.productId ? "Adding..." : "Add to Cart"}
                  </span>
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
                    {item.originalPrice && item.originalPrice > item.price && (
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
                    <span className="text-green-600 font-medium">In Stock</span>
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