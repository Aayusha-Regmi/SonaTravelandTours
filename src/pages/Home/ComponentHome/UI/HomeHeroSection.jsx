import React from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';

const HeroSection = () => {
  const handleUnavailableService = (serviceName) => {
    toast.info(`${serviceName} booking will be available soon! Stay tuned for updates.`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light"
    });
  };

  return (
    <section className="relative h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <img 
          src="/images/img_busroadgenerativeai22087319731_1.png" 
          alt="Bus on Road" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/5"></div>
      </div> */}
      <div className="absolute inset-0 z-0">
        <video
          src="/images/busrun.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover animate-fade-in"
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
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold text-[#0a639d] font-['Oleo_Script'] leading-tight">&amp; Tours</div>          </div>{/* Tab Buttons positioned for the search card */}          <div className="absolute ml-22 bottom-0 transform translate-y-20 z-50">
            <div className="flex space-x-2 ml-2 sm:space-x-2">
              <Button 
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#0a639d] flex items-center justify-center shadow-md hover:bg-[#07456e] transition-colors"
              >
                <span className="text-sm sm:text-base font-medium text-white">Bus</span>
              </Button>              <Button 
                onClick={() => handleUnavailableService('Flight')}
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#ececec] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                variant="secondary"
              >
                <span className="text-sm sm:text-base font-medium text-[#b0b0b0]">Flight</span>
              </Button>
              <Button 
                onClick={() => handleUnavailableService('Hotel')}
                className="h-[45px] sm:h-[50px] w-[80px] sm:w-[100px] rounded-lg bg-[#ececec] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                variant="secondary"
              >
                <span className="text-sm sm:text-base font-medium text-[#b0b0b0]">Hotel</span>
              </Button>
            </div>
          </div>        </div>
      </div>
    </section>
  );
};

export default HeroSection;