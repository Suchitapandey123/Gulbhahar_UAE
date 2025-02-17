import Image from "next/image"
import Check from "./ui/Check"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Transaction() {
  return (
     <>
      <div className="max-w-[860px] mx-auto p-6 space-y-6 font-raleway lg:mb-20 lg:shadow-[30px]">
   <div className="lg:w-full lg:outline outline-gray-400 lg:px-10 shadow-[50px]">
  <div className="text-center space-y-2 lg:mt-32 mt-20">
    <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto  lg:w-[75px] lg:h-[75px]">
      <Check className="w-[75px] h-[75px]"/>
    </div>
    <h1 className="text-xl font-medium font-raleway">Thanks for you order</h1>
    <p className="text-sm text-slateFour">The order confirmation has been sent to johndoe@gmail.com</p>
    <p className="border b-2  border-dashed w-full"></p>
  </div>

  <div className="space-y-4">
    <div className="space-y-2">
      <h2 className="text-xl font-raleway font-medium">Transaction Date</h2>
      <p className="text-sm text-slateFour">Thursday, November 19, 2024</p>
      <p className="border b-2  border-dashed w-full"></p>
    </div>

    <div className="space-y-2">
      <h2 className="text-xl font-medium">Payment Method</h2>
      <p className="text-sm text-slateFour">Mastercard ending with 2564</p>
      <p className="border b-2  border-dashed w-full"></p>
    </div>

    <div className="space-y-2">
      <h2 className="text-xl font-medium">Shipping method</h2>
      <p className="text-sm text-slateFour">Express delivery (1-3 business day)</p>
      <p className="border b-2  border-dashed w-full"></p>
    </div>
  </div>

  <div className="space-y-4">
    <h2 className="text-sm font-bold">Your Order</h2>
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16">
        <Image
          src="/order.svg"
          alt="Product image"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">New Jutti</h3>
        <p className="text-sm text-muted-foreground">Green | M</p>
        <div className='text-sm w-[30px] h-[20px]'>&#10006; 3</div>
      </div>
      <p className="font-medium">INR 8,500</p>
    </div>
  </div>

  <div className="space-y-2 pt-4 border-t">
    <div className="flex justify-between text-sm font-bold">
      <span>Subtotal</span>
      <span>INR 8,500</span>
    </div>
    <p className="border b-2  border-dashed w-full"></p>
    <div className="flex justify-between text-sm text-slateFour">
      <span>Applied discount code</span>
     
    </div>
    <div className="flex justify-between text-sm text-slateFour">
      <span>Discount</span>
    </div>
    <div className="flex justify-between text-sm text-slateFour">
      <span>Shipment cost</span>
      
    </div>
    <p className="border b-2  border-dashed w-full"></p>
    <div className="flex justify-between font-bold pt-2 ">
      <span>Grand Total</span>
      <span>INR 8,500</span>
    </div>
  </div>

  <Link href='/collection'>
  <Button className="w-full bg-black text-white lg:mb-10 lg:mt-10  hover:bg-slateFour lg:rounded-[10px]">Continue Shopping</Button></Link>
 </div>
     </div>
     </>
  )
}

