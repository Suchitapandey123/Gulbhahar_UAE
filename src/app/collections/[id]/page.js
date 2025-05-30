import React from "react";
import { ProductClient } from "./client";


function getProductData({productID}) {
  console.log(productID)
  return {
    productID,
    name: "Noorani Jutti",
    category: "Noorani Jutti FOR WOMEN",
    price: 5500,
    originalPrice: 10000,
    discount: "75% OFF",
    colors: ["blue","green","black"],
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
  };
}




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
 

export async function generateStaticParams() {
  const productIds = ["1", "2", "3" ,"4", "5", "6", "7","8","9", "10" , "11", "12", "13", "14", "15","16", "17" ];
  return productIds.map((id) => ({ id }));
}

export default async function CollectionPage({ params }) {
    const param = await params
    const productID = param.id
    console.log('Params:', productID);
    const product = getProductData(productID);
    return <ProductClient product={product} similarProducts={similarProducts} />;
}