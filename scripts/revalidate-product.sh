#!/bin/bash

# Revalidate Product Script
# Usage: ./scripts/revalidate-product.sh P22172793603

if [ -z "$1" ]; then
  echo "Error: Product ID is required"
  echo "Usage: $0 PRODUCT_ID"
  echo "Example: $0 P22172793603"
  exit 1
fi

PRODUCT_ID=$1
BASE_URL="${BASE_URL:-https://www.gulbhahar.com}"

echo "Revalidating product: $PRODUCT_ID"
echo "Base URL: $BASE_URL"
echo ""

curl -X POST "$BASE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"path\",
    \"path\": [\"/products/$PRODUCT_ID\", \"/collections\", \"/\"]
  }"

echo ""
echo "Done!"
