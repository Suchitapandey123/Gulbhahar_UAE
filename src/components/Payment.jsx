"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import Mastercard from "./ui/MasterCard"
import Visa from "./ui/Visa"
import Breadcrumb from "./Breadcrumb"
import PayPal from "./ui/PayPal"
import UPI from "./ui/UPI"
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const order='/order.svg'
  const order2='/order2.svg'

  const router=useRouter();
  const handleTransaction=()=>{
    router.push('/transaction')
  }

  return (
    <div className="min-h-screen py-8 font-raleway lg:mb-16">
       <div className="lg:mt-10 lg:ml-12">
        <Breadcrumb/>
        </div>
      <div className="mx-auto max-w-8xl  px-4 lg:mt-8 lg:ml-12 shadow-lg">
       
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
           
            <div className="rounded-lg border bg-white p-6 lg:w-[58vw]">
              <h2 className="mb-4 text-lg font-medium">Select payment methods</h2>
              <label className="mb-4 flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-black accent-black "
                  />
                  <span>Credit card</span>
                </div>
                <div className="flex gap-2 items-center">
                 <Mastercard/>
                 <Visa/>
                </div>
              </label>

              {paymentMethod === "credit-card" && (
                <div className="space-y-4 px-4">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expirary date (MM/YY)"
                      className="rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>
              )}
              <label className="mb-4 flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-black accent-black"
                  />
                  <span>Paypal</span>
                </div>
               <PayPal/>
              </label>
              <label className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 border-gray-300 text-black accent-black"
                  />
                  <span>UPI</span>
                </div>
              <UPI/>
              </label>
            </div>
            <div className="rounded-lg border bg-white p-6 lg:w-[58vw]">
              <h2 className="mb-4 text-lg font-medium">Billing Address</h2>

              <div className="space-y-4 ">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black accent-black" />
                  <span className="text-sm text-gray-600">Same as my shipping address</span>
                </label>
                <div className="">

               <label className="font-raleway">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
                 </div>
                 <label className="font-raleway ">Street name and house number</label>
                <input
                  type="text"
                  placeholder="Street name and house number"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                />
                <label className="font-raleway">City</label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                />

                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-300 p-2 focus:border-black accent-black focus:outline-none">
                    <option value="">Select Region</option>
                    <option value="region1">Region 1</option>
                    <option value="region2">Region 2</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>

                <input
                  type="text"
                  placeholder="Postal code"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-black focus:outline-none"
                />

                <div className="relative">
                  <select className="w-full appearance-none rounded-md border border-gray-300 p-2 focus:border-black accent-black focus:outline-none">
                    <option value="">Select country</option>
                    <option value="india">India</option>
                    <option value="usa">USA</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <label className="mt-4 flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black accent-black" />
                <span className="text-sm text-gray-600">Remember my information</span>
              </label>
            </div>
          </div>
          <div className="rounded-lg border bg-white p-6 lg:w-[30vw] lg:ml-48 lg:h-[79vh] shadow-lg">
            <h2 className="mb-4 text-lg font-medium">Your Order</h2>
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <Image
                    src={order || null}
                    alt="Product"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">New Jutti</h3>
                    <p className="text-sm text-gray-500">Green | M</p>
                    <div className='text-sm w-[30px] h-[20px]'>&#10006; 3</div>
                  </div>
                  <p className="font-medium">INR 8,500</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm text-slateFour">
                <span>Subtotal</span>
                <span>INR 8,500</span>
              </div>
              <div className="flex justify-between text-sm text-slateFour">
                <span>Discount</span>
                <span>INR 0</span>
              </div>
              <div className="flex justify-between text-sm text-slateFour">
                <span>Shipping cost</span>
                <span>INR 230</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Grand Total</span>
                <span>INR 2,500</span>
              </div>
            </div>
            <button
            onClick={handleTransaction}
             className="mt-6 w-full rounded-[12px] px-4 py-2 bg-slateFour">
              Continue to payment
            </button>

            <p className="mt-4 text-center text-sm text-black">
              New Customer?{" "}
              <Link href="#" className="underline">
                Sign up to get better offer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

