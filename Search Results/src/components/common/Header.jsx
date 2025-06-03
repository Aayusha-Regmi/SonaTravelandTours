import React from 'react';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="bg-white border-b border-[#ececec] h-[110px] flex items-center px-[75px]">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/images/img_logo_with_name_png_1.png" 
            alt="SONA Travel Logo" 
            className="h-[48px] w-[212px]"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-[40px]">
          <a 
            href="#" 
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors"
          >
            Home
          </a>
          <a 
            href="#" 
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors"
          >
            Bokings
          </a>
          <a 
            href="#" 
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors"
          >
            Live Track
          </a>
          <a 
            href="#" 
            className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors"
          >
            FAQs
          </a>
          <div className="flex items-center">
            <a 
              href="#" 
              className="text-[20px] font-semibold leading-[28px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors"
            >
              Contact Us
            </a>
            <img 
              src="/images/img_hicon_linear_down_2.svg" 
              alt="dropdown" 
              className="w-[24px] h-[24px] ml-[2px]"
            />
          </div>
        </nav>

        {/* Sign Up Button */}
        <Button 
          variant="primary"
          className="bg-[#0a639d] text-white px-[16px] py-[18px] rounded-[12px] h-[60px] w-[139px] flex items-center"
        >
          <img 
            src="/images/img_hicon_outline_profile_1.svg" 
            alt="profile" 
            className="w-[24px] h-[24px] mr-[8px]"
          />
          <span className="text-[20px] font-bold leading-[28px] font-opensans">Sign Up</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;