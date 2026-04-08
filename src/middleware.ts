import { NextResponse, type NextRequest } from "next/server";

// ─── Redirect rules ───────────────────────────────────────────────────────────

type RedirectRule = {
  match: string[];
  redirectTo: string;
};

const REDIRECT_RULES: RedirectRule[] = [
  { match: ["jutti", "jutis"], redirectTo: "/juttis" },
  { match: ["lehngas"], redirectTo: "/lehenga" },
  { match: ["suits"], redirectTo: "/suit" },
  { match: ["sarees"], redirectTo: "/saree" },
  { match: ["bag"], redirectTo: "/bags" },
  { match: ["collection"], redirectTo: "/collections" },
];

// ─── 410 cache ────────────────────────────────────────────────────────────────

type CacheEntry = { gone: boolean; expiresAt: number };
const goneCache = new Map<string, CacheEntry>();
const CACHE_TTL_ACTIVE = 5 * 60 * 1000;      // 5 min for active products
const CACHE_TTL_DELETED = 60 * 60 * 1000;    // 1 hr for deleted products

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.gulbhahar.com";

async function checkCollectionGone(slug: string): Promise<boolean> {
  const cacheKey = `collection:${slug}`;
  const cached = goneCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.gone;

  try {
    const res = await fetch(`${API_BASE}/api/pages/validateSlug?slug=${slug}`, {
      signal: AbortSignal.timeout(3000),
    });

    let gone = false;
    if (res.status === 404 || res.status === 410) {
      gone = true;
    } else if (res.ok) {
      try {
        const data = await res.json();
        gone = data?.success === false;
      } catch {
        gone = false;
      }
    }

    goneCache.set(cacheKey, {
      gone,
      expiresAt: Date.now() + (gone ? CACHE_TTL_DELETED : CACHE_TTL_ACTIVE),
    });
    return gone;
  } catch {
    return false;
  }
}

async function checkProductGone(productId: string): Promise<boolean> {
  const cached = goneCache.get(productId);
  if (cached && cached.expiresAt > Date.now()) return cached.gone;

  try {
    const res = await fetch(`${API_BASE}/new-api/products/get-product-by-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
      signal: AbortSignal.timeout(3000),
    });

    let gone = false;

    if (res.status === 404 || res.status === 410) {
      gone = true;
    } else if (res.ok) {
      try {
        const data = await res.json();
        const product = data?.data ?? data?.product ?? data;
        gone = product?.isActive === false;
      } catch {
        gone = false;
      }
    }
    // 5xx or other → fail-open

    goneCache.set(productId, {
      gone,
      expiresAt: Date.now() + (gone ? CACHE_TTL_DELETED : CACHE_TTL_ACTIVE),
    });
    return gone;
  } catch {
    // Network error / timeout → fail-open
    return false;
  }
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cleanPath = pathname.toLowerCase();

  // ── 1. Product 410 check ─────────────────────────────────────────────────
  const productMatch = pathname.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    const gone = await checkProductGone(productMatch[1]);
    if (gone) {
      const ua = request.headers.get("user-agent") ?? "";
      const isBot = /bot|crawler|spider|googlebot|bingbot|slurp|duckduck|baidu|yandex/i.test(ua);

      if (isBot) {
        return new NextResponse(null, {
          status: 410,
          headers: {
            "X-Robots-Tag": "noindex, nofollow",
            "Cache-Control": "public, max-age=3600, immutable",
          },  
        });
      }

      // Rewrite to /410 page — URL stays unchanged, HTTP 410 returned
      return NextResponse.rewrite(new URL("/410", request.url), { status: 410 });
    }

    // Active product — short cache hint for CDN/edge
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    return res;
  }

  // ── 2. Collection 410 check ──────────────────────────────────────────────
  const collectionMatch = pathname.match(/^\/collections\/([^/]+)$/);
  if (collectionMatch) {
    const slug = collectionMatch[1];
    // Skip product ID slugs — those redirect to /products/
    if (!/^P\d{11}$/.test(slug)) {
      const gone = await checkCollectionGone(slug);
      if (gone) {
        const ua = request.headers.get("user-agent") ?? "";
        const isBot = /bot|crawler|spider|googlebot|bingbot|slurp|duckduck|baidu|yandex/i.test(ua);

        if (isBot) {
          return new NextResponse(null, {
            status: 410,
            headers: {
              "X-Robots-Tag": "noindex, nofollow",
              "Cache-Control": "public, max-age=3600, immutable",
            },
          });
        }

        return NextResponse.rewrite(new URL("/410", request.url), { status: 410 });
      }
    }
  }

  // ── 3. Redirect synonyms → canonical routes ───────────────────────────────
  for (const rule of REDIRECT_RULES) {
    if (rule.match.some((slug) => cleanPath === `/${slug}`)) {
      const url = request.nextUrl.clone();
      url.pathname = rule.redirectTo;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on product pages (410 check) and known redirect synonyms
  // Exclude collections/*, category pages, static pages — they must stay cacheable
  matcher: [
    "/products/:path*",
    "/collections/:path*",
    "/jutti",
    "/jutis",
    "/lehngas",
    "/suits",
    "/sarees",
    "/bag",
    "/collection",
  ],
};
