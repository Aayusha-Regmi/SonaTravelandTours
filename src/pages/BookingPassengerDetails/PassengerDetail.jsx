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
      console.log('Initializing passengers for selected seats:', selectedSeats);
      
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
      console.log('Passengers initialized:', initialPassengers);
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


  const boardingOptions = ['Banepa','Sanga','Palanse','Nalinchowk','Bhaktapur','Jagati','Sallaghari','Bhatbhateni,Thimi','SS Chowk','Sagbari','Kaushaltar','Lokanthali','Jadibuti','Tinkune','Airport','Gaushala','Chabahil','GopiKrishna','Sukedhara','Dhumbarahi','ChappalKarkhana','Chakrapath','Basundhara','Samakhusi','Gangabu','Buspark','Machapokhari','Balaju','Banasthali','Sitapaila','Kalanki (Narayani Petrol Pump)','Swyambhu','Naikap', 'Satungal','Gurjudhare','Chandrasiri','Sallaghari', 'Koteshwor','Airport','Gaushala','Chabahil'];
  const droppingOptions = ['Simara','Kalaiya', 'Jeetpur', 'Parwanipur','Gandak','Pipra','Ghantaghar'];

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
      if (passenger.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) {
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
      
      console.log(`Applying passenger ${sourceIndex + 1} (Seat ${sourcePassenger.id}) data to all others`);
      
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
      console.log('Applied data to all other passengers');
    } else {
      // Uncheck and restore previous data
      updatedPassengers[sourceIndex].applyToAll = checked;
      
      console.log(`Restoring previous data for other passengers (unchecked from Seat ${updatedPassengers[sourceIndex].id})`);
      
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
      
      console.log('Restored previous data for all passengers');
    }
    
    setPassengers(updatedPassengers);
  };

  const handleGoToPayment = () => {
    if (validateForm()) {
      console.log('Proceeding to payment with complete data:', {
        passengers,
        selectedSeats,
        travelDate,
        totalPrice
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 font-['Inter',system-ui,sans-serif]">
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
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl shadow-blue-100/20 p-6 lg:p-8 border border-white/30 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-indigo-50/5 pointer-events-none rounded-2xl"></div>
          
          <div className="relative z-10">
            {passengers.map((passenger, index) => (
              <div key={passenger.id} className={`relative mb-8 lg:mb-12 last:mb-0`} style={{ zIndex: 1000 - index * 10 }}>
                {/* Modern Passenger Card */}
                <div className="backdrop-blur-md bg-white/80 rounded-2xl p-6 lg:p-8 border border-white/40 shadow-lg shadow-blue-100/10 hover:shadow-xl hover:shadow-blue-200/20 transition-all duration-300 relative group">
                  {/* Card background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/10 to-indigo-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>                  
                  <div className="relative z-10">
                    {/* Seat Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {passenger.id}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            Seat {passenger.id}
                          </h2>
                          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                        </div>
                      </div>
                    </div>                    {/* Compact Form Layout */}
                    <div className="backdrop-blur-sm bg-white/60 rounded-xl p-6 mb-6 border border-white/30 shadow-sm">
                      <h3 className="text-lg font-bold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent mb-4 flex items-center gap-3" style={{ zIndex: 1 }}>
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                        Passenger Information
                      </h3>

                      {/* Optimized Form Grid - All fields in structured layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                        {/* Row 1: Name, Gender, Email */}
                        <InputField
                          label="Full Name"
                          value={passenger.fullName}
                          onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)}
                          placeholder="Enter full name"
                          required
                          error={errors[`${index}-fullName`]}
                        />
                        <div className="relative" style={{ zIndex: 1500 - index * 10 }}>
                          <Dropdown
                            label="Gender"
                            options={genderOptions}
                            value={passenger.gender}
                            onChange={(value) => handlePassengerChange(index, 'gender', value)}
                            placeholder="Select gender"
                            required
                            error={errors[`${index}-gender`]}
                            searchable={true}
                          />
                        </div>
                        <InputField
                          label="Email"
                          type="email"
                          value={passenger.email}
                          onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                          placeholder="Enter email address"
                        
                          error={errors[`${index}-email`]}
                        />
                      </div>

                      {/* Row 2: Phone, City, Boarding & Dropping Points */}
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                        <InputField
                          label="Phone Number"
                          type="tel"
                          value={passenger.phoneNumber}
                          onChange={(e) => handlePassengerChange(index, 'phoneNumber', e.target.value)}
                          placeholder="Enter phone number"
                          required
                          error={errors[`${index}-phoneNumber`]}
                        />
                        <div className="relative" style={{ zIndex: 1400 - index * 10 }}>
                          <Dropdown
                            label="City of Residence"
                            options={cityOptions}
                            value={passenger.cityOfResidence}
                            onChange={(value) => handlePassengerChange(index, 'cityOfResidence', value)}
                            placeholder="Select city"
                            required
                            error={errors[`${index}-cityOfResidence`]}
                            searchable={true}
                          />
                        </div>
                        <div className="relative" style={{ zIndex: 1300 - index * 10 }}>
                          <Dropdown
                            label="Boarding Point"
                            options={boardingOptions}
                            value={passenger.boardingPlace}
                            onChange={(value) => handlePassengerChange(index, 'boardingPlace', value)}
                            placeholder="Select boarding point"
                            required
                            error={errors[`${index}-boardingPlace`]}
                            searchable={true}
                          />
                        </div>
                        <div className="relative" style={{ zIndex: 1200 - index * 10 }}>
                          <Dropdown
                            label="Dropping Point"
                            options={droppingOptions}
                            value={passenger.droppingPlace}
                            onChange={(value) => handlePassengerChange(index, 'droppingPlace', value)}
                            placeholder="Select dropping point"
                            required
                            error={errors[`${index}-droppingPlace`]}
                            searchable={true}
                          />
                        </div>
                      </div>

                      {/* Apply to All Checkbox - Compact Design */}
                      {passengers.length > 1 && (
                        <div className="backdrop-blur-sm bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-lg border border-blue-200/30 p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <Checkbox
                              label={`Apply Seat ${passenger.id} details to all passengers`}
                              checked={passenger.applyToAll}
                              onChange={(checked) => handleApplyToAll(index, checked)}
                            />
                            <div className="text-xs text-gray-600 ml-3">
                              {passenger.applyToAll 
                                ? `✓ Applied to ${passengers.length - 1} other${passengers.length > 2 ? 's' : ''}`
                                : 'Copy to all'
                              }
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Minimal Separator Between Passengers */}
                {index < passengers.length - 1 && (
                  <div className="relative my-8" style={{ zIndex: -1 }}>
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-blue-200/30"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="backdrop-blur-sm bg-white/90 px-4 py-1 text-xs text-gray-500 font-medium rounded-full border border-white/40 shadow-sm">
                        Passenger {index + 2}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Modern Payment Button */}
            <div className="flex justify-center sm:justify-end mt-10 pt-6">
              <div className="backdrop-blur-sm bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-0.5 shadow-xl shadow-blue-200/30 hover:shadow-blue-300/40 transition-all duration-300">
                <Button
                  onClick={handleGoToPayment}
                  variant="primary"
                  size="large"
                  className="w-full sm:w-auto sm:min-w-[200px] md:w-[246px] h-[55px] md:h-[60px] bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 backdrop-blur-sm border-0 shadow-none text-white font-semibold rounded-2xl transition-all duration-300 text-base flex items-center justify-center gap-2"
                >
                  <span>Go to payment</span>
                  <img 
                    src="/images/img_hicon_bold_right_2.svg" 
                    alt="arrow" 
                    className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] filter brightness-0 invert"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PassengerDetail;