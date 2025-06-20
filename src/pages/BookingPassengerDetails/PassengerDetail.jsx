import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Dropdown from '../../components/ui/Dropdown';
import Checkbox from '../../components/ui/Checkbox';
import BusDetail from '../../components/common/BookingStepComponents/BusDetail';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';

const PassengerDetail = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([
    {
      id: 'B16',
      fullName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      cityOfResidence: '',
      boardingPlace: '',
      droppingPlace: '',
      applyToAll: false
    },
    {
      id: 'B18',
      fullName: '',
      gender: '',
      email: '',
      phoneNumber: '',
      cityOfResidence: '',
      boardingPlace: '',
      droppingPlace: '',
      applyToAll: false
    }
  ]);

  const [errors, setErrors] = useState({});

  const genderOptions = ['Male', 'Female', 'Other'];
  const cityOptions = ['Kathmandu', 'Pokhara', 'Chitwan', 'Birgunj', 'Dharan'];
  const boardingOptions = ['Central Bus Station', 'New Bus Park', 'Ratna Park'];
  const droppingOptions = ['Main Bus Terminal', 'City Center', 'Airport'];

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
    
    // Clear error for this field when user starts typing
    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    passengers.forEach((passenger, index) => {
      // Required field validations
      if (!passenger.fullName.trim()) {
        newErrors[`${index}-fullName`] = 'Full name is required';
      }
      if (!passenger.gender) {
        newErrors[`${index}-gender`] = 'Gender is required';
      }
      if (!passenger.email.trim()) {
        newErrors[`${index}-email`] = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
        newErrors[`${index}-email`] = 'Please enter a valid email address';
      }
      if (!passenger.phoneNumber.trim()) {
        newErrors[`${index}-phoneNumber`] = 'Phone number is required';
      } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(passenger.phoneNumber)) {
        newErrors[`${index}-phoneNumber`] = 'Please enter a valid phone number';
      }
      if (!passenger.cityOfResidence) {
        newErrors[`${index}-cityOfResidence`] = 'City of residence is required';
      }
      if (!passenger.boardingPlace) {
        newErrors[`${index}-boardingPlace`] = 'Boarding place is required';
      }
      if (!passenger.droppingPlace) {
        newErrors[`${index}-droppingPlace`] = 'Dropping place is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyToAll = (index, checked) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index].applyToAll = checked;
    
    if (checked && index === 0) {
      // Apply first passenger's data to all others
      const firstPassenger = updatedPassengers[0];
      const newErrors = { ...errors };
      
      for (let i = 1; i < updatedPassengers.length; i++) {
        updatedPassengers[i] = {
          ...updatedPassengers[i],
          fullName: firstPassenger.fullName,
          gender: firstPassenger.gender,
          email: firstPassenger.email,
          phoneNumber: firstPassenger.phoneNumber,
          cityOfResidence: firstPassenger.cityOfResidence,
          boardingPlace: firstPassenger.boardingPlace,
          droppingPlace: firstPassenger.droppingPlace
        };
        
        // Clear errors for all fields of other passengers when applying data
        const fieldsToUpdate = ['fullName', 'gender', 'email', 'phoneNumber', 'cityOfResidence', 'boardingPlace', 'droppingPlace'];
        fieldsToUpdate.forEach(field => {
          if (newErrors[`${i}-${field}`]) {
            delete newErrors[`${i}-${field}`];
          }
        });
      }
      
      setErrors(newErrors);
    } else if (!checked && index === 0) {
      // Reset all other passengers' data when unchecking
      for (let i = 1; i < updatedPassengers.length; i++) {
        updatedPassengers[i] = {
          ...updatedPassengers[i],
          fullName: '',
          gender: '',
          email: '',
          phoneNumber: '',
          cityOfResidence: '',
          boardingPlace: '',
          droppingPlace: ''
        };
      }
    }
    
    setPassengers(updatedPassengers);
  };

  const handleGoToPayment = () => {
    if (validateForm()) {
      console.log('Proceeding to payment with passenger data:', passengers);
      navigate('/payment');
    } else {
      toast.error('Please fill in all required fields correctly', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter',system-ui,sans-serif]">
      <Header />      {/* Bus Detail Component */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 pt-20 sm:pt-22 md:pt-24">
        <BusDetail
          busName="Name or No of the bus"
          busType="Tourist A/c, Delux"
          date="06/06/2024"
          time="16:00"
          boardingPlace="Kathmandu"
          droppingPlace="Birgunj"
          duration="9h"
        />        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8 px-2 sm:px-0">
          <ProgressBar steps={steps} currentStep={1} />
        </div>

        {/* Passenger Details Form */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-blue-100/50 p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100">
          {passengers.map((passenger, index) => (
            <div key={passenger.id} className={`relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl mb-8 sm:mb-12 md:mb-16 last:mb-0 ${index % 2 === 0 ? 'bg-gradient-to-br from-blue-50/30 to-indigo-50/20' : 'bg-gradient-to-br from-gray-50 to-slate-50/50'} border-2 border-transparent hover:border-blue-200/50 transition-all duration-300`}>              {/* Seat Header */}
              <div className="mb-3 sm:mb-4 md:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#0a639d] rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shadow-md">
                    {passenger.id}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a639d] tracking-tight">
                      Seat {passenger.id}
                    </h2>
                    <div className="w-12 sm:w-16 md:w-20 h-0.5 sm:h-1 bg-[#0a639d] rounded-full mt-1 sm:mt-1 md:mt-2"></div>
                  </div>
                </div>
              </div>              {/* Passenger Details Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-2 sm:mb-3 md:mb-4 shadow-sm border border-gray-100/50 relative z-10">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#2b2b2b] mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-0.5 sm:w-1 md:w-1.5 h-4 sm:h-5 md:h-6 bg-[#0a639d] rounded-full"></div>
                  Passenger Details
                </h3>

                {/* Form Fields Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                  <InputField
                    label="Full Name"
                    value={passenger.fullName}
                    onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                    error={errors[`${index}-fullName`]}
                  />
                  <Dropdown
                    label="Gender"
                    options={genderOptions}
                    value={passenger.gender}
                    onChange={(value) => handlePassengerChange(index, 'gender', value)}
                    placeholder="Select gender"
                    required
                    error={errors[`${index}-gender`]}
                  />
                </div>                {/* Form Fields Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                  <InputField
                    label="Email"
                    type="email"
                    value={passenger.email}
                    onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                    placeholder="Enter email address"
                    required
                    error={errors[`${index}-email`]}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={passenger.phoneNumber}
                    onChange={(e) => handlePassengerChange(index, 'phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    required
                    error={errors[`${index}-phoneNumber`]}
                  />
                </div>                {/* City of Residence */}
                <div className="mb-3 sm:mb-4 md:mb-6 relative z-[200]" style={{zIndex: 200}}>
                  <div className="w-full md:w-1/2 relative z-[200]">
                    <Dropdown
                      label="City of Residence"
                      options={cityOptions}
                      value={passenger.cityOfResidence}
                      onChange={(value) => handlePassengerChange(index, 'cityOfResidence', value)}
                      placeholder="Select city"
                      required
                      error={errors[`${index}-cityOfResidence`]}
                      containerClassName="relative z-[200]"
                    />
                  </div>
                </div>
              </div>              {/* Boarding/Dropping Details */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-3 sm:mb-4 md:mb-6 shadow-sm border border-gray-100/50 relative z-[1]">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#2b2b2b] mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-0.5 sm:w-1 md:w-1.5 h-4 sm:h-5 md:h-6 bg-[#0a639d] rounded-full"></div>
                  Boarding / Dropping Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
                  <Dropdown
                    label="Boarding Place"
                    options={boardingOptions}
                    value={passenger.boardingPlace}
                    onChange={(value) => handlePassengerChange(index, 'boardingPlace', value)}
                    placeholder="Select boarding place"
                    required
                    error={errors[`${index}-boardingPlace`]}
                  />
                  <Dropdown
                    label="Dropping Place"
                    options={droppingOptions}
                    value={passenger.droppingPlace}
                    onChange={(value) => handlePassengerChange(index, 'droppingPlace', value)}
                    placeholder="Select dropping place"
                    required
                    error={errors[`${index}-droppingPlace`]}
                  />
                </div>                {/* Apply to All Checkbox - Only show for first passenger */}
                {index === 0 && (
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-200/50 shadow-sm">
                    <Checkbox
                      label="Apply these details to all passengers"
                      checked={passenger.applyToAll}
                      onChange={(checked) => handleApplyToAll(index, checked)}
                    />
                  </div>
                )}
              </div>              {/* Strong Separator Between Seats */}
              {index < passengers.length - 1 && (
                <div className="relative my-6 sm:my-8 md:my-12">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="bg-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-gray-500 font-medium rounded-full border border-gray-200 shadow-sm">
                      Next Passenger
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}          {/* Go to Payment Button */}
          <div className="flex justify-center sm:justify-end mt-6 sm:mt-8 md:mt-10 pt-3 sm:pt-4 md:pt-6 border-t border-gray-200">
            <Button
              onClick={handleGoToPayment}
              variant="primary"
              size="large"
              className="w-full sm:w-auto sm:min-w-[200px] md:w-[246px] h-[50px] sm:h-[55px] md:h-[60px] shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
            >
              <span className="mr-1 sm:mr-2">Go to payment</span>
              <img 
                src="/images/img_hicon_bold_right_2.svg" 
                alt="arrow" 
                className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] md:w-[28px] md:h-[28px]"
              />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PassengerDetail;