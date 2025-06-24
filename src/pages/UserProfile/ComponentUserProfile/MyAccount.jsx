import React from 'react';
import Button from '../../../components/ui/Button';

const MyAccount = ({ 
  profileData,
  isEditingProfile,
  isEditingSecurity,
  onProfileEdit,
  onSecurityEdit,
  onInputChange 
}) => {  return (
    <div className="space-y-4">
      {/* Account Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 font-opensans">
            Account Information
          </h2>
          <Button
            variant={isEditingProfile ? "secondary" : "edit"}
            onClick={onProfileEdit}
            icon={<img src="/images/img_edit_light_blue_900.svg" alt="edit" className="w-4 h-4" />}
            className="text-sm h-8 px-3"
          >
            {isEditingProfile ? 'Save' : 'Edit'}
          </Button>
        </div>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Full Name
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => onInputChange('fullName', e.target.value)}
                disabled={!isEditingProfile}
                placeholder="Enter your full name"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Gender
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center justify-between px-3 border transition-all ${
              !isEditingProfile ? 'border-transparent' : 'border-gray-200 hover:border-blue-400'
            }`}>
              <span className={`text-sm font-medium font-opensans ${
                isEditingProfile ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {profileData.gender}
              </span>
              <img
                src="/images/img_hicon_linear_down_2_gray_500.svg"
                alt="dropdown"
                className="w-4 h-4"
              />
            </div>          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Phone Number
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileData.phoneNumber}
                onChange={(e) => onInputChange('phoneNumber', e.target.value)}
                disabled={!isEditingProfile}
                placeholder="Enter your phone number"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Email Address
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                disabled={!isEditingProfile}
                placeholder="Enter your email address"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5 lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              City of Residence
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingProfile 
                ? 'border-transparent bg-gray-50' 
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="text"
                value={profileData.cityOfResidence}
                onChange={(e) => onInputChange('cityOfResidence', e.target.value)}
                disabled={!isEditingProfile}
                placeholder="Enter your city of residence"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingProfile ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-lg border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-lg font-semibold text-gray-900 font-opensans">
            Security & Privacy
          </h2>
          <Button
            variant={isEditingSecurity ? "secondary" : "edit"}
            onClick={onSecurityEdit}
            icon={<img src="/images/img_edit_light_blue_900.svg" alt="edit" className="w-4 h-4" />}
            className="text-sm h-8 px-3"
          >
            {isEditingSecurity ? 'Save' : 'Edit'}
          </Button>
        </div>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Password
            </label>
            <div className={`bg-gray-50 rounded-lg h-10 flex items-center px-3 border transition-all ${
              !isEditingSecurity 
                ? 'border-transparent bg-gray-50' 
                : 'border-gray-200 hover:border-blue-400 focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-sm'
            }`}>
              <input
                type="password"
                value={profileData.password}
                onChange={(e) => onInputChange('password', e.target.value)}
                disabled={!isEditingSecurity}
                placeholder="Enter your password"
                className={`flex-1 bg-transparent text-sm font-medium placeholder-gray-400 focus:outline-none font-opensans ${
                  !isEditingSecurity ? 'text-gray-600 cursor-not-allowed' : 'text-gray-900 cursor-text'
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label className="text-sm font-medium text-gray-700 font-opensans">
              Billing Address
            </label>
            <div className={`bg-gray-50 rounded-lg min-h-[2.5rem] flex items-center px-3 border transition-all ${
              !isEditingSecurity ? 'border-transparent' : 'border-gray-200 hover:border-blue-400'
            }`}>
              <span className={`text-sm font-medium font-opensans ${
                isEditingSecurity ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {profileData.billingAddress}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
