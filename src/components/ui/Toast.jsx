import React, { useEffect } from 'react';
{/* Toast component to display notifications */}
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (    <div
      className={`fixed top-24 right-0 transform transition-all duration-500 ease-in-out z-[9999] 
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >      <div className="mx-4 py-3 px-4 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] 
        bg-white/10 backdrop-blur-[12px] backdrop-saturate-[180%] border border-white/20
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)] transition-all duration-300
        before:content-[''] before:absolute before:inset-0 before:rounded-xl 
        before:bg-gradient-to-r before:from-white/20 before:to-transparent before:backdrop-blur-[12px] 
        relative overflow-hidden group">
        <div className="flex items-center space-x-3 relative z-10">
          <div className="flex-shrink-0 bg-amber-400/20 p-1.5 rounded-lg backdrop-blur-sm">
            <svg 
              className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="flex flex-col">
              <span className="text-amber-300/90 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Coming Soon</span>
              <p className="font-medium text-white/90 text-sm tracking-wide
                drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">{message}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-transparent 
              blur-sm -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
