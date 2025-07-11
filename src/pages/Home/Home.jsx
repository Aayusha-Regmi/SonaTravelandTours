import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './ComponentHome/UI/HomeHeroSection';
import SearchForm from './ComponentHome/SearchForm';
import NowBookingSection from './ComponentHome/NowBookingSection';
import BookingSteps from './ComponentHome/BookingSteps';
import UnifiedSections from './ComponentHome/UnifiedSections';
import AppPromotion from './ComponentHome/AppPromotion';
import PaymentMethods from './ComponentHome/PaymentMethods';
import FloatingActionBar from './ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const HomePage = () => {
  const { handleSocialClick } = useSocialActions();

  // Prevent unwanted auto-scrolling on mobile devices
  useEffect(() => {
    const preventAutoScroll = () => {
      // More aggressive mobile auto-scroll prevention
      if (window.innerWidth <= 1024) {
        // Store original scroll methods
        const originalScrollTo = window.scrollTo;
        const originalScrollBy = window.scrollBy;
        const originalScrollIntoView = Element.prototype.scrollIntoView;
        
        // Override scroll methods to prevent programmatic scrolling on mobile
        window.scrollTo = (x, y, options) => {
          // Allow manual scrolling (no options) or immediate scrolling
          if (arguments.length <= 2 || !options || options.behavior !== 'smooth') {
            return originalScrollTo.call(window, x, y);
          }
          // Block smooth scrolling that might be triggered by components
          return;
        };
        
        window.scrollBy = (x, y, options) => {
          // Allow manual scrolling only
          if (arguments.length <= 2 || !options || options.behavior !== 'smooth') {
            return originalScrollBy.call(window, x, y);
          }
          return;
        };
        
        // Completely disable scrollIntoView on mobile
        Element.prototype.scrollIntoView = () => {
          return;
        };
        
        // Cleanup function to restore methods when component unmounts
        return () => {
          window.scrollTo = originalScrollTo;
          window.scrollBy = originalScrollBy;
          Element.prototype.scrollIntoView = originalScrollIntoView;
        };
      }
    };

    const cleanup = preventAutoScroll();
    return cleanup;
  }, []);

  return (
    <div className="bg-[#f5f5f5] min-h-screen overflow-x-hidden lg:scroll-smooth">
      <Header />
      
      <main className="pt-[80px]">
        <HeroSection />
        <SearchForm />
        <NowBookingSection />
        <BookingSteps />        
        <UnifiedSections />
        <AppPromotion />
        <PaymentMethods />
      </main>
      
      <Footer />
      <FloatingActionBar handleSocialClick={handleSocialClick} />
    </div>
  );
};

export default HomePage;