// src/pages/Payment/index.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';
import BusDetail from '../../components/common/BookingStepComponents/BusDetail';
import PaymentModal from '../../components/ui/PaymentModal';
import api from '../../services/api';

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
  const handleGoToPayment = async () => {
    // Migrate tokens to ensure compatibility
    api.migrateAuthTokens();
    
    // Check authentication first
    const authCheck = api.checkAuthentication();
    if (!authCheck.isAuthenticated) {
      toast.error('🔐 Please log in to continue with payment');
      console.log('❌ Authentication required for payment');
      // You might want to redirect to login page here
      // navigate('/login');
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

    console.log('Opening payment gateway with data:', {
      totalPrice,
      passengers: passengers.length,
      selectedSeats,
      authenticated: authCheck.isAuthenticated
    });

    // Open the payment gateway modal
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    console.log('PAYMENT COMPLETED SUCCESSFULLY:', paymentDetails);
    
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
      console.log('Starting seat booking API call...');
      
      // Prepare booking data structure exactly as required by the API
      const requestData = {
        dateOfTravel: travelDate || new Date().toISOString().split('T')[0],
        paymentAmount: totalPrice,
        payment_status: "Completed",
        paymentMode: "gateway", // Generic payment mode since we're using the gateway
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

      console.log('SEAT BOOKING REQUEST:', {
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
      
      console.log('SEAT BOOKING RESPONSE:', {
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
      console.error('SEAT BOOKING ERROR:', error.message);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative">
      {/* Enhanced subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft floating orbs with gentle animation */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-slate-100/25 to-gray-100/15 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-indigo-50/30 to-blue-50/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.05)_1px,transparent_0)] bg-[length:50px_50px] opacity-30"></div>
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

        {/* Progress Bar with modern glassy effect */}
        <div className="mb-8 backdrop-blur-md bg-gradient-to-r from-white/80 via-white/70 to-white/80 rounded-2xl p-6 border border-white/40 shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500 transform hover:-translate-y-1">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>        {/* Main Content with enhanced glassy design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Seat Details with modern glass effect */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-lg bg-gradient-to-br from-white/90 via-white/80 to-white/85 rounded-3xl border border-white/50 p-8 shadow-2xl shadow-indigo-100/40 hover:shadow-3xl hover:shadow-indigo-200/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01]">
              {/* Enhanced header with gradient */}
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3">
                  Passenger Details
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 mx-auto rounded-full shadow-lg"></div>
              </div>

              {/* Enhanced Seat Sections with modern 3D cards */}
              {passengers.map((passenger, index) => (
                <div 
                  key={passenger.id} 
                  className={`mb-8 ${index < passengers.length - 1 ? 'border-b border-white/30 pb-8' : ''} 
                    transform hover:scale-[1.01] transition-all duration-300 group`}
                >
                  {/* Seat header with modern gradient */}
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-blue-50/80 backdrop-blur-sm rounded-2xl p-5 border border-blue-200/50 shadow-lg shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-200/40 transition-all duration-300 transform hover:-translate-y-1">
                      <h2 className="text-lg font-bold text-slate-700 text-center font-opensans flex items-center justify-center gap-3">
                        <span className="inline-block w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transform hover:scale-110 transition-transform duration-200">
                          {passenger.id}
                        </span>
                        Seat {passenger.id}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Route section with glassy effect */}
                  <div className="flex items-center justify-between mb-6 backdrop-blur-md bg-gradient-to-r from-gray-50/90 via-white/80 to-gray-50/90 rounded-2xl p-6 border border-gray-200/50 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/40 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-slate-700 mb-2 font-opensans">
                        {bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu'}
                      </h3>
                      <p className="text-sm font-medium text-slate-600 font-opensans bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-md border border-white/50">
                        {passenger.boardingPlace || 'Bus Park'}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0 mx-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-200/50 transform hover:scale-110 hover:rotate-6 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <h3 className="text-lg font-bold text-slate-700 mb-2 font-opensans">
                        {bookingDetails?.destination || searchParams?.toCity || 'Birgunj'}
                      </h3>
                      <p className="text-sm font-medium text-slate-600 font-opensans bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 inline-block shadow-md border border-white/50">
                        {passenger.droppingPlace || 'Bus Terminal'}
                      </p>
                    </div>
                  </div>

                  {/* Passenger Details with modern glassy cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {[
                      { label: 'Name', value: passenger.fullName || 'Not provided' },
                      { label: 'Gender', value: passenger.gender || 'Not specified' },
                      { label: 'City of Residence', value: passenger.cityOfResidence || 'Not specified' }
                    ].map((item, idx) => (
                      <div key={idx} className="backdrop-blur-sm bg-gradient-to-br from-white/90 to-white/80 rounded-xl p-4 border border-white/60 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
                        <h4 className="text-sm font-bold text-slate-700 font-opensans mb-2 group-hover:text-slate-800 transition-colors duration-200">
                          {item.label}
                        </h4>
                        <p className="text-sm font-medium text-slate-600 font-opensans group-hover:text-slate-700 transition-colors duration-200">
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
                      <div key={idx} className="backdrop-blur-sm bg-gradient-to-br from-white/90 to-white/80 rounded-xl p-4 border border-white/60 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
                        <h4 className="text-sm font-bold text-slate-700 font-opensans mb-2 group-hover:text-slate-800 transition-colors duration-200">
                          {item.label}
                        </h4>
                        <p className="text-sm font-medium text-slate-600 font-opensans group-hover:text-slate-700 transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>          {/* Right Column - Enhanced Payment Details with modern glassy effect */}
          <div className="col-span-1">
            <div className="sticky top-24">
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 rounded-3xl border border-white/60 p-7 shadow-2xl shadow-indigo-100/60 hover:shadow-3xl hover:shadow-indigo-200/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.01]">
                {/* Enhanced header with modern gradient */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-200/50 transform hover:scale-110 hover:rotate-3 transition-all duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent font-opensans">
                      Payment Summary
                    </h2>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent"></div>
                </div>

                {/* Enhanced Compact Fare Breakdown */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50 hover:shadow-md transition-all duration-200">
                    <span className="text-sm font-medium text-slate-700 font-opensans">
                      Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                    </span>
                    <span className="text-sm font-semibold text-slate-800 font-opensans">
                      Rs. {(seatPrice * selectedSeats.length || totalPrice || 2400).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-white/70 rounded-lg border border-gray-100/50">
                    <span className="text-xs text-slate-600 font-opensans">Banking Charge</span>
                    <span className="text-xs text-slate-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.012).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-white/70 rounded-lg border border-gray-100/50">
                    <span className="text-xs text-slate-600 font-opensans">Transaction Charge</span>
                    <span className="text-xs text-slate-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.01).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent mb-5"></div>

                {/* Enhanced Discount section */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-white/70 rounded-lg border border-gray-100/50">
                    <span className="text-sm text-slate-700 font-opensans">Gross Fare</span>
                    <span className="text-sm text-slate-700 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 1.022).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-xl border border-emerald-100/50 hover:shadow-md transition-all duration-200">
                    <span className="text-sm font-medium text-emerald-700 font-opensans">Special Discount</span>
                    <span className="text-sm font-medium text-emerald-700 font-opensans">
                      -Rs. {Math.round((totalPrice || 2400) * 0.176).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent mb-5"></div>

                {/* Enhanced Final calculations */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-white/70 rounded-lg border border-gray-100/50">
                    <span className="text-sm text-slate-700 font-opensans">Bus Fare</span>
                    <span className="text-sm text-slate-700 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.842).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 backdrop-blur-sm bg-white/70 rounded-lg border border-gray-100/50">
                    <span className="text-xs text-slate-600 font-opensans">VAT (13%)</span>
                    <span className="text-xs text-slate-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.159).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent mb-5"></div>

                {/* Enhanced Total fare with modern glassy effect */}
                <div className="backdrop-blur-md bg-gradient-to-r from-emerald-50/90 via-green-50/80 to-emerald-50/90 rounded-2xl p-4 mb-6 border border-emerald-200/50 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/40 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-emerald-700 font-opensans">
                      Total Fare
                    </span>
                    <span className="text-lg font-bold text-emerald-700 font-opensans">
                      Rs. {(totalPrice || 2600).toLocaleString()}.00
                    </span>
                  </div>
                </div>

                {/* Enhanced Promo Code with modern styling */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-3 font-opensans">
                    Promo Code
                  </h3>
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/80 border border-gray-200/50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300/50 font-opensans transition-all duration-300 hover:bg-white/90 shadow-md hover:shadow-lg"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    <button 
                      onClick={handleApplyPromo}
                      className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 text-sm font-opensans shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Enhanced Final Total with premium glass effect */}
                <div className="backdrop-blur-lg bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-blue-50/90 rounded-2xl p-5 border border-blue-200/50 shadow-2xl shadow-blue-100/60 hover:shadow-3xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-opensans">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-opensans">
                      Rs. {(totalPrice || 2600).toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Enhanced Payment Method Selection with modern glass effect */}
        <div className="mt-8 backdrop-blur-lg bg-gradient-to-br from-white/95 via-white/90 to-white/95 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-indigo-100/60 hover:shadow-3xl hover:shadow-indigo-200/50 transition-all duration-500 transform hover:-translate-y-1">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3 font-opensans">
              Select Payment Method
            </h2>
            <p className="text-sm font-medium text-slate-600 font-opensans">
              Choose your preferred payment option
            </p>
          </div>

          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-xl p-6 border border-blue-200/30 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-2 font-opensans">
                Real-Time Payment Options
              </h3>
              <p className="text-sm text-slate-600 font-opensans mb-4">
                We'll load all available payment methods including digital wallets, banks, and cards when you proceed
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <span>Digital Wallets • Banks • Cards</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={handleGoToPayment}
              disabled={isProcessingPayment}
              className="min-w-[320px] h-14 font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400/50 flex items-center justify-center font-opensans bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed px-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 disabled:transform-none disabled:shadow-md"
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span className="mr-3">Proceed to Payment Gateway</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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