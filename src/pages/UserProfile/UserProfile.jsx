import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Tabs from '../../components/ui/Tabs';
import MyAccount from './ComponentUserProfile/MyAccount.jsx';
import MyBookings from './ComponentUserProfile/MyBookings.jsx';
import Cancellations from './ComponentUserProfile/Cancellations.jsx';
import MyReviews from './ComponentUserProfile/MyReviews.jsx';
import MyFavorites from './ComponentUserProfile/MyFavorites.jsx';
import Discounts from './ComponentUserProfile/Discounts.jsx';

const UserProfile = () => {
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
  ];  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Tabs Section - Profile header is now included in MyBookings component */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs 
            tabs={tabsData}
            defaultActiveTab={1}
            className="w-full"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;