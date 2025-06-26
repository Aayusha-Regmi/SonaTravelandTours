import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  // 🔥 FIX: Get selected seats from navigation state
  const { selectedSeats, busData, searchParams, travelDate, totalPrice, seatPrice, bookingDetails } = location.state || {};
  
  // 🔥 FIX: Create passengers array based on actual selected seats
  const [passengers, setPassengers] = useState([]);
  const [errors, setErrors] = useState({});

  // Initialize passengers based on selected seats
  useEffect(() => {
    if (selectedSeats && selectedSeats.length > 0) {
      console.log('🎯 Initializing passengers for selected seats:', selectedSeats);
      
      const initialPassengers = selectedSeats.map(seatId => ({
        id: seatId,                    // Use actual seat ID (A5, B7, etc.)
        fullName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        cityOfResidence: '',
        boardingPlace: '',
        droppingPlace: '',
        applyToAll: false
      }));
      
      setPassengers(initialPassengers);
      console.log('✅ Passengers initialized:', initialPassengers);
    } else {
      // Fallback if no seats selected (redirect back)
      console.error('❌ No selected seats found, redirecting back');
      toast.error('No seats selected. Please select seats first.');
      navigate(-1); // Go back to previous page
    }
  }, [selectedSeats, navigate]);

  // Show loading if passengers not initialized yet
  if (!passengers || passengers.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter',system-ui,sans-serif] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading passenger details...</p>
        </div>
      </div>
    );
  }

  const genderOptions = ['Male', 'Female', 'Other'];

  const cityOptions = [
// 🏙 Metropolises (6)
  "Kathmandu", "Pokhara", "Bharatpur", "Lalitpur", "Biratnagar", "Birgunj",
 // 🌆 Sub-metropolises (11)
  "Ghorahi", "Tulsipur", "Jitpur Simara", "Dhangadhi",
  "Hetauda", "Dharan", "Kalaiya", "Butwal",
  "Itahari", "Janakpurdham", "Nepalgunj",
 // 🏘 Municipal Councils (276) – complete list follows
  "Aathabis", "Aathabiskot", "Amargadhi", "Arjundhara",
  "Aurahi", "Badimalika", "Bagchaur", "Baglung", "Bagmati",
  "Bahudarmai", "Balara", "Balawa", "Banepa", "Banganga",
  "Bangad Kupinde", "Bansgadhi", "Barahachhetra", "Barahathwa",
  "Baudhimai", "Bedkot", "Belaka", "Belauri", "Belbari",
  "Belkotgadhi", "Beni", "Besisahar", "Bhadrapur", "Bhajani",
  "Bhaktapur", "Bhangaha", "Bhanu", "Bheri", "Bheriganga",
  "Bhimad", "Bhimdatta", "Bhimeshwor", "Bhirkot", "Bhojpur",
  "Bhumikasthan", "Bideha", "Bidur", "Birendranagar",
  "Birtamod", "Bodebarsain", "Buddhabhumi", "Budhanilkantha",
  "Budhiganga", "Budhinanda", "Bungal", "Chainpur",
  "Chamunda Bindrasaini", "Chandannath", "Chandragiri",
  "Chandrapur", "Changunarayan", "Chapakot", "Chaudandigadhi",
  "Chaurjahari", "Chautara Sangachokgadhi", "Chhayanath Rara",
  "Chhedagad", "Dakneshwari", "Dakshinkali", "Damak",
  "Dasharathchand", "Deumai", "Devchuli", "Devdaha",
  "Dewahi Gonahi", "Dhangadimai", "Dhankuta", "Dhanushadham",
  "Dharmadevi", "Dhorpatan", "Dhulikhel", "Dhunibeshi",
  "Dipayal Silgadhi", "Dudhauli", "Duhabi", "Dullu", "Gadhimai",
  "Gaindakot", "Galkot", "Galyang", "Ganeshman Charnath",
  "Garuda", "Gaur", "Gauradaha", "Ghodaghodi", "Godawari",
  "Gokarneshwor", "Gorkha", "Gulariya", "Gulariya", "Gulmi",];


  const boardingOptions = ['Banepa', 'Sallaghari', 'Koteshwor','Airport','Gaushala','Chabahil'];
  const droppingOptions = ['Simara', 'Jeetpur', 'Parwanipur','Gandak','Pipra','Ghantaghar'];

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

  const handleApplyToAll = (sourceIndex, checked) => {
    const updatedPassengers = [...passengers];
    
    if (checked) {
      // First, uncheck all other "Apply to All" checkboxes
      updatedPassengers.forEach((passenger, index) => {
        if (index !== sourceIndex) {
          updatedPassengers[index].applyToAll = false;
        }
      });
      
      // Set the current one as checked
      updatedPassengers[sourceIndex].applyToAll = checked;
      
      // Apply source passenger's data to all others
      const sourcePassenger = updatedPassengers[sourceIndex];
      const newErrors = { ...errors };
      
      console.log(`🔄 Applying passenger ${sourceIndex + 1} (Seat ${sourcePassenger.id}) data to all others`);
      
      for (let i = 0; i < updatedPassengers.length; i++) {
        if (i !== sourceIndex) {
          // Store the previous data before overwriting
          const previousData = { ...updatedPassengers[i] };
          
          updatedPassengers[i] = {
            ...updatedPassengers[i],
            fullName: sourcePassenger.fullName,
            gender: sourcePassenger.gender,
            email: sourcePassenger.email,
            phoneNumber: sourcePassenger.phoneNumber,
            cityOfResidence: sourcePassenger.cityOfResidence,
            boardingPlace: sourcePassenger.boardingPlace,
            droppingPlace: sourcePassenger.droppingPlace,
            // Store previous data for restoration when unchecked
            previousData: {
              fullName: previousData.fullName,
              gender: previousData.gender,
              email: previousData.email,
              phoneNumber: previousData.phoneNumber,
              cityOfResidence: previousData.cityOfResidence,
              boardingPlace: previousData.boardingPlace,
              droppingPlace: previousData.droppingPlace
            }
          };
          
          // Clear errors for all fields of other passengers when applying data
          const fieldsToUpdate = ['fullName', 'gender', 'email', 'phoneNumber', 'cityOfResidence', 'boardingPlace', 'droppingPlace'];
          fieldsToUpdate.forEach(field => {
            if (newErrors[`${i}-${field}`]) {
              delete newErrors[`${i}-${field}`];
            }
          });
        }
      }
      
      setErrors(newErrors);
      console.log('✅ Applied data to all other passengers');
    } else {
      // Uncheck and restore previous data
      updatedPassengers[sourceIndex].applyToAll = checked;
      
      console.log(`🔙 Restoring previous data for other passengers (unchecked from Seat ${updatedPassengers[sourceIndex].id})`);
      
      for (let i = 0; i < updatedPassengers.length; i++) {
        if (i !== sourceIndex && updatedPassengers[i].previousData) {
          // Restore from stored previous data
          updatedPassengers[i] = {
            ...updatedPassengers[i],
            fullName: updatedPassengers[i].previousData.fullName || '',
            gender: updatedPassengers[i].previousData.gender || '',
            email: updatedPassengers[i].previousData.email || '',
            phoneNumber: updatedPassengers[i].previousData.phoneNumber || '',
            cityOfResidence: updatedPassengers[i].previousData.cityOfResidence || '',
            boardingPlace: updatedPassengers[i].previousData.boardingPlace || '',
            droppingPlace: updatedPassengers[i].previousData.droppingPlace || '',
            previousData: undefined // Clear stored data
          };
        }
      }
      
      console.log('✅ Restored previous data for all passengers');
    }
    
    setPassengers(updatedPassengers);
  };

  const handleGoToPayment = () => {
    if (validateForm()) {
      console.log('🎯 Proceeding to payment with complete data:', {
        passengers,
        selectedSeats,
        busData,
        totalPrice,
        travelDate,
        bookingDetails
      });
      
      // 🔥 FIX: Pass all booking data to payment page
      navigate('/payment', {
        state: {
          passengers: passengers,          // Passenger details with actual seat numbers
          selectedSeats: selectedSeats,    // Selected seat numbers
          busData: busData,               // Bus information
          searchParams: searchParams,      // Search parameters
          travelDate: travelDate,         // Travel date
          totalPrice: totalPrice,         // Total booking price
          seatPrice: seatPrice,           // Price per seat
          bookingDetails: {
            ...bookingDetails,
            totalSeats: selectedSeats.length,
            farePerSeat: seatPrice,
            totalFare: totalPrice
          }
        }
      });
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
          busName={busData?.busName || busData?.name || "Bus Information"}
          busType={busData?.busType || busData?.type || "Standard"}
          date={travelDate || new Date().toLocaleDateString()}
          time={busData?.departureTime || "TBD"}
          boardingPlace={searchParams?.fromCity || busData?.departureLocation || "Kathmandu"}
          droppingPlace={searchParams?.toCity || busData?.arrivalLocation || "Birgunj"}
          duration={busData?.duration || "TBD"}
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
                    label="Boarding Point"
                    options={boardingOptions}
                    value={passenger.boardingPlace}
                    onChange={(value) => handlePassengerChange(index, 'boardingPlace', value)}
                    placeholder="Select boarding place"
                    required
                    error={errors[`${index}-boardingPlace`]}
                  />
                  <Dropdown
                    label="Dropping Point"
                    options={droppingOptions}
                    value={passenger.droppingPlace}
                    onChange={(value) => handlePassengerChange(index, 'droppingPlace', value)}
                    placeholder="Select dropping place"
                    required
                    error={errors[`${index}-droppingPlace`]}
                  />
                </div>                {/* Apply to All Checkbox - Show on every passenger card when multiple passengers */}
                {passengers.length > 1 && (
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-200/50 shadow-sm">
                    <Checkbox
                      label={`Apply Seat ${passenger.id} details to all other passengers`}
                      checked={passenger.applyToAll}
                      onChange={(checked) => handleApplyToAll(index, checked)}
                    />
                    <div className="ml-2 text-xs text-gray-600">
                      {passenger.applyToAll 
                        ? `✓ Applied to ${passengers.length - 1} other passenger${passengers.length > 2 ? 's' : ''}`
                        : 'Check to copy these details to other passengers'
                      }
                    </div>
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