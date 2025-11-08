"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { pageService } from "../../../api/pageService/pageService";

const ContentSection = ({ page: initialPage }) => {
  const { slug } = useParams();
  const [page, setPage] = useState(initialPage || null);
  const [loading, setLoading] = useState(!initialPage);
  const [error, setError] = useState("");

  // Function to parse additional description content
  const parseDescriptionContent = (subDescription1) => {
    if (!subDescription1) return { description: "", highlight: "", points: [], keyValues: [] };

    let description = subDescription1;
    let highlight = "";
    let points = [];
    let keyValues = [];

    // Extract highlight
    const highlightMatch = description.match(/\*\*(.*?)\*\*/);
    if (highlightMatch) {
      highlight = highlightMatch[1].trim();
      description = description.replace(highlightMatch[0], "").trim();
    }

    // Extract points
    const pointsMatch = description.match(/Key Points:\s*((?:\n?• .*)+)/);
    if (pointsMatch) {
      points = pointsMatch[1]
        .split("\n")
        .filter((p) => p.startsWith("• "))
        .map((p) => p.replace("• ", "").trim());
      description = description.replace(pointsMatch[0], "").trim();
    }

    // Extract key-values
    const kvMatch = description.match(/Details:\s*((?:\n?.*:.*)+)/);
    if (kvMatch) {
      keyValues = kvMatch[1]
        .split("\n")
        .filter((line) => line.includes(":"))
        .map((line) => {
          const [k, v] = line.split(":");
          return { key: k.trim(), value: v.trim() };
        });
      description = description.replace(kvMatch[0], "").trim();
    }

    // Remove separator
    description = description.replace(/---\s*/g, "").trim();

    return { description, highlight, points, keyValues };
  };

  useEffect(() => {
    if (initialPage || !slug) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await pageService.getPageBySlug(slug);
        const pageData = data.page || data.data || data;
        
        // Parse additional descriptions to extract structured data
        if (pageData.additionalDescription) {
          pageData.additionalDescription = pageData.additionalDescription.map(desc => ({
            ...desc,
            ...parseDescriptionContent(desc.subDescription1)
          }));
        }
        
        setPage(pageData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, initialPage]);

  // Parse initial page data if provided
  useEffect(() => {
    if (initialPage && initialPage.additionalDescription) {
      const parsedPage = {
        ...initialPage,
        additionalDescription: initialPage.additionalDescription.map(desc => ({
          ...desc,
          ...parseDescriptionContent(desc.subDescription1)
        }))
      };
      setPage(parsedPage);
    }
  }, [initialPage]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!page) return <p className="text-center py-10">Page not found</p>;

  if (page.isFeatured === false) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold text-red-900 mb-4">
          Page Not Available
        </h1>
        <p className="text-gray-700 text-lg max-w-xl mx-auto">
          This page is currently inactive or under maintenance. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16'>
        {/* Main Heading */}
    {/* Main Heading */}
<div className="text-center sm:text-start mb-8 sm:mb-12">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight px-2">
    {page.onPageTitle}{' '}
    {/* <span className="text-red-900 border-b-2 border-red-900 pb-1">{page.category}</span> */}
  </h1>
</div>

        {/* Introduction */}
        {page.onPageDescription && (
          <div className="prose prose-base sm:prose-lg max-w-none mb-8 sm:mb-12">
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg px-2">
              {page.onPageDescription}
            </p>
          </div>
        )}

        {/* Dynamic Sections */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Section 1 - Red Background */}
          {page.additionalDescription?.[0] && (
            <section className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    1
                  </span>
                  <span className="leading-tight">{page.additionalDescription[0].subTitle1}</span>
                </div>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                {page.additionalDescription[0].description}
              </p>
            </section>
          )}

          {/* Section 2 - With Highlight in Red Box */}
          {page.additionalDescription?.[1] && (
            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    2
                  </span>
                  <span className="leading-tight">{page.additionalDescription[1].subTitle1}</span>
                </div>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                {page.additionalDescription[1].description}
              </p>
              
              {/* Highlight in Red Box */}
              {page.additionalDescription[1].highlight && (
                <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl">
                  <p className="font-semibold text-base sm:text-lg italic leading-relaxed">
                    {page.additionalDescription[1].highlight}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Section 3 - Gray Background */}
          {page.additionalDescription?.[2] && (
            <section className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    3
                  </span>
                  <span className="leading-tight">{page.additionalDescription[2].subTitle1}</span>
                </div>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                {page.additionalDescription[2].description}
              </p>
            </section>
          )}

        {/* Section 4 - Points in Pink Boxes */}
{page.additionalDescription?.[3] && (
  <section>
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
      <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
        <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
          4
        </span>
        <span className="leading-tight">{page.additionalDescription[3].subTitle1}</span>
      </div>
    </h2>
    
    {/* First 2 sentences from description */}
    {page.additionalDescription[3].description && (
      <div className="mb-4 sm:mb-6">
        {(() => {
          const sentences = page.additionalDescription[3].description.split('. ').filter(s => s.trim() !== '');
          const firstTwoSentences = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
          const remainingSentences = sentences.slice(2).join('. ') + (sentences.length > 2 ? '.' : '');
          
          return (
            <>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4">
                {firstTwoSentences}
              </p>
              
              {/* Points as Pink Boxes */}
              {page.additionalDescription[3].points && page.additionalDescription[3].points.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  {page.additionalDescription[3].points.map((point, index) => (
                    <div
                      key={index}
                      className="bg-red-100 text-red-900 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-center font-semibold text-sm sm:text-base"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              )}

              {/* Remaining sentences after points */}
              {remainingSentences && (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {remainingSentences}
                </p>
              )}
            </>
          );
        })()}
      </div>
    )}

    {/* Additional description after points */}
    {page.additionalDescription[3].keyValues && page.additionalDescription[3].keyValues.length > 0 && (
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
        {page.additionalDescription[3].keyValues.map(kv => kv.value).join(' ')}
      </p>
    )}
  </section>
)}
          {/* Section 5 - Gradient Red Background */}
          {page.additionalDescription?.[4] && (
            <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    5
                  </span>
                  <span className="leading-tight">{page.additionalDescription[4].subTitle1}</span>
                </div>
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                {page.additionalDescription[4].description}
              </p>
            </section>
          )}

          {/* Section 6 - Key-Values as Cards */}
          {page.additionalDescription?.[5] && (
            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    6
                  </span>
                  <span className="leading-tight">{page.additionalDescription[5].subTitle1}</span>
                </div>
              </h2>

              {/* Main Description */}
              {page.additionalDescription[5].description && (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
                  {page.additionalDescription[5].description}
                </p>
              )}

              {/* Key-Values as Cards */}
              {page.additionalDescription[5].keyValues && page.additionalDescription[5].keyValues.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {page.additionalDescription[5].keyValues.map((kv, index) => (
                    <div
                      key={index}
                      className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">
                        {kv.key}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {kv.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}



              {/* Points as Cards (fallback) */}
              {(!page.additionalDescription[5].keyValues || page.additionalDescription[5].keyValues.length === 0) && 
               page.additionalDescription[5].points && page.additionalDescription[5].points.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {page.additionalDescription[5].points.map((point, index) => (
                    <div
                      key={index}
                      className="bg-white border border-red-200 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <h3 className="font-bold text-red-900 text-base sm:text-lg mb-2 sm:mb-3">
                        {point}
                      </h3>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Section 7 - Dark Background */}
          {page.additionalDescription?.[6] && (
            <section className="bg-gray-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3 sm:gap-0">
                  <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold sm:mr-4 flex-shrink-0">
                    7
                  </span>
                  <span className="leading-tight">{page.additionalDescription[6].subTitle1}</span>
                </div>
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                {page.additionalDescription[6].description}
              </p>
            </section>
          )}

          
        {/* Conclusion Section - Using shortDescription */}
        {page.shortDescription && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-red-900 to-red-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              Conclusion
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {page.shortDescription}
            </p>
          </div>
        )}

          {/* FAQ Section */}
          {page.faq?.length > 0 && (
            <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-900 mb-4 sm:mb-6">
    Frequently Asked Questions
  </h2>
  <div className="space-y-4 sm:space-y-6">
    {page.faq.map((item, idx) => (
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
                <span className="text-green-700 font-bold text-xs">A</span>
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
        {page.bottomSection && (
          <div className="text-center mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
              {page.bottomSection.title}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {page.bottomSection.description}
            </p>
          </div>
        )}
    </div>
  );
};

export default ContentSection;