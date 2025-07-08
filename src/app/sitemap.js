// app/sitemap.js
import productApi from "./api/v0/product-service";

export default async function sitemap() {
  const baseUrl = 'https://www.gulbhahar.com';
  
  try {
    const staticPages = [
      // Home page - highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      
      // Main public pages - high priority
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/culture`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
      
      // Authentication pages - lower priority (not indexed for SEO)
      {
        url: `${baseUrl}/login`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/signup`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/forgot-password`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.2,
      },
      
      // Legal/Policy pages - medium-low priority
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: 'quarterly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/terms-condition`,
        lastModified: new Date(),
        changeFrequency: 'quarterly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/cookies-policy`,
        lastModified: new Date(),
        changeFrequency: 'quarterly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/refund-policy`,
        lastModified: new Date(),
        changeFrequency: 'quarterly',
        priority: 0.4,
      },
      {
        url: `${baseUrl}/delivery-shipping-policy`,
        lastModified: new Date(),
        changeFrequency: 'quarterly',
        priority: 0.4,
      },
      
      // Support pages
      {
        url: `${baseUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ];

    // Fetch dynamic content
    const products = await productApi.getAllProduct();
    // console.log('Fetched products:', products);
    // Product pages
    const productPages = products?.map((product) => ({
      url: `${baseUrl}/collections/${product.productId}`,
      lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.7,
    })) || [];

    return [...staticPages, ...productPages];
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback static sitemap
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      },
    ];
  }
}