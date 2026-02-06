# Gulbhahar Website - Revalidation Guide

Complete documentation for revalidating all pages using Next.js On-Demand Revalidation API.

## Base URL
- Production: `https://www.gulbhahar.com`
- Local: `http://localhost:3000`

---

## Table of Contents
1. [Homepage](#homepage)
2. [Product Pages](#product-pages)
3. [Collection Pages](#collection-pages)
4. [Parent Category Pages](#parent-category-pages)
5. [Static Pages](#static-pages)
6. [User Account Pages](#user-account-pages)
7. [Cart & Checkout Pages](#cart--checkout-pages)
8. [Tag-Based Revalidation](#tag-based-revalidation)
9. [Batch Revalidation](#batch-revalidation)
10. [Revalidate All](#revalidate-all)

---

## 1. Homepage

### Revalidate Homepage (/)
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?path=/"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/"}'
```

---

## 2. Product Pages

### Revalidate Specific Product by ID
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/products/P22172793603"}'
```

### Revalidate All Products (using tag)
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?tag=products"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "tag", "tag": "products"}'
```

### Revalidate Multiple Specific Products
```bash
# POST Method - Multiple product paths
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/products/P22172793603",
      "/products/P18208824824",
      "/products/P01816314193"
    ]
  }'
```

---

## 3. Collection Pages

### Main Collections Page
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?path=/collections"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/collections"}'
```

### Specific Collection by Slug
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?path=/collections/punjabi-juttis"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/collections/punjabi-juttis"}'
```

### All Juttis Collections
```bash
# POST Method - Revalidate all juttis collections
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/collections/juttis",
      "/collections/punjabi-juttis",
      "/collections/punjabi-juttis-for-ladies",
      "/collections/juttis-for-women",
      "/collections/bridal-juttis"
    ]
  }'
```

### Revalidate All Collections (using tag)
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?tag=collections"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "tag", "tag": "collections"}'
```

---

## 4. Parent Category Pages

### Revalidate Specific Parent Category
```bash
# GET Method - Juttis
curl "https://www.gulbhahar.com/api/revalidate?path=/juttis"

# GET Method - Suit
curl "https://www.gulbhahar.com/api/revalidate?path=/suit"

# GET Method - Bags
curl "https://www.gulbhahar.com/api/revalidate?path=/bags"

# POST Method - Multiple parent categories
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": ["/juttis", "/suit", "/bags", "/sarees", "/lehenga"]
  }'
```

---

## 5. Static Pages

### About & Culture Pages
```bash
# About Page
curl "https://www.gulbhahar.com/api/revalidate?path=/about"

# Heritage Culture Page
curl "https://www.gulbhahar.com/api/revalidate?path=/heritage-culture"

# POST Method - Both pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": ["/about", "/heritage-culture"]}'
```

### Policy Pages
```bash
# Revalidate all policy pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/privacy-policy",
      "/terms-condition",
      "/refund-policy",
      "/cookies-policy",
      "/delivery-shipping-policy"
    ]
  }'
```

### Contact & FAQ Pages
```bash
# Contact Page
curl "https://www.gulbhahar.com/api/revalidate?path=/contact"

# FAQ Page
curl "https://www.gulbhahar.com/api/revalidate?path=/faq"

# POST Method - Both
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": ["/contact", "/faq"]}'
```

---

## 6. User Account Pages

### Main Account Page
```bash
curl "https://www.gulbhahar.com/api/revalidate?path=/account"
```

### Account Centre Pages
```bash
# Revalidate all account centre pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/account/account-centre",
      "/account/account-centre/profile",
      "/account/account-centre/settings",
      "/account/account-centre/security"
    ]
  }'
```

### Order Pages
```bash
# Revalidate all order-related pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/account/account-centre/my-order",
      "/account/account-centre/my-order/order-history",
      "/account/account-centre/my-order/track-order",
      "/account/account-centre/my-order/payment-method"
    ]
  }'
```

---

## 7. Cart & Checkout Pages

### Cart & Checkout Flow
```bash
# Revalidate entire cart and checkout flow
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/cart",
      "/cart/checkout",
      "/cart/checkout/payment",
      "/cart/checkout/payment/transaction-status"
    ]
  }'
```

---

## 8. Authentication Pages

### Auth Pages
```bash
# Revalidate all auth pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/login",
      "/signup",
      "/forgot-password",
      "/auth/callback"
    ]
  }'
```

---

## 9. Search Page

### Search Page
```bash
# GET Method
curl "https://www.gulbhahar.com/api/revalidate?path=/search"

# POST Method
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/search"}'
```

---

## 10. Tag-Based Revalidation

### Available Cache Tags
- `products` - All product listings
- `product-{id}` - Individual product page (e.g., `product-P22172793603`)
- `collections` - All collection pages
- `collection-{slug}` - Individual collection page (e.g., `collection-punjabi-juttis`)
- `home` - Homepage data

### Revalidate by Tag
```bash
# Single tag
curl "https://www.gulbhahar.com/api/revalidate?tag=products"

# Multiple tags (POST)
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "tag",
    "tag": ["products", "collections", "home"]
  }'
```

### Revalidate Specific Product by Tag
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "tag", "tag": "product-P22172793603"}'
```

### Revalidate Specific Collection by Tag
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "tag", "tag": "collection-punjabi-juttis"}'
```

---

## 11. Batch Revalidation

### Revalidate All Product-Related Pages
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/",
      "/collections",
      "/juttis",
      "/suit",
      "/bags",
      "/sarees",
      "/lehenga"
    ]
  }'
```

### Revalidate Main Navigation Pages
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/",
      "/collections",
      "/about",
      "/heritage-culture",
      "/contact",
      "/faq"
    ]
  }'
```

---

## 12. Revalidate All

### Complete Site Revalidation
```bash
# Revalidate all cached data
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

This will revalidate:
- All tags: `products`, `collections`, `home`
- All paths: `/`, `/collections`, `/products`

---

## Common Use Cases

### When a Product is Updated
```bash
# Revalidate the specific product page and related listings
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/products/P22172793603",
      "/collections",
      "/"
    ]
  }'
```

### When a New Product is Added
```bash
# Revalidate all product listings and homepage
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "tag",
    "tag": ["products", "collections", "home"]
  }'
```

### When Collection is Updated
```bash
# Revalidate specific collection and main collections page
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "type": "path",
    "path": [
      "/collections/punjabi-juttis",
      "/collections"
    ]
  }'
```

### Content Update (About, FAQ, Policies)
```bash
# Revalidate specific static page
curl "https://www.gulbhahar.com/api/revalidate?path=/about"
```

### Emergency Full Site Refresh
```bash
# Nuclear option - revalidate everything
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Revalidated paths: /products/P22172793603",
  "revalidated": ["/products/P22172793603"],
  "timestamp": 1707234567890
}
```

### Error Response
```json
{
  "success": false,
  "message": "Invalid request. Provide either tag or path with type."
}
```

---

## Notes

1. **Secret Authentication**: Currently disabled in development. In production, add `secret` parameter if enabled.
2. **Path vs Tag**: Use `path` for specific URLs, `tag` for grouped content.
3. **Batch Operations**: Multiple paths/tags can be revalidated in a single request.
4. **GET Method**: Simpler for single path/tag revalidation.
5. **POST Method**: Required for multiple paths/tags or complex operations.

---

## Quick Reference

| Page Type | Example Path | Command |
|-----------|--------------|---------|
| Homepage | `/` | `curl "https://www.gulbhahar.com/api/revalidate?path=/"` |
| Product | `/products/{id}` | `curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"` |
| Collection | `/collections/{slug}` | `curl "https://www.gulbhahar.com/api/revalidate?path=/collections/punjabi-juttis"` |
| Parent Category | `/{category}` | `curl "https://www.gulbhahar.com/api/revalidate?path=/juttis"` |
| Static Page | `/{page}` | `curl "https://www.gulbhahar.com/api/revalidate?path=/about"` |
| All Products | - | `curl "https://www.gulbhahar.com/api/revalidate?tag=products"` |
| All Collections | - | `curl "https://www.gulbhahar.com/api/revalidate?tag=collections"` |
| Everything | - | `curl -X POST https://www.gulbhahar.com/api/revalidate -H "Content-Type: application/json" -d '{"type": "all"}'` |

---

## Automation Scripts

### Bash Script for Product Update
```bash
#!/bin/bash
PRODUCT_ID=$1
BASE_URL="https://www.gulbhahar.com"

curl -X POST $BASE_URL/api/revalidate \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"path\",
    \"path\": [\"/products/$PRODUCT_ID\", \"/collections\", \"/\"]
  }"
```

Usage: `./revalidate-product.sh P22172793603`

### Bash Script for Collection Update
```bash
#!/bin/bash
COLLECTION_SLUG=$1
BASE_URL="https://www.gulbhahar.com"

curl -X POST $BASE_URL/api/revalidate \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"path\",
    \"path\": [\"/collections/$COLLECTION_SLUG\", \"/collections\"]
  }"
```

Usage: `./revalidate-collection.sh punjabi-juttis`

---

## Testing Locally

Replace `https://www.gulbhahar.com` with `http://localhost:3000` for local testing:

```bash
# Local example
curl "http://localhost:3000/api/revalidate?path=/products/P22172793603"
```

---

**Last Updated**: February 2026
**API Version**: Next.js 14+ On-Demand Revalidation
