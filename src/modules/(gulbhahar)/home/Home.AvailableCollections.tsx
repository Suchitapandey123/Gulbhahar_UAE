import HorizontalCarousel from "@/shared-components/Scrollbar/HorizontalCarousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CollectionCard from "./components/CollectionCard";
import { AvailableCollectionItem } from "@/app/api/home/type";

const CATEGORIES = [
  {
    name: "Lehengas",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/lehenga.webp",
    slug: "lehenga",
  },
  {
    name: "Bags",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/bags.webp",
    slug: "bags",
  },
  {
    name: "Sarees",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/saree.webp",
    slug: "saree",
  },
  {
    name: "Jewellery",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/jewellery.webp",
    slug: "jewellery",
  },
  {
    name: "Suits",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/suits.webp",
    slug: "suit",
  },
  {
    name: "Juttis",
    image:
      "https://d21ojmskh8ksuv.cloudfront.net/static/home/available-collections/juttis.webp",
    slug: "juttis",
  },
];

interface AvailableCollectionsProps {
  AvailableCollections : AvailableCollectionItem[]
}

const Home_AvailableCollections = ({AvailableCollections} : AvailableCollectionsProps) => {
  return (
    <section className="py-8 bg-white overflow-hidden">
      <div className="flex flex-col space-y-4 justify-center mb-6">
        <div className="flex justify-center items-center gap-3">
          <span className="w-16 h-px bg-[#800000]" />
          <span className="text-[#800000] text-[11px] font-bold tracking-[0.4em] uppercase">
            Gulbhahar Collections
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl text-center font-serif text-[#1a1a1a] leading-[1.1]">
          Our{" "}
          <span className="italic text-[#800000] serif-italics">Available</span>{" "}
          Collections
        </h2>

        <p className="text-gray-500 text-center text-base md:text-lg leading-relaxed font-light">
          Experience our latest silhouettes in motion. Every thread tells a
          story of heritage, now just a tap away.
        </p>
      </div>

      <HorizontalCarousel className="flex overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-8">
        {AvailableCollections.map((category, index) => (
          <CollectionCard
            key={category.slug}
            category={category}
            index={index}
          />
        ))}

        {/* Last trailing space with a bold end block */}
        <div className="flex-none w-[60vw] md:w-[20vw] bg-[#1a1a1a] flex flex-col justify-center px-8 md:px-12 text-white snap-start">
          <p className="text-[10px] font-bold tracking-[1em] uppercase opacity-40 mb-4">
            Fin.
          </p>
          <h4 className="text-2xl md:text-3xl font-serif leading-tight">
            Explore
            <br />
            Complete
            <br />
            Series
          </h4>
          <Link
            href="/collections"
            className="mt-8 w-12 h-12 rounded-full bg-[#800000] flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ArrowRight size={20} />
          </Link>
        </div>
      </HorizontalCarousel>
    </section>
  );
};

export default Home_AvailableCollections;
