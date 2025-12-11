"use client";
import React from "react";
import { useEffect, useState } from "react";
import { GulbharLoader } from "@/all_components/loader/GulbharLoader";
import { Grid, List, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import productApi from "../../api/v0/product-service";
import { useToast } from "@/hooks/useToast";
import { useCart } from "../../../Providers/ContextProviders/CartContext";
import { toast } from "sonner";
import { staticProductsimage } from "@/app/data/random";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import DummyProductCard from "./DummyProductCard";
import Image from "next/image";

const fallbackCollections = [
  {
    id: 1,
    title: "Bridal Jutti",
    name: "Noorani Outfit",
    price: 5000,
    image: [
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
      "../../../../public/Image/Culture.png",
    ],
    season: "Winter",
    stock: 12,
    size: "S",
  },
];

const seasons = [
  "all",
  "designed by monica",
  "casual juttis",
  "festive collection",
  "designer collection",
];

const sortOptions = [
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Newest", value: "newest" },
  { label: "Relevance", value: "relevance" },
];

const ITEMS_PER_PAGE = 24;

export default function Collection({ parentCategory = null, slug = null }) {
  useEffect(() => {
    if (window.fbq) {
      fbq("track", "ViewContent", {
        content_name: "Collection Page",
        content_category: category || "Juttis",
      });
    }
  }, [parentCategory]);

  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(2000);

  const sarees = staticProductsimage;
  const { addToCart, addingToCart } = useCart();
  const { showToast, ToastContainer } = useToast();
  let category = "juttis"


  // Data Fetching
  const {
    data: apiData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProductsByCategory", category],
    queryFn: () =>
      category
        ? productApi.getProductsByCategory(category)
        : productApi.getAllProduct(),
    enabled: true,
  });

  // Transform API data
  const transformApiData = (apiProducts) => {
    if (!apiProducts || !Array.isArray(apiProducts)) return [];

    return apiProducts.map((product, index) => ({
      id: product._id || `product-${index}`,
      productId: product.productId,
      title: product.title || "productTitle",
      name: product.name || "Product",
      price: product.price || 0,
      originalPrice: product.originalPrice,
      image:
        product.images && product.images.length > 0
          ? product.images
          : ["/Image/About1.png", "/Image/About1.png", "/Image/About1.png"],
      season: product.season?.toLowerCase() || "winter",
      stock: product.stock || Math.floor(Math.random() * 15) + 6,
      size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M",
      sizes: product.sizes || ["M"],
      colors: product.colors || [],
      overview: product.overview || [],
      details: product.details || [],
      isActive: product.isActive !== false,
      createdAt: product.createdAt,
    }));
  };

  //  REPLACE OLD handleAddToCart WITH THIS NEW ONE:

  const handleAddToCart = async (e, item) => {
    // console.log('🛒 Collections - Adding item to cart:', item);
    e.preventDefault();
    e.stopPropagation();

    try {
      // Auto-select first available options
      const selectedColor =
        item.colors && item.colors.length > 0 ? item.colors[0] : "default";
      const selectedSize =
        item.sizes && item.sizes.length > 0 ? item.sizes[0] : "default";

      // console.log(' Auto-selected variants:', { selectedColor, selectedSize });

      //  STANDARDIZED cart item structure
      const cartItemWithVariants = {
        ...item,
        // Use productId consistently
        id: item.productId || item.id,
        productId: item.productId || item.id,
        selectedColor,
        selectedSize,
        selectedColorIndex: 0,
        // Remove custom cartId - let context generate it
        addedAt: new Date().toISOString(),
      };

      // console.log(' Standardized cart item:', cartItemWithVariants);

      const result = await addToCart(cartItemWithVariants);

      if (result.success) {
        toast.success(
          `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`,
          "success"
        );

        // 🔥 ADD FACEBOOK PIXEL TRACKING HERE
      if (window.fbq) {
      
          fbq("track", "AddToCart", {
            content_ids: [item.productId || item.id],
            content_type: "product",
            content_name: item.name || "Product",
            content_category: category || item.season || "Juttis", 
            value: item.price,
            currency: "INR",
          });
      }
        // console.log('Item added successfully');
        // showToast(
        //   `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`,
        //   'success'
        // );
      } else {
        toast.error("Failed to add item to cart. Please try again.", "error");
        // console.log('Failed to add item');
        // showToast("Failed to add item to cart. Please try again.", "error");
      }
    } catch (error) {
      // console.error("Error adding to cart:", error);
      // showToast("Failed to add item to cart. Please try again.", "error");
      toast.error("Failed to add item to cart. Please try again.", "error");
    }
  };

  // Use API data if available, otherwise fallback
  const collections = apiData ? transformApiData(apiData) : fallbackCollections;

  // Update price range based on actual data
  useEffect(() => {
    if (collections.length > 0) {
      const prices = collections
        .map((item) => item.price)
        .filter((price) => price > 0);
      if (prices.length > 0) {
        const calculatedMin = Math.min(...prices);
        const calculatedMax = Math.max(...prices);
        const newMinPrice = Math.max(0, calculatedMin - 200);
        const newMaxPrice = calculatedMax + 200;

        if (minPrice !== newMinPrice || maxPrice !== newMaxPrice) {
          setMinPrice(newMinPrice);
          setMaxPrice(newMaxPrice);
          setPriceRange([newMinPrice, newMaxPrice]);
        }
      }
    }
  }, [collections.length, minPrice, maxPrice]);

  // Reset pagination when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1);
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [selectedSeason, selectedSizes, sortBy]);

  // Initialize image indices
  useEffect(() => {
    const initialIndices = {};
    collections.forEach((item) => {
      initialIndices[item.id] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, [collections.length]);

  // Handle add to cart
  const handleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const selectedColor =
        item.colors && item.colors.length > 0 ? item.colors[0] : "default";
      const selectedSize =
        item.sizes && item.sizes.length > 0 ? item.sizes[0] : "default";

      const cartItemWithVariants = {
        ...item,
        id: item.productId || item.id,
        productId: item.productId || item.id,
        selectedColor,
        selectedSize,
        selectedColorIndex: 0,
        addedAt: new Date().toISOString(),
      };

      const result = await addToCart(cartItemWithVariants);

      if (result.success) {
        toast.success(
          `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`,
          "success"
        );
      } else {
        toast.error("Failed to add item to cart. Please try again.", "error");
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.", "error");
    }
  };

  // Extract unique sizes
  const sizes = [
    ...new Set(collections.flatMap((item) => item.sizes || [])),
  ].filter(Boolean);
  const allSizes =
    sizes.length > 0 ? sizes : ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  // Filter collections
  const filteredCollections = collections
    .filter((item) => {
      if (item.isActive === false) return false;

      const matchesSeason =
        selectedSeason === "all" ||
        item.season?.toLowerCase() === selectedSeason.toLowerCase();
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => item.sizes && item.sizes.includes(size));
      return matchesSeason && matchesPrice && matchesSize;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedCollections = filteredCollections.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSelectedSeason("all");
    setPriceRange([minPrice, maxPrice]);
    setSelectedSizes([]);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <GulbharLoader />;
  }

  if (error) {
    return (
      <div className=" mt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-900 font-semibold">
            Error loading products: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-20 lg:mt-24 pt-4">
      <ToastContainer />

      <div className="max-w-[1600px] ml-2 mx-auto flex flex-col lg:flex-row">
        {/* Sidebar - Desktop */}
        <div className="hidden xl:flex mt-5 flex-col max-w-[360px] mb-8 sticky top-24 h-fit">
          <div className="max-w-[400px] px-2 lg:px-2">
            <nav className="py-2">
              <span className="text-red-700 hover:text-red-900 transition-colors cursor-pointer">
                Home
              </span>
              <span className="mx-2 text-red-400">/</span>
              <span className="text-red-900 font-semibold">Collections</span>
            </nav>
          </div>

          {/* <div className="bg-white border-2 border-red-200 
  h-[calc(100vh-180px)] 
  md:h-[calc(100vh-160px)] 
  lg:h-[calc(100vh-150px)] 
  xl:h-[calc(100vh-140px)]
  w-[280px] rounded-xl shadow-lg overflow-y-auto">
  <FilterContent />
</div> */}

          {/* <div className="bg-white border-2 border-red-200 
        w-[280px] rounded-xl shadow-lg 
        h-fit        
        max-h-[110vh] 
        overflow-y-auto">
    <FilterContent />
  </div> */}

          <div className=" bg-white border-2 border-red-200 h-[calc(100vh-140px)] w-[280px] rounded-xl shadow-lg overflow-y-auto">
            <FilterSidebar
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              selectedSizes={selectedSizes}
              setSelectedSizes={setSelectedSizes}
              allSizes={allSizes}
              clearFilters={clearFilters}
            />
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {isModalOpen && (
          <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm lg:hidden">
            <div className="bg-white rounded-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
              <FilterSidebar
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                allSizes={allSizes}
                clearFilters={clearFilters}
                isModal={true}
                closeModal={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full px-2 lg:px-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between border-b-2 border-red-200 pb-4 mb-6 gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex bg-white border-2 border-red-200 rounded-lg p-1 shadow-sm">
                <button
                  className={`p-2 rounded-md transition-all ${viewMode === "grid"
                    ? "bg-red-900 text-white shadow-md"
                    : "text-red-900 hover:bg-red-50"
                    }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={15} />
                </button>
                <button
                  className={`p-2 rounded-md transition-all ${viewMode === "list"
                    ? "bg-red-900 text-white shadow-md"
                    : "text-red-900 hover:bg-red-50"
                    }`}
                  onClick={() => setViewMode("list")}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            <div className="flex items-center px-1 xs:px-0 gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                className="flex lg:hidden items-center justify-center p-[6.5px] border-2 border-red-300 rounded-lg bg-white hover:bg-red-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <SlidersHorizontal size={18} className="text-red-900 mr-2" />
                <span className="text-red-900 font-medium">Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-red-900 font-semibold hidden sm:inline">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-2 border-2 border-red-300 rounded-lg bg-white text-red-900 font-medium focus:border-red-900 focus:ring-2 focus:ring-red-100 transition-all"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Season Filters */}
          <div className="flex flex-nowrap gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season);
                  setCurrentPage(1);
                }}
                className={`px-4 sm:px-6 py-2 sm:py-3 border-2 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap flex-shrink-0 ${selectedSeason === season
                  ? "bg-red-900 text-white border-red-900 shadow-lg"
                  : "bg-white text-red-900 border-red-300 hover:bg-red-50 hover:border-red-900"
                  }`}
              >
                {season !== "all"
                  ? `${season.toUpperCase()}`
                  : season.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div
            className={`px-1 ${viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              : "flex flex-col gap-4"
              }`}
          >
            {parentCategory !== null ? (
              <>
                {/* Dummy Products */}
                {[1, 2, 3, 4].map((_, index) => (
                  <DummyProductCard
                    key={`dummy-${index}`}
                    parentCategory={parentCategory}
                    slug={slug}
                    viewMode={viewMode}
                    index={index}
                  />
                ))}

                {/* Banner after dummy products */}
                <div className="col-span-full w-full my-4">
                  <Image
                    src="/banner-image.jpg"
                    height={500}
                    width={1000}
                    alt="Similar Products Below"
                    priority
                    className="w-full h-auto sm:h-[220px] md:h-[420px] object-cover rounded-lg shadow-lg"
                  />
                </div>

                {/* Heading for Real Products */}
                <div className="col-span-full w-full my-6 text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-red-900">
                    Complete Your {parentCategory?.charAt(0).toUpperCase() + parentCategory?.slice(1)} Look With These Juttis
                  </h2>
                  <p className="text-sm text-gray-600">
                    Perfect footwear to pair with your dream outfit
                  </p>
                </div>

                {/* Real Products from paginatedCollections */}
                {paginatedCollections.slice(0,8).map((item, index) => (
                  <ProductCard
                    key={item.productId || item.id || `product-${index}`}
                    item={item}
                    index={index}
                    viewMode={viewMode}
                    category={category}
                    currentImageIndices={currentImageIndices}
                    setCurrentImageIndices={setCurrentImageIndices}
                    handleAddToCart={handleAddToCart}
                    addingToCart={addingToCart}
                  />
                ))}
              </>
            ) : (
              // Show real products for juttis
              paginatedCollections.map((item, index) => (
                <React.Fragment key={item.productId || item.id || `product-${index}`}>
                  {/* Banner after 4th product */}
                  {index === 4 && (
                    <div className="col-span-full w-full my-4">
                      <Image
                        src="/banner-image.jpg"
                        height={500}
                        width={1000}
                        alt="design"
                        priority
                        className="w-full h-auto sm:h-[220px] md:h-[420px] object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Product Card */}
                  <ProductCard
                    item={item}
                    index={index}
                    viewMode={viewMode}
                    category={category}
                    currentImageIndices={currentImageIndices}
                    setCurrentImageIndices={setCurrentImageIndices}
                    handleAddToCart={handleAddToCart}
                    addingToCart={addingToCart}
                  />
                </React.Fragment>
              ))
            )}
          </div>

          {/* No Products Found */}
          {filteredCollections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[400px]">
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-full shadow-lg border border-gray-200">
                  <ShoppingBag
                    size={48}
                    className="text-red-800 transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="text-center max-w-md space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We couldn't find any products matching your current filters.
                  Try broadening your search or exploring different categories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3 py-8 border-t-2 border-red-200">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={safePage === 1}
                className="px-4 py-2 hidden sm:block rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                First
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
                className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (safePage <= 3) {
                    pageNum = i + 1;
                  } else if (safePage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = safePage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-bold transition-all ${safePage === pageNum
                        ? "bg-red-900 text-white"
                        : "bg-white text-red-900 border-2 border-red-300 hover:bg-red-50"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={safePage === totalPages}
                className="px-6 py-2 rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Next
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={safePage === totalPages}
                className="px-4 py-2 hidden sm:block rounded-lg border-2 border-red-300 bg-white text-red-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
              >
                Last
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}