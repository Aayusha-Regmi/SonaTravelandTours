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
import { getAuthToken, getAuthHeaders, isAuthenticated } from '../../utils/authToken';

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

  // Check authentication immediately on component mount
  React.useEffect(() => {
    const authCheck = api.checkAuthentication();
    if (!authCheck.isAuthenticated) {
      // Store current location state in localStorage to redirect back after login
      localStorage.setItem('redirectAfterLogin', JSON.stringify({
        pathname: '/payment',
        state: {
          passengers,
          selectedSeats,
          busData,
          searchParams,
          travelDate,
          totalPrice,
          seatPrice,
          bookingDetails
        }
      }));
      
      // Navigate to login page
      navigate('/login', { 
        state: { 
          redirectMessage: 'Please log in to continue with your payment',
          returnPath: '/payment'
        } 
      });
    }
  }, [navigate, passengers, selectedSeats, busData, searchParams, travelDate, totalPrice, seatPrice, bookingDetails]);  // Include all dependencies used in the effect
  
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
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];
  const currentStep = 2;

  // Payment categories with formal SVG icons
  const paymentCategories = [
    {
      id: 'card',
      name: 'Card',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      description: 'Credit/Debit Cards',
      gradient: 'from-blue-500/90 to-indigo-600/90',
      hoverGradient: 'hover:from-blue-600/95 hover:to-indigo-700/95',
      bgColor: 'bg-gradient-to-br from-blue-50/80 to-indigo-50/60',
      borderColor: 'border-blue-200/50',
      shadowColor: 'shadow-blue-100/40',
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Digital Wallets',
      gradient: 'from-emerald-500/90 to-green-600/90',
      hoverGradient: 'hover:from-emerald-600/95 hover:to-green-700/95',
      bgColor: 'bg-gradient-to-br from-emerald-50/80 to-green-50/60',
      borderColor: 'border-emerald-200/50',
      shadowColor: 'shadow-emerald-100/40',
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 4v16l10-8-10-8z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2z" />
        </svg>
      ),
      description: 'Mobile Banking',
      gradient: 'from-amber-500/90 to-orange-600/90',
      hoverGradient: 'hover:from-amber-600/95 hover:to-orange-700/95',
      bgColor: 'bg-gradient-to-br from-amber-50/80 to-orange-50/60',
      borderColor: 'border-amber-200/50',
      shadowColor: 'shadow-amber-100/40',
    },
    {
      id: 'internet',
      name: 'Internet',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Internet Banking',
      gradient: 'from-violet-500/90 to-purple-600/90',
      hoverGradient: 'hover:from-violet-600/95 hover:to-purple-700/95',
      bgColor: 'bg-gradient-to-br from-violet-50/80 to-purple-50/60',
      borderColor: 'border-violet-200/50',
      shadowColor: 'shadow-violet-100/40',
    },
  ];

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };
  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      // Mock discount calculation - in a real app, this would validate with backend
      // Different promo codes can give different discount amounts
      let newDiscountAmount = 0;
      
      if (promoCode.toLowerCase() === 'newyear25') {
        // 25% discount
        newDiscountAmount = Math.round(totalPrice * 0.25);
      } else if (promoCode.toLowerCase() === 'travel10') {
        // 10% discount
        newDiscountAmount = Math.round(totalPrice * 0.10);
      } else if (promoCode.toLowerCase() === 'welcome500') {
        // Fixed Rs. 500 discount
        newDiscountAmount = 500;
      } else {
        // Default 5% discount for any other code
        newDiscountAmount = Math.round(totalPrice * 0.05);
      }
      
      // Update discount state
      setDiscountAmount(newDiscountAmount);
      toast.success(`Promo code "${promoCode}" applied successfully! Rs. ${newDiscountAmount.toLocaleString()} discount`);
    } else {
      toast.error('Please enter a valid promo code');
      setDiscountAmount(0); // Reset any previous discount
    }
  };
  const handleCategorySelect = async (category) => {
    // Migrate tokens to ensure compatibility
    api.migrateAuthTokens();
    
    // Check authentication first
    const authCheck = api.checkAuthentication();
    if (!authCheck.isAuthenticated) {
      // Instead of showing error, navigate directly to login page
      console.log('Authentication required for payment - redirecting to login');
      
      // Store current location state in localStorage to redirect back after login
      localStorage.setItem('redirectAfterLogin', JSON.stringify({
        pathname: '/payment',
        state: {
          passengers,
          selectedSeats,
          busData,
          searchParams,
          travelDate,
          totalPrice,
          seatPrice,
          bookingDetails
        }
      }));
      
      // Navigate to login page
      navigate('/login', { 
        state: { 
          redirectMessage: 'Please log in to continue with your payment',
          returnPath: '/payment'
        } 
      });
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

    console.log('Opening payment modal for category:', category.name, {
      totalPrice,
      passengers: passengers.length,
      selectedSeats,
      authenticated: authCheck.isAuthenticated
    });

    // Set the selected category and open modal
    setSelectedCategory(category);
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
    setSelectedCategory(null);
  };

  const bookSeatsAPI = async () => {
    try {
      // First check if user is authenticated
      const authCheck = api.checkAuthentication();
      if (!authCheck.isAuthenticated) {
        // Store current location state in localStorage to redirect back after login
        localStorage.setItem('redirectAfterLogin', JSON.stringify({
          pathname: '/payment',
          state: {
            passengers,
            selectedSeats,
            busData,
            searchParams,
            travelDate,
            totalPrice,
            seatPrice,
            bookingDetails
          }
        }));
        
        // Navigate to login page
        navigate('/login', { 
          state: { 
            redirectMessage: 'Please log in to complete your booking',
            returnPath: '/payment'
          } 
        });
        throw new Error('Authentication required');
      }
      
      console.log('Starting seat booking API call...');
      
      // Calculate the final payment amount with VAT and discount
      const baseFare = Math.round(seatPrice * selectedSeats.length || totalPrice / 1.13);
      const vatAmount = Math.round(baseFare * 0.13);
      const subtotal = baseFare + vatAmount;
      const finalPaymentAmount = Math.max(0, subtotal - discountAmount);
      
      // Prepare booking data structure exactly as required by the API
      const requestData = {
        dateOfTravel: travelDate || new Date().toISOString().split('T')[0],
        paymentAmount: finalPaymentAmount,
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

      // Get authentication token using centralized utility
      const headers = getAuthHeaders();

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seat`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
      });

      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        // Navigate to login page
        localStorage.setItem('redirectAfterLogin', JSON.stringify({
          pathname: '/payment',
          state: {
            passengers,
            selectedSeats,
            busData,
            searchParams,
            travelDate,
            totalPrice,
            seatPrice,
            bookingDetails
          }
        }));
        
        navigate('/login', { 
          state: { 
            redirectMessage: 'Your session has expired. Please log in again to complete your booking',
            returnPath: '/payment'
          } 
        });
        throw new Error('Authentication failed');
      }

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

                {/* Enhanced Compact Fare Breakdown with mathematical calculations */}
                <div className="space-y-3 mb-5">
                  {/* Calculate base fare as 88.5% of total (removing 13% VAT from original total) */}
                  {(() => {
                    // Calculate base fare mathematically
                    const baseFare = Math.round(
                      seatPrice * selectedSeats.length || 
                      totalPrice / 1.13 || // Remove VAT from total
                      2300
                    );
                    
                    // Calculate VAT amount (13% of base fare)
                    const vatAmount = Math.round(baseFare * 0.13);
                    
                    return (
                      <>
                        <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl border border-blue-100/50 hover:shadow-md transition-all duration-200">
                          <span className="text-sm font-medium text-slate-700 font-opensans">
                            Bus Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                          </span>
                          <span className="text-sm font-semibold text-slate-800 font-opensans">
                            Rs. {baseFare.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/50 hover:shadow-md transition-all duration-200">
                          <span className="text-sm font-medium text-slate-700 font-opensans">
                            VAT (13%)
                          </span>
                          <span className="text-sm font-semibold text-slate-800 font-opensans">
                            Rs. {vatAmount.toLocaleString()}
                          </span>
                        </div>
                      </>
                    );
                  })()}

                  {/* Show discount if a coupon is applied */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center p-3 backdrop-blur-sm bg-gradient-to-r from-red-50/80 to-orange-50/80 rounded-xl border border-red-100/50 hover:shadow-md transition-all duration-200">
                      <span className="text-sm font-medium text-red-700 font-opensans">
                        Discount ({promoCode})
                      </span>
                      <span className="text-sm font-semibold text-red-800 font-opensans">
                        - Rs. {discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent mb-5"></div>

                {/* Enhanced Total fare with modern glassy effect */}
                {(() => {
                  // Calculate base fare (removing VAT from total)
                  const baseFare = Math.round(
                    seatPrice * selectedSeats.length || 
                    totalPrice / 1.13 || 
                    2300
                  );
                  
                  // Calculate VAT amount (13% of base fare)
                  const vatAmount = Math.round(baseFare * 0.13);
                  
                  // Calculate subtotal (base + VAT)
                  const subtotal = baseFare + vatAmount;
                  
                  return (
                    <div className="backdrop-blur-md bg-gradient-to-r from-emerald-50/90 via-green-50/80 to-emerald-50/90 rounded-2xl p-4 mb-6 border border-emerald-200/50 shadow-xl shadow-emerald-100/50 hover:shadow-2xl hover:shadow-emerald-200/40 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-emerald-700 font-opensans">
                          Total Fare <span className="text-xs font-normal">(Inc. VAT)</span>
                        </span>
                        <span className="text-lg font-bold text-emerald-700 font-opensans">
                          Rs. {subtotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })()}

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
                {(() => {
                  // Calculate base fare (removing VAT from total)
                  const baseFare = Math.round(
                    seatPrice * selectedSeats.length || 
                    totalPrice / 1.13 || 
                    2300
                  );
                  
                  // Calculate VAT amount (13% of base fare)
                  const vatAmount = Math.round(baseFare * 0.13);
                  
                  // Calculate subtotal (base + VAT)
                  const subtotal = baseFare + vatAmount;
                  
                  // Apply discount if any
                  const finalAmount = Math.max(0, subtotal - discountAmount);
                  
                  return (
                    <div className="backdrop-blur-lg bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-blue-50/90 rounded-2xl p-5 border border-blue-200/50 shadow-2xl shadow-blue-100/60 hover:shadow-3xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-opensans">
                          Total Amount
                          {discountAmount > 0 && (
                            <span className="text-xs font-normal text-indigo-600 ml-2">
                              (After Discount)
                            </span>
                          )}
                        </span>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-opensans">
                          Rs. {finalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>        {/* Enhanced Payment Method Selection with modern glass effect */}
        <div className="mt-8 backdrop-blur-lg bg-gradient-to-br from-white/95 via-white/90 to-white/95 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-indigo-100/60 hover:shadow-3xl hover:shadow-indigo-200/50 transition-all duration-500 transform hover:-translate-y-1">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3 font-opensans">
              Choose Payment Method
            </h2>
            <p className="text-sm font-medium text-slate-600 font-opensans">
              Select a payment category to view available options
            </p>
          </div>

          {/* Payment Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                disabled={isProcessingPayment}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-blue-300/30 backdrop-blur-sm ${category.bgColor} border-2 ${category.borderColor} shadow-xl ${category.shadowColor} hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-90 transition-all duration-300 rounded-2xl`}></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon container */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {category.icon}
                  </div>
                  
                  {/* Text content */}
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-slate-800 group-hover:text-white transition-colors duration-300">
                      {category.name}
                    </div>
                    <div className="text-sm text-slate-600 group-hover:text-white/90 transition-colors duration-300 font-medium">
                      {category.description}
                    </div>
                  </div>
                </div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-slate-600 mt-6">
            Each category will show you specific payment methods available for that type
          </p>
        </div>
      </main>

      <Footer />

      {/* Payment Modal */}
      {(() => {
        // Calculate the final payment amount with VAT and discount
        const baseFare = Math.round(seatPrice * selectedSeats.length || totalPrice / 1.13);
        const vatAmount = Math.round(baseFare * 0.13);
        const subtotal = baseFare + vatAmount;
        const finalPaymentAmount = Math.max(0, subtotal - discountAmount);
        
        return (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handlePaymentModalClose}
            totalPrice={finalPaymentAmount}
            passengers={passengers}
            selectedSeats={selectedSeats}
            travelDate={travelDate}
            bookingDetails={bookingDetails}
            searchParams={searchParams}
            selectedCategory={selectedCategory}
            onPaymentSuccess={handlePaymentSuccess}
            originalPrice={totalPrice}
            discount={discountAmount}
            promoCode={promoCode}
          />
        );
      })()}
    </div>
  );
};

export default PaymentPage;