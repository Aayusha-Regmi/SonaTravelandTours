import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Tabs from '../../components/ui/Tabs';

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'Tom Brown',
    gender: 'Male',
    phoneNumber: '+91',
    email: 'Tombrown@gmail.com',
    cityOfResidence: 'Nepal',
    password: '••••••••',
    billingAddress: 'Flat No. 302, Sapphire Towers, Sector 15, Beach Road, Mumbai, Maharashtra - 400703'
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);

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

  const AccountContent = () => (
    <div className="space-y-8">
      {/* Account Section */}
      <div className="bg-white rounded-[16px] p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[24px] font-bold leading-[33px] text-[#3d3d3d] font-opensans">
            Account
          </h2>
          <Button
            variant="edit"
            onClick={handleProfileEdit}
            icon={<img src="/images/img_edit_light_blue_900.svg" alt="edit" className="w-[28px] h-[28px]" />}
            className="text-[20px] font-bold leading-[28px]"
          >
            Edit Profile Info
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InputField
            label="Full Name"
            value={profileData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            disabled={!isEditingProfile}
            className="w-full"
          />
          
          <div className="flex flex-col space-y-2">
            <label className="text-[20px] font-bold leading-[28px] text-[#5f5f5f] font-opensans">
              Gender
            </label>
            <div className="bg-[#f5f5f5] rounded-[12px] h-[80px] flex items-center justify-between px-4">
              <span className="text-[18px] font-semibold leading-[24px] text-[#d9d9d9] font-opensans">
                {profileData.gender}
              </span>
              <img
                src="/images/img_hicon_linear_down_2_gray_500.svg"
                alt="dropdown"
                className="w-[24px] h-[24px]"
              />
            </div>
          </div>

          <InputField
            label="Phone Number"
            value={profileData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            disabled={!isEditingProfile}
            className="w-full"
          />

          <InputField
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!isEditingProfile}
            className="w-full"
          />

          <InputField
            label="City of Residence"
            value={profileData.cityOfResidence}
            onChange={(e) => handleInputChange('cityOfResidence', e.target.value)}
            disabled={!isEditingProfile}
            className="w-full col-span-2"
          />
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-[16px] p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[24px] font-bold leading-[33px] text-[#3d3d3d] font-opensans">
            Security
          </h2>
          <Button
            variant="edit"
            onClick={handleSecurityEdit}
            icon={<img src="/images/img_edit_light_blue_900.svg" alt="edit" className="w-[28px] h-[28px]" />}
            className="text-[20px] font-bold leading-[28px]"
          >
            Edit Security Info
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <InputField
            label="Password"
            type="password"
            value={profileData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            disabled={!isEditingSecurity}
            showPasswordToggle={true}
            icon={<img src="/images/img_frame_1000005294.svg" alt="password" className="w-[124px] h-[12px]" />}
            className="w-full"
          />

          <div className="flex flex-col space-y-2">
            <label className="text-[20px] font-bold leading-[28px] text-[#5f5f5f] font-opensans">
              Billing Address
            </label>
            <div className="bg-[#f5f5f5] rounded-[12px] h-[80px] flex items-center px-4">
              <span className="text-[12px] font-semibold leading-[17px] text-[#8f8f8f] font-opensans">
                {profileData.billingAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabsData = [
    {
      label: 'My Account',
      content: <AccountContent />
    },
    {
      label: 'My Bookings',
      content: <div className="p-8 text-center text-[#8f8f8f] font-opensans">My Bookings content coming soon...</div>
    },
    {
      label: 'Cancellations',
      content: <div className="p-8 text-center text-[#8f8f8f] font-opensans">Cancellations content coming soon...</div>
    },
    {
      label: 'My Reviews',
      content: <div className="p-8 text-center text-[#8f8f8f] font-opensans">My Reviews content coming soon...</div>
    },
    {
      label: 'My Favorites',
      content: <div className="p-8 text-center text-[#8f8f8f] font-opensans">My Favorites content coming soon...</div>
    },
    {
      label: 'Discounts',
      content: <div className="p-8 text-center text-[#8f8f8f] font-opensans">Discounts content coming soon...</div>
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-[75px] py-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          {/* Profile Picture */}
          <div className="relative mb-6">
            <div className="w-[234px] h-[234px] rounded-full border-4 border-[#d25555] p-[13px]">
              <img
                src="/images/img_ellipse_184_209x209.png"
                alt="Amit Patel"
                className="w-[209px] h-[209px] rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-[54px] h-[54px] bg-[#d25555] rounded-full flex items-center justify-center">
                <img
                  src="/images/img_edit.svg"
                  alt="edit profile"
                  className="w-[32px] h-[32px]"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <h1 className="text-[28px] font-bold leading-[39px] text-[#5f5f5f] mb-2 font-opensans">
            Amit Patel
          </h1>
          <p className="text-[20px] font-semibold leading-[28px] text-[#8f8f8f] mb-6 font-opensans">
            AmitPatel@gmail.com
          </p>

          {/* Stats Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="primary"
              className="w-[223px] h-[60px]"
              icon={<img src="/images/img_hicon_outline_profile_accepted_2.svg" alt="joined" className="w-[24px] h-[24px]" />}
            >
              Joined Mar 2022
            </Button>
            <Button
              variant="primary"
              className="w-[174px] h-[60px]"
              icon={<img src="/images/img_hicon_outline_bookmark_3.svg" alt="bookings" className="w-[24px] h-[24px]" />}
            >
              50 Booking
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full">
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