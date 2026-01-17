# Gulbhahar Website - Codebase Structure

## Project Overview
- **Framework**: Next.js 15.5.9 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS
- **State Management**: React Context + TanStack Query
- **Authentication**: NextAuth.js
- **Deployment**: AWS Amplify

## Directory Structure

### Root Level
```
/
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── amplify.yml            # AWS Amplify deployment config
├── jsconfig.json          # JavaScript project config
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Package lock file
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

### Source Code (`/src`)
```
src/
├── all_components/        # Reusable UI components
├── app/                   # Next.js App Router pages
├── hooks/                 # Custom React hooks
├── Providers/             # Context providers
└── utils/                 # Utility functions
```

### Public Assets (`/public`)
```
public/
├── about/                 # About page images
├── cart/                  # Cart-related icons
├── forgot-password/       # Password reset images
├── heritage-culture/      # Culture page images
├── home-page/             # Homepage images
├── login/                 # Login page images
├── payment-cards/         # Payment method icons
├── Signup/                # Signup page images
└── [various icons/logos]  # Site branding assets
```

## Key Components Structure

### Navigation (`/src/all_components/Navbar`)
- `Main.js` - Main navbar wrapper
- `DesktopNav.jsx` - Desktop navigation
- `MobileNav.jsx` - Mobile navigation
- `CartButton.jsx` - Shopping cart button
- `SearchPopup.jsx` - Search functionality
- `UserSection.jsx` - User authentication section

### Homepage (`/src/all_components/Homepage`)
- `HomePage.js` - Main homepage component
- `HeroAnimated.jsx` - Hero section with animations
- `CollectionPage.jsx` - Collections showcase
- `Culture.jsx` - Cultural heritage section
- `BrandSection.jsx` - Brand information

### Footer (`/src/all_components/Footer`)
- `Footer.jsx` - Site footer component

## App Router Structure (`/src/app`)

### Main Pages
- `/` - Homepage (page.js)
- `/about` - About page
- `/contact` - Contact page
- `/login` - User login
- `/signup` - User registration
- `/cart` - Shopping cart
- `/account` - User account management

### Product & Collections
- `/products/[id]` - Individual product pages
- `/collections` - Product collections
- `/collections/[slug]` - Specific collection pages
- `/search` - Product search

### Legal Pages
- `/privacy-policy` - Privacy policy
- `/terms-condition` - Terms and conditions
- `/cookies-policy` - Cookie policy
- `/delivery-shipping-policy` - Shipping information
- `/refund-policy` - Refund policy
- `/faq` - Frequently asked questions

### API Routes (`/src/app/api`)
- `/auth` - Authentication endpoints
- `/cart` - Cart management
- `/contact` - Contact form
- `/order` - Order processing
- `/profile` - User profile management
- `/v0` & `/v1` - Product service APIs

## State Management

### Context Providers (`/src/Providers`)
- `AuthContext.js` - User authentication state
- `CartContext.js` - Shopping cart state
- `ReactQueryProvider.js` - TanStack Query setup
- `SessionWrapper.jsx` - NextAuth session wrapper

### Custom Hooks (`/src/hooks`)
- `useImagePreloader.js` - Image preloading utility
- `useToast.js` - Toast notification hook

## Utilities (`/src/utils`)
- `cartUtils.js` - Cart-related helper functions
- `debounce.js` - Debouncing utility
- `Toast.js` - Toast notification system
- `envHere.js` - Environment configuration
- `fb/metaPixels.js` - Facebook Pixel integration
- `gtm/gtag.js` - Google Analytics integration

## Configuration Files

### Next.js Config (`next.config.mjs`)
- Image optimization settings
- Remote image patterns for AWS S3, Google, Facebook
- Cache control headers for products/collections
- Performance optimizations

### Tailwind Config (`tailwind.config.js`)
- Custom breakpoints (xs: 400px to 3xl: 1920px)
- Content paths for purging unused CSS

### Package.json Dependencies
**Main Dependencies:**
- `next` - React framework
- `react` & `react-dom` - React library
- `@tanstack/react-query` - Server state management
- `next-auth` - Authentication
- `framer-motion` - Animations
- `axios` - HTTP client
- `sonner` - Toast notifications
- `zod` - Schema validation

**Dev Dependencies:**
- `tailwindcss` - CSS framework
- `typescript` - Type checking
- `autoprefixer` - CSS vendor prefixes

## Key Features
1. **E-commerce Functionality** - Product catalog, cart, checkout
2. **User Authentication** - Login, signup, profile management
3. **Responsive Design** - Mobile-first approach
4. **SEO Optimized** - Meta tags, sitemaps, structured data
5. **Analytics Integration** - Google Analytics, Facebook Pixel, Microsoft Clarity
6. **Performance Optimized** - Image optimization, caching, lazy loading
7. **Accessibility** - ARIA labels, keyboard navigation

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```