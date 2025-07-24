import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('Processing your payment...');
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    const processPaymentCallback = async () => {
      try {
        console.log('Processing NPS payment callback...');
        
        // Extract callback parameters from URL
        const merchantTxnId = searchParams.get('MerchantTxnId');
        const gatewayTxnId = searchParams.get('GatewayTxnId');
        const status = searchParams.get('Status');
        const message = searchParams.get('Message');
        
        console.log('Callback parameters:', {
          merchantTxnId,
          gatewayTxnId,
          status,
          message
        });
        
        if (!merchantTxnId) {
          throw new Error('Missing transaction ID in callback');
        }
        
        // Set processing status
        setStatus('processing');
        setMessage('Verifying your payment with NPS gateway...');
        
        // Get booking details from sessionStorage (saved during payment initiation)
        const bookingDetailsStr = sessionStorage.getItem('pendingBookingDetails');
        let bookingDetails = null;
        
        if (bookingDetailsStr) {
          try {
            bookingDetails = JSON.parse(bookingDetailsStr);
            console.log('Retrieved booking details:', bookingDetails);
          } catch (parseError) {
            console.error('Failed to parse booking details:', parseError);
          }
        }
        
        if (!bookingDetails) {
          console.warn('No booking details found in session, using minimal data');
          bookingDetails = {
            amount: 1000, // Default amount
            passengerName: 'Unknown Passenger',
            contactNumber: 'N/A',
            emailId: 'N/A'
          };
        }
        
        // Prepare callback data
        const callbackData = {
          MerchantTxnId: merchantTxnId,
          GatewayTxnId: gatewayTxnId
        };
        
        // Process the complete NPS payment flow
        console.log('Calling handleNPSPaymentCallback...');
        const result = await api.handleNPSPaymentCallback(callbackData, bookingDetails);
        
        console.log('Payment callback result:', result);
        
        if (result.success) {
          if (result.status === 'SUCCESS') {
            setStatus('success');
            setMessage('Payment successful! Your tickets have been booked.');
            setPaymentDetails({
              transactionId: merchantTxnId,
              bookingDetails: result.data.booking,
              statusMessage: result.data.statusMessage
            });
            
            // Clear pending booking details
            sessionStorage.removeItem('pendingBookingDetails');
            
            // Redirect to success page after 3 seconds
            setTimeout(() => {
              navigate('/payment-success', {
                state: {
                  transactionId: merchantTxnId,
                  bookingDetails: result.data.booking,
                  message: result.message
                }
              });
            }, 3000);
            
          } else if (result.status === 'PENDING') {
            setStatus('pending');
            setMessage('Payment is being processed. Please wait...');
            
            // Continue polling for status updates
            setTimeout(() => {
              window.location.reload(); // Refresh to check status again
            }, 5000);
            
          } else {
            throw new Error(result.message || 'Payment processing failed');
          }
        } else {
          throw new Error(result.message || 'Payment verification failed');
        }
        
      } catch (error) {
        console.error('Payment callback processing error:', error);
        setStatus('failed');
        setMessage(error.message || 'Failed to process payment callback');
        
        // Redirect to failure page after 3 seconds
        setTimeout(() => {
          navigate('/payment-cancelled', {
            state: {
              transactionId: searchParams.get('MerchantTxnId'),
              reason: error.message
            }
          });
        }, 3000);
      }
    };

    processPaymentCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {status === 'processing' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Payment</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-green-900 mb-2">Payment Successful!</h2>
              <p className="text-green-700 mb-4">{message}</p>
              {paymentDetails && (
                <div className="text-left bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Transaction ID:</strong> {paymentDetails.transactionId}
                  </p>
                  {paymentDetails.bookingDetails && (
                    <p className="text-sm text-green-700 mt-1">
                      <strong>Booking ID:</strong> {paymentDetails.bookingDetails.bookingId || 'Processing...'}
                    </p>
                  )}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-4">Redirecting to confirmation page...</p>
            </>
          )}
          
          {status === 'pending' && (
            <>
              <div className="animate-pulse rounded-full h-16 w-16 bg-yellow-200 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-yellow-900 mb-2">Payment Pending</h2>
              <p className="text-yellow-700">{message}</p>
              <p className="text-sm text-gray-500 mt-4">This page will refresh automatically...</p>
            </>
          )}
          
          {status === 'failed' && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-900 mb-2">Payment Failed</h2>
              <p className="text-red-700">{message}</p>
              <p className="text-sm text-gray-500 mt-4">Redirecting to failure page...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
