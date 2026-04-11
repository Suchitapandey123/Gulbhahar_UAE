import { NextResponse } from "next/server";

const TOTAL_SITEMAPS_API =
  "https://api.gulbhahar.com/api/total-sitmaps";   // Endpoint to get total number of sitemaps
  "http://localhost:9080/api/total-sitmaps";   // Endpoint to get total number of sitemaps
 const SITEMAPS_API =
  "https://api.gulbhahar.com/api/get-sitemap";               // Endpoint to get sitemap data
  // "http://localhost:9080/api/get-sitemap";               // Endpoint to get sitemap data

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sitemapId: string }> }
) {
  try {
    // 1️⃣ Await params if it's an async object (or resolve it as needed)
    const resolvedParams = await params;

    // Extract the sitemapId from the resolved params
    const sitemapId = parseInt(resolvedParams.sitemapId);

    // 2️⃣ Fetch total sitemap count
    const totalRes = await fetch(TOTAL_SITEMAPS_API, { cache: "no-store" });
    if (!totalRes.ok) throw new Error("Failed to fetch total sitemaps");
    const { total } = await totalRes.json();

    // 3️⃣ Validate sitemapId
    if (isNaN(sitemapId) || sitemapId < 0 || sitemapId > total) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const apiRes = await fetch(`${SITEMAPS_API}?sitemapNumber=${sitemapId}`, {
      cache: "no-store",
    });

    if (!apiRes.ok) throw new Error("Failed to fetch sitemap data");

    const xml = await apiRes.text();

    // 4️⃣ Return XML directly
    return new NextResponse(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
