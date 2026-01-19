# Development Guide & Common Tasks

## Quick File Access Map

### Need to modify...

#### **Homepage Content**
- Hero section → `/src/all_components/Homepage/HeroAnimated.jsx`
- About section → `/src/all_components/Homepage/AboutUsSection.jsx`
- Collections showcase → `/src/all_components/Homepage/CollectionPage.jsx`
- Cultural content → `/src/all_components/Homepage/Culture.jsx`
- Brand information → `/src/all_components/Homepage/BrandSection.jsx`
- Homepage data fetching → `/src/app/page.js`

#### **Navigation**
- Desktop navbar → `/src/all_components/Navbar/DesktopNav.jsx`
- Mobile navbar → `/src/all_components/Navbar/MobileNav.jsx`
- Logo → `/src/all_components/Navbar/Logo.jsx`
- Search functionality → `/src/all_components/Navbar/SearchPopup.jsx`
- Cart button → `/src/all_components/Navbar/CartButton.jsx`
- User menu → `/src/all_components/Navbar/UserSection.jsx`

#### **Product Pages**
- Product detail page → `/src/app/products/[id]/page.js`
- Product components → `/src/app/products/[id]/components/`
- Collection pages → `/src/app/collections/[slug]/page.js`
- Collection components → `/src/app/collections/components/`
- Product cards → `/src/app/collections/components/ProductCard.jsx`

#### **User Authentication**
- Login page → `/src/app/login/Component/Login.jsx`
- Signup flow → `/src/app/signup/components/Main.js`
- Auth context → `/src/Providers/ContextProviders/AuthContext.js`
- NextAuth config → `/src/app/api/auth/[...nextauth]/route.js`

#### **Shopping Cart**
- Cart page → `/src/app/cart/page.js`
- Cart component → `/src/app/cart/components/CartComponent.jsx`
- Cart context → `/src/Providers/ContextProviders/CartContext.js`
- Cart API → `/src/app/api/cart/cart.js`

#### **User Account**
- Account dashboard → `/src/app/account/page.js`
- Profile management → `/src/app/account/account-centre/profile/`
- Order history → `/src/app/account/account-centre/my-order/`
- Account sidebar → `/src/app/account/components/Sidebar.jsx`

#### **Footer**
- Footer content → `/src/all_components/Footer/Footer.jsx`

#### **Legal Pages**
- Privacy policy → `/src/app/privacy-policy/components/privacy-policy.jsx`
- Terms & conditions → `/src/app/terms-condition/Component/Terms.jsx`
- Cookie policy → `/src/app/cookies-policy/Component/CookiePolicy.jsx`
- Shipping policy → `/src/app/delivery-shipping-policy/Component/DeliveryShipping.jsx`
- Refund policy → `/src/app/refund-policy/Component/RefundPolicy.jsx`
- FAQ → `/src/app/faq/Component/Faq.jsx`

#### **Styling & Layout**
- Global styles → `/src/app/globals.css`
- Tailwind config → `/tailwind.config.js`
- Layout wrapper → `/src/app/layout.js`

#### **API & Data**
- Product API → `/src/app/api/v1/product-service.js`
- User API → `/src/app/api/profile/profile.js`
- Contact API → `/src/app/api/contact/contact.js`
- Order API → `/src/app/api/order/orderApi.js`

## Common Development Tasks

### Adding a New Page
1. Create page directory: `/src/app/new-page/`
2. Add `page.js` with default export
3. Create components folder: `/src/app/new-page/components/`
4. Add navigation link in navbar components
5. Update sitemap if needed

### Adding a New Component
1. Create component file in appropriate directory
2. Follow naming convention: `ComponentName.jsx`
3. Import and use in parent component
4. Add to component reference if reusable

### Modifying Styles
1. **Global styles** → Edit `/src/app/globals.css`
2. **Component styles** → Use Tailwind classes in JSX
3. **Custom breakpoints** → Modify `/tailwind.config.js`
4. **Theme colors** → Add to Tailwind config

### Adding New API Endpoint
1. Create file in `/src/app/api/endpoint-name/`
2. Export handler functions (GET, POST, etc.)
3. Add error handling and validation
4. Update API documentation

### Managing State
1. **Global state** → Add to context providers
2. **Server state** → Use TanStack Query
3. **Local state** → Use React useState/useReducer
4. **Persistent state** → Use localStorage/sessionStorage

### Image Management
1. **Static images** → Place in `/public/` directory
2. **Dynamic images** → Configure remote patterns in `next.config.mjs`
3. **Optimization** → Use Next.js Image component
4. **Responsive images** → Use srcSet and sizes attributes

### SEO & Metadata
1. **Page metadata** → Add `generateMetadata` function
2. **Structured data** → Add JSON-LD scripts
3. **Sitemaps** → Update `/src/utils/sitemapData.json`
4. **Robots.txt** → Modify `/src/app/robots.txt`

## File Modification Patterns

### Component Structure
```jsx
// Standard component pattern
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div className="tailwind-classes">
      {/* Component JSX */}
    </div>
  );
}
```

### Page Structure
```jsx
// Page component pattern
import ComponentName from './components/ComponentName';

export async function generateMetadata() {
  return {
    title: 'Page Title',
    description: 'Page description',
  };
}

export default function PageName() {
  return (
    <div>
      <ComponentName />
    </div>
  );
}
```

### API Route Structure
```javascript
// API route pattern
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Handle GET request
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Handle POST request
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
```

## Environment Setup

### Development Environment
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables
Create `.env.local` for local development:
```bash
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Testing & Debugging

### Common Debug Points
1. **Console logs** → Check browser console and terminal
2. **Network tab** → Monitor API calls and responses
3. **React DevTools** → Inspect component state and props
4. **TanStack Query DevTools** → Monitor query cache

### Performance Monitoring
1. **Lighthouse** → Run performance audits
2. **Next.js Bundle Analyzer** → Analyze bundle size
3. **Core Web Vitals** → Monitor loading performance
4. **Analytics** → Track user behavior

## Deployment

### AWS Amplify Configuration
- Build settings in `amplify.yml`
- Environment variables in Amplify console
- Custom domain configuration
- SSL certificate management

### Pre-deployment Checklist
1. Test all functionality locally
2. Run build command successfully
3. Check environment variables
4. Verify image optimizations
5. Test responsive design
6. Validate SEO metadata

## Troubleshooting Common Issues

### Build Errors
- Check import paths and file names
- Verify all dependencies are installed
- Check for TypeScript errors
- Validate environment variables

### Runtime Errors
- Check browser console for errors
- Verify API endpoints are working
- Check network requests
- Validate data structures

### Performance Issues
- Optimize images and assets
- Check bundle size
- Implement lazy loading
- Use React.memo for expensive components

### SEO Issues
- Verify metadata generation
- Check structured data
- Validate sitemap
- Test social media previews