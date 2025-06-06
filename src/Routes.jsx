import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home/Home';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;