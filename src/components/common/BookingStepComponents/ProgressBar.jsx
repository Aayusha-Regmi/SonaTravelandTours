import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ steps, currentStep }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Reset animation and start drawing line from first step to current
    setAnimatedWidth(0);
    
    const timer = setTimeout(() => {
      if (currentStep > 0) {
        // Calculate the width percentage based on current step
        const progressPercentage = (currentStep / (steps.length - 1)) * 100;
        setAnimatedWidth(progressPercentage);
      }
    }, 150); // Small delay for smooth animation start

    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  return (
    <div className="flex items-center justify-center w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center w-full relative">
        {/* Background line - behind all circles */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 rounded-full z-0"></div>
        
        {/* Animated progress line - draws from start to current step */}
        <div 
          className="absolute top-6 left-6 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full z-10 transition-all duration-2000 ease-out"
          style={{
            width: `calc(${animatedWidth}% - 24px + ${24 * animatedWidth / 100}px)`
          }}
        >
          {/* Shimmer effect during animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-[shimmer_2s_ease-in-out_infinite]"></div>
        </div>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-20" style={{ flex: '1' }}>
            {/* Step Circle - current step bounces, others are static */}
            <div className={`relative mb-4 transition-all duration-500 ${
              index === currentStep ? 'animate-bounce' : ''
            }`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                index < currentStep 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-400 text-white shadow-lg' 
                  : index === currentStep 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-400 text-white shadow-xl shadow-blue-400/50' 
                  : 'bg-white border-gray-300 text-gray-500 shadow-sm'
              }`}>
                
                {/* Completed step checkmark */}
                {index < currentStep ? (
                  <svg 
                    className="w-5 h-5" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">
                    {index + 1}
                  </span>
                )}
                
                {/* Current step glow effect */}
                {index === currentStep && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-600/40 animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Step Label */}
            <div className="text-center">
              <span className={`text-xs font-medium block mb-1 transition-all duration-300 ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                Step {index + 1}
              </span>
              <span className={`text-sm font-semibold transition-all duration-300 ${
                index <= currentStep ? 'text-blue-700' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

ProgressBar.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
