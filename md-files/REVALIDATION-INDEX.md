# Revalidation Documentation Index

Complete guide to cache revalidation for the Gulbhahar website.

## 📁 Documentation Files

### 1. [Revalidation.md](./Revalidation.md) - **Complete Documentation**
Comprehensive guide covering all revalidation scenarios:
- All page types and paths
- GET and POST methods
- Tag-based revalidation
- Batch operations
- Common use cases
- Response formats
- Automation examples

**Use this when**: You need detailed information about revalidation or want to understand all available options.

### 2. [Revalidation-Quick-Reference.md](./Revalidation-Quick-Reference.md) - **Cheat Sheet**
Fast reference for common commands:
- Quick command examples
- Common scenarios table
- All page paths list
- One-liner commands
- Local testing setup

**Use this when**: You need to quickly find a command without reading through full documentation.

### 3. [scripts/README.md](../scripts/README.md) - **Scripts Guide**
Guide for using the automation scripts:
- How to use each script
- Environment variables
- Examples
- Troubleshooting

**Use this when**: You want to use the convenient bash scripts instead of curl commands.

## 🛠️ Automation Scripts

Located in: `/scripts/`

### Available Scripts

| Script | Purpose | Example |
|--------|---------|---------|
| `revalidate-product.sh` | Revalidate product + related pages | `./scripts/revalidate-product.sh P22172793603` |
| `revalidate-collection.sh` | Revalidate collection pages | `./scripts/revalidate-collection.sh punjabi-juttis` |
| `revalidate-parent-category.sh` | Revalidate category pages | `./scripts/revalidate-parent-category.sh juttis` |
| `revalidate-homepage.sh` | Revalidate homepage | `./scripts/revalidate-homepage.sh` |
| `revalidate-all.sh` | Revalidate entire site | `./scripts/revalidate-all.sh` |

All scripts support the `BASE_URL` environment variable for testing.

## 🎯 Quick Start

### For Beginners
Start with the **scripts** - they're the easiest way to revalidate pages:

```bash
# Make scripts executable (one time)
chmod +x scripts/*.sh

# Revalidate a product
./scripts/revalidate-product.sh P22172793603

# Revalidate homepage
./scripts/revalidate-homepage.sh
```

### For Advanced Users
Use **curl commands** directly for more control:

```bash
# Single page
curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"

# Multiple pages
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": ["/", "/collections", "/about"]}'

# By tag
curl "https://www.gulbhahar.com/api/revalidate?tag=products"
```

## 📋 Common Tasks

### When You Update a Product
```bash
# Using script (recommended)
./scripts/revalidate-product.sh P22172793603

# Using curl
curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"
```

### When You Add Multiple Products
```bash
# Revalidate all product listings
curl "https://www.gulbhahar.com/api/revalidate?tag=products"
```

### When You Update the Homepage
```bash
# Using script
./scripts/revalidate-homepage.sh

# Using curl
curl "https://www.gulbhahar.com/api/revalidate?path=/"
```

### When You Update a Collection
```bash
# Using script
./scripts/revalidate-collection.sh punjabi-juttis

# Using curl
curl "https://www.gulbhahar.com/api/revalidate?path=/collections/punjabi-juttis"
```

### Emergency: Revalidate Everything
```bash
# Using script (has confirmation prompt)
./scripts/revalidate-all.sh

# Using curl
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

## 🧪 Testing Locally

Set the `BASE_URL` environment variable:

```bash
# For current session
export BASE_URL="http://localhost:3000"

# Then use any script or curl command
./scripts/revalidate-product.sh P22172793603
```

Or use curl directly:

```bash
curl "http://localhost:3000/api/revalidate?path=/products/P22172793603"
```

## 📊 Revalidation Strategies

### Path-Based Revalidation
Revalidates specific URLs:
- Best for: Individual pages, known paths
- Example: `/products/P22172793603`, `/about`, `/collections`

```bash
curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"
```

### Tag-Based Revalidation
Revalidates groups of pages:
- Best for: All products, all collections, related content
- Example: `products`, `collections`, `home`

```bash
curl "https://www.gulbhahar.com/api/revalidate?tag=products"
```

### Batch Revalidation
Revalidates multiple pages at once:
- Best for: Related pages that should update together
- Example: Product + Collections + Homepage

```bash
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": ["/products/P001", "/collections", "/"]}'
```

## 🔗 API Reference

### Endpoints
- **Production**: `https://www.gulbhahar.com/api/revalidate`
- **Local**: `http://localhost:3000/api/revalidate`

### Methods
- **GET**: Simple path or tag revalidation
- **POST**: Complex operations, multiple paths/tags

### Parameters
- `path`: URL path to revalidate (string or array)
- `tag`: Cache tag to revalidate (string or array)
- `type`: Operation type (`path`, `tag`, or `all`)
- `secret`: API secret (currently disabled)

### Available Cache Tags
- `products` - All product listings
- `product-{id}` - Specific product
- `collections` - All collections
- `collection-{slug}` - Specific collection
- `home` - Homepage

## 📝 Page Path Reference

### Main Pages
- `/` - Homepage
- `/collections` - Collections listing
- `/about` - About page
- `/contact` - Contact page
- `/faq` - FAQ page
- `/heritage-culture` - Heritage & Culture
- `/search` - Search page

### Dynamic Pages
- `/products/{productId}` - Product details
- `/collections/{slug}` - Collection page
- `/{parentCategory}` - Category page

### Parent Categories
- `/juttis`, `/suit`, `/bags`, `/sarees`, `/lehenga`

### Collections
- `/collections/juttis`
- `/collections/punjabi-juttis`
- `/collections/punjabi-juttis-for-ladies`
- `/collections/juttis-for-women`
- `/collections/bridal-juttis`

## 🆘 Troubleshooting

### Scripts not working
1. Check if scripts are executable: `chmod +x scripts/*.sh`
2. Verify you're in project root directory
3. Check if BASE_URL is set correctly

### Local testing not working
1. Ensure dev server is running: `npm run dev`
2. Set BASE_URL: `export BASE_URL="http://localhost:3000"`
3. Verify port number (3000 is default)

### Revalidation not taking effect
1. Check API response for errors
2. Verify the path/tag is correct
3. Clear browser cache
4. Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

## 📚 Additional Resources

- **API Implementation**: [src/app/api/revalidate/route.js](../src/app/api/revalidate/route.js)
- **Next.js Docs**: [On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#on-demand-revalidation)
- **Product Service**: [src/app/api/v0/product-service.js](../src/app/api/v0/product-service.js)

## 💡 Best Practices

1. **Use scripts for routine tasks** - They handle common scenarios automatically
2. **Use tags for bulk updates** - More efficient than individual paths
3. **Batch related pages** - Revalidate product + collections + homepage together
4. **Test locally first** - Always test with `BASE_URL=http://localhost:3000`
5. **Use type: "all" sparingly** - Only for major site-wide updates
6. **Automate in CI/CD** - Include revalidation in deployment pipelines

## 🎨 Workflow Examples

### Content Team: Updating Product Information
1. Update product in database/CMS
2. Run: `./scripts/revalidate-product.sh PRODUCT_ID`
3. Verify changes on website

### Marketing Team: Adding New Collection
1. Create new collection
2. Add products to collection
3. Run: `./scripts/revalidate-collection.sh COLLECTION_SLUG`
4. Run: `curl "https://www.gulbhahar.com/api/revalidate?tag=products"`

### Dev Team: After Deployment
1. Deploy code changes
2. If layout/global changes: `./scripts/revalidate-all.sh`
3. If specific features: Revalidate affected paths only

### During Site Maintenance
1. Make multiple updates
2. Collect all affected paths
3. Run batch revalidation with all paths
4. Verify all changes together

---

## 🚀 Getting Started Checklist

- [ ] Read [Revalidation-Quick-Reference.md](./Revalidation-Quick-Reference.md)
- [ ] Make scripts executable: `chmod +x scripts/*.sh`
- [ ] Test locally: Set `BASE_URL=http://localhost:3000`
- [ ] Try revalidating homepage: `./scripts/revalidate-homepage.sh`
- [ ] Bookmark this index for quick access
- [ ] Share documentation with team

---

**Last Updated**: February 2026
**Maintained By**: Development Team
**Questions?** Check the documentation files or contact the dev team.
