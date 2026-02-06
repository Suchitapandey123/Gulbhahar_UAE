import { parentCategoryPageService } from "@/app/api/page-service/parentCategoryPageService";
import { Suspense } from "react";
import ParentCategoryContentSection from "./content/ParentCategoryContentSection";
import ParentCategoryCollection from "./ParentCategoryCollection";

interface CategoryPageModuleProps {
  parentCategory: string;
}

// Loading skeleton for the collection section
function CollectionSkeleton() {
  return (
    <div className="mt-16 pt-2 lg:mt-10">
      <div className="max-w-[1600px] mx-auto px-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded" />
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-1 h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ParentCategoryPageModule({
  parentCategory,
}: CategoryPageModuleProps) {
  const response = await parentCategoryPageService.getParentCategoryPageBySlug(parentCategory)
  const page = response.data
  if (!page) return null
  return (
    <>
      {/* Hero Section */}
      {/* <CategoryHero
        title={content.title}
        subtitle={content.subtitle}
        heroImage={heroImage}
      /> */}
      <div className="max-w-7xl  mt-16 pt-2 lg:mt-102xl:max-w-[1600px] mx-auto  font-raleway">
        {/* Product Collection Section */}
        <section className="pb-24">
          {/* <CategoryCollectionHeader parentCategory={parentCategory} /> */}
          <Suspense fallback={<CollectionSkeleton />}>
            <ParentCategoryCollection initialParentCategory={parentCategory} />
          </Suspense>
        </section>

        {/* Content Sections (Story, Features, Testimonials, FAQ, CTA) */}
        <ParentCategoryContentSection
          page={page}
        />
      </div>
    </>
  );
}
