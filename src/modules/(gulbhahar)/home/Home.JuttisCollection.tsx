import { SimilarProductCard } from "@/modules/(gulbhahar)/products/components/SimilarProductCard";
import HorizontalCarousel from "@/shared-components/Scrollbar/HorizontalCarousel";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HomeJuttisCollectionProps {
  newCollection: any[];
  name: string;
  slug: string;
  reverse ?: boolean;
}

const Home_JuttisCollection: React.FC<HomeJuttisCollectionProps> = ({
  newCollection,
  slug,
  name,
  reverse
}) => {
  

  // Handle reverse sorting
  const displayCollection = reverse
    ? [...newCollection].reverse().slice(0, 8)
    : newCollection.slice(0, 8);

  return (
    <section className="relative overflow-visible">
      {/* Background "25" */}
      <div className="absolute right-64 -top-28 z-0 opacity-1 pointer-events-none select-none pr-8 hidden lg:block">
        <div className="text-[20rem] font-raleway font-bold text-[rgba(245,223,164,0.75)]">
          26
        </div>
      </div>

      {/* Background "20" */}
      <div className="absolute left-64 -bottom-[130px] z-0 opacity-1 pointer-events-none select-none hidden lg:block">
        <div className="text-[20rem] font-raleway font-bold text-[rgba(162,144,49,0.2)]">
          20
        </div>
      </div>

      <div className="w-full relative z-10">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl lg:text-5xl sm:text-4xl font-bold text-customRed font-raleway">
            {name}
          </h2>

          <div className="pr-4 md:pr-0">
            <Link href={slug}>
              <button className="flex items-center text-nowrap lg:gap-3 text-gray-900 hover:text-customRed text-sm sm:text-xl lg:text-2xl transition-colors font-raleway tracking-wider lg:w-[215] uppercase group">
                SEE MORE
                <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <ArrowUpRight size={32} />
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Collections Carousel */}
        <div>
          {newCollection && newCollection.length > 0 ? (
            <HorizontalCarousel className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-4 snap-x snap-mandatory">
              {displayCollection.map((product) => (
                <div
                  key={`${product.productId}-new-collection`}
                  className="flex-none w-[240px] sm:w-[340px] snap-center"
                >
                  <SimilarProductCard item={product} customRed="#7f0001" />
                </div>
              ))}
              {/* Spacing to prevent cutoff on right */}
              <div className="flex-none w-4" />
            </HorizontalCarousel>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[40vh] text-center py-12 px-6">
              {/* Keep empty state as is, but maybe styling needs check if grid is gone. 
                   Actually grid is gone. Flex col is fine. 
               */}
              <div className="mx-auto mb-8 w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 font-raleway tracking-wide">
                  No New Collections Found
                </h3>
                <p className="text-lg text-gray-600 font-raleway max-w-md mx-auto leading-relaxed">
                  Check back soon for exciting new arrivals and collections.
                </p>
              </div>

              <div className="mt-12">
                <Link href="/collections">
                  <button className="px-8 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all duration-300 font-raleway">
                    Browse All Collections
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home_JuttisCollection;
