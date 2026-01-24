"use client";
import { fbEvent } from "@/utils/fb/metaPixels";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import productApi from "../../../app/api/v0/product-service";
import ProductCard from "../common/ProductCard";
import CategoryCollection_Filters from "./CategoryCollection.Filters";

const ITEMS_PER_PAGE = 24;


interface Product {
  _id?: string;
  productId?: string;
  name?: string;
  title?: string;
  price: number;
  originalPrice?: number;
  images?: string[][];
  availableSizes?: { name: string }[];
  availableColors?: { name: string; hexcode: string }[];
  parentCategory?: string[];
  category?: string[];
  stock?: number;
  isActive?: boolean;
  createdAt?: string;
  season?: string;
  fabric?: string;
}

export default function CategoryCollection() {
  const [currentPage, setCurrentPage] = useState(1);

  const [collectionFilters, setCollectionFilters] = useState({
    size: "all",
    color: "all",
    collections: "all",
    season: "all",
    fabric: "all",
    price: "all",
    sortBy: "relevance",
  });

  useEffect(() => {
    fbEvent({
      action: "ViewContent",
      params: { content_name: "Category Page" },
      callback: () => {}
    });
  }, []);

  const handleCollectionFilterChange = (filters: {
    size?: string;
    color?: string;
    collections?: string;
    season?: string;
    fabric?: string;
    price?: string;
    sortBy?: string;
  }) => {
    setCollectionFilters({
      size: filters.size || "all",
      color: filters.color || "all",
      collections: filters.collections || "all",
      season: filters.season || "all",
      fabric: filters.fabric || "all",
      price: filters.price || "all",
      sortBy: filters.sortBy || "relevance",
    });
    setCurrentPage(1);
  };

  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => productApi.getAllProduct(),
    enabled: true,
  });

  // Get all active products
  const products = useMemo(() => {
    const rawProducts = allProducts;
    if (!rawProducts || !Array.isArray(rawProducts)) return [];
    return rawProducts.filter((p: Product) => p.isActive !== false);
  }, [allProducts]);

  const normalize = (val: unknown) =>
    typeof val === "string" ? val.toLowerCase().trim() : "";

  // Parse price range from filter value like "1000-2000"
  const parsePriceRange = (priceFilter: string): [number, number] | null => {
    if (priceFilter === "all") return null;
    const [min, max] = priceFilter.split("-").map(Number);
    return [min, max];
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    const priceRange = parsePriceRange(collectionFilters.price);

    return products
      .filter((item: Product) => {
        // Price filter
        const matchesPrice = !priceRange ||
          (item.price >= priceRange[0] && item.price <= priceRange[1]);

        // Size filter
        const sizes = item.availableSizes?.map(s => s.name) || [];
        const matchesSize = collectionFilters.size === "all" ||
          sizes.some(s => normalize(s) === normalize(collectionFilters.size));

        // Color filter
        const colors = item.availableColors?.map(c => c.name) || [];
        const matchesColor = collectionFilters.color === "all" ||
          colors.some(c => normalize(c).includes(normalize(collectionFilters.color)));

        // Collections filter
        const matchesCollections = collectionFilters.collections === "all" ||
          (item.parentCategory || []).some(cat => normalize(cat) === normalize(collectionFilters.collections));

        // Season filter
        const matchesSeason = collectionFilters.season === "all" ||
          normalize(item.season) === normalize(collectionFilters.season) ||
          (collectionFilters.season === "all-season" && normalize(item.season) === "all season");

        // Fabric filter
        const matchesFabric = collectionFilters.fabric === "all" ||
          normalize(item.fabric).includes(normalize(collectionFilters.fabric));

        return matchesPrice && matchesSize && matchesColor && matchesCollections && matchesSeason && matchesFabric;
      })
      .sort((a: Product, b: Product) => {
        switch (collectionFilters.sortBy) {
          case "price-desc": return b.price - a.price;
          case "price-asc": return a.price - b.price;
          case "newest":
            return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
          default: return 0;
        }
      });
  }, [products, collectionFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  if (error) {
    return (
      <div className="mt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-900 font-semibold">
            Error loading products: {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-20 lg:mt-24 pt-4">
        <div className="max-w-[1600px] mx-auto px-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
                <div className="mt-1 h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 lg:mt-24 pt-4">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row px-2">
        <div className="w-full lg:px-2">
          {/* Filters */}
          <div className="border-b-2 border-red-200 mb-6">
            <CategoryCollection_Filters
              onFilterChange={handleCollectionFilterChange}
              resultCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.slice(0,4).map((item: Product, index: number) => (
                <React.Fragment key={item.productId || item._id  || index}>
                  {index === 4 && (
                    <div className="col-span-full w-full my-4">
                      <Image
                        src="https://gulbahar-backend.s3.ap-south-1.amazonaws.com/public/banner-image.jpg"
                        height={500}
                        width={1000}
                        alt="Collection Banner"
                        loading="lazy"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        className="w-full h-auto sm:h-[220px] md:h-[420px] object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <ProductCard item={item} index={index} priority={index < 4} />
                </React.Fragment>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>

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
                      className={`px-3 py-2 rounded-lg font-bold transition-all ${
                        safePage === pageNum
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
