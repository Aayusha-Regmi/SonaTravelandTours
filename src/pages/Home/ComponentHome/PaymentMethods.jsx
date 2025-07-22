import React from 'react';

const PaymentMethods = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 min-h-screen">

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Enhanced Frosted Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"></div>

      <div className="relative container mx-auto px-4 text-center z-10">
        {/* Enhanced Glassmorphism Header */}
        <div className="mb-20 relative">
          <div className="inline-block bg-white/10 backdrop-blur-xl rounded-3xl px-12 py-8 border border-white/20 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-700 group">
            {/* Enhanced Security Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-2 rounded-2xl text-sm font-bold shadow-lg animate-pulse border border-white/20 backdrop-blur-xl">
              100% SECURE
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500">
              We Accept Methods:
            </h2>
            <p className="text-xl text-white/80 mt-6 group-hover:text-white transition-colors duration-500">
              Secure, Fast & Trusted Payment Solutions
            </p>
          </div>
        </div>
        
        {/* Enhanced 3D Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto perspective-1000">
          {/* UPI Payments - GPay | PhonePe | Paytm */}
          <div className="group relative transform transition-all duration-700 hover:scale-110 hover:z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-blue-500/20 group-hover:border-blue-200/20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:rotate-2">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce shadow-lg">
                ✓
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:bg-white/20">
                <img 
                  src="/images/gpay.png" 
                  alt="GPay" 
                  className="h-[85px] mx-auto filter drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">UPI Payments</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">GPay | PhonePe | Paytm</div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          {/* Wallet Payment - Enhanced Card */}
          <div className="group relative transform transition-all duration-700 hover:scale-110 hover:z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-emerald-500/20 group-hover:border-emerald-200/20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:-rotate-2">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}>
                ✓
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:bg-white/20">
                <div className="flex items-center justify-center">
                  <img 
                    src="/images/Wallets.png" 
                    alt="eSewa" 
                    className="h-[85px] object-contain filter drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Wallet Payment</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Quick & Easy</div>
            </div>
          </div>

          {/* Card Payment - Enhanced Card */}
          <div className="group relative transform transition-all duration-700 hover:scale-110 hover:z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-purple-500/20 group-hover:border-purple-200/20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:rotate-2">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce shadow-lg" style={{animationDelay: '1s'}}>
                ✓
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:bg-white/20">
                <div className="flex items-center justify-center">
                  <img 
                    src="/images/Cards.png" 
                    alt="Visa" 
                    className="h-[85px] object-contain filter drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Card Payment</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Credit & Debit</div>
            </div>
          </div>

          {/* Mobile Banking - Enhanced Card */}
          <div className="group relative transform transition-all duration-700 hover:scale-110 hover:z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-amber-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-orange-500/20 group-hover:border-orange-200/20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:-rotate-2">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce shadow-lg" style={{animationDelay: '1.5s'}}>
                ✓
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:bg-white/20">
                <img 
                  src="/images/Mobile Banking.png" 
                  alt="Mobile Banking" 
                  className="h-[85px] mx-auto filter drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Mobile Banking</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Direct Transfer</div>
            </div>
          </div>

          {/* Internet Banking - Enhanced Card */}
          <div className="group relative transform transition-all duration-700 hover:scale-110 hover:z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 to-rose-600/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:shadow-pink-500/20 group_hover:border-pink-200/20 transform transition-all duration-700 group-hover:-translate-y-2 group-hover:rotate-2">
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce shadow-lg" style={{animationDelay: '2s'}}>
                ✓
              </div>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 transform transition-all duration-500 group-hover:bg-white/20">
                <img 
                  src="/images/Internet Banking.png" 
                  alt="Internet Banking" 
                  className="h-[85px] mx-auto filter drop-shadow-2xl group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="text-white/90 font-semibold mb-2 group-hover:text-white transition-colors duration-300">Internet Banking</div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">Online Transfer</div>
            </div>
          </div>
        </div>

        {/* Enhanced Security Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-blue-500/20 hover:border-blue-200/20 transform transition-all duration-500 hover:scale-105 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-glow">🔒</div>
            <div className="text-white font-semibold mb-2 text-lg">SSL Encrypted</div>
            <div className="text-sm text-white/70">256-bit Security</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-emerald-500/20 hover:border-emerald-200/20 transform transition-all duration-500 hover:scale-105 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-glow">🛡️</div>
            <div className="text-white font-semibold mb-2 text-lg">PCI Compliant</div>
            <div className="text-sm text-white/70">Industry Standard</div>
          </div>
          
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-200/20 transform transition-all duration-500 hover:scale-105 group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-glow">⚡</div>
            <div className="text-white font-semibold mb-2 text-lg">Instant Processing</div>
            <div className="text-sm text-white/70">Real-time Confirmation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;