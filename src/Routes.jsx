import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home/Home';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import PhoneSignupPage from './pages/Auth/PhoneSignupPage';
import OTPVerificationPage from './pages/Auth/OTPVerificationPage';
import SeatSelection from './pages/BusSeatSelection/SeatSelection';
import PaymentPage from './pages/Payment/PaymentPage';
import PassengerDetail from './pages/BookingPassengerDetails/PassengerDetail';
import ContactUs from './pages/ContactUs/ContactUs';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';

const AppRoutes = () => {
  return (    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<PhoneSignupPage />} />
        <Route path="/signup/complete" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />{/* SeatSelection Step Pages Routes */}
        <Route path="/search-results" element={<SearchResultsPage />} />        <Route 
          path="/select-seats/:busId" 
          element={<SeatSelection />} 
        />
        <Route path="/passenger-detail" element={<PassengerDetail />} />
        <Route path="/payment" element={<PaymentPage />} />
       
           
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;