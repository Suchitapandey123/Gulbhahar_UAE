"use client";

import { ArrowRight, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CategoryItem {
  name: string;
  slug: string;
}

interface Category {
  title: string;
  subtitle: string;
  items: CategoryItem[];
}

interface CollectionCategoryProps {
  category: Category;
}

const CollectionCategory: React.FC<CollectionCategoryProps> = ({
  category,
}) => (
  <div className="space-y-5 p-2 bg-white rounded-xl border border-transparent hover:border-gray-100 transition-all duration-300">
    <div className="space-y-1.5">
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">
        {category.title}
      </h3>
      <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#800000]/60">
        {category.subtitle}
      </p>
    </div>

    <div className="h-px w-10 bg-[#800000]/20" />

    <ul className="space-y-2.5">
      {category.items.map((item, itemIndex) => (
        <li key={itemIndex}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = item.slug;
            }}
            className="group flex items-center justify-between text-gray-600 hover:text-[#800000] transition-all duration-300 
                     cursor-pointer text-[13px] font-medium"
          >
            <span>{item.name}</span>
            <ArrowRight
              size={10}
              className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

interface CollectionsDropdownProps {
  isCollectionDropdownOpen: boolean;
  router: ReturnType<typeof useRouter>;
  setIsCollectionDropdownOpen: (isOpen: boolean) => void;
  setIsHoverMode: (isHover: boolean) => void;
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
  hoverTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const CollectionsDropdown: React.FC<CollectionsDropdownProps> = ({
  isCollectionDropdownOpen,
  setIsCollectionDropdownOpen,
  setIsHoverMode,
  dropdownRef,
  hoverTimeoutRef,
}) => {
  const mainLinks = [
    { name: "Juttis", slug: "/juttis" },
    { name: "Suits", slug: "/suits" },
    { name: "Bags", slug: "/bags" },
    { name: "Sarees", slug: "/sarees" },
     { name: "Lehenga", slug: "/lehenga" },
  ];

  const collectionCategories: Category[] = [
    {
      title: "Designed By Monica",
      subtitle: "Exclusive Collection",
      items: [
        { name: "Jodhpuri Jutti Ladies", slug: "/collections/jodhpuri-jutti-ladies" },
        { name: "Bridal Saree ", slug: "/collections/bridal-saree-collection" },
        { name: "Red Suit ", slug: "/collections/red-suit" },
        { name: "Bridal Juttis", slug: "/collections/bridal-juttis" },
        { name: "Peach Color Suit ", slug: "/collections/peach-colour-suit" },
      ],
    },
    {
      title: "Casual Juttis",
      subtitle: "Everyday Comfort",
      items: [
        { name: "Party Wear Jutti", slug: "/collections/party-wear-jutti" },
        { name: "Jutti For Bride", slug: "/collections/jutti-for-bride" },
        { name: "Jutti Heels", slug: "/collections/jutti-heels" },
        {
          name: "Punjabi Juttis For Ladies",
          slug: "/collections/punjabi-juttis-for-ladies",
        },
        { name: "Juttis For Women", slug: "/collections/juttis-for-women" },
      ],
    },
    {
      title: "Saree Collection",
      subtitle: "Traditional & Premium",
      items: [
        {
          name: "Bridal Saree Collection",
          slug: "/collections/bridal-saree-collection",
        },
        { name: "Plain Satin Saree", slug: "/collections/plain-satin-saree" },
        {
          name: "Banarasi Saree Price",
          slug: "/collections/banarasi-saree-price",
        },
        {
          name: "Chiffon Banarasi Saree",
          slug: "/collections/chiffon-banarasi-saree",
        },
        { name: "Off White Saree", slug: "/collections/off-white-saree" },
      ],
    },
    {
      title: "Suits Collection",
      subtitle: "Elegant & Comfortable",
      items: [
        { name: "Lavender Suit", slug: "/collections/lavender-suit" },
        { name: "Indo Western Suit ", slug: "/collections/indo-western-suit" },
        {
          name: "Blue Suit Black Shirt",
          slug: "/collections/blue-suit-black-shirt",
        },
        { name: "Plain Suit ", slug: "/collections/plain-suit" },
        { name: "Red Suit", slug: "/collections/red-suit" },
      ],
    },
  ];

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setIsCollectionDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

      hoverTimeoutRef.current = setTimeout(() => {
        setIsCollectionDropdownOpen(false);
      }, 150);
    }
  };

  const handleViewAllCollections = () => {
    window.location.href = "/collections";
    setIsCollectionDropdownOpen(false);
    setIsHoverMode(true);
  };

  return (
    <div
      ref={dropdownRef}
      className={`
        absolute left-0 bg-white w-full bg-white/98 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.1)] z-50 
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-b rounded-b-[2.5rem] border-gray-100 overflow-hidden
        ${
          isCollectionDropdownOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-8 pointer-events-none"
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 max-w-[1600px] mx-auto pt-10 pb-12 px-8 lg:px-12">
        {/* Header Section with Main Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between pb-8  border-b border-gray-50 gap-8">
          <div className="flex flex-wrap justify-center gap-3">
            {mainLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => (window.location.href = link.slug)}
                className="group relative px-3 py-2 bg-transparent overflow-hidden border border-[#800000]/10 text-[#800000] transition-all duration-300 hover:border-[#800000] "
              >
                <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
                <span className="relative text-[11px] font-bold tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleViewAllCollections}
            className="group relative px-4 py-3 border  overflow-hidden hover:text-white transition-all duration-500  transform hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 w-0 bg-[#600000]  transition-all duration-500 group-hover:w-full" />
            <div className="relative flex items-center space-x-2">
              <Eye size={16} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
                View All Collections
              </span>
            </div>
          </button>
        </div>

        {/* Regular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collectionCategories.map((category, index) => (
            <CollectionCategory key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsDropdown;
