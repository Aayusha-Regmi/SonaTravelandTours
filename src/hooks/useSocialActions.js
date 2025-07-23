import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSocialActions = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSocialClick = (action) => {
    switch (action) {
      case 'home':
        // Navigate to home page
        navigate('/');
        break;
      case 'feeds':
        // Navigate to feeds page
        navigate('/feed');
        break;
      case 'whatsapp':
        // Open WhatsApp with predefined message - updated number
        const whatsappMessage = encodeURIComponent('Hello! I need assistance with bus booking.');
        window.open(`https://wa.me/9779802374215?text=${whatsappMessage}`, '_blank');
        break;
      case 'routes':
        // Navigate to bus routes page
        navigate('/bus-routes');
        break;
      case 'call':
        // This is handled directly by the anchor tag with tel: link
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Auto-hide functionality for mobile navigation
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Show navbar when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setIsVisible(true);
        } else {
          // Hide navbar when scrolling down (only after scrolling past 100px)
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      
      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return { 
    isVisible, 
    socialActions: { handleSocialClick }
  };
};
