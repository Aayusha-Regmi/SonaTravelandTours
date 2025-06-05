import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import page components
import BusSeatSelectionPage from './pages/BusSeatSelection';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/bus-booking/seat-selection" replace />} />
        <Route path="/bus-booking/seat-selection" element={<BusSeatSelectionPage />} />
        {/* Add catch-all route for undefined paths */}
        <Route path="*" element={<Navigate to="/bus-booking/seat-selection" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;