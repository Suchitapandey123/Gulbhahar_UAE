// @ts-nocheck
import { preOrderService } from "@/services/preOrder/preOrderService";
import { PreOrderProductCard } from "../common/PreOrderProductCard";
import CategoryCollection_DummyProducts from "./CategoryCollection.DummyProducts";

interface CategoryCollectionPreOrderProductsProps {
  parentCategory: string;
  slug?: string;
  viewMode?: "grid" | "list";
}

const CategoryCollectionPreOrderProducts = async ({
  parentCategory,
  slug,
  viewMode = "grid",
}: CategoryCollectionPreOrderProductsProps) => {
  let preOrderProducts = await preOrderService.getPreOrderProducts(
    parentCategory,
    slug,
  );

  if (!preOrderProducts?.products?.length) {
    preOrderProducts =
      await preOrderService.getPreOrderProducts(parentCategory);
  }

  if (!preOrderProducts?.products?.length) {
    return (
      <CategoryCollection_DummyProducts
        parentCategory={parentCategory}
        slug={slug}
      />
    );
  }

  const customRed = "#800000";
  return (
    <div className="w-full">
      <div
        className={`${viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" : "flex flex-col gap-4"}`}
      >
        {preOrderProducts.products.slice(0, 4).map((product, index) => (
          <PreOrderProductCard
            key={product.productId || index}
            item={product}
            customRed={customRed}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCollectionPreOrderProducts;
