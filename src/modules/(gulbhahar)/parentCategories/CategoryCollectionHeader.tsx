interface CategoryCollectionHeaderProps {
  parentCategory: string;
}

export default function CategoryCollectionHeader({
  parentCategory,
}: CategoryCollectionHeaderProps) {
  return (
    <div className="px-4 md:px-8 mb-12 mt-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-2xl font-serif text-gray-900 uppercase tracking-widest px-2">
            Explore{" "}
            <span className="italic text-red-900 lowercase">
              {parentCategory}
            </span>
          </h3>
          <div className="h-px bg-gray-100 flex-1" />
        </div>
      </div>
    </div>
  );
}
