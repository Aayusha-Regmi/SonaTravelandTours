// src/pages/Payment/index.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';
import BusDetail from '../../components/common/BookingStepComponents/BusDetail';

const PaymentPage = () => {
  const location = useLocation();
  
  // Get data from passenger details
  const { 
    bus = {}, 
    selectedSeats = [], 
    totalPrice = 0, 
    bookingId = null, 
    passengers = [] 
  } = location.state || {};
  
  const [promoCode, setPromoCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

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
      // Simulate payment processing
    toast.info(`Processing ${selectedPaymentMethod} payment...`);
    
    // Simulate API call delay
    setTimeout(() => {
      // Always succeed for demo (in production, this would be a real API call)
      const success = true;
      
      if (success) {
        toast.success(`Payment successful! Booking confirmed for seats ${selectedSeats.join(', ')}`);
        console.log('Payment completed:', {
          bus,
          selectedSeats,
          totalPrice,
          bookingId,
          passengers,
          paymentMethod: selectedPaymentMethod
        });
      } else {
        toast.error('Payment failed. Please try again.');
      }
    }, 2000);
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
          busName="Name or No of the bus"
          busType="Tourist A/c, Delux"
          date="06/06/2024"
          time="16:00"
          boardingPlace="Kathmandu"
          droppingPlace="Birgunj"
          duration="9h"
        />

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>{/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Seat Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              {/* Seat B18 Section */}
              <div className="mb-8">                <h2 className="text-xl font-bold text-[#0a639d] text-center mb-2 font-opensans">
                  Seat B18
                </h2>
                <div className="w-16 h-0.5 bg-[#0a639d] mx-auto mb-6"></div>                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                      Kathmandu
                    </h3>
                    <p className="text-xs font-medium text-gray-600 font-opensans">
                      Boarding Place Name
                    </p>
                  </div>
                  <img 
                    src="/images/img_hicon_linear_right_3.svg" 
                    alt="arrow" 
                    className="w-5 h-5"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                      Birgunj
                    </h3>
                    <p className="text-xs font-medium text-gray-600 font-opensans">
                      Deboarding Place Name
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
                      Arjun Patel
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Gender
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      Female
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      City of Residence
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Phone Number
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      454645656
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Email
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      ArjunPatel@gmail.com
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-6"></div>
              </div>              {/* Seat B16 Section */}
              <div>
                <h2 className="text-xl font-bold text-[#0a639d] text-center mb-2 font-opensans">
                  Seat B16
                </h2>
                <div className="w-16 h-0.5 bg-[#0a639d] mx-auto mb-6"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                      Kathmandu
                    </h3>
                    <p className="text-xs font-medium text-gray-600 font-opensans">
                      Boarding Place Name
                    </p>
                  </div>
                  <img 
                    src="/images/img_hicon_linear_right_3.svg" 
                    alt="arrow" 
                    className="w-5 h-5"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#0a639d] mb-1 font-opensans">
                      Birgunj
                    </h3>
                    <p className="text-xs font-medium text-gray-600 font-opensans">
                      Deboarding Place Name
                    </p>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Name
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      Arjun Patel
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Gender
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      Female
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      City of Residence
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Phone Number
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      454645656
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-800 mb-1 font-opensans">
                      Email
                    </h4>
                    <p className="text-sm font-medium text-gray-600 font-opensans">
                      ArjunPatel@gmail.com
                    </p>
                  </div>
                </div>
              </div>
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
                      Base Fare
                    </span>
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Rs. 2,400.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Banking Charge
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. 28.80
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Transaction Charge
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. 25.50
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
                      Rs. 2,654.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Special Sona Discount
                    </span>
                    <span className="text-sm font-semibold text-[#0a639d] font-opensans">
                      Rs. 468.08
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
                      Rs. 2,185.92
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      VAT (13%)
                    </span>
                    <span className="text-xs font-medium text-gray-600 font-opensans">
                      Rs. 414.17
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-200 mb-4"></div>

                <div className="flex justify-between mb-6">
                  <span className="text-base font-bold text-[#388b68] font-opensans">
                    Total Fare
                  </span>
                  <span className="text-base font-bold text-[#388b68] font-opensans">
                    Rs. 2,600.00
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
                    Rs. 2,600.00
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
              disabled={!selectedPaymentMethod}
              className="min-w-[280px] h-14 font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a639d] flex items-center justify-center font-opensans bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400 disabled:cursor-not-allowed px-6 text-base"
            >
              <span className="mr-2">Go to payment gateway</span>
              <img 
                src="/images/img_hicon_outline_right_2.svg" 
                alt="arrow" 
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;