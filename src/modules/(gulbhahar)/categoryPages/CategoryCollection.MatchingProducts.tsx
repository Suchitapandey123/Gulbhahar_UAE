// @ts-nocheck
import Image from "next/image";
import Link from "next/link";

interface CategoryCollection_MatchingProductsProps {
  parentCategory: string;
}

// Which categories to show for each collection
// handles both parentCategory values and slug values
const matchingMap: Record<string, string[]> = {
  juttis:  ["suit", "bags"],
  jutti:   ["suit", "bags"],
  bags:    ["suit", "juttis", "sarees"],
  bag:     ["suit", "juttis", "sarees"],
  suit:    ["bags", "juttis"],
  suits:   ["bags", "juttis"],
  sarees:  ["bags"],
  saree:   ["bags"],
};

const categoryLabels: Record<string, string> = {
  suit:   "Suits",
  bags:   "Bags",
  juttis: "Juttis",
  sarees: "Sarees",
};

// Desktop and mobile images for each category
const categoryImages: Record<string, { desktop: string; mobile: string; href: string }> = {
  suit:   { desktop: "/images/collection-suits-desktop.webp",  mobile: "/images/collection-suit-mobile.webp",  href: "/suit" },
  bags:   { desktop: "/images/collection-bag-desktop.webp",    mobile: "/images/collection-bag-mobile.webp",    href: "/bags" },
  juttis: { desktop: "/images/collection-jutti-desktop.webp",  mobile: "/images/collection-jutti-mobile.webp",  href: "/juttis" },
  sarees: { desktop: "/images/collection-saree-desktop.webp",  mobile: "/images/collection-saree-mobile.webp",  href: "/saree" },
};

const CategoryCollection_MatchingProducts = ({ parentCategory }: CategoryCollection_MatchingProductsProps) => {
  const catsToShow = matchingMap[parentCategory] ?? [];

  if (catsToShow.length === 0) return null;

  return (
    <div className="space-y-16 my-16">
      {catsToShow.map((cat) => {
        const img = categoryImages[cat];
        if (!img) return null;

        return (
          <div key={cat} className="col-span-full">
            {/* Heading */}
            <div className="w-full mb-8 text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Style It Up</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-red-900">
                Complete Your Look With {categoryLabels[cat]}
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-12 bg-red-900/20" />
                <p className="text-sm text-gray-500">Perfect picks to pair with your dream outfit</p>
                <div className="h-px w-12 bg-red-900/20" />
              </div>
            </div>

            {/* Clickable Image */}
            <Link href={img.href} className="block w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500">
              <Image
                src={img.desktop}
                alt={`Shop ${categoryLabels[cat]}`}
                width={1400}
                height={500}
                className="hidden sm:block w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                priority={false}
              />
              <Image
                src={img.mobile}
                alt={`Shop ${categoryLabels[cat]}`}
                width={600}
                height={700}
                className="block sm:hidden w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                priority={false}
              />
            </Link>

            {/* Discover All Button */}
            <div className="flex justify-center mt-8">
              <Link
                href={img.href}
                className="group relative px-8 py-4 bg-transparent overflow-hidden border border-[#800000]/30 text-[#800000] transition-all duration-500 hover:border-[#800000] rounded-sm"
              >
                <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-full" />
                <span className="relative text-xs font-bold tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
                  Discover All {categoryLabels[cat]}
                </span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryCollection_MatchingProducts;
