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
  //     linkedin: 'https://www.linkedin.com/company/sona-travel-and-tours/',
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

  // Enhanced animation trigger on component mount with preload
  useEffect(() => {
    // Preload the overlay image for smoother animation
    const img = new Image();
    img.src = "/images/overlayhero.png";
    
    img.onload = () => {
      // Start animation after image is loaded
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      return () => clearTimeout(timer);
    };
    
    // Fallback in case image doesn't load
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => clearTimeout(fallbackTimer);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">      
    {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero bg.png" 
          alt="Nepal Travel Background" 
          className="w-full h-full object-cover"        />
        
        {/* Enhanced Overlay Image with Smooth Slide-Up Animation and 3D Effects */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <img 
            src="/images/overlayhero.png" 
            alt="Hero Overlay" 
            className={`w-full h-full object-cover transition-all duration-2000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
            }`}
            style={{
              transform: `
                ${isLoaded ? 'translateY(0)' : 'translateY(100%)'} 
                translateX(${(mousePosition.x - 50) * 0.12}px) 
                translateY(${isLoaded ? (mousePosition.y - 50) * 0.12 : 100}%) 
                rotateX(${(mousePosition.y - 50) * 0.03}deg) 
                rotateY(${(mousePosition.x - 50) * 0.03}deg) 
                scale(${1.01 + (mousePosition.x * 0.0002)})
              `,
              filter: `
                drop-shadow(${(mousePosition.x - 50) * 0.08}px ${(mousePosition.y - 50) * 0.08}px 12px rgba(0,0,0,0.3))
                brightness(${0.96 + (mousePosition.x * 0.0008)})
                blur(${isLoaded ? 0 : 2}px)
              `,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
              transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 2s ease-out, opacity 2s ease-out'
            }}
            onLoad={() => {
              // Additional smooth effect when image loads
              const img = document.querySelector('[alt="Hero Overlay"]');
              if (img) {
                img.style.transition = 'all 2.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
              }
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
      </div>      
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">          
        <div className="max-w-4xl mx-auto">         
          {/* Service Tabs - Mobile: Centered before One Way/Two Way, Desktop: Positioned near search form */}          
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[92%] sm:left-4 sm:transform-none md:left-4 lg:left-4 xl:left-8 lg:top-[88%] xl:top-[85%] sm:translate-y-0 lg:transform lg:-translate-y-1/2 bg-white/15 backdrop-blur-lg rounded-xl sm:rounded-t-xl sm:rounded-b-none lg:rounded-xl p-3 sm:p-4 md:p-5 lg:p-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm z-30 shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-white/30">
            <div className="flex space-x-2 sm:space-x-3 lg:space-x-2 justify-center">
              <Button 
                className="h-10 sm:h-12 lg:h-10 px-3 sm:px-4 md:px-6 lg:px-4 rounded-xl sm:rounded-t-xl sm:rounded-b-none lg:rounded-xl bg-[#0a639d] hover:bg-[#07456e] text-white font-medium transition-colors flex-1 text-sm sm:text-base lg:text-sm flex items-center justify-center"
              >
                <span className="mr-1 sm:mr-2 lg:mr-1">🚌</span>Bus
              </Button>              
              <Button 
                onClick={() => handleUnavailableService('Flight')}
                className="h-10 sm:h-12 lg:h-10 px-3 sm:px-4 md:px-6 lg:px-4 rounded-xl sm:rounded-t-xl sm:rounded-b-none lg:rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium transition-colors flex-1 text-sm sm:text-base lg:text-sm flex items-center justify-center"
                variant="secondary"
              >
                <span className="mr-1 sm:mr-2 lg:mr-1">✈️</span>Flight
              </Button>
              <Button 
                onClick={() => handleUnavailableService('Hotel')}
                className="h-10 sm:h-12 lg:h-10 px-3 sm:px-4 md:px-6 lg:px-4 rounded-xl sm:rounded-t-xl sm:rounded-b-none lg:rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium transition-colors flex-1 text-sm sm:text-base lg:text-sm flex items-center justify-center"
                variant="secondary"
              >
                <span className="mr-1 sm:mr-2 lg:mr-1">🏨</span>Hotel
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