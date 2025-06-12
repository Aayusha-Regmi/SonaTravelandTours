import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import UserProfilePage from './pages/UserProfile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserProfilePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;