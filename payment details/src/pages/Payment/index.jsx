// src/pages/Payment/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProgressBar from '../../components/ui/ProgressBar';

const PaymentPage = () => {
  const [promoCode, setPromoCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];
  const currentStep = 2;

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied successfully!`);
    } else {
      alert('Please enter a valid promo code');
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleGoToPayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    alert(`Proceeding to ${selectedPaymentMethod} payment gateway...`);
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
      
      <main className="max-w-[1440px] mx-auto px-[75px] py-8">
        {/* Bus Info Card */}
        <div className="mb-8 h-[121px] flex items-center bg-white rounded-[16px] border border-[#ececec] p-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <h2 className="text-[20px] font-bold text-[#3d3d3d] mb-1 font-opensans">
                Name or No of the bus
              </h2>
              <p className="text-[14px] font-semibold text-[#8f8f8f] font-opensans">
                Tourist A/c, Delux
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <p className="text-[18px] font-bold text-[#3d3d3d] font-opensans">
                06/06/2024
              </p>
              <p className="text-[24px] font-bold text-[#3d3d3d] font-opensans">
                16:00
              </p>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#3d3d3d] font-opensans">
                  Kathmandu
                </h3>
                <p className="text-[18px] font-semibold text-[#8f8f8f] font-opensans">
                  Boarding place name
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
                <div className="relative">
                  <img 
                    src="/images/img_group_red_300.svg" 
                    alt="route indicator" 
                    className="w-[32px] h-[32px]"
                  />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[14px] font-bold text-[#8f8f8f] font-opensans">
                    9h
                  </span>
                </div>
                <div className="w-[98px] h-[3px] bg-[#efbdc0]"></div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-[#3d3d3d] font-opensans">
                  Birgunj
                </h3>
                <p className="text-[18px] font-semibold text-[#8f8f8f] font-opensans">
                  Dropping place name
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Seat Details */}
          <div className="col-span-2">
            <div className="h-[867px] bg-white rounded-[16px] border border-[#ececec] p-6">
              {/* Sea B18 Section */}
              <div className="mb-8">
                <h2 className="text-[28px] font-bold text-[#0a639d] text-center mb-4 font-opensans">
                  Sea B18
                </h2>
                <div className="w-[144px] h-[1px] bg-[#0a639d] mx-auto mb-6"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[24px] font-bold text-[#0a639d] mb-2 font-opensans">
                      Kathmandu
                    </h3>
                    <p className="text-[16px] font-semibold text-[#5f5f5f] font-opensans">
                      Boarding Place Name
                    </p>
                  </div>
                  <img 
                    src="/images/img_hicon_linear_right_3.svg" 
                    alt="arrow" 
                    className="w-[24px] h-[24px]"
                  />
                  <div>
                    <h3 className="text-[24px] font-bold text-[#0a639d] mb-2 font-opensans">
                      Birgunj
                    </h3>
                    <p className="text-[16px] font-semibold text-[#5f5f5f] font-opensans">
                      Deboarding Place Name
                    </p>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Name
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Arjun Patel
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Gender
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Female
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      City of Residence
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Phone Number
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      454645656
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Email
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      ArjunPatel@gmail.com
                    </p>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#ececec] mb-8"></div>
              </div>

              {/* Seat B16 Section */}
              <div>
                <h2 className="text-[28px] font-bold text-[#0a639d] text-center mb-4 font-opensans">
                  Seat B16
                </h2>
                <div className="w-[144px] h-[1px] bg-[#0a639d] mx-auto mb-6"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[24px] font-bold text-[#0a639d] mb-2 font-opensans">
                      Kathmandu
                    </h3>
                    <p className="text-[16px] font-semibold text-[#5f5f5f] font-opensans">
                      Boarding Place Name
                    </p>
                  </div>
                  <img 
                    src="/images/img_hicon_linear_right_3.svg" 
                    alt="arrow" 
                    className="w-[24px] h-[24px]"
                  />
                  <div>
                    <h3 className="text-[24px] font-bold text-[#0a639d] mb-2 font-opensans">
                      Birgunj
                    </h3>
                    <p className="text-[16px] font-semibold text-[#5f5f5f] font-opensans">
                      Deboarding Place Name
                    </p>
                  </div>
                </div>

                {/* Passenger Details */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Name
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Arjun Patel
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Gender
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Female
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      City of Residence
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Phone Number
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      454645656
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[24px] font-bold text-[#3d3d3d] mb-2 font-opensans">
                      Email
                    </h4>
                    <p className="text-[18px] font-semibold text-[#5f5f5f] font-opensans">
                      ArjunPatel@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="col-span-1">
            <div className="h-[867px] bg-white rounded-[16px] border border-[#ececec] p-6">
              <div className="border-l border-[#b0b0b0] pl-8">
                <h2 className="text-[28px] font-bold text-[#3d3d3d] mb-8 font-opensans">
                  Payment Details
                </h2>

                {/* Fare Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Base Fair
                    </span>
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Rs. 2,400,00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Banking Charge
                    </span>
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Rs. 28.80
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Transaction Charge
                    </span>
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Rs. 25.50
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#ececec] mb-6"></div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Gross fair
                    </span>
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Rs. 2.654.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Special Sona Discount
                    </span>
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Rs. 468.08
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#ececec] mb-6"></div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Bus fair
                    </span>
                    <span className="text-[20px] font-bold text-[#0a639d] font-opensans">
                      Rs. 2.185.92
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      VAT(13%)
                    </span>
                    <span className="text-[20px] font-semibold text-[#5f5f5f] font-opensans">
                      Rs. 414.17
                    </span>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#ececec] mb-6"></div>

                <div className="flex justify-between mb-8">
                  <span className="text-[24px] font-bold text-[#388b68] font-opensans">
                    Total fair
                  </span>
                  <span className="text-[24px] font-bold text-[#388b68] font-opensans">
                    Rs. 2.600.00
                  </span>
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="text-[24px] font-bold text-[#5f5f5f] mb-4 font-opensans">
                    Promo/ coupon Code
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Promo/ coupon Code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      className="flex-1 w-full px-4 py-3 rounded-[12px] border border-[#b0b0b0] bg-[#f5f5f5] text-[18px] font-semibold text-[#3d3d3d] placeholder-[#d9d9d9] focus:outline-none focus:ring-2 focus:ring-[#0a639d] focus:border-transparent font-opensans"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="w-[100px] font-bold rounded-[12px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center font-opensans bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400 px-4 py-2 text-[20px] h-[60px]"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex justify-between mb-8">
                  <span className="text-[28px] font-bold text-[#0a639d] font-opensans">
                    Total Amount
                  </span>
                  <span className="text-[28px] font-bold text-[#0a639d] font-opensans">
                    Rs. 2.600.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mt-8 h-[332px] bg-white rounded-[16px] border border-[#ececec] p-6">
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-[#3d3d3d] mb-2 font-opensans">
              Confirm your payment method
            </h2>
            <p className="text-[18px] font-semibold text-[#8f8f8f] font-opensans">
              Choose, add, update your payment method
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.name)}
                className={`h-[57px] border rounded-[12px] flex items-center px-4 transition-colors ${
                  selectedPaymentMethod === method.name
                    ? 'border-[#0a639d] bg-[#e7eff5]'
                    : 'border-[#b0b0b0] hover:border-[#0a639d]'
                }`}
              >
                <img 
                  src={method.icon} 
                  alt={method.name} 
                  className="w-[28px] h-[28px] mr-3"
                />
                <span className="text-[24px] font-bold text-[#3d3d3d] font-opensans">
                  {method.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button 
              onClick={handleGoToPayment}
              className="w-[353px] h-[60px] font-bold rounded-[12px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center font-opensans bg-[#0a639d] text-white hover:bg-[#084d7a] disabled:bg-gray-400 px-4 py-2 text-[20px]"
            >
              <span className="mr-2">Go to payment geteway</span>
              <img 
                src="/images/img_hicon_outline_right_2.svg" 
                alt="arrow" 
                className="w-[28px] h-[28px]"
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