import productApi from "@/app/api/v0/product-service";
import JuttisCollectionClient from "./Juttis.Collection.Client";

export default async function JuttisCollection() {
  // Fetch products on the server
  const products = await productApi.getProductsByCategory("juttis");

  if (!products || products.length === 0) {
    return (
      <div className="mt-16 lg:mt-24 pt-4 flex flex-col items-center justify-center min-h-[40vh]">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Our Collection
        </h1>
        <p className="text-gray-500">
          No products found at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-2 lg:mt-20">
      <div className="max-w-[1600px] mx-auto px-2 lg:px-4">
        {/* Client Component for Filtering and Grid */}
        <JuttisCollectionClient initialProducts={products} />
      </div>
    </div>
  );
}
