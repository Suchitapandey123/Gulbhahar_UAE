'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Get payment response from query parameters
    const order_id = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const tracking_id = searchParams.get('tracking_id');
    const order_status = searchParams.get('order_status');
    const status_message = searchParams.get('status_message');
    
    if (order_id) {
      setPaymentData({
        order_id,
        amount,
        tracking_id,
        order_status,
        status_message
      });
    }
  }, [searchParams]);

  const handleRetry = () => {
    // Redirect back to payment page
    router.push('/payment-test');
  };

  const handleGoHome = () => {
    // Redirect to main application
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">Unfortunately, your payment could not be processed.</p>
          
          {paymentData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Order ID:</span> {paymentData.order_id}</div>
                <div><span className="font-medium">Amount:</span> ₹{paymentData.amount}</div>
                {paymentData.tracking_id && (
                  <div><span className="font-medium">Tracking ID:</span> {paymentData.tracking_id}</div>
                )}
                <div><span className="font-medium">Status:</span> {paymentData.order_status}</div>
                {paymentData.status_message && (
                  <div><span className="font-medium">Message:</span> {paymentData.status_message}</div>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            
            <button
              onClick={handleGoHome}
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailure() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}