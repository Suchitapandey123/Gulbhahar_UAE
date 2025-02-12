"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import BoxIcon from "./ui/BoxIcon";
import BoxIcon2 from "./ui/BoxIcon2";
import SortIcon from "./ui/SortIcon";
import ArrowUp from "./ui/ArrowUp";
import ArrowLeft from "./ui/ArrowLeft";
import ArrowRight from "./ui/ArrowRight";

const collections = [
  {
    id: 1,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "FALL 2024",
    stock: 12,
    size: "S",
  },
  {
    id: 2,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XXS",
  },
  {
    id: 3,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "M",
  },
  {
    id: 4,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "L",
  },
  {
    id: 5,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XL",
  },
  {
    id: 7,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 8,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 9,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 10,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 11,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 12,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 13,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 14,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
  {
    id: 15,
    name: "Noorani Outfit",
    price: 5000,
    image: "/16.svg",
    season: "WINTER 2024",
    stock: 15,
    size: "XS",
  },
];

const seasons = [
  "ALL",
  "FALL 2024",
  "WINTER 2024",
  "SPRING 2024",
  "SPRING SUMMER 2024",
];
const sortOptions = [
  { label: "Price: high to low", value: "price-desc" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Newest", value: "newest" },
  { label: "Relevance", value: "relevance" },
];

const trends = [
  {
    title: "Women's Casual Shoes You Need To Own",
    description: `Casual shoes for women come in an endless number of styles, which are constantly updated according to various fashion trends and pop culture influences. Any woman who loves shoes knows that they can make or break an outfit. If there is a shoe for every foot, then there is also a pair of women's casual shoes for every occasion.
  

This is the best time to buy women's casual shoes because brands thrive on creating as many imaginative variations as possible. There is always a good reason to pick up a pair of women's casual shoes, whether for an event or just to give your mood a lift. Further, shopping for casual shoes for women online now gives you the freedom of browsing through several brands at once. Retail therapy on Gulbhahr.`,
    image: "/trend1.svg",
  },
  {
    title: "Flat n Heels, Black Solid Synthetic High-Top Flat Boots",
    description: `Gold hardware on the front of these boots makes them the perfect dressy boot. These women casual shoes will look great with fitted denim or A-line skirts worn with tights.
Carlton London, Blue Printed Textured Ballerinas
Every woman should own a ballerina along with other women casual shoes. They are simple, comfortable and always in style.`,
    image: "/trend1.svg",
  },
  {
    title: "DressBerry, Metallic Brown Sneakers",
    description: `The trend of velvety-metallic finish sneakers is all the rage right now in women casual shoes. This pair would couple well with dark skinny jeans and an off-shoulder Bardot top.`,
    image: "/trend1.svg",
  },
  {
    title: "Nike, Pink AIR FORCE 1 07 Sneakers",
    description: `Shades of millennial pink are still making waves in fashion. This pair of women casual shoes will complement shades of grey, black or white very well.
Ladies Casual Shoes Online.`,
    image: "/trend1.svg",
  },
  {
    title: "SHOP BY TYPES OF WOMENS FOOTWEAR",
    description: `Sandals For Women | Heels For Women | Sneakers For Women | Boots For Women | Flats For Women | Flip Flops For Women | Sports Shoes For Women | Wedges For Women | Formal Shoes For Women | Loafers For Women | Jutti For Women | Slippers For Women | Clogs For Women | Trekking Shoes For Women | Slides For Women| Slip On Shoes For Women`,
    image: "/trend4.jpg",
  },
];

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedSeason, setSelectedSeason] = useState("ALL");
  const [priceRange, setPriceRange] = useState([2000, 5000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCollections = collections
    .filter((item) => {
      const matchesSeason =
        selectedSeason === "ALL" || item.season === selectedSeason;
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesSize =
        selectedSizes.length === 0 || selectedSizes.includes(item.size);
      return matchesSeason && matchesPrice && matchesSize;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredCollections.length / ITEMS_PER_PAGE);
  const paginatedCollections = filteredCollections.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
    setMinPrice(min);
    setMaxPrice(max);
  };

  const clearFilters = () => {
    setSelectedSeason("ALL");
    setPriceRange([2000, 5000]);
    setMinPrice(2000);
    setMaxPrice(5000);
    setSelectedSizes([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full relative mt-16">
          <Image
            src="/banner.svg"
            alt="Latest Collections Banner"
            width={1512}
            height={349}
            priority
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-20">
          <div className="w-full lg:w-64 p-6 rounded-lg bg-slateColor2 shadow-lg lg:h-[600px] sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium font-raleway">Filter</h3>
              <button
                onClick={clearFilters}
                className="text-customRed text-sm hover:text-customRed flex items-center font-raleway gap-1"
              >
                Advance
              </button>
            </div>

            <div className="mb-6 bg-white p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-3 font-raleway">
                Price Range
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="100"
                    value={minPrice}
                    onChange={(e) =>
                      handlePriceChange(parseInt(e.target.value), maxPrice)
                    }
                    className="w-full accent-customPaleYellow"
                  />
                </div>
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="range"
                    min="2000"
                    max="5000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) =>
                      handlePriceChange(minPrice, parseInt(e.target.value))
                    }
                    className="w-full accent-customPaleYellow"
                  />
                </div>
                <div className="flex items-center gap-4 font-raleway">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) =>
                      handlePriceChange(parseInt(e.target.value), maxPrice)
                    }
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) =>
                      handlePriceChange(minPrice, parseInt(e.target.value))
                    }
                    className="w-full px-3 py-1 border rounded-md text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 font-raleway">Size</h4>
              <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg">
                {["XXS", "XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (selectedSizes.includes(size)) {
                        setSelectedSizes(
                          selectedSizes.filter((s) => s !== size)
                        );
                      } else {
                        setSelectedSizes([...selectedSizes, size]);
                      }
                    }}
                    className={`px-3 py-1 text-sm border rounded-md ${
                      selectedSizes.includes(size)
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {(selectedSizes.length > 0 ||
              selectedSeason !== "ALL" ||
              priceRange[0] !== 2000 ||
              priceRange[1] !== 5000) && (
              <div className="mb-6 p-4 bg-white rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {selectedSizes.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1"
                    >
                      {size}
                      <button
                        onClick={() =>
                          setSelectedSizes(
                            selectedSizes.filter((s) => s !== size)
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                  {selectedSeason !== "ALL" && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1 font-raleway">
                      {selectedSeason}
                      <button
                        onClick={() => setSelectedSeason("ALL")}
                        className="text-gray-500 hover:text-gray-700 font-raleway"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  )}
                  {(priceRange[0] !== 2000 || priceRange[1] !== 5000) && (
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-1">
                      ₹{priceRange[0]} - ₹{priceRange[1]}
                      <button
                        onClick={() => handlePriceChange(2000, 5000)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${
                    viewMode === "list" ? "bg-gray-100" : ""
                  }`}
                >
                  <BoxIcon className="w-[18px] h-[19px]" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid" ? "bg-gray-100" : ""
                  }`}
                >
                  <BoxIcon2 className="w-[47px] h-[40px]" />
                </button>
              </div>
              <div className="relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <SortIcon className="w-[16px] h-[8px]" />
                  <span className="text-gray-500 font-raleway">Sort by:</span>
                  <span className="font-raleway">
                    {sortOptions.find((option) => option.value === sortBy)
                      ?.label || "Relevance"}
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 font-raleway">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          sortBy === option.value
                            ? "bg-customRed text-white text-center"
                            : ""
                        }`}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 overflow-x-auto font-raleway">
              <div className="flex gap-4 min-w-max font-raleway">
                {seasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={`px-4 py-2 font-raleway text-sm rounded-md whitespace-nowrap ${
                      selectedSeason === season
                        ? "bg-black text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-6`}
            >
              {paginatedCollections.map((item) => (
                <Link href={`/collection/${item.id}`} key={item.id}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="relative pb-[100%] rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                        <div className="w-full">
                          <p className="font-medium">₹{item.price}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-customRed">
                              {item.stock} items left
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <div className="flex">
               <ArrowLeft/>
               <ArrowLeft/>
                </div>
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft/>
                  <p className="font-raleway">previous</p>
                </div>
              </button>
              <span className="text-sm px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <p className="font-raleway">Next</p>
                  <ArrowRight/>
                </div>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                 <div className="flex">
               <ArrowRight/>
               <ArrowRight/>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 ml-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 font-raleway ">Top Trends</h2>
        <div className="flex items-center gap-16 rounded-md">
          <Image
            src="/trend1.svg"
            alt="trends"
            width={300}
            height={450}
            objectFit="cover"
            className="bg-slateColor rounded-md"
          />
          <Image
            src="/trend1.svg"
            alt="trends"
            width={300}
            height={450}
            objectFit="cover"
            className="bg-slateColor"
          />
          <Image
            src="/trend1.svg"
            alt="trends"
            width={300}
            height={450}
            objectFit="cover"
            className="bg-slateColor"
          />
          <Image
            src="/trend1.svg"
            alt="trends"
            width={300}
            height={450}
            objectFit="cover"
            className="bg-slateColor"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 font-raleway mt-16">
          {trends.map((trend, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden font-raleway"
            >
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 font-raleway">
                  {trend.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3 font-raleway">
                  {trend.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
