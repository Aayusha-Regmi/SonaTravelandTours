import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Protected Route component
import ProtectedRoute from './components/ProtectedRoute';
import PlaceholderPage from './components/PlaceholderPage';

// Import page components
import HomePage from './pages/Home/Home';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import PhoneSignupPage from './pages/Auth/PhoneSignupPage';
import OTPVerificationPage from './pages/Auth/OTPVerificationPage';
import PaymentPage from './pages/Payment/PaymentPage';
import PaymentCallback from './pages/PaymentCallback';
import PassengerDetail from './pages/BookingPassengerDetails/PassengerDetail';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/AboutUs/AboutUs';
import BusRoutes from './pages/BusRoutes/BusRoutes';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import FAQs from './pages/FAQs/FAQs';
import Testimonials from './pages/Testimonials/Testimonials';
import UserProfile from './pages/UserProfile/UserProfile';
import TrendingOffers from './pages/TrendingOffers/TrendingOffers';
import VisitCounters from './pages/VisitCounters/VisitCounters';
import AuthTestPage from './pages/AuthTestPage';
import MyBookings from './pages/UserProfile/ComponentUserProfile/MyBookings';
import LiveTrack from './pages/LiveTrack/LiveTrack';
import TravelInsurance from './pages/TravelInsurance/TravelInsurance';
import HotelsPage from './pages/Hotels/HotelsPage';
import ToursPage from './pages/Tours/ToursPage';
import Feed from './pages/Feed/Feed';



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/bus-routes" element={<BusRoutes />} />
      <Route path="/hotels" element={<HotelsPage />} />
      <Route path="/tours" element={<ToursPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/visit-counters" element={<VisitCounters />} />

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<PhoneSignupPage />} />
      <Route path="/signup/complete" element={<SignupPage />} />
      <Route path="/otp-verification" element={<OTPVerificationPage />} />
      
      {/* Auth Testing Route - Available in Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <Route path="/auth-test" element={<AuthTestPage />} />
      )}

      {/* Protected Routes - Require Authentication */}
      <Route 
        path="/search-results" 
        element={
          <ProtectedRoute>
            <SearchResultsPage />
          </ProtectedRoute>
        }        />
      <Route 
        path="/passenger-detail" 
        element={
          <ProtectedRoute>
            <PassengerDetail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/payment" 
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        } 
      />

      {/* Payment callback route for NPS gateway return */}
      <Route 
        path="/payment/callback" 
        element={<PaymentCallback />} 
      />
      
      <Route 
        path="/bookings" 
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/live-track" 
        element={
          <ProtectedRoute>
            <LiveTrack />
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
        element={<TravelInsurance />} 
      /> 
      {/* User Profile Routes */}
      <Route 
        path="/user-profile" 
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } 
      />
      <Route path="/trending-offers" element={<TrendingOffers />} />

    </Routes>
  );
};

export default AppRoutes;