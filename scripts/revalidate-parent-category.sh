#!/bin/bash

# Revalidate Parent Category Script
# Usage: ./scripts/revalidate-parent-category.sh juttis

if [ -z "$1" ]; then
  echo "Error: Parent category is required"
  echo "Usage: $0 PARENT_CATEGORY"
  echo "Example: $0 juttis"
  echo ""
  echo "Available categories: juttis, suit, bags, sarees, lehenga"
  exit 1
fi

PARENT_CATEGORY=$1
BASE_URL="${BASE_URL:-https://www.gulbhahar.com}"

echo "Revalidating parent category: $PARENT_CATEGORY"
echo "Base URL: $BASE_URL"
echo ""

curl -X POST "$BASE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"path\",
    \"path\": [\"/$PARENT_CATEGORY\", \"/collections\", \"/\"]
  }"

echo ""
echo "Done!"
