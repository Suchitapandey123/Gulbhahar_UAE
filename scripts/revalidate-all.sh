#!/bin/bash

# Revalidate All Script
# Usage: ./scripts/revalidate-all.sh

BASE_URL="${BASE_URL:-https://www.gulbhahar.com}"

echo "WARNING: This will revalidate ALL cached data on the site."
echo "Base URL: $BASE_URL"
echo ""
read -p "Are you sure you want to continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 0
fi

echo "Revalidating all cached data..."
echo ""

curl -X POST "$BASE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'

echo ""
echo "Done!"
