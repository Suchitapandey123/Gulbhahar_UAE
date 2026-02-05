
## Products with Product id
POST:
curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/products/P22172793603"}'
GET (simpler):


curl "https://www.gulbhahar.com/api/revalidate?path=/products/P22172793603"



## HOME PAGE
 curl -X POST https://www.gulbhahar.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"type": "path", "path": "/"}'                                   


