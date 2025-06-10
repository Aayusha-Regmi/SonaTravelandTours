import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };  return (
    <header className="backdrop-blur-md bg-white/80 border-b border-[#ececec]/60 h-[80px] w-full fixed top-0 left-0 right-0 shadow-md z-50 after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/10 after:to-white/20 after:z-[-1]">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        {/* Decorative blobs for enhanced glass morphism effect */}
        <div className="absolute -top-10 -left-20 w-48 h-48 rounded-full bg-[#ff8f1f]/15 blur-3xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-[#0a639d]/15 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute -bottom-10 left-1/3 w-32 h-32 rounded-full bg-[#ff8f1f]/10 blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        
        <div className="flex items-center relative z-10">
          <Link to="/">
            <img 
              src="/images/img_logo_with_name_png_1.png" 
              alt="Sona Travel & Tours Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>        {/* Desktop Navigation */}        <nav className="hidden md:flex items-center space-x-7 relative z-10">
          <Link to="/" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Home
          </Link>
          <Link to="/bookings" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Bookings
          </Link>
          <Link to="/live-track" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            Live Track
          </Link>          <Link to="/faqs" className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors">
            FAQs
          </Link>
          <div className="relative group">
            <div className="flex items-center cursor-pointer text-base font-medium text-[#5f5f5f] hover:text-[#0a639d] transition-colors">
              Contact Us
              <img 
                src="/images/img_hicon_linear_down_2_gray_700.svg" 
                alt="Down Arrow" 
                className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
              />
            </div>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
              <Link to="/about-us" className="block px-4 py-2 text-sm text-[#5f5f5f] hover:bg-[#0a639d]/10 hover:text-[#0a639d]">
                About Us
              </Link>
              <Link to="/testimonials" className="block px-4 py-2 text-sm text-[#5f5f5f] hover:bg-[#0a639d]/10 hover:text-[#0a639d]">
                Testimonials
              </Link>
            </div>
          </div>
        </nav>        <div className="hidden md:flex items-center space-x-3">
          <Link 
            to="/login"
            className="text-[#5f5f5f] text-base font-medium hover:text-[#0a639d] transition-colors px-3 py-2"
          >
            Login
          </Link>
          <Link to="/signup">
            <Button 
              variant="primary" 
              className="bg-[#0a639d] rounded-lg h-[45px] px-4 flex items-center hover:bg-[#07456e] transition-colors"
            >
              <img 
                src="/images/img_hicon_outline_profile_1.svg" 
                alt="Profile Icon" 
                className="w-5 h-5 mr-2"
              />
              <span className="text-lg font-bold">Sign Up</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[80px] left-0 right-0 bg-white/90 backdrop-blur-md py-6 px-5 shadow-lg border-b border-[#ececec]/60 z-50 max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col space-y-5">
            <Link 
              to="/" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/bookings" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Bookings
            </Link>
            <Link 
              to="/live-track" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Track
            </Link>
            <Link 
              to="/faqs" 
              className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            
            {/* Contact Us Dropdown for Mobile */}
            <div className="py-2 space-y-3 pl-2 border-l-2 border-[#ececec]">
              <div className="text-[#5f5f5f] text-base sm:text-lg font-medium">
                Contact Us
              </div>
              <Link 
                to="/about-us" 
                className="block text-sm sm:text-base text-[#5f5f5f] hover:text-[#0a639d] pl-3"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/testimonials" 
                className="block text-sm sm:text-base text-[#5f5f5f] hover:text-[#0a639d] pl-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>            </div>
            
            {/* Authentication options for Mobile */}
            <div className="space-y-3 pt-4 border-t border-[#ececec]/60">
              <Link 
                to="/login" 
                className="text-[#5f5f5f] text-base sm:text-lg font-medium hover:text-[#0a639d] transition-colors block"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button 
                  variant="primary" 
                  className="bg-[#0a639d] rounded-lg h-[50px] w-full flex items-center justify-center hover:bg-[#07456e] transition-colors"
                >
                  <img 
                    src="/images/img_hicon_outline_profile_1.svg" 
                    alt="Profile Icon" 
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-base sm:text-lg font-bold">Sign Up</span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;