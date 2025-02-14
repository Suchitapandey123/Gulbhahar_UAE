'use client'

import { useState } from 'react';
import DeleteIcon from '@/components/ui/DeleteIcon';
import Minus from '@/components/ui/Minus';
import Plus from '@/components/ui/Plus';
import Breadcrumb from '@/components/Breadcrumb';
const products = [
  {
    id: 1,
    name: 'New Jutti',
    color: 'Green',
    size: 'M',
    price: 8500,
    image: '/cart.svg'
  },
  {
    id: 2,
    name: 'New Jutti',
    color: 'Green',
    size: 'M',
    price: 8500,
   image: '/cart.svg'
  },
  {
    id: 3,
    name: 'New Jutti',
    color: 'Green',
    size: 'M',
    price: 8500,
   image: '/cart.svg'
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(products.map(p => ({ ...p, quantity: 1, selected: false })));

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const removeAllItems=(id)=>{
    setCartItems(items=>items.filter(()=>false))
  }

  const toggleSelect = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => 
    item.selected ? sum + (item.price * item.quantity) : sum, 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto mt-20">
      <div>
      <Breadcrumb/>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold font-raleway">Cart</h2>
                <button className="text-gray-500 hover:text-gray-700 flex items-center">
                  <DeleteIcon onClick={() => removeAllItems()} className="cursor-pointer"/>
                  <p onClick={() => removeAllItems()} className='font-raleway text-black hover:text-customRed cursor-pointer'>Remove</p>
                </button>
              </div>


              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b last:border-0">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="h-4 w-4 rounded border-gray-300 font-raleway"
                    />
                    <img
                      src="/cart.svg"
                      alt={item.name}
                      className="h-24 w-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium font-raleway">{item.name}</h3>
                      <p className="text-gray-500 font-raleway">
                        {item.color} | {item.size}
                      </p>
                      <div className="mt-2 flex items-center space-x-4 font-raleway justify-center">
                        <div className="flex items-center border rounded font-raleway ">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus/>
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus/>
                          </button>
                        </div>
                        <div className='flex items-center '>
                          <DeleteIcon onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-customRed cursor-pointer"/>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-customRed"
                        >
                          Remove
                        </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium font-raleway">INR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-raleway">Subtotal</span>
                  <span className="font-medium font-raleway">INR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-gray-600 font-raleway">Discount</span>
                  <span className="font-medium font-raleway">INR 0</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold font-raleway">Grand Total</span>
                    <span className="text-lg font-semibold font-raleway">INR {subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors font-raleway rounded-[12px] shadowlg
              ">
                Checkout Now
              </button>

              <div className="space-y-4">
                <div className="border p-4">
                  <h3 className="font-medium mb-2 font-raleway">Apply promocode 🎉</h3>
                  <p className="text-sm text-gray-500 mb-4 font-raleway">
                    Do you have any coupons? Apply now!!!
                  </p>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black font-raleway"
                    />
                    <button className="w-full bg-black text-white py-2 rounded-[12px] hover:bg-gray-800 transition-colors font-raleway shadow-lg">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}