import categoryContent from "@/app/data/categoryContent.json";
import CategoryHero from "./CategoryHero";
import { CategoryContentSection } from "./content";

interface CategoryPageModuleProps {
  parentCategory: string;
}

// Loading skeleton for the collection section
function CollectionSkeleton() {
  return (
    <div className="mt-20 lg:mt-24 pt-4">
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

export default function CategoryPageModule({
  parentCategory,
}: CategoryPageModuleProps) {
  // Find category content based on slug
  const content =
    categoryContent.collections.find(
      (c) => c.id.toLowerCase() === parentCategory.toLowerCase(),
    ) || categoryContent.collections[1]; // Default to juttis if not found

  // Map category to hero image
  const heroImages: Record<string, string> = {
    juttis: "/images/juttis-hero.png",
    "bridal-juttis": "/images/juttis-hero.png",
    sarees: "/images/sarees-hero.png",
    lehenga: "/images/sarees-hero.png",
    bags: "/images/luxury-hero.webp",
    jewellery: "/images/luxury-hero.png",
  };

  const heroImage =
    heroImages[parentCategory.toLowerCase()] || "/images/luxury-hero.png";

  return (
    <>
    {/* Hero Section */}
      <CategoryHero
        title={content.title}
        subtitle={content.subtitle}
        heroImage={heroImage}
      />
       <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto  border-4 border-red-800 font-raleway">
      {/* Product Collection Section */}
      {/* <section className="pb-24">
        <CategoryCollectionHeader parentCategory={parentCategory} />
        <Suspense fallback={<CollectionSkeleton />}>
          <CategoryCollection initialParentCategory={parentCategory} />
        </Suspense>
      </section> */}

      {/* Content Sections (Story, Features, Testimonials, FAQ, CTA) */}
      <CategoryContentSection categorySlug={parentCategory.toLowerCase()} />
    </div>
    </>
 
  );
}
