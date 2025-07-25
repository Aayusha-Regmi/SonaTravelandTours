import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paymentService from '../../services/paymentServiceNew';

// Helper function to format date to YYYY-MM-DD format for API
const formatDateForAPI = (dateString) => {
  if (!dateString) return new Date().toISOString().split('T')[0];
  
  try {
    // Handle different date formats
    let date;
    
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    // Parse the date string and convert to YYYY-MM-DD
    date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn('Invalid date format:', dateString);
      return new Date().toISOString().split('T')[0]; // Return today's date as fallback
    }
    
    // Format to YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date().toISOString().split('T')[0]; // Return today's date as fallback
  }
};

// Enhanced validation function for transaction IDs
const validateTransactionId = (merchantTxnId) => {
  console.log('🔍 Validating transaction ID:', merchantTxnId);
  
  // Check if transaction ID has been used before (in the last 24 hours)
  const usedTransactions = JSON.parse(localStorage.getItem('usedTransactionIds') || '{}');
  const now = Date.now();
  const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
  
  // Clean up old transaction IDs (older than 24 hours)
  Object.keys(usedTransactions).forEach(txnId => {
    if (usedTransactions[txnId] < twentyFourHoursAgo) {
      delete usedTransactions[txnId];
    }
  });
  
  // Check if this transaction ID was already used
  if (usedTransactions[merchantTxnId]) {
    const usedTime = new Date(usedTransactions[merchantTxnId]).toLocaleString();
    throw new Error(`This transaction ID was already used on ${usedTime}. Please initiate a new payment.`);
  }
  
  // Mark this transaction as used
  usedTransactions[merchantTxnId] = now;
  localStorage.setItem('usedTransactionIds', JSON.stringify(usedTransactions));
  
  console.log('✅ Transaction ID validation passed');
  return true;
};

// Function to clear all payment-related storage after successful booking
const clearPaymentStorage = () => {
  console.log('🧹 Clearing payment-related storage...');
  
  // Clear session storage
  sessionStorage.removeItem('pendingBooking');
  sessionStorage.removeItem('attemptedBookings');
  
  // Clear local storage
  localStorage.removeItem('currentBookingData');
  localStorage.removeItem('redirectAfterLogin');
  
  console.log('✅ Payment storage cleared');
};

const HomeCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentParams, setPaymentParams] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [transactionResult, setTransactionResult] = useState(null);
  const [error, setError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [showReceiptButtons, setShowReceiptButtons] = useState(false);

  useEffect(() => {
    // Extract query parameters from URL
    const urlParams = new URLSearchParams(location.search);
    const merchantTxnId = urlParams.get('MerchantTxnId');
    const gatewayTxnId = urlParams.get('GatewayTxnId');
    
    console.log('🎯 NPS callback detected on /home:', {
      merchantTxnId,
      gatewayTxnId,
      fullSearch: location.search
    });

    if (merchantTxnId && gatewayTxnId) {
      try {
        // Validate transaction ID before processing
        validateTransactionId(merchantTxnId);
        
        // Store the payment parameters
        setPaymentParams({
          merchantTxnId,
          gatewayTxnId,
          timestamp: new Date().toISOString()
        });
        
        // Immediately call /payment/onepg API
        checkPaymentStatusOnePg(merchantTxnId, gatewayTxnId);
      } catch (validationError) {
        console.error('❌ Transaction validation failed:', validationError.message);
        
        // Still set payment params so we don't get stuck in loading state
        setPaymentParams({
          merchantTxnId,
          gatewayTxnId,
          timestamp: new Date().toISOString()
        });
        
        setPaymentStatus('error');
        setError(validationError.message);
        setIsProcessing(false);
      }
    } else {
      // No payment parameters, redirect to main home page
      console.log('No payment parameters found, redirecting to /main');
      navigate('/main', { replace: true });
    }
  }, [location.search, navigate]);

  // Step 1: Check payment status using /payment/onepg API
  const checkPaymentStatusOnePg = async (merchantTxnId, gatewayTxnId) => {
    console.log('Step 1: Checking payment status with /payment/onepg...');
    
    setPaymentStatus('checking');
    
    try {
      const result = await paymentService.checkPaymentOnePg(merchantTxnId, gatewayTxnId);
      
      console.log('📥 Payment status result:', result);
      setTransactionResult(result);
      
      if (result.success && result.isPaymentSuccessful) {
        console.log('✅ Payment successful, proceeding to book seats...');
        setPaymentStatus('booking');
        
        // Step 2: Call /seat/payment to book seats
        await bookSeatsAfterPayment(merchantTxnId);
      } else {
        console.log('❌ Payment failed or not successful:', result.status);
        setPaymentStatus('failed');
        setError('Payment got failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error in payment status check:', error);
      setPaymentStatus('error');
      setError(error.message || 'Failed to check payment status');
    }
  };

  // Step 2: Book seats after successful payment verification
  const bookSeatsAfterPayment = async (merchantTxnId) => {
    console.log('🎫 Step 2: Booking seats after payment verification...');
    
    // Check if we've already attempted booking with this transaction ID
    const attemptedBookings = JSON.parse(sessionStorage.getItem('attemptedBookings') || '[]');
    if (attemptedBookings.includes(merchantTxnId)) {
      console.log('⚠️ Booking already attempted for this transaction ID:', merchantTxnId);
      setPaymentStatus('booking_error');
      setError('Booking was already attempted for this transaction. Please contact support if you need assistance.');
      return;
    }
    
    // Mark this transaction as attempted
    attemptedBookings.push(merchantTxnId);
    sessionStorage.setItem('attemptedBookings', JSON.stringify(attemptedBookings));
    
    try {
      // Get raw stored booking data - check multiple possible keys
      let storedData = sessionStorage.getItem('pendingBooking') || 
                      localStorage.getItem('currentBookingData') || 
                      localStorage.getItem('redirectAfterLogin');
      
      if (!storedData) {
        throw new Error('Payment context not found in storage. Please try the payment again.');
      }
      
      const rawBookingData = JSON.parse(storedData);
      console.log('💾 Retrieved raw booking data:', rawBookingData);
      
      // Handle different storage formats
      let bookingData = {};
      if (rawBookingData.state) {
        bookingData = rawBookingData.state;
      } else {
        bookingData = rawBookingData;
      }
      
      // Construct seat payment data in the exact format expected by the API
      const seatPaymentData = {
        seatInfo: {
          dateOfTravel: formatDateForAPI(bookingData.travelDate), // Fixed: Convert to YYYY-MM-DD format
          busId: parseInt(bookingData.bookingDetails?.busId) || parseInt(bookingData.busId) || 102,
          passengersList: (bookingData.passengers || []).map((passenger, index) => {
            // Generate a more unique seat number if fallback is needed
            const fallbackSeatNo = passenger.seatNumber || 
                                  bookingData.selectedSeats?.[index] || 
                                  `S${Date.now()}-${index + 1}`;
            
            return {
              passengerName: passenger.fullName || passenger.name || `Passenger ${index + 1}`,
              contactNumber: String(passenger.phoneNumber || passenger.phone || "9999999999"), // Fixed: Keep as string, not parseInt
              seatNo: passenger.id || fallbackSeatNo,
              origin: (bookingData.searchParams?.fromCity || bookingData.searchParams?.from || "Birgunj").toLowerCase(), // Fixed: Lowercase
              destination: (bookingData.searchParams?.toCity || bookingData.searchParams?.to || "Kathmandu").toLowerCase(), // Fixed: Lowercase
              gender: passenger.gender?.toLowerCase() === 'male' ? 'male' : 
                     passenger.gender?.toLowerCase() === 'female' ? 'female' : 'male',
              boardingLocation: passenger.boardingPlace || "Bus Park",
              deboardingLocation: passenger.droppingPlace || "Kalanki",
              residence: passenger.cityOfResidence || "nepali",
              email: passenger.email || `passenger${index + 1}@sonabus.com`
            };
          })
        },
        paymentInfo: {
          merchantTransactionId: merchantTxnId
        }
      };
      
      // 🚨 EXACT JSON FOR POSTMAN TESTING 🚨
      console.log('🔥 COPY THIS JSON FOR POSTMAN:');
      console.log('POST URL: https://6le3z7icgf.execute-api.us-east-1.amazonaws.com/prod/seat/payment');
      console.log('Headers: Content-Type: application/json');
      console.log('Body (JSON):');
      console.log(JSON.stringify(seatPaymentData, null, 2));
      
      // 🔍 Enhanced debugging for 500 error diagnosis
      console.log(' DEBUG: Authentication check before API call');
      console.log(' Auth token exists:', !!localStorage.getItem('authToken') || !!sessionStorage.getItem('authToken'));
      console.log(' Seat payment data validation:');
      console.log('- Travel date format:', seatPaymentData.seatInfo.dateOfTravel);
      console.log('- Bus ID type:', typeof seatPaymentData.seatInfo.busId, seatPaymentData.seatInfo.busId);
      console.log('- Passengers count:', seatPaymentData.seatInfo.passengersList.length);
      console.log('- Merchant transaction ID:', seatPaymentData.paymentInfo.merchantTransactionId);
      
      const result = await paymentService.processSeatPayment(seatPaymentData);
      
      console.log(' Seat booking result:', result);
      setBookingResult(result);
      
      if (result.success && result.isBookingSuccessful) {
        console.log('✅ Seats booked successfully!');
        setPaymentStatus('success');
        
        // Clear all payment-related storage after successful booking
        clearPaymentStorage();
        
        // Extract receipt data from the response
        if (result.data) {
          setReceiptData({
            paymentDetails: result.data.paymentDetails || {},
            bookingDetails: result.data.bookingDetails || {},
            receipt: result.data.receipt || {},
            transactionId: result.data.paymentDetails?.merchantTransactionId || merchantTxnId,
            ticketNumber: result.data.bookingDetails?.ticketNumber || 'N/A',
            PNR: result.data.bookingDetails?.PNR || 'N/A'
          });
        } else {
          // Fallback receipt data using available information
          setReceiptData({
            paymentDetails: {
              merchantTransactionId: merchantTxnId,
              status: 'Success',
              paymentMethod: 'NPS Gateway'
            },
            bookingDetails: {
              ticketNumber: `SONA-${merchantTxnId.substring(0, 8)}`,
              PNR: `PNR-${Date.now()}`,
              status: 'Confirmed'
            },
            receipt: {
              bookingDate: new Date().toISOString().split('T')[0],
              bookingTime: new Date().toLocaleTimeString()
            },
            transactionId: merchantTxnId,
            ticketNumber: `SONA-${merchantTxnId.substring(0, 8)}`,
            PNR: `PNR-${Date.now()}`
          });
        }
        
        // Show loading receipt for 2 seconds, then show receipt buttons
        setTimeout(() => {
          console.log(' Receipt data ready for display:', receiptData);
          setShowReceiptButtons(true);
        }, 2000);
        
        // Clean up stored context
        sessionStorage.removeItem('pendingBooking');
        sessionStorage.removeItem('pendingBookingDetails');
        localStorage.removeItem('currentBookingData');
        localStorage.removeItem('redirectAfterLogin');
        
        setTimeout(() => {
          setIsProcessing(false);
        }, 3000);
      } else {
        console.log(' Seat booking failed:', result.error);
        
        // Check if payment was successful but booking failed
        if (result.data?.paymentDetails?.status === 'fail') {
          setPaymentStatus('failed');
          setError('Payment got failed. Please try again.');
        } else {
          setPaymentStatus('booking_failed');
          setError('Booking failed after successful payment. Please contact support.');
        }
      }
    } catch (error) {
      console.error(' Error in seat booking:', error);
      
      // Handle specific database constraint violations
      if (error.message && error.message.includes('UNIQUE KEY constraint')) {
        if (error.message.includes('UNIQUE_SeatNumber_TravelDate_Source_Destination')) {
          setPaymentStatus('booking_error');
          setError('The selected seat has already been booked by another passenger. Your payment was successful, please contact support for a refund or alternative booking.');
        } else {
          setPaymentStatus('booking_error');
          setError('Seat booking conflict detected. Please contact support with your transaction ID.');
        }
      } else {
        setPaymentStatus('booking_error');
        setError(error.message || 'Error occurred while booking seats');
      }
    }
  };

  // Function to handle retry payment
  const handleRetryPayment = () => {
    console.log('🔄 Handling retry payment...');
    
    // Clear any old transaction data to prevent reuse
    const usedTransactions = JSON.parse(localStorage.getItem('usedTransactionIds') || '{}');
    if (paymentParams?.merchantTxnId) {
      delete usedTransactions[paymentParams.merchantTxnId];
      localStorage.setItem('usedTransactionIds', JSON.stringify(usedTransactions));
    }
    
    // Clear current attempt tracking
    sessionStorage.removeItem('attemptedBookings');
    
    // Check if we have booking data to retry with
    const bookingData = localStorage.getItem('currentBookingData') || 
                       sessionStorage.getItem('pendingBooking') ||
                       localStorage.getItem('redirectAfterLogin');
    
    if (bookingData) {
      // Store retry data and navigate to payment
      sessionStorage.setItem('retryBookingData', bookingData);
      console.log('📦 Saved booking data for retry, navigating to payment page');
      navigate('/payment');
    } else {
      // No booking data found, redirect to search results
      console.log('❌ No booking data found, redirecting to search results');
      navigate('/search-results');
    }
  };

  // Function to close receipt popup
  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceiptData(null);
  };

  // Function to download receipt as PDF
  const downloadReceiptPDF = () => {
    if (!receiptData) return;

    // Create HTML content for PDF
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Receipt - Sona Travel & Tours</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 20px; margin-bottom: 30px; }
          .company-name { font-size: 24px; font-weight: bold; color: #4CAF50; margin-bottom: 5px; }
          .receipt-title { font-size: 18px; color: #666; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 16px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dotted #ddd; }
          .detail-label { font-weight: bold; color: #555; }
          .detail-value { color: #333; }
          .success-badge { background: #4CAF50; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; display: inline-block; margin: 10px 0; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
          .transaction-id { background: #f8f9fa; padding: 10px; border-radius: 5px; font-family: monospace; text-align: center; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">Sona Travel & Tours</div>
          <div class="receipt-title">Payment Receipt</div>
          <div class="success-badge">✓ Payment Successful</div>
        </div>

        <div class="section">
          <div class="section-title">Transaction Information</div>
          <div class="transaction-id">
            Transaction ID: ${receiptData.transactionId || 'N/A'}
          </div>
          <div class="detail-row">
            <span class="detail-label">Date & Time:</span>
            <span class="detail-value">${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Booking Details</div>
          <div class="detail-row">
            <span class="detail-label">Ticket Number:</span>
            <span class="detail-value">${receiptData.ticketNumber || 'N/A'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">PNR:</span>
            <span class="detail-value">${receiptData.PNR || 'N/A'}</span>
          </div>
        </div>

        ${receiptData.paymentDetails && Object.keys(receiptData.paymentDetails).length > 0 ? `
        <div class="section">
          <div class="section-title">Payment Details</div>
          ${Object.entries(receiptData.paymentDetails).map(([key, value]) => `
            <div class="detail-row">
              <span class="detail-label">${key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span class="detail-value">${String(value)}</span>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${receiptData.bookingDetails && Object.keys(receiptData.bookingDetails).length > 0 ? `
        <div class="section">
          <div class="section-title">Booking Information</div>
          ${Object.entries(receiptData.bookingDetails).filter(([key]) => key !== 'ticketNumber' && key !== 'PNR').map(([key, value]) => `
            <div class="detail-row">
              <span class="detail-label">${key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span class="detail-value">${String(value)}</span>
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${receiptData.receipt && Object.keys(receiptData.receipt).length > 0 ? `
        <div class="section">
          <div class="section-title">Receipt Details</div>
          ${Object.entries(receiptData.receipt).map(([key, value]) => `
            <div class="detail-row">
              <span class="detail-label">${key.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <span class="detail-value">${String(value)}</span>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for choosing Sona Travel & Tours!</p>
          <p>For support, please contact us with your transaction ID.</p>
          <p>🔒 This receipt is digitally generated and valid for your booking.</p>
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Wait for content to load then trigger print dialog
    printWindow.onload = function() {
      printWindow.print();
      
      // Optional: Close the window after printing
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  };

  // Show loading state only when we don't have payment params AND we're not in an error state
  if (!paymentParams && paymentStatus !== 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            paymentStatus === 'success' ? 'bg-green-600' : 
            paymentStatus === 'failed' || paymentStatus === 'error' || paymentStatus === 'booking_failed' || paymentStatus === 'booking_error' ? 'bg-red-600' : 
            'bg-blue-600'
          }`}>
            {paymentStatus === 'success' ? (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : paymentStatus === 'failed' || paymentStatus === 'error' || paymentStatus === 'booking_failed' || paymentStatus === 'booking_error' ? (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sona Travel & Tours</h1>
        </div>

        {paymentStatus === 'checking' && (
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Checking Payment Status</h2>
            <p className="text-gray-600">Verifying your payment...</p>
          </div>
        )}

        {paymentStatus === 'booking' && (
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Booking Your Seats</h2>
            <p className="text-gray-600">Payment verified! Confirming your reservation...</p>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Your seats have been booked successfully.</p>
            
            {/* Loading Receipt State */}
            {!showReceiptButtons && receiptData && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-200 border-t-green-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Generating receipt...</p>
              </div>
            )}
            
            {/* Show Receipt and Download Button */}
            {showReceiptButtons && receiptData && (
              <div className="mt-4 space-y-3">
                <button 
                  onClick={() => {
                    console.log('📋 Opening receipt popup with data:', receiptData);
                    setShowReceipt(true);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  View Receipt
                </button>
                <button 
                  onClick={downloadReceiptPDF}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Download Receipt PDF
                </button>
                <button 
                  onClick={() => {
                    console.log('🔙 Navigating to My Bookings...');
                    // Navigate to user profile with my bookings tab active
                    navigate('/profile?tab=bookings', { 
                      replace: true,
                      state: { 
                        activeTab: 'bookings',
                        fromPaymentSuccess: true 
                      }
                    });
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Go back
                </button>
              </div>
            )}
          </div>
        )}

        {(paymentStatus === 'failed' || paymentStatus === 'error' || paymentStatus === 'booking_failed' || paymentStatus === 'booking_error') && (
          <div className="mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              {paymentStatus === 'failed' ? 'Payment Failed' : 
               paymentStatus === 'booking_failed' ? 'Booking Failed' : 'Error Occurred'}
            </h2>
            <p className="text-gray-600">{error || 'Something went wrong with your transaction.'}</p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Transaction Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-mono text-gray-900 text-xs">
                {paymentParams.merchantTxnId.substring(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gateway ID:</span>
              <span className="font-mono text-gray-900 text-xs">
                {paymentParams.gatewayTxnId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className={`font-medium ${
                paymentStatus === 'success' ? 'text-green-600' : 
                paymentStatus === 'failed' || paymentStatus === 'error' || paymentStatus === 'booking_failed' || paymentStatus === 'booking_error' ? 'text-red-600' : 
                'text-blue-600'
              }`}>
                {paymentStatus === 'checking' ? 'Checking' :
                 paymentStatus === 'booking' ? 'Booking' :
                 paymentStatus === 'success' ? 'Success' :
                 paymentStatus === 'failed' ? 'Payment Failed' :
                 paymentStatus === 'booking_failed' ? 'Booking Failed' :
                 paymentStatus === 'error' ? 'Error' :
                 paymentStatus === 'booking_error' ? 'Booking Error' :
                 'Processing'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          {(paymentStatus === 'failed' || paymentStatus === 'error') && (
            <button 
              onClick={handleRetryPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mb-4"
            >
              Try Again
            </button>
          )}
          
          {(paymentStatus === 'booking_failed' || paymentStatus === 'booking_error') && (
            <div className="space-y-3">
              {error && error.includes('already been booked') ? (
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/search')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Find Alternative Seats
                  </button>
                  <button 
                    onClick={() => window.open('tel:+977-1-4444444')}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Contact Support for Refund
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleRetryPayment}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Retry Payment Process
                </button>
              )}
            </div>
          )}
          
          <p className="text-xs text-gray-500">
            🔒 Your payment is processed securely through NPS Gateway
          </p>
        </div>

        {/* Receipt Popup */}
        {showReceipt && receiptData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Receipt</h3>
                  <button 
                    onClick={handleCloseReceipt}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Transaction Info */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="font-medium text-green-800">Payment Successful</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Transaction ID: {receiptData.transactionId}
                    </p>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Ticket Number:</span>
                        <span className="font-medium">{receiptData.ticketNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PNR:</span>
                        <span className="font-medium">{receiptData.PNR}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {receiptData.paymentDetails && Object.keys(receiptData.paymentDetails).length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
                      <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        {Object.entries(receiptData.paymentDetails).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Receipt Details */}
                  {receiptData.receipt && Object.keys(receiptData.receipt).length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Receipt</h4>
                      <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                        {Object.entries(receiptData.receipt).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <button 
                    onClick={handleCloseReceipt}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCallback;
