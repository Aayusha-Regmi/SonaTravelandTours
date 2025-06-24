import React from 'react';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ 
  profileImage = "/images/img_ellipse_184_209x209.png",
  name = "Amit Patel",
  email = "AmitPatel@gmail.com",
  joinDate = "Mar 2022",
  bookingCount = 50,
  onProfileImageEdit 
}) => {  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-2 border-[#d25555] p-0.5">
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full rounded-full object-cover"
            />
            <div 
              className="absolute -bottom-1 -right-1 w-6 h-6 lg:w-7 lg:h-7 bg-[#d25555] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#b94545] transition-all duration-200 shadow-md"
              onClick={onProfileImageEdit}
            >
              <img
                src="/images/img_edit.svg"
                alt="edit profile"
                className="w-3 h-3 lg:w-3.5 lg:h-3.5"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-2">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 font-opensans">
            {name}
          </h1>
          <p className="text-sm text-gray-600 font-opensans">
            {email}
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              <img src="/images/img_hicon_outline_profile_accepted_2.svg" alt="joined" className="w-3.5 h-3.5" />
              Joined {joinDate}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              <img src="/images/img_hicon_outline_bookmark_3.svg" alt="bookings" className="w-3.5 h-3.5" />
              {bookingCount} Bookings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
