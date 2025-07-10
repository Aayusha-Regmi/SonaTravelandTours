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
import FloatingActionBar from './ComponentHome/UI/FloatingActionBar';

const handleSocialClick = (platform) => {
  const links = {
    feeds: '/feed',
    whatsapp: 'https://wa.me/9779851234567?text=Hello! I would like to inquire about bus booking services.',
    routes: '/routes',
    linkedin: 'https://www.linkedin.com/company/sona-travel-tours',
  };
  if (["feeds", "routes"].includes(platform)) {
    window.location.href = links[platform];
  } else if (platform === "linkedin" || platform === "whatsapp") {
    window.open(links[platform], '_blank');
  }
};

const HomePage = () => {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      <FloatingActionBar handleSocialClick={handleSocialClick} />
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