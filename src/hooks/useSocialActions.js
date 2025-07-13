import { useNavigate } from 'react-router-dom';

export const useSocialActions = () => {
  const navigate = useNavigate();

  const handleSocialClick = (action) => {
    switch (action) {
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

  return { handleSocialClick };
};
