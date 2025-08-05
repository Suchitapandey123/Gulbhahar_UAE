'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Get payment response from query parameters
    const order_id = searchParams.get('order_id');
    const amount = searchParams.get('amount');
    const tracking_id = searchParams.get('tracking_id');
    const bank_ref_no = searchParams.get('bank_ref_no');
    const order_status = searchParams.get('order_status');
    
    if (order_id) {
      setPaymentData({
        order_id,
        amount,
        tracking_id,
        bank_ref_no,
        order_status
      });
    }
  }, [searchParams]);

  const handleContinue = () => {
    // Redirect back to main application
    router.push('/payment-test');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
          
          {paymentData && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Order ID:</span> {paymentData.order_id}</div>
                <div><span className="font-medium">Amount:</span> ₹{paymentData.amount}</div>
                {paymentData.tracking_id && (
                  <div><span className="font-medium">Tracking ID:</span> {paymentData.tracking_id}</div>
                )}
                {paymentData.bank_ref_no && (
                  <div><span className="font-medium">Bank Reference:</span> {paymentData.bank_ref_no}</div>
                )}
                <div><span className="font-medium">Status:</span> {paymentData.order_status}</div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleContinue}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}