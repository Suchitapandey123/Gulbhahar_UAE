# Revalidation Scripts

Collection of bash scripts to easily revalidate cached pages on the Gulbhahar website.

## Available Scripts

### 1. Revalidate Product
Revalidates a specific product page along with related pages (collections and homepage).

```bash
./scripts/revalidate-product.sh P22172793603
```

### 2. Revalidate Collection
Revalidates a specific collection page and the main collections page.

```bash
./scripts/revalidate-collection.sh punjabi-juttis
```

### 3. Revalidate Parent Category
Revalidates a parent category page (juttis, suit, bags, sarees, lehenga).

```bash
./scripts/revalidate-parent-category.sh juttis
```

Available categories:
- `juttis`
- `suit`
- `bags`
- `sarees`
- `lehenga`

### 4. Revalidate Homepage
Revalidates the homepage.

```bash
./scripts/revalidate-homepage.sh
```

### 5. Revalidate All
Revalidates ALL cached data on the entire site (use with caution).

```bash
./scripts/revalidate-all.sh
```

This will prompt for confirmation before proceeding.

## Environment Variables

### BASE_URL
Set the base URL for the revalidation API. Defaults to production (`https://www.gulbhahar.com`).

**For local testing:**
```bash
export BASE_URL="http://localhost:3000"
./scripts/revalidate-product.sh P22172793603
```

**For production:**
```bash
# Use default (no need to set BASE_URL)
./scripts/revalidate-product.sh P22172793603

# Or explicitly set it
export BASE_URL="https://www.gulbhahar.com"
./scripts/revalidate-product.sh P22172793603
```

## Examples

### Update a Product
When you update a product in the database:
```bash
./scripts/revalidate-product.sh P22172793603
```

### Update a Collection
When you update a collection:
```bash
./scripts/revalidate-collection.sh bridal-juttis
```

### Add New Products to a Category
When you add new products to a category:
```bash
./scripts/revalidate-parent-category.sh juttis
```

### Update Homepage Content
When you update homepage content or featured products:
```bash
./scripts/revalidate-homepage.sh
```

### Emergency Full Cache Clear
When you need to clear all caches (e.g., after major site update):
```bash
./scripts/revalidate-all.sh
```

## Testing Locally

All scripts respect the `BASE_URL` environment variable:

```bash
# Test on local development server
export BASE_URL="http://localhost:3000"

# Now all scripts will use localhost
./scripts/revalidate-product.sh P22172793603
./scripts/revalidate-collection.sh punjabi-juttis
./scripts/revalidate-homepage.sh
```

## Permissions

If you get a "permission denied" error, make sure the scripts are executable:

```bash
chmod +x scripts/*.sh
```

## Response Format

All scripts will output a JSON response from the API:

**Success:**
```json
{
  "success": true,
  "message": "Revalidated paths: /products/P22172793603, /collections, /",
  "revalidated": ["/products/P22172793603", "/collections", "/"],
  "timestamp": 1707234567890
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Troubleshooting

### Script not found
Make sure you're in the project root directory:
```bash
cd /Users/akash/Desktop/EverythingIsHere/Gulbhahar_website
./scripts/revalidate-product.sh P22172793603
```

### Permission denied
Make scripts executable:
```bash
chmod +x scripts/*.sh
```

### Connection refused (local testing)
Make sure your development server is running:
```bash
npm run dev
```

Then set BASE_URL and run the script:
```bash
export BASE_URL="http://localhost:3000"
./scripts/revalidate-product.sh P22172793603
```

## See Also

- [Complete Revalidation Documentation](../md-files/Revalidation.md) - Comprehensive guide with all curl commands
- [API Route](../src/app/api/revalidate/route.js) - Revalidation API implementation
