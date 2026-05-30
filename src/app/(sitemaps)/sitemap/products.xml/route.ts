import { NextResponse } from "next/server";

const PRODUCTS_SITEMAP_API = "https://api.gulbhahar.com/api/products-sitemap";

export async function GET() {
  try {
    const res = await fetch(PRODUCTS_SITEMAP_API, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products sitemap");

    const xml = await res.text();

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Products sitemap error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
