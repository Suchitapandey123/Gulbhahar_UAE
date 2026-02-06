#!/bin/bash

# Revalidate Homepage Script
# Usage: ./scripts/revalidate-homepage.sh

BASE_URL="${BASE_URL:-https://www.gulbhahar.com}"

echo "Revalidating homepage"
echo "Base URL: $BASE_URL"
echo ""

curl -X POST "$BASE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/"}'

echo ""
echo "Done!"
