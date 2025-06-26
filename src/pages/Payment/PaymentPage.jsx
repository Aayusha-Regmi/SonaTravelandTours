// src/pages/Payment/index.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';
import BusDetail from '../../components/common/BookingStepComponents/BusDetail';
import PaymentModal from '../../components/ui/PaymentModal';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 🔥 FIX: Get complete data from passenger details
  const { 
    passengers = [], 
    selectedSeats = [], 
    busData = {}, 
    searchParams = {},
    travelDate = '',
    totalPrice = 0, 
    seatPrice = 0,
    bookingDetails = {}
  } = location.state || {};

  // Show error if no data
  if (!passengers.length || !selectedSeats.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">No booking data found. Please start from seat selection.</p>
          <button 
            onClick={() => navigate('/search-results')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back to Search
          </button>
        </div>
      </div>
    );
  }
  
  const [promoCode, setPromoCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];
  const currentStep = 2;

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };
  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      toast.success(`Promo code "${promoCode}" applied successfully!`);
    } else {
      toast.error('Please enter a valid promo code');
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };
  const handleGoToPayment = async () => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Validate required data before opening modal
    if (!passengers.length || !selectedSeats.length) {
      toast.error('Missing booking data. Please start from seat selection.');
      return;
    }

    if (totalPrice <= 0) {
      toast.error('Invalid payment amount. Please check your booking details.');
      return;
    }

    console.log('🚀 Opening payment gateway with data:', {
      totalPrice,
      passengers: passengers.length,
      selectedSeats,
      paymentMethod: selectedPaymentMethod
    });

    // Open the payment gateway modal
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    console.log('✅ PAYMENT COMPLETED SUCCESSFULLY:', paymentDetails);
    
    // Show success message
    toast.success(`🎉 Payment successful! Booking confirmed for seats ${selectedSeats.join(', ')}`);
    
    // Close the modal
    setIsPaymentModalOpen(false);
    
    // Store booking details in localStorage for later reference
    const completedBooking = {
      ...paymentDetails,
      passengers,
      selectedSeats,
      busData,
      travelDate,
      bookingDate: new Date().toISOString(),
      totalAmount: paymentDetails.amount,
      paymentMethod: selectedPaymentMethod,
      origin: bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu',
      destination: bookingDetails?.destination || searchParams?.toCity || 'Birgunj'
    };
    
    // Save to localStorage for receipt/confirmation page
    localStorage.setItem('lastBooking', JSON.stringify(completedBooking));
    
    // Navigate to search results with success state
    setTimeout(() => {
      navigate('/search-results', { 
        state: { 
          bookingSuccess: true, 
          bookingId: paymentDetails.bookingId || paymentDetails.merchantTransactionId,
          bookedSeats: selectedSeats,
          paymentDetails: completedBooking,
          totalAmount: paymentDetails.amount
        } 
      });
    }, 2000);
  };

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false);
  };

  const bookSeatsAPI = async () => {
    try {
      console.log('🎯 Starting seat booking API call...');
      
      // Prepare booking data structure exactly as required by the API
      const requestData = {
        dateOfTravel: travelDate || new Date().toISOString().split('T')[0],
        paymentAmount: totalPrice,
        payment_status: "Completed",
        paymentMode: selectedPaymentMethod === 'esewa' ? 'esewa' : 
                    selectedPaymentMethod === 'connect-ips' ? 'connect-ips' : 'cash',
        busId: parseInt(busData?.originalData?.busId || busData?.id || bookingDetails.busId || 102),
        passengersList: passengers.map(passenger => ({
          passengerName: passenger.fullName,
          contactNumber: parseInt(passenger.phoneNumber),
          seatNo: passenger.id, // This is the seat ID (A5, B7, etc.)
          origin: bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu',
          destination: bookingDetails?.destination || searchParams?.toCity || 'Birgunj',
          gender: passenger.gender.toLowerCase(),
          boardingLocation: passenger.boardingPlace || 'Bus Park',
          deboardingLocation: passenger.droppingPlace || 'Kalanki',
          residence: passenger.cityOfResidence,
          email: passenger.email
        }))
      };

      console.log('📤 SEAT BOOKING REQUEST:', {
        url: `${import.meta.env.VITE_API_BASE_URL}/seat`,
        method: 'POST',
        requestData: requestData
      });

      // Get authentication token
      let userToken = localStorage.getItem('token') || sessionStorage.getItem('token') || 
                      localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (userToken) {
        headers.Authorization = `Bearer ${userToken}`;
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      
      console.log('📥 SEAT BOOKING RESPONSE:', {
        status: response.status,
        success: result.success,
        bookingId: result.bookingId || result.data?.bookingId,
        message: result.message
      });

      if (response.ok && (result.success || response.status === 201)) {
        return {
          bookingId: result.bookingId || result.data?.bookingId || `BK${Date.now()}`,
          ...result
        };
      } else {
        throw new Error(result.message || `HTTP ${response.status}: Booking failed`);
      }
    } catch (error) {
      console.error('❌ SEAT BOOKING ERROR:', error.message);
      throw error;
    }
  };

  const paymentMethods = [
    {
      id: 'connect-ips',
      name: 'Connect IPS',
      icon: '/images/img_imagesremovebgpreview_1.png'
    },
    {
      id: 'esewa',
      name: 'eSewa',
      icon: '/images/img_esewazoneofficebayalbasgoogleplayiphoneiphoneremovebgpreview_1.png'
    },
    {
      id: 'fonepay',
      name: 'FonePay',
      icon: '/images/img_fonepay_logo.png',
      fallbackIcon: '/images/img_848280_1.png' // Use mobile banking icon as fallback
    },
    {
      id: 'mobile-banking',
      name: 'Mobile Banking',
      icon: '/images/img_848280_1.png'
    },
    {
      id: 'sct-card',
      name: 'SCT Card',
      icon: '/images/img_image16removebgpreview_1.png'
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 relative">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle floating orbs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-100/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-slate-100/25 rounded-full filter blur-3xl"></div>
      </div>

      <Header />
        <main className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {/* Bus Information Section with glassmorphism */}
        <div className="mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <BusDetail
            busName={busData?.busName || busData?.name || "Bus Information"}
            busType={busData?.busType || busData?.type || "Standard"}
            date={travelDate || new Date().toLocaleDateString()}
            time={busData?.departureTime || "TBD"}
            boardingPlace={bookingDetails?.origin || searchParams?.fromCity || "Kathmandu"}
            droppingPlace={bookingDetails?.destination || searchParams?.toCity || "Birgunj"}
            duration={busData?.duration || "TBD"}
          />
        </div>

        {/* Progress Bar with clean styling */}
        <div className="mb-8 backdrop-blur-sm bg-white/70 rounded-2xl p-6 border border-gray-200 shadow-lg">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>        {/* Main Content with clean design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Seat Details */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Clean header */}
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Passenger Details
                </h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>

              {/* Clean Seat Sections */}
              {passengers.map((passenger, index) => (
                <div 
                  key={passenger.id} 
                  className={`mb-6 ${index < passengers.length - 1 ? 'border-b border-gray-200 pb-6' : ''}`}
                >
                  {/* Seat header */}
                  <div className="mb-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                      <h2 className="text-lg font-bold text-gray-800 text-center font-opensans flex items-center justify-center gap-2">
                        <span className="inline-block w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {passenger.id}
                        </span>
                        Seat {passenger.id}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Route section */}
                  <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 font-opensans">
                        {bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu'}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 font-opensans bg-white rounded-full px-3 py-1 inline-block">
                        {passenger.boardingPlace || 'Bus Park'}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 mx-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 font-opensans">
                        {bookingDetails?.destination || searchParams?.toCity || 'Birgunj'}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 font-opensans bg-white rounded-full px-3 py-1 inline-block">
                        {passenger.droppingPlace || 'Bus Terminal'}
                      </p>
                    </div>
                  </div>

                  {/* Passenger Details with clean cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {[
                      { label: 'Name', value: passenger.fullName || 'Not provided' },
                      { label: 'Gender', value: passenger.gender || 'Not specified' },
                      { label: 'City of Residence', value: passenger.cityOfResidence || 'Not specified' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
                        <h4 className="text-sm font-bold text-gray-800 font-opensans mb-1">
                          {item.label}
                        </h4>
                        <p className="text-sm font-medium text-gray-600 font-opensans">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Phone Number', value: passenger.phoneNumber || 'Not provided' },
                      { label: 'Email', value: passenger.email || 'Not provided' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200">
                        <h4 className="text-sm font-bold text-gray-800 font-opensans mb-1">
                          {item.label}
                        </h4>
                        <p className="text-sm font-medium text-gray-600 font-opensans">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>          {/* Right Column - Compact Payment Details */}
          <div className="col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Clean header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 font-opensans">
                      Payment Summary
                    </h2>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>

                {/* Compact Fare Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 font-opensans">
                      Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                    </span>
                    <span className="text-sm font-semibold text-gray-800 font-opensans">
                      Rs. {(seatPrice * selectedSeats.length || totalPrice || 2400).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-opensans">Banking Charge</span>
                    <span className="text-xs text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.012).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-opensans">Transaction Charge</span>
                    <span className="text-xs text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.01).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-4"></div>

                {/* Discount section */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-opensans">Gross Fare</span>
                    <span className="text-sm text-gray-700 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 1.022).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm font-medium font-opensans">Special Discount</span>
                    <span className="text-sm font-medium font-opensans">
                      -Rs. {Math.round((totalPrice || 2400) * 0.176).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-4"></div>

                {/* Final calculations */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-opensans">Bus Fare</span>
                    <span className="text-sm text-gray-700 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.842).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-opensans">VAT (13%)</span>
                    <span className="text-xs text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.159).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-4"></div>

                {/* Total fare */}
                <div className="bg-green-50 rounded-lg p-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-green-700 font-opensans">
                      Total Fare
                    </span>
                    <span className="text-lg font-bold text-green-700 font-opensans">
                      Rs. {(totalPrice || 2600).toLocaleString()}.00
                    </span>
                  </div>
                </div>

                {/* Compact Promo Code */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 font-opensans">
                    Promo Code
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-opensans"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-opensans"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Final Total */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-800 font-opensans">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-blue-800 font-opensans">
                      Rs. {(totalPrice || 2600).toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Clean Payment Method Selection */}
        <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-opensans">
              Select Payment Method
            </h2>
            <p className="text-sm font-medium text-gray-600 font-opensans">
              Choose your preferred payment option
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.name)}
                className={`h-16 border-2 rounded-xl flex items-center justify-center px-4 transition-all duration-200 ${
                  selectedPaymentMethod === method.name
                    ? 'border-blue-600 bg-blue-50 shadow-md transform scale-105'
                    : 'border-gray-300 hover:border-blue-400 hover:shadow-sm hover:bg-gray-50'
                }`}
              >
                <img 
                  src={method.icon} 
                  alt={method.name} 
                  className="w-8 h-8 mr-3"
                  onError={(e) => {
                    if (method.fallbackIcon) {
                      e.target.src = method.fallbackIcon;
                    }
                  }}
                />
                <span className="text-sm font-semibold text-gray-800 font-opensans">
                  {method.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleGoToPayment}
              disabled={!selectedPaymentMethod || isProcessingPayment}
              className="min-w-[300px] h-12 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 flex items-center justify-center font-opensans bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed px-6"
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="mr-2">Proceed to Payment</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        totalPrice={totalPrice}
        passengers={passengers}
        selectedSeats={selectedSeats}
        travelDate={travelDate}
        bookingDetails={bookingDetails}
        searchParams={searchParams}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PaymentPage;