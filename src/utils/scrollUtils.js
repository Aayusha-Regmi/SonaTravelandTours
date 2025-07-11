// Mobile scroll behavior utilities
export const fixMobileScrolling = () => {
  // Prevent auto-scroll on mobile when scrolling up
  let lastScrollTop = 0;
  let isScrolling = false;
  let scrollTimeout;

  const handleScroll = () => {
    if (isScrolling) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Prevent automatic scroll down when user is trying to scroll up
    if (scrollTop < lastScrollTop) {
      // User is scrolling up
      clearTimeout(scrollTimeout);
      isScrolling = true;
      
      // Reset the flag after a short delay
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  };

  // Add smooth scroll behavior to all links
  const smoothScrollToAnchor = (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      const targetId = target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Apply event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  document.addEventListener('click', smoothScrollToAnchor);

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', smoothScrollToAnchor);
    clearTimeout(scrollTimeout);
  };
};

// Force smooth scrolling for all scroll operations
export const enableSmoothScrolling = () => {
  // Override scrollTo method to ensure smooth behavior
  const originalScrollTo = window.scrollTo;
  window.scrollTo = function(options) {
    if (typeof options === 'object') {
      originalScrollTo.call(this, {
        ...options,
        behavior: options.behavior || 'smooth'
      });
    } else {
      originalScrollTo.call(this, {
        top: arguments[1] || 0,
        left: arguments[0] || 0,
        behavior: 'smooth'
      });
    }
  };

  // Override scrollIntoView for elements
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function(options) {
    if (typeof options === 'object') {
      originalScrollIntoView.call(this, {
        ...options,
        behavior: options.behavior || 'smooth'
      });
    } else {
      originalScrollIntoView.call(this, {
        behavior: 'smooth',
        block: options || 'start'
      });
    }
  };
};

// Initialize all scroll fixes
export const initScrollFixes = () => {
  // Enable smooth scrolling
  enableSmoothScrolling();
  
  // Fix mobile scrolling issues
  const cleanup = fixMobileScrolling();
  
  // Add CSS for smooth scrolling if not already present
  if (!document.querySelector('#smooth-scroll-style')) {
    const style = document.createElement('style');
    style.id = 'smooth-scroll-style';
    style.textContent = `
      html {
        scroll-behavior: smooth !important;
      }
      
      * {
        scroll-behavior: smooth !important;
      }
      
      @media (max-width: 768px) {
        html, body {
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  return cleanup;
};
