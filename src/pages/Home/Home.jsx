import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import HeroSection from './ComponentHome/UI/HomeHeroSection';
import SearchForm from './ComponentHome/SearchForm';
import NowBookingSection from './ComponentHome/NowBookingSection';
import BookingSteps from './ComponentHome/BookingSteps';
import UnifiedSections from './ComponentHome/UnifiedSections';
import AppPromotion from './ComponentHome/AppPromotion';
import PaymentMethods from './ComponentHome/PaymentMethods';

const HomePage = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
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
    </div>
  );
};

export default HomePage;