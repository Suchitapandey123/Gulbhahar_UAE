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
  const meta = categoryMetadata[
    parentCategory as keyof typeof categoryMetadata
  ] || {
    title: `${parentCategory} | Gulbhahar Luxury Ethnic Wear`,
    description: `Explore our exquisite collection of ${parentCategory}. Handcrafted luxury for every occasion.`,
  };
  
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/images/luxury-hero.png",
          width: 1200,
          height: 630,
          alt: parentCategory,
        },
      ],
    },
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
