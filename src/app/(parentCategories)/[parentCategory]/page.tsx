import { parentCategoryPageService } from "@/services/parentCategoryPage/parentCategoryPageService";
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

  const response = await getParentCategoryPageCached(parentCategory)
  const page = response.data
  
  return {
    title: page.metaTitle ||  `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
    description: page.metaDescription || `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
    openGraph: {
       title: page.metaTitle ||  `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
    description: page.metaDescription || `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
    },
    alternates :{
      canonical : `https://www.gulbhahar.com/${parentCategory}`
    }
  };
}

const page = async ({ params }: PageProps) => {
  const { parentCategory } = await params;

  if (!ALLOWED_PARENT_CATEGORIES.includes(parentCategory)) {
    notFound();
  }

  return (
    <main className="px-2 md:px-0">
      <ParentCategoryPageModule parentCategory={parentCategory} />
    </main>
  );
};

export default page;
