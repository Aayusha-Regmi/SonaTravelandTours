import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentReceipt from './PaymentReceipt';
import { extractPaymentParams } from '../utils/urlUtils';
import { processPaymentCallback } from '../services/paymentServiceNew';

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [receiptData, setReceiptData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      try {
        setLoading(true);
        
        // Extract payment parameters from URL
        const paymentParams = extractPaymentParams();
        
        if (!paymentParams.isValid) {
          throw new Error('Invalid NPS payment callback parameters');
        }

       

        // Process the NPS callback response directly (no backend API call needed)
        const response = await processPaymentCallback();
        
        if (response.success) {
         
          setReceiptData({
            ...response.data,
            // Ensure all NPS callback data is included
            status: response.isPaymentSuccessful ? 'success' : 'failed',
            merchantTxnId: paymentParams.merchantTxnId,
            gatewayTxnId: paymentParams.gatewayTxnId,
            amount: paymentParams.amount,
            message: paymentParams.message || response.message
          });
        } else {
          throw new Error(response.message || 'NPS payment callback processing failed');
        }
      } catch (err) {
        console.error('NPS callback error:', err);
        setError(err.message || 'An error occurred while processing your payment callback');
        
        // Set basic receipt data with error status from NPS callback
        const paymentParams = extractPaymentParams();
        setReceiptData({
          status: 'failed',
          merchantTxnId: paymentParams.merchantTxnId,
          gatewayTxnId: paymentParams.gatewayTxnId,
          amount: paymentParams.amount,
          message: err.message || 'NPS payment callback processing failed',
          timestamp: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    handlePaymentCallback();
  }, []);

  const handleClose = () => {
    // Navigate back to home or search page
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Processing NPS Callback...</h3>
          <p className="mt-2 text-sm text-gray-600">Please wait while we process your payment response</p>
        </div>
      </div>
    );
  }

  if (error && !receiptData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-100 rounded-full p-3 mx-auto w-16 h-16 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Processing Error</h3>
          <p className="text-sm text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <PaymentReceipt receiptData={receiptData} onClose={handleClose} />;
};

export default PaymentCallback;
