'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import Breadcrumb from './Breadcrumb';

export default function Checkout() {
  const [shippingMethod, setShippingMethod] = useState('free')

  const router=useRouter();
  const handlePayment=()=>{
    router.push('/payment')
  }

  const cartItems = [
    {
      id: 1,
      name: 'New Jutti',
      price: 8500,
      image: '/order.svg',
      quanity:3,
    },
    {
      id: 2,
      name: 'New Jutti',
      price: 8500,
      image: '/order2.svg',
      quanity:3,
    }
  ]

  const shippingOptions = {
    free: { price: 0, days: '1-2 business days' },
    regular: { price: 350, days: '3-7 business days' },
    express: { price: 350, days: '1-7 business days' }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const shipping = shippingOptions[shippingMethod].price
  const Discount=0;
  const total = subtotal + shipping - Discount

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className='lg:mt-10 mt-8 lg:ml-10'>
        <Breadcrumb/>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto lg:mt-10 font-raleway lg:ml-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-semibold mb-6 font-raleway">Shipping Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select shipping country
                  </label>
                  <select className="w-full border border-gray-300 rounded-md p-2">
                    <option>Select country</option>
                    <option>India</option>
                    <option>United States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street name and house number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal code
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow font-raleway lg:mb-20 lg:mt-12">
              <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {Object.entries(shippingOptions).map(([key, { price, days }]) => (
                  <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="shipping"
                      value={key}
                      checked={shippingMethod === key}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="text-black"
                    />
                    <div className="flex-1">
                      <p className="font-medium capitalize">{key} shipping</p>
                      <p className="text-sm text-gray-500">{days}</p>
                    </div>
                    <span className="font-medium">
                      {price === 0 ? 'free' : `INR ${price}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 font-raleway ">
            <div className="bg-white p-6 rounded-lg shadow h-fit  top-8 ">
              <h2 className="text-xl font-semibold mb-6">Your Order</h2>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className='flex items-center gap-1 text-slateFour font-raleway'>
                        <p>Green</p>
                        <p>|</p>
                        <p>M</p>
                      </div>
                      <div className='text-sm w-[30px] h-[20px]'>&#10006; {item.quanity}</div>
                    </div>
                    <span className="font-medium">INR {item.price.toLocaleString()}</span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slateFour">Subtotal</span>
                    <span>INR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slateFour">Discount</span>
                    <span>INR {Discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slateFour">Shipping cost</span>
                    <span>INR {shipping}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Grand Total</span>
                    <span>INR {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                onClick={handlePayment}
                 className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors">
                  Continue to Payment
                </button>

                <p className="text-center">
                  <span className="font-medium">New customer? </span>
                  <Link href="#" className="underline">Sign up</Link>
                  <span> to get better offer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}