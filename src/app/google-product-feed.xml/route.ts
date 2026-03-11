import { NextResponse } from "next/server";
import { productService } from "@/services/product/productService";

const BASE_URL = "https://www.gulbhahar.com";
const STORE_NAME = "Gulbhahar";
const BRAND = "Gulbhahar";
const CURRENCY = "INR";

// Loose type to avoid index-signature conflicts from @/types Product
type FeedProduct = Record<string, unknown>;

function str(val: unknown): string {
  return typeof val === "string" ? val : String(val ?? "");
}

function num(val: unknown): number {
  return typeof val === "number" ? val : parseFloat(str(val)) || 0;
}

function escapeXml(val: unknown): string {
  return str(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getImage(product: FeedProduct): string {
  // images can be string[] or string[][]
  const images = product.images;
  if (Array.isArray(images)) {
    const first = images[0];
    if (typeof first === "string") return first;
    if (Array.isArray(first)) return str(first[0]);
  }
  return str(product.image ?? "");
}

function getCategory(product: FeedProduct): string {
  const cat = product.category;
  if (Array.isArray(cat)) return str(cat[0]);
  return str(cat ?? "");
}

function getSeoDescription(product: FeedProduct): string {
  const seo = product.seo as Record<string, unknown> | undefined;
  if (typeof seo?.metaDescription === "string" && seo.metaDescription) return seo.metaDescription;
  const overview = product.overview;
  if (Array.isArray(overview) && typeof overview[0] === "string") return overview[0];
  return str(product.name ?? "");
}

function buildProductItem(product: FeedProduct): string {
  const id        = escapeXml(product.productId ?? product._id ?? product.id ?? "");
  const title     = escapeXml(product.name ?? "");                
  const desc      = escapeXml(getSeoDescription(product));        
  const link      = `${BASE_URL}/products/${id}`;
  const imageLink = getImage(product);
  const salePrice = num(product.price).toFixed(2);              
  const mrp       = product.originalPrice ? num(product.originalPrice).toFixed(2) : null;
  const category  = escapeXml(getCategory(product));
  const material  = escapeXml(product.material ?? "");

  return `
    <item>
      <g:id>${id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${link}</g:link>
      ${imageLink ? `<g:image_link>${escapeXml(imageLink)}</g:image_link>` : ""}
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${mrp ?? salePrice} ${CURRENCY}</g:price>
      ${mrp ? `<g:sale_price>${salePrice} ${CURRENCY}</g:sale_price>` : ""}
      <g:brand>${BRAND}</g:brand>
      <g:mpn>${id}</g:mpn>
      ${category ? `<g:product_type>${category}</g:product_type>` : ""}
      ${material ? `<g:material>${material}</g:material>` : ""}
    </item>`;
}



export async function GET() {
  try {
    const data = await productService.getAllProducts();

    const raw = data as unknown;
    const products: FeedProduct[] =
      Array.isArray(raw)                              ? raw as FeedProduct[] :
      Array.isArray((raw as Record<string,unknown>)?.products) ? (raw as Record<string,unknown>).products as FeedProduct[] :
      Array.isArray((raw as Record<string,unknown>)?.data)     ? (raw as Record<string,unknown>).data as FeedProduct[]     :
      [];

    const items = products.map(buildProductItem).join("");

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${STORE_NAME}</title>
    <link>${BASE_URL}</link>
    <description>Handmade Juttis and Designer Bags by ${STORE_NAME}</description>
    ${items}
  </channel>
</rss>`;

    return new NextResponse(feed.trim(), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("[ProductFeed] generation failed:", error);
    return new NextResponse("Failed to generate product feed", { status: 500 });
  }
}
