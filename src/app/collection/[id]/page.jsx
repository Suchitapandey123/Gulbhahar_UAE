// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { Star, Heart, ArrowLeft } from 'lucide-react'
// import { useParams, useRouter } from 'next/navigation'
// import Breadcrumb from '@/components/Breadcrumb'


// const getProductData = (id) => ({
//   id,
//   name: 'Noorani Jutti',
//   category: 'Noorani Jutti FOR WOMEN',
//   price: 5500,
//   originalPrice: 10000,
//   discount: '75% OFF',
//   colors: ['/16.svg', '/16.svg', '/16.svg'],
//   sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
//   images: ['/16.svg', '/16.svg', '/16.svg', '/16.svg'],
//   overview:[`Casual shoes for women come in an endless number of styles which are constantly updated according to various fashion trends and pop culture influences.Any women who loves shoes knoes that they can make or break an outfit.If there is a shoe for every foot, then there is also a pair of womens casual shoes for every occasion`],
//   details: [
//     'Wipe with a clean dry cloth when needed',
//     'Memory foam inside',
//     'Lace fastening',
//     '45-day warranty against manufacturing defects',
//     'PU uppwe',
//     'Package contain 1 pair of shoes',
//     'EVA sole',
//     'Product Code: P12344'
//   ],
//   rating: 4.8,
//   reviews: [
//     { stars: 5, count: 28 },
//     { stars: 4, count: 9 },
//     { stars: 3, count: 7 },
//     { stars: 2, count: 4 },
//     { stars: 1, count: 0 }
//   ],
//   reviewComments: [
//     {
//       user: 'user1',
//       rating: 5,
//       comment: 'Excellent running shoes. It was very sturdy on the foot',
//       date: '2024-03-20'
//     },
//     {
//       user: 'user 2',
//       rating: 5,
//       comment: 'Excellent running shoes. It was very sturdy on the foot',
//       date: '2024-03-19'
//     }
//   ]
// })

// export default function ProductDetails() {
//   const {id} = useParams()
//   console.log(id)

//   const router = useRouter()
//   const product = getProductData(id)
//   const [selectedSize, setSelectedSize] = useState('')
//   const [mainImage, setMainImage] = useState(product.images[0])
//   const [pincode, setPincode] = useState('')

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert('Please select a size')
//       return;
//     }
    
//   }



//   return (
//     <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      
//       <div className="max-w-7xl mx-auto mt-24">
//       <div className="lg:-ml-[70px] lg:mb-4">
//       <Breadcrumb/>
//       </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
//           <div className="space-y-4">
//             <div className="aspect-square relative rounded-lg overflow-hidden border lg:-ml-[50px]">
//               <Image
//                 src={mainImage}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//             <div className="grid grid-cols-4 gap-2 lg:-ml-12">
//               {product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setMainImage(img)}
//                   className={`aspect-square relative rounded border ${
//                     mainImage === img ? 'border-black' : 'border-gray-200'
//                   }`}
//                 >
//                   <Image
//                     src={img}
//                     alt={`${product.name} ${idx + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//             <div>
//             <h3 className="font-bold mb-4 mt-12 font-raleway lg:-ml-12 text-lg">Overview</h3>
//               <p className="space-y-1 text-sm font-raleway text-gray-500 lg:-ml-12">
//                 {product.overview}
//               </p>
//               <h3 className="font-bold mb-2 font-raleway mt-2 lg:-ml-12">Product Details</h3>
//               <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc lg:-ml-12">
//                 {product.details.map((detail, idx) => (
//                   <li key={idx}>{detail}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

          
//           <div className="space-y-6 lg:ml-16">
//             <div>
//               <h1 className="text-2xl font-semibold font-raleway">{product.name}</h1>
//               <p className="text-gray-600 font-raleway">{product.category}</p>
//             </div>

//             <div className="flex items-center gap-4">
//               <span className="text-2xl text-customPaleYellow font-extralight">₹{product.price}</span>
//               <span className="text-gray-500 line-through">MRP ₹{product.originalPrice}</span>
//               <span className="font-medium font-raleway text-customRed">({product.discount})</span>
//             </div>

           
//             <div>
//               <h3 className="text-sm font-medium mb-2 font-raleway">Color : {`blue`}</h3>
//               <div className="flex gap-2">
//                 {product.colors.map((color, idx) => (
//                   <button
//                     key={idx}
//                     className="w-[88px] h-[109px] rounded-lg border-2 border-gray-200 overflow-hidden shadow-lg"
//                   >
//                     <Image
//                       src={color}
//                       alt={`Color ${idx + 1}`}
//                       width={52}
//                       height={52}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

           
//             <div>
//               <h3 className="text-sm font-medium mb-2">Size</h3>
//               <div className="grid grid-cols-6 gap-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`py-2 text-sm border rounded font-raleway hover:bg-yellowTwo  ${
//                       selectedSize === size
//                         ? 'border-black bg-customPaleYellow text-white'
//                         : 'border-gray-200 hover:border-customYellow'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

           
//             <div>
//               <h3 className="text-sm font-medium mb-2 font-raleway">Delivery to</h3>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                   placeholder="Enter pincode"
//                   className="px-3 py-2 border rounded-md flex-1 font-raleway"
//                 />
//                 {/* <Button variant="outline">Check</Button> */}
//               </div>
//             </div>

            
//             <div className="flex gap-4">
//               {/* <Button
//                 onClick={handleAddToCart}
//                 className="flex-1 bg-black font-raleway shadow-lg rounded-md text-white hover:bg-black/90"
//               >
//                 Add to cart
//               </Button> */}
//               {/* <Button variant="outline" size="icon">
//                 <Heart className="h-5 w-5" />
//               </Button> */}
//             </div>
//             {/* <div>
//             <h3 className="font-medium mb-2 font-raleway">Overview</h3>
//               <p className="space-y-1 text-sm font-raleway text-gray-500">
//                 {product.overview}
//               </p>
//               <h3 className="font-medium mb-2 font-raleway mt-2">Product Details</h3>
//               <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc">
//                 {product.details.map((detail, idx) => (
//                   <li key={idx}>{detail}</li>
//                 ))}
//               </ul>
//             </div> */}
//             <div>
//               <div className="flex items-center gap-4 mb-4">
//                 <h3 className="font-medium font-raleway">Review</h3>
//                 <div className="flex items-center gap-1 font-raleway">
//                   <div className="flex">
//                     {[...Array(5)].map((_, idx) => (
//                       <Star
//                         key={idx}
//                         className={`w-5 h-5 ${
//                           idx < Math.floor(product.rating)
//                             ? 'fill-customPaleYellow text-customPaleYellow'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-lg font-medium font-raleway">{product.rating}</span>
//                 </div>
//               </div>
//               <div className="space-y-2 mb-6">
//                 {product.reviews.map(({ stars, count }) => (
//                   <div key={stars} className="flex items-center gap-2">
//                     <span className="w-3 font-raleway">{stars}</span>
//                     <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-customPaleYellow"
//                         style={{
//                           width: `${(count / 48) * 100}%`
//                         }}
//                       />
//                     </div>
//                     <span className="w-12 text-sm text-gray-600">{count}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="space-y-4 font-raleway">
//                 {product.reviewComments.map((review, idx) => (
//                   <div key={idx} className="border-b pb-4">
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="flex">
//                         {[...Array(5)].map((_, idx) => (
//                           <Star
//                             key={idx}
//                             className={`w-4 h-4 ${
//                               idx < review.rating
//                                 ? 'fill-yellow-400 text-yellow-400'
//                                 : 'text-gray-300'
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-gray-600">{review.date}</span>
//                     </div>
//                     <p className="text-sm font-medium mt-1">{review.user}</p>
//                     <p className="text-sm text-gray-600">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'

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

const similarProducts = [
  {
    id: 1,
    name: 'Noorani Jutti',
    price: 5000,
    rating: 5,
    image: '/16.svg',
    itemsLeft: 2
  },
  {
    id: 2,
    name: 'Noorani Jutti',
    price: 5000,
    rating: 5,
    image: '/16.svg',
    itemsLeft: 3
  },
  {
    id: 3,
    name: 'Noorani Jutti',
    price: 5000,
    rating: 5,
    image: '/16.svg',
    itemsLeft: 2
  }
]

export default function ProductDetails() {
  const {id} = useParams()
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
        <div className="lg:-ml-[70px] lg:mb-4">
          <Breadcrumb/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column with images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border lg:-ml-[50px]">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 lg:-ml-12">
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
              <h3 className="font-bold mb-4 mt-12 font-raleway lg:-ml-12 text-lg">Overview</h3>
              <p className="space-y-1 text-sm font-raleway text-gray-500 lg:-ml-12">
                {product.overview}
              </p>
              <h3 className="font-bold mb-2 font-raleway mt-2 lg:-ml-12">Product Details</h3>
              <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc lg:-ml-12">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column with product details */}
          <div className="space-y-6 lg:ml-16">
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
                    className={`py-2 text-sm border rounded font-raleway hover:bg-yellowTwo  ${
                      selectedSize === size
                        ? 'border-black bg-customPaleYellow text-white'
                        : 'border-gray-200 hover:border-customYellow'
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
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black font-raleway shadow-lg rounded-md text-white hover:bg-black/90 py-2"
              >
                Add to cart
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-50">
                <Heart className="h-5 w-5" />
              </button>
            </div>

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
        <div className="mt-24 font-raleway lg:-ml-16">
          <h2 className="text-2xl mb-6">You might be interested in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {similarProducts.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                
                <div className="relative mb-4">
                  <Image
                    src="/23.svg"
                    alt={item.name}
                    width={126}
                    height={142}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-customYellow text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">₹{item.price}</span>
                    <span className="text-sm text-gray-500">({item.itemsLeft} items left)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 prose max-w-none lg:-ml-16 font-raleway">
          <h2 className="text-2xl mb-6">Women's Casual Shoes You Need To Own</h2>
          <p className="mb-6">
            Casual shoes for women come in an endless number of styles, which are constantly updated according to
            various fashion trends and pop culture influences. Any woman who loves shoes knows that they can make or
            break an outfit. If there is a shoe for every foot, then there is also a pair of women's casual shoes for every
            occasion.
          </p>
          <p className="mb-6">
            This is the best time to buy women casual shoes because brands thrive on creating as many imaginative
            variations as possible. There is always a good reason to pick up a pair of women casual shoes, whether for an
            event or just to give your mood a lift. Further, shopping for casual shoes for women online now gives you the
            freedom of browsing through several brands at once.
          </p>
          <h3 className="text-xl font-raleway  mb-4">Flat + Heels, Black Soft Synthetic High-Top Flat Boots</h3>
          <p className="mb-6 font-raleway">
            Gold hardware on the front of these boots makes them the perfect dressy boot. These women casual shoes will
            look great with fitted jeans or A line skirt with tights.
          </p>
          <h3 className="text-xl font-raleway mb-4">Carlton London, Blue Printed Textured Ballerinas</h3>
          <p className="mb-6 font-raleway">
            Every woman should own a ballerina pair with other women casual shoes. They are simple, comfortable and
            always in style.
          </p>
          <h3 className="text-xl mb-4">DressBerry, Metallic Brown Sneakers</h3>
          <p>
            The trend of velvety-metallic finish sneakers is all the rage right now in women casual shoes. This pair would
            couple well with dark skinny jeans and an off-shoulder Bardot top.
          </p>
        </div>
      </div>
    </div>
  )
}