"use client";

import { fbEvent } from "@/utils/fb/metaPixels";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../common/ProductCard";
import CategoryCollection_Filters from "../categoryPages/CategoryCollection.Filters";
import productApi from "@/services/product/productService";
import { Product } from "../products/types";

interface ParentCategoryCollectionClientProps {
  initialProducts: Product[];
  initialCursor: string | null;
  parentCategory: string;
  show?: boolean;
}

export default function ParentCategoryCollectionClient({
  initialProducts,
  initialCursor,
  parentCategory,
  show = false,
}: ParentCategoryCollectionClientProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const [collectionFilters, setCollectionFilters] = useState({
    size: "all",
    color: "all",
    collections: parentCategory.toLowerCase().trim(),
    season: "all",
    fabric: "all",
    price: "all",
    sortBy: "relevance",
  });

  useEffect(() => {
    fbEvent({
      action: "ViewContent",
      params: { content_name: "Category Page" },
      callback: () => {},
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
  };

  const normalize = (val: unknown) =>
    typeof val === "string" ? val.toLowerCase().trim() : "";

  const parsePriceRange = (priceFilter: string): [number, number] | null => {
    if (priceFilter === "all") return null;
    const [min, max] = priceFilter.split("-").map(Number);
    return [min, max];
  };

  const filteredProducts = useMemo(() => {
    const priceRange = parsePriceRange(collectionFilters.price);

    return allProducts
      .filter((item: Product) => {
        const matchesPrice =
          !priceRange ||
          (item.price >= priceRange[0] && item.price <= priceRange[1]);

        const sizes = item.availableSizes?.map((s) => s.name) || [];
        const matchesSize =
          collectionFilters.size === "all" ||
          sizes.some((s) => normalize(s) === normalize(collectionFilters.size));

        const colors = item.availableColors?.map((c) => c.name) || [];
        const matchesColor =
          collectionFilters.color === "all" ||
          colors.some((c) =>
            normalize(c).includes(normalize(collectionFilters.color))
          );

        const collections = [
          ...(item.parentCategory || []),
          ...(item.availableCollections?.map((c) => c.name) || []),
        ];
        const matchesCollections =
          collectionFilters.collections === "all" ||
          collections.some(
            (cat) =>
              normalize(cat) === normalize(collectionFilters.collections)
          );

        const matchesSeason =
          collectionFilters.season === "all" ||
          normalize(item.season) === normalize(collectionFilters.season) ||
          (normalize(collectionFilters.season) === "all-season" &&
            normalize(item.season) === "all season");

        const fabrics = [
          ...(item.parentCategory || []),
          ...(item.availableFabrics?.map((c) => c.name) || []),
        ];
        const matchesFabric =
          collectionFilters.fabric === "all" ||
          fabrics.some(
            (cat) => normalize(cat) === normalize(collectionFilters.fabric)
          );

        return (
          matchesPrice &&
          matchesSize &&
          matchesColor &&
          matchesCollections &&
          matchesSeason &&
          matchesFabric
        );
      })
      .sort((a: Product, b: Product) => {
        switch (collectionFilters.sortBy) {
          case "price-desc":
            return b.price - a.price;
          case "price-asc":
            return a.price - b.price;
          case "newest":
            return (
              new Date(b.createdAt || 0).getTime() -
              new Date(a.createdAt || 0).getTime()
            );
          default:
            return 0;
        }
      });
  }, [allProducts, collectionFilters]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || isLoading) return;
    setIsLoading(true);
    try {
      const result = await productApi.getProductsByParentCategoryPage(
        parentCategory,
        nextCursor
      );
      setAllProducts((prev) => [...prev, ...result.products]);
      setNextCursor(result.nextCursor);
    } catch (err) {
      console.error("Failed to load more products:", err);
    } finally {
      setIsLoading(false);
    }
  }, [nextCursor, isLoading, parentCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadMore]);

  return (
    <div className="pt-2">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row px-2">
        <div className="w-full lg:px-2">
          {/* Filters */}
          <div className="border-b border-gray-200 pb-3 mb-3">
            <CategoryCollection_Filters
              onFilterChange={handleCollectionFilterChange}
              resultCount={filteredProducts.length}
              products={allProducts}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item: Product, index: number) => (
                <React.Fragment key={item.productId || item._id || index}>
                  {index === 4 && show && (
                    <div className="col-span-full w-full my-4">
                      <Image
                        src="https://d21ojmskh8ksuv.cloudfront.net/static/banners/banner-image.jpg"
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
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            )}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="w-full py-8 flex items-center justify-center">
            {isLoading && (
              <div className="flex items-center gap-2 text-red-900">
                <div className="w-5 h-5 border-2 border-red-300 border-t-red-900 rounded-full animate-spin" />
                <span className="text-sm font-medium">Loading more...</span>
              </div>
            )}
            {!nextCursor && allProducts.length > 0 && !isLoading && (
              <p className="text-gray-400 text-sm">You&apos;ve reached the end</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
