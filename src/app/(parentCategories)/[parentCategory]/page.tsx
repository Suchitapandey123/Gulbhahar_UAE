import { parentCategoryPageService } from "@/services/parentCategoryPage/parentCategoryPageService";
import productApi from "@/services/product/productService";
import ParentCategoryPageModule from "@/modules/(gulbhahar)/parentCategories/ParentCategoryPageModule";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getParentCategoryPageCached = cache(
  async (slug: string) => parentCategoryPageService.getParentCategoryPageBySlug(slug)
);

interface PageProps {
  params: Promise<{ parentCategory: string }>;
}

export const revalidate = 3600;

const ALLOWED_PARENT_CATEGORIES = ['suit', 'saree', 'lehenga', 'bags', 'jewellery', 'juttis'];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentCategory } = await params;

  if (!ALLOWED_PARENT_CATEGORIES.includes(parentCategory)) {
    notFound();
  }

  const fallback: Metadata = {
    title: `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
    description: `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
    openGraph: {
      title: `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
      description: `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
    },
    alternates: {
      canonical: `https://www.gulbhahar.com/${parentCategory}`,
    },
  };

  try {
    const response = await getParentCategoryPageCached(parentCategory);
    const page = response.data;
    if (!page) return fallback;
    return {
      title: page.metaTitle || fallback.title,
      description: page.metaDescription || fallback.description,
      openGraph: {
        title: page.metaTitle || fallback.title as string,
        description: page.metaDescription || fallback.description || undefined,
      },
      alternates: fallback.alternates,
    };
  } catch {
    return fallback;
  }
}

const page = async ({ params }: PageProps) => {
  const { parentCategory } = await params;

  if (!ALLOWED_PARENT_CATEGORIES.includes(parentCategory)) {
    notFound();
  }

  // Fetch page data + products in parallel — no skeleton needed
  const [pageResponse, { products, nextCursor }] = await Promise.all([
    getParentCategoryPageCached(parentCategory).catch(() => ({ data: null })),
    productApi.getProductsByParentCategoryPage(parentCategory, undefined, 8).catch(() => ({ products: [], nextCursor: null })),
  ]);


  return (
    <main className="px-2 pt-4 md:px-0">
      <ParentCategoryPageModule
        parentCategory={parentCategory}
        pageData={pageResponse?.data ?? null}
        initialProducts={products}
        initialCursor={nextCursor}
      />
    </main>
  );
};

export default page;
