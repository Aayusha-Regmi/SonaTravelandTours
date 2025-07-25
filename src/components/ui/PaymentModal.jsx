import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../utils/authToken';
import httpInterceptor, { setSessionExpiredCallback } from '../../services/httpInterceptor';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  totalPrice, 
  passengers, 
  selectedSeats, 
  travelDate, 
  bookingDetails, 
  searchParams,
  selectedCategory,
  onPaymentSuccess 
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: instruments, 2: success
  const [isLoading, setIsLoading] = useState(false);
  const [paymentTransaction, setPaymentTransaction] = useState(null);
  const [paymentInstruments, setPaymentInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [serviceCharge, setServiceCharge] = useState(0);
  // const [qrData, setQrData] = useState(null); // Removed QR functionality
  // const [webSocket, setWebSocket] = useState(null); // Removed - QR WebSocket not needed
  const [searchQuery, setSearchQuery] = useState('');

  // Session expiry handler for payment modal
  const handleSessionExpiry = (message = 'Session expired. Please login again to continue payment.') => {
    console.warn('PaymentModal: Session expired, redirecting to login');
    
    // Clear all auth tokens
    clearAuthToken();
    
    // Close the payment modal
    onClose();
    
    // Show session expiry message and redirect
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        navigate('/login', { 
          state: { 
            sessionExpired: true,
            message: message,
            returnUrl: window.location.pathname + window.location.search 
          }
        });
      }
    });
  };

  // Initialize payment modal when opened
  useEffect(() => {
    if (isOpen) {
      // Store booking data immediately when modal opens (fix for callback storage issue)
      const bookingData = {
        totalPrice: totalPrice,
        passengers: passengers,
        selectedSeats: selectedSeats,
        travelDate: travelDate,
        bookingDetails: bookingDetails,
        searchParams: searchParams
      };
      
      // Store in both sessionStorage and localStorage for redundancy
      sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      localStorage.setItem('currentBookingData', JSON.stringify(bookingData));
      console.log('💾 Booking data stored immediately on modal open for callback safety');
      
      // Set up session expiry handler for this modal
      setSessionExpiredCallback(() => {
        handleSessionExpiry('Please login to continue with payment');
      });
      
      // Override global session handler while modal is open
      window.sessionExpiredHandlerOverride = true;
      
      // Load payment instruments only
      loadPaymentInstruments();
    }
    
    // Cleanup
    return () => {
      // Restore global session handler
      window.sessionExpiredHandlerOverride = false;
    };
  }, [isOpen]);

  // Filter instruments based on selected category and search query
  useEffect(() => {
    if (!paymentInstruments.length) {
      setFilteredInstruments([]);
      return;
    }

    let filtered = [...paymentInstruments];

    // Filter by category
    if (selectedCategory) {
      const categoryMap = {
        'card': ['Card'], // If API has specific card types
        'wallet': ['CheckoutGateway'], // Digital wallets
        'mobile': ['MBanking'], // Mobile banking
        'internet': ['EBanking'] // Internet banking
      };

      const allowedBankTypes = categoryMap[selectedCategory.id] || [];
      if (allowedBankTypes.length > 0) {
        filtered = filtered.filter(instrument => 
          allowedBankTypes.includes(instrument.bankType)
        );
      }
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(instrument =>
        instrument.name.toLowerCase().includes(query) ||
        instrument.bankType.toLowerCase().includes(query)
      );
    }

    setFilteredInstruments(filtered);
  }, [paymentInstruments, selectedCategory, searchQuery]);

  const loadPaymentInstruments = async () => {
    setIsLoading(true);
    try {
      // Step 2: Get Payment Instruments
      const instruments = await api.getPaymentInstruments();
      
      if (instruments.success) {
        setPaymentInstruments(instruments.data);
        
        if (instruments.fallback) {
          toast.info('Using offline payment methods. Some options may be limited.');
        } else {
          toast.success(`Payment methods loaded for ${selectedCategory?.name || 'selected category'}.`);
        }
      } else {
        console.error('❌ Failed to load payment instruments:', instruments.message);
        
        // Try to use fallback instruments
        const fallbackInstruments = api.getFallbackPaymentInstruments();
        setPaymentInstruments(fallbackInstruments);
        toast.warn('Payment service temporarily unavailable. Using offline payment methods.');
      }
    } catch (error) {
      console.error('Payment instruments loading error:', error);
      
      // HTTP interceptor will handle authentication errors automatically
      if (error.message === 'AUTHENTICATION_REQUIRED') {
        // Session expiry already handled by interceptor
        return;
      }
      
      toast.error(`Payment system unavailable: ${error.message || 'Please try again later'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstrumentSelect = async (instrument) => {
    if (!instrument) {
      toast.error('Please select a valid payment method');
      return;
    }
    
    console.log('🔄 Payment instrument selected:', instrument.name);
    console.log('💰 Initiating payment for amount:', totalPrice);
    
    setSelectedInstrument(instrument);
    setIsLoading(true);
    setStep(2); // Show processing screen
    
    try {
      // Store booking details in session storage for callback handling
      const bookingData = {
        totalPrice: totalPrice,
        passengers: passengers,
        selectedSeats: selectedSeats,
        travelDate: travelDate,
        bookingDetails: bookingDetails,
        searchParams: searchParams,
        selectedInstrument: instrument
      };
      sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData));
      
      console.log('📞 Calling initiate-payment API...');
      
      // Call initiate-payment API with instrument code
      const paymentInitiated = await api.initiatePayment(totalPrice, instrument.instrumentCode);
      
      console.log('📞 Payment initiation response:', paymentInitiated);
      
      if (paymentInitiated.success) {
        setPaymentTransaction(paymentInitiated.data);
        // CONSOLE LOGGING STOPPED HERE - No more detailed logs after initiate-payment
        
        toast.success('Payment initiated successfully!');
        
        // Prepare success and failure URLs
        const successUrl = `${window.location.origin}/payment/success`;
        const failureUrl = `${window.location.origin}/payment/failure`;
        
        // Save booking details to sessionStorage for callback processing
        const bookingDetailsForCallback = {
          // Passenger details
          passengerName: passengers?.[0]?.fullName || bookingDetails?.passengerDetails?.name || 'Unknown Passenger',
          contactNumber: passengers?.[0]?.phoneNumber || bookingDetails?.contactInfo?.phone || 'N/A',
          emailId: passengers?.[0]?.email || bookingDetails?.contactInfo?.email || 'N/A',
          gender: passengers?.[0]?.gender || 'N/A',
          age: passengers?.[0]?.age || 0,
          
          // Seat and travel details
          selectedSeats: selectedSeats,
          seatNumber: Array.isArray(selectedSeats) ? selectedSeats.join(',') : selectedSeats,
          boardingLocation: searchParams?.from || bookingDetails?.fromLocation,
          onboardingLocation: searchParams?.to || bookingDetails?.toLocation,
          destination: searchParams?.to || bookingDetails?.toLocation,
          vesselId: bookingDetails?.busId || searchParams?.busId,
          travelDate: travelDate,
          
          // Payment details
          amount: totalPrice,
          paymentMethod: 'NPS',
          merchantTransactionId: paymentInitiated.data.merchantTransactionId,
          remarks: `Booking for ${selectedSeats.join(', ')} on ${travelDate}`
        };
        
        console.log('Saving booking details for callback:', bookingDetailsForCallback);
        sessionStorage.setItem('pendingBookingDetails', JSON.stringify(bookingDetailsForCallback));
        
        // Redirect to Nepal Payment Gateway with the data from initiate-payment
        const redirected = api.redirectToPaymentGateway(
          paymentInitiated.data,
          successUrl,
          failureUrl,
          {
            // Additional parameters if needed
            instrumentCode: instrument.instrumentCode, // Pass the selected instrument code
            callbackUrl: `${window.location.origin}/payment/callback`,
            returnUrl: `${window.location.origin}/payment/callback`, // Use our callback URL
            remarks: `Booking for ${selectedSeats.join(', ')} on ${travelDate}`,
            customerEmail: bookingDetails?.contactInfo?.email || '',
            customerPhone: bookingDetails?.contactInfo?.phone || ''
          }
        );
        
        if (redirected) {
          console.log('Redirecting to payment gateway...');
        } else {
          console.error('Failed to redirect to payment gateway');
          // Fallback to polling as before
          pollPaymentStatus(paymentInitiated.data);
        }
        
      } else {
        const errorMsg = paymentInitiated.message || 'Payment initiation failed';
        toast.error(`Payment Error: ${errorMsg}`);
        setStep(1);
        setSelectedInstrument(null);
      }
      
    } catch (error) {
      toast.error(`Payment Error: ${error.message || 'Payment initiation failed'}`);
      setStep(1);
      setSelectedInstrument(null);
    } finally {
      setIsLoading(false);
    }
  };

  // OnePG polling functionality - Console logging disabled
  const pollPaymentStatus = async (transactionData) => {
    const maxAttempts = 30; // Poll for 5 minutes (30 * 10 seconds)
    let attempts = 0;
    
    const checkStatus = async () => {
      try {
        attempts++;
        // Silent polling - no console logs
        
        // Call the onepg API to check status
        const statusResponse = await api.checkPaymentStatusOnePG(
          transactionData.merchantTransactionId,
          transactionData.processId
        );
        
        if (statusResponse && statusResponse.success) {
          const statusData = statusResponse.data;
          
          // Check if payment is successful
          if (statusData && (statusData.status === 'SUCCESS' || statusData.paymentStatus === 'SUCCESS' || statusData === 'already received')) {
            toast.success('Payment completed successfully!');
            setStep(3);
            
            // Call success callback after a delay
            setTimeout(() => {
              onPaymentSuccess && onPaymentSuccess(statusData);
              onClose();
            }, 3000);
            
            return; // Stop polling
            
          } else if (statusData && (statusData.status === 'FAILED' || statusData.paymentStatus === 'FAILED')) {
            toast.error('Payment failed. Please try again.');
            setStep(1);
            setSelectedInstrument(null);
            return; // Stop polling
          }
          
          // Payment still pending, continue polling silently
        }
        
        // Continue polling if not complete and attempts remaining
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000); // Check every 10 seconds
        } else {
          toast.error('Payment status check timeout. Please verify your payment manually.');
          setStep(1);
          setSelectedInstrument(null);
        }
        
      } catch (error) {
        // Silent error handling - no console logs
        
        // Retry if attempts remaining
        if (attempts < maxAttempts) {
          setTimeout(checkStatus, 10000);
        } else {
          toast.error('Unable to verify payment status. Please check manually.');
          setStep(1);
          setSelectedInstrument(null);
        }
      }
    };
    
    // Start status checking after a brief delay - silently
    setTimeout(checkStatus, 5000); // Wait 5 seconds before first check
  };

  // QR generation removed - using NPS payment flow instead
  const handleProceedToNPS = async () => {
    if (!selectedInstrument) {
      toast.error('Please select a payment method');
      return;
    }
    
    toast.info('Proceeding with NPS payment flow...');
    // TODO: Implement NPS payment integration
    setStep(2); // Skip to success for now
  };

  // FonePay status polling removed - using NPS payment flow

  // Payment status checking removed - using NPS payment flow

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && `${selectedCategory?.name || 'Payment'} Methods`}
              {step === 2 && 'Processing Payment'}
              {step === 3 && 'Payment Successful!'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Search bar - only show in step 1 */}
          {step === 1 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search payment methods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-8 py-5">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          )}

          {/* Step 1: Payment Instruments */}
          {step === 1 && !isLoading && (
            <div>
              <p className="text-gray-600 mb-4 text-center">
                Select your preferred {selectedCategory?.name.toLowerCase()} payment method
              </p>

              {/* Payment instruments grid - 3 columns */}
              {filteredInstruments && filteredInstruments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                  {filteredInstruments.map((instrument, index) => (
                    <button
                      key={instrument.instrumentCode || `instrument-${index}`}
                      onClick={() => handleInstrumentSelect(instrument)}
                      className={`p-3 border-2 rounded-lg flex items-center transition-all duration-200 ${
                        selectedInstrument?.instrumentCode === instrument.instrumentCode
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-300 hover:border-blue-600 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center space-x-2 w-full">
                        {instrument.logoUrl ? (
                          <img 
                            src={instrument.logoUrl} 
                            alt={instrument.name} 
                            className="h-9 w-9 object-contain flex-shrink-0"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 ${instrument.logoUrl ? 'hidden' : ''}`}
                        >
                          <span className="text-white font-bold text-sm">
                            {instrument.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-left flex-1 overflow-hidden">
                          <p className="font-medium text-gray-800 text-sm truncate">{instrument.name}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {instrument.bankType === 'CheckoutGateway' && 'Digital Wallet'}
                            {instrument.bankType === 'EBanking' && 'Internet Banking'}
                            {instrument.bankType === 'MBanking' && 'Mobile Banking'}
                            {!['CheckoutGateway', 'EBanking', 'MBanking'].includes(instrument.bankType) && instrument.bankType}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">
                    {searchQuery ? `No payment methods found for "${searchQuery}"` : `No ${selectedCategory?.name.toLowerCase()} payment methods available`}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-2"
                    >
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Refresh
                  </button>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-blue-900">Total Amount:</span>
                  <span className="text-base font-bold text-blue-900">Rs. {totalPrice}</span>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Click on any payment method above to proceed with payment
                </p>
              </div>
            </div>
          )}

          {/* Step 2: NPS Payment Processing */}
          {step === 2 && (
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Processing your payment with {selectedInstrument?.name}...
              </p>

              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-blue-50 border-2 border-blue-200 rounded-full flex items-center justify-center mb-4">
                  <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    Amount: Rs. {totalPrice}
                  </p>
                  <p className="text-sm text-gray-600">
                    Transaction ID: {paymentTransaction?.merchantTransactionId || 'Generating...'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="animate-pulse flex items-center text-blue-600">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">
                    Processing payment...
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Payment Successful!
              </h3>
              
              <p className="text-gray-600 mb-4">
                Your booking has been confirmed for seats {selectedSeats.join(', ')}
              </p>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Transaction ID:</span>
                    <p className="text-green-700 font-mono text-xs break-all">{paymentTransaction?.merchantTransactionId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">PRN:</span>
                    <p className="text-green-700 font-mono text-xs">{paymentTransaction?.merchantTransactionId || 'Transaction Complete'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Amount Paid:</span>
                    <p className="text-green-700 font-bold">Rs. {totalPrice}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Passengers:</span>
                    <p className="text-green-700">{passengers.length}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                Redirecting to booking confirmation...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;
