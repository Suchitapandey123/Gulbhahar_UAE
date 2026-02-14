import DummyProductCard from "@/app/collections/components/DummyProductCard";

interface CategoryCollectionDummyProductsProps {
  parentCategory: string;
  slug?: string;
  viewMode?: "grid" | "list";
}

const CategoryCollection_DummyProducts = ({
  parentCategory,
  slug,
  viewMode = "grid",
}: CategoryCollectionDummyProductsProps) => {
  return (
    <div className="w-full">
      <div
        className={`${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" : "flex flex-col gap-4"}`}
      >
        {[1, 2, 3, 4].map((_, index) => (
          <DummyProductCard
            key={`dummy-${index}`}
            parentCategory={parentCategory as any}
            slug={slug as any}
            viewMode={viewMode}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCollection_DummyProducts;
