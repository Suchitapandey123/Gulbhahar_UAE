import { Product, SimilarProduct } from "../types";
import { SimilarProductCard } from "./SimilarProductCard";

interface SimilarProductsSectionProps {
  similarProducts: SimilarProduct;
  customRed: string;
}

function buildJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Similar Products",
    numberOfItems: products.length,
    itemListElement: products.map((item, index) => {
      const image = Array.isArray(item.images?.[0])
        ? (item.images[0] as string[])[0]
        : item.images?.[0];

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.name || "Product",
          url: `https://www.gulbhahar.com/products/${item.productId}`,
          ...(image ? { image } : {}),
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        },
      };
    }),
  };
}

export const SimilarProductsSection = ({
  similarProducts,
  customRed,
}: SimilarProductsSectionProps) => {
  if (!similarProducts || similarProducts.products.length === 0) return null;

  const jsonLd = buildJsonLd(similarProducts.products);

  return (
    <section className="mt-4 lg:mt-4" aria-label="Similar Products">
      {/* JSON-LD for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center mb-10 lg:mb-14">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
          Similar Products
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-red-800" />
          <span className="h-2 w-2 rounded-full bg-red-800" />
          <span className="h-[1px] w-12 bg-red-800" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
        {similarProducts.products.map((item) => (
          <SimilarProductCard
            key={item.productId}
            item={item}
            customRed={customRed}
          />
        ))}
      </div>
    </section>
  );
};
