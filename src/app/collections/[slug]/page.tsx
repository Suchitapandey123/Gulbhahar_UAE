import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache, Suspense } from "react";
import { getCategoryPageBySlug, CategoryPageData } from "./getContent";
import { pageService } from "@/services/page/pageService";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import productApi from "@/services/product/productService";
import CategoryCollection from "@/modules/(gulbhahar)/categoryPages/CategoryCollection";
import CategoryCollection_MatchingProducts from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.MatchingProducts";
import { CategoryCollection_ParentCategoryProducts } from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.ParentCategoryProducts";
import FAQSchema from "@/shared-components/seo/FAQSchema";
import QuickLinks from "../components/QuickLinks";
import ExpandableIntro from "./ExpandableIntro";

export const revalidate = 604800;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

const validateSlugCached = cache(async (slug: string) => {
  try {
    return await pageService.validateSlug(slug);
  } catch {
    return null;
  }
});

const getPageCached = cache(async (slug: string) => {
  return getCategoryPageBySlug(slug);
});

const mdComponents = {
  a: ({ children, href, ...props }: any) => (
    <Link
      href={href || "#"}
      className="text-red-800 underline decoration-red-300 underline-offset-2 hover:text-red-600 hover:decoration-red-500 transition-colors"
      {...props}
    >
      {children}
    </Link>
  ),
};

const Md = ({ children, className }: { children: string; className?: string }) => (
  <div className={className}>
    <ReactMarkdown components={mdComponents}>{children}</ReactMarkdown>
  </div>
);

export async function generateMetadata({ params: rawParams }: Props): Promise<Metadata> {
  const { slug } = await rawParams;

  const [validateRes, result] = await Promise.all([
    validateSlugCached(slug),
    getPageCached(slug),
  ]);

  // Old StaticPage redirect
  if (validateRes?.success && validateRes.redirectTo) {
    return {
      alternates: { canonical: `https://www.gulbhahar.com/collections/${validateRes.redirectTo}` },
      robots: { index: false },
    };
  }

  if (!result || !result.success || !result.data) return { title: "Not Found" };

  const page = result.data;
  const title = page.seo?.metaTitle || page.onPageTitle;
  const description = page.seo?.metaDescription || page.OnPageIntro?.slice(0, 160) || page.onPageTitle;

  return {
    title,
    description,
    keywords: page.seo?.keywords || [slug, "Gulbhahar"],
    alternates: {
      canonical: `https://www.gulbhahar.com/collections/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://www.gulbhahar.com/collections/${slug}`,
      siteName: "Gulbhahar",
      locale: "en_US",
      images: [{ url: "https://www.gulbhahar.com/gulbhaharlogoo.jpeg", width: 1200, height: 630, alt: "Gulbhahar" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.gulbhahar.com/gulbhaharlogoo.jpeg"],
    },
  };
}

export default async function TestCollectionPage({ params: rawParams }: Props) {
  const { slug } = await rawParams;

  // Validate via old StaticPage API — handles redirects for old pages
  const validateRes = await validateSlugCached(slug);
  if (!validateRes?.success) notFound();

  if (validateRes.redirectTo) {
    permanentRedirect(`/collections/${validateRes.redirectTo}`);
  }

  // Fetch from new CategoryPages API
  const result = await getPageCached(slug);
  if (!result || !result.success || !result.data) notFound();

  const page = result.data;
  const parentCategory = page.parentCategory?.[0] || page.category || slug;

  const products = await productApi.getProductsByCategory(slug);

  const parentCategoryProducts =
    products.length === 0
      ? await productApi.getProductsByParentCategory(parentCategory)
      : [];

  const sectionStyles = [
    { bg: "bg-red-50", border: "border-red-100", badge: "bg-red-900", heading: "text-red-900" },
    { bg: "bg-white", border: "border-gray-200 shadow-sm", badge: "bg-gray-800", heading: "text-gray-900" },
    { bg: "bg-gray-50", border: "border-gray-100", badge: "bg-gray-700", heading: "text-gray-900" },
    { bg: "bg-gradient-to-br from-red-50 to-rose-50", border: "border-red-100", badge: "bg-red-800", heading: "text-red-900" },
    { bg: "bg-white", border: "border-red-200 shadow-sm", badge: "bg-red-900", heading: "text-gray-900" },
    { bg: "bg-gradient-to-br from-gray-50 to-gray-100", border: "border-gray-200", badge: "bg-gray-800", heading: "text-gray-900" },
  ];

  return (
    <div className="mt-24 max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">

      {/* Title */}
      <div className="text- sm:text-start mb-2 sm:mb-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          {page.onPageTitle}
        </h1>
      </div>

      {/* Intro */}
      {page.OnPageIntro && (
        <div className="prose prose-base sm:prose-lg max-w-none">
          <ExpandableIntro>
            <Md className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {page.OnPageIntro}
            </Md>
          </ExpandableIntro>
        </div>
      )}

      {/* Products */}
      {page.faqs?.length > 0 && <FAQSchema faqs={page.faqs} />}
      {products.length > 0 && <CategoryCollection products={products} />}
      {products.length === 0 && (
        <CategoryCollection_ParentCategoryProducts
          parentCategory={parentCategory}
          slug={slug}
          products={parentCategoryProducts}
        />
      )}
      <Suspense fallback={null}>
        <CategoryCollection_MatchingProducts parentCategory={parentCategory} />
      </Suspense>

      {/* Content Sections */}
      {page.sections?.length > 0 && (
        <div className="space-y-8 sm:space-y-12 mb-10 sm:mb-14">
          {page.sections.map((section, idx) => {
            const style = sectionStyles[idx % sectionStyles.length];
            return (
              <section
                key={idx}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 border ${style.bg} ${style.border}`}
              >
                <h2 className={`text-lg sm:text-2xl md:text-3xl font-bold ${style.heading} mb-2 sm:mb-6`}>
                  {section.heading}
                </h2>
                <Md className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {section.paragraphs}
                </Md>
              </section>
            );
          })}
        </div>
      )}

      {/* FAQ Section */}
      {page.faqs?.length > 0 && (
        <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 mb-10 sm:mb-14">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-red-900 mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {page.faqs.map((faq, idx) => (
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
                      {faq.question}
                    </h3>
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0">
                        <span className="text-green-700 font-bold text-xs">A</span>
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick Links */}
      <Suspense fallback={null}>
        <QuickLinks parentCategory={parentCategory} currentSlug={slug} />
      </Suspense>
    </div>
  );
}
