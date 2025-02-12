'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, ArrowLeft } from 'lucide-react'
// import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'


const getProductData = (id) => ({
  id,
  name: 'Noorani Jutti',
  category: 'Noorani Jutti FOR WOMEN',
  price: 5500,
  originalPrice: 10000,
  discount: '75% OFF',
  colors: ['/16.svg', '/16.svg', '/16.svg'],
  sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
  images: ['/16.svg', '/16.svg', '/16.svg', '/16.svg'],
  overview:[`Casual shoes for women come in an endless number of styles which are constantly updated according to various fashion trends and pop culture influences.Any women who loves shoes knoes that they can make or break an outfit.If there is a shoe for every foot, then there is also a pair of womens casual shoes for every occasion`],
  details: [
    'Wipe with a clean dry cloth when needed',
    'Memory foam inside',
    'Lace fastening',
    '45-day warranty against manufacturing defects',
    'PU uppwe',
    'Package contain 1 pair of shoes',
    'EVA sole',
    'Product Code: P12344'
  ],
  rating: 4.8,
  reviews: [
    { stars: 5, count: 28 },
    { stars: 4, count: 9 },
    { stars: 3, count: 7 },
    { stars: 2, count: 4 },
    { stars: 1, count: 0 }
  ],
  reviewComments: [
    {
      user: 'user1',
      rating: 5,
      comment: 'Excellent running shoes. It was very sturdy on the foot',
      date: '2024-03-20'
    },
    {
      user: 'user 2',
      rating: 5,
      comment: 'Excellent running shoes. It was very sturdy on the foot',
      date: '2024-03-19'
    }
  ]
})

export default function ProductDetails() {
  const {id} = useParams()
  console.log(id)

  const router = useRouter()
  const product = getProductData(id)
  const [selectedSize, setSelectedSize] = useState('')
  const [mainImage, setMainImage] = useState(product.images[0])
  const [pincode, setPincode] = useState('')

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square relative rounded border ${
                    mainImage === img ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <div>
            <h3 className="font-bold mb-4 mt-12 font-raleway">Overview</h3>
              <p className="space-y-1 text-sm font-raleway text-gray-500">
                {product.overview}
              </p>
              <h3 className="font-bold mb-2 font-raleway mt-2">Product Details</h3>
              <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold font-raleway">{product.name}</h1>
              <p className="text-gray-600 font-raleway">{product.category}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl text-customPaleYellow font-extralight">₹{product.price}</span>
              <span className="text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
              <span className="font-medium font-raleway text-customRed">({product.discount})</span>
            </div>

           
            <div>
              <h3 className="text-sm font-medium mb-2 font-raleway">Color : {`blue`}</h3>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="w-[88px] h-[109px] rounded-lg border-2 border-gray-200 overflow-hidden shadow-lg"
                  >
                    <Image
                      src={color}
                      alt={`Color ${idx + 1}`}
                      width={52}
                      height={52}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

           
            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm border rounded  ${
                      selectedSize === size
                        ? 'border-black bg-customPaleYellow text-white'
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

           
            <div>
              <h3 className="text-sm font-medium mb-2 font-raleway">Delivery to</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="px-3 py-2 border rounded-md flex-1 font-raleway"
                />
                {/* <Button variant="outline">Check</Button> */}
              </div>
            </div>

            
            <div className="flex gap-4">
              {/* <Button
                onClick={handleAddToCart}
                className="flex-1 bg-black font-raleway shadow-lg rounded-md text-white hover:bg-black/90"
              >
                Add to cart
              </Button> */}
              {/* <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button> */}
            </div>
            {/* <div>
            <h3 className="font-medium mb-2 font-raleway">Overview</h3>
              <p className="space-y-1 text-sm font-raleway text-gray-500">
                {product.overview}
              </p>
              <h3 className="font-medium mb-2 font-raleway mt-2">Product Details</h3>
              <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div> */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-medium font-raleway">Review</h3>
                <div className="flex items-center gap-1 font-raleway">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-5 h-5 ${
                          idx < Math.floor(product.rating)
                            ? 'fill-customPaleYellow text-customPaleYellow'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium font-raleway">{product.rating}</span>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {product.reviews.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-3 font-raleway">{stars}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-customPaleYellow"
                        style={{
                          width: `${(count / 48) * 100}%`
                        }}
                      />
                    </div>
                    <span className="w-12 text-sm text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 font-raleway">
                {product.reviewComments.map((review, idx) => (
                  <div key={idx} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 ${
                              idx < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <p className="text-sm font-medium mt-1">{review.user}</p>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

