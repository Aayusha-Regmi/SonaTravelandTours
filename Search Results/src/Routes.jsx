import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;