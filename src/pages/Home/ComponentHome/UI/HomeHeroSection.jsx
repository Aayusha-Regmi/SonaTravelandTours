import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);

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

  // const handleSocialClick = (platform) => {
  //   const links = {
  //     feeds: '/feed', // Feeds page
  //     whatsapp: 'https://wa.me/9779851234567?text=Hello! I would like to inquire about bus booking services.',
  //     routes: '/routes', // Internal route for bus routes
  //     linkedin: 'https://www.linkedin.com/company/sona-travel-tours',
  //   };
  //   if (['feeds', 'routes'].includes(platform)) {
  //     window.location.href = links[platform];
  //   } else if (platform === 'linkedin') {
  //     window.open(links[platform], '_blank');
  //   } else if (platform === 'whatsapp') {
  //     window.open(links[platform], '_blank');
  //   }
  // };

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation trigger on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">      
    {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero bg.png" 
          alt="Nepal Travel Background" 
          className="w-full h-full object-cover"        />
        
        {/* Overlay Image with Smooth Opening Effect and Enhanced Cursor Movement */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <img 
            src="/images/overlayhero.png" 
            alt="Hero Overlay" 
            className={`w-full h-full object-cover transition-all duration-1500 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
            }`}
            style={{
              transform: `
                ${isLoaded ? 'translateY(0)' : 'translateY(100%)'} 
                translateX(${(mousePosition.x - 50) * 0.15}px) 
                translateY(${isLoaded ? (mousePosition.y - 50) * 0.15 : 100}%) 
                rotateX(${(mousePosition.y - 50) * 0.05}deg) 
                rotateY(${(mousePosition.x - 50) * 0.05}deg) 
                scale(${1.02 + (mousePosition.x * 0.0003)})
              `,
              filter: `
                drop-shadow(${(mousePosition.x - 50) * 0.1}px ${(mousePosition.y - 50) * 0.1}px 15px rgba(0,0,0,0.4))
                brightness(${0.95 + (mousePosition.x * 0.001)})
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d'
            }}
          />
        </div>
          {/* Radial gradient shadow overlay */}
        <div 
          className="absolute inset-0 z-8 opacity-100"
          style={{
            background: 'radial-gradient(60.73% 52.25% at 51.42% 41.99%, rgba(0, 0, 0, 0.1) 28.65%, rgba(0, 0, 0, 0.95) 95.9%)',
            height: '100vh',
            width: '100%'
          }}
        ></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-black/40"></div>
      </div>      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">          <div className="max-w-4xl mx-auto">          {/* Service Tabs - Positioned to align with search form left corner */}          
          <div className="absolute left-4 sm:left-8 md:left-16 lg:left-24 xl:left-40 top-[95%] transform -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm md:max-w-md z-30 mt-20 mb-10">
            <div className="flex space-x-2 sm:space-x-3 justify-center">
              <Button 
                className="h-10 sm:h-12 px-3 sm:px-4 md:px-6 rounded-lg bg-[#0a639d] hover:bg-[#07456e] text-white font-medium transition-colors flex-1 text-sm sm:text-base flex items-center justify-center"
              >
                <span className="mr-1 sm:mr-2">🚌</span>Bus
              </Button>              
              <Button 
                onClick={() => handleUnavailableService('Flight')}
                className="h-10 sm:h-12 px-3 sm:px-4 md:px-6 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors flex-1 text-sm sm:text-base flex items-center justify-center"
                variant="secondary"
              >
                <span className="mr-1 sm:mr-2">✈️</span>Flight
              </Button>
              <Button 
                onClick={() => handleUnavailableService('Hotel')}
                className="h-10 sm:h-12 px-3 sm:px-4 md:px-6 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-colors flex-1 text-sm sm:text-base flex items-center justify-center"
                variant="secondary"
              >
                <span className="mr-1 sm:mr-2">🏨</span>Hotel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;