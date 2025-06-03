import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#ececec] h-[526px] px-[127px] py-[68px]">
      <div className="flex justify-between">
        {/* Logo and Contact Section */}
        <div className="flex flex-col">
          <img 
            src="/images/img_logo_with_name_png_2.png" 
            alt="SONA Travel Logo" 
            className="w-[145px] h-[182px] mb-[67px]"
          />
          
          <div className="space-y-[42px]">
            <p className="text-[16px] font-semibold leading-[22px] text-center text-[#3d3d3d] font-opensans">
              info@sonatraveltours.com
            </p>
            
            <div className="text-[16px] font-semibold leading-[22px] text-center font-opensans">
              <span className="text-[#3d3d3d]">(+977)9845122260</span>
              <span className="text-[#0a639d]"> </span>
              <span className="text-[#3d3d3d]">(+977)9845230101</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-[44px] mt-[48px]">
            <img src="/images/img_group.png" alt="social" className="w-[24px] h-[24px]" />
            <img src="/images/img_icbaselinetiktok.svg" alt="tiktok" className="w-[24px] h-[24px]" />
            <img src="/images/img_group_blue_800.svg" alt="social" className="w-[24px] h-[24px]" />
            <img src="/images/img_icomoonfreebehance2.svg" alt="behance" className="w-[24px] h-[24px]" />
            <img src="/images/img_group_blue_500.svg" alt="social" className="w-[24px] h-[24px]" />
            <img src="/images/img_logosfacebook.svg" alt="facebook" className="w-[24px] h-[24px]" />
          </div>
        </div>

        {/* Information Section */}
        <div className="flex flex-col">
          <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] font-opensans mb-[29px]">
            Information
          </h3>
          <div className="space-y-[49px]">
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Contact Us
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              About Us
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Testimonials
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              FAQs
            </a>
          </div>
        </div>

        {/* Transportation Section */}
        <div className="flex flex-col">
          <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] font-opensans mb-[25px]">
            Transportation
          </h3>
          <div className="space-y-[49px]">
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              My Bookings
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Bus Routes
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Travel Insurance
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Live Track
            </a>
          </div>
        </div>

        {/* Hotel & Tours Section */}
        <div className="flex flex-col">
          <h3 className="text-[28px] font-bold leading-[39px] text-[#3d3d3d] font-opensans mb-[28px]">
            Hotel & Tours
          </h3>
          <div className="space-y-[49px]">
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Hotels
            </a>
            <a href="#" className="block text-[18px] font-semibold leading-[25px] text-[#5f5f5f] font-opensans hover:text-[#0a639d] transition-colors">
              Tours
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;