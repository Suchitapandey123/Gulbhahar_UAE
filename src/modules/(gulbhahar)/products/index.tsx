import { Breadcrumbs } from "./components/Breadcrumbs";
import { ProductView } from "./components/ProductView";
import { SimilarProductsSection } from "./components/SimilarProductsSection";
import { Product, SimilarProduct } from "./types";

interface ProductModuleProps {
  product: Product;
  similarProducts: SimilarProduct[];
}

const CUSTOM_RED = "hsl(359.39deg 63.87% 30.39%)";

export default function ProductModule({
  product,
  similarProducts,
}: ProductModuleProps) {
  const categoryName = Array.isArray(product.category)
    ? product.category[0]
    : product.category;

  const cacheVersion = product.updatedAt ? `?v=${product.updatedAt}` : "";
  const firstColorImages = product.images?.[0] || [];
  const imagesToPreload = firstColorImages
    .slice(0, 3)
    .map((img) => (img.includes("?") ? img : `${img}${cacheVersion}`));

  return (
    <>
      {/* Preload ONLY LCP-critical images */}
      {imagesToPreload.map((img, idx) => (
        <link
          key={img}
          rel="preload"
          as="image"
          href={img}
          fetchPriority={idx === 0 ? "high" : "low"}
        />
      ))}

      <div className="bg-white py-4 mt-10 sm:mt-0 px-2 sm:py-3 sm:px-3 lg:py-4 lg:px-4 font-raleway">
        <div className="max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">
          <Breadcrumbs
            category={categoryName}
            productName={product.name || ""}
            customRed={CUSTOM_RED}
          />

          <ProductView product={product} customRed={CUSTOM_RED} />

          <SimilarProductsSection
            similarProducts={similarProducts}
            customRed={CUSTOM_RED}
          />
        </div>
      </div>
    </>
  );
}
