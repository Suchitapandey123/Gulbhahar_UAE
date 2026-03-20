import { NextResponse, NextRequest } from "next/server";

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

const ALLOWED_BASE_ROUTES = REDIRECT_RULES.map(r => r.redirectTo);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cleanPath = pathname.toLowerCase();

  const city = request.headers.get("x-vercel-ip-city");
//   const latitude = request.headers.get("x-vercel-ip-latitude");
//   const longitude = request.headers.get("x-vercel-ip-longitude");


//     city,
//     latitude,
//     longitude,
//   });

  //  Allow homepage
  if (cleanPath === "/") {
    return NextResponse.next();
  }

  // Allow canonical base routes
  if (ALLOWED_BASE_ROUTES.includes(cleanPath)) {
    return NextResponse.next();
  }

  //  Redirect synonyms → canonical base routes (only exact single-level matches)
  for (const rule of REDIRECT_RULES) {
    const isExactSingleMatch = rule.match.some(
      (slug) => cleanPath === `/${slug}`
    );

    if (isExactSingleMatch) {
      const url = request.nextUrl.clone();
      url.pathname = rule.redirectTo;
      return NextResponse.redirect(url, 308);
    }
  }

  // ❌ 404 ONLY for single-level unknown routes like "/xcvcx"
  const segments = cleanPath.split("/").filter(Boolean);

  // ✅ Allow deeper routes like "/xczfsd/csdf"
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
