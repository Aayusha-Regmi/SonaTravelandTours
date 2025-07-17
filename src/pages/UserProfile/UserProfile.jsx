import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Tabs from '../../components/ui/Tabs';
import ProfileImageHeader from './ComponentUserProfile/ProfileImageHeader';
import MyAccount from './ComponentUserProfile/MyAccount.jsx';
import MyBookings from './ComponentUserProfile/MyBookings.jsx';
import Cancellations from './ComponentUserProfile/Cancellations.jsx';
import MyReviews from './ComponentUserProfile/MyReviews.jsx';
import MyFavorites from './ComponentUserProfile/MyFavorites.jsx';
import Discounts from './ComponentUserProfile/Discounts.jsx';
import FloatingActionBar from '../Home/ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const UserProfile = () => {
  const location = useLocation();
  const { handleSocialClick } = useSocialActions();
  
  // Tab configuration
  const tabsData = [
    {
      label: 'My Account',
      content: <MyAccount />
    },
    {
      label: 'My Bookings',
      content: <MyBookings />
    },
    {
      label: 'Cancellations',
      content: <Cancellations />
    },
    {
      label: 'My Reviews',
      content: <MyReviews />
    },
    {
      label: 'My Favorites',
      content: <MyFavorites />
    },
    {
      label: 'Discounts',
      content: <Discounts />
    }
  ];

  // Get default active tab from URL parameter
  const getDefaultActiveTab = () => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    
    if (tabParam === 'mybookings') {
      return 1; // My Bookings tab index
    }
    return 0; // Default to My Account
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Profile Image Header - Always visible above tabs */}
        <ProfileImageHeader />
        
        {/* Tabs Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs 
            tabs={tabsData}
            defaultActiveTab={getDefaultActiveTab()}
            className="w-full"
          />
        </div>
      </main>

      <Footer />
      <FloatingActionBar handleSocialClick={handleSocialClick} />
    </div>
  );
};

export default UserProfile;