import Script from "next/script";

export type ProductSchemaProps = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  brand: string;
  sku: string;
  availability: "InStock" | "OutOfStock" | "PreOrder" | "Discontinued";
  rating: number;
  reviewCount: number;
};

export default function ProductSchema({ product }: { product: ProductSchemaProps }) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <Script
      id={`product-schema-${product.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="beforeInteractive"
    />
  );
}
