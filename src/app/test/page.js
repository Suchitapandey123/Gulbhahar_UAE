// "use client"

// import { useState } from 'react';

// export default function PaymentTest() {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     order_id: 'ORD001',
//     amount: '1.00',
//     billing_name: 'Rahul',
//     billing_tel: '9999999999',
//     billing_email: 'rahul@test.com'
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const initiatePayment = async () => {
//     setLoading(true);
    
//     try {
//       const response = await fetch('/api/payment-proxy', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (!response.ok) {
//         throw new Error('Payment initiation failed');
//       }
      
//       const htmlResponse = await response.text();
      
//       // Create a new window/tab and write the HTML response
//       const paymentWindow = window.open('', '_blank');
//       paymentWindow.document.write(htmlResponse);
//       paymentWindow.document.close();
      
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert('Payment initiation failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-6 text-center">Payment Gateway Test</h1>
      
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Order ID</label>
//           <input
//             type="text"
//             name="order_id"
//             value={formData.order_id}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleInputChange}
//             step="0.01"
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Billing Name</label>
//           <input
//             type="text"
//             name="billing_name"
//             value={formData.billing_name}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Phone Number</label>
//           <input
//             type="tel"
//             name="billing_tel"
//             value={formData.billing_tel}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="billing_email"
//             value={formData.billing_email}
//             onChange={handleInputChange}
//             className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <button
//           onClick={initiatePayment}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? 'Processing...' : 'Initiate Payment'}
//         </button>
//       </div>
      
//       <div className="mt-6 p-4 bg-gray-50 rounded text-sm">
//         <h3 className="font-semibold mb-2">Test Instructions:</h3>
//         <ul className="space-y-1 text-gray-600">
//           <li>• Fill in the payment details above</li>
//           <li>• Click "Initiate Payment"</li>
//           <li>• Payment form will open in a new tab</li>
//           <li>• Complete payment on CCAvenue's test page</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// components/KotakPaymentTest.js
'use client';

import { useState } from 'react';

const KotakPaymentTest = () => {
  const [paymentData, setPaymentData] = useState({
    order_id: `TEST_${Date.now()}`,
    amount: '1.00',
    billing_name: 'Test User',
    currency: 'INR',
    billing_tel: '9999999999',
    billing_email: 'test@example.com'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateNewOrderId = () => {
    setPaymentData(prev => ({
      ...prev,
      order_id: `TEST_${Date.now()}`
    }));
  };

  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.gulbhahar.com/api/kotak/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      
      // Check if response is HTML
      if (html.includes('<html>')) {
        // Open the HTML in the current window (redirect method)
        document.open();
        document.write(html);
        document.close();
      } else {
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      setError(`Payment initiation failed: ${err.message}`);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openInNewWindow = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.gulbhahar.com/api/kotak/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      
      // Open in new window/tab
      const newWindow = window.open('', '_blank');
      newWindow.document.open();
      newWindow.document.write(html);
      newWindow.document.close();

    } catch (err) {
      setError(`Payment initiation failed: ${err.message}`);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Kotak Payment Test
      </h2>

      <div className="space-y-4">
        {/* Order ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="order_id"
              value={paymentData.order_id}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Order ID"
            />
            <button
              type="button"
              onClick={generateNewOrderId}
              className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              New
            </button>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (INR)
          </label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            min="1"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1.00"
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            type="text"
            name="billing_name"
            value={paymentData.billing_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Customer Name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="billing_tel"
            value={paymentData.billing_tel}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="9999999999"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="billing_email"
            value={paymentData.billing_email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="test@example.com"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Payment Buttons */}
        <div className="space-y-2 pt-4">
          <button
            onClick={initiatePayment}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Processing...' : 'Pay Now (Same Window)'}
          </button>

          <button
            onClick={openInNewWindow}
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Processing...' : 'Pay Now (New Tab)'}
          </button>
        </div>

        {/* Test Card Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">Test Card Details:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Card Number:</strong> 4111111111111111</p>
            <p><strong>Expiry:</strong> 12/25 (any future date)</p>
            <p><strong>CVV:</strong> 123</p>
            <p><strong>Name:</strong> Any name</p>
          </div>
        </div>

        {/* API Info */}
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>API Endpoint:</strong> https://api.gulbhahar.com/api/kotak/pay
          </p>
          <p className="text-sm text-yellow-800">
            <strong>Environment:</strong> Test Mode
          </p>
        </div>
      </div>
    </div>
  );
};

export default KotakPaymentTest;