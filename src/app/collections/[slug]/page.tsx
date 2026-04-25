// @ts-nocheck
import productApi from "@/services/product/productService";
import CategoryCollection from "@/modules/(gulbhahar)/categoryPages/CategoryCollection";
import CategoryCollection_MatchingProducts from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.MatchingProducts";
import { CategoryCollection_ParentCategoryProducts } from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.ParentCategoryProducts";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache, Suspense } from "react";
import { pageService } from "@/services/page/pageService";
import { PageData } from "@/types/page.types";
import QuickLinks from "../components/QuickLinks";
import QuickTag from "../components/QuickTag";
import ContentSection from "./components/ContentSection";
import FAQSchema from "@/shared-components/seo/FAQSchema";

export const revalidate = 3600; // 1 hour — matches fetch revalidate in productService
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const res = await pageService.getAllPages(1, 500) as { data?: { slug: string }[]; pages?: { slug: string }[] };
    const pages = res?.data || res?.pages || [];
    return pages.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

// Cache API calls to prevent duplicates between generateMetadata and page component
const validateSlugCached = cache(async (slug: string) => {
  try {
    return await pageService.validateSlug(slug);
  } catch (error) {
    console.error("Error validating slug:", error);
    return null;
  }
});


const getPageDataCached = cache(
  async (slug: string): Promise<PageData | null> => {
    try {
      const res = await pageService.getPageBySlug(slug);
      return res?.data || res?.page || null;
    } catch (error) {
      console.error("Error fetching page:", error);
      return null;
    }
  },
);



export async function generateMetadata({
  params: rawParams,
}: Props): Promise<Metadata> {
  const params = await rawParams;
  const slug = params?.slug;

  if (!slug) {
    return {
      title: "Invalid Page",
      description: "No slug provided",
    };
  }

  // Product Slug Pattern
  const pattern = /^P\d{11}$/;
  if (pattern.test(slug)) {
    return {
      title: `Product ${slug} | Gulbhahar`,
      description: `Explore premium handcrafted product ${slug} at Gulbhahar.`,
      keywords: ["product", slug, "Gulbhahar"],
      alternates: {
        canonical: `https://www.gulbhahar.com/collections/${slug}`,
      },
    };
  }

  try {
    // Run both in parallel — independent calls
    const [validateRes, page] = await Promise.all([
      validateSlugCached(slug),
      getPageDataCached(slug),
    ]);

    if (!validateRes?.success) {
      return {
        title: "Page Not Found",
        description: "The requested page does not exist.",
      };
    }
    if (!page) {
      return {
        title: "Page Not Found",
        description: "Content not available.",
      };
    }

    const title = page.metaTitle || `${slug} | Gulbhahar`;
    const description =
      page.metaDescription ||
      `Explore curated collections of ${slug} at Gulbhahar.`;

    return {
      title,
      description,
      keywords: page.keywords || [slug, "Gulbhahar", "ethnic wear"],
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
  } catch (err) {
    return {
      title: "Error",
      description: "Something went wrong",
    };
  }
}

export default async function Page({ params: rawParams }: Props) {
  const params = await rawParams;
  const slug = params?.slug;
  
  if (!slug) notFound();

  const pattern = /^P\d{11}$/;
  if (pattern.test(slug)) {
    redirect(`/products/${slug}`);
  }

  // Run validate + pageData + products all in parallel — products only needs slug
  const [validateRes, page, products] = await Promise.all([
    validateSlugCached(slug),
    getPageDataCached(slug),
    productApi.getProductsByCategory(slug),
  ]);

  if (!validateRes?.success) notFound();
  if (!page || page.isFeatured === false) notFound();

  const parentCategory = page.parentCategory?.[0] || page.category || slug;

  // Only fetch parent category products if the main slug returned nothing
  const parentCategoryProducts =
    products.length === 0
      ? await productApi.getProductsByParentCategory(parentCategory)
      : [];

  // console.log("=== additionalDescription ===");
  // console.log(JSON.stringify(page?.additionalDescription, null, 2));
  // console.log("============================");

  // console.log(`=== PRODUCTS for [${slug}] (${products.length} items) ===`);
  // console.log(JSON.stringify(products, null, 2));
  // console.log("============================");

  return (
    <div className="mt-24 px-2 max-w-7xl 2xl:max-w-[1600px] mx-auto">
      {page.faq && page.faq.length > 0 && <FAQSchema faqs={page.faq} />}
      {products.length > 0 && <CategoryCollection products={products} />}
      {products.length === 0 && (
        <CategoryCollection_ParentCategoryProducts
          parentCategory={parentCategory}
          slug={slug}
          products={parentCategoryProducts}
        />
      )}
      <CategoryCollection_MatchingProducts parentCategory={parentCategory} />
      <ContentSection page={page} />
      <QuickLinks parentCategory={parentCategory} currentSlug={slug} />
      <QuickTag popularTags={page?.keywords || []} />
    </div>
  );
}
