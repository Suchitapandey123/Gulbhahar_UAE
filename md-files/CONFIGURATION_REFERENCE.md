# Configuration Reference

## Next.js Configuration (`next.config.mjs`)

### Image Optimization
```javascript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "gulbahar-backend.s3.ap-south-1.amazonaws.com", // AWS S3 bucket
    },
    {
      protocol: "https", 
      hostname: "lh3.googleusercontent.com", // Google user avatars
    },
    // Additional domains for external images
  ],
  formats: ['image/webp', 'image/avif'], // Modern image formats
  deviceSizes: [640, 750, 828, 1080, 1200], // Responsive breakpoints
  imageSizes: [16, 32, 48, 64, 96, 128, 256], // Icon sizes
  minimumCacheTTL: 31536000, // 1 year cache
}
```

### Cache Control Headers
```javascript
async headers() {
  return [
    {
      source: '/products/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ],
    },
    {
      source: '/collections/:path*', 
      headers: [
        { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ],
    },
  ];
}
```

## Tailwind CSS Configuration (`tailwind.config.js`)

### Content Paths
```javascript
content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}", // All source files
]
```

### Custom Breakpoints
```javascript
theme: {
  screens: {
    xs: "400px",   // Extra small devices
    sm: '600px',   // Small devices (phones)
    md: '860px',   // Medium devices (tablets)
    lg: '1024px',  // Large devices (laptops)
    xl: '1280px',  // Extra large devices (desktops)
    "2xl": '1560px', // 2X large devices
    "3xl": '1920px', // 3X large devices (large monitors)
  },
}
```

## Package.json Configuration

### Scripts
```json
{
  "scripts": {
    "dev": "next dev",        // Development server
    "build": "next build",    // Production build
    "start": "next start",    // Production server
    "lint": "next lint"       // ESLint checking
  }
}
```

### Dependencies
```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.77.2",           // Server state management
    "@tanstack/react-query-devtools": "^5.77.2",  // Query debugging
    "axios": "^1.9.0",                            // HTTP client
    "clsx": "^2.1.1",                             // Conditional classes
    "exceljs": "^4.4.0",                          // Excel file handling
    "framer-motion": "^12.12.1",                  // Animations
    "lucide-react": "^0.511.0",                   // Icons
    "next": "^15.5.9",                            // React framework
    "next-auth": "^4.24.11",                      // Authentication
    "react": "^19.0.0",                           // React library
    "react-dom": "^19.0.0",                       // React DOM
    "react-icons": "^5.5.0",                      // Icon library
    "sharp": "^0.34.5",                           // Image processing
    "sonner": "^2.0.7",                           // Toast notifications
    "zod": "^3.25.20"                             // Schema validation
  }
}
```

### Dev Dependencies
```json
{
  "devDependencies": {
    "@types/react": "19.2.7",      // React TypeScript types
    "autoprefixer": "^10.4.21",    // CSS vendor prefixes
    "postcss": "^8.5.3",           // CSS processing
    "tailwindcss": "^3.4.17",      // CSS framework
    "typescript": "5.9.3"          // TypeScript compiler
  }
}
```

## PostCSS Configuration (`postcss.config.js`)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},    // Tailwind CSS processing
    autoprefixer: {},   // Vendor prefix addition
  },
}
```

## JavaScript Configuration (`jsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]  // Path alias for imports
    }
  }
}
```

## AWS Amplify Configuration (`amplify.yml`)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci                    # Install dependencies
    build:
      commands:
        - npm run build           # Build application
  artifacts:
    baseDirectory: .next         # Build output directory
    files:
      - '**/*'                   # Include all files
  cache:
    paths:
      - node_modules/**/*        # Cache node modules
      - .next/cache/**/*         # Cache Next.js build cache
```

## Environment Variables (`.env`)

### Authentication
```bash
NEXTAUTH_SECRET=                 # NextAuth.js secret key
NEXTAUTH_URL=                    # Application URL
GOOGLE_CLIENT_ID=                # Google OAuth client ID
GOOGLE_CLIENT_SECRET=            # Google OAuth client secret
```

### Database & API
```bash
API_BASE_URL=                    # Backend API base URL
DATABASE_URL=                    # Database connection string
```

### AWS Configuration
```bash
AWS_ACCESS_KEY_ID=               # AWS access key
AWS_SECRET_ACCESS_KEY=           # AWS secret key
AWS_REGION=                      # AWS region (ap-south-1)
S3_BUCKET_NAME=                  # S3 bucket for images
```

### Analytics & Tracking
```bash
GOOGLE_ANALYTICS_ID=             # Google Analytics tracking ID
FACEBOOK_PIXEL_ID=               # Facebook Pixel ID
CLARITY_PROJECT_ID=              # Microsoft Clarity project ID
```

### Payment Gateway
```bash
PAYMENT_GATEWAY_KEY=             # Payment gateway public key
PAYMENT_GATEWAY_SECRET=          # Payment gateway secret key
```

## Git Configuration (`.gitignore`)

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

## Font Configuration (in layout.js)

### Google Fonts
```javascript
import { Poppins, JetBrains_Mono } from "next/font/google";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono", 
  subsets: ["latin"],
  preload: true,
  display: "swap",
});
```

### External Font Links
```html
<link
  href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

## Analytics Configuration (in layout.js)

### Google Analytics
```javascript
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-NR9HQHE5F4"
  strategy="afterInteractive"
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NR9HQHE5F4', {
        page_path: window.location.pathname
      });
    `,
  }}
/>
```

### Facebook Pixel
```javascript
<Script
  id="facebook-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1557129638938241');
      fbq('track', 'PageView');
    `,
  }}
/>
```

### Microsoft Clarity
```javascript
<Script
  id="microsoft-clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "s4y81yz4rh");
    `,
  }}
/>
```

## SEO Configuration

### Robots.txt (`/src/app/robots.txt`)
```
User-agent: *
Allow: /

Sitemap: https://www.gulbhahar.com/sitemap.xml
```

### Metadata Configuration (in layout.js)
```javascript
export async function generateMetadata() {
  return {
    title: "Gulbhahar | Ethnic Suits, Sarees & Handmade Juttis for Women",
    description: "Shop ethnic suits, sarees, handmade juttis, jewellery and bags at Gulbhahar : where Indian tradition meets timeless elegance.",
    keywords: ["gulbhahar", "gulbhahar.com", "ethnic wear", "ethnicwear"],
    icons: {
      icon: "/logo.png",
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      canonical: "https://www.gulbhahar.com",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

## Performance Optimizations

### Preconnect Links
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.facebook.com" />
```

### DNS Prefetch
```html
<link rel="dns-prefetch" href="https://analytic.thekapslog.com" />
<link rel="dns-prefetch" href="https://www.clarity.ms" />
```

### Script Loading Strategy
- `strategy="afterInteractive"` - Load after page becomes interactive
- `strategy="lazyOnload"` - Load during idle time
- `preload: true` - Preload critical fonts