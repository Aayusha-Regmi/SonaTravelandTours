import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home/Home';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import OTPVerificationPage from './pages/Auth/OTPVerificationPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;