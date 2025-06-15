import React from 'react';
import Card from './UI/HomeCards';

const TopBusRoutes = () => {
  const routes = [
    {
      id: 1,
      title: 'Birgunj to Kathmandu',
      offerType: "Today\'s Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png'
    },
    {
      id: 2,
      title: 'Kathmandu to Birgunj',
      offerType: "Holiday\'s Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png'
    },
    {
      id: 3,
      title: 'Kathmandu to Pokhara',
      offerType: "Weekend\'s Offer",
      price: 'R.s 1500.00',
      image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_1.png'
    }
  ];
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 min-h-screen">
      {/* Animated Background Elements - Same as TrendingOffers */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>
    

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Dark Glassmorphism */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-medium">POPULAR ROUTES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-4">
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
        {/* Enhanced 3D Route Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {routes.map((route, index) => (
            <div 
              key={route.id}
              className="group relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* 3D Card Container */}
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:-translate-y-2 transform-gpu">
                {/* Glassmorphism Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced Card Content */}
                <Card
                  key={route.id}
                  type="route"
                  title={route.title}
                  offerType={route.offerType}
                  price={route.price}
                  image={route.image}
                />

                {/* 3D Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-[#ff8f1f] to-[#ff6b35] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* 3D Shadow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a639d]/20 to-transparent rounded-3xl blur-xl transform translate-y-6 scale-95 opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-16 flex justify-center">
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-full px-8 py-4 shadow-xl">
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-3 h-3 bg-gradient-to-r from-[#0a639d] to-[#1a85c9] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopBusRoutes;