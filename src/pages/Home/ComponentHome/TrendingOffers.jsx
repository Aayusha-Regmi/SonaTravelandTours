import React from 'react';
import Card from './UI/HomeCards';

const TrendingOffers = () => {
  const offers = [
    {
      id: 1,
      title: 'UNLOCK A YEAR OF',
      subtitle: 'SAVINGS',
      discount: 'Up To 10% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_modernbusistransportingpassengersmountainswithsunsetholidaybannergenerativeai69969036051.png'
    },
    {
      id: 2,
      title: 'Maha Shivrati',
      subtitle: 'Festival',
      discount: '20% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_modernbusistransportingpassengersmountainswithsunsetholidaygenerativeai69969036093_1.png'
    },
    {
      id: 3,
      title: 'Maha Shivrati',
      subtitle: 'Festival',
      discount: '20% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_shanghaistreetviewwithcityscape135921_1.png'
    }
  ];
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 min-h-screen">
      {/* Animated Background Elements - Same as PaymentMethods */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>      

      {/* Discount Pattern Overlay - Updated for darker theme */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff8f1f' fill-opacity='0.3'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='20' font-weight='bold'%3E%25%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">        {/* Enhanced Glassmorphism Header - Updated for dark theme */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 group">
            {/* Special Offer Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
              HOT DEALS
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-500">
              Trending Offers for You
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-4xl group-hover:text-white transition-colors duration-500">
              Explore the Latest Discounts and Special Deals Tailored Just for You. Don't Miss Out on Amazing Savings for Your Next Journey!
            </p>
            
            {/* Decorative Element */}
            <div className="mt-6 flex justify-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced 3D Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {offers.map((offer, index) => (
            <div 
              key={offer.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* 3D Card Container with Special Offer Styling */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/25 via-white/15 to-white/5 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-3 transform-gpu overflow-hidden">
                {/* Special Discount Badge */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-[#ff8f1f] to-[#ff6b35] rounded-full flex items-center justify-center shadow-xl z-10 animate-pulse">
                  <span className="text-white font-bold text-xs transform -rotate-12">HOT!</span>
                </div>

                {/* Glassmorphism Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff8f1f]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced Card Content */}
                <Card
                  key={offer.id}
                  type="offer"
                  title={offer.title}
                  subtitle={offer.subtitle}
                  discount={offer.discount}
                  promoCode={offer.promoCode}
                  image={offer.image}
                />

                {/* 3D Floating Promo Elements */}
                <div className="absolute top-4 left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                
                {/* Copy Code Highlight Effect */}
                <div className="absolute inset-0 border-2 border-[#ff8f1f]/0 group-hover:border-[#ff8f1f]/30 rounded-3xl transition-all duration-500"></div>
              </div>

              {/* 3D Shadow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff8f1f]/30 to-transparent rounded-3xl blur-xl transform translate-y-8 scale-95 opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10"></div>
            </div>
          ))}
        </div>
          {/* Enhanced View All Section - Updated for dark theme */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
            <a href="#" className="flex items-center text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
              View all Exclusive Offers
              <div className="ml-4 p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse hover:from-orange-400 hover:to-red-400 transition-all duration-300">
                <img 
                  src="/images/img_hicon_linear_right_1.svg" 
                  alt="Right Arrow" 
                  className="w-6 h-6 filter brightness-0 invert"
                />
              </div>
            </a>
          </div>
        </div>{/* Bottom Decorative Promo Elements - Updated for dark theme */}
        <div className="mt-12 flex justify-center space-x-8">
          {['%', '₹', '✨'].map((symbol, i) => (
            <div 
              key={i} 
              className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-xl text-2xl font-bold text-orange-400 animate-bounce hover:bg-white/20 hover:scale-110 transition-all duration-500"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2s' }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingOffers;