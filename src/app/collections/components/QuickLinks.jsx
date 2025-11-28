import Link from "next/link";
import { Old_Standard_TT } from "next/font/google";

const oldStandardTT = Old_Standard_TT({
  weight: "400",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
});

async function getQuickLinks(parentCategory, currentSlug) {
  const { pageService } = await import("../../api/pageService/pageService");
  const response = await pageService.getQuickLinks(parentCategory, currentSlug);
  
  if (response.success && response.data) {
    return response.data;
  }
  return {};
}

export default async function QuickLinks({ parentCategory, currentSlug }) {
  if (!parentCategory || !currentSlug) return null;

  const quickLinks = await getQuickLinks(parentCategory, currentSlug);
  
  if (!Object.keys(quickLinks).length) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-16">
      {Object.keys(quickLinks).map((category) => {
        const links = quickLinks[category];
        if (!links || !links.length) return null;

        // Heading logic
        let headingText = "";
        if (category.toLowerCase() === "saree") {
          headingText = "Popular Sarees";
        } else if (category.toLowerCase() === "suit") {
          headingText = "Trending Suits";
        } else if (category.toLowerCase() === "lehenga") {
          headingText = "Trending Lehengas";
        } else {
          headingText = category.charAt(0).toUpperCase() + category.slice(1) + " Popular Searches";
        }

        return (
          <div key={category} className="mb-8">
            <h2 className={`${oldStandardTT.variable} text-2xl lg:text-3xl font-semibold mb-6`}>
              <span className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 bg-clip-text text-transparent">
                {headingText}
              </span>
            </h2>

            <div className="flex flex-wrap text-gray-700 text-[15px] leading-relaxed">
              {links.map((slug, index) => (
                <span key={index} className="flex items-center">
                  <Link
                    href={`/collections/${slug}`}
                    className="hover:underline hover:text-red-900"
                  >
                    {slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                  {index !== links.length - 1 && (
                    <span className="mx-1 text-gray-400">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
