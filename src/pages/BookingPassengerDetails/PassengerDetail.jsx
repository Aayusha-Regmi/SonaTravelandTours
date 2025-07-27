import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import BusListingHeader from '../../components/common/BusListingHeader';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Dropdown from '../../components/ui/Dropdown';
import Checkbox from '../../components/ui/Checkbox';
import ProgressBar from '../../components/common/BookingStepComponents/ProgressBar';

const PassengerDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 🔥 FIX: Get selected seats from navigation state - supporting separate departure and return seats
  const { selectedSeats, returnSeats, busData, searchParams, travelDate, totalPrice, seatPrice, bookingDetails, tripType = 'oneWay', returnBusData, returnTravelDate } = location.state || {};
  
  // 🔥 FIX: Create passengers array based on actual selected seats (separate for departure and return)
  const [passengers, setPassengers] = useState([]);
  const [returnPassengers, setReturnPassengers] = useState([]);
  const [errors, setErrors] = useState({});
  const [returnErrors, setReturnErrors] = useState({});
  const [activeTab, setActiveTab] = useState('departure');
  const [useSamePassengerDetails, setUseSamePassengerDetails] = useState(false);

  // Dynamic boarding and dropping options based on journey direction
  const getDynamicBoardingDroppingOptions = () => {
    const fromCity = searchParams?.fromCity || searchParams?.from || 'Kathmandu';
    const toCity = searchParams?.toCity || searchParams?.to || 'Birgunj';
    const isReturnJourney = activeTab === 'return';
    
    console.log(`🚌 Calculating boarding/dropping options for ${activeTab} tab:`, {
      fromCity,
      toCity,
      isReturnJourney,
      searchParams: searchParams
    });
    
    // Get journey points from API - this handles the switching logic
    const journeyPoints = api.getJourneyPoints(fromCity, toCity, isReturnJourney);
    
    return {
      boardingOptions: journeyPoints.boardingPoints,
      droppingOptions: journeyPoints.droppingPoints
    };
  };

  // Recalculate options whenever activeTab changes - FIXED: Move useMemo before any conditional returns
  const { boardingOptions, droppingOptions } = React.useMemo(() => {
    return getDynamicBoardingDroppingOptions();
  }, [activeTab, searchParams?.fromCity, searchParams?.toCity, searchParams?.from, searchParams?.to]);

  // Initialize passengers based on selected seats (independent for departure and return)
  useEffect(() => {
    const departureSeats = selectedSeats || [];
    const returnSeatsArray = returnSeats || [];
    
    console.log('Initializing passengers:', { departureSeats, returnSeatsArray, tripType });
    
    if (departureSeats.length > 0) {
      const initialPassengers = departureSeats.map(seatId => ({
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
    }
    
    // Initialize return passengers for two-way trips based on actual return seats
    if (tripType === 'twoWay' && returnSeatsArray.length > 0) {
      const initialReturnPassengers = returnSeatsArray.map(seatId => ({
        id: seatId,
        fullName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        cityOfResidence: '',
        boardingPlace: '',
        droppingPlace: '',
        applyToAll: false
      }));
      setReturnPassengers(initialReturnPassengers);
      console.log('Return passengers initialized:', initialReturnPassengers);
    }
    
    // If no seats selected, redirect back
    if (departureSeats.length === 0 && (tripType === 'oneWay' || returnSeatsArray.length === 0)) {
      console.error('❌ No selected seats found, redirecting back');
      toast.error('No seats selected. Please select seats first.');
      navigate(-1); // Go back to previous page
    }
  }, [selectedSeats, returnSeats, navigate, tripType]);

  // Show loading if passengers not initialized yet
  if (!passengers || passengers.length === 0) {
    // For two-way trips, also check if return passengers are initialized when needed
    const needsReturnPassengers = tripType === 'twoWay' && returnSeats && returnSeats.length > 0;
    const returnPassengersReady = !needsReturnPassengers || (returnPassengers && returnPassengers.length > 0);
    
    if (!returnPassengersReady) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-['Inter',system-ui,sans-serif] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading passenger details...</p>
          </div>
        </div>
      );
    }
  }

  const genderOptions = [
    { key: 'M', value: 'Male', label: 'Male' },
    { key: 'F', value: 'Female', label: 'Female' },
    { key: 'O', value: 'Other', label: 'Other' }
  ];

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

  const steps = ['Seat Details', 'Passenger Details', 'Payment'];

  // Current passengers based on active tab
  const currentPassengers = activeTab === 'departure' ? passengers : returnPassengers;
  const currentErrors = activeTab === 'departure' ? errors : returnErrors;

  // Handle passenger data change
  const handlePassengerChange = (index, field, value) => {
    const updatePassengers = activeTab === 'departure' ? setPassengers : setReturnPassengers;
    const currentList = activeTab === 'departure' ? passengers : returnPassengers;
    
    const updatedPassengers = [...currentList];
    updatedPassengers[index][field] = value;
    updatePassengers(updatedPassengers);
    
    // Clear error for this field when user starts typing
    const currentErrorSet = activeTab === 'departure' ? errors : returnErrors;
    const setCurrentErrors = activeTab === 'departure' ? setErrors : setReturnErrors;
    
    if (currentErrorSet[`${index}-${field}`]) {
      const newErrors = { ...currentErrorSet };
      delete newErrors[`${index}-${field}`];
      setCurrentErrors(newErrors);
    }
  };

  // Handle "Use same passenger details" checkbox with smart passenger selection
  const handleUseSameDetailsChange = (checked) => {
    setUseSamePassengerDetails(checked);
    
    if (checked && passengers.length > 0) {
      // Find the first passenger with complete details, or use the first passenger
      const sourcePassenger = passengers.find(p => 
        p.fullName && p.gender && p.phoneNumber && p.cityOfResidence && p.boardingPlace && p.droppingPlace
      ) || passengers[0];
      
      console.log('Using passenger details from:', sourcePassenger);
      
      // Copy selected passenger's details to all return passengers
      const copiedPassengers = returnPassengers.map(returnPassenger => ({
        ...returnPassenger,
        fullName: sourcePassenger.fullName,
        gender: sourcePassenger.gender,
        email: sourcePassenger.email,
        phoneNumber: sourcePassenger.phoneNumber,
        cityOfResidence: sourcePassenger.cityOfResidence,
        // For return journey, switch boarding and dropping places
        boardingPlace: sourcePassenger.droppingPlace,
        droppingPlace: sourcePassenger.boardingPlace,
        applyToAll: false // Reset apply to all for return journey
      }));
      
      setReturnPassengers(copiedPassengers);
      setReturnErrors({}); // Clear return errors
      
      toast.success(`Applied ${sourcePassenger.fullName || 'Passenger'} details to all return passengers (with switched boarding/dropping points)`, {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // Reset return passengers to empty based on actual return seats
      const returnSeatsArray = returnSeats || [];
      const emptyReturnPassengers = returnSeatsArray.map(seatId => ({
        id: seatId,
        fullName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        cityOfResidence: '',
        boardingPlace: '',
        droppingPlace: '',
        applyToAll: false
      }));
      setReturnPassengers(emptyReturnPassengers);
    }
  };

  // Function to copy specific departure passenger's details to all return passengers
  const copyDeparturePassengerToReturn = (departurePassengerIndex) => {
    const sourcePassenger = passengers[departurePassengerIndex];
    
    if (sourcePassenger) {
      const copiedPassengers = returnPassengers.map(returnPassenger => ({
        ...returnPassenger,
        fullName: sourcePassenger.fullName,
        gender: sourcePassenger.gender,
        email: sourcePassenger.email,
        phoneNumber: sourcePassenger.phoneNumber,
        cityOfResidence: sourcePassenger.cityOfResidence,
        // For return journey, switch boarding and dropping places
        boardingPlace: sourcePassenger.droppingPlace,
        droppingPlace: sourcePassenger.boardingPlace,
        applyToAll: false
      }));
      
      setReturnPassengers(copiedPassengers);
      setReturnErrors({}); // Clear return errors
      
      toast.success(`Applied Seat ${sourcePassenger.id} passenger details to all return passengers (with switched boarding/dropping points)`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Helper function to format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const numbersOnly = value.replace(/[^0-9]/g, '');
    
    // Format based on Nepal phone number patterns
    if (numbersOnly.length <= 10) {
      // Format mobile numbers: 98XXXXXXXX -> 98XX-XXX-XXX
      if (numbersOnly.length === 10 && numbersOnly.startsWith('9')) {
        return numbersOnly.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
      }
      // Format landline: 01XXXXXXX -> 01-XXXXXXX
      if (numbersOnly.length >= 8 && numbersOnly.startsWith('0')) {
        return numbersOnly.replace(/(\d{2})(\d{4})(\d{0,3})/, '$1-$2-$3').replace(/-$/, '');
      }
    }
    
    return numbersOnly;
  };

  // Helper function to validate email in real-time
  const validateEmail = (email) => {
    if (!email) return { isValid: true, message: '' };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Please enter a valid email address'
    };
  };

  // Helper function to validate phone number in real-time
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return { isValid: false, message: 'Phone number is required' };
    
    const cleanPhone = phoneNumber.replace(/\s|-|\(|\)/g, '');
    const nepaliMobileRegex = /^(\+977[-\s]?)?[9][0-9]{9}$/;
    const nepaliLandlineRegex = /^(\+977[-\s]?)?[0][1-9][0-9]{6,7}$/;
    
    if (nepaliMobileRegex.test(cleanPhone) || nepaliLandlineRegex.test(cleanPhone)) {
      return { isValid: true, message: '' };
    }
    
    return {
      isValid: false,
      message: 'Please enter a valid Nepali phone number (e.g., 9841234567 or 01-4567890)'
    };
  };

  const validateForm = () => {
    const newErrors = {};
    const newReturnErrors = {};
    
    // Validate departure passengers
    passengers.forEach((passenger, index) => {
      // Required field validations
      if (!passenger.fullName.trim()) {
        newErrors[`${index}-fullName`] = 'Full name is required';
      } else if (passenger.fullName.trim().length < 2) {
        newErrors[`${index}-fullName`] = 'Name must be at least 2 characters long';
      } else if (!/^[a-zA-Z\s]+$/.test(passenger.fullName.trim())) {
        newErrors[`${index}-fullName`] = 'Name can only contain letters and spaces';
      }
      
      if (!passenger.gender) {
        newErrors[`${index}-gender`] = 'Gender is required';
      }
      
      // Enhanced email validation
      if (passenger.email && passenger.email.trim()) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(passenger.email.trim())) {
          newErrors[`${index}-email`] = 'Please enter a valid email address';
        }
      }
      
      // Enhanced phone number validation for Nepal
      if (!passenger.phoneNumber.trim()) {
        newErrors[`${index}-phoneNumber`] = 'Phone number is required';
      } else {
        const phoneNumber = passenger.phoneNumber.replace(/\s|-|\(|\)/g, ''); // Remove spaces, dashes, parentheses
        
        // Nepal phone number patterns:
        // Mobile: 98xxxxxxxx, 97xxxxxxxx, 96xxxxxxxx, 95xxxxxxxx, 94xxxxxxxx, 985xxxxxxx, 986xxxxxxx, 988xxxxxxx
        // Landline: 01-xxxxxxx (Kathmandu), 021-xxxxxx (Pokhara), etc.
        // International: +977-98xxxxxxxx
        
        const nepaliMobileRegex = /^(\+977[-\s]?)?[9][0-9]{9}$/;
        const nepaliLandlineRegex = /^(\+977[-\s]?)?[0][1-9][0-9]{6,7}$/;
        const internationalRegex = /^(\+977[-\s]?)[0-9]{8,10}$/;
        
        if (!nepaliMobileRegex.test(phoneNumber) && 
            !nepaliLandlineRegex.test(phoneNumber) && 
            !internationalRegex.test(phoneNumber)) {
          newErrors[`${index}-phoneNumber`] = 'Please enter a valid Nepali phone number (e.g., 9841234567 or 01-4567890)';
        }
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
    
    // Validate return passengers for two-way trips
    if (tripType === 'twoWay' && !useSamePassengerDetails) {
      returnPassengers.forEach((passenger, index) => {
        // Required field validations
        if (!passenger.fullName.trim()) {
          newReturnErrors[`${index}-fullName`] = 'Full name is required';
        } else if (passenger.fullName.trim().length < 2) {
          newReturnErrors[`${index}-fullName`] = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(passenger.fullName.trim())) {
          newReturnErrors[`${index}-fullName`] = 'Name can only contain letters and spaces';
        }
        
        if (!passenger.gender) {
          newReturnErrors[`${index}-gender`] = 'Gender is required';
        }
        
        // Enhanced email validation
        if (passenger.email && passenger.email.trim()) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(passenger.email.trim())) {
            newReturnErrors[`${index}-email`] = 'Please enter a valid email address';
          }
        }
        
        // Enhanced phone number validation for Nepal
        if (!passenger.phoneNumber.trim()) {
          newReturnErrors[`${index}-phoneNumber`] = 'Phone number is required';
        } else {
          const phoneNumber = passenger.phoneNumber.replace(/\s|-|\(|\)/g, ''); // Remove spaces, dashes, parentheses
          
          const nepaliMobileRegex = /^(\+977[-\s]?)?[9][0-9]{9}$/;
          const nepaliLandlineRegex = /^(\+977[-\s]?)?[0][1-9][0-9]{6,7}$/;
          const internationalRegex = /^(\+977[-\s]?)[0-9]{8,10}$/;
          
          if (!nepaliMobileRegex.test(phoneNumber) && 
              !nepaliLandlineRegex.test(phoneNumber) && 
              !internationalRegex.test(phoneNumber)) {
            newReturnErrors[`${index}-phoneNumber`] = 'Please enter a valid Nepali phone number (e.g., 9841234567 or 01-4567890)';
          }
        }
        
        if (!passenger.cityOfResidence) {
          newReturnErrors[`${index}-cityOfResidence`] = 'City of residence is required';
        }
        if (!passenger.boardingPlace) {
          newReturnErrors[`${index}-boardingPlace`] = 'Boarding place is required';
        }
        if (!passenger.droppingPlace) {
          newReturnErrors[`${index}-droppingPlace`] = 'Dropping place is required';
        }
      });
    }
    
    setErrors(newErrors);
    setReturnErrors(newReturnErrors);
    
    return Object.keys(newErrors).length === 0 && Object.keys(newReturnErrors).length === 0;
  };

  const handleApplyToAll = (sourceIndex, checked) => {
    const updatePassengers = activeTab === 'departure' ? setPassengers : setReturnPassengers;
    const currentList = activeTab === 'departure' ? passengers : returnPassengers;
    const updatedPassengers = [...currentList];
    
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
      const currentErrorSet = activeTab === 'departure' ? errors : returnErrors;
      const setCurrentErrors = activeTab === 'departure' ? setErrors : setReturnErrors;
      const newErrors = { ...currentErrorSet };
      
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
      
      setCurrentErrors(newErrors);
      
      // Show success message
      const tabName = activeTab === 'departure' ? 'departure' : 'return';
      toast.success(`Applied Seat ${sourcePassenger.id} details to all ${tabName} passengers`, {
        position: "top-right",
        autoClose: 2000,
      });
      
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
    
    updatePassengers(updatedPassengers);
  };

  const handleGoToPayment = () => {
    if (validateForm()) {
      console.log('Proceeding to payment with complete data:', {
        passengers,
        returnPassengers,
        selectedSeats,
        returnSeats,
        travelDate,
        totalPrice
      });
      
      // Calculate total price based on actual seat selections
      const departureSeats = selectedSeats || [];
      const returnSeatsArray = returnSeats || [];
      const calculatedTotalPrice = (departureSeats.length * seatPrice) + (returnSeatsArray.length * seatPrice);
      
      // 🔥 FIX: Pass all booking data to payment page with correct seat information
      navigate('/payment', {
        state: {
          passengers: passengers,          // Departure passenger details
          returnPassengers: tripType === 'twoWay' ? returnPassengers : null, // Return passenger details
          selectedSeats: selectedSeats,    // Departure seat numbers
          returnSeats: returnSeats,        // Return seat numbers
          busData: busData,               // Bus information
          returnBusData: returnBusData,   // Return bus information
          searchParams: searchParams,      // Search parameters
          travelDate: travelDate,         // Travel date
          returnTravelDate: returnTravelDate, // Return travel date
          totalPrice: tripType === 'twoWay' ? calculatedTotalPrice : totalPrice, // Total booking price
          seatPrice: seatPrice,           // Price per seat
          tripType: tripType,             // Trip type
          bookingDetails: {
            ...bookingDetails,
            totalSeats: departureSeats.length + (returnSeatsArray.length || 0),
            departureSeats: departureSeats.length,
            returnSeats: returnSeatsArray.length,
            farePerSeat: seatPrice,
            totalFare: tripType === 'twoWay' ? calculatedTotalPrice : totalPrice
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
      <Header />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 pt-20 sm:pt-22 md:pt-24">
        {/* Bus Listing Header */}
        <BusListingHeader 
          title="Available Buses"
          subtitle="Multiple Types"
          departureDate={travelDate}
          returnDate={returnTravelDate}
          fromCity={searchParams?.fromCity || "Kathmandu"}
          toCity={searchParams?.toCity || "Birgunj"}
          duration="6h 15m"
          tripType={tripType}
          showDates={true}
        />

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8 px-2 sm:px-0">
          <ProgressBar steps={steps} currentStep={1} />
        </div>

        {/* Passenger Details Form */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl shadow-blue-100/20 p-6 lg:p-8 border border-white/30 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-indigo-50/5 pointer-events-none rounded-2xl"></div>
          
          <div className="relative z-10">
            {/* Enhanced Two-Way Trip Tabs with Gradient and Seat Information */}
            {tripType === 'twoWay' && (
              <div className="mb-8">
                <div className="backdrop-blur-md bg-gradient-to-r from-green-100/30 to-teal-100/30 border border-green-200/40 rounded-xl p-4 mb-6 shadow-lg">
                  <div className="flex backdrop-blur-sm bg-gradient-to-r from-green-50/20 to-teal-50/20 border border-green-200/30 rounded-lg p-1 shadow-inner">
                    <button
                      onClick={() => handleTabChange('departure')}
                      className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        activeTab === 'departure'
                          ? 'bg-gradient-to-r from-green-400/90 to-teal-500/90 text-white shadow-lg backdrop-blur-md border border-green-300/50'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-200/30 hover:to-teal-200/30 hover:text-green-800'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>Departure Journey</span>
                        <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {selectedSeats?.length || 0} seats
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleTabChange('return')}
                      className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                        activeTab === 'return'
                          ? 'bg-gradient-to-r from-green-400/90 to-teal-500/90 text-white shadow-lg backdrop-blur-md border border-green-300/50'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-green-200/30 hover:to-teal-200/30 hover:text-green-800'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>Return Journey</span>
                        <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {returnSeats?.length || 0} seats
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Enhanced "Use same passenger details" checkbox with passenger selection */}
                {activeTab === 'return' && (
                  <div className="mb-6">
                    <div className="backdrop-blur-sm bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-xl border border-blue-200/60 p-4 shadow-lg animate-pulse-soft">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Checkbox
                            label="Use same passenger details as in departure"
                            checked={useSamePassengerDetails}
                            onChange={handleUseSameDetailsChange}
                            className="text-blue-800 font-semibold"
                          />
                        </div>
                        
                        {/* Passenger Selection Dropdown - only show if multiple departure passengers and checkbox is checked */}
                        {useSamePassengerDetails && passengers.length > 1 && (
                          <div className="mt-4 pl-6 border-l-2 border-blue-300/50">
                            <p className="text-sm text-blue-700 mb-2 font-medium">
                              Select which departure passenger's details to use:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {passengers.map((passenger, index) => (
                                <button
                                  key={passenger.id}
                                  onClick={() => copyDeparturePassengerToReturn(index)}
                                  className="text-left p-3 rounded-lg border border-blue-200/50 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                      {passenger.id}
                                    </div>
                                    <div>
                                      <div className="font-medium text-blue-800">
                                        {passenger.fullName || `Passenger ${index + 1}`}
                                      </div>
                                      <div className="text-xs text-blue-600">
                                        {passenger.gender ? `${passenger.gender} • ` : ''}
                                        {passenger.phoneNumber || 'No phone'}
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentPassengers.map((passenger, index) => (
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
                            Seat {passenger.id} - {activeTab === 'departure' ? 'Departure' : 'Return'}
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
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                        {/* Row 1: Name, Gender */}
                        <InputField
                          label="Full Name"
                          value={passenger.fullName}
                          onChange={(e) => handlePassengerChange(index, 'fullName', e.target.value)}
                          placeholder="Enter full name"
                          required
                          error={currentErrors[`${index}-fullName`]}
                        />
                        <div className="relative" style={{ zIndex: 1500 - index * 10 }}>
                          <Dropdown
                            label="Gender"
                            options={genderOptions}
                            value={passenger.gender}
                            onChange={(value) => handlePassengerChange(index, 'gender', value)}
                            placeholder="Select gender"
                            required
                            error={currentErrors[`${index}-gender`]}
                            searchable={true}
                            onKeyPress={(key) => {
                              const keyUpper = key.toUpperCase();
                              const option = genderOptions.find(opt => opt.key === keyUpper);
                              if (option) {
                                handlePassengerChange(index, 'gender', option.value);
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Row 2: Phone, Email, City, Boarding & Dropping Points */}
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                        <div className="relative">
                          <InputField
                            label="Phone Number"
                            type="tel"
                            value={passenger.phoneNumber}
                            onChange={(e) => handlePassengerChange(index, 'phoneNumber', e.target.value)}
                            placeholder="Enter Phone Number"
                            required
                            error={currentErrors[`${index}-phoneNumber`]}
                          />
                          {/* Real-time validation feedback */}
                          {passenger.phoneNumber && !currentErrors[`${index}-phoneNumber`] && (
                            <div className="mt-1">
                              {validatePhoneNumber(passenger.phoneNumber).isValid ? (
                                <div className="flex items-center text-green-600 text-xs">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Valid phone number
                                </div>
                              ) : (
                                <div className="text-amber-600 text-xs">
                                  {validatePhoneNumber(passenger.phoneNumber).message}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <InputField
                            label="Email (Optional)"
                            type="email"
                            value={passenger.email}
                            onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                            placeholder="example@email.com"
                            error={currentErrors[`${index}-email`]}
                          />
                          {/* Real-time email validation feedback */}
                          {passenger.email && !currentErrors[`${index}-email`] && (
                            <div className="mt-1">
                              {validateEmail(passenger.email).isValid ? (
                                <div className="flex items-center text-green-600 text-xs">
                                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  Valid email
                                </div>
                              ) : (
                                <div className="text-amber-600 text-xs">
                                  {validateEmail(passenger.email).message}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="relative" style={{ zIndex: 1400 - index * 10 }}>
                          <Dropdown
                            label="City of Residence"
                            options={cityOptions}
                            value={passenger.cityOfResidence}
                            onChange={(value) => handlePassengerChange(index, 'cityOfResidence', value)}
                            placeholder="Select city"
                            required
                            error={currentErrors[`${index}-cityOfResidence`]}
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
                            error={currentErrors[`${index}-boardingPlace`]}
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
                            error={currentErrors[`${index}-droppingPlace`]}
                            searchable={true}
                          />
                        </div>
                      </div>

                      {/* Apply to All Checkbox - Only show when multiple passengers and not using same details */}
                      {currentPassengers.length > 1 && !(tripType === 'twoWay' && activeTab === 'return' && useSamePassengerDetails) && (
                        <div className="backdrop-blur-sm bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-lg border border-blue-200/30 p-3 shadow-sm">
                          <div className="flex items-center justify-between">
                            <Checkbox
                              label={`Apply Seat ${passenger.id} details to all ${activeTab} passengers`}
                              checked={passenger.applyToAll}
                              onChange={(checked) => handleApplyToAll(index, checked)}
                            />
                            <div className="text-xs text-gray-600 ml-3">
                              {passenger.applyToAll 
                                ? `✓ Applied to ${currentPassengers.length - 1} other${currentPassengers.length > 2 ? 's' : ''}`
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
                {index < currentPassengers.length - 1 && (
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

            {/* Modern Payment/Navigation Button */}
            <div className="flex justify-center sm:justify-end mt-10 pt-6">
              {tripType === 'twoWay' && activeTab === 'departure' ? (
                // For departure tab in two-way trip, show "For Return" button
                <div className="backdrop-blur-sm bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-0.5 shadow-xl shadow-green-200/30 hover:shadow-green-300/40 transition-all duration-300">
                  <Button
                    onClick={() => setActiveTab('return')}
                    variant="primary"
                    size="large"
                    className="w-full sm:w-auto sm:min-w-[200px] md:w-[246px] h-[55px] md:h-[60px] bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 backdrop-blur-sm border-0 shadow-none text-white font-semibold rounded-2xl transition-all duration-300 text-base flex items-center justify-center gap-2"
                  >
                    <span>For Return</span>
                    <img 
                      src="/images/img_hicon_bold_right_2.svg" 
                      alt="arrow" 
                      className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] filter brightness-0 invert"
                    />
                  </Button>
                </div>
              ) : (
                // For one-way trip or return tab in two-way trip, show "Go to payment" button
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetail;