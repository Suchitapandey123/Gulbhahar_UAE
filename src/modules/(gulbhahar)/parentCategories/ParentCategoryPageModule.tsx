import { ParentCategoryPageData } from "@/types/page.types";
import { Product } from "../products/types";
import ParentCategoryContentSection from "./content/ParentCategoryContentSection";
import ParentCategoryCollectionClient from "./ParentCategoryCollectionClient";

interface CategoryPageModuleProps {
  parentCategory: string;
  pageData: ParentCategoryPageData | null;
  initialProducts: Product[];
  initialCursor: string | null;
}

export default function ParentCategoryPageModule({
  parentCategory,
  pageData,
  initialProducts,
  initialCursor,
}: CategoryPageModuleProps) {
  return (
    <>
      <div className="max-w-7xl mt-16 pt-2 lg:mt-10 2xl:max-w-[1600px] mx-auto font-raleway">
        <section className="pb-24">
          {initialProducts.length === 0 ? (
            <div className="mt-16 flex items-center justify-center">
              <p className="text-gray-500 font-semibold">No products available at the moment.</p>
            </div>
          ) : (
            <ParentCategoryCollectionClient
              initialProducts={initialProducts}
              initialCursor={initialCursor}
              parentCategory={parentCategory}
              show={false}
            />
          )}
        </section>

        {pageData && <ParentCategoryContentSection page={pageData} />}
      </div>
    </>
  );
}
