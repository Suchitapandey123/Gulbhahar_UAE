"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Cart from "@/components/ui/Cart";
import HeartIcon from "@/components/ui/HeartIcon";
import Star from "@/components/ui/Star";
import ThumbUp from "@/components/ui/ThumbUp";
import ThumbDown from "@/components/ui/ThumbDown";

const getProductData = (id) => ({
  id,
  name: "Noorani Jutti",
  category: "Noorani Jutti FOR WOMEN",
  price: 5500,
  originalPrice: 10000,
  discount: "75% OFF",
  colors: ["/16.svg", "/16.svg", "/16.svg"],
  sizes: ["XXS", "XS", "S", "M", "L", "XL"],
  images: ["/16.svg", "/16.svg", "/16.svg", "/16.svg"],
  overview: [
    `Casual shoes for women come in an endless number of styles which are constantly updated according to various fashion trends and pop culture influences.Any women who loves shoes knoes that they can make or break an outfit.If there is a shoe for every foot, then there is also a pair of womens casual shoes for every occasion`,
  ],
  details: [
    "Wipe with a clean dry cloth when needed",
    "Memory foam inside",
    "Lace fastening",
    "45-day warranty against manufacturing defects",
    "PU uppwe",
    "Package contain 1 pair of shoes",
    "EVA sole",
    "Product Code: P12344",
  ],
  rating: 4.8,
  reviews: [
    { stars: 5, count: 28 },
    { stars: 4, count: 9 },
    { stars: 3, count: 7 },
    { stars: 2, count: 4 },
    { stars: 1, count: 0 },
  ],
  reviewComments: [
    {
      user: "John Doe",
      rating: 5,
      comment: "Excellent running shoes. It was very sturdy on the foot",
      date: "yesterday",
    },
    {
      user: "John Doe",
      rating: 5,
      comment: "Excellent running shoes. It was very sturdy on the foot",
      date: "yesterday",
    },
  ],
});

const similarProducts = [
  {
    id: 1,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 2,
  },
  {
    id: 2,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 3,
  },
  {
    id: 3,
    name: "Noorani Jutti",
    price: 5000,
    rating: 5,
    image: "/16.svg",
    itemsLeft: 2,
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const product = getProductData(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [pincode, setPincode] = useState("");

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-24">
        <div className="lg:-ml-[70px] lg:mb-4">
          <Breadcrumb />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border lg:-ml-[50px]">
              <Image
                src={mainImage}
                alt="Product-image"
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
                    mainImage === img ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    // alt={`${product.name} ${idx + 1}`}
                    alt="Product-image"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-4 mt-12 font-raleway lg:-ml-12 text-lg">
                Overview
              </h3>
              <p className="space-y-1 text-sm font-raleway text-gray-500 lg:-ml-12">
                {product.overview}
              </p>
              <h3 className="font-bold mb-2 font-raleway mt-2 lg:-ml-12">
                Product Details
              </h3>
              <ul className="space-y-1 text-sm font-raleway text-gray-500 list-inside list-disc lg:-ml-12">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-6 lg:ml-16">
            <div>
              <h1 className="text-2xl font-semibold font-raleway">
                {product.name}
              </h1>
              <p className="text-gray-600 font-raleway">{product.category}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl text-customPaleYellow font-extralight">
                ₹{product.price}
              </span>
              <span className="text-gray-500 line-through">
                MRP ₹{product.originalPrice}
              </span>
              <span className="font-medium font-raleway text-customRed">
                ({product.discount})
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 font-raleway">
                Color : {`blue`}
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="w-[88px] h-[109px] rounded-lg border-2 border-gray-200 overflow-hidden shadow-lg"
                  >
                    <Image
                      src={color}
                      // alt={`Color ${idx + 1}`}
                      alt="product-image"
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
                        ? "border-black bg-customPaleYellow text-white"
                        : "border-gray-200 hover:border-customYellow"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 font-raleway">
                Delivery to
              </h3>
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
                className="flex-1 bg-black font-raleway shadow-lg rounded-[15px] h-[97px] text-white hover:bg-black/90 py-2"
              >
                <div className="flex items-start justify-center gap-2 h-[20px] rounded w-[570px]">
                  <Cart />
                  <p className="text-lg">Add To cart</p>
                </div>
              </button>
              <button className="p-2 border  hover:bg-gray-50 h-[97px] rounded-[12px]">
                <HeartIcon className="w-[97px] h-[97px]" />
              </button>
            </div>

            <div>
              <h3 className="font-medium font-raleway mb-4 lg:text-[32px]">
                Review
              </h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 font-raleway">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-45 h-45  ${
                          idx < Math.floor(product.rating)
                            ? "fill-customPaleYellow text-customPaleYellow"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium font-raleway">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {product.reviews.map(({ stars, count }) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-2 font-raleway">{stars}</span>
                    <div className="flex-1 h-[30px] bg-gray-200  overflow-hidden mt-4">
                      <div
                        className="h-full bg-starColor font-bold"
                        style={{
                          width: `${(count / 48) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-lg text-gray-600 font-raleway font-bold ">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 font-raleway">
                {product.reviewComments.map((review, idx) => (
                  <div key={idx} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2"></div>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/user.svg"
                        alt="user image"
                        width={45}
                        height={45}
                        objectFit="cover"
                      />
                      <p className="text-sm font-medium mt-1 lg:text-[18px]">
                        {review.user}
                      </p>
                      <span className="text-sm text-gray-600 mx-1">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 gap-2">
                      <p className="mt-2  text-sm text-gray-500">Rating</p>
                      <div className="flex">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-4 h-4 mt-2 ${
                              idx < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mt-5 text-gray-600 font-bold">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-4">
                      <p className="font-raleway text-replyColor text-[12px]">
                        Reply
                      </p>
                      <div className="flex items-center">
                        <ThumbUp />
                        <p>10</p>
                      </div>
                      <div className="flex items-center">
                        <ThumbDown />
                        <p>0</p>
                      </div>
                    </div>
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
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-slateColorThree"
              >
                <div className="flex items-center gap-4">
                  <div className="relative mb-4">
                    <Image
                      src="/23.svg"
                      // alt={item.name}
                      alt="item-image"
                      width={126}
                      height={142}
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3 lg:mb-10">
                    <h3 className="font-raleway font-bold text-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-customYellow text-yellow-400 "
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold font-raleway">
                        ₹{item.price}
                      </span>
                    </div>
                    <span
                      className="text-sm text-customRed font-raleway
                  "
                    >
                      ({item.itemsLeft} items left)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-lg font-raleway text-center">Similar Product</h3>
        </div>
        <div className="flex items-center gap-12 mt-12 lg:-ml-16">
          <Image
            src="/similar.svg"
            alt="similar image"
            width={300}
            height={450}
            objectFit="cover"
            className="bg-slateColorThree outline-gray-600"
          />
          <Image
            src="/similar.svg"
            alt="similar-product"
            width={300}
            height={450}
          className="bg-slateColorThree"
          />
          <Image
            src="/similar.svg"
            alt="similar-product"
            width={300}
            height={450}
           className="bg-slateColorThree"
          />
          <Image
            src="/similar.svg"
            alt="similar-product"
            width={300}
            height={450}
           className="bg-slateColorThree"
          />
        </div>
        <div className="mt-16 prose max-w-none lg:-ml-16 font-raleway">
          <h2 className="text-2xl mb-6">
            Women's Casual Shoes You Need To Own
          </h2>
          <p className="mb-6">
            Casual shoes for women come in an endless number of styles, which
            are constantly updated according to various fashion trends and pop
            culture influences. Any woman who loves shoes knows that they can
            make or break an outfit. If there is a shoe for every foot, then
            there is also a pair of women's casual shoes for every occasion.
          </p>
          <p className="mb-6">
            This is the best time to buy women casual shoes because brands
            thrive on creating as many imaginative variations as possible. There
            is always a good reason to pick up a pair of women casual shoes,
            whether for an event or just to give your mood a lift. Further,
            shopping for casual shoes for women online now gives you the freedom
            of browsing through several brands at once.
          </p>
          <h3 className="text-xl font-raleway  mb-4">
            Flat + Heels, Black Soft Synthetic High-Top Flat Boots
          </h3>
          <p className="mb-6 font-raleway">
            Gold hardware on the front of these boots makes them the perfect
            dressy boot. These women casual shoes will look great with fitted
            jeans or A line skirt with tights.
          </p>
          <h3 className="text-xl font-raleway mb-4">
            Carlton London, Blue Printed Textured Ballerinas
          </h3>
          <p className="mb-6 font-raleway">
            Every woman should own a ballerina pair with other women casual
            shoes. They are simple, comfortable and always in style.
          </p>
          <h3 className="text-xl mb-4">DressBerry, Metallic Brown Sneakers</h3>
          <p>
            The trend of velvety-metallic finish sneakers is all the rage right
            now in women casual shoes. This pair would couple well with dark
            skinny jeans and an off-shoulder Bardot top.
          </p>
        </div>
      </div>
    </div>
  );
}
