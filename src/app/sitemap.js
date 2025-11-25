// app/sitemap.js
import productApi from "./api/v0/product-service";
import sitemapData from "@/utils/sitemapData.json"

export default async function sitemap() {
  const baseUrl = 'https://www.gulbhahar.com';
  
  try {
    const staticPages = [
      // Home page - highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        priority: 1,
      },
      
      // Main public pages - high priority
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(), 
        priority: 0.8,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        priority: 0.7,
      },
      {
        url: `${baseUrl}/heritage-collection`,
        lastModified: new Date(),
        priority: 0.6,
      },
      
      // Authentication pages - lower priority (not indexed for SEO)
      {
        url: `${baseUrl}/login`,
        lastModified: new Date(),
        priority: 0.3,
      },
      {
        url: `${baseUrl}/signup`,
        lastModified: new Date(),
        priority: 0.3,
      },
      {
        url: `${baseUrl}/forgot-password`,
        lastModified: new Date(),
        priority: 0.2,
      },
      
      // Legal/Policy pages - medium-low priority
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        priority: 0.4,
      },
      {
        url: `${baseUrl}/terms-condition`,
        lastModified: new Date(),
        priority: 0.4,
      },
      {
        url: `${baseUrl}/cookies-policy`,
        lastModified: new Date(),
        priority: 0.4,
      },
      {
        url: `${baseUrl}/refund-policy`,
        lastModified: new Date(),
        priority: 0.4,
      },
      {
        url: `${baseUrl}/delivery-shipping-policy`,
        lastModified: new Date(),
        priority: 0.4,
      },
      
      // Support pages
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        priority: 0.6,
      },
    ];

    const products = await productApi.getAllProduct();

  const productPages = products?.map((product) => ({
    url: `${baseUrl}/products/${product.productId}`,
    lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.7,
  })) || [];

  // fetch category pages (from sitemapData)
  const categoryPages = sitemapData?.map((category) => ({
    url: `${baseUrl}/collections/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  })) || [];

  // final return
  return [...staticPages, ...productPages, ...categoryPages];

}
   catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback static sitemap
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        priority: 0.7,
      },
    ];
  }
}