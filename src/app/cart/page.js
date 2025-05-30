"use client";

import { useState } from "react";
import { Trash2, Minus, Plus, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CartImage from "../../../public/assets/Svg/cart.svg";
import OrderImage from "../../../public/assets/Svg/order.svg";

const Breadcrumb = () => (
  <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
    <span className="hover:text-red-900 transition-colors cursor-pointer">Home</span>
    <span className="text-red-900">/</span>
    <span className="text-red-900 font-semibold bg-red-50 px-2 py-1 rounded-md">Cart</span>
  </nav>
);

const CartPage = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "New Jutti",
      color: "Green",
      size: "M",
      price: 8500,
      image: "/assets/images/cart.svg",
      quantity: 1,
      selected: false,
    },
    {
      id: 2,
      name: "New Jutti",
      color: "Green",
      size: "M",
      price: 8500,
      image: CartImage,
      quantity: 1,
      selected: false,
    },
    {
      id: 3,
      name: "New Jutti",
      color: "Green",
      size: "M",
      price: 8500,
      image: CartImage,
      quantity: 1,
      selected: false,
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  const toggleSelect = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected);
    setCartItems(
      cartItems.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => (item.selected ? sum + item.price * item.quantity : sum),
    0
  );

  const handleCheckOut = () => {
    router.push("/cart/checkout");
  };

  return (
    <div className="max-w-[1600px] mx-auto mt-20 lg:mb-28 px-1 sm:px-4 bg-gradient-to-br from-red-50/30 to-white min-h-screen">
      <Breadcrumb />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="mt-12">
            {/* Cart Header */}
            <div className="flex justify-between items-center lg:mb-8 mb-6 bg-white p-4 rounded-xl shadow-sm border border-red-100">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-red-900 " />
                <h2 className="sm:text-2xl sm:block hidden text-lg text-nowrap font-bold font-raleway text-gray-900">Shopping Cart</h2>
                <h2 className="sm:text-2xl block sm:hidden text-lg text-nowrap font-bold font-raleway text-gray-900"> Cart</h2>
                
              </div>
              <div className="flex items-center gap-2">
              <span className="text-white bg-red-900 text-nowrap flex items-center gap-2 transition-colors duration-200 px-3 py-2 rounded-lg">
                  {cartItems.length} items
                </span>

              <button className="text-gray-500 text-nowrap hover:text-red-900 flex items-center gap-2 transition-colors duration-200 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg">
                <Trash2
                  onClick={removeAllItems}
                  className="cursor-pointer h-4 w-4"
                />
                <p
                  onClick={removeAllItems}
                  className="font-raleway text-sm font-medium cursor-pointer"
                >
                  Clear All
                </p>
              </button>
              </div>
            </div>

            {/* Desktop Table Header */}
            <div className="hidden sm:flex items-center justify-between font-raleway border-b-2 border-red-100 pb-4 mb-6 bg-white/50 p-4 rounded-t-xl">
              <div className="flex items-center gap-4 w-1/2">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  className="h-5 w-5 rounded accent-red-900 border-2 border-red-200 focus:ring-red-900"
                />
                <p className="text-gray-700 font-semibold text-lg">Product</p>
              </div>
              <div className="w-1/4 text-center">
                <p className="text-gray-700 font-semibold text-lg">Quantity</p>
              </div>
              <div className="w-1/4 text-right">
                <p className="text-gray-700 font-semibold text-lg">Price</p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="sm:flex items-start sm:items-center py-6 bg-white rounded-xl shadow-sm border border-red-100/50 hover:shadow-md hover:border-red-200 transition-all duration-200"
                >
                  {/* Mobile Layout */}
                  <div className="flex items-start sm:hidden ml-4 sm:ml-0  w-full mb-4 p-1 sm:p-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="h-5 w-5 mt-1 rounded accent-red-900 border-2 border-red-200 focus:ring-red-900"
                    />
                    <div className="flex flex-1 ml-4">
                      <div className="relative">
                        <Image
                          src={OrderImage}
                          alt={item.name}
                          width={76}
                          height={80}
                          className="h-20 w-20 object-cover rounded-lg border-2 border-red-100"
                        />
                        {item.selected && (
                          <div className="absolute -top-2 -right-2 bg-red-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold font-raleway text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 font-raleway text-sm bg-red-50 px-2 py-1 rounded-md inline-block">
                          {item.color} | {item.size}
                        </p>
                        <p className="text-lg font-bold font-raleway mt-2 text-red-900">
                          ₹ {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Controls */}
                  <div className="flex justify-between items-center w-full sm:hidden px-4 pb-4">
                    <div className="flex items-center border-2 border-red-200 rounded-lg bg-red-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-red-100 rounded-l-lg text-red-900 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-red-900 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-red-100 rounded-r-lg text-red-900 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors">
                      <Trash2
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer h-4 w-4 transition-colors"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout - Product Info */}
                  <div className="hidden sm:flex items-center gap-6 w-1/2 p-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="h-5 w-5 rounded accent-red-900 border-2 border-red-200 focus:ring-red-900"
                    />
                    <div className="relative">
                      <Image
                        src={OrderImage}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 object-cover rounded-lg border-2 border-red-100"
                      />
                      {item.selected && (
                        <div className="absolute -top-2 -right-2 bg-red-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold font-raleway text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 font-raleway text-sm bg-red-50 px-3 py-1 rounded-md inline-block mt-1">
                        {item.color} | {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout - Quantity Controls */}
                  <div className="hidden sm:flex w-1/4 flex-col items-center gap-4 p-4">
                    <div className="flex items-center border-2 border-red-200 rounded-lg bg-red-50">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-3 hover:bg-red-100 rounded-l-lg text-red-900 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-6 py-3 font-bold text-red-900 bg-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-3 hover:bg-red-100 rounded-r-lg text-red-900 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors">
                      <Trash2
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer transition-colors"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Desktop Layout - Price */}
                  <div className="hidden sm:block w-1/4 text-right p-4">
                    <p className="text-xl font-bold font-raleway text-red-900">
                      ₹ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1 lg:mr-10 my-8 mt-12">
          {/* Order Summary Card */}
          <div className="bg-white rounded-xl border-2 border-red-200 p-6 space-y-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-900 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold font-raleway text-gray-900">Order Summary</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-red-100">
                <span className="text-gray-700 font-raleway font-medium">
                  Subtotal
                </span>
                <span className="font-bold font-raleway text-gray-900">
                  ₹ {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-red-100">
                <span className="text-gray-700 font-raleway font-medium">
                  Discount
                </span>
                <span className="font-bold font-raleway text-green-600">₹ 0</span>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-xl font-bold font-raleway text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold font-raleway text-red-900">
                    ₹ {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckOut}
              className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-4 hover:from-red-800 hover:to-red-700 transition-all duration-200 font-raleway font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              Proceed to Checkout →
            </button>
          </div>

          {/* Promo Code Section */}
          <div className="bg-white rounded-xl border-2 border-red-200 p-8 space-y-4 mt-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-900 p-2 rounded-lg">
                <Tag className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 font-raleway text-gray-900">
                Apply Promocode 🎉
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 font-raleway bg-red-50 p-3 rounded-lg">
              Have a coupon code? Apply it now and save more on your purchase!
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900 font-raleway bg-red-50/30"
              />
              <button className="w-full bg-gradient-to-r from-red-900 to-red-800 text-white py-3 rounded-xl hover:from-red-800 hover:to-red-700 transition-all duration-200 font-raleway font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;