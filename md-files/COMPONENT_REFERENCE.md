# Component Reference Guide

## Navigation Components (`/src/all_components/Navbar`)

### Main Navigation
- **`Main.js`** - Primary navbar wrapper component
- **`Navbar.jsx`** - Core navbar logic
- **`DesktopNav.jsx`** - Desktop navigation layout
- **`MobileNav.jsx`** - Mobile navigation layout
- **`MobileMenuSidebar.jsx`** - Mobile slide-out menu
- **`MobileBackdrop.jsx`** - Mobile menu backdrop overlay

### Navigation Elements
- **`Logo.jsx`** - Site logo component
- **`NavLink.jsx`** - Navigation link wrapper
- **`CollectionsDropdown.jsx`** - Collections dropdown menu
- **`SearchPopup.jsx`** - Search modal/popup
- **`CartButton.jsx`** - Shopping cart icon with count
- **`UserSection.jsx`** - User authentication section (desktop)
- **`MobileUserSection.jsx`** - User section for mobile
- **`ProfileImage.jsx`** - User profile image display
- **`MobileNavigationLinks.jsx`** - Mobile navigation links

### Cart Components
- **`CartPage.jsx`** - Full cart page component

## Homepage Components (`/src/all_components/Homepage`)

### Main Sections
- **`HomePage.js`** - Main homepage wrapper
- **`HeroAnimated.jsx`** - Animated hero section
- **`AboutUsSection.jsx`** - About us section
- **`BrandSection.jsx`** - Brand showcase section
- **`Culture.jsx`** - Cultural heritage section
- **`NewCulture.jsx`** - Updated culture section
- **`CultureSvg.jsx`** - Culture section SVG graphics

### Product Showcases
- **`CollectionPage.jsx`** - Collections display
- **`NewCollection.jsx`** - Featured new collections
- **`MatchCollection.jsx`** - Matching product collections
- **`MatchSareeSection.jsx`** - Saree matching section
- **`MatchSuitSection.jsx`** - Suit matching section

### Navigation & Links
- **`QuickLinks.jsx`** - Quick navigation links

## Loading Components (`/src/all_components/loader`)
- **`GulbharLoader.jsx`** - Main site loader
- **`NewLoader.jsx`** - Alternative loader design
- **`ProductLoader.jsx`** - Product-specific loading state

## Footer Component (`/src/all_components/Footer`)
- **`Footer.jsx`** - Site footer with links and information

## Page Components

### About Page (`/src/app/about/Component`)
- **`About.jsx`** - About page content

### Contact Page (`/src/app/contact/Component`)
- **`contact.jsx`** - Contact form and information

### Authentication Pages
#### Login (`/src/app/login/Component`)
- **`Login.jsx`** - Login form component
- **`LoginWithGoogle.jsx`** - Google OAuth login

#### Signup (`/src/app/signup/components`)
- **`Main.js`** - Signup flow main component
- **`ProgressSteps.jsx`** - Multi-step progress indicator
- **`PersonalInformation.jsx`** - Personal info form step
- **`Security.jsx`** - Password/security step
- **`EmailVerification.jsx`** - Email verification step
- **`PhoneVerification.jsx`** - Phone verification step
- **`ProfileImageUpload.jsx`** - Profile image upload step
- **`Carousel.jsx`** - Image carousel for signup
- **`Previous.js`** - Previous step navigation

#### Forgot Password (`/src/app/forgot-password/Component`)
- **`ForgotPassword.jsx`** - Password reset form

### Account Management (`/src/app/account`)
#### Main Account (`/src/app/account/components`)
- **`Sidebar.jsx`** - Account navigation sidebar
- **`Breadcrumb.jsx`** - Breadcrumb navigation

#### Account Centre (`/src/app/account/account-centre`)
- **Profile Management** (`/profile`) - User profile editing
- **Order History** (`/my-order`) - Order tracking and history
- **Security Settings** (`/security`) - Password and security
- **General Settings** (`/settings`) - Account preferences
- **Wishlist** (`/_wishlist`) - Saved products

### Product & Collections
#### Collections (`/src/app/collections/components`)
- **`Collection.jsx`** - Main collection display
- **`ClientSideCollection.jsx`** - Client-side collection logic
- **`ProductCard.jsx`** - Individual product card
- **`DummyProductCard.jsx`** - Loading placeholder card
- **`FilterSidebar.jsx`** - Product filtering sidebar
- **`ContentSection.jsx`** - Collection content area
- **`TopTrends.jsx`** - Trending products section
- **`QuickLinks.jsx`** - Quick navigation links
- **`QuickTag.jsx`** - Product tags

#### Products (`/src/products/[id]/components`)
- Product detail components (specific files need inspection)

### Cart & Checkout (`/src/app/cart`)
#### Cart (`/src/app/cart/components`)
- **`CartComponent.jsx`** - Main cart display

#### Checkout (`/src/app/cart/checkout/components`)
- Checkout flow components (specific files need inspection)

### Legal & Policy Pages
- **Privacy Policy** (`/src/app/privacy-policy/components/privacy-policy.jsx`)
- **Terms & Conditions** (`/src/app/terms-condition/Component/Terms.jsx`)
- **Cookie Policy** (`/src/app/cookies-policy/Component/CookiePolicy.jsx`)
- **Delivery Policy** (`/src/app/delivery-shipping-policy/Component/DeliveryShipping.jsx`)
- **Refund Policy** (`/src/app/refund-policy/Component/RefundPolicy.jsx`)
- **FAQ** (`/src/app/faq/Component/Faq.jsx`)

### Heritage & Culture (`/src/app/heritage-culture/components`)
- **`CulturePage.jsx`** - Cultural heritage showcase

### Search (`/src/app/search`)
- **`page.jsx`** - Search results page

## Utility Components (`/src/all_components`)
- **`AuthProtected.js`** - Route protection wrapper
- **`aisehi.js`** - Utility component (needs inspection)

## Global Components (`/src/app/components`)
- **`RouteChangeTracker.jsx`** - Analytics route tracking

## Component Usage Patterns

### Layout Components
1. **Navbar** - Always present at top of layout
2. **Footer** - Always present at bottom of layout
3. **Main Content** - Wrapped in `<main id="main-content">`

### State Management
- **AuthContext** - User authentication state
- **CartContext** - Shopping cart state
- **ReactQuery** - Server state and caching

### Loading States
- Use appropriate loader components for different sections
- **GulbharLoader** for full page loading
- **ProductLoader** for product-specific loading

### Responsive Design
- All components follow mobile-first approach
- Custom breakpoints: xs(400px), sm(600px), md(860px), lg(1024px), xl(1280px), 2xl(1560px), 3xl(1920px)

### Animation
- **Framer Motion** used for animations
- **HeroAnimated.jsx** contains main hero animations

### Image Optimization
- All images use Next.js Image component
- Remote patterns configured for AWS S3, Google, Facebook
- WebP and AVIF formats supported