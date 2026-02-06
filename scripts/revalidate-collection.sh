#!/bin/bash

# Revalidate Collection Script
# Usage: ./scripts/revalidate-collection.sh punjabi-juttis

if [ -z "$1" ]; then
  echo "Error: Collection slug is required"
  echo "Usage: $0 COLLECTION_SLUG"
  echo "Example: $0 punjabi-juttis"
  exit 1
fi

COLLECTION_SLUG=$1
BASE_URL="${BASE_URL:-https://www.gulbhahar.com}"

echo "Revalidating collection: $COLLECTION_SLUG"
echo "Base URL: $BASE_URL"
echo ""

curl -X POST "$BASE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d "{
    \"type\": \"path\",
    \"path\": [\"/collections/$COLLECTION_SLUG\", \"/collections\"]
  }"

echo ""
echo "Done!"
