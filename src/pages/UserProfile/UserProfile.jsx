import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Tabs from '../../components/ui/Tabs';
import ProfileHeader from './ComponentUserProfile/ProfileHeader.jsx';
import MyAccount from './ComponentUserProfile/MyAccount.jsx';
import MyBookings from './ComponentUserProfile/MyBookings.jsx';
import Cancellations from './ComponentUserProfile/Cancellations.jsx';
import MyReviews from './ComponentUserProfile/MyReviews.jsx';
import MyFavorites from './ComponentUserProfile/MyFavorites.jsx';
import Discounts from './ComponentUserProfile/Discounts.jsx';

const UserProfile = () => {
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: 'Tom Brown',
    gender: 'Male',
    phoneNumber: '+977',
    email: 'Tombrown@gmail.com',
    cityOfResidence: 'Nepal',
    password: '••••••••',
    billingAddress: 'Flat No. 302, Sapphire Towers, Sector 15, Beach Road, Mumbai, Maharashtra - 400703'
  });

  // Edit states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);

  // Sample data for components (in real app, this would come from API)
  const [bookings] = useState([
    // Add sample bookings here if needed
    // { id: 'BK001', destination: 'Paris, France', dates: 'Dec 15-22, 2024', guests: 2, status: 'confirmed' }
  ]);

  const [cancellations] = useState([
    // Add sample cancellations here if needed
  ]);

  const [reviews] = useState([
    // Add sample reviews here if needed
  ]);

  const [favorites] = useState([
    // Add sample favorites here if needed
  ]);

  const [discounts] = useState([
    // Add sample discounts here if needed
  ]);

  // Event handlers
  const handleProfileEdit = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleSecurityEdit = () => {
    setIsEditingSecurity(!isEditingSecurity);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileImageEdit = () => {
    // Handle profile image edit
    console.log('Profile image edit clicked');
  };

  // Tab configuration
  const tabsData = [
    {
      label: 'My Account',
      content: (
        <MyAccount
          profileData={profileData}
          isEditingProfile={isEditingProfile}
          isEditingSecurity={isEditingSecurity}
          onProfileEdit={handleProfileEdit}
          onSecurityEdit={handleSecurityEdit}
          onInputChange={handleInputChange}
        />
      )
    },
    {
      label: 'My Bookings',
      content: <MyBookings bookings={bookings} />
    },
    {
      label: 'Cancellations',
      content: <Cancellations cancellations={cancellations} />
    },
    {
      label: 'My Reviews',
      content: <MyReviews reviews={reviews} />
    },
    {
      label: 'My Favorites',
      content: <MyFavorites favorites={favorites} />
    },
    {
      label: 'Discounts',
      content: <Discounts discounts={discounts} />
    }
  ];  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        {/* Profile Header */}
        <ProfileHeader
          name="Amit Patel"
          email="AmitPatel@gmail.com"
          joinDate="Mar 2022"
          bookingCount={50}
          onProfileImageEdit={handleProfileImageEdit}
        />

        {/* Tabs Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Tabs 
            tabs={tabsData}
            defaultActiveTab={0}
            className="w-full"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;