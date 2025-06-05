import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home/Home';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import SelectSeatsPage from './pages/SelectSeats/SelectSeatsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/select-seats/:busId" element={<SelectSeatsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;