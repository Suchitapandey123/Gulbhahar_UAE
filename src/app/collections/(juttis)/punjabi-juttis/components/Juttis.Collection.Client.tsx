"use client";
import CategoryCollection_Filters from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.Filters";
import ProductCard from "@/modules/(gulbhahar)/common/ProductCard";
import { Product } from "@/modules/(gulbhahar)/products/types";
import { fbEvent } from "@/utils/fb/metaPixels";
import Image from "next/image";
import { Fragment, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 24;

interface JuttisCollectionClientProps {
  initialProducts: Product[];
}

export default function JuttisCollectionClient({
  initialProducts,
}: JuttisCollectionClientProps) {
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

  // Track page view event
  useMemo(() => {
    if (typeof window !== "undefined") {
      fbEvent({
        action: "ViewContent",
        params: { content_name: "Juttis Collection Page" },
        callback: () => {},
      });
    }
  }, []);

  const handleCollectionFilterChange = (filters: any) => {
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

  const normalize = (val: unknown) =>
    typeof val === "string" ? val.toLowerCase().trim() : "";

  const parsePriceRange = (priceFilter: string): [number, number] | null => {
    if (priceFilter === "all") return null;
    const [min, max] = priceFilter.split("-").map(Number);
    return [min, max];
  };

  const filteredProducts = useMemo(() => {
    const priceRange = parsePriceRange(collectionFilters.price);

    const getPrice = (item: any) => {
      if (typeof item.price === "number") return item.price;
      const cleaned = String(item.price || "0").replace(/[^0-9.]/g, "");
      return parseFloat(cleaned) || 0;
    };

    return initialProducts
      .filter((item: any) => {
        const itemPrice = getPrice(item);
        // Price filter
        const matchesPrice =
          !priceRange ||
          (itemPrice >= priceRange[0] && itemPrice <= priceRange[1]);

        // Size filter - support both formats
        const productSizes: string[] =
          item.sizes ||
          item.availableSizes?.map((s: any) =>
            typeof s === "string" ? s : s.name,
          ) ||
          [];

        const matchesSize =
          collectionFilters.size === "all" ||
          productSizes.some(
            (s) => normalize(s) === normalize(collectionFilters.size),
          );

        // Color filter - support both formats
        const productColors: string[] =
          item.colors ||
          item.availableColors?.map((c: any) =>
            typeof c === "string" ? c : c.name,
          ) ||
          [];

        const matchesColor =
          collectionFilters.color === "all" ||
          productColors.some((c) =>
            normalize(c).includes(normalize(collectionFilters.color)),
          );

        // Collections filter - support multiple category field names
        const itemCategories = [
          ...(Array.isArray(item.category) ? item.category : [item.category]),
          ...(Array.isArray(item.parentCategory)
            ? item.parentCategory
            : [item.parentCategory]),
        ].filter(Boolean);

        const matchesCollections =
          collectionFilters.collections === "all" ||
          itemCategories.some(
            (cat) =>
              normalize(cat) === normalize(collectionFilters.collections),
          );

        // Season filter
        const matchesSeason =
          collectionFilters.season === "all" ||
          normalize(item.season) === normalize(collectionFilters.season) ||
          (collectionFilters.season === "all-season" &&
            normalize(item.season) === "all season");

        // Fabric filter
        const matchesFabric =
          collectionFilters.fabric === "all" ||
          normalize(item.fabric).includes(normalize(collectionFilters.fabric));

        return (
          matchesPrice &&
          matchesSize &&
          matchesColor &&
          matchesCollections &&
          matchesSeason &&
          matchesFabric
        );
      })
      .sort((a: any, b: any) => {
        const priceA = getPrice(a);
        const priceB = getPrice(b);

        switch (collectionFilters.sortBy) {
          case "price-desc":
            return priceB - priceA;
          case "price-asc":
            return priceA - priceB;
          case "newest":
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          default:
            return 0;
        }
      });
  }, [initialProducts, collectionFilters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  );

  return (
    <div className="w-full lg:px-2">
      <div className="border-b mb-3 pb-3">
        <CategoryCollection_Filters
          onFilterChange={handleCollectionFilterChange}
          resultCount={filteredProducts.length}
          products={initialProducts}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((item: Product, index: number) => (
            <Fragment key={item.productId || item._id || index}>
              {index === 4 && (
                <div className="col-span-full w-full my-4">
                  <Image
                    src="https://d21ojmskh8ksuv.cloudfront.net/static/banners/banner-image.jpg"
                    height={500}
                    width={1000}
                    alt="Collection Banner"
                    loading="lazy"
                    unoptimized
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}
              <ProductCard item={item} index={index} priority={index < 4} />
            </Fragment>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your filters.
            </p>
          </div>
        )}
      </div>

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
              const pageNum =
                totalPages <= 5
                  ? i + 1
                  : safePage <= 3
                    ? i + 1
                    : safePage >= totalPages - 2
                      ? totalPages - 4 + i
                      : safePage - 2 + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-2 rounded-lg font-bold transition-all ${safePage === pageNum ? "bg-red-900 text-white" : "bg-white text-red-900 border-2 border-red-300 hover:bg-red-50"}`}
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
  );
}
