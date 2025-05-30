"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, Star, ThumbsUp, ThumbsDown, User, Package, Truck, ChevronRight, Home } from "lucide-react";
import Breadcrumb from "@/app/account/components/Breadcrumb";

export function ProductClient({ product, similarProducts }) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [pincode, setPincode] = useState("");
  const [userRating, setUserRating] = useState(4);
  const [selectedColor, setSelectedColor] = useState("green");
  const [sortOrder, setSortOrder] = useState("Newest");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    router.push("/cart");
  };

  const sortedReviews = [...product.reviewComments].sort((a, b) => {
    return sortOrder === "Newest"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="min-h-screen bg-white py-4 mt-10 sm:mt-0 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 font-raleway">
      <div className="max-w-[1600px] mx-auto mt-6 sm:mt-10 md:mt-24">
        {/* Breadcrumb */}
        <div className="mb-4 lg:mb-6">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto pb-1">
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hover:text-red-900 cursor-pointer whitespace-nowrap">Shop</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hover:text-red-900 cursor-pointer whitespace-nowrap max-w-[80px] sm:max-w-none truncate" title={product.category}>
                {product.category}
              </span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-gray-900 font-medium whitespace-nowrap max-w-[100px] sm:max-w-[200px] lg:max-w-none truncate" title={product.name}>
                {product.name}
              </span>
            </div>
          </nav>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            
            <div className="aspect-square relative rounded-lg overflow-hidden border md:h-[500px] lg:h-[625px] bg-gray-100 flex items-center justify-center">
              {/* <Package className="w-32 h-32 text-gray-400" /> */}
              
               <Image
      src="/assets/Image/About1.png" 
      alt="Description of image"
      className="object-cover w-full h-full scale-150"
      width={1000}              
      height={700}            
    />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square relative rounded border transition-all duration-200 bg-gray-100 flex items-center justify-center ${
                    mainImage === img
                      ? "border-red-900 ring-2 ring-red-900 ring-opacity-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                >
                  {/* <Package className="w-8 h-8 text-gray-400" /> */}
                  <Image
                    src="/assets/Image/About1.png"
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover w-full h-full"
                    width={1000}
                    height={700}
                    />
                </button>
              ))}
            </div>

            {/* Product Details - Mobile/Tablet */}
            <div className="lg:hidden mt-8">
              <h3 className="font-bold mb-4 text-lg text-gray-900">Overview</h3>
              <p className="text-sm text-gray-600 mb-4">{product.overview}</p>
              
              <h3 className="font-bold mb-2 text-gray-900">Product Details</h3>
              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pl-16 py-2">
            {/* Product Title */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.category}</p>
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8">
              <span className="text-2xl sm:text-3xl lg:text-4xl text-red-900 font-light">
                ₹{product.price}
              </span>
              <span className="text-gray-500 flex items-center text-lg sm:text-xl">
                MRP
                <span className="line-through pl-2">₹{product.originalPrice}</span>
              </span>
              <span className="font-medium text-red-900 text-lg sm:text-xl">
                ({product.discount})
              </span>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3 flex flex-wrap items-center gap-2">
                Color:
                <span className="text-gray-500 text-sm">blue</span>
              </h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className={`w-16 h-20 sm:w-20 sm:h-24 lg:w-[88px] lg:h-[109px] rounded-lg overflow-hidden shadow-md transition-all duration-200 ${
                      selectedColor === color
                        ? "border-4 border-red-900 shadow-lg"
                        : "shadow-md hover:shadow-lg"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      {/* <Package className="w-8 h-8 text-gray-500" /> */}
                      <Image
                        src="/assets/Image/About1.png" // Assuming images are named by color
                        alt={color}
                        className="object-cover w-full h-full scale-150"
                        width={1000}
                        height={700}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Size</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-w-sm">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-1 text-sm border rounded transition-all duration-200 hover:bg-red-50 ${
                      selectedSize === size
                        ? "border-red-900 bg-red-900 text-white shadow-md"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-red-900 text-sm mt-2 cursor-pointer hover:underline">
                Size Guide
              </p>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Delivery to</h3>
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                  className="px-3 py-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent"
                />
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-red-900 text-sm">
                  Delivery by 31st January, Friday |
                  <span className="text-gray-400 line-through ml-2">Free ₹60</span>
                </p>
                <p className="text-gray-400 text-sm">If order before 9:30 P.M</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              {/* Add to Cart + Wishlist */}
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white rounded-[15px] h-16 sm:h-20 shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-base sm:text-lg ml-2">Add To Cart</span>
                </button>

                <button className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-[15px] hover:bg-gray-50 transition-colors duration-200">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-900" />
                </button>
              </div>

              {/* Free Delivery Info */}
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <Truck className="w-6 h-6 text-red-900 flex-shrink-0" />
                <span className="text-red-900 text-sm font-medium">
                  Free delivery on orders above ₹500.00
                </span>
              </div>
            </div>

            {/* Product Details - Desktop Only */}
            <div className="hidden lg:block">
              <h3 className="font-bold mb-4 text-lg text-gray-900">Overview</h3>
              <p className="text-sm text-gray-600 mb-4">{product.overview}</p>
              
              <h3 className="font-bold mb-2 text-gray-900">Product Details</h3>
              <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="mt-12 lg:mt-16">
              <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-6">
                Reviews
              </h3>

              {/* Rating Overview */}
              <div className="border-l-2 border-gray-200 pl-4 sm:pl-6 lg:pl-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          onClick={() => setUserRating(idx + 1)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 cursor-pointer ${
                            idx < userRating ? "fill-red-900 text-red-900" : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium ml-2 sm:ml-4">
                      {userRating || product.rating}
                    </span>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-3 my-8">
                  {product.reviews.map(({ stars, count }) => (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="w-3 text-sm font-medium">{stars}</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-900 transition-all duration-300"
                          style={{ width: `${(count / 48) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-sm text-gray-600 font-medium">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="mb-6">
                  <div className="relative inline-block">
                    <select
                      className="appearance-none border border-gray-300 rounded-lg py-2 px-3 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent w-32 sm:w-40"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="Newest">Newest</option>
                      <option value="Oldest">Oldest</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {sortedReviews.map((review, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0">
                      {/* Review Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <p className="text-sm sm:text-base font-medium text-gray-900">
                            {review.user}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 sm:ml-auto">
                          {review.date}
                        </span>
                      </div>

                      {/* Review Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-gray-500">Rating:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                idx < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Comment */}
                      <p className="text-sm text-gray-700 mb-4">{review.comment}</p>

                      {/* Review Actions */}
                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-red-900 hover:text-red-700 transition-colors">
                          Reply
                        </button>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>10</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="w-4 h-4" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interested Products Section */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            You might be interested in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* <Package className="w-16 h-16 text-gray-400" /> */}
                    <Image
                      src="/assets/Image/About2.png" // Assuming images are named by item.id
                      alt={item.name}
                      className="object-cover w-full h-full "
                      width={1000}
                      height={700}
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-gray-300 text-gray-300" />
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="font-semibold text-lg text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-red-900">
                        ({item.itemsLeft} items left)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-12 lg:mt-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <h3 className="text-xl sm:text-2xl font-medium mx-4 text-gray-900">
              Similar Products
            </h3>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-4 lg:grid lg:grid-cols-4 lg:gap-6 no-scrollbar">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-60 sm:w-72 lg:w-auto aspect-[3/4] relative hover:shadow-lg transition-shadow duration-200 bg-gray-100 rounded-lg flex items-center justify-center"
              >
                <Package className="w-24 h-24 text-gray-400" />
                <Image
                src={`/assets/Image/About3.png`} 
                height={700}
                width={1000}
                className="object-cover w-full h-full"
                alt="Product Image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-16 lg:mt-20 prose max-w-none mb-16">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
            Women's Casual Shoes You Need To Own
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Casual shoes for women come in an endless number of styles, which
              are constantly updated according to various fashion trends and pop
              culture influences. Any woman who loves shoes knows that they can
              make or break an outfit. If there is a shoe for every foot, then
              there is also a pair of women's casual shoes for every occasion.
            </p>
            <p>
              This is the best time to buy women casual shoes because brands
              thrive on creating as many imaginative variations as possible. There
              is always a good reason to pick up a pair of women casual shoes,
              whether for an event or just to give your mood a lift. Further,
              shopping for casual shoes for women online now gives you the freedom
              of browsing through several brands at once.
            </p>
            
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-3">
              Flat + Heels, Black Soft Synthetic High-Top Flat Boots
            </h3>
            <p>
              Gold hardware on the front of these boots makes them the perfect
              dressy boot. These women casual shoes will look great with fitted
              jeans or A line skirt with tights.
            </p>
            
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-3">
              Carlton London, Blue Printed Textured Ballerinas
            </h3>
            <p>
              Every woman should own a ballerina pair with other women casual
              shoes. They are simple, comfortable and always in style.
            </p>
            
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-6 mb-3">
              DressBerry, Metallic Brown Sneakers
            </h3>
            <p>
              The trend of velvety-metallic finish sneakers is all the rage right
              now in women casual shoes. This pair would couple well with dark
              skinny jeans and an off-shoulder Bardot top.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}