"use client";

import { cn } from "@/lib/utils";
import { ArrowUpDown, ChevronDown, Filter, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Product } from "../products/types";

interface FilterOption {
  label: string;
  value: string;
}

interface CollectionFiltersProps {
  onFilterChange?: (filters: {
    size?: string;
    color?: string;
    collections?: string;
    season?: string;
    fabric?: string;
    price?: string;
    sortBy?: string;
  }) => void;
  resultCount?: number;
  products: Product[];
}

interface DropdownFilterProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  options,
  value,
  onChange,
  isOpen,
  onToggle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onToggle();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onToggle]);

  const selectedOption = options.find((opt) => opt.value === value);
  const selectedLabel = selectedOption?.label || label;
  const isSort = label === "Sort";
  const hasSelection = value !== "all" && value !== "relevance";

  return (
    <div ref={containerRef} className=" relative ">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-2 px-3 py-2 transition-all duration-200 whitespace-nowrap text-sm font-semibold ",
          isOpen
            ? "border-b-2 border-gray-100 bg-gray-50 rounded-b-none"
            : hasSelection || (isSort && value !== "relevance")
              ? "border border-red-900/20 bg-red-50/30 text-red-900"
              : "border border-gray-200 bg-white text-gray-900 shadow-sm hover:border-gray-300",
        )}
      >
        {isSort && <ArrowUpDown size={16} className="text-gray-700" />}
        <span className="font-medium text-gray-900 transition-all hidden sm:flex items-center">
          {isSort ? (
            <span className="flex items-center">
              <span className="hidden sm:inline">Sort: </span>
              <span className="ml-1">{selectedLabel}</span>
            </span>
          ) : (
            <>
              <span>{label}</span>
              {hasSelection && (
                <span className="hidden md:inline font-bold">
                  : {selectedLabel}
                </span>
              )}
            </>
          )}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "text-gray-700 transition-transform duration-200 ml-1",
            isOpen ? "rotate-180" : "",
            isSort ? "hidden sm:block" : "",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full border right-0 sm:left-0 mt-2 w-48 bg-white  border-gray-100 shadow-2xl overflow-hidden z-[10003] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-64 overflow-y-auto pt-1 pb-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  onToggle();
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-all duration-150",
                  value === option.value
                    ? "bg-red-50 text-red-900 font-bold"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CategoryCollection_Filters({
  onFilterChange,
  resultCount = 0,
  products = [],
}: CollectionFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    size: "all",
    color: "all",
    collections: "all",
    season: "all",
    fabric: "all",
    price: "all",
    sortBy: "relevance",
  });

  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileDrawerOpen]);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      size: "all",
      color: "all",
      collections: "all",
      season: "all",
      fabric: "all",
      price: "all",
      sortBy: "relevance",
    };
    setFilters(resetFilters);
    onFilterChange?.(resetFilters);
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters, [key]: "all" };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const sizeOptions = useMemo(() => {
    const uniqueSizes = new Set<string>();
    products.forEach((p) => {
      p.availableSizes?.forEach((s) => {
        if (s.name) uniqueSizes.add(s.name);
      });
    });
    return [
      { label: "All Sizes", value: "all" },
      ...Array.from(uniqueSizes)
        .sort()
        .map((s) => ({ label: s, value: s.toLowerCase() })),
    ];
  }, [products]);

  const colorOptions = useMemo(() => {
    const uniqueColors = new Set<string>();
    products.forEach((p) => {
      p.availableColors?.forEach((c) => {
        if (c.name) uniqueColors.add(c.name);
      });
    });
    return [
      { label: "All Colors", value: "all" },
      ...Array.from(uniqueColors)
        .sort()
        .map((c) => ({ label: c, value: c.toLowerCase() })),
    ];
  }, [products]);


  const seasonOptions = useMemo(() => {
    const uniqueSeasons = new Set<string>();
    products.forEach((p) => {
      if (p.season) uniqueSeasons.add(p.season);
    });
    return [
      { label: "All Seasons", value: "all" },
      ...Array.from(uniqueSeasons)
        .sort()
        .map((s) => ({
          label: s,
          value: s.toLowerCase().replace(/\s+/g, "-"),
        })),
    ];
  }, [products]);

    const collectionsOptions = useMemo(() => {
    const uniqueCollections = new Set<string>();
    products.forEach((p) => {
      p.availableCollections?.forEach((c) => {
        if (c.name) uniqueCollections.add(c.name);
      });
      // Also include parentCategory if availableCollections is empty
      if (!p.availableCollections || p.availableCollections.length === 0) {
        p.parentCategory?.forEach((pc) => uniqueCollections.add(pc));
      }
    });
    return [
      { label: "All Collections", value: "all" },
      ...Array.from(uniqueCollections)
        .sort()
        .map((c) => ({ label: c, value: c.toLowerCase() })),
    ];
  }, [products]);

  const fabricOptions = useMemo(() => {
    const uniqueFabrics = new Set<string>();
    products.forEach((p) => {
      p.availableFabrics?.forEach((f) => {
        if (f.name) uniqueFabrics.add(f.name);
      });
      // Also include parentCategory if availableCollections is empty
      if (!p.availableFabrics || p.availableFabrics.length === 0) {
        p.parentCategory?.forEach((pc) => uniqueFabrics.add(pc));
      }
    });
    return [
      { label: "All Fabrics", value: "all" },
      ...Array.from(uniqueFabrics)
        .sort()
        .map((f) => ({ label: f, value: f.toLowerCase() })),
    ];
  }, [products]);

  const priceOptions: FilterOption[] = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹1,000", value: "0-1000" },
    { label: "₹1,000 - ₹2,000", value: "1000-2000" },
    { label: "₹2,000 - ₹3,000", value: "2000-3000" },
    { label: "₹3,000 - ₹5,000", value: "3000-5000" },
    { label: "₹5,000 - ₹10,000", value: "5000-10000" },
    { label: "Above ₹10,000", value: "10000-999999" },
  ];

  const sortOptions: FilterOption[] = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Newest", value: "newest" },
  ];

  const allFilterOptions: Record<string, FilterOption[]> = {
    size: sizeOptions,
    color: colorOptions,
    collections: collectionsOptions,
    // season: seasonOptions,
    fabric: fabricOptions,
    price: priceOptions,
  };

  const getActiveFilters = () => {
    const active: Array<{ key: string; label: string }> = [];

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all" && key !== "sortBy") {
        const option = allFilterOptions[key]?.find(
          (opt) => opt.value === value,
        );
        if (option) {
          active.push({ key, label: option.label });
        }
      }
    });
    return active;
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="w-full bg-white ">
      <div className="max-w-[1800px] mx-auto ">
        {/* Mobile Filter Button Row */}
        <div className="flex md:hidden items-center justify-between gap-4  bg-white sticky top-0 z-[40]">
          <div className="flex-1">
            {resultCount > 0 && (
              <span className="text-[12px] sm:text-base font-bold text-gray-400 uppercase tracking-widest">
                {resultCount} {resultCount === 1 ? "Product" : "Products"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-sm font-semibold text-gray-900 shadow-sm active:scale-95 transition-all"
            >
              <Filter size={16} className="text-gray-900" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilters.length > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-red-900 text-white text-[10px] font-bold rounded-full">
                  {activeFilters.length}
                </span>
              )}
            </button>

            <DropdownFilter
              label="Sort"
              options={sortOptions}
              value={filters.sortBy}
              onChange={(value) => handleFilterChange("sortBy", value)}
              isOpen={openDropdown === "sort"}
              onToggle={() => toggleDropdown("sort")}
            />
          </div>
        </div>

        {/* Desktop Filters Row */}
        <div className="hidden md:flex flex-wrap items-center gap-2 sm:gap-3 py-4">
          <DropdownFilter
            label="Size"
            options={sizeOptions}
            value={filters.size}
            onChange={(value) => handleFilterChange("size", value)}
            isOpen={openDropdown === "size"}
            onToggle={() => toggleDropdown("size")}
          />

          <DropdownFilter
            label="Color"
            options={colorOptions}
            value={filters.color}
            onChange={(value) => handleFilterChange("color", value)}
            isOpen={openDropdown === "color"}
            onToggle={() => toggleDropdown("color")}
          />

          {/* <DropdownFilter
            label="Season"
            options={seasonOptions}
            value={filters.season}
            onChange={(value) => handleFilterChange("season", value)}
            isOpen={openDropdown === "season"}
            onToggle={() => toggleDropdown("season")}
          /> */}

          <DropdownFilter
            label="Fabric"
            options={fabricOptions}
            value={filters.fabric}
            onChange={(value) => handleFilterChange("fabric", value)}
            isOpen={openDropdown === "fabric"}
            onToggle={() => toggleDropdown("fabric")}
          />

          <DropdownFilter
            label="Collections"
            options={collectionsOptions}
            value={filters.collections}
            onChange={(value) => handleFilterChange("collections", value)}
            isOpen={openDropdown === "collections"}
            onToggle={() => toggleDropdown("collections")}
          />

          <DropdownFilter
            label="Price"
            options={priceOptions}
            value={filters.price}
            onChange={(value) => handleFilterChange("price", value)}
            isOpen={openDropdown === "price"}
            onToggle={() => toggleDropdown("price")}
          />

          {/* Sort - pushed to right on larger screens */}
          <div className="ml-auto">
            <DropdownFilter
              label="Sort"
              options={sortOptions}
              value={filters.sortBy}
              onChange={(value) => handleFilterChange("sortBy", value)}
              isOpen={openDropdown === "sort"}
              onToggle={() => toggleDropdown("sort")}
            />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div
          className={cn(
            "fixed inset-0 z-[10002] transition-opacity duration-300 md:hidden",
            isMobileDrawerOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 max-h-[90vh] bg-white rounded-t-[2.5rem] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] transform flex flex-col",
              isMobileDrawerOpen ? "translate-y-0" : "translate-y-full",
            )}
          >
            {/* Drawer Handle */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-red-600 flex items-center gap-1 active:scale-95 transition-transform"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
              {[
                { name: "size", label: "Size", options: sizeOptions },
                { name: "color", label: "Color", options: colorOptions },
                { name: "season", label: "Season", options: seasonOptions },
                { name: "fabric", label: "Fabrics", options: fabricOptions },
                {
                  name: "collections",
                  label: "Collections",
                  options: collectionsOptions,
                },
                { name: "price", label: "Price", options: priceOptions },
              ].map((section) => (
                <div key={section.name} className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">
                    {section.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {section.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange(section.name, option.value)
                        }
                        className={cn(
                          "px-4 py-2 text-sm transition-all border",
                          filters[section.name as keyof typeof filters] ===
                            option.value
                            ? "bg-red-900  text-white shadow-md scale-105"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300",
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full py-3 bg-gray-900 text-white rounded-2xl font-semibold shadow-lg active:scale-[0.98] transition-all"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters and Result Count */}
        {(activeFilters.length > 0 || resultCount > 0) && (
          <div className="hidden md:flex flex-wrap items-center gap-2">
            {resultCount > 0 && (
              <span className="text-gray-600 mr-2">
                {resultCount > 0 && (
                  <span className="text-[12px] sm:text-base font-bold text-gray-400 uppercase tracking-widest">
                    {resultCount} {resultCount === 1 ? "Product" : "Products"}
                  </span>
                )}
              </span>
            )}

            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => removeFilter(filter.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-800 rounded-full text-sm hover:bg-red-100 transition-colors"
              >
                <span>{filter.label}</span>
                <X size={14} />
              </button>
            ))}

            {activeFilters.length > 1 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
