import React from 'react';
import Button from '@/components/ui/Button';

const HeroSection = () => {  return (
    <section className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/img_busroadgenerativeai22087319731_1.png" 
          alt="Bus on Road" 
          className="w-full h-full object-cover"
        />
        {/* Enhanced overlay with gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/5"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40 pt-8 md:pt-12">
        <div className="max-w-xl relative">          <h1 className="mb-3 md:mb-4">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#3d3d3d] font-['Open_Sans'] block">
              The Easiest Way to Book your 
            </span>
            <span className="text-xl sm:text-2xl md:text-2xl lg:text-[26px] font-bold text-[#3d3d3d] font-['Oleo_Script']">
              Bus Ticket
            </span>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-semibold text-[#3d3d3d] font-['Open_Sans']"> with</span>
          </h1>
          
          <div className="mb-4">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-[#ff8f1f] font-['Oleo_Script'] leading-tight">Sona</span>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-[#0a639d] font-['Oleo_Script'] leading-tight"> Travel</span>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-[#0a639d] font-['Oleo_Script'] leading-tight">&amp; Tours</div>
          </div>{/* Tab Buttons positioned for the search card */}
          <div className="absolute right-0 ml-40px bottom-0 transform translate-y-20 z-40">
            <div className="flex space-x-1 sm:space-x-2">
              <Button 
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#0a639d] flex items-center justify-center shadow-md hover:bg-[#07456e] transition-colors"
              >
                <span className="text-sm sm:text-base font-medium text-white">Bus</span>
              </Button>
              <Button 
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#ececec] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                variant="secondary"
              >
                <span className="text-sm sm:text-base font-medium text-[#b0b0b0]">Flight</span>
              </Button>
              <Button 
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#ececec] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                variant="secondary"
              >
                <span className="text-sm sm:text-base font-medium text-[#b0b0b0]">Hotel</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;