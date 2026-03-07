import { redirect } from "next/navigation";
import { PageData } from "@/types/page.types";

interface ParsedDetail {
  description: string;
  highlight: string;
  points: string[];
  keyValues: { key: string; value: string }[];
  subTitle1: string;
}

// Function to parse additional details content
const parseDetailsContent = (detail: any): ParsedDetail => {
  if (!detail)
    return {
      description: "",
      highlight: "",
      points: [],
      keyValues: [],
      subTitle1: "",
    };

  // Find the actual subDescription and subTitle keys (could be subDescription1, subDescription2, etc.)
  const subDescKey = Object.keys(detail).find((key) =>
    key.startsWith("subDescription"),
  );
  const subTitleKey = Object.keys(detail).find((key) =>
    key.startsWith("subTitle"),
  );

  const subDescription = subDescKey ? detail[subDescKey] : "";
  const subTitle = subTitleKey ? detail[subTitleKey] : "";

  let description = subDescription;
  let highlight = detail.highlight || "";
  let points = detail.tags || [];
  let keyValues = detail.keyValues || [];

  // If separate fields don't exist, try to parse from subDescription (backward compatibility)
  if (!highlight && !points.length && !keyValues.length && description) {
    // Extract highlight
    const highlightMatch = description.match(/^\*\*(.*?)\*\*\n\n/);
    if (highlightMatch) {
      highlight = highlightMatch[1].trim();
      description = description.replace(highlightMatch[0], "").trim();
    }

    // Extract tags/points
    const tagsMatch = description.match(/^Tags:\s*(.+?)\n\n/);
    if (tagsMatch) {
      points = tagsMatch[1]
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag);
      description = description.replace(tagsMatch[0], "").trim();
    }

    // Extract key-values
    const kvMatch = description.match(/^Details:\n((?:.+:.+\n)+)\n/);
    if (kvMatch) {
      keyValues = kvMatch[1]
        .split("\n")
        .filter((line: string) => line.includes(":"))
        .map((line: string) => {
          const [k, v] = line.split(":");
          return { key: k.trim(), value: v.trim() };
        });
      description = description.replace(kvMatch[0], "").trim();
    }

    // Remove separator
    if (description.startsWith("---\n\n")) {
      description = description.slice(5);
    }
    description = description.trim();
  }

  return {
    description,
    highlight,
    points,
    keyValues,
    subTitle1: subTitle || detail.subTitle1 || "",
  };
};

interface ContentSectionProps {
  page: PageData;
}

const ContentSection = ({ page }: ContentSectionProps) => {
  if (!page) return null;

  if (page.isFeatured === false) {
    redirect("/not-found");
  }

  // Parse additional details to extract structured data on the server
  const parsedAdditionalDetails: ParsedDetail[] =
    page.additionalDetails && Array.isArray(page.additionalDetails)
      ? page.additionalDetails.map((detail: any) => parseDetailsContent(detail))
      : [];

  const p = {
    ...page,
    parsedAdditionalDetails,
  };

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
      {/* Main Heading */}
      <div className="text-center sm:text-start mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
          {p.metaTitle}{" "}
        </h1>
      </div>

      {/* Introduction */}
      {p.onPageDescription && (
        <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2">
            {p.onPageDescription}
          </p>
        </div>
      )}

      {/* Dynamic Sections - USING ADDITIONAL DETAILS */}
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Section 1 - Red Background */}
        {p.parsedAdditionalDetails?.[0] && (
          <section className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  1
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[0].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {p.parsedAdditionalDetails[0].description}
            </p>
          </section>
        )}

        {/* Section 2 - With Highlight in Red Box */}
        {p.parsedAdditionalDetails?.[1] && (
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  2
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[1].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
              {p.parsedAdditionalDetails[1].description}
            </p>

            {/* Highlight in Red Box */}
            {p.parsedAdditionalDetails[1].highlight && (
              <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                  {p.parsedAdditionalDetails[1].highlight}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Section 3 - Gray Background */}
        {p.parsedAdditionalDetails?.[2] && (
          <section className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  3
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[2].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {p.parsedAdditionalDetails[2].description}
            </p>
          </section>
        )}

        {/* Section 4 - Points in Pink Boxes */}
        {p.parsedAdditionalDetails?.[3] && (
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  4
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[3].subTitle1}
                </span>
              </div>
            </div>

            {/* First 2 sentences from description */}
            {p.parsedAdditionalDetails[3].description && (
              <div className="mb-4 sm:mb-6">
                {(() => {
                  const sentences = p.parsedAdditionalDetails[3].description
                    .split(".")
                    .map((s) => s.trim())
                    .filter((s) => s !== "");

                  const firstTwo =
                    sentences.slice(0, 2).join(". ") +
                    (sentences.length >= 2 ? "." : "");
                  const remaining = sentences.slice(2).join(". ");
                  const finalRemaining = remaining ? remaining + "." : "";

                  return (
                    <>
                      {/* FIRST 2 SENTENCES */}
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4">
                        {firstTwo}
                      </p>

                      {/* Pink Boxes */}
                      {p.parsedAdditionalDetails[3].points?.length > 0 && (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] justify-center gap-3 sm:gap-4 mb-4">
                          {p.parsedAdditionalDetails[3].points.map(
                            (point, index) => (
                              <div
                                key={index}
                                className="bg-red-100 text-red-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-center font-semibold text-sm sm:text-base"
                              >
                                {point}
                              </div>
                            ),
                          )}
                        </div>
                      )}

                      {/* REMAINING SENTENCES AFTER POINTS */}
                      {finalRemaining && (
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {finalRemaining}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* Additional description after points */}
            {p.parsedAdditionalDetails[3].keyValues &&
              p.parsedAdditionalDetails[3].keyValues.length > 0 && (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {p.parsedAdditionalDetails[3].keyValues
                    .map((kv) => kv.value)
                    .join(" ")}
                </p>
              )}
          </section>
        )}

        {/* Section 5 - Gradient Red Background */}
        {p.parsedAdditionalDetails?.[4] && (
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  5
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[4].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {p.parsedAdditionalDetails[4].description}
            </p>
          </section>
        )}

        {/* Section 6 - Key-Values as Cards */}
        {p.parsedAdditionalDetails?.[5] && (
          <section>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  6
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[5].subTitle1}
                </span>
              </div>
            </div>

            {/* Main Description */}
            {p.parsedAdditionalDetails[5].description && (
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                {p.parsedAdditionalDetails[5].description}
              </p>
            )}

            {/* Key-Values as Cards */}
            {p.parsedAdditionalDetails[5].keyValues &&
              p.parsedAdditionalDetails[5].keyValues.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {p.parsedAdditionalDetails[5].keyValues.map((kv, index) => (
                    <div
                      key={index}
                      className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 
     flex flex-col items-center justify-center text-center"
                    >
                      <p className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">
                        {kv.key}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {kv.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            {/* Points as Cards (fallback) */}
            {(!p.parsedAdditionalDetails[5].keyValues ||
              p.parsedAdditionalDetails[5].keyValues.length === 0) &&
              p.parsedAdditionalDetails[5].points &&
              p.parsedAdditionalDetails[5].points.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {p.parsedAdditionalDetails[5].points.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <p className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              )}
          </section>
        )}

        {/* Section 7 - Dark Background */}
        {p.parsedAdditionalDetails?.[6] && (
          <section className="bg-gray-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  7
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[6].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {p.parsedAdditionalDetails[6].description}
            </p>
          </section>
        )}

        {/* Section 8 - Additional Section */}
        {p.parsedAdditionalDetails?.[7] && (
          <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                <span className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                  8
                </span>
                <span className="leading-tight">
                  {p.parsedAdditionalDetails[7].subTitle1}
                </span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
              {p.parsedAdditionalDetails[7].description}
            </p>

            {/* Show highlight if exists */}
            {p.parsedAdditionalDetails[7].highlight && (
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl mt-4">
                <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                  {p.parsedAdditionalDetails[7].highlight}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Additional Sections beyond 8 */}
        {p.parsedAdditionalDetails &&
          p.parsedAdditionalDetails.length > 8 &&
          p.parsedAdditionalDetails.slice(8).map((detail, index) => (
            <section
              key={index + 8}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    {index + 9}
                  </span>
                  <span className="leading-tight">{detail.subTitle1}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                {detail.description}
              </p>

              {/* Show highlight if exists */}
              {detail.highlight && (
                <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl mt-4">
                  <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                    {detail.highlight}
                  </p>
                </div>
              )}
            </section>
          ))}

        {/* Conclusion Section - Using shortDescription */}
        {p.shortDescription && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              Conclusion
            </span>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {p.shortDescription}
            </p>
          </div>
        )}

        {/* FAQ Section */}
        {Array.isArray(p.faq) && p.faq.length > 0 && (
          <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-red-900 mb-4 sm:mb-6">
              Frequently Asked Questions
            </span>
            <div className="space-y-4 sm:space-y-6">
              {p.faq.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-red-100"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-red-700 font-bold text-xs">Q</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 sm:mb-3">
                        {item.question}
                      </h3>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0">
                          <span className="text-green-700 font-bold text-xs">
                            A
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Section (if exists) */}
      {p.bottomSection && (
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            {p.bottomSection.title}
          </span>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            {p.bottomSection.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
