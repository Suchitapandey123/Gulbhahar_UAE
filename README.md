# Gulbhahar Website

> E-commerce platform for ethnic wear - Suits, Sarees, Handmade Juttis

**Live Site:** https://www.gulbhahar.com

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15.5.9 (App Router) |
| UI | React 19, Tailwind CSS 3.4.17 |
| State | TanStack React Query 5.77, React Context |
| Auth | NextAuth.js 4.24 (Google/Facebook OAuth) |
| Animation | Framer Motion 12.12 |
| Icons | Lucide React, React Icons |
| HTTP | Axios 1.9 |
| Validation | Zod 3.25 |
| Notifications | Sonner 2.0 |
| Image Optimization | Sharp 0.34, Next/Image |
| Package Manager | pnpm |
| Deployment | AWS Amplify |

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Homepage (ISR: 60s)
│   │
│   ├── api/                      # API Routes
│   │   ├── v0/                   # Product service endpoints
│   │   ├── v1/                   # Analytics endpoints
│   │   ├── auth/                 # NextAuth handler
│   │   ├── signup/               # User registration
│   │   ├── cart/                 # Cart validation (Delhivery)
│   │   ├── order/                # Order management
│   │   ├── profile/              # User profile
│   │   ├── contact/              # Contact form
│   │   ├── analytics/            # Event tracking
│   │   ├── deliveryApi/          # Shipping validation
│   │   ├── newsletterApi/        # Newsletter subscription
│   │   ├── forgotPassword/       # Password recovery
│   │   └── pageService/          # Dynamic page content
│   │
│   ├── products/                 # Product detail pages
│   │   └── [id]/
│   │       ├── page.js           # Product detail (dynamic)
│   │       ├── client.jsx        # Client component
│   │       ├── loading.js        # Loading skeleton
│   │       └── components/       # Reviews, SizeGuide, ImageModal
│   │
│   ├── collections/              # Category pages
│   │   ├── page.js               # All collections
│   │   ├── [slug]/               # Dynamic collection pages
│   │   └── (juttis)/             # Route group for juttis
│   │       ├── bridal-juttis/
│   │       ├── punjabi-juttis/
│   │       ├── juttis-for-women/
│   │       └── juttis/
│   │
│   ├── cart/                     # Shopping cart & checkout
│   │   ├── page.js
│   │   └── checkout/payment/
│   │
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   └── callback/
│   │
│   ├── account/                  # User account
│   ├── search/                   # Global search
│   │
│   └── [Static Pages]            # about, contact, faq, policies
│
├── all_components/               # Reusable UI components
│   ├── Navbar/                   # Navigation (16 files)
│   │   ├── Main.js
│   │   ├── DesktopNav.jsx
│   │   ├── MobileNav.jsx
│   │   ├── SearchPopup.jsx
│   │   ├── CartPage.jsx
│   │   └── ...
│   │
│   ├── Homepage/                 # Homepage sections
│   │   ├── HomePage.js
│   │   ├── HeroAnimated.jsx
│   │   ├── NewCollection.jsx
│   │   ├── CollectionPage.jsx
│   │   ├── BrandSection.jsx
│   │   ├── AboutUsSection.jsx
│   │   ├── Culture.jsx
│   │   ├── MatchCollection.jsx
│   │   └── QuickLinks.jsx
│   │
│   ├── Footer/
│   ├── loader/                   # Loading spinners
│   └── AuthProtected.js          # Route protection
│
├── Providers/                    # React Context & Providers
│   ├── ContextProviders/
│   │   ├── CartContext.js        # Cart state management
│   │   └── AuthContext.js        # Auth state management
│   ├── ReactQueryProvider/
│   └── GoogleSessionProvider/
│
├── hooks/                        # Custom React hooks
│   ├── useToast.js
│   └── useImagePreloader.js
│
└── utils/                        # Utility functions
    ├── envHere.js                # API base URL
    ├── cartUtils.js
    ├── debounce.js
    ├── fb/metaPixels.js          # Facebook Pixel events
    └── gtm/gtag.js               # Google Analytics events
```

## API Integration

**Base URL:** `https://api.gulbhahar.com`

### Key Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/v0/products/` | Product CRUD operations |
| `/api/auth/` | NextAuth OAuth handlers |
| `/api/signup/` | User registration |
| `/api/cart/` | Cart & Delhivery validation |
| `/api/order/` | Order management |
| `/api/analytics/` | Event tracking |

## Analytics & Tracking

- **Google Analytics:** G-M4Q3C3DJQM
- **Google Tag Manager:** GTM-T5S7S772
- **Facebook Pixel:** 1557129638938241
- **Microsoft Clarity:** s4y81yz4rh

## Image Optimization

Images are served from AWS S3 and optimized with Next.js Image component:

```javascript
// Allowed domains
- gulbahar-backend.s3.ap-south-1.amazonaws.com
- lh3.googleusercontent.com (Google)
- www.facebook.com

// Formats: WebP, AVIF
// Cache TTL: 1 year
```

## Caching Strategy

| Route | Strategy |
|-------|----------|
| Homepage (`/`) | ISR (revalidate: 60s) |
| Products (`/products/*`) | Dynamic (no cache) |
| Collections (`/collections/*`) | Dynamic (no cache) |
| Static pages | Static |

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

```env
GOOGLE_CLIENT_ID=<google-oauth-client-id>
GOOGLE_CLIENT_SECRET=<google-oauth-secret>
NEXTAUTH_URL=https://www.gulbhahar.com
NEXTAUTH_SECRET=<secret>
```

## Key Features

- **OAuth Authentication:** Google & Facebook login
- **Shopping Cart:** localStorage persistence with context
- **Delivery Validation:** Delhivery API integration
- **Image Optimization:** WebP/AVIF with lazy loading
- **Dynamic Imports:** Code splitting for below-fold components
- **ISR:** Incremental Static Regeneration for homepage
- **SEO:** Dynamic metadata, sitemaps, canonical URLs

## Deployment

Deployed on **AWS Amplify** with:
- Pre-build: pnpm install, cache cleanup
- Build: pnpm run build
- Artifacts: .next directory
- Cache: node_modules/.pnpm, .pnpm-store

## File Structure Reference

### Core Files

| File | Purpose |
|------|---------|
| `src/app/layout.js` | Root layout, providers, analytics scripts |
| `src/app/page.js` | Homepage with ISR |
| `src/all_components/Homepage/HomePage.js` | Homepage composition |
| `src/Providers/ContextProviders/CartContext.js` | Cart state |
| `src/Providers/ContextProviders/AuthContext.js` | Auth state |
| `src/app/api/v0/product-service.js` | Product API calls |

### Homepage Sections

1. `HeroAnimated.jsx` - Hero carousel with parallax
2. `BrandSection.jsx` - Brand showcase
3. `NewCollection.jsx` - Featured products grid
4. `CollectionPage.jsx` - Category showcase
5. `AboutUsSection.jsx` - Company info
6. `Culture.jsx` - Heritage content
7. `MatchCollection.jsx` - Curated matches
8. `QuickLinks.jsx` - Category quick access

## Notes

- Use `priority` for above-fold images, `loading="lazy"` for below-fold
- Product/Collection pages use `force-dynamic` to bypass Amplify cache
- Cart syncs with localStorage and CartContext
- Auth tokens stored in localStorage with 30-day expiry
