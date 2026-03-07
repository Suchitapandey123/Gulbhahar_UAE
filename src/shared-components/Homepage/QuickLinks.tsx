// @ts-nocheck
"use client";

import Link from "next/link";
import { Old_Standard_TT } from "next/font/google";
import { useState, useEffect } from "react";
import { ArrowUpRight, TrendingUp, Zap } from "lucide-react";
import { pageService } from "@/services/page/pageService";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

export default function QuickSearch() {
  const [quickLinksData, setQuickLinksData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getQuickLinksFun() {
    try {
      setLoading(true);
      const parentCategory = "lehenga";
      const currentSlug = "kanjivaram-lehenga";

      const data = await pageService.getQuickLinks(
        parentCategory,
        currentSlug
      );

      setQuickLinksData(data);
    } catch (error) {
      console.error("Error fetching quick links:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuickLinksFun();
  }, []);

  const formatSlugToText = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPopularSearches = () => {
    if (!quickLinksData?.data) return [];

    const { saree = [], suit = [], lehenga = [] } = quickLinksData.data;

    return [
      ...saree.slice(0, 5),
      ...suit.slice(0, 5),
      ...lehenga.slice(0, 5),
    ];
  };

  const getQuickLinks = () => {
    if (!quickLinksData?.data) return [];

    const { saree = [], suit = [], lehenga = [] } = quickLinksData.data;

    return [
      ...saree.slice(0, 4),
      ...suit.slice(0, 4),
      ...lehenga.slice(0, 4),
    ];
  };

  const popularSearches = getPopularSearches();
  const quickLinks = getQuickLinks();

  return (
    <footer className="max-w-[1600px] mx-auto">
      {/* Popular Searches */}
      <div className="mb-12">
        <div className="flex items-center gap-3 ">
          <TrendingUp className="w-6 h-6 text-red-700" />
          <h2
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold text-gray-800`}
          >
            Popular Searches
          </h2>
        </div>

        <div className="flex flex-wrap gap-1">
          {popularSearches.map((item, index) => (
            <Link key={index} href={`/collections/${item}`} prefetch>
              <span
                className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700 hover:text-red-700 cursor-pointer`}
              >
                {formatSlugToText(item)}
                {index !== popularSearches.length - 1 && " | "}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-red-700" />
          <h2
            className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold text-gray-800`}
          >
            Quick Links
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map((item, index) => (
            <Link key={index} href={`/collections/${item}`}>
              <div className="p-2 px-4 bg-white border border-gray-200 rounded-xl hover:border-red-300 hover:shadow-md transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <span
                    className={`${oldStandardTT.variable} text-sm lg:text-base text-gray-700 hover:text-red-700 truncate font-medium`}
                    title={formatSlugToText(item)}
                  >
                    {formatSlugToText(item)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
