import React, { useState } from 'react';

const FloatingActionBar = ({ handleSocialClick }) => {
  const [showCallPopup, setShowCallPopup] = useState(false);

  const handleCallClick = () => {
    setShowCallPopup(true);
  };

  const handleDirectCall = (number) => {
    window.open(`tel:${number}`, '_self');
    setShowCallPopup(false);
  };

  return (
    <>
      <div className="fixed right-3 top-1/2 transform -translate-y-1/2 z-50 md:right-4">
        <div
          className="flex flex-col items-center space-y-4 px-3 py-4 rounded-3xl border border-white/40 shadow-2xl"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.25) 100%)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)',
            backdropFilter: 'blur(32px) saturate(1.6) brightness(1.1)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.6) brightness(1.1)',
            border: '1px solid rgba(255,255,255,0.35)',
          }}
        >
          {/* Feeds Button */}
          <button
            onClick={() => handleSocialClick('feeds')}
            className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-blue-100/50 to-blue-300/30 border border-white/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 group relative overflow-hidden backdrop-blur-sm"
            aria-label="Feeds"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
            <svg className="w-5 h-5 text-blue-600 drop-shadow-sm relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className="text-[7px] font-bold text-blue-700 tracking-wider mt-0.5 relative z-10">FEEDS</span>
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={() => handleSocialClick('whatsapp')}
            className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-green-100/50 to-green-300/30 border border-white/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 group relative overflow-hidden backdrop-blur-sm"
            aria-label="WhatsApp"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
            <svg className="w-5 h-5 text-green-600 drop-shadow-sm relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
            </svg>
            <span className="text-[7px] font-bold text-green-700 tracking-wider mt-0.5 relative z-10">CHAT</span>
          </button>

          {/* Bus Routes Button */}
          <button
            onClick={() => handleSocialClick('routes')}
            className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-orange-100/50 to-orange-300/30 border border-white/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 group relative overflow-hidden backdrop-blur-sm"
            aria-label="Bus Routes"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
            <svg className="w-5 h-5 text-orange-600 drop-shadow-sm relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
            <span className="text-[7px] font-bold text-orange-700 tracking-wider mt-0.5 relative z-10">ROUTES</span>
          </button>

          {/* Call Button */}
          <button
            onClick={handleCallClick}
            className="w-12 h-12 flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-gray-100/50 to-gray-300/30 border border-white/50 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 group relative overflow-hidden backdrop-blur-sm"
            aria-label="Call"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
            <svg className="w-5 h-5 text-gray-700 drop-shadow-sm relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 22 2 16.39 2 9.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
            </svg>
            <span className="text-[7px] font-bold text-gray-700 tracking-wider mt-0.5 relative z-10">CALL</span>
          </button>
        </div>
      </div>

      {/* Call Popup Modal */}
      {showCallPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 22 2 16.39 2 9.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Location to Call</h3>
              <p className="text-gray-600 text-sm">Select the office location you want to contact</p>
            </div>
            
            <div className="space-y-3 mb-6">
              {/* Kathmandu Office */}
              <button
                onClick={() => handleDirectCall('+9779802353263')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-gray-800">Kathmandu Office</div>
                    <div className="text-blue-600 font-semibold">+977 9802353263</div>
                  </div>
                  <svg className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Birgunj Office */}
              <button
                onClick={() => handleDirectCall('+9779802353260')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border border-green-200 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-gray-800">Birgunj Office</div>
                    <div className="text-green-600 font-semibold">+977 9802353260</div>
                  </div>
                  <svg className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCallPopup(false)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingActionBar;
