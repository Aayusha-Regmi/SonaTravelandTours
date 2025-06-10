import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="bg-white border-b border-[#ececec] h-[110px] flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-[75px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/images/img_logo_with_name_png_1.png" 
            alt="SONA Travel Logo" 
            className="h-[48px] w-[212px]"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-[20px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Home
          </Link>
          <Link 
            to="/bookings" 
            className="text-[20px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Bookings
          </Link>
          <Link 
            to="/live-track" 
            className="text-[20px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Live Track
          </Link>
          <Link 
            to="/faqs" 
            className="text-[20px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            FAQs
          </Link>
          <div className="flex items-center space-x-2">
            <Link 
              to="/contact" 
              className="text-[20px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
            >
              Contact Us
            </Link>
            <img 
              src="/images/img_hicon_linear_down_2.svg" 
              alt="dropdown" 
              className="w-[24px] h-[24px]"
            />
          </div>
        </nav>

        {/* Sign Up Button */}
        <div className="bg-[#0a639d] rounded-[12px] h-[60px] w-[139px] flex items-center px-4">
          <img 
            src="/images/img_hicon_outline_profile_1.svg" 
            alt="profile" 
            className="w-[24px] h-[24px] mr-2"
          />
          <span className="text-[20px] font-bold text-white font-opensans">
            Sign Up
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;