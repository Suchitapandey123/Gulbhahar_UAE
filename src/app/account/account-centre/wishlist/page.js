"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Trash2, 
  Package, 
  Check,
  ChevronRight,
  ArrowLeft,
  Grid,
  List,
  Plus
} from "lucide-react";

const Wishlist = () => {
  const [view, setView] = useState("main");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [savedProducts, setSavedProducts] = useState([
    {
      id: 2,
      name: "New Jutti",
      color: "Green",
      size: "M",
      price: 8500,
      imageUrl: "/path-to-image-2.jpg",
      selected: true,
    },
    {
      id: 3,
      name: "Premium Jutti",
      color: "Blue",
      size: "L",
      price: 9500,
      imageUrl: "/path-to-image-3.jpg",
      selected: false,
    },
    {
      id: 4,
      name: "Classic Jutti",
      color: "Red",
      size: "S",
      price: 7500,
      imageUrl: "/path-to-image-4.jpg",
      selected: false,
    },
  ]);

  const handleProductSelect = (id) => {
    setSavedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    setSavedProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const selectedCount = savedProducts.filter(p => p.selected).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-3 xs:py-4 sm:py-6 md:py-8">
        {/* Header Navigation */}
        <div className="mb-4 xs:mb-6 sm:mb-8">
          <div className="flex items-center gap-1 xs:gap-2 mb-3 xs:mb-4">
            {view === "savedProducts" && (
              <>
                <button 
                  onClick={() => setView("main")}
                  className="flex items-center gap-1 xs:gap-2 text-red-900 hover:text-red-700 transition-colors group"
                >
                  <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-xs xs:text-sm sm:text-base font-medium">Wishlist</span>
                </button>
                <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
                <span className="text-gray-700 text-xs xs:text-sm sm:text-base font-medium">Saved Products</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
            <div className="p-1 xs:p-1.5 sm:p-2 bg-red-900 rounded-md">
              <Heart className="text-white w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {view === "main" ? "My Wishlist" : "Saved Products"}
              </h1>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
                {view === "main" ? "Manage your wishlist and saved items" : `${savedProducts.length} items saved`}
              </p>
            </div>
          </div>
          
          <div className="h-0.5 xs:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 rounded-full w-12 xs:w-16 sm:w-20 md:w-24" />
        </div>

        {/* Main View - Category Cards */}
        {view === "main" && (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
            {/* Saved Products Card */}
            <div
              className="group relative bg-white rounded-lg border border-gray-200 hover:border-red-300 p-4 xs:p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[120px] xs:min-h-[140px] sm:min-h-[160px]"
              onClick={() => setView("savedProducts")}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon and badge */}
                <div className="flex items-center justify-between mb-3 xs:mb-4">
                  <div className="p-2 xs:p-2.5 sm:p-3 bg-red-100 rounded-lg group-hover:bg-red-900 group-hover:text-white transition-colors duration-300">
                    <Package className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-red-900 group-hover:text-white" />
                  </div>
                  {savedProducts.length > 0 && (
                    <span className="bg-red-900 text-white text-xs px-2 py-1 rounded-full">
                      {savedProducts.length}
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-900 transition-colors duration-300">
                  Saved Products
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 flex-grow">
                  View and manage your saved favorite items
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-xs xs:text-sm font-medium mr-1 xs:mr-2">View Items</span>
                  <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4" />
                </div>
              </div>
            </div>

            {/* Share Wishlist Card */}
            <div
              className="group relative bg-white rounded-lg border border-gray-200 hover:border-red-300 p-4 xs:p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden min-h-[120px] xs:min-h-[140px] sm:min-h-[160px]"
              onClick={() => window.open("/wishlist/share-wishlist", "_blank")}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-900 via-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-3 xs:mb-4">
                  <div className="p-2 xs:p-2.5 sm:p-3 bg-red-100 rounded-lg group-hover:bg-red-900 group-hover:text-white transition-colors duration-300 w-fit">
                    <Share2 className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-red-900 group-hover:text-white" />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-900 transition-colors duration-300">
                  Share Wishlist
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 flex-grow">
                  Share your wishlist with friends and family
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-red-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-xs xs:text-sm font-medium mr-1 xs:mr-2">Share Now</span>
                  <ChevronRight className="w-3 h-3 xs:w-4 xs:h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Products View */}
        {view === "savedProducts" && (
          <div className="space-y-4 xs:space-y-6">
            {/* Controls Bar */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 bg-white rounded-lg border border-red-100 p-3 xs:p-4">
              <div className="flex items-center gap-2 xs:gap-3">
                <span className="text-sm xs:text-base font-medium text-gray-900">
                  {selectedCount > 0 ? `${selectedCount} selected` : `${savedProducts.length} items`}
                </span>
                {selectedCount > 0 && (
                  <span className="bg-red-100 text-red-900 px-2 py-1 rounded-full text-xs font-medium">
                    {selectedCount} selected
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 xs:gap-3">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1 xs:p-2 rounded transition-colors ${
                      viewMode === "grid" ? "bg-red-900 text-white" : "text-gray-600 hover:text-red-900"
                    }`}
                  >
                    <Grid className="w-3 h-3 xs:w-4 xs:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1 xs:p-2 rounded transition-colors ${
                      viewMode === "list" ? "bg-red-900 text-white" : "text-gray-600 hover:text-red-900"
                    }`}
                  >
                    <List className="w-3 h-3 xs:w-4 xs:h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {viewMode === "grid" ? (
              /* Grid View */
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-lg border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                      product.selected 
                        ? "border-red-900 shadow-lg" 
                        : "border-gray-200 hover:border-red-300 hover:shadow-md"
                    }`}
                    onClick={() => handleProductSelect(product.id)}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Package className="w-8 h-8 xs:w-10 xs:h-10 text-gray-400" />
                      </div>
                      
                      {/* Selection Indicator */}
                      <div className={`absolute top-2 xs:top-3 left-2 xs:left-3 w-5 h-5 xs:w-6 xs:h-6 rounded border-2 transition-all ${
                        product.selected 
                          ? "bg-red-900 border-red-900" 
                          : "border-gray-300 bg-white group-hover:border-red-900"
                      }`}>
                        {product.selected && (
                          <Check className="w-3 h-3 xs:w-4 xs:h-4 text-white m-0.5" />
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemove(product.id, e)}
                        className="absolute top-2 xs:top-3 right-2 xs:right-3 w-6 h-6 xs:w-8 xs:h-8 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 xs:w-4 xs:h-4 text-red-600" />
                      </button>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-3 xs:p-4">
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-xs xs:text-sm mb-2">
                        {product.color} | {product.size}
                      </p>
                      <p className="font-semibold text-red-900 text-sm xs:text-base">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="bg-white rounded-lg border border-red-100 overflow-hidden">
                {/* Desktop Table Headers */}
                <div className="hidden sm:grid grid-cols-12 gap-4 py-3 xs:py-4 px-4 xs:px-6 bg-red-50 border-b border-red-100">
                  <div className="col-span-1"></div>
                  <div className="col-span-5 text-red-900 font-semibold text-sm">Product</div>
                  <div className="col-span-3 text-red-900 font-semibold text-sm text-center">Price</div>
                  <div className="col-span-3 text-red-900 font-semibold text-sm text-right">Action</div>
                </div>

                {/* Product Rows */}
                <div className="divide-y divide-gray-100">
                  {savedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`group transition-colors cursor-pointer ${
                        product.selected ? "bg-red-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleProductSelect(product.id)}
                    >
                      {/* Mobile Layout */}
                      <div className="sm:hidden p-3 xs:p-4">
                        <div className="flex items-center gap-3 xs:gap-4">
                          <div className={`w-4 h-4 xs:w-5 xs:h-5 rounded border-2 transition-all flex-shrink-0 ${
                            product.selected 
                              ? "bg-red-900 border-red-900" 
                              : "border-gray-300 group-hover:border-red-900"
                          }`}>
                            {product.selected && (
                              <Check className="w-2 h-2 xs:w-3 xs:h-3 text-white m-0.5" />
                            )}
                          </div>
                          
                          <div className="w-12 h-12 xs:w-16 xs:h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                            <Package className="w-4 h-4 xs:w-6 xs:h-6 text-gray-400" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm xs:text-base">{product.name}</h3>
                            <p className="text-gray-500 text-xs xs:text-sm">{product.color} | {product.size}</p>
                            <p className="font-semibold text-red-900 text-sm xs:text-base">₹{product.price.toLocaleString()}</p>
                          </div>
                          
                          <button
                            onClick={(e) => handleRemove(product.id, e)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:grid grid-cols-12 gap-4 py-4 px-6 items-center">
                        <div className="col-span-1">
                          <div className={`w-5 h-5 rounded border-2 transition-all ${
                            product.selected 
                              ? "bg-red-900 border-red-900" 
                              : "border-gray-300 group-hover:border-red-900"
                          }`}>
                            {product.selected && (
                              <Check className="w-3 h-3 text-white m-0.5" />
                            )}
                          </div>
                        </div>
                        
                        <div className="col-span-5 flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.color} | {product.size}</p>
                          </div>
                        </div>
                        
                        <div className="col-span-3 text-center">
                          <span className="font-semibold text-gray-900">₹{product.price.toLocaleString()}</span>
                        </div>
                        
                        <div className="col-span-3 text-right">
                          <button
                            onClick={(e) => handleRemove(product.id, e)}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-end">
              <button
                disabled={selectedCount === 0}
                className={`flex items-center justify-center gap-2 px-4 xs:px-6 py-2 xs:py-3 rounded-lg font-medium text-sm xs:text-base transition-colors ${
                  selectedCount > 0
                    ? "bg-red-900 text-white hover:bg-red-800"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={() => window.open("/cart", "_blank")}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart ({selectedCount})
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {view === "savedProducts" && savedProducts.length === 0 && (
          <div className="text-center py-12 xs:py-16 sm:py-20">
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 xs:mb-6">
              <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-red-900" />
            </div>
            <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 mb-2 xs:mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 text-sm xs:text-base mb-6 xs:mb-8">
              Start adding items to your wishlist to see them here
            </p>
            <button
              onClick={() => setView("main")}
              className="inline-flex items-center gap-2 bg-red-900 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg hover:bg-red-800 transition-colors text-sm xs:text-base"
            >
              <Plus className="w-4 h-4" />
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;