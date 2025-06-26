import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  totalPrice, 
  passengers, 
  selectedSeats, 
  travelDate, 
  bookingDetails, 
  searchParams,
  onPaymentSuccess 
}) => {
  const [step, setStep] = useState(1); // 1: instruments, 2: qr, 3: success
  const [isLoading, setIsLoading] = useState(false);
  const [paymentTransaction, setPaymentTransaction] = useState(null);
  const [paymentInstruments, setPaymentInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [qrData, setQrData] = useState(null);
  const [webSocket, setWebSocket] = useState(null);

  // Initialize payment when modal opens
  useEffect(() => {
    if (isOpen) {
      initializePayment();
    }
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [isOpen]);

  const initializePayment = async () => {
    setIsLoading(true);
    try {
      console.log('🚀 Initializing payment for amount:', totalPrice);
      
      // Step 1: Initiate Payment
      const paymentInitiated = await api.initiatePayment(totalPrice);
      
      if (paymentInitiated.success) {
        setPaymentTransaction(paymentInitiated.data);
        console.log('✅ Payment initiated successfully:', paymentInitiated.data);
        
        // Step 2: Get Payment Instruments
        const instruments = await api.getPaymentInstruments();
        
        if (instruments.success) {
          setPaymentInstruments(instruments.data);
          toast.success('Payment initialized successfully. Please select a payment method.');
        } else {
          console.error('❌ Failed to load payment instruments:', instruments.message);
          toast.error(`Failed to load payment methods: ${instruments.message}`);
          onClose();
        }
      } else {
        console.error('❌ Payment initiation failed:', paymentInitiated);
        
        // Show detailed error message for debugging
        const errorMsg = paymentInitiated.message || 'Unknown error';
        const statusCode = paymentInitiated.statusCode || 'Unknown';
        
        toast.error(`Payment API Error (${statusCode}): ${errorMsg}`);
        
        // Show additional details in console for debugging
        if (paymentInitiated.details) {
          console.error('🔍 Payment API Error Details:', paymentInitiated.details);
        }
        
        onClose();
      }
    } catch (error) {
      console.error('❌ Payment initialization error:', error);
      toast.error(`Payment system unavailable: ${error.message || 'Please try again later'}`);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstrumentSelect = async (instrument) => {
    setSelectedInstrument(instrument);
    setIsLoading(true);
    
    try {
      // Get service charge for selected instrument
      const serviceChargeResult = await api.getServiceCharge(totalPrice, instrument.instrumentCode);
      
      if (serviceChargeResult.success) {
        setServiceCharge(serviceChargeResult.serviceCharge);
        toast.success(`Service charge: Rs. ${serviceChargeResult.serviceCharge}`);
      } else {
        console.warn('⚠️ Service charge API failed, using default charge');
        // Use a default service charge if API fails
        const defaultServiceCharge = Math.round(totalPrice * 0.02); // 2% default
        setServiceCharge(defaultServiceCharge);
        toast.info(`Using default service charge: Rs. ${defaultServiceCharge}`);
      }
    } catch (error) {
      console.error('Service charge error:', error);
      toast.error(`Failed to get service charge: ${error.message}`);
      setSelectedInstrument(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToQR = async () => {
    if (!selectedInstrument) {
      toast.error('Please select a payment method');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const totalWithServiceCharge = totalPrice + serviceCharge;
      const seatNumbers = selectedSeats.join(',');
      
      // Check if this is FonePay
      if (selectedInstrument.instrumentCode === 'FONEPAYG' || selectedInstrument.name?.toLowerCase().includes('fonepay')) {
        // Generate a unique PRN for FonePay
        const prn = `prn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        toast.info('Connecting to FonePay...');
        const fonePayResult = await api.generateFonePayQR(totalWithServiceCharge, travelDate, seatNumbers, prn);
        
        if (fonePayResult.success) {
          setQrData(fonePayResult.data);
          setStep(2);
          toast.success('FonePay QR generated successfully!');
          
          // For FonePay, we'll poll for status instead of WebSocket
          startFonePayStatusPolling(prn);
        } else {
          toast.error(fonePayResult.message || 'Failed to generate FonePay QR code');
        }
      } else {
        // Original QR generation for other payment methods
        const qrResult = await api.generateQRCode(totalWithServiceCharge, travelDate, seatNumbers);
        
        if (qrResult.success) {
          setQrData(qrResult.data);
          setStep(2);
          
          // Setup WebSocket for payment status
          if (qrResult.data.thirdpartyQrWebSocketUrl) {
            setupWebSocket(qrResult.data.thirdpartyQrWebSocketUrl);
          }
        } else {
          toast.error(qrResult.message || 'Failed to generate QR code');
        }
      }
    } catch (error) {
      console.error('QR generation error:', error);
      toast.error('Failed to generate QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // FonePay status polling
  const startFonePayStatusPolling = (prn) => {
    const pollInterval = setInterval(async () => {
      try {
        const statusResult = await api.checkFonePayStatus(prn);
        
        if (statusResult.success && statusResult.paymentStatus === 'success') {
          clearInterval(pollInterval);
          checkPaymentStatus();
        }
      } catch (error) {
        console.error('FonePay status polling error:', error);
      }
    }, 3000); // Poll every 3 seconds
    
    // Clear polling after 10 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 600000);
  };

  const setupWebSocket = (wsUrl) => {
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('🔌 WebSocket connected');
      };
      
      ws.onmessage = (event) => {
        console.log('📨 WebSocket message:', event.data);
        try {
          const data = JSON.parse(event.data);
          if (data.status === 'success' || data.paymentStatus === 'success') {
            checkPaymentStatus();
          }
        } catch (e) {
          console.log('Non-JSON WebSocket message:', event.data);
        }
      };
      
      ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };
      
      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
      };
      
      setWebSocket(ws);
    } catch (error) {
      console.error('❌ WebSocket setup error:', error);
    }
  };

  const checkPaymentStatus = async () => {
    try {
      if (!qrData?.prn) {
        throw new Error('No PRN available for payment verification');
      }
      
      const seatInfo = {
        dateOfTravel: travelDate || new Date().toISOString().split('T')[0],
        paymentAmount: totalPrice,
        payment_status: "Completed",
        paymentMode: "qr",
        passengersList: passengers.map(passenger => ({
          passengerName: passenger.fullName,
          contactNumber: parseInt(passenger.phoneNumber),
          seatNo: passenger.id,
          origin: bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu',
          destination: bookingDetails?.destination || searchParams?.toCity || 'Birgunj',
          gender: passenger.gender.toLowerCase(),
          boardingLocation: passenger.boardingPlace || 'Bus Park',
          deboardingLocation: passenger.droppingPlace || 'Kalanki',
          residence: passenger.cityOfResidence,
          email: passenger.email
        }))
      };
      
      const result = await api.checkPaymentStatus(seatInfo, { prn: qrData.prn });
      
      if (result.success) {
        setStep(3);
        toast.success(`Payment successful! Booking confirmed for seats ${selectedSeats.join(', ')}`);
        
        // Close WebSocket
        if (webSocket) {
          webSocket.close();
        }
        
        // Call success callback with booking details
        setTimeout(() => {
          onPaymentSuccess({
            bookingId: paymentTransaction?.merchantTransactionId,
            prn: qrData.prn,
            amount: totalPrice + serviceCharge,
            passengers: passengers.length,
            seats: selectedSeats
          });
        }, 2000);
      } else {
        toast.error(result.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('❌ Payment status check error:', error);
      toast.error('Failed to verify payment. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {step === 1 && 'Select Payment Method'}
              {step === 2 && 'Scan QR Code'}
              {step === 3 && 'Payment Successful!'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          )}

          {/* Step 1: Payment Instruments */}
          {step === 1 && !isLoading && (
            <div>
              <p className="text-gray-600 mb-6 text-center">
                Choose your preferred digital wallet or bank
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentInstruments.map((instrument) => (
                  <button
                    key={instrument.instrumentCode}
                    onClick={() => handleInstrumentSelect(instrument)}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      selectedInstrument?.instrumentCode === instrument.instrumentCode
                        ? 'border-blue-600 bg-blue-50 shadow-md'
                        : 'border-gray-300 hover:border-blue-600 hover:shadow-sm'
                    }`}
                  >
                    {instrument.logoUrl ? (
                      <img 
                        src={instrument.logoUrl} 
                        alt={instrument.name} 
                        className="h-12 w-auto max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-800">
                        {instrument.name}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {serviceCharge > 0 && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-yellow-800">Service Charge:</span>
                    <span className="text-sm font-bold text-yellow-800">Rs. {serviceCharge}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-base font-bold text-yellow-900">Total Amount:</span>
                    <span className="text-base font-bold text-yellow-900">Rs. {totalPrice + serviceCharge}</span>
                  </div>
                </div>
              )}

              <button 
                onClick={handleProceedToQR}
                disabled={!selectedInstrument}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {/* Step 2: QR Code */}
          {step === 2 && qrData && (
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Use your {selectedInstrument?.name} app to scan and complete payment
              </p>

              <div className="flex flex-col items-center mb-6">
                <div className="p-4 bg-white border-2 border-gray-300 rounded-lg mb-4">
                  <img 
                    src={`data:image/png;base64,${qrData.qrMessage}`} 
                    alt="Payment QR Code" 
                    className="w-64 h-64"
                    onError={(e) => {
                      // Show error message for broken QR images
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Error message for broken QR */}
                  <div className="w-64 h-64 bg-red-50 border border-red-200 flex items-center justify-center text-center p-4" style={{display: 'none'}}>
                    <div>
                      <p className="text-sm font-bold text-red-700 mb-2">QR Code Error</p>
                      <p className="text-xs text-red-600">Failed to load QR code</p>
                      <p className="text-xs text-red-600">Please try again or contact support</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600 mb-2">
                    Amount: Rs. {totalPrice + serviceCharge}
                  </p>
                  <p className="text-sm text-gray-600">
                    PRN: {qrData.prn}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="animate-pulse flex items-center text-blue-600">
                  <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">
                    Waiting for payment...
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
                
                <button 
                  onClick={checkPaymentStatus}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check Payment Status
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
                    <p className="text-green-700 font-mono text-xs">{qrData?.prn}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Amount Paid:</span>
                    <p className="text-green-700 font-bold">Rs. {totalPrice + serviceCharge}</p>
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
    </div>
  );
};

export default PaymentModal;
