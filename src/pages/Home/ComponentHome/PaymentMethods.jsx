import React from 'react';

const PaymentMethods = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-r from-emerald-400/25 to-teal-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-16 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-400/25 to-amber-500/25 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>

    

      {/* Payment Security Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl">🔐</div>
        <div className="absolute top-40 right-40 text-4xl">💳</div>
        <div className="absolute bottom-40 left-40 text-5xl">🛡️</div>
        <div className="absolute bottom-20 right-20 text-4xl">✅</div>
        <div className="absolute top-1/2 left-1/5 text-3xl">💎</div>
        <div className="absolute top-1/3 right-1/3 text-3xl">🏦</div>
      </div>

      <div className="relative container mx-auto px-4 text-center z-10">
        {/* Enhanced Glassmorphism Header */}
        <div className="mb-16 relative">
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 group">
            {/* Security Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse">
              100% SECURE
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
              We Accept Methods:
            </h2>
            <p className="text-lg text-white/80 mt-4 group-hover:text-white transition-colors duration-500">
              Secure, Fast & Trusted Payment Solutions
            </p>
          </div>
        </div>
        
        {/* 3D Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* PayPal */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl hover:scale-110 hover:rotate-2 transition-all duration-700">
              {/* Floating Security Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce">
                ✓
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/20 transition-all duration-500">
                <img 
                  src="/images/img_8be52076054e63670dfc487ddf39ac8a_1.png" 
                  alt="PayPal" 
                  className="h-[85px] mx-auto filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">PayPal</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Digital Wallet</div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Mastercard */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl hover:scale-110 hover:-rotate-2 transition-all duration-700">
              {/* Floating Security Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce" style={{animationDelay: '0.5s'}}>
                ✓
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/20 transition-all duration-500">
                <img 
                  src="/images/img_0abbf7cdb76b927242203afc7b581e30_1.png" 
                  alt="Mastercard" 
                  className="h-[105px] mx-auto filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Mastercard</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Credit & Debit</div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Visa */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl hover:scale-110 hover:rotate-2 transition-all duration-700">
              {/* Floating Security Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce" style={{animationDelay: '1s'}}>
                ✓
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/20 transition-all duration-500">
                <img 
                  src="/images/img_dc139ffdf87e0bfe4b53f1afc7126e34_1.png" 
                  alt="Visa" 
                  className="h-[89px] mx-auto filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Visa</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Credit & Debit</div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Additional Payment Method */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl hover:scale-110 hover:-rotate-2 transition-all duration-700">
              {/* Floating Security Icon */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce" style={{animationDelay: '1.5s'}}>
                ✓
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/20 transition-all duration-500">
                <img 
                  src="/images/img_image_18.png" 
                  alt="Payment Method" 
                  className="h-[58px] mx-auto filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Bank Transfer</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Direct Payment</div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>
        </div>

        {/* Security Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔒</div>
            <div className="text-white font-semibold mb-2">SSL Encrypted</div>
            <div className="text-sm text-white/70">256-bit Security</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group" style={{animationDelay: '0.2s'}}>
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🛡️</div>
            <div className="text-white font-semibold mb-2">PCI Compliant</div>
            <div className="text-sm text-white/70">Industry Standard</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 group" style={{animationDelay: '0.4s'}}>
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
            <div className="text-white font-semibold mb-2">Instant Processing</div>
            <div className="text-sm text-white/70">Real-time Confirmation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;