import productApi from "@/app/api/v0/product-service";
import CategoryCollection from "@/modules/(gulbhahar)/categoryPages/CategoryCollection";
import CategoryCollection_DummyProducts from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.DummyProducts";
import CategoryCollection_MatchingProducts from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.MatchingProducts";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { PageData, pageService } from "../../api/page-service/pageService";
import QuickLinks from "../components/QuickLinks";
import QuickTag from "../components/QuickTag";
import ContentSection from "./components/ContentSection";
import { CategoryCollection_ParentCategoryProducts } from "@/modules/(gulbhahar)/categoryPages/CategoryCollection.ParentCategoryProducts";

// ISR Configuration: Revalidate every 7 days (604800 seconds)
export const revalidate = 604800;
export const dynamicParams = true;

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
    // Use cached functions to avoid duplicate API calls
    const validateRes = await validateSlugCached(slug);
    if (!validateRes?.success) {
      return {
        title: "Page Not Found",
        description: "The requested page does not exist.",
      };
    }

    const page = await getPageDataCached(slug);
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
  // console.log(slug)
  if (!slug) redirect("/not-found");

  const pattern = /^P\d{11}$/;
  if (pattern.test(slug)) {
    redirect(`/products/${slug}`);
  }

  // Use cached functions - same request won't be duplicated from generateMetadata
  const validateRes = await validateSlugCached(slug);
  if (!validateRes?.success) redirect("/not-found");

  const page = await getPageDataCached(slug);
  if (!page) redirect("/not-found");
  const parentCategory = page.parentCategory[0];
   const products = await productApi.getProductsByCategory(slug);
  return (
    <div className="mt-24 px-2 max-w-7xl 2xl:max-w-[1600px] mx-auto">
      {products.length > 0 && (
        <CategoryCollection products={products} />
      )}
      {products.length === 0 && (
        <>
         <CategoryCollection_DummyProducts
          parentCategory={parentCategory}
          slug={slug}
        />
        <CategoryCollection_ParentCategoryProducts parentCategory={parentCategory} />
        </>
      )}
      <CategoryCollection_MatchingProducts parentCategory={parentCategory}  />
      <ContentSection page={page} />
      <QuickLinks parentCategory={parentCategory} currentSlug={slug} />
      <QuickTag popularTags={page?.keywords || []} />
    </div>
  );
}
