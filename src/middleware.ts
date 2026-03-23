import { NextResponse, type NextRequest } from "next/server";

// ─── Redirect rules ───────────────────────────────────────────────────────────

type RedirectRule = {
  match: string[];
  redirectTo: string;
};

const REDIRECT_RULES: RedirectRule[] = [
  { match: ["jutti", "jutis"], redirectTo: "/juttis" },
  { match: ["lehenga", "lehngas"], redirectTo: "/lehenga" },
  { match: ["suits"], redirectTo: "/suit" },
  { match: ["sarees"], redirectTo: "/saree" },
  { match: ["bag"], redirectTo: "/bags" },
  { match: ["collection"], redirectTo: "/collections" },
];

// ─── 410 cache ────────────────────────────────────────────────────────────────

type CacheEntry = { gone: boolean; expiresAt: number };
const goneCache = new Map<string, CacheEntry>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const API_BASE = "https://api.gulbhahar.com";

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

    goneCache.set(productId, { gone, expiresAt: Date.now() + CACHE_TTL });
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
            "Cache-Control": "public, max-age=86400, immutable",
          },
        });
      }

      return NextResponse.redirect(new URL("/410", request.url), 302);
    }
  }

  // ── 2. Redirect synonyms → canonical routes ───────────────────────────────
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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
