import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import Protected Route component
import ProtectedRoute from './components/ProtectedRoute';
import PlaceholderPage from './components/PlaceholderPage';
// import ApiTestComponent from './components/ApiTestComponent';

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
// import AboutUs from './pages/AboutUs/AboutUs';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import FAQs from './pages/FAQs/FAQs';

const AppRoutes = () => {
  return (    <Router>      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/api-test" element={<ApiTestComponent />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        {/*<Route path="/about" element={<AboutUs />} />*/}
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQs />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<PhoneSignupPage />} />
        <Route path="/signup/complete" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />        {/* Protected Routes - Require Authentication */}
        <Route 
          path="/search-results" 
          element={
            <ProtectedRoute>
              <SearchResultsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/select-seats/:busId" 
          element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/passenger-detail" 
          element={
            <ProtectedRoute>
              <PassengerDetail />
            </ProtectedRoute>
          } 
        />        <Route 
          path="/payment" 
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } 
        />
        
        
        <Route 
          path="/bookings" 
          element={
            <ProtectedRoute>
              <PlaceholderPage 
                title="My Bookings" 
                description="View and manage your bus bookings here. This page is under development."
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/live-track" 
          element={
            <ProtectedRoute>
              <PlaceholderPage 
                title="Live Track" 
                description="Track your bus in real-time. This page is under development."
              />
            </ProtectedRoute>
          } 
        />
       
        
        <Route
          path="/routes" 
          element={
            <ProtectedRoute>
              <PlaceholderPage 
                title="Bus Routes" 
                description="Explore available bus routes and schedules. This page is under development."
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/insurance" 
          element={
            <ProtectedRoute>
              <PlaceholderPage 
                title="Travel Insurance" 
                description="Protect your journey with travel insurance. This page is under development."
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;