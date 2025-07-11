import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top on actual route changes, not on initial load or same-page navigation
    // Small delay to ensure page transition is complete
    const scrollTimer = setTimeout(() => {
      // Only scroll if we're not already at the top to prevent unnecessary scrolling
      if (window.scrollY > 0) {
        window.scrollTo({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [pathname]);

  return null;
}
