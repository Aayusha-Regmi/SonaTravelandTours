import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#ececec] h-[526px] flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-[127px] py-[68px]">
        <div className="grid grid-cols-4 gap-8">
          {/* Company Logo and Contact */}
          <div className="flex flex-col items-center">
            <img 
              src="/images/img_logo_with_name_png_2.png" 
              alt="SONA Travel Logo" 
              className="h-[182px] w-[145px] mb-8"
            />
            <div className="text-center space-y-4">
              <p className="text-[16px] font-semibold text-[#3d3d3d] font-opensans">
                info@sonatraveltours.com
              </p>              <div className="text-[16px] font-semibold font-opensans">
                <span className="text-[#3d3d3d]">(+977) 9802353260</span>
                <span className="text-[#0a639d]"> </span>
                <span className="text-[#3d3d3d]">(+977) 9802374215</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-8">
              <img src="/images/img_group.png" alt="Social" className="w-[24px] h-[24px]" />
              <img src="/images/img_icbaselinetiktok.svg" alt="TikTok" className="w-[24px] h-[24px]" />
              <img src="/images/img_group_blue_800.svg" alt="LinkedIn" className="w-[24px] h-[24px]" />
              <img src="/images/img_icomoonfreebehance2.svg" alt="Behance" className="w-[24px] h-[24px]" />
              <img src="/images/img_group_blue_500.svg" alt="Twitter" className="w-[24px] h-[24px]" />
              <img src="/images/img_logosfacebook.svg" alt="Facebook" className="w-[24px] h-[24px]" />
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-[28px] font-bold text-[#3d3d3d] mb-6 font-opensans">
              Information
            </h3>
            <div className="space-y-4">
              <Link to="/terms" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Privacy Policy
              </Link>
              <Link to="/contact" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Contact Us
              </Link>
              <Link to="/about" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                About Us
              </Link>
              <Link to="/testimonials" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Testimonials
              </Link>
              <Link to="/faqs" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                FAQs
              </Link>
            </div>
          </div>

          {/* Transportation Section */}
          <div>
            <h3 className="text-[28px] font-bold text-[#3d3d3d] mb-6 font-opensans">
              Transportation
            </h3>
            <div className="space-y-4">
              <Link to="/my-bookings" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                My Bookings
              </Link>
              <Link to="/bus-routes" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Bus Routes
              </Link>
              <Link to="/travel-insurance" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Travel Insurance
              </Link>
              <Link to="/live-track" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Live Track
              </Link>
            </div>
          </div>

          {/* Hotel & Tours Section */}
          <div>
            <h3 className="text-[28px] font-bold text-[#3d3d3d] mb-6 font-opensans">
              Hotel & Tours
            </h3>
            <div className="space-y-4">
              <Link to="/hotels" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Hotels
              </Link>
              <Link to="/tours" className="block text-[18px] font-semibold text-[#5f5f5f] hover:text-[#0a639d] font-opensans">
                Tours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;