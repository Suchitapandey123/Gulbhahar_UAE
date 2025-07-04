'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentGateway() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initiatePayment();
  }, []);

  const initiatePayment = async () => {
    try {
      // Get payment data from sessionStorage
      const paymentData = JSON.parse(sessionStorage.getItem('paymentFormData') || '{}');
      
      if (!paymentData.order_id) {
        throw new Error('No payment data found. Please go back and try again.');
      }

      console.log('Initiating payment with data:', paymentData);

      const response = await fetch('/api/payment-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || 'Payment initiation failed');
      }

      const htmlResponse = await response.text();
      
      // Check for authentication errors
      if (htmlResponse.includes('Merchant Authentication failed')) {
        setError('Merchant Authentication failed. Please contact support.');
        setLoading(false);
        return;
      }

      // Clear sessionStorage as we no longer need it
      sessionStorage.removeItem('paymentFormData');

      // Replace the current page content with the payment form
      document.open();
      document.write(htmlResponse);
      document.close();

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const goBack = () => {
    router.push('/payment-test');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={goBack}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to Payment</h2>
        <p className="text-gray-600">Please wait while we redirect you to the payment gateway...</p>
        <div className="mt-4 text-xs text-gray-500">
          This may take a few seconds
        </div>
      </div>
    </div>
  );
}