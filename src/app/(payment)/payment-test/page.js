'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentTest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    order_id: `ORDER_${Date.now()}`,
    amount: '1.00',
    currency: 'INR',
    billing_name: 'Rahul Kumar',
    billing_tel: '9999999999',
    billing_email: 'rahul@test.com',
    billing_address: '123 Test Street',
    billing_city: 'Mumbai',
    billing_state: 'Maharashtra',
    billing_zip: '400001',
    billing_country: 'India'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const initiatePayment = async () => {
    setLoading(true);
    
    try {
      // Store form data in sessionStorage before redirecting
      sessionStorage.setItem('paymentFormData', JSON.stringify(formData));
      
      // Redirect to dedicated payment page
      router.push('/payment-gateway');
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Kotak Payment Gateway Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Order ID</label>
          <input
            type="text"
            name="order_id"
            value={formData.order_id}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Amount (INR)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            step="0.01"
            min="1"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="INR">Indian Rupee (INR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Billing Name</label>
          <input
            type="text"
            name="billing_name"
            value={formData.billing_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="billing_tel"
            value={formData.billing_tel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="billing_email"
            value={formData.billing_email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="billing_address"
            value={formData.billing_address}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="billing_city"
              value={formData.billing_city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="billing_state"
              value={formData.billing_state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              name="billing_zip"
              value={formData.billing_zip}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="billing_country"
              value={formData.billing_country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          onClick={initiatePayment}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Initiate Payment'}
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
        <h3 className="font-semibold mb-2">Test Instructions:</h3>
        <ul className="space-y-1 text-gray-600">
          <li>• Order ID is auto-generated with timestamp</li>
          <li>• Fill in all required billing details</li>
          <li>• Click "Initiate Payment" to redirect to Kotak</li>
          <li>• Use test cards provided by Kotak for testing</li>
        </ul>
        
        <div className="mt-3 p-3 bg-blue-50 rounded">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> This uses Kotak's test environment. 
            No real money will be charged.
          </p>
        </div>
      </div>
    </div>
  );
}