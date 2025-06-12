import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-[#ececec] h-[110px] w-full">
      <div className="flex items-center justify-between px-[75px] py-[31px] h-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/img_logo_with_name_png_1.png"
            alt="SONA Travel Logo"
            className="h-[48px] w-[212px]"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Home
          </Link>
          <Link
            to="/bookings"
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Bookings
          </Link>
          <Link
            to="/live-track"
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            Live Track
          </Link>
          <Link
            to="/faqs"
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
          >
            FAQs
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              to="/contact"
              className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans"
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

        {/* Profile Avatar */}
        <div className="flex-shrink-0">
          <Link to="/profile">
            <img
              src="/images/img_ellipse_184.png"
              alt="User Profile"
              className="w-[80px] h-[80px] rounded-full"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;