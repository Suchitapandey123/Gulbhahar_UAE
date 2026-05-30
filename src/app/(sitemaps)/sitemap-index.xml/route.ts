import { NextResponse } from "next/server";

const BASE_URL = "https://www.gulbhahar.com";

// API that tells total dynamic sitemaps count
const TOTAL_SITEMAPS_API =
  "https://api.gulbhahar.com/api/total-sitmaps";

export async function GET() {
  try {
    // 1️⃣ Static sitemap entry (for static pages, products, and categories)
    const staticSitemap = `
        <sitemap>
          <loc>${BASE_URL}/sitemap/static.xml</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${BASE_URL}/sitemap/products.xml</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </sitemap>`;

    // 2️⃣ Fetch total number of dynamic sitemaps from API
    const totalRes = await fetch(TOTAL_SITEMAPS_API, {
    });
    if (!totalRes.ok) throw new Error("Failed to fetch total sitemap count");
    const { total } = await totalRes.json();

    // 3️⃣ Generate dynamic sitemap entries
    const dynamicSitemaps = Array.from(
      { length: total },
      (_, i) => `
        <sitemap>
          <loc>${BASE_URL}/sitemap/${i + 1}.xml</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </sitemap>`
    ).join("");

    // 4️⃣ Combine static and dynamic sitemaps
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticSitemap}
        ${dynamicSitemaps}
      </sitemapindex>`;

    return new NextResponse(sitemapIndex.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
   

    // Fallback sitemap index with at least the static sitemap
    const fallbackIndex = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${BASE_URL}/sitemap/static.xml</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${BASE_URL}/sitemap/products.xml</loc>
          <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        </sitemap>
      </sitemapindex>`;

    return new NextResponse(fallbackIndex.trim(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }
}
