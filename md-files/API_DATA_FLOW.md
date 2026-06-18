# API & Data Flow Documentation

## API Structure

### API Routes (`/src/app/api`)

#### Authentication (`/api/auth`)
- **`[...nextauth]/route.js`** - NextAuth.js configuration
- **`auth.js`** - Authentication utilities

#### User Management
- **`/api/signup/signup.js`** - User registration endpoint
- **`/api/profile/profile.js`** - User profile management
- **`/api/forgotPassword/forgotPassword.js`** - Password reset

#### Product Services
- **`/api/v0/product-service.js`** - Legacy product API (v0)
- **`/api/v1/product-service.js`** - Current product API (v1)
- **`/api/product-feed/route.js`** - Product feed for external services

#### E-commerce
- **`/api/cart/cart.js`** - Shopping cart operations
- **`/api/order/orderApi.js`** - Order processing and management

#### Communication
- **`/api/contact/contact.js`** - Contact form submissions
- **`/api/newsletterApi/newsletterApi.js`** - Newsletter subscriptions

#### Utilities
- **`/api/analytics/analytics.js`** - Analytics tracking
- **`/api/deliveryApi/deliveryApi.js`** - Delivery and shipping
- **`/api/pageService/pageService.js`** - Page content management

## Data Flow Architecture

### Client-Side State Management

#### Context Providers (`/src/Providers`)
```javascript
// Authentication Flow
AuthContext → User login/logout state
├── Login status
├── User profile data
├── Authentication tokens
└── Session management

// Shopping Cart Flow
CartContext → Cart state management
├── Add/remove items
├── Update quantities
├── Calculate totals
└── Persist cart data

// Server State
ReactQueryProvider → API data caching
├── Product data
├── User data
├── Order history
└── Cache invalidation
```

### Server-Side Data Fetching

#### Homepage Data Flow
```javascript
// /src/app/page.js
Home Page → QueryClient.fetchQuery → productApi.getAllProduct()
├── Fetch all products
├── Cache for 60 seconds
├── Revalidate every 60 seconds
└── Pass to HomePage component
```

#### Product Pages
```javascript
// /src/app/products/[id]/page.js
Product Detail → Dynamic route → Fetch product by ID
├── Product information
├── Related products
├── Reviews/ratings
└── Availability status
```

#### Collections
```javascript
// /src/app/collections/[slug]/page.js
Collection Page → Dynamic route → Fetch collection data
├── Collection metadata
├── Filtered products
├── Category information
└── SEO data
```

## API Integration Patterns

### TanStack Query Usage
```javascript
// Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000,      // Cache for 5 minutes
      staleTime: 60 * 1000,       // Consider stale after 1 minute
    },
  },
});

// Common Query Keys
['getAllProduct']              // Homepage products
['getProductById', id]         // Individual product
['getCollectionBySlug', slug]  // Collection data
['getUserProfile']             // User profile
['getCartItems']              // Shopping cart
['getOrderHistory']           // User orders
```

### Authentication Flow
```javascript
// NextAuth.js Configuration
NextAuth → Google OAuth + Custom credentials
├── JWT tokens
├── Session management
├── Protected routes
└── User profile sync
```

### Cart Management
```javascript
// Cart Operations
CartContext → Local storage + API sync
├── addToCart(product, quantity)
├── removeFromCart(productId)
├── updateQuantity(productId, quantity)
├── clearCart()
└── syncWithServer()
```

## External Integrations

### Analytics & Tracking
```javascript
// Google Analytics
gtag('config', 'G-NR9HQHE5F4')
├── Page views
├── E-commerce events
├── User interactions
└── Conversion tracking

// Facebook Pixel
fbq('init', '1557129638938241')
├── Page views
├── Purchase events
├── Add to cart events
└── Custom conversions

// Microsoft Clarity
clarity('s4y81yz4rh')
├── User session recordings
├── Heatmaps
├── User behavior analysis
└── Performance metrics
```

### Payment Integration
```javascript
// Payment Methods (configured in UI)
├── UPI (BHIM)
├── Credit Cards (Visa, MasterCard)
├── Debit Cards
└── Net Banking
```

### Image Management
```javascript
// AWS S3 Integration
Remote Image Patterns:
├── gulbahar-backend.s3.ap-south-1.amazonaws.com
├── lh3.googleusercontent.com (Google)
├── www.banarasee.in
└── www.facebook.com

// Image Optimization
├── WebP format support
├── AVIF format support
├── Responsive image sizes
└── Lazy loading
```

## Data Models (Inferred)

### User Model
```javascript
{
  id: string,
  email: string,
  name: string,
  phone?: string,
  profileImage?: string,
  addresses: Address[],
  orders: Order[],
  wishlist: Product[]
}
```

### Product Model
```javascript
{
  id: string,
  name: string,
  description: string,
  price: number,
  images: string[],
  category: string,
  collection: string,
  variants: Variant[],
  availability: boolean,
  tags: string[]
}
```

### Cart Model
```javascript
{
  items: CartItem[],
  total: number,
  subtotal: number,
  shipping: number,
  tax: number
}

CartItem: {
  productId: string,
  quantity: number,
  variant?: string,
  price: number
}
```

### Order Model
```javascript
{
  id: string,
  userId: string,
  items: CartItem[],
  total: number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered',
  shippingAddress: Address,
  paymentMethod: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables (`.env`)
```bash
# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Database/API
API_BASE_URL=
DATABASE_URL=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=

# Analytics
GOOGLE_ANALYTICS_ID=
FACEBOOK_PIXEL_ID=
CLARITY_PROJECT_ID=

# Payment
PAYMENT_GATEWAY_KEY=
PAYMENT_GATEWAY_SECRET=
```

## Caching Strategy

### Next.js Caching
- **Static Generation** - Legal pages, about page
- **Server-Side Rendering** - Product pages, collections
- **Incremental Static Regeneration** - Homepage (60s revalidation)

### Client-Side Caching
- **TanStack Query** - API response caching
- **Local Storage** - Cart persistence, user preferences
- **Session Storage** - Temporary form data

### CDN & Image Caching
- **AWS S3** - Product images
- **Next.js Image Optimization** - Automatic format conversion
- **Browser Caching** - Static assets (CSS, JS, images)

## Error Handling

### API Error Patterns
```javascript
// Standard error response
{
  success: false,
  message: "Error description",
  code: "ERROR_CODE",
  details?: any
}
```

### Client Error Handling
- **Toast Notifications** - User-friendly error messages
- **Fallback UI** - Loading states and error boundaries
- **Retry Logic** - Automatic retry for failed requests