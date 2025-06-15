import React from 'react';
import Card from './UI/HomeCards';

const UnifiedSections = () => {
  const routes = [
    {
      id: 1,
      title: 'Birgunj to Kathmandu',
      offerType: "Today's Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png'
    },
    {
      id: 2,
      title: 'Kathmandu to Birgunj',
      offerType: "Holiday's Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png'
    },
    {
      id: 3,
      title: 'Kathmandu to Pokhara',
      offerType: "Weekend's Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_1.png'
    }
  ];

  const offers = [
    {
      id: 1,
      title: 'UNLOCK A YEAR OF SAVINGS',
      subtitle: 'UNLOCK A YEAR OF',
      discount: 'Up To 10% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_modernbusistransportingpassengersmountainswithsunsetholidaybannergenerativeai69969036051.png'
    },
    {
      id: 2,
      title: 'Maha Shivrati Festival',
      subtitle: 'Maha Shivrati',
      discount: '20% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_modernbusistransportingpassengersmountainswithsunsetholidaygenerativeai69969036093_1.png'
    },
    {
      id: 3,
      title: 'Maha Shivrati Festival',
      subtitle: 'Maha Shivrati',
      discount: '20% Discount',
      promoCode: 'Sona12345',
      image: '/images/img_shanghaistreetviewwithcityscape135921_1.png'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-800 via-gray-900 to-zinc-900 min-h-screen">
      {/* Unified Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        
        {/* Additional background elements */}
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-gradient-to-r from-pink-400/15 to-rose-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: '5s'}}></div>
      </div>

      {/* Service Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🏆</div>
        <div className="absolute top-40 right-40 text-4xl">💎</div>
        <div className="absolute bottom-40 left-40 text-5xl">🎯</div>
        <div className="absolute bottom-20 right-20 text-4xl">🚀</div>
        <div className="absolute top-1/2 left-1/5 text-3xl">⭐</div>
        <div className="absolute top-1/3 right-1/3 text-3xl">🎖️</div>
        <div className="absolute top-2/3 left-2/3 text-4xl">%</div>
        <div className="absolute bottom-1/5 left-3/4 text-5xl">₹</div>
        <div className="absolute top-1/5 right-1/5 text-3xl">✨</div>
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-24">
        
        {/* TOP BUS ROUTES SECTION */}
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-medium">POPULAR ROUTES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Top Bus Routes This Month
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Discover the most popular routes and start planning your next adventure!
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <span className="text-white/80 group-hover:text-white font-medium">View all</span>
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/img_hicon_linear_right_1.svg" 
                  alt="Right Arrow" 
                  className="w-3 h-3 filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
          
          {/* Route Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {routes.map((route, index) => (
              <div 
                key={route.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 transform-gpu">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Card
                    key={route.id}
                    type="route"
                    title={route.title}
                    offerType={route.offerType}
                    price={route.price}
                    image={route.image}
                  />

                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#ff8f1f] to-[#ff6b35] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-[#0a639d]/20 to-transparent rounded-3xl blur-xl transform translate-y-6 scale-95 opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* TRENDING OFFERS SECTION */}
        <div>
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-orange-400 font-medium">HOT DEALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trending Offers for You
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
              Explore the Latest Discounts and Special Deals Tailored Just for You. Don't Miss Out on Amazing Savings for Your Next Journey!
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
              <div key={offer.id} className="group relative" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                  
                  {/* HOT Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 animate-pulse">
                    HOT!
                  </div>

                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-white/80 text-sm mb-2">{offer.subtitle}</div>
                    <h3 className="text-white text-xl font-bold mb-4">{offer.title}</h3>
                    <div className="text-orange-400 text-lg font-bold mb-4">{offer.discount}</div>
                    
                    <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3">
                      <div>
                        <div className="text-white/80 text-xs">Promo Code:</div>
                        <div className="text-white font-mono font-bold">{offer.promoCode}</div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
              <span className="text-white/80 group-hover:text-white font-medium">View all Exclusive Offers</span>
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/images/img_hicon_linear_right_1.svg" 
                  alt="Right Arrow" 
                  className="w-3 h-3 filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SERVICE HIGHLIGHTS SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Background Image */}
          <div className="lg:w-1/2 h-[700px] relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/img_beautifullandscapetouristbustraveltransportbackground87582536524.png" 
              alt="Tourist Bus Landscape" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 brightness-110 contrast-110"
            />
            
            {/* Subtle border overlay */}
            <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none"></div>
            
            {/* Floating Badges */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:bg-black/70 transition-all duration-300">
              <span className="text-sm font-bold text-white">Premium Experience</span>
            </div>
            
            <div className="absolute bottom-6 right-6 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm border border-white/40 rounded-2xl px-4 py-2 shadow-xl z-20 hover:from-orange-500/90 hover:to-red-500/90 transition-all duration-300">
              <span className="text-sm font-bold text-white">★ 4.9/5 Rating</span>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
            {/* Main Title */}
            <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-8 mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group relative">
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
                EXCELLENCE
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-500">
                Experience the Difference with Our Service!
              </h2>
            </div>

            {/* Service Cards */}
            <div className="space-y-8">
              {/* Service 1 - Exceptional Service */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_eosiconsserviceoutlined.svg" 
                        alt="Service Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-blue-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Exceptional Service
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Experience unparalleled customer support and a seamless booking process every time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 2 - Affordable Prices */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_solartagpricelinear.svg" 
                        alt="Price Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Affordable Prices
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Enjoy competitive rates and exclusive discounts on all your travel needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service 3 - Comfortable Travel */}
              <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <img 
                        src="/images/img_tdesignsleep.svg" 
                        alt="Comfort Icon" 
                        className="w-14 h-14 filter brightness-0 invert opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-purple-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  <div className="ml-8">
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-all duration-300">
                      Comfortable Travel
                    </h3>
                    <p className="text-xl text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                      Travel in comfort with our modern and well-maintained fleet of buses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOOKING STATS SECTION */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Booking Counter */}
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <img 
                    src="/images/img_hugeiconsticket02.svg" 
                    alt="Ticket Icon" 
                    className="w-14 h-14 filter brightness-0 invert opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-orange-400/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              
              <div className="ml-6">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-300 transition-all duration-300">
                  15,340 Bookings
                </h3>
              </div>
            </div>
          </div>
          
          {/* Success Message */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 max-w-md group">
            <p className="text-2xl font-semibold text-white leading-relaxed group-hover:text-white/90 transition-all duration-300">
              Join thousands of satisfied travelers who have booked their journeys with us!
            </p>
            
            {/* Rating Stars */}
            <div className="mt-4 flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-white text-xs">★</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="flex justify-center space-x-6">
          {['🚌', '✨', '🎯'].map((emoji, i) => (
            <div 
              key={i} 
              className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-xl text-2xl animate-bounce hover:bg-white/20 hover:scale-110 transition-all duration-500"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: '3s' }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedSections;
