"use client";
import { staticProductsimage } from "@/app/data/random";
import { useToast } from "@/hooks/useToast";
import { useCart } from "@/providers/ContextProviders/CartContext";
import { GulbharLoader } from "@/shared-components/loader/GulbharLoader";
import { fbEvent } from "@/utils/fb/metaPixels";
import { useQuery } from "@tanstack/react-query";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import productApi from "../../api/v0/product-service";
import DummyProductCard from "./DummyProductCard";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";

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

export default function CollectionForCategory({ parentCategory = null, slug = null }) {
  useEffect(() => {
     fbEvent({
      action: "ViewContent",
      params: {
        "content_name" : "Juttis Page"
      }
    })
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
  const {ToastContainer } = useToast();
  // let category = "juttis"
  let category = parentCategory || slug || "all";
console.log("CATEGORY INSIDE COLLECTION:", category);




  // Data Fetching - Fetch ALL products and filter on frontend
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getProductsByCategory", category],
    queryFn: () =>
         productApi.getAllProduct(),
    enabled: true,
  });

  // Filter products by parentCategory on frontend
  const apiData = React.useMemo(() => {
    // Handle different API response structures
    const products = allProducts?.products || allProducts?.data || allProducts;

    if (!products || !Array.isArray(products)) {
      // console.log("ALL PRODUCTS RAW:", allProducts);
      // console.log("EXTRACTED PRODUCTS:", products);
      return [];
    }

    // console.log("TOTAL PRODUCTS FROM API:", products.length);

    if (!category || category === "all") return products;

    // Filter products where parentCategory array includes the category
    const filtered = products.filter(product => {
      const productCategories = product.parentCategory || [];
      if (Array.isArray(productCategories)) {
        return productCategories.some(cat =>
          cat?.toLowerCase?.() === category.toLowerCase()
        );
      }
      return productCategories?.toLowerCase?.() === category.toLowerCase();
    });

    // console.log(`Filtered ${filtered.length} products for category: ${category}`);
    return filtered;
  }, [allProducts, category]);

  // Fallback: Fetch juttis when suit/saree has no products (after primary query completes)
  const isSuitOrSaree = parentCategory && parentCategory !== "juttis";
  const primaryQueryDone = !isLoading;
  const noProductsFound = !apiData || (Array.isArray(apiData) && apiData.length === 0);
  const shouldFetchJuttis = isSuitOrSaree && primaryQueryDone && noProductsFound;

  const {
    data: juttisData,
    isLoading: juttisLoading,
  } = useQuery({
    queryKey: ["getJuttisForFallback"],
    queryFn: () => productApi.getProductsByCategory("juttis"),
    enabled: Boolean(shouldFetchJuttis),
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
      parentCategory: Array.isArray(product.parentCategory)
      ? product.parentCategory
      : product.parentCategory
      ? [product.parentCategory]
      : [],
      category: product.category || product.parentCategory || "",
      originalPrice: product.originalPrice,
      image:
        product.images && product.images.length > 0
          ? product.images
          : ["/about/lal-ishq-1.jpg", "/about/lal-ishq-1.jpg", "/about/lal-ishq-1.jpg"],
      season: product.season?.toLowerCase() || "winter",
      stock: product.stock || Math.floor(Math.random() * 15) + 6,
      size: product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M",
      sizes: product.sizes || ["M"],
      colors: product.colors || [],
      overview: product.overview || [],
      details: product.details || [],
      isActive: product.isActive !== false,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));
  };
// console.log("CATEGORY FROM URL:", category);


  //  REPLACE OLD handleAddToCart WITH THIS NEW ONE:
  const handleAddToCart = async (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Auto-select first available options
      const selectedColor =
        item.colors && item.colors.length > 0 ? item.colors[0] : "default";
      const selectedSize =
        item.sizes && item.sizes.length > 0 ? item.sizes[0] : "default";

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

      // // console.log(' Standardized cart item:', cartItemWithVariants);

      const result = await addToCart(cartItemWithVariants);
      // console.log(result)

      if (result.success) {
        toast.success(
          `${item.name} (${selectedSize}, ${selectedColor}) added to cart!`
        );
      } else {
        toast.error("Failed to add item to cart. Please try again.", "error");
      }
    } catch (error) {
      toast.error("Failed to add item to cart..", error);
    }
  };

  // Use API data - don't use fallback, let it be empty if no data
  const collections = apiData && Array.isArray(apiData) ? transformApiData(apiData) : [];

  // DEBUG: Check API response
  // console.log("API DATA RAW:", apiData);
  // console.log("COLLECTIONS LENGTH:", collections.length);
  // console.log("SHOULD FETCH JUTTIS:", shouldFetchJuttis);
  // console.log("JUTTIS DATA:", juttisData?.length || 0);

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


  // Extract unique sizes
  const sizes = [
    ...new Set(collections.flatMap((item) => item.sizes || [])),
  ].filter(Boolean);
  const allSizes =
    sizes.length > 0 ? sizes : ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  // Filter collections
  const filteredCollections = collections.filter((item) => {
  if (item.isActive === false) return false;

  const normalize = (val) =>
    typeof val === "string" ? val.toLowerCase().trim() : "";

  const matchesCategory = category && category !== "all"
  ? Array.isArray(item.parentCategory) &&
    item.parentCategory.some(
      (cat) => normalize(cat) === normalize(category)
    )
  : true; // if category = "all", show all products


  const matchesSeason =
    selectedSeason === "all" ||
    item.season?.toLowerCase() === selectedSeason.toLowerCase();

  const matchesPrice =
    item.price >= priceRange[0] && item.price <= priceRange[1];

  const matchesSize =
    selectedSizes.length === 0 ||
    selectedSizes.some((size) => item.sizes && item.sizes.includes(size));

  return matchesCategory && matchesSeason && matchesPrice && matchesSize;
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

      {/* <div className="max-w-[1600px] ml-2 mx-auto flex flex-col lg:flex-row"> */}
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row px-2 lg:px-2">
     
        {/* Main Content */}
        <div className="w-full">
          {/* Product Grid */}
          <div
            className={`px-1 ${viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              : "flex flex-col gap-4"
              }`}
          >
            {parentCategory !== null && parentCategory !== "juttis" ? (
              <>
                {/* Check if we have real products for this category (suit/saree) */}
                {paginatedCollections.length > 0 ? (
                  <>
                    {/* Show real suit/saree products */}
                    {paginatedCollections.map((item, index) => (
                      <React.Fragment key={item.productId || item.id || `product-${index}`}>
                        {/* Banner after 4th product */}
                        {index === 4 && (
                          <div className="col-span-full w-full my-4">
                            <Image
                              src="https://gulbahar-backend.s3.ap-south-1.amazonaws.com/public/banner-image.jpg"
                              height={500}
                              width={1000}
                              alt="Collection Banner"
                              className="w-full h-auto sm:h-[220px] md:h-[420px] object-cover rounded-lg shadow-lg"
                            />
                          </div>
                        )}
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
                    ))}
                  </>
                ) : (
                  <>
                    {/* No real products - show Dummy Products */}
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
                    src="https://gulbahar-backend.s3.ap-south-1.amazonaws.com/public/banner-image.jpg"
                    height={500}
                    width={1000}
                    alt="Similar Products Below"
                    loading="lazy"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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


                    {/* Show Juttis Products as fallback */}
                    {juttisLoading ? (
                      <div className="col-span-full text-center py-8">
                        <p className="text-gray-500">Loading juttis...</p>
                      </div>
                    ) : (
                      transformApiData(juttisData || []).slice(0, 8).map((item, index) => (
                        <ProductCard
                          key={item.productId || item.id || `jutti-${index}`}
                          item={item}
                          index={index}
                          viewMode={viewMode}
                          category="juttis"
                          currentImageIndices={currentImageIndices}
                          setCurrentImageIndices={setCurrentImageIndices}
                          handleAddToCart={handleAddToCart}
                          addingToCart={addingToCart}
                        />
                      ))
                    )}
                  </>
                )}
              </>
            ) : (
              // Show real products for juttis or when parentCategory is null
              paginatedCollections.map((item, index) => (
                <React.Fragment key={item.productId || item.id || `product-${index}`}>
                  {/* Banner after 4th product */}
                  {index === 4 && (
                    <div className="col-span-full w-full my-4">
                      <Image
                        src="https://gulbahar-backend.s3.ap-south-1.amazonaws.com/public/banner-image.jpg"
                        height={500}
                        width={1000}
                        alt="Gulbhahar Collection Banner"
                        loading="lazy"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
          {/* {filteredCollections.length === 0 && (
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
          )} */}

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