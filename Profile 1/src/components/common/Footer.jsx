import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#ececec] w-full">
      <div className="max-w-[1440px] mx-auto px-[75px] py-[68px]">
        <div className="grid grid-cols-4 gap-8">
          {/* Company Logo and Contact */}
          <div className="col-span-1">
            <img
              src="/images/img_logo_with_name_png_2.png"
              alt="SONA Travel Logo"
              className="w-[145px] h-[182px] mb-8"
            />
            <div className="space-y-4">
              <p className="text-[16px] font-semibold leading-[22px] text-center text-[#3d3d3d] font-opensans">
                info@sonatraveltours.com
              </p>
              <div className="text-center">
                <span className="text-[16px] font-semibold leading-[24px] text-[#3d3d3d] font-opensans">
                  (+977)9845122260
                </span>
                <span className="text-[16px] font-semibold leading-[22px] text-[#0a639d] font-opensans">
                  {' '}
                </span>
                <span className="text-[16px] font-semibold leading-[24px] text-[#3d3d3d] font-opensans">
                  (+977)9845230101
                </span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mt-8">
              <img src="/images/img_group.png" alt="social" className="w-[24px] h-[24px]" />
              <img src="/images/img_icbaselinetiktok.svg" alt="tiktok" className="w-[24px] h-[24px]" />
              <img src="/images/img_group_blue_800.svg" alt="social" className="w-[24px] h-[24px]" />
              <img src="/images/img_icomoonfreebehance2.svg" alt="behance" className="w-[24px] h-[24px]" />
              <img src="/images/img_group_blue_500.svg" alt="social" className="w-[24px] h-[24px]" />
              <img src="/images/img_logosfacebook.svg" alt="facebook" className="w-[24px] h-[24px]" />
            </div>
          </div>

          {/* Information Section */}
          <div className="col-span-1">
            <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] mb-6 font-opensans">
              Information
            </h3>
            <div className="space-y-4">
              <Link to="/terms" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Privacy Policy
              </Link>
              <Link to="/contact" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Contact Us
              </Link>
              <Link to="/about" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                About Us
              </Link>
              <Link to="/testimonials" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Testimonials
              </Link>
              <Link to="/faqs" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                FAQs
              </Link>
            </div>
          </div>

          {/* Transportation Section */}
          <div className="col-span-1">
            <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] mb-6 font-opensans">
              Transportation
            </h3>
            <div className="space-y-4">
              <Link to="/my-bookings" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                My Bookings
              </Link>
              <Link to="/bus-routes" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Bus Routes
              </Link>
              <Link to="/travel-insurance" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Travel Insurance
              </Link>
              <Link to="/live-track" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Live Track
              </Link>
            </div>
          </div>

          {/* Hotel & Tours Section */}
          <div className="col-span-1">
            <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] mb-6 font-opensans">
              Hotel & Tours
            </h3>
            <div className="space-y-4">
              <Link to="/hotels" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
                Hotels
              </Link>
              <Link to="/tours" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] hover:text-[#0a639d] transition-colors font-opensans">
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