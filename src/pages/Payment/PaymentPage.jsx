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
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
        <main className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Bus Information Section */}
        <BusDetail
          busName={busData?.busName || busData?.name || "Bus Information"}
          busType={busData?.busType || busData?.type || "Standard"}
          date={travelDate || new Date().toLocaleDateString()}
          time={busData?.departureTime || "TBD"}
          boardingPlace={bookingDetails?.origin || searchParams?.fromCity || "Kathmandu"}
          droppingPlace={bookingDetails?.destination || searchParams?.toCity || "Birgunj"}
          duration={busData?.duration || "TBD"}
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>{/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Seat Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              {/* Dynamic Seat Sections for each selected seat */}
              {passengers.map((passenger, index) => (
                <div key={passenger.id} className={`mb-8 ${index < passengers.length - 1 ? 'border-b border-gray-200 pb-8' : ''}`}>
                  <h2 className="text-xl font-bold text-[#0a639d] text-center mb-2 font-opensans">
                    Seat {passenger.id}
                  </h2>
                  <div className="w-16 h-0.5 bg-[#0a639d] mx-auto mb-6"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                        {bookingDetails?.origin || searchParams?.fromCity || 'Kathmandu'}
                      </h3>
                      <p className="text-xs font-medium text-gray-600 font-opensans">
                        Boarding Place: {passenger.boardingPlace || 'Not specified'}
                      </p>
                    </div>
                    <img 
                      src="/images/img_hicon_linear_right_3.svg" 
                      alt="arrow" 
                      className="w-5 h-5"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                        {bookingDetails?.destination || searchParams?.toCity || 'Birgunj'}
                      </h3>
                      <p className="text-xs font-medium text-gray-600 font-opensans">
                        Deboarding Place: {passenger.droppingPlace || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  {/* Passenger Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                        Name
                      </h4>
                      <p className="text-sm font-medium text-gray-600 font-opensans">
                        {passenger.fullName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                        Gender
                      </h4>
                      <p className="text-sm font-medium text-gray-600 font-opensans">
                        {passenger.gender || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                        City of Residence
                      </h4>
                      <p className="text-sm font-medium text-gray-600 font-opensans">
                        {passenger.cityOfResidence || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                        Phone Number
                      </h4>
                      <p className="text-sm font-medium text-gray-600 font-opensans">
                        {passenger.phoneNumber || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                        Email
                      </h4>
                      <p className="text-sm font-medium text-gray-600 font-opensans">
                        {passenger.email || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>          {/* Right Column - Payment Details */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="border-l-4 border-[#0a639d] pl-6">                <h2 className="text-xl font-bold text-gray-800 mb-4 font-opensans">
                  Payment Details
                </h2>

                {/* Fare Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Base Fare ({selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''})
                    </span>
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Rs. {(seatPrice * selectedSeats.length || totalPrice || 2400).toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Banking Charge
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.012).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Transaction Charge
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.01).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-3"></div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Gross Fare
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 1.022).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Special Sona Discount
                    </span>
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.176).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-3"></div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Bus Fare
                    </span>
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.842).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      VAT (13%)
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. {Math.round((totalPrice || 2400) * 0.159).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-4"></div>

                <div className="flex justify-between mb-6">
                  <span className="text-base font-bold text-[#388b68] font-opensans">
                    Total Fare
                  </span>
                  <span className="text-base font-bold text-[#388b68] font-opensans">
                    Rs. {(totalPrice || 2600).toLocaleString()}.00
                  </span>
                </div>                {/* Promo Code */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 font-opensans">
                    Promo/Coupon Code
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Promo/Coupon Code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a639d] focus:border-transparent font-opensans"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="px-4 py-2 font-bold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center font-opensans bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400 text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between mb-4">
                  <span className="text-xl font-bold text-[#0a639d] font-opensans">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold text-[#0a639d] font-opensans">
                    Rs. {(totalPrice || 2600).toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Payment Method Selection */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-opensans">
              Confirm your payment method
            </h2>
            <p className="text-sm font-medium text-gray-600 font-opensans">
              Choose, add, update your payment method
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.name)}
                className={`h-16 border-2 rounded-lg flex items-center px-4 transition-all duration-200 ${
                  selectedPaymentMethod === method.name
                    ? 'border-[#0a639d] bg-blue-50 shadow-md'
                    : 'border-gray-300 hover:border-[#0a639d] hover:shadow-sm'
                }`}
              >
                <img 
                  src={method.icon} 
                  alt={method.name} 
                  className="w-7 h-7 mr-3"
                  onError={(e) => {
                    if (method.fallbackIcon) {
                      e.target.src = method.fallbackIcon;
                    }
                  }}
                />
                <span className="text-lg font-semibold text-gray-800 font-opensans">
                  {method.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleGoToPayment}
              disabled={!selectedPaymentMethod || isProcessingPayment}
              className="min-w-[280px] h-14 font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a639d] flex items-center justify-center font-opensans bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400 disabled:cursor-not-allowed px-6 text-base"
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span className="mr-2">Go to payment gateway</span>
                  <img 
                    src="/images/img_hicon_outline_right_2.svg" 
                    alt="arrow" 
                    className="w-6 h-6"
                  />
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