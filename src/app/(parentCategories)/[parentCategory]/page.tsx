import { parentCategoryPageService } from "@/app/api/page-service/parentCategoryPageService";
import categoryMetadata from "@/app/data/categoryMetadata.json";
import ParentCategoryPageModule from "@/modules/(gulbhahar)/parentCategories/ParentCategoryPageModule";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ parentCategory: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { parentCategory } = await params;
  const response = await parentCategoryPageService.getParentCategoryPageBySlug(parentCategory)
  const page = response.data


  const meta = categoryMetadata[
    parentCategory as keyof typeof categoryMetadata
  ] || {
    title: `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
    description: `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
  };
  
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


  return (
    <main className="px-2 md:px-0">
      <ParentCategoryPageModule parentCategory={parentCategory} />
    </main>
  );
};

export default page;
