import { NextResponse } from "next/server";
import productApi from "@/app/api/v0/product-service";


const BASE_URL = "https://www.gulbhahar.com";

export async function GET() {
  try {
    const staticPages = [
      // Home page - highest priority
      {
        url: BASE_URL,
        lastModified: new Date(),
        priority: 1,
        changeFrequency: "daily",
      },

      // Main public pages - high priority
      {
        url: `${BASE_URL}/about`,
        lastModified: new Date(),
        priority: 0.8,
        changeFrequency: "monthly",
      },
      {
        url: `${BASE_URL}/collections`,
        lastModified: new Date(),
        priority: 0.9,
        changeFrequency: "weekly",
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: new Date(),
        priority: 0.7,
        changeFrequency: "monthly",
      },
      {
        url: `${BASE_URL}/heritage-culture`,
        lastModified: new Date(),
        priority: 0.7,
        changeFrequency: "monthly",
      },

      // Authentication pages - lower priority (not indexed for SEO)
      {
        url: `${BASE_URL}/login`,
        lastModified: new Date(),
        priority: 0.3,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/signup`,
        lastModified: new Date(),
        priority: 0.3,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/forgot-password`,
        lastModified: new Date(),
        priority: 0.2,
        changeFrequency: "yearly",
      },

      // Legal/Policy pages - medium-low priority
      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date(),
        priority: 0.4,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/terms-condition`,
        lastModified: new Date(),
        priority: 0.4,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/cookies-policy`,
        lastModified: new Date(),
        priority: 0.4,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/refund-policy`,
        lastModified: new Date(),
        priority: 0.4,
        changeFrequency: "yearly",
      },
      {
        url: `${BASE_URL}/delivery-shipping-policy`,
        lastModified: new Date(),
        priority: 0.4,
        changeFrequency: "yearly",
      },

      // Support pages
      {
        url: `${BASE_URL}/faq`,
        lastModified: new Date(),
        priority: 0.6,
        changeFrequency: "monthly",
      },
    ];

    // Fetch products from API
    const products = await productApi.getAllProduct();

    const productPages =
      products?.map((product) => ({
        url: `${BASE_URL}/products/${product.productId}`,
        lastModified: new Date(
          product.updatedAt || product.createdAt || new Date()
        ),
        changeFrequency: "weekly",
        priority: 0.7,
      })) || [];

    // Fetch category pages (from sitemapData)
    // const categoryPages =
    //   sitemapData?.map((category) => ({
    //     url: `${BASE_URL}/collections/${category.slug}`,
    //     lastModified: new Date(),
    //     changeFrequency: "weekly",
    //     priority: 0.6,
    //   })) || [];

    // Combine all pages
    const allPages = [...staticPages, ...productPages ];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency || "monthly"}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating static sitemap:", error);

    // Fallback minimal sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/collections</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

    return new NextResponse(fallbackSitemap.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }
}
