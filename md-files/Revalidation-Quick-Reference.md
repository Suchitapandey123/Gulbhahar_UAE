# Revalidation Quick Reference

Fast reference for common revalidation tasks.

## 🚀 Quick Commands

### Scripts (Recommended)
```bash
# Product
./scripts/revalidate-product.sh P22172793603

# Collection
./scripts/revalidate-collection.sh punjabi-juttis

# Category
./scripts/revalidate-parent-category.sh juttis

# Homepage
./scripts/revalidate-homepage.sh

# Everything (with confirmation)
./scripts/revalidate-all.sh
```

### Direct cURL (Single Pages)
```bash
# Homepage
curl "https://www.gulbhahar.com/api/revalidate?path=/"

# Product
curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"

# Collection
curl "https://www.gulbhahar.com/api/revalidate?path=/collections/punjabi-juttis"

# Category
curl "https://www.gulbhahar.com/api/revalidate?path=/juttis"

# Static Page
curl "https://www.gulbhahar.com/api/revalidate?path=/about"
```

### Direct cURL (Multiple Pages)
```bash
# Multiple products
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": ["/products/P001", "/products/P002"]}'

# All products via tag
curl "https://www.gulbhahar.com/api/revalidate?tag=products"

# Multiple tags
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "tag", "tag": ["products", "collections", "home"]}'
```

## 📋 Common Scenarios

| When You... | Run This... |
|-------------|-------------|
| Update a product | `./scripts/revalidate-product.sh PRODUCT_ID` |
| Add new products | `curl "https://www.gulbhahar.com/api/revalidate?tag=products"` |
| Update collection | `./scripts/revalidate-collection.sh SLUG` |
| Update category | `./scripts/revalidate-parent-category.sh CATEGORY` |
| Change homepage | `./scripts/revalidate-homepage.sh` |
| Update About page | `curl "https://www.gulbhahar.com/api/revalidate?path=/about"` |
| Major site update | `./scripts/revalidate-all.sh` |

## 🏷️ Available Tags

```bash
# All products
curl "https://www.gulbhahar.com/api/revalidate?tag=products"

# All collections
curl "https://www.gulbhahar.com/api/revalidate?tag=collections"

# Homepage
curl "https://www.gulbhahar.com/api/revalidate?tag=home"

# Specific product
curl "https://www.gulbhahar.com/api/revalidate?tag=product-P22172793603"

# Specific collection
curl "https://www.gulbhahar.com/api/revalidate?tag=collection-punjabi-juttis"
```

## 🌐 All Page Paths

### Main Pages
```
/                               # Homepage
/collections                    # Collections page
/about                          # About page
/contact                        # Contact page
/faq                            # FAQ page
/heritage-culture              # Heritage & Culture
/search                         # Search page
```

### Dynamic Pages
```
/products/{id}                  # Product detail
/collections/{slug}             # Collection page
/{parentCategory}               # Category page (juttis, suit, bags, etc.)
```

### Collections
```
/collections/juttis
/collections/punjabi-juttis
/collections/punjabi-juttis-for-ladies
/collections/juttis-for-women
/collections/bridal-juttis
```

### Parent Categories
```
/juttis
/suit
/bags
/sarees
/lehenga
```

### Policy Pages
```
/privacy-policy
/terms-condition
/refund-policy
/cookies-policy
/delivery-shipping-policy
```

### Account Pages
```
/account
/account/account-centre
/account/account-centre/profile
/account/account-centre/settings
/account/account-centre/security
/account/account-centre/my-order
/account/account-centre/my-order/order-history
/account/account-centre/my-order/track-order
/account/account-centre/my-order/payment-method
```

### Cart & Checkout
```
/cart
/cart/checkout
/cart/checkout/payment
/cart/checkout/payment/transaction-status
```

### Auth Pages
```
/login
/signup
/forgot-password
/auth/callback
```

## 🔥 One-Liners

### Revalidate all juttis-related pages
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate -H "Content-Type: application/json" -d '{"type":"path","path":["/juttis","/collections/juttis","/collections/punjabi-juttis","/collections/punjabi-juttis-for-ladies","/collections/juttis-for-women","/collections/bridal-juttis"]}'
```

### Revalidate all main pages
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate -H "Content-Type: application/json" -d '{"type":"path","path":["/","/collections","/about","/contact","/faq"]}'
```

### Revalidate all policy pages
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate -H "Content-Type: application/json" -d '{"type":"path","path":["/privacy-policy","/terms-condition","/refund-policy","/cookies-policy","/delivery-shipping-policy"]}'
```

### Revalidate everything
```bash
curl -X POST https://www.gulbhahar.com/api/revalidate -H "Content-Type: application/json" -d '{"type":"all"}'
```

## 🧪 Local Testing

```bash
# Set environment variable
export BASE_URL="http://localhost:3000"

# Use scripts (they respect BASE_URL)
./scripts/revalidate-product.sh P22172793603

# Or use curl directly
curl "http://localhost:3000/api/revalidate?path=/products/P22172793603"
```

## 📚 More Information

- **Full Documentation**: [Revalidation.md](./Revalidation.md)
- **Scripts README**: [scripts/README.md](../scripts/README.md)
- **API Implementation**: [src/app/api/revalidate/route.js](../src/app/api/revalidate/route.js)

---

**Pro Tip**: Bookmark this file for quick access to revalidation commands!
