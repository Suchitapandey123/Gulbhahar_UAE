// @ts-nocheck
"use client"
import React from 'react';
import { 
  ShoppingBag, 
  AlertCircle, 
  ArrowLeft, 
  Home,
  Package,
  Star,
  Heart
} from 'lucide-react';
import AvailableProducts from './AvailableProduct';

// Sample product data - replace with your actual products
const sampleProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 899,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    rating: 4.5,
    discount: 31
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    price: 2499,
    originalPrice: 3499,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    rating: 4.3,
    discount: 29
  },
  {
    id: 3,
    name: "Formal Dress Shirt",
    price: 1599,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop",
    rating: 4.7,
    discount: 27
  },
  {
    id: 4,
    name: "Comfortable Joggers",
    price: 1299,
    originalPrice: 1799,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
    rating: 4.4,
    discount: 28
  }
];

const ProductCard = ({ product, onProductClick = () => {} }) => (
  <div 
    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    onClick={() => onProductClick(product.id)}
  >
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 bg-maroon-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
          {product.discount}% OFF
        </div>
      )}
      <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
        <Heart className="h-4 w-4 text-gray-400" />
      </button>
    </div>
    
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
      
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(product.rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-maroon-700">{formatAED(product.price)}</span>
        {product.originalPrice > product.price && (
          <span className="text-sm text-gray-500 line-through">{formatAED(product.originalPrice)}</span>
        )}
      </div>
    </div>
  </div>
);

const ProductNotFound = ({ 
  onGoBack = () => window.history.back(),
  onGoHome = () => window.location.href = '/',
  products = sampleProducts,
 
  customMessage = null
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 to-white">
      <div className="max-w-[1500px] mx-auto px-1 sm:px-4 lg:px-6 py-16">
        
        {/* Error Message Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-maroon-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Package className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-maroon-600" />
            <span className="text-lg font-medium text-maroon-700">
              Error 404
            </span>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {customMessage || "The product you're looking for doesn't exist or has been removed."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={ () => window.location.href = '/collections'}
              className="bg-maroon-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon-700 transition-colors flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Go to Collections
            </button>
          </div>
        </div>


        <AvailableProducts />

      </div>

      <style jsx>{`
        .text-maroon-600 { color: #800000; }
        .text-maroon-700 { color: #6b0000; }
        .text-maroon-800 { color: #590000; }
        .bg-maroon-600 { background-color: #800000; }
        .bg-maroon-700 { background-color: #6b0000; }
        .bg-maroon-50 { background-color: #fdf2f2; }
        .border-maroon-600 { border-color: #800000; }
        .border-maroon-200 { border-color: #e5b3b3; }
        .border-maroon-300 { border-color: #d99999; }
        .hover\\:bg-maroon-700:hover { background-color: #6b0000; }
        .hover\\:bg-maroon-50:hover { background-color: #fdf2f2; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// Usage examples:
export default function ProductNotAvailable() {
  const handleProductClick = (productId) => {
    
    // In your app: router.push(`/product/${productId}`)
  };

  const handleGoHome = () => {
    
    // In your app: router.push('/')
  };

  const handleGoBack = () => {
   
    // In your app: router.back()
  };

  return (
    <ProductNotFound
      onGoBack={handleGoBack}
      onGoHome={handleGoHome}
      onProductClick={handleProductClick}
      customMessage="The product you're looking for is currently unavailable."
    />
  );
}









